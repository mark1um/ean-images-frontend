import type { Metadata } from 'next';
import { absoluteUrl, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'FAQ — Perguntas Frequentes sobre EAN Images',
  description:
    'Perguntas frequentes sobre como buscar e baixar imagens de produtos pelo código EAN. Saiba tudo sobre preços, pagamentos, qualidade e suporte.',
  keywords: [
    'FAQ EAN Images',
    'como buscar imagens por EAN',
    'perguntas frequentes',
    'EAN código de barras',
    'banco de imagens',
  ],
  openGraph: {
    type: 'website',
    url: `${siteUrl}/faq`,
    title: 'FAQ — Perguntas Frequentes sobre EAN Images',
    description: 'Saiba tudo sobre como buscar e baixar imagens de produtos pelo EAN.',
    images: [
      {
        url: absoluteUrl('/assets/logo-escura.jpg'),
        width: 1200,
        height: 630,
        alt: 'EAN Images - Banco de Imagens de Produtos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ — Perguntas Frequentes sobre EAN Images',
    description: 'Saiba tudo sobre como buscar e baixar imagens de produtos pelo EAN.',
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
