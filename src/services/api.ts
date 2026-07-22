/**
 * Cliente de API para comunicação com o backend.
 *
 * Todas as chamadas passam por este módulo para:
 * - Centralizar a URL base
 * - Tratar erros de forma consistente
 * - Facilitar mocking em testes
 */

import type { AnalyzeResponse, CheckoutResponse, OrderStatus } from '@/types';

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
// Análise de EANs via texto
// ─────────────────────────────────────────────
export async function analyzeEans(
  eans: string,
  couponCode?: string
): Promise<AnalyzeResponse> {
  const response = await fetch(`${API_URL}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ eans, couponCode }),
  });

  return handleResponse<AnalyzeResponse>(response);
}

// ─────────────────────────────────────────────
// Análise de EANs via arquivo
// ─────────────────────────────────────────────
export async function analyzeFile(
  file: File,
  couponCode?: string
): Promise<AnalyzeResponse> {
  const formData = new FormData();
  formData.append('file', file);
  if (couponCode) formData.append('couponCode', couponCode);

  const response = await fetch(`${API_URL}/analyze`, {
    method: 'POST',
    body: formData,
  });

  return handleResponse<AnalyzeResponse>(response);
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
