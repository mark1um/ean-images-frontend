/**
 * Configurações gerais da aplicação
 */

export const SUPPORT_CONFIG = {
  email: 'contato@eanimages.com.br',
  whatsapp: {
    number: '+558296094565',
    display: '(82) 96094-565',
    url: 'https://wa.me/558296094565',
  },
  phone: {
    number: '+558296094565',
    display: '(82) 96094-565',
    tel: 'tel:+558296094565',
  },
};

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
