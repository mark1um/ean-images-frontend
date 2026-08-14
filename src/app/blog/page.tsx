import type { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-posts';
import { absoluteUrl, siteName } from '@/lib/site';

export const metadata: Metadata = {
  title: `Blog | ${siteName}`,
  description:
    'Conteúdos sobre imagens de produtos, cadastro por EAN, e-commerce, marketplaces e organização de catálogos digitais.',
  alternates: {
    canonical: absoluteUrl('/blog'),
  },
  openGraph: {
    type: 'website',
    url: absoluteUrl('/blog'),
    title: `Blog | ${siteName}`,
    description: 'Conteúdos sobre imagens de produtos, EAN e catálogos digitais.',
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <section className="relative overflow-hidden py-16 md:py-20 border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[540px] h-[240px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Blog EAN Images
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
            Conteúdos práticos sobre imagens de produtos, cadastro por EAN, e-commerce e marketplaces.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <article key={post.slug} className="bg-slate-900/50 rounded-lg p-6 border border-slate-700">
              <span className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-semibold mb-4">
                {post.tag}
              </span>
              <h2 className="text-xl font-bold text-white mb-3">
                <Link href={`/blog/${post.slug}`} className="hover:text-cyan-200 transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="text-slate-300">{post.description}</p>
              <div className="mt-5 flex items-center justify-between gap-4 text-sm">
                <span className="text-slate-400">{post.readTime}</span>
                <Link href={`/blog/${post.slug}`} className="font-semibold text-cyan-300 hover:text-cyan-200">
                  Ler artigo
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 bg-slate-900/50 rounded-lg p-6 md:p-8 border border-slate-700 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Encontre imagens por EAN</h2>
          <p className="text-slate-300 mb-6">
            Use a busca para validar EANs individuais ou listas em lote antes de comprar.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/faq" className="btn-secondary">
              Ver FAQ
            </Link>
            <Link href="/" className="btn-primary">
              Buscar imagens
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
