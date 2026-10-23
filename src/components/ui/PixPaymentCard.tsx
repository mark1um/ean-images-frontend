'use client';

import { useEffect, useMemo, useState } from 'react';
import { Check, Copy, QrCode, Clock3, RefreshCw } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { formatCurrency } from '@/lib/utils';
import type { CheckoutResponse } from '@/types';

type PixData = NonNullable<CheckoutResponse['pix']>;

interface PixPaymentCardProps {
  pix: PixData;
  orderId: string;
  total?: number;
  onRepay: () => void;
  isRepaying: boolean;
}

export function PixPaymentCard({ pix, orderId, total, onRepay, isRepaying }: PixPaymentCardProps) {
  const [copied, setCopied] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(timer);
  }, []);

  const qrImageSrc = useMemo(() => {
    const raw = pix.qrCodeImageBase64;
    if (!raw) return null;
    return raw.startsWith('data:image') ? raw : `data:image/png;base64,${raw}`;
  }, [pix.qrCodeImageBase64]);

  const expiresAt = useMemo(() => {
    if (!pix.expiresAt) return null;
    const date = new Date(pix.expiresAt);
    return Number.isNaN(date.getTime()) ? null : date;
  }, [pix.expiresAt]);

  const isExpired = expiresAt ? expiresAt.getTime() <= now : false;

  const expiresLabel = expiresAt?.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  async function handleCopyPix() {
    if (!pix.brCode) return;

    try {
      await navigator.clipboard.writeText(pix.brCode);
      setCopied(true);
      trackEvent('pix_copied', { order_id: orderId });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Navegadores sem permissão de clipboard: o código continua visível para copiar manualmente
    }
  }

  return (
    <div className="max-w-md w-full mx-auto text-center">
      <div className="card py-8 space-y-5">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-blue-600/20 border-2 border-blue-500/30 flex items-center justify-center">
            <QrCode className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Pague com PIX{total ? ` ${formatCurrency(total)}` : ''}
          </h2>
          <p className="text-slate-400 text-sm">
            Escaneie o QR Code ou use o PIX Copia e Cola. Assim que o pagamento for confirmado,
            as imagens são enviadas automaticamente para o seu e-mail.
          </p>
        </div>

        {!isExpired && (
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-800/70 px-3 py-1.5 text-xs text-slate-300">
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            Aguardando pagamento… esta página atualiza sozinha
          </div>
        )}

        {qrImageSrc && !isExpired && (
          <div className="bg-white rounded-2xl p-4 mx-auto w-fit">
            <img src={qrImageSrc} alt="QR Code PIX" className="w-56 h-56" />
          </div>
        )}

        {pix.brCode && !isExpired && (
          <div className="space-y-2 text-left">
            <p className="text-xs text-slate-400">PIX Copia e Cola:</p>
            <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-3 text-xs text-slate-300 break-all">
              {pix.brCode}
            </div>
            <button onClick={handleCopyPix} className="btn-primary w-full justify-center" type="button">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Código copiado' : 'Copiar código PIX'}
            </button>
          </div>
        )}

        {expiresLabel && !isExpired && (
          <div className="flex items-center justify-center gap-2 text-xs text-yellow-300 bg-yellow-950/30 border border-yellow-800/30 rounded-xl p-3">
            <Clock3 className="w-4 h-4" />
            Válido até {expiresLabel}
          </div>
        )}

        {isExpired && (
          <div className="space-y-3">
            <p className="text-sm text-yellow-300">Este PIX expirou. Gere um novo para concluir o pedido.</p>
            <button
              type="button"
              onClick={onRepay}
              disabled={isRepaying}
              className="btn-primary w-full justify-center"
            >
              <RefreshCw className={`w-4 h-4 ${isRepaying ? 'animate-spin' : ''}`} />
              {isRepaying ? 'Gerando...' : 'Gerar novo PIX'}
            </button>
          </div>
        )}

        <p className="text-xs text-slate-600">Pedido #{orderId.slice(0, 8).toUpperCase()}</p>
      </div>
    </div>
  );
}
