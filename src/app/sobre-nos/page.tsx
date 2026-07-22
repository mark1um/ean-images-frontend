import type { Metadata } from 'next';
import Link from 'next/link';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eanimages.com.br';

export const metadata: Metadata = {
  title: 'Sobre Nós — EAN Images',
  description:
    'Conheça a EAN Images, plataforma para encontrar imagens de produtos pelo código EAN de forma rápida, simples e segura.',
  openGraph: {
    type: 'website',
    url: `${siteUrl}/sobre-nos`,
    title: 'Sobre Nós — EAN Images',
    description: 'Plataforma para encontrar imagens de produtos pelo código EAN.',
  },
};

const values = [
  {
    title: 'Velocidade operacional',
    description:
      'Reduzimos o tempo gasto procurando imagens produto por produto, principalmente em operações com muitos SKUs.',
  },
  {
    title: 'Uso simples',
    description:
      'A plataforma funciona sem cadastro obrigatório: informe os EANs, valide a disponibilidade e siga para o pagamento.',
  },
  {
    title: 'Foco em e-commerce',
    description:
      'Priorizamos imagens úteis para lojas virtuais, marketplaces, catálogos digitais e cadastros de produtos.',
  },
];

export default function SobreNosPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <section className="relative overflow-hidden py-16 md:py-20 border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[540px] h-[240px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Sobre a EAN Images
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
            Ajudamos empresas a encontrar imagens de produtos pelo código EAN com menos trabalho manual e mais previsibilidade.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">Nossa proposta</h2>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                A EAN Images nasceu para resolver um problema recorrente em operações de catálogo:
                encontrar imagens adequadas para produtos identificados por códigos EAN.
              </p>
              <p>
                Em vez de procurar manualmente em várias fontes, você informa um ou vários EANs,
                confere a disponibilidade e recebe os arquivos de forma organizada.
              </p>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-3">Para quem é</h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex gap-3">
                <span className="text-cyan-400">✓</span>
                <span>Lojas virtuais que precisam cadastrar produtos com rapidez.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400">✓</span>
                <span>Operações de marketplace com grande volume de SKUs.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400">✓</span>
                <span>Equipes de cadastro, marketing e catálogo digital.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {values.map((value) => (
            <div key={value.title} className="bg-slate-900/50 rounded-lg p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
              <p className="text-slate-300">{value.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Comece buscando por EAN</h2>
          <p className="text-slate-300 mb-8">
            Teste a disponibilidade antes de comprar. Sem assinatura recorrente.
          </p>
          <Link href="/" className="inline-block px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold rounded-lg transition-colors">
            Buscar imagens agora
          </Link>
        </div>
      </section>
    </main>
  );
}
