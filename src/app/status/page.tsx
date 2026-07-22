import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, Clock, Server } from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eanimages.com.br';

export const metadata: Metadata = {
  title: 'Status — EAN Images',
  description:
    'Acompanhe o status dos principais serviços da EAN Images: busca por EAN, pagamentos, entrega por e-mail e API.',
  openGraph: {
    type: 'website',
    url: `${siteUrl}/status`,
    title: 'Status — EAN Images',
    description: 'Status dos principais serviços da EAN Images.',
  },
};

const services = [
  'Busca de imagens por EAN',
  'Upload de arquivos em lote',
  'Checkout e pagamento PIX',
  'Entrega de arquivos por e-mail',
];

export default function StatusPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <section className="relative overflow-hidden py-16 md:py-20 border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[540px] h-[240px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-semibold mb-6">
            <CheckCircle2 className="w-4 h-4" />
            Operação normal
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Status dos serviços
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
            Página de status dos principais fluxos da EAN Images. Em caso de instabilidade, atualizaremos este espaço.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16 md:py-20">
        <div className="bg-slate-900/50 rounded-2xl border border-slate-700 overflow-hidden">
          {services.map((service) => (
            <div key={service} className="flex items-center justify-between gap-4 px-6 py-5 border-b border-slate-800 last:border-b-0">
              <div className="flex items-center gap-3">
                <Server className="w-5 h-5 text-cyan-400" />
                <span className="text-white font-medium">{service}</span>
              </div>
              <span className="inline-flex items-center gap-2 text-emerald-300 text-sm font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                Normal
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-700">
            <Clock className="w-8 h-8 text-cyan-400 mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Atualizações</h2>
            <p className="text-slate-300">
              Esta página resume o status operacional. Para suporte sobre pedidos específicos, entre em contato com nossa equipe.
            </p>
          </div>
          <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-2">Precisa de ajuda?</h2>
            <p className="text-slate-300 mb-4">
              Se algum serviço não funcionar como esperado, envie os detalhes para o suporte.
            </p>
            <Link href="/contato" className="inline-block text-cyan-300 hover:text-cyan-200 font-semibold transition-colors">
              Entrar em contato
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
