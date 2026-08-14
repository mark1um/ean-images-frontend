import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts, getArticleSchema, getBlogPost, getBlogPostUrl } from '@/lib/blog-posts';
import { absoluteUrl, siteName } from '@/lib/site';

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getBlogPost(params.slug);

  if (!post) {
    return {};
  }

  const url = getBlogPostUrl(post.slug);

  return {
    title: `${post.title} | ${siteName}`,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.description,
      siteName,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [siteName],
      images: [
        {
          url: absoluteUrl('/assets/logo-escura.jpg'),
          width: 1200,
          height: 630,
          alt: `${siteName} - ${post.title}`,
        },
      ],
      locale: 'pt_BR',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [absoluteUrl('/assets/logo-escura.jpg')],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Início',
        item: absoluteUrl('/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: absoluteUrl('/blog'),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: getBlogPostUrl(post.slug),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getArticleSchema(post)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="max-w-3xl mx-auto px-4 py-16 md:py-20">
        <Link href="/blog" className="text-sm font-semibold text-cyan-300 hover:text-cyan-200">
          Blog
        </Link>
        <div className="mt-6">
          <span className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-semibold mb-4">
            {post.tag}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            {post.title}
          </h1>
          <p className="mt-5 text-lg text-slate-300 leading-relaxed">{post.description}</p>
          <p className="mt-4 text-sm text-slate-400">
            Publicado em {new Date(`${post.publishedAt}T00:00:00`).toLocaleDateString('pt-BR')} · {post.readTime}
          </p>
        </div>

        <div className="mt-12 space-y-10">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-bold text-white mb-4">{section.heading}</h2>
              <div className="space-y-4">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-slate-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-12 border-t border-slate-800 pt-8">
          <h2 className="text-2xl font-bold text-white mb-3">Procure imagens por EAN</h2>
          <p className="text-slate-300 mb-6">
            Cole um EAN ou envie uma planilha para verificar a disponibilidade de imagens de produtos.
          </p>
          <Link href="/" className="btn-primary inline-block">
            Buscar imagens agora
          </Link>
        </section>
      </article>
    </main>
  );
}
