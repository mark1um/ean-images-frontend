/**
 * Tabela de preços exibida no site.
 *
 * O valor cobrado é sempre calculado no servidor. Esta cópia serve só para
 * a seção de preços e os exemplos. Ao mudar os valores, atualize também:
 * - faixas: tabela pricing_rules no banco
 * - pacotes: ean-images-backend/src/config/pricing.ts
 */

export interface PriceTier {
  from: number;
  to: number | null;
  pricePerUnit: number;
}

export interface PricePackage {
  size: number;
  price: number;
  extraPricePerUnit: number;
}

export const PRICING_TIERS: PriceTier[] = [
  { from: 1, to: 50, pricePerUnit: 0.2 },
  { from: 51, to: 200, pricePerUnit: 0.15 },
  { from: 201, to: null, pricePerUnit: 0.1 },
];

export const PRICING_PACKAGES: PricePackage[] = [
  { size: 1000, price: 99, extraPricePerUnit: 0.04 },
  { size: 3000, price: 179, extraPricePerUnit: 0.02 },
  { size: 10000, price: 299, extraPricePerUnit: 0.02 },
];

function tieredCents(quantity: number): number {
  let cents = 0;
  PRICING_TIERS.forEach((tier, index) => {
    const next = PRICING_TIERS[index + 1];
    const from = index === 0 ? 1 : tier.from;
    const to = next ? next.from - 1 : Number.MAX_SAFE_INTEGER;
    const units = Math.max(0, Math.min(quantity, to) - from + 1);
    cents += Math.round(units * tier.pricePerUnit * 100);
  });
  return cents;
}

/** Preço só pelas faixas por imagem (sem pacote). */
export function tieredPrice(quantity: number): number {
  if (!Number.isInteger(quantity) || quantity <= 0) return 0;
  return tieredCents(quantity) / 100;
}

/** Mesmo cálculo do servidor: o menor valor entre faixas e pacotes. */
export function estimatePrice(quantity: number): number {
  if (!Number.isInteger(quantity) || quantity <= 0) return 0;

  let bestCents = tieredCents(quantity);
  for (const pkg of PRICING_PACKAGES) {
    const extra = Math.max(0, quantity - pkg.size);
    const cents = Math.round(pkg.price * 100) + Math.round(extra * pkg.extraPricePerUnit * 100);
    if (cents < bestCents) bestCents = cents;
  }

  return bestCents / 100;
}
