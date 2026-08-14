import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blog-posts';
import { siteUrl } from '@/lib/site';

const now = new Date();

const staticRoutes: MetadataRoute.Sitemap = [
  {
    url: siteUrl,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 1.0,
  },
  {
    url: `${siteUrl}/faq`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  {
    url: `${siteUrl}/como-funciona`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  {
    url: `${siteUrl}/sobre-nos`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${siteUrl}/contato`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${siteUrl}/blog`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    url: `${siteUrl}/status`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.5,
  },
  {
    url: `${siteUrl}/produto`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
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
