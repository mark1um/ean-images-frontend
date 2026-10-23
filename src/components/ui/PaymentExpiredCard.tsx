'use client';

import { Clock3, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { formatCurrency, formatNumber } from '@/lib/utils';
import type { OrderStatus } from '@/types';

interface PaymentExpiredCardProps {
  status: OrderStatus;
  onRepay: () => void;
  isRepaying: boolean;
}

export function PaymentExpiredCard({ status, onRepay, isRepaying }: PaymentExpiredCardProps) {
  return (
    <div className="max-w-md w-full mx-auto text-center">
      <div className="card py-10 space-y-5">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-yellow-600/20 border-2 border-yellow-500/30 flex items-center justify-center">
            <Clock3 className="w-8 h-8 text-yellow-400" />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-2">O PIX expirou</h2>
          <p className="text-slate-400 text-sm">
            Seu pedido continua reservado: {formatNumber(status.totalFound)} imagens por{' '}
            {formatCurrency(status.totalPrice)}. Gere um novo PIX para concluir, sem precisar refazer a consulta.
          </p>
        </div>

        <button
          type="button"
          onClick={onRepay}
          disabled={isRepaying}
          className="btn-primary w-full justify-center py-4"
        >
          <RefreshCw className={`w-4 h-4 ${isRepaying ? 'animate-spin' : ''}`} />
          {isRepaying ? 'Gerando novo PIX...' : 'Gerar novo PIX'}
        </button>

        <Link href="/" className="btn-secondary w-full justify-center">
          Fazer nova consulta
        </Link>

        <p className="text-xs text-slate-600">Pedido #{status.orderId.slice(0, 8).toUpperCase()}</p>
      </div>
    </div>
  );
}
