import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Analytics from './Analytics';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { absoluteUrl, siteDescription, siteName, siteUrl } from '@/lib/site';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Banco de Imagens de Produtos por EAN`,
    template: `%s | ${siteName}`,
  },
  description:
    'Busque e baixe imagens de produtos pelo código EAN ou GTIN. Plataforma para e-commerce, marketplace e catálogos digitais, com consulta em lote e entrega por e-mail.',
  keywords: [
    'banco de imagens EAN',
    'imagens de produtos EAN',
    'baixar imagens pelo EAN',
    'buscar imagem por código de barras',
    'GTIN imagens de produtos',
    'imagens para marketplace',
    'cadastro de produtos e-commerce',
    'catálogo digital',
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: `${siteName} | Banco de Imagens de Produtos por EAN`,
    description: siteDescription,
    siteName,
    images: [
      {
        url: absoluteUrl('/assets/logo-escura.jpg'),
        width: 1200,
        height: 630,
        alt: `${siteName} - Banco de Imagens de Produtos`,
        type: 'image/jpeg',
      },
    ],
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} | Banco de Imagens de Produtos por EAN`,
    description: 'Busque imagens de produtos pelo código EAN. Rápido, simples e sem cadastro.',
    images: [absoluteUrl('/assets/logo-escura.jpg')],
  },
  formatDetection: {
    telephone: false,
    email: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: siteUrl,
    logo: absoluteUrl('/assets/logo-escura.jpg'),
    description: siteDescription,
  };

  const webApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: siteName,
    url: siteUrl,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description:
      'Busca e download de imagens de produtos pelo código EAN ou GTIN para e-commerce, marketplace e catálogos digitais.',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'BRL',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/?ean={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/assets/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/assets/logo-escura.jpg" />
        <link rel="help" type="text/plain" href="/llms.txt" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
        />
        <Analytics />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1e293b',
              color: '#f1f5f9',
              border: '1px solid #334155',
            },
          }}
        />
      </body>
    </html>
  );
}
