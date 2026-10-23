/**
 * Configurações gerais da aplicação
 */

export const SUPPORT_CONFIG = {
  email: 'contato@eanimages.com.br',
  whatsapp: {
    number: '+558296094565',
    display: '(82) 99609-4565',
    url: 'https://wa.me/558296094565',
  },
  phone: {
    number: '+558296094565',
    display: '(82) 99609-4565',
    tel: 'tel:+558296094565',
  },
};

/** Valor mínimo cobrado por pedido (mesma regra do backend: MIN_ORDER_TOTAL) */
export const MIN_ORDER_TOTAL = 1;

/** A partir de quantos EANs mostramos o atendimento para lotes grandes */
export const LARGE_BATCH_MIN_EANS = 100;

/** Link do WhatsApp com mensagem já escrita */
export function whatsappLink(message: string): string {
  return `${SUPPORT_CONFIG.whatsapp.url}?text=${encodeURIComponent(message)}`;
}

export const PROCESSING_CONFIG = {
  estimatedTimeMin: 5,
  estimatedTimeMax: 10,
  downloadLinkValidityDays: 7,
  timeoutMinutes: 30,
};

/**
 * Mensagens de contato para contato de suporte
 */
export const CONTACT_MESSAGES = {
  notReceivedEmail: `Não recebi o email ainda`,
  linkExpired: `O link de download expirou`,
  missingImages: `Falta alguma imagem no arquivo`,
};
