'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useOrderPolling } from '@/hooks/useOrderPolling';
import { SuccessContent } from '@/components/ui/SuccessContent';
import { OrderConfirmation } from '@/components/ui/OrderConfirmation';
import { ErrorState } from '@/components/ui/ErrorState';
import { PixPaymentCard } from '@/components/ui/PixPaymentCard';
import { PaymentExpiredCard } from '@/components/ui/PaymentExpiredCard';
import { ApiError, repayOrder } from '@/services/api';
import { trackEvent, trackEventOnce } from '@/lib/analytics';
import type { CheckoutResponse } from '@/types';

function PageLoading() {
  return (
    <div className="max-w-md w-full mx-auto text-center">
      <div className="card py-12">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full border-4 border-blue-900 border-t-blue-500 animate-spin" />
        <p className="text-slate-300 font-medium">Carregando seu pedido...</p>
      </div>
    </div>
  );
}

function SucessoInner() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { status, pollingState, restartPolling } = useOrderPolling(orderId);
  const [checkoutData, setCheckoutData] = useState<CheckoutResponse | null>(null);
  const [repayData, setRepayData] = useState<CheckoutResponse | null>(null);
  const [isRepaying, setIsRepaying] = useState(false);

  useEffect(() => {
    if (!orderId) return;

    try {
      const raw = sessionStorage.getItem(`checkout:${orderId}`);
      if (raw) setCheckoutData(JSON.parse(raw) as CheckoutResponse);
    } catch {
      // Sem sessionStorage: o PIX vem do servidor
    }
  }, [orderId]);

  // O servidor já devolve o PIX novo: não precisamos mais do que veio do "Gerar novo PIX"
  useEffect(() => {
    if (status?.status === 'PENDING' && status.pix) setRepayData(null);
  }, [status]);

  // Compra confirmada: registra uma única vez por pedido
  useEffect(() => {
    if (!orderId || !status) return;
    if (status.status === 'PAID' || status.status === 'PROCESSING' || status.status === 'SENT') {
      trackEventOnce(`purchase:${orderId}`, 'purchase', {
        transaction_id: orderId,
        value: status.totalPrice,
        currency: 'BRL',
        items_count: status.totalFound,
      });
    }
  }, [orderId, status]);

  async function handleRepay() {
    if (!orderId) return;
    setIsRepaying(true);

    try {
      const data = await repayOrder(orderId);
      setRepayData(data);
      try {
        sessionStorage.setItem(`checkout:${orderId}`, JSON.stringify(data));
      } catch {
        // ignore
      }
      trackEvent('pix_regenerated', { order_id: orderId, value: data.total, currency: 'BRL' });
      restartPolling();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : 'Não foi possível gerar um novo PIX. Tente novamente.');
    } finally {
      setIsRepaying(false);
    }
  }

  if (!orderId) {
    return (
      <ErrorState
        title="Pedido não encontrado"
        message="O link de acesso é inválido. Verifique seu e-mail para encontrar o link correto."
      />
    );
  }

  // PIX mais recente: o gerado agora > o que o servidor guardou > o salvo nesta aba
  const pix = repayData?.pix ?? status?.pix ?? checkoutData?.pix;
  const total = repayData?.total ?? status?.totalPrice ?? checkoutData?.total;

  if (status?.status === 'SENT') {
    return <SuccessContent status={status} orderId={orderId} />;
  }

  if (status?.status === 'PAID' || status?.status === 'PROCESSING') {
    if (pollingState === 'timeout') {
      return (
        <ErrorState
          title="Processamento demorou mais que o esperado"
          message="Seu pagamento foi confirmado. Você receberá um e-mail assim que as imagens estiverem prontas."
          showContact
        />
      );
    }
    return <OrderConfirmation status={status} orderId={orderId} />;
  }

  // Acabou de gerar um novo PIX (o status ainda não foi atualizado)
  if (repayData?.pix) {
    return (
      <PixPaymentCard pix={repayData.pix} orderId={orderId} total={total} onRepay={handleRepay} isRepaying={isRepaying} />
    );
  }

  // PIX vencido ou cancelado: oferece um novo sem refazer a consulta
  if (status?.canRetryPayment && (status.status !== 'PENDING' || !pix)) {
    return <PaymentExpiredCard status={status} onRepay={handleRepay} isRepaying={isRepaying} />;
  }

  if (status?.status === 'ERROR') {
    return (
      <ErrorState
        title="Erro no processamento"
        message="Ocorreu um erro ao processar seu pedido. Fale com a gente pelos contatos abaixo que resolvemos rapidamente."
        showContact
      />
    );
  }

  if (status?.status === 'EXPIRED') {
    return (
      <ErrorState
        title="Pedido expirado"
        message="Este pedido não está mais disponível. Faça uma nova consulta para gerar outro pedido."
        showContact
      />
    );
  }

  // Aguardando pagamento
  if (pix) {
    return (
      <PixPaymentCard pix={pix} orderId={orderId} total={total} onRepay={handleRepay} isRepaying={isRepaying} />
    );
  }

  if (pollingState === 'timeout') {
    return (
      <ErrorState
        title="Não conseguimos carregar seu pedido"
        message="Atualize a página em instantes. Se você já pagou, as imagens chegam no seu e-mail automaticamente."
        showContact
      />
    );
  }

  return <PageLoading />;
}

export default function SucessoPage() {
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <Suspense fallback={<PageLoading />}>
        <SucessoInner />
      </Suspense>
    </main>
  );
}
