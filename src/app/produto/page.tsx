'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { EanInputForm } from '@/components/forms/EanInputForm';
import { ResultCard } from '@/components/ui/ResultCard';
import { CheckoutForm } from '@/components/forms/CheckoutForm';
import { LeadCaptureForm } from '@/components/forms/LeadCaptureForm';
import { AnalyzingLoader } from '@/components/ui/AnalyzingLoader';
import { HeroSection } from '@/components/layout/HeroSection';
import { analyzeEans, analyzeFile, captureLead, createCheckout } from '@/services/api';
import { ApiError } from '@/services/api';
import type { AnalyzeResponse, AppStep } from '@/types';

export default function ProdutoPage() {
  const router = useRouter();
  const [step, setStep] = useState<AppStep>('input');
  const [analyzeResult, setAnalyzeResult] = useState<AnalyzeResponse | null>(null);
  const [leadData, setLeadData] = useState<{ email: string; name?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleAnalyze(data: { text?: string; file?: File; couponCode?: string }) {
    setIsLoading(true);
    setStep('analyzing');

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
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Erro ao analisar EANs. Tente novamente.';
      toast.error(message);
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

      if (typeof window !== 'undefined') {
        sessionStorage.setItem(`checkout:${checkout.orderId}`, JSON.stringify(checkout));
      }

      router.push(`/sucesso?orderId=${checkout.orderId}`);
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Erro ao processar checkout. Tente novamente.';
      toast.error(message);
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

      <div className="mx-auto max-w-3xl px-4 pb-20">
        {step === 'input' && (
          <div className="animate-slide-up">
            <EanInputForm onSubmit={handleAnalyze} isLoading={isLoading} />
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
