import type { Metadata } from 'next';
import Link from 'next/link';
import { ContentRemovalForm } from '@/components/forms/ContentRemovalForm';
import { SUPPORT_CONFIG } from '@/lib/config';
import { absoluteUrl, defaultOgImage, siteName } from '@/lib/site';

const pageUrl = absoluteUrl('/remocao-de-conteudo');
const pageTitle = 'Remoção de conteúdo e direitos autorais';
const pageDescription =
  'É titular de uma imagem, descrição ou marca exibida pela EAN Images? Peça a remoção por este formulário. Resposta em até 2 dias úteis.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    type: 'website',
    url: pageUrl,
    title: `${pageTitle} | ${siteName}`,
    description: pageDescription,
    siteName,
    locale: 'pt_BR',
    images: [defaultOgImage],
  },
};

const steps = [
  'Você envia o pedido com os EANs (ou links) e a descrição do seu direito.',
  'Confirmamos o recebimento por e-mail na hora, com um número de protocolo.',
  'Analisamos e respondemos em até 2 dias úteis. Se o pedido for procedente, o conteúdo sai do catálogo e deixa de ser entregue em novos pedidos.',
  'Se precisarmos de alguma informação para confirmar a titularidade, pedimos por e-mail.',
];

export default function RemocaoDeConteudoPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-3xl mx-auto px-4 py-16 md:py-20">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Remoção de conteúdo</h1>
        <p className="mt-5 text-lg text-slate-300 leading-relaxed">
          A {siteName} organiza imagens e dados de identificação de produtos para quem vende esses produtos. As marcas,
          embalagens, fotografias e descrições pertencem aos respectivos titulares. Se você é titular de algum conteúdo
          exibido ou entregue por nós e não autoriza esse uso, peça a remoção abaixo.
        </p>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">Como funciona</h2>
          <ol className="list-decimal space-y-2 pl-6 text-slate-300 leading-relaxed">
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">Enviar pedido</h2>
          <ContentRemovalForm />
          <p className="mt-4 text-sm text-slate-400">
            Prefere e-mail? Escreva para{' '}
            <a href={`mailto:${SUPPORT_CONFIG.email}?subject=${encodeURIComponent('Remoção de conteúdo')}`} className="text-cyan-300 hover:text-cyan-200">
              {SUPPORT_CONFIG.email}
            </a>{' '}
            com os EANs e a descrição do seu direito. Os dados deste pedido são usados só para analisá-lo e responder,
            conforme a{' '}
            <Link href="/politica-de-privacidade" className="text-cyan-300 hover:text-cyan-200">
              Política de Privacidade
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
