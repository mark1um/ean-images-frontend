/**
 * Dados da EAN Images API (produto para desenvolvedores) usados no site principal.
 *
 * Os preços vêm ao vivo de GET /v1/pricing (revalidados a cada hora). Os valores
 * abaixo só entram se a API não responder no build; mantenha-os parecidos com o
 * seed do projeto ean-images-api (prisma/seed.ts).
 */

export const apiDevelopersUrl = 'https://developers.eanimages.com.br';
export const apiDocsUrl = `${apiDevelopersUrl}/docs`;
export const apiSignupUrl = `${apiDevelopersUrl}/cadastro`;
export const apiBaseUrl = 'https://api.eanimages.com.br';
export const apiOpenApiUrl = `${apiBaseUrl}/v1/openapi.json`;

/** Página do site principal que apresenta a API. */
export const apiLandingPath = '/api-ean';

export type ApiPlan = { code: string; name: string; monthlyQuota: number; priceCents: number; highlight: boolean };
export type ApiPackage = { code: string; name: string; credits: number; priceCents: number; highlight: boolean };
export type ApiPricing = { plans: ApiPlan[]; packages: ApiPackage[] };

export const fallbackApiPricing: ApiPricing = {
  plans: [
    { code: 'basico', name: 'Básico', monthlyQuota: 300, priceCents: 1490, highlight: false },
    { code: 'profissional', name: 'Profissional', monthlyQuota: 1500, priceCents: 5990, highlight: true },
    { code: 'empresa', name: 'Empresa', monthlyQuota: 5000, priceCents: 17990, highlight: false },
  ],
  packages: [
    { code: 'starter', name: 'Starter', credits: 100, priceCents: 500, highlight: false },
    { code: 'pro', name: 'Pro', credits: 500, priceCents: 2250, highlight: false },
    { code: 'business', name: 'Business', credits: 2000, priceCents: 8000, highlight: true },
    { code: 'scale', name: 'Scale', credits: 10000, priceCents: 35000, highlight: false },
  ],
};

export async function getApiPricing(): Promise<ApiPricing> {
  try {
    const res = await fetch(`${apiBaseUrl}/v1/pricing`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return fallbackApiPricing;
    const data = (await res.json()) as Partial<ApiPricing>;
    if (!data.plans?.length || !data.packages?.length) return fallbackApiPricing;
    return { plans: data.plans, packages: data.packages };
  } catch {
    return fallbackApiPricing;
  }
}

export const formatCents = (cents: number) =>
  (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

/** Preço por crédito, ex.: "R$ 0,050". */
export const formatPerCredit = (cents: number, credits: number) =>
  `R$ ${(cents / credits / 100).toFixed(3).replace('.', ',')}`;

/** Menor preço por crédito entre planos e pacotes. */
export function lowestPerCreditCents(pricing: ApiPricing) {
  const values = [
    ...pricing.plans.map((p) => p.priceCents / p.monthlyQuota),
    ...pricing.packages.map((p) => p.priceCents / p.credits),
  ];
  return Math.min(...values);
}
