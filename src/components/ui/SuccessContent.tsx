import { CheckCircle, Mail, Clock, Package, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { formatNumber, formatDate } from '@/lib/utils';
import type { OrderStatus } from '@/types';

interface SuccessContentProps {
  status: OrderStatus;
  orderId: string;
}

export function SuccessContent({ status, orderId }: SuccessContentProps) {
  return (
    <div className="max-w-md w-full mx-auto text-center">
      <div className="card py-10 space-y-6">
        {/* Ícone de sucesso */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-green-600/20 border-2 border-green-500/30 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
        </div>

        {/* Título */}
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Imagens enviadas!
          </h1>
          <p className="text-slate-400">
            Verifique sua caixa de entrada. O e-mail com o link de download foi enviado.
          </p>
        </div>

        {/* Detalhes */}
        <div className="space-y-3 text-left">
          <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl">
            <Package className="w-5 h-5 text-blue-400 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-white">
                {formatNumber(status.totalFound)} imagens em ZIP
              </p>
              <p className="text-xs text-slate-500">Arquivo comprimido pronto para download</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl">
            <Mail className="w-5 h-5 text-green-400 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-white">E-mail enviado</p>
              <p className="text-xs text-slate-500">
                {status.sentAt ? `Enviado em ${formatDate(status.sentAt)}` : 'Verifique sua caixa de entrada'}
              </p>
            </div>
          </div>

          {status.zipExpiresAt && (
            <div className="flex items-center gap-3 p-3 bg-yellow-950/30 border border-yellow-800/30 rounded-xl">
              <Clock className="w-5 h-5 text-yellow-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-yellow-300">Link com validade</p>
                <p className="text-xs text-yellow-600">
                  Expira em {formatDate(status.zipExpiresAt)}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Instruções */}
        <div className="text-left p-4 bg-slate-800/30 rounded-xl">
          <h3 className="text-sm font-semibold text-white mb-2">Como usar:</h3>
          <ol className="space-y-1.5 text-xs text-slate-400 list-decimal list-inside">
            <li>Abra o e-mail que enviamos</li>
            <li>Clique no botão &quot;Baixar Imagens&quot;</li>
            <li>Extraia o arquivo ZIP no seu computador</li>
            <li>As imagens estão nomeadas com o EAN correspondente</li>
          </ol>
        </div>

        {/* Pedido ID */}
        <p className="text-xs text-slate-600">
          Pedido #{orderId.slice(0, 8).toUpperCase()}
        </p>

        {/* Nova consulta */}
        <Link
          href="/"
          className="btn-secondary w-full justify-center"
        >
          Fazer nova consulta
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
