import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ean-images.com';

export const metadata: Metadata = {
  title: 'Como Funciona — Guia Completo do Banco de Imagens EAN',
  description:
    'Aprenda como funciona o banco de imagens EAN. Guia completo sobre como buscar, encontrar e comprar imagens de produtos pelo código EAN de forma rápida e segura.',
  keywords: [
    'como funciona EAN Images',
    'buscar imagens por EAN',
    'código de barras',
    'banco de imagens',
    'e-commerce',
  ],
  openGraph: {
    type: 'website',
    url: `${siteUrl}/como-funciona`,
    title: 'Como Funciona — Banco de Imagens EAN',
    description: 'Guia completo para buscar e comprar imagens de produtos pelo EAN.',
    images: [
      {
        url: `${siteUrl}/assets/logo-horizontal.png`,
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
