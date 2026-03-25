import { cn } from '@/lib/utils';
import { Sparkles, ShieldCheck, Mail } from 'lucide-react';

interface HeroSectionProps {
  compact?: boolean;
}

export function HeroSection({ compact = false }: HeroSectionProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden transition-all duration-500',
        compact ? 'py-8' : 'py-16 md:py-20'
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[540px] h-[240px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900/70 border border-slate-700 rounded-full text-cyan-300 text-sm font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Banco de Imagens de Produtos por EAN</span>
        </div>

        <h1
          className={cn(
            'font-bold tracking-tight text-white transition-all duration-500',
            compact ? 'text-2xl md:text-3xl' : 'text-4xl md:text-5xl'
          )}
        >
          Banco de Imagens EAN — Baixe Imagens de Produtos pelo Código EAN Instantaneamente
        </h1>

        {!compact && (
          <>
            <p className="mt-5 text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Busque e baixe imagens de produtos pelo código EAN em segundos. Perfeito para e-commerce, 
              marketplaces e empresas que precisam de imagens de alta qualidade. Sem cadastro, sem contrato, 
              sem complicações. Análise instantânea com checkout seguro e entrega por e-mail.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900/80 border border-slate-700 rounded-full text-slate-300">
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>Busca por EAN Instantânea</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900/80 border border-slate-700 rounded-full text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>Pagamento 100% Seguro</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900/80 border border-slate-700 rounded-full text-slate-300">
                <Mail className="w-4 h-4 text-blue-300" />
                <span>Download Imediato</span>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
