import type { Metadata } from 'next';
import Link from 'next/link';
import { GtinValidator } from '@/components/forms/GtinValidator';
import { absoluteUrl, defaultOgImage, siteName } from '@/lib/site';

const pagePath = '/verificar-codigo-de-barras';
const pageUrl = absoluteUrl(pagePath);
const pageTitle = 'Verificar código de barras EAN/GTIN online (grátis)';
const pageDescription =
  'Valide códigos de barras EAN-13, EAN-8, UPC e GTIN-14 na hora: confira o dígito verificador, o tipo do código e o prefixo GS1. Grátis, sem cadastro, até 500 códigos de uma vez.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    'verificar código de barras',
    'validar EAN',
    'validar GTIN',
    'consultar código de barras',
    'dígito verificador EAN',
    'código de barras válido',
    'verificar GTIN',
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    type: 'website',
    url: pageUrl,
    title: `${pageTitle} | ${siteName}`,
    description: pageDescription,
    siteName,
    locale: 'pt_BR',
    images: [defaultOgImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${pageTitle} | ${siteName}`,
    description: pageDescription,
  },
};

const faqs = [
  {
    question: 'Como saber se um código de barras é válido?',
    answer:
      'Todo EAN/GTIN termina com um dígito verificador calculado a partir dos outros dígitos. Se o cálculo não bate com o último número, o código foi digitado errado ou foi inventado. O verificador acima faz essa conta na hora para até 500 códigos.',
  },
  {
    question: 'Código válido quer dizer que o produto existe?',
    answer:
      'Não. A validação só confirma que o número segue a regra GS1. Um GTIN inventado pode ter o dígito verificador certo. Para saber a quem o código pertence, consulte o Verified by GS1 ou o Cadastro Nacional de Produtos da GS1 Brasil; para saber se existe foto do produto, faça a busca grátis na EAN Images.',
  },
  {
    question: 'Os códigos que digito são enviados para algum lugar?',
    answer:
      'Não. A verificação roda no seu navegador. Os códigos só vão para a EAN Images se você clicar em buscar fotos.',
  },
  {
    question: 'O prefixo 789 quer dizer que o produto é brasileiro?',
    answer:
      'Quer dizer que a empresa dona do código licenciou o número na GS1 Brasil. O produto pode ter sido fabricado em outro país. O prefixo indica onde o código foi registrado, não a origem do produto.',
  },
  {
    question: 'Quantos dígitos tem um código de barras?',
    answer:
      'EAN-8 tem 8 dígitos, UPC-A tem 12, EAN-13 tem 13 (o mais comum no Brasil) e GTIN-14 tem 14, usado em caixas e fardos.',
  },
];

const steps = [
  'Multiplique os dígitos, da direita para a esquerda e sem contar o último, alternadamente por 3 e por 1.',
  'Some todos os resultados.',
  'O dígito verificador é o que falta para chegar à próxima dezena. Se a soma já é múltipla de 10, ele é 0.',
];

export default function VerificarCodigoDeBarrasPage() {
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Verificador de código de barras EAN/GTIN',
      url: pageUrl,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Qualquer (navegador)',
      inLanguage: 'pt-BR',
      description: pageDescription,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      provider: { '@type': 'Organization', name: siteName, url: absoluteUrl('/') },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: absoluteUrl('/') },
        { '@type': 'ListItem', position: 2, name: 'Verificar código de barras', item: pageUrl },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {schemas.map((schema) => (
        <script
          key={schema['@type']}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="max-w-3xl mx-auto px-4 py-16 md:py-20">
        <span className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-semibold mb-4">
          Ferramenta grátis
        </span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          Verificar código de barras EAN/GTIN
        </h1>
        <p className="mt-5 text-lg text-slate-300 leading-relaxed">
          Cole um ou vários códigos para conferir se o dígito verificador está certo, qual é o tipo do código
          (EAN-13, EAN-8, UPC ou GTIN-14) e em que país o prefixo foi licenciado. Funciona no navegador, sem cadastro.
        </p>

        <div className="mt-10">
          <GtinValidator />
        </div>

        <div className="mt-14 space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">O que o verificador confere</h2>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                <strong className="text-white">Quantidade de dígitos.</strong> Um GTIN tem 8, 12, 13 ou 14 dígitos. Qualquer
                outro tamanho indica código cortado, zeros perdidos na planilha ou um SKU interno no lugar do EAN.
              </p>
              <p>
                <strong className="text-white">Dígito verificador.</strong> É o último número do código. Ele existe para pegar
                erros de digitação: trocar um dígito ou inverter dois vizinhos quase sempre muda a conta.
              </p>
              <p>
                <strong className="text-white">Prefixo GS1.</strong> Os três primeiros dígitos de um EAN-13 mostram em qual
                organização GS1 a empresa registrou o código. No Brasil, os prefixos são 789 e 790.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Como calcular o dígito verificador do EAN-13</h2>
            <ol className="list-decimal space-y-2 pl-6 text-slate-300 leading-relaxed">
              {steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="mt-4 text-slate-300 leading-relaxed">
              Exemplo com 789191000019<strong className="text-white">7</strong>: os 12 primeiros dígitos, com pesos 1 e 3
              alternados a partir da esquerda, somam 7 + 24 + 9 + 3 + 9 + 3 + 0 + 0 + 0 + 0 + 1 + 27 = 83. A próxima dezena
              é 90, então o dígito verificador é 7. Código válido.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Como consultar de quem é um código de barras</h2>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                A validação mostra se o número é bem formado, mas não diz qual produto ele representa. Para isso, use o{' '}
                <strong className="text-white">Verified by GS1</strong> ou o Cadastro Nacional de Produtos da GS1 Brasil, que
                mostram a empresa dona do código e, quando o fabricante preencheu, o nome do produto.
              </p>
              <p>
                Se o que você precisa é a foto, o nome e a descrição para cadastrar o produto na loja, a{' '}
                <Link href="/" className="text-cyan-300 hover:text-cyan-200">busca da EAN Images</Link> mostra de graça quais
                códigos têm imagem disponível. Para integrar no seu sistema, existe a{' '}
                <Link href="/api-ean" className="text-cyan-300 hover:text-cyan-200">API de produtos por EAN</Link>.
              </p>
              <p>
                Quer entender os tipos de código e como conseguir um GTIN oficial? Leia{' '}
                <Link href="/blog/ean-gtin-codigo-barras-diferencas" className="text-cyan-300 hover:text-cyan-200">
                  o que é código EAN e GTIN
                </Link>{' '}
                e{' '}
                <Link href="/blog/gtin-oficial-vs-gtin-aleatorio" className="text-cyan-300 hover:text-cyan-200">
                  GTIN oficial vs GTIN aleatório
                </Link>
                .
              </p>
            </div>
          </section>

          <section className="border-t border-slate-800 pt-8">
            <h2 className="text-2xl font-bold text-white mb-6">Perguntas frequentes</h2>
            <div className="space-y-5">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                  <p className="mt-2 text-slate-300 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
