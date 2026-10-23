/**
 * Eventos do funil no GA4.
 *
 * Etapas (na ordem):
 *   search_submitted → search_result → generate_lead → view_result
 *   → begin_checkout → add_payment_info (PIX gerado) → purchase
 *
 * Extras: pix_copied, pix_regenerated, whatsapp_click, recovery_opened,
 * search_error, checkout_error.
 */

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: 'event', eventName: string, params?: GtagParams) => void;
  }
}

export function trackEvent(eventName: string, params: GtagParams = {}): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  try {
    window.gtag('event', eventName, params);
  } catch {
    // Analytics nunca deve quebrar o site
  }
}

/** Envia o evento só uma vez por chave (ex.: purchase por pedido), mesmo se a página recarregar. */
export function trackEventOnce(key: string, eventName: string, params: GtagParams = {}): void {
  const storageKey = `ga-once:${key}`;
  try {
    if (localStorage.getItem(storageKey)) return;
    localStorage.setItem(storageKey, '1');
  } catch {
    // Sem localStorage (aba anônima etc.): envia mesmo assim
  }
  trackEvent(eventName, params);
}
