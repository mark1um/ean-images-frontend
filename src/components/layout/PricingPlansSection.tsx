import { Check, Clock3, FileArchive, Headset } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    range: 'Ate 50 imagens',
    price: 'R$ 0,50',
    highlight: false,
    note: 'Ideal para testes, cadastros pequenos e reposicao rapida.',
    info: '*Pagamento mínimo de R$ 1,00.'
  },
  {
    name: 'Pro',
    range: '51 a 200 imagens',
    price: 'R$ 0,30',
    highlight: true,
    note: 'Melhor custo para lojas e operacoes com volume recorrente.',
  },
  {
    name: 'Scale',
    range: 'Acima de 200 imagens',
    price: 'R$ 0,20',
    highlight: false,
    note: 'Faixa de maior economia para lotes grandes e operacoes intensas.',
  },
];

const benefits = [
  {
    title: 'Entrega automatica',
    description: 'As imagens sao enviadas em ZIP para o e-mail cadastrado apos confirmacao.',
    icon: FileArchive,
  },
  {
    title: 'Processo rapido',
    description: 'Voce confere disponibilidade e preco antes de pagar, em poucos segundos.',
    icon: Clock3,
  },
  {
    title: 'Suporte em operacao',
    description: 'Fluxo desenhado para facilitar compras pontuais e lotes recorrentes.',
    icon: Headset,
  },
];

export function PricingPlansSection() {
  return (
    <section id="pricing" className="space-y-5 md:space-y-6">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Planos de imagens</p>
        <h2 className="mt-2 text-2xl md:text-3xl font-bold text-white">Preco simples por volume</h2>
        <p className="mt-2 text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
          Escolha o volume, valide a disponibilidade dos EANs e finalize no checkout.
          Valores por imagem com reducao progressiva por faixa.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl border p-5 ${
              plan.highlight
                ? 'bg-cyan-950/20 border-cyan-700/50 shadow-[0_0_0_1px_rgba(34,211,238,0.15)]'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <p className="text-sm font-semibold text-white">{plan.name}</p>
            <p className="text-xs text-slate-400 mt-1">{plan.range}</p>
            <p className="text-3xl font-bold text-cyan-300 mt-4">{plan.price}</p>
            <p className="text-xs text-slate-400">por imagem</p>
            <p className="text-sm text-slate-300 mt-4 leading-relaxed">{plan.note}</p>
            <p className="text-xs text-slate-100 mt-3 leading-relaxed">{plan.info}</p>
          </div>
        ))}
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
          O valor final e exibido no resumo do pedido com base nas imagens encontradas.
          Se houver cupom ativo, o desconto aparece antes do checkout.
        </p>
      </div>
    </section>
  );
}
