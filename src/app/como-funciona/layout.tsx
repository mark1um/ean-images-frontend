import type { Metadata } from 'next';

import { absoluteUrl, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Como funciona: baixar imagens de produtos pelo EAN em 3 passos',
  description:
    'Aprenda como funciona o banco de imagens EAN. Guia completo sobre como buscar, encontrar e comprar imagens de produtos pelo código EAN de forma rápida e segura.',
  keywords: [
    'como funciona EAN Images',
    'buscar imagens por EAN',
    'código de barras',
    'banco de imagens',
    'e-commerce',
  ],
  alternates: { canonical: `${siteUrl}/como-funciona` },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/como-funciona`,
    title: 'Como Funciona — Banco de Imagens EAN',
    description: 'Guia completo para buscar e comprar imagens de produtos pelo EAN.',
    images: [
      {
        url: absoluteUrl('/assets/logo-escura.jpg'),
        width: 1200,
        height: 630,
        alt: 'EAN Images - Banco de Imagens de Produtos',
      },
    ],
  },
};

export default function ComoFuncionaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
