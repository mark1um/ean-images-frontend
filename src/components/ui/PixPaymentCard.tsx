'use client';

import { useMemo, useState } from 'react';
import { Check, Copy, QrCode, Clock3 } from 'lucide-react';
import type { CheckoutResponse } from '@/types';

interface PixPaymentCardProps {
  checkout: CheckoutResponse;
  orderId: string;
}

export function PixPaymentCard({ checkout, orderId }: PixPaymentCardProps) {
  const [copied, setCopied] = useState(false);

  const qrImageSrc = useMemo(() => {
    const raw = checkout.pix?.qrCodeImageBase64;
    if (!raw) return null;
    return raw.startsWith('data:image') ? raw : `data:image/png;base64,${raw}`;
  }, [checkout.pix?.qrCodeImageBase64]);

  const expiresLabel = useMemo(() => {
    if (!checkout.pix?.expiresAt) return null;
    const date = new Date(checkout.pix.expiresAt);
    if (Number.isNaN(date.getTime())) return null;

    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }, [checkout.pix?.expiresAt]);

  async function handleCopyPix() {
    if (!checkout.pix?.brCode) return;

    await navigator.clipboard.writeText(checkout.pix.brCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          <h2 className="text-2xl font-bold text-white mb-2">Pague com PIX</h2>
          <p className="text-slate-400 text-sm">
            Escaneie o QR Code abaixo. Assim que o pagamento for confirmado, as imagens serao liberadas automaticamente.
          </p>
        </div>

        {qrImageSrc && (
          <div className="bg-white rounded-2xl p-4 mx-auto w-fit">
            <img src={qrImageSrc} alt="QR Code PIX" className="w-56 h-56" />
          </div>
        )}

        {checkout.pix?.brCode && (
          <div className="space-y-2 text-left">
            <p className="text-xs text-slate-400">Ou use o PIX Copia e Cola:</p>
            <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-3 text-xs text-slate-300 break-all">
              {checkout.pix.brCode}
            </div>
            <button onClick={handleCopyPix} className="btn-secondary w-full justify-center" type="button">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Codigo copiado' : 'Copiar codigo PIX'}
            </button>
          </div>
        )}

        {expiresLabel && (
          <div className="flex items-center justify-center gap-2 text-xs text-yellow-300 bg-yellow-950/30 border border-yellow-800/30 rounded-xl p-3">
            <Clock3 className="w-4 h-4" />
            Expira em {expiresLabel}
          </div>
        )}

        <p className="text-xs text-slate-600">Pedido #{orderId.slice(0, 8).toUpperCase()}</p>
      </div>
    </div>
  );
}
