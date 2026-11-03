export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eanimages.com.br';

export const siteName = 'EAN Images';

export const siteDescription =
  'Banco de imagens de produtos por EAN para e-commerces, marketplaces e catálogos digitais.';

export function absoluteUrl(path = '') {
  if (!path) return siteUrl;
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Imagem de compartilhamento padrão (gerada em src/app/opengraph-image.tsx). */
export const defaultOgImage = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: `${siteName} - Banco de imagens de produtos por EAN`,
};
