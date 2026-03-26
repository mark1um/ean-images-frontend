'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useOrderPolling } from '@/hooks/useOrderPolling';
import { SuccessContent } from '@/components/ui/SuccessContent';
import { OrderConfirmation } from '@/components/ui/OrderConfirmation';
import { ErrorState } from '@/components/ui/ErrorState';
import { PixPaymentCard } from '@/components/ui/PixPaymentCard';
import type { CheckoutResponse } from '@/types';

function SucessoInner() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { status, pollingState } = useOrderPolling(orderId);
  const [checkoutData, setCheckoutData] = useState<CheckoutResponse | null>(null);

  useEffect(() => {
    if (!orderId || typeof window === 'undefined') return;

    const raw = sessionStorage.getItem(`checkout:${orderId}`);
    if (!raw) return;

    try {
      setCheckoutData(JSON.parse(raw) as CheckoutResponse);
    } catch {
      // ignore
    }
  }, [orderId]);

  if (!orderId) {
    return (
      <ErrorState
        title="Pedido nao encontrado"
        message="O link de acesso e invalido. Verifique seu e-mail para encontrar o link correto."
      />
    );
  }

  if (status?.status === 'EXPIRED') {
    return (
      <ErrorState
        title="Pagamento expirado"
        message="O QR Code expirou antes da confirmacao. Volte ao inicio e gere um novo pagamento."
      />
    );
  }

  if (pollingState === 'timeout') {
    return (
      <ErrorState
        title="Processamento demorou mais que o esperado"
        message="Seu pedido esta sendo processado. Voce recebera um e-mail assim que as imagens estiverem prontas."
        showContact
      />
    );
  }

  if (pollingState === 'error' || status?.status === 'ERROR') {
    return (
      <ErrorState
        title="Erro no processamento"
        message="Ocorreu um erro ao processar seu pedido. Nossa equipe foi notificada e entrara em contato."
        showContact
      />
    );
  }

  if (status?.status === 'SENT') {
    return <SuccessContent status={status} orderId={orderId} />;
  }

  if (status?.status === 'PAID' || status?.status === 'PROCESSING') {
    return <OrderConfirmation status={status} orderId={orderId} />;
  }

  if ((!status || status.status === 'PENDING') && checkoutData?.pix) {
    return <PixPaymentCard checkout={checkoutData} orderId={orderId} />;
  }

  // Fallback: mostrar OrderConfirmation se tiver status válido
  if (status) {
    return <OrderConfirmation status={status} orderId={orderId} />;
  }

  // Último recurso: mensagem de carregamento
  return (
    <ErrorState
      title="Carregando..."
      message="Aguarde um momento enquanto processamos seu pedido."
    />
  );
}

export default function SucessoPage() {
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <Suspense fallback={<OrderConfirmation status={{ status: 'PAID' } as any} orderId="" />}>
        <SucessoInner />
      </Suspense>
    </main>
  );
}
