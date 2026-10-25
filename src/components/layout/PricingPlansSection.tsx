import { Check, Clock3, FileArchive, Headset, Package } from 'lucide-react';
import { MIN_ORDER_TOTAL } from '@/lib/config';
import { PRICING_PACKAGES, PRICING_TIERS, estimatePrice } from '@/lib/pricing';
import { formatCurrency, formatNumber } from '@/lib/utils';

const [mainPackage, ...largerPackages] = PRICING_PACKAGES;
const maxUnitPrice = PRICING_TIERS[0].pricePerUnit;

const examples = [10, 100, 500];

const benefits = [
  {
    title: 'Entrega automática',
    description: 'As imagens são enviadas em ZIP para o e-mail cadastrado após a confirmação.',
    icon: FileArchive,
  },
  {
    title: 'Processo rápido',
    description: 'Você confere a disponibilidade e o preço antes de pagar, em poucos segundos.',
    icon: Clock3,
  },
  {
    title: 'Suporte em operação',
    description: 'Fluxo desenhado para facilitar compras pontuais e lotes recorrentes.',
    icon: Headset,
  },
];

export function PricingPlansSection() {
  return (
    <section id="pricing" className="space-y-5 md:space-y-6">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Preços</p>
        <h2 className="mt-2 text-2xl md:text-3xl font-bold text-white">
          Até {formatNumber(mainPackage.size)} imagens por {formatCurrency(mainPackage.price)}
        </h2>
        <p className="mt-2 text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
          Você só paga pelas imagens encontradas e vê o valor exato antes de pagar.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-cyan-700/50 bg-cyan-950/20 p-6 shadow-[0_0_0_1px_rgba(34,211,238,0.15)]">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-cyan-300" />
            <p className="text-sm font-semibold text-white">Pacote</p>
          </div>
          <p className="text-4xl font-bold text-cyan-300 mt-4">{formatCurrency(mainPackage.price)}</p>
          <p className="text-sm text-slate-300 mt-1">até {formatNumber(mainPackage.size)} imagens</p>
          <p className="text-sm text-slate-400 mt-4 leading-relaxed">
            Passou de {formatNumber(mainPackage.size)}? Cada imagem extra custa{' '}
            {formatCurrency(mainPackage.extraPricePerUnit)}.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm font-semibold text-white">Poucas imagens?</p>
          <p className="text-sm text-slate-300 mt-4 leading-relaxed">
            Pague só o que usar: no máximo {formatCurrency(maxUnitPrice)} por imagem, a partir de{' '}
            {formatCurrency(MIN_ORDER_TOTAL)}.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {examples.map((qty) => (
              <div key={qty} className="rounded-xl bg-slate-950/60 px-3 py-2 text-center">
                <p className="text-xs text-slate-400">{formatNumber(qty)} imagens</p>
                <p className="text-sm font-semibold text-white">
                  {formatCurrency(Math.max(estimatePrice(qty), MIN_ORDER_TOTAL))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {largerPackages.length > 0 && (
        <p className="text-center text-sm text-slate-400">
          Lotes maiores:{' '}
          {largerPackages
            .map((pkg) => `até ${formatNumber(pkg.size)} imagens por ${formatCurrency(pkg.price)}`)
            .join(' · ')}
          .
        </p>
      )}

      <div className="grid gap-3 md:grid-cols-3">
        {benefits.map((benefit) => {
          const Icon = benefit.icon;

          return (
            <article key={benefit.title} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-lg border border-slate-700 bg-slate-800 p-2">
                  <Icon className="w-4 h-4 text-cyan-300" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">{benefit.title}</h3>
                  <p className="mt-1 text-sm text-slate-400">{benefit.description}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-xs text-slate-400 flex items-start gap-2">
        <Check className="w-4 h-4 text-emerald-300 mt-0.5 flex-shrink-0" />
        <p>
          O valor final aparece no resumo do pedido, com base nas imagens encontradas, antes de você pagar.
          Se houver cupom ativo, o desconto também aparece ali.
        </p>
      </div>
    </section>
  );
}
