import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blog-posts';
import { siteUrl } from '@/lib/site';

// Data da última mudança de conteúdo das páginas fixas. Atualize ao editar
// o texto delas; data que muda a cada deploy faz o Google ignorar o campo.
const pagesUpdatedAt = new Date('2026-11-03');

const staticRoutes: MetadataRoute.Sitemap = [
  {
    url: siteUrl,
    lastModified: pagesUpdatedAt,
    changeFrequency: 'daily',
    priority: 1.0,
  },
  {
    url: `${siteUrl}/api-ean`,
    lastModified: new Date('2026-11-19'),
    changeFrequency: 'weekly',
    priority: 0.95,
  },
  {
    url: `${siteUrl}/verificar-codigo-de-barras`,
    lastModified: new Date('2026-11-24'),
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  {
    url: `${siteUrl}/faq`,
    lastModified: pagesUpdatedAt,
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  {
    url: `${siteUrl}/como-funciona`,
    lastModified: pagesUpdatedAt,
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  {
    url: `${siteUrl}/sobre-nos`,
    lastModified: pagesUpdatedAt,
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${siteUrl}/contato`,
    lastModified: pagesUpdatedAt,
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${siteUrl}/blog`,
    lastModified: pagesUpdatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    url: `${siteUrl}/status`,
    lastModified: pagesUpdatedAt,
    changeFrequency: 'weekly',
    priority: 0.5,
  },
  {
    url: `${siteUrl}/politica-de-privacidade`,
    lastModified: pagesUpdatedAt,
    changeFrequency: 'yearly',
    priority: 0.4,
  },
  {
    url: `${siteUrl}/termos-de-uso`,
    lastModified: pagesUpdatedAt,
    changeFrequency: 'yearly',
    priority: 0.4,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const articleRoutes = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...articleRoutes];
}
