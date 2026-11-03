import { getBlogPost } from '@/lib/blog-posts';
import { ogSize, renderOgImage } from '@/lib/og-image';

export const alt = 'Artigo do blog EAN Images';
export const size = ogSize;
export const contentType = 'image/png';
// Edge: o gerador de imagens no runtime Node falha no build local do Windows
export const runtime = 'edge';

export default function Image({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  return renderOgImage({
    eyebrow: post ? `Blog · ${post.tag}` : 'Blog',
    title: post?.title ?? 'Imagens de produtos por EAN',
    footer: 'eanimages.com.br/blog',
  });
}
