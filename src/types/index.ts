// Tipos espelhados da API backend

export interface EanMatchResult {
  ean: string;
  found: boolean;
  imageKey?: string;
  extension?: string;
}

export interface PricingBreakdownItem {
  label: string;
  quantity: number;
  pricePerUnit: number;
  subtotal: number;
}

export interface PricingResult {
  quantity: number;
  pricePerUnit: number;
  subtotal: number;
  discount: number;
  total: number;
  couponApplied?: string;
  breakdown: PricingBreakdownItem[];
}

export interface AnalyzeStats {
  totalSubmitted: number;
  totalValid: number;
  totalFound: number;
  totalNotFound: number;
  duplicatesRemoved: number;
  invalidRemoved: number;
}

export interface AnalyzeResponse {
  sessionId: string;
  stats: AnalyzeStats;
  pricing: PricingResult;
  foundEans: EanMatchResult[];
  notFoundEans: string[];
  expiresAt: string;
}

// Tipos para o novo endpoint /search/batch
export interface FoundProduct {
  input: string;
  ean: string;
  name: string;
  description: string;
  relevanceScore: number;
  found: boolean;
  imageKey?: string;
  extension?: string;
}

export interface BatchSearchResponse {
  sessionId: string;
  stats: AnalyzeStats;
  foundProducts: FoundProduct[];
  notFoundProducts: string[];
  expiresAt: string;
  message: string;
}

export interface CheckoutResponse {
  orderId: string;
  paymentUrl: string;
  paymentId?: string;
  paymentStatus?: string;
  pix?: {
    brCode: string;
    qrCodeImageBase64: string;
    expiresAt?: string;
  };
  total: number;
}

export interface OrderStatus {
  orderId: string;
  status: 'PENDING' | 'PAID' | 'PROCESSING' | 'SENT' | 'ERROR' | 'EXPIRED';
  totalFound: number;
  totalPrice: number;
  paidAt?: string;
  sentAt?: string;
  zipExpiresAt?: string;
  createdAt: string;
}

export type AppStep = 'input' | 'analyzing' | 'result' | 'checkout' | 'processing' | 'success';

export interface AppState {
  step: AppStep;
  analyzeResult?: AnalyzeResponse;
  checkoutResult?: CheckoutResponse;
  orderId?: string;
}
