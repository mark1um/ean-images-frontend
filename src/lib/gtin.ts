/**
 * Validação de códigos GTIN (EAN-8, UPC-A, EAN-13, GTIN-14) pelo dígito verificador.
 * Roda no navegador, sem chamada de rede.
 */

export type GtinType = 'EAN-8' | 'UPC-A (GTIN-12)' | 'EAN-13 (GTIN-13)' | 'GTIN-14 (DUN-14)';

export type GtinCheck = {
  input: string;
  digits: string;
  valid: boolean;
  type?: GtinType;
  /** Dígito verificador correto, calculado a partir dos demais dígitos. */
  expectedCheckDigit?: number;
  /** Onde a empresa licenciou o prefixo (não é a origem do produto). */
  prefixInfo?: string;
  error?: string;
};

const typeByLength: Record<number, GtinType> = {
  8: 'EAN-8',
  12: 'UPC-A (GTIN-12)',
  13: 'EAN-13 (GTIN-13)',
  14: 'GTIN-14 (DUN-14)',
};

/** Calcula o dígito verificador GS1 para o corpo do código (todos os dígitos menos o último). */
export function computeCheckDigit(body: string): number {
  let sum = 0;
  // Da direita para a esquerda, os pesos alternam 3, 1, 3, 1...
  for (let i = body.length - 1, weight = 3; i >= 0; i -= 1, weight = weight === 3 ? 1 : 3) {
    sum += Number(body[i]) * weight;
  }
  return (10 - (sum % 10)) % 10;
}

// Faixas de prefixo GS1 mais comuns (3 primeiros dígitos do GTIN-13).
const prefixRanges: Array<[number, number, string]> = [
  [0, 19, 'GS1 EUA/Canadá (UPC)'],
  [20, 29, 'uso interno da loja (ex.: produtos pesados na balança)'],
  [30, 39, 'GS1 EUA (medicamentos)'],
  [40, 49, 'uso interno da empresa'],
  [50, 59, 'cupons'],
  [60, 139, 'GS1 EUA/Canadá (UPC)'],
  [200, 299, 'uso interno da loja (ex.: produtos pesados na balança)'],
  [300, 379, 'GS1 França'],
  [400, 440, 'GS1 Alemanha'],
  [450, 459, 'GS1 Japão'],
  [460, 469, 'GS1 Rússia'],
  [471, 471, 'GS1 Taiwan'],
  [489, 489, 'GS1 Hong Kong'],
  [490, 499, 'GS1 Japão'],
  [500, 509, 'GS1 Reino Unido'],
  [540, 549, 'GS1 Bélgica e Luxemburgo'],
  [560, 560, 'GS1 Portugal'],
  [570, 579, 'GS1 Dinamarca'],
  [590, 590, 'GS1 Polônia'],
  [690, 699, 'GS1 China'],
  [729, 729, 'GS1 Israel'],
  [730, 739, 'GS1 Suécia'],
  [750, 750, 'GS1 México'],
  [760, 769, 'GS1 Suíça'],
  [770, 771, 'GS1 Colômbia'],
  [773, 773, 'GS1 Uruguai'],
  [775, 775, 'GS1 Peru'],
  [778, 779, 'GS1 Argentina'],
  [780, 780, 'GS1 Chile'],
  [784, 784, 'GS1 Paraguai'],
  [789, 790, 'GS1 Brasil'],
  [800, 839, 'GS1 Itália'],
  [840, 849, 'GS1 Espanha'],
  [868, 869, 'GS1 Turquia'],
  [870, 879, 'GS1 Países Baixos'],
  [880, 880, 'GS1 Coreia do Sul'],
  [885, 885, 'GS1 Tailândia'],
  [888, 888, 'GS1 Singapura'],
  [890, 890, 'GS1 Índia'],
  [893, 893, 'GS1 Vietnã'],
  [899, 899, 'GS1 Indonésia'],
  [930, 939, 'GS1 Austrália'],
  [940, 949, 'GS1 Nova Zelândia'],
  [955, 955, 'GS1 Malásia'],
  [977, 977, 'publicações periódicas (ISSN)'],
  [978, 979, 'livros (ISBN)'],
];

function describePrefix(gtin13: string): string | undefined {
  const prefix = Number(gtin13.slice(0, 3));
  const match = prefixRanges.find(([from, to]) => prefix >= from && prefix <= to);
  return match?.[2];
}

export function checkGtin(raw: string): GtinCheck {
  const input = raw.trim();
  const digits = input.replace(/[\s.-]/g, '');

  if (!digits) {
    return { input, digits, valid: false, error: 'Código vazio.' };
  }
  if (!/^\d+$/.test(digits)) {
    return { input, digits, valid: false, error: 'Use apenas números.' };
  }

  const type = typeByLength[digits.length];
  if (!type) {
    return {
      input,
      digits,
      valid: false,
      error: `${digits.length} dígitos: um GTIN tem 8, 12, 13 ou 14 dígitos.`,
    };
  }

  const expectedCheckDigit = computeCheckDigit(digits.slice(0, -1));
  const valid = expectedCheckDigit === Number(digits[digits.length - 1]);

  let prefixInfo: string | undefined;
  if (digits.length === 12) prefixInfo = describePrefix(`0${digits}`);
  if (digits.length === 13) prefixInfo = describePrefix(digits);
  if (digits.length === 14) prefixInfo = describePrefix(digits.slice(1));

  return {
    input,
    digits,
    valid,
    type,
    expectedCheckDigit,
    prefixInfo,
    error: valid ? undefined : `Dígito verificador errado: o último dígito deveria ser ${expectedCheckDigit}.`,
  };
}
