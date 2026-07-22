/**
 * Cliente de API para comunicação com o backend.
 *
 * Todas as chamadas passam por este módulo para:
 * - Centralizar a URL base
 * - Tratar erros de forma consistente
 * - Facilitar mocking em testes
 */

import type { AnalyzeResponse, BatchSearchResponse, CheckoutResponse, OrderStatus } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

class ApiError extends Error {
  constructor(
    public message: string,
    public code: string,
    public status: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(
      data.message ?? 'Erro desconhecido',
      data.error ?? 'UNKNOWN_ERROR',
      response.status
    );
  }

  return data as T;
}

// ─────────────────────────────────────────────
// Busca em lote de produtos por EAN ou descrição
// ─────────────────────────────────────────────
async function searchBatch(
  lines: string[],
  couponCode?: string
): Promise<AnalyzeResponse> {
  const response = await fetch(`${API_URL}/search/batch`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lines, couponCode }),
  });

  const batchResponse = await handleResponse<BatchSearchResponse>(response);
  
  // Transformar BatchSearchResponse para AnalyzeResponse mantendo compatibilidade
  const foundEans = batchResponse.foundProducts
    .filter(product => product.found)
    .map(product => ({
      ean: product.ean,
      found: true,
      imageKey: product.imageKey,
      extension: product.extension,
    }));

  // Combinar produtos não encontrados com base na entrada original
  const notFoundInputs = batchResponse.foundProducts
    .filter(product => !product.found)
    .map(product => product.input);
  const allNotFound = [...notFoundInputs, ...batchResponse.notFoundProducts];

  // Construir resposta compatível com AnalyzeResponse
  // Nota: Pricing será calculado no backend após a busca
  const analyzeResponse: AnalyzeResponse = {
    sessionId: batchResponse.sessionId,
    stats: batchResponse.stats,
    expiresAt: batchResponse.expiresAt,
    foundEans,
    notFoundEans: allNotFound,
    pricing: {
      quantity: batchResponse.stats.totalFound,
      pricePerUnit: 0, // Será preenchido pelo backend
      subtotal: 0,
      discount: 0,
      total: 0,
      couponApplied: couponCode,
      breakdown: [],
    },
  };

  return analyzeResponse;
}

// ─────────────────────────────────────────────
// Análise de EANs via texto
// ─────────────────────────────────────────────
export async function analyzeEans(
  eans: string,
  couponCode?: string
): Promise<AnalyzeResponse> {
  // Processar input texto em array de linhas
  const lines = eans
    .split(/[\n,;]+/)
    .map(line => line.trim())
    .filter(line => line.length > 0);

  return searchBatch(lines, couponCode);
}

// ─────────────────────────────────────────────
// Análise de EANs via arquivo
// ─────────────────────────────────────────────
export async function analyzeFile(
  file: File,
  couponCode?: string
): Promise<AnalyzeResponse> {
  const text = await file.text();
  
  // Processar arquivo em array de linhas
  const lines = text
    .split(/[\n,;]+/)
    .map(line => line.trim())
    .filter(line => line.length > 0);

  return searchBatch(lines, couponCode);
}

// ─────────────────────────────────────────────
// Checkout
// ─────────────────────────────────────────────
export async function createCheckout(params: {
  sessionId: string;
  email: string;
  name?: string;
  couponCode?: string;
}): Promise<CheckoutResponse> {
  const response = await fetch(`${API_URL}/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  return handleResponse<CheckoutResponse>(response);
}

// ─────────────────────────────────────────────
// Status do pedido (polling)
// ─────────────────────────────────────────────
export async function getOrderStatus(orderId: string): Promise<OrderStatus> {
  const response = await fetch(`${API_URL}/order/${orderId}/status`);
  return handleResponse<OrderStatus>(response);
}

export { ApiError };
