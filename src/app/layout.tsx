import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ean-images.com';

export const metadata: Metadata = {
  title: 'EAN Images — Banco de Imagens de Produtos',
  description:
    'Banco de imagens EAN: baixe imagens de produtos pelo código EAN instantaneamente. Busca rápida, simples e sem cadastro. Perfeito para e-commerce e marketplaces.',
  keywords: [
    'banco de imagens EAN',
    'imagens de produtos EAN',
    'EAN code images',
    'baixar imagens pelo EAN',
    'código de barras',
    'imagens de produtos',
    'búsqueda por EAN',
  ],
  authors: [{ name: 'EAN Images' }],
  creator: 'EAN Images',
  publisher: 'EAN Images',
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
    title: 'EAN Images — Banco de Imagens de Produtos',
    description: 'Banco de imagens EAN: baixe imagens de produtos pelo código EAN instantaneamente.',
    siteName: 'EAN Images',
    images: [
      {
        url: `${siteUrl}/assets/logo-horizontal.png`,
        width: 1200,
        height: 630,
        alt: 'EAN Images - Banco de Imagens de Produtos',
        type: 'image/png',
      },
    ],
    locale: 'pt_BR',
    alternateLocale: ['en_US'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EAN Images — Banco de Imagens de Produtos',
    description: 'Busque imagens de produtos pelo codigo EAN. Rápido, simples, sem cadastro.',
    images: [`${siteUrl}/assets/logo-horizontal.png`],
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
  // JSON-LD Schema para Organization
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'EAN Images',
    url: siteUrl,
    logo: `${siteUrl}/assets/logo.png`,
    description: 'Banco de imagens de produtos por EAN',
    sameAs: [
      // Adicione suas URLs de redes sociais aqui se existirem
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      // Adicione seu email/telefone se desejar
    },
  };

  // JSON-LD Schema para WebApplication (SearchAction)
  const webApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'EAN Images',
    url: siteUrl,
    applicationCategory: 'ProductSearchApplication',
    description: 'Busque e baixe imagens de produtos pelo código EAN',
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
        {/* Favicon */}
        <link rel="icon" href="/assets/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/assets/logo.png" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={siteUrl} />

        {/* JSON-LD Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
        />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="pt-16">
          {children}
        </main>
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
