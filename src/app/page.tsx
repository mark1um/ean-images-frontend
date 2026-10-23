'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { EanInputForm } from '@/components/forms/EanInputForm';
import { ResultCard } from '@/components/ui/ResultCard';
import { CheckoutForm } from '@/components/forms/CheckoutForm';
import { LeadCaptureForm } from '@/components/forms/LeadCaptureForm';
import { AnalyzingLoader } from '@/components/ui/AnalyzingLoader';
import { HeroSection } from '@/components/layout/HeroSection';
import { PricingPlansSection } from '@/components/layout/PricingPlansSection';
import { analyzeEans, analyzeFile, captureLead, createCheckout, restoreLead } from '@/services/api';
import { ApiError } from '@/services/api';
import { trackEvent } from '@/lib/analytics';
import { MIN_ORDER_TOTAL } from '@/lib/config';
import type { AnalyzeResponse, AppStep } from '@/types';

function orderValue(result: AnalyzeResponse): number {
  return result.stats.totalFound > 0 ? Math.max(result.pricing.total, MIN_ORDER_TOTAL) : 0;
}

export default function HomePage() {
  const router = useRouter();
  const [step, setStep] = useState<AppStep>('input');
  const [analyzeResult, setAnalyzeResult] = useState<AnalyzeResponse | null>(null);
  const [leadData, setLeadData] = useState<{ email: string; name?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const restoreStarted = useRef(false);

  // Link do e-mail de lembrete: /?recuperar=<leadId> reabre o resultado
  useEffect(() => {
    if (restoreStarted.current) return;
    const leadId = new URLSearchParams(window.location.search).get('recuperar');
    if (!leadId) return;
    restoreStarted.current = true;

    setIsLoading(true);
    setStep('analyzing');

    restoreLead(leadId)
      .then((result) => {
        setAnalyzeResult(result);
        setLeadData(result.lead);
        setStep('result');
        trackEvent('recovery_opened', {
          total_found: result.stats.totalFound,
          value: orderValue(result),
          currency: 'BRL',
        });
      })
      .catch((err) => {
        toast.error(
          err instanceof ApiError ? err.message : 'Não foi possível abrir sua consulta. Faça uma nova busca.'
        );
        setStep('input');
      })
      .finally(() => {
        setIsLoading(false);
        // Remove o parâmetro para um refresh não repetir a restauração
        window.history.replaceState(null, '', window.location.pathname);
      });
  }, []);

  async function handleAnalyze(data: { text?: string; file?: File; couponCode?: string }) {
    setIsLoading(true);
    setStep('analyzing');
    trackEvent('search_submitted', { method: data.file ? 'file' : 'text' });

    try {
      let result: AnalyzeResponse;

      if (data.file) {
        result = await analyzeFile(data.file, data.couponCode);
      } else if (data.text) {
        result = await analyzeEans(data.text, data.couponCode);
      } else {
        throw new Error('Informe EANs ou faca upload de um arquivo');
      }

      setAnalyzeResult(result);
      setStep('lead');
      trackEvent('search_result', {
        method: data.file ? 'file' : 'text',
        total_valid: result.stats.totalValid,
        total_found: result.stats.totalFound,
        total_not_found: result.stats.totalNotFound,
        coverage_pct:
          result.stats.totalValid > 0
            ? Math.round((result.stats.totalFound / result.stats.totalValid) * 100)
            : 0,
        has_images: result.stats.totalFound > 0,
        value: orderValue(result),
        currency: 'BRL',
      });
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Erro ao analisar EANs. Tente novamente.';
      toast.error(message);
      trackEvent('search_error', { code: err instanceof ApiError ? err.code : 'NETWORK' });
      setStep('input');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLeadSubmit(data: { email: string; name?: string }) {
    if (!analyzeResult) return;

    setIsLoading(true);

    try {
      await captureLead({
        sessionId: analyzeResult.sessionId,
        email: data.email,
        name: data.name,
      });
      setLeadData(data);
      setStep('result');
      trackEvent('generate_lead', { value: orderValue(analyzeResult), currency: 'BRL' });
      trackEvent('view_result', {
        total_found: analyzeResult.stats.totalFound,
        has_images: analyzeResult.stats.totalFound > 0,
      });
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Erro ao liberar resultado. Tente novamente.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleGoToCheckout() {
    if (!analyzeResult || analyzeResult.stats.totalFound === 0) {
      toast.error('Nenhuma imagem encontrada para comprar.');
      return;
    }
    trackEvent('begin_checkout', {
      value: orderValue(analyzeResult),
      currency: 'BRL',
      items_count: analyzeResult.stats.totalFound,
    });
    setStep('checkout');
  }

  async function handleCheckout(data: { email: string; name?: string }) {
    if (!analyzeResult) return;

    setIsLoading(true);

    try {
      const checkout = await createCheckout({
        sessionId: analyzeResult.sessionId,
        email: data.email,
        name: data.name,
      });

      trackEvent('add_payment_info', {
        payment_type: 'pix',
        value: checkout.total,
        currency: 'BRL',
        items_count: analyzeResult.stats.totalFound,
      });

      try {
        sessionStorage.setItem(`checkout:${checkout.orderId}`, JSON.stringify(checkout));
      } catch {
        // A página de pagamento também busca o PIX no servidor
      }

      router.push(`/sucesso?orderId=${checkout.orderId}`);
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Erro ao processar checkout. Tente novamente.';
      toast.error(message);
      trackEvent('checkout_error', { code: err instanceof ApiError ? err.code : 'NETWORK' });
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    setStep('input');
    setAnalyzeResult(null);
    setLeadData(null);
  }

  return (
    <main className="min-h-screen bg-slate-950">
      <HeroSection compact={step !== 'input'} />

      <div
        className={`mx-auto px-4 pb-20 ${step === 'input' ? 'max-w-5xl' : 'max-w-3xl'}`}
      >
        {step === 'input' && (
          <div className="animate-slide-up space-y-8">
            <EanInputForm onSubmit={handleAnalyze} isLoading={isLoading} />
            <PricingPlansSection />
          </div>
        )}

        {step === 'analyzing' && (
          <div className="animate-fade-in">
            <AnalyzingLoader />
          </div>
        )}

        {step === 'lead' && analyzeResult && (
          <div className="animate-slide-up">
            <LeadCaptureForm
              stats={analyzeResult.stats}
              onSubmit={handleLeadSubmit}
              onBack={handleReset}
              isLoading={isLoading}
            />
          </div>
        )}

        {step === 'result' && analyzeResult && (
          <div className="animate-slide-up space-y-6">
            <ResultCard result={analyzeResult} onContinue={handleGoToCheckout} onReset={handleReset} />
          </div>
        )}

        {step === 'checkout' && analyzeResult && (
          <div className="animate-slide-up">
            <CheckoutForm
              pricing={analyzeResult.pricing}
              onSubmit={handleCheckout}
              onBack={() => setStep('result')}
              isLoading={isLoading}
              initialEmail={leadData?.email}
              initialName={leadData?.name}
            />
          </div>
        )}
      </div>
    </main>
  );
}
