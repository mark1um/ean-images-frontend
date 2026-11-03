import { ogSize, renderOgImage } from '@/lib/og-image';
import { PRICING_TIERS } from '@/lib/pricing';

export const alt = 'EAN Images - Banco de imagens de produtos por EAN';
export const size = ogSize;
export const contentType = 'image/png';
// Edge: o gerador de imagens no runtime Node falha no build local do Windows
export const runtime = 'edge';

const unitPrice = PRICING_TIERS[0].pricePerUnit.toFixed(2).replace('.', ',');

export default function Image() {
  return renderOgImage({
    eyebrow: 'Banco de imagens de produtos',
    title: 'Baixe imagens de produtos pelo código EAN',
    footer: `Consulta grátis · A partir de R$ ${unitPrice} por imagem · PIX · Entrega por e-mail`,
  });
}
