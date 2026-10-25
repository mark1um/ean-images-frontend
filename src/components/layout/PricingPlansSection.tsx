import { Check, Clock3, FileArchive, Headset, Package } from 'lucide-react';
import { MIN_ORDER_TOTAL } from '@/lib/config';
import { PRICING_PACKAGES, PRICING_TIERS, estimatePrice, tieredPrice } from '@/lib/pricing';
import { formatCurrency, formatNumber } from '@/lib/utils';

const tierNotes = [
  'Ideal para testes, cadastros pequenos e reposição rápida.',
  'Para lojas que cadastram produtos toda semana.',
  'Para catálogos e lotes grandes.',
];

function tierRange(index: number): string {
  const tier = PRICING_TIERS[index];
  const next = PRICING_TIERS[index + 1];
  if (!next) return `Acima de ${formatNumber(tier.from - 1)} imagens`;
  if (index === 0) return `Primeiras ${formatNumber(next.from - 1)} imagens`;
  return `Da ${formatNumber(tier.from)}ª à ${formatNumber(next.from - 1)}ª imagem`;
}

const examples = [5, 100, 500, 1000, 3000];

// Preço por imagem com 3 casas (ex.: 0,099), para o pacote não parecer igual à faixa de R$ 0,10
function unitPrice(value: number): string {
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
}

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
        <h2 className="mt-2 text-2xl md:text-3xl font-bold text-white">Quanto mais imagens, menor o preço</h2>
        <p className="mt-2 text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
          Você só paga pelas imagens encontradas. Cada faixa vale para as imagens dentro dela e,
          em lotes grandes, entra o pacote de preço fechado.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {PRICING_TIERS.map((tier, index) => (
          <div key={tier.from} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm font-semibold text-white">{tierRange(index)}</p>
            <p className="text-3xl font-bold text-cyan-300 mt-4">{formatCurrency(tier.pricePerUnit)}</p>
            <p className="text-xs text-slate-400">por imagem</p>
            <p className="text-sm text-slate-300 mt-4 leading-relaxed">{tierNotes[index] ?? ''}</p>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Package className="w-4 h-4 text-cyan-300" />
          <h3 className="text-sm font-semibold text-white">Pacotes com preço fechado</h3>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {PRICING_PACKAGES.map((pkg) => (
            <div
              key={pkg.size}
              className="rounded-2xl border border-cyan-700/50 bg-cyan-950/20 p-5 shadow-[0_0_0_1px_rgba(34,211,238,0.15)]"
            >
              <p className="text-sm font-semibold text-white">Até {formatNumber(pkg.size)} imagens</p>
              <p className="text-3xl font-bold text-cyan-300 mt-4">{formatCurrency(pkg.price)}</p>
              <p className="text-xs text-slate-400">R$ {unitPrice(pkg.price / pkg.size)} por imagem</p>
              <p className="text-sm text-emerald-300 mt-4">
                Economia de {formatCurrency(tieredPrice(pkg.size) - pkg.price)} em relação ao preço por imagem
              </p>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                Passou do pacote? Cada imagem extra custa {formatCurrency(pkg.extraPricePerUnit)}.
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
        <p className="text-sm text-slate-300">
          <strong className="text-white">Você paga sempre o menor valor.</strong> O sistema compara as faixas e
          os pacotes e aplica o mais barato automaticamente. Pedido mínimo de {formatCurrency(MIN_ORDER_TOTAL)}.
        </p>
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-5 gap-2">
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
