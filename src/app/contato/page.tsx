import type { Metadata } from 'next';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import { SUPPORT_CONFIG } from '@/lib/config';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eanimages.com.br';

export const metadata: Metadata = {
  title: 'Contato — EAN Images',
  description:
    'Entre em contato com a EAN Images para suporte, dúvidas comerciais ou ajuda com imagens de produtos por EAN.',
  openGraph: {
    type: 'website',
    url: `${siteUrl}/contato`,
    title: 'Contato — EAN Images',
    description: 'Fale com a EAN Images sobre suporte, dúvidas comerciais e pedidos.',
  },
};

const contactOptions = [
  {
    title: 'E-mail',
    description: 'Para suporte, dúvidas comerciais e acompanhamento de pedidos.',
    value: SUPPORT_CONFIG.email,
    href: `mailto:${SUPPORT_CONFIG.email}`,
    icon: Mail,
  },
  {
    title: 'WhatsApp',
    description: 'Canal direto para dúvidas rápidas durante o horário comercial.',
    value: SUPPORT_CONFIG.whatsapp.display,
    href: SUPPORT_CONFIG.whatsapp.url,
    icon: MessageCircle,
  },
  {
    title: 'Telefone',
    description: 'Use este canal se preferir atendimento por ligação.',
    value: SUPPORT_CONFIG.phone.display,
    href: SUPPORT_CONFIG.phone.tel,
    icon: Phone,
  },
];

export default function ContatoPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <section className="relative overflow-hidden py-16 md:py-20 border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[540px] h-[240px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Fale com a EAN Images
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
            Precisa de suporte, tem uma dúvida comercial ou quer acompanhar um pedido? Use um dos canais abaixo.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16 md:py-20">
        <div className="grid md:grid-cols-3 gap-6">
          {contactOptions.map((option) => {
            const Icon = option.icon;

            return (
              <a
                key={option.title}
                href={option.href}
                className="bg-slate-900/50 rounded-2xl p-6 border border-slate-700 hover:border-cyan-500/60 transition-colors"
              >
                <Icon className="w-8 h-8 text-cyan-400 mb-4" />
                <h2 className="text-xl font-bold text-white mb-2">{option.title}</h2>
                <p className="text-slate-300 mb-4">{option.description}</p>
                <span className="text-cyan-300 font-semibold">{option.value}</span>
              </a>
            );
          })}
        </div>

        <div className="mt-12 bg-slate-900/50 rounded-2xl p-6 md:p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-4">Antes de entrar em contato</h2>
          <div className="grid md:grid-cols-2 gap-6 text-slate-300">
            <div>
              <h3 className="font-semibold text-white mb-2">Se for sobre um pedido</h3>
              <p>Informe o e-mail usado no checkout e, se possível, o identificador do pedido.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Se for sobre imagens</h3>
              <p>Envie os códigos EAN envolvidos e descreva o que você esperava encontrar.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
