import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EAN Images — Banco de Imagens de Produtos',
  description:
    'Encontre e baixe imagens de produtos pelo código EAN em segundos. Rápido, simples e sem cadastro.',
  keywords: ['imagens de produtos', 'EAN', 'código de barras', 'banco de imagens'],
  openGraph: {
    title: 'EAN Images — Banco de Imagens de Produtos',
    description: 'Encontre e baixe imagens de produtos pelo código EAN em segundos.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
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
