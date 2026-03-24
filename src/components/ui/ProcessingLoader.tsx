import { Package, CreditCard, Archive, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProcessingLoaderProps {
  status: string;
  orderId: string;
}

const steps = [
  { key: 'PAID',       icon: CreditCard, label: 'Pagamento confirmado' },
  { key: 'PROCESSING', icon: Archive,    label: 'Gerando arquivo ZIP'  },
  { key: 'SENT',       icon: Mail,       label: 'Enviando por e-mail'  },
];

function getStepIndex(status: string): number {
  const map: Record<string, number> = { PAID: 0, PROCESSING: 1, SENT: 2 };
  return map[status] ?? 0;
}

export function ProcessingLoader({ status, orderId }: ProcessingLoaderProps) {
  const currentStep = getStepIndex(status);

  return (
    <div className="max-w-md w-full mx-auto text-center">
      <div className="card py-12">
        <div className="relative inline-flex mb-6">
          <div className="w-20 h-20 rounded-full border-4 border-blue-900 border-t-blue-500 animate-spin" />
          <Package className="absolute inset-0 m-auto w-8 h-8 text-blue-400" />
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">Processando seu pedido</h2>
        <p className="text-slate-400 text-sm mb-8">
          Estamos preparando suas imagens. Isso pode levar alguns minutos.
        </p>

        {/* Steps */}
        <div className="space-y-3 text-left">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isCompleted = i < currentStep;
            const isCurrent = i === currentStep;

            return (
              <div
                key={step.key}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-xl transition-all',
                  isCurrent && 'bg-blue-950/40 border border-blue-800/40',
                  isCompleted && 'opacity-60'
                )}
              >
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                    isCompleted ? 'bg-green-600/20' : isCurrent ? 'bg-blue-600/20' : 'bg-slate-800'
                  )}
                >
                  <Icon
                    className={cn(
                      'w-4 h-4',
                      isCompleted ? 'text-green-400' : isCurrent ? 'text-blue-400' : 'text-slate-600'
                    )}
                  />
                </div>
                <span
                  className={cn(
                    'text-sm font-medium',
                    isCompleted ? 'text-green-400' : isCurrent ? 'text-white' : 'text-slate-600'
                  )}
                >
                  {step.label}
                </span>
                {isCurrent && (
                  <span className="ml-auto w-4 h-4 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
                )}
              </div>
            );
          })}
        </div>

        {orderId && (
          <p className="text-xs text-slate-600 mt-6">
            Pedido #{orderId.slice(0, 8).toUpperCase()}
          </p>
        )}
      </div>
    </div>
  );
}
