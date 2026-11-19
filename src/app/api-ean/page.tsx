import type { Metadata } from 'next';
import Link from 'next/link';
import {
  apiBaseUrl,
  apiDocsUrl,
  apiLandingPath,
  apiOpenApiUrl,
  apiSignupUrl,
  formatCents,
  formatPerCredit,
  getApiPricing,
  lowestPerCreditCents,
} from '@/lib/api-product';
import { absoluteUrl, defaultOgImage, siteName, siteUrl } from '@/lib/site';

// Preços vêm da API; a página é regenerada no máximo a cada hora.
export const revalidate = 3600;

const pageUrl = absoluteUrl(apiLandingPath);
const pageTitle = 'API de imagens e dados de produtos por EAN/GTIN';
const pageDescription =
  'API REST brasileira para buscar foto, nome e descrição de produtos pelo código de barras (EAN/GTIN). Consulta de disponibilidade grátis, a partir de R$ 0,035 por imagem, pagamento via PIX.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    'API de imagens de produtos',
    'API EAN',
    'API GTIN',
    'API código de barras',
    'consultar produto pelo código de barras API',
    'API foto de produto',
    'API dados de produto EAN',
    'cadastro automático de produtos',
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

const availabilityExample = `curl ${apiBaseUrl}/v1/availability/7891910000197`;

const availabilityResponse = `{
  "ean": "7891910000197",
  "available": true,
  "image": { "available": true, "format": "jpg", "credits": 1 },
  "data":  { "available": true, "hasName": true, "hasDescription": true, "credits": 1 }
}`;

const unlockExample = `curl -X POST ${apiBaseUrl}/v1/products/unlock \\
  -H "Authorization: Bearer eani_live_SUA_CHAVE" \\
  -H "Content-Type: application/json" \\
  -d '{ "eans": ["7891910000197"], "include": ["image", "data"] }'`;

const unlockResponse = `{
  "items": [{
    "ean": "7891910000197",
    "found": true,
    "image": {
      "format": "jpg",
      "filename": "7891910000197.jpg",
      "downloadUrl": "https://…",
      "expiresAt": "…"
    },
    "data": {
      "name": "…",
      "descriptionHtml": "<ul><li>…</li></ul>",
      "descriptionText": "…"
    }
  }],
  "creditsCharged": 2,
  "balance": 98
}`;

const useCases = [
  {
    title: 'ERPs, PDVs e sistemas de gestão',
    text: 'Ao cadastrar um produto pelo código de barras, o sistema já preenche foto, nome e descrição. O lojista só confere preço e estoque.',
  },
  {
    title: 'Integradores de marketplace e hubs',
    text: 'Complete anúncios para Mercado Livre, Shopee, Amazon e Magalu em lote, sem depender de fotos enviadas pelo cliente.',
  },
  {
    title: 'Apps de delivery e supermercado online',
    text: 'Monte o catálogo do mercado, da farmácia ou do pet shop a partir da lista de EANs que já está no sistema da loja.',
  },
  {
    title: 'Plataformas de e-commerce e agências',
    text: 'Ofereça "preencher fotos automaticamente" como recurso para lojas em WooCommerce, Nuvemshop, VTEX, Shopify e similares.',
  },
];

const faqs = [
  {
    question: 'Existe uma API para buscar imagem de produto pelo código de barras no Brasil?',
    answer:
      'Sim. A EAN Images API recebe o EAN/GTIN (8, 12, 13 ou 14 dígitos) e devolve a imagem do produto em JPG ou PNG, além de nome e descrição quando disponíveis. O catálogo é focado em produtos vendidos no Brasil: mercado, farmácia, higiene, beleza, limpeza, bebidas e pet.',
  },
  {
    question: 'A consulta da API é gratuita?',
    answer:
      'Consultar se um EAN tem imagem ou dados é grátis: um EAN por vez sem chave (com limite por IP) e até 1.000 EANs por chamada com chave, dentro de uma cota diária de 20.000 consultas. Você só usa créditos ao liberar o conteúdo: 1 crédito pela imagem e 1 crédito pelos dados (nome e descrição).',
  },
  {
    question: 'Quanto custa a API de imagens de produtos?',
    answer:
      'Há créditos avulsos pré-pagos, que não vencem, e planos mensais com cota de créditos, todos pagos via PIX. Os preços partem de R$ 0,05 por crédito e caem com o volume. Baixar de novo um produto já liberado não consome créditos.',
  },
  {
    question: 'Preciso de cartão de crédito ou contrato?',
    answer:
      'Não. O pagamento é por PIX, sem fidelidade e sem renovação automática. Conta nova ganha créditos de boas-vindas e uma chave de teste (eani_test_) que não cobra, para integrar antes de pagar.',
  },
  {
    question: 'Qual a diferença entre a API e o site da EAN Images?',
    answer:
      'O site é para quem quer baixar um lote de imagens sem cadastro: cola os EANs, paga via PIX e recebe um ZIP por e-mail. A API é para sistemas que precisam buscar imagens e dados automaticamente, produto a produto ou em lote, com chave de acesso.',
  },
  {
    question: 'A API tem documentação OpenAPI?',
    answer: `Sim. A especificação OpenAPI fica em ${apiOpenApiUrl} e a documentação com exemplos em ${apiDocsUrl}.`,
  },
];

function Code({ label, code }: { label: string; code: string }) {
  return (
    <figure className="rounded-lg border border-slate-700 bg-slate-900">
      <figcaption className="border-b border-slate-700 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </figcaption>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-cyan-100">
        <code>{code}</code>
      </pre>
    </figure>
  );
}

export default async function ApiEanPage() {
  const pricing = await getApiPricing();
  const lowest = lowestPerCreditCents(pricing);
  const highest = Math.max(
    ...pricing.packages.map((p) => p.priceCents / p.credits),
    ...pricing.plans.map((p) => p.priceCents / p.monthlyQuota)
  );

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${pageUrl}#api`,
    name: 'EAN Images API',
    alternateName: ['API de imagens de produtos por EAN', 'API EAN Images'],
    url: pageUrl,
    applicationCategory: 'DeveloperApplication',
    applicationSubCategory: 'API REST',
    operatingSystem: 'Web',
    inLanguage: 'pt-BR',
    description: pageDescription,
    softwareHelp: apiDocsUrl,
    provider: { '@id': `${siteUrl}/#organization` },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'BRL',
      lowPrice: (Math.min(...pricing.packages.map((p) => p.priceCents), ...pricing.plans.map((p) => p.priceCents)) / 100).toFixed(2),
      highPrice: (Math.max(...pricing.packages.map((p) => p.priceCents), ...pricing.plans.map((p) => p.priceCents)) / 100).toFixed(2),
      offerCount: pricing.packages.length + pricing.plans.length,
      offers: [
        ...pricing.packages.map((p) => ({
          '@type': 'Offer',
          name: `Créditos ${p.name}: ${p.credits.toLocaleString('pt-BR')} créditos`,
          price: (p.priceCents / 100).toFixed(2),
          priceCurrency: 'BRL',
          availability: 'https://schema.org/InStock',
        })),
        ...pricing.plans.map((p) => ({
          '@type': 'Offer',
          name: `Plano ${p.name}: ${p.monthlyQuota.toLocaleString('pt-BR')} créditos por mês`,
          price: (p.priceCents / 100).toFixed(2),
          priceCurrency: 'BRL',
          availability: 'https://schema.org/InStock',
        })),
      ],
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'API', item: pageUrl },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-20 border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[540px] h-[240px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-semibold mb-4">
            Para desenvolvedores
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">{pageTitle}</h1>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
            Envie o código de barras e receba a foto, o nome e a descrição do produto. Consulta grátis, pagamento por
            uso via PIX, a partir de {formatPerCredit(lowest, 1)} por imagem.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href={apiSignupUrl} className="btn-primary inline-block">
              Criar conta grátis
            </a>
            <a href={apiDocsUrl} className="btn-secondary inline-block">
              Ver documentação
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-16 md:py-20 space-y-16">
        {/* Resumo */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">O que é a EAN Images API</h2>
          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>
              A EAN Images API é uma API REST brasileira que devolve imagens e dados de produtos a partir do EAN/GTIN,
              o número do código de barras. É usada por ERPs, PDVs, integradores de marketplace, apps de delivery e
              lojas virtuais para preencher o cadastro de produtos automaticamente.
            </p>
            <ul className="space-y-2">
              <li>✓ Aceita EAN-8, UPC (12 dígitos), EAN-13 e GTIN-14.</li>
              <li>✓ Devolve imagem em JPG ou PNG, nomeada pelo EAN, e nome + descrição (HTML e texto) quando disponíveis.</li>
              <li>✓ Consultar disponibilidade é grátis; até 1.000 EANs por chamada.</li>
              <li>✓ Só usa crédito ao liberar: 1 pela imagem, 1 pelos dados. Baixar de novo é grátis.</li>
              <li>✓ Pagamento via PIX, sem cartão, sem contrato e sem renovação automática.</li>
              <li>✓ Chave de teste (eani_test_) que não cobra, para integrar antes de pagar.</li>
            </ul>
          </div>
        </section>

        {/* Como funciona */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Como funciona</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { step: '1. Consulte (grátis)', text: 'Pergunte se temos imagem e dados de um EAN ou de uma lista. Nada é cobrado.' },
              { step: '2. Libere (créditos)', text: 'Libere a imagem e/ou os dados dos produtos encontrados. Se o saldo não cobre o lote, nada é cobrado.' },
              { step: '3. Use', text: 'Baixe a imagem pelo link e grave nome e descrição no seu sistema. O conteúdo liberado fica disponível para a sua conta.' },
            ].map((item) => (
              <div key={item.step} className="rounded-lg border border-slate-700 bg-slate-900/50 p-5">
                <h3 className="font-semibold text-white">{item.step}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Exemplos */}
        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Exemplo: teste agora, sem cadastro</h2>
          <p className="text-slate-300 leading-relaxed">
            A consulta de um EAN funciona até sem chave. Rode no terminal:
          </p>
          <Code label="Requisição" code={availabilityExample} />
          <Code label="Resposta" code={availabilityResponse} />
          <h3 className="text-xl font-semibold text-white pt-4">Liberar imagem e dados</h3>
          <p className="text-slate-300 leading-relaxed">
            Com a chave criada no painel, libere até 100 EANs por chamada. A resposta já traz o link de download da
            imagem e o conteúdo do produto:
          </p>
          <Code label="Requisição" code={unlockExample} />
          <Code label="Resposta (resumida)" code={unlockResponse} />
          <p className="text-sm text-slate-400">
            Referência completa em <a href={apiDocsUrl} className="text-cyan-300 hover:underline">{apiDocsUrl.replace('https://', '')}</a> e
            especificação OpenAPI em <a href={apiOpenApiUrl} className="text-cyan-300 hover:underline">{apiOpenApiUrl.replace('https://', '')}</a>.
          </p>
        </section>

        {/* Preços */}
        <section id="precos">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Preços da API</h2>
          <p className="text-slate-300 mb-8">
            1 crédito = 1 imagem ou os dados (nome + descrição) de 1 produto. De {formatPerCredit(highest, 1)} a{' '}
            {formatPerCredit(lowest, 1)} por crédito, conforme o volume. Tudo via PIX.
          </p>

          <h3 className="text-lg font-semibold text-white mb-3">Créditos avulsos (não vencem)</h3>
          <div className="overflow-x-auto rounded-lg border border-slate-700">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900 text-slate-400">
                <tr>
                  <th className="px-4 py-3 font-semibold">Pacote</th>
                  <th className="px-4 py-3 font-semibold">Créditos</th>
                  <th className="px-4 py-3 font-semibold">Preço</th>
                  <th className="px-4 py-3 font-semibold">Por imagem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {pricing.packages.map((p) => (
                  <tr key={p.code}>
                    <td className="px-4 py-3 font-medium text-white">{p.name}</td>
                    <td className="px-4 py-3">{p.credits.toLocaleString('pt-BR')}</td>
                    <td className="px-4 py-3">{formatCents(p.priceCents)}</td>
                    <td className="px-4 py-3">{formatPerCredit(p.priceCents, p.credits)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-white mt-8 mb-3">Planos mensais (PIX, sem renovação automática)</h3>
          <div className="overflow-x-auto rounded-lg border border-slate-700">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900 text-slate-400">
                <tr>
                  <th className="px-4 py-3 font-semibold">Plano</th>
                  <th className="px-4 py-3 font-semibold">Créditos por mês</th>
                  <th className="px-4 py-3 font-semibold">Preço</th>
                  <th className="px-4 py-3 font-semibold">Por imagem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {pricing.plans.map((p) => (
                  <tr key={p.code}>
                    <td className="px-4 py-3 font-medium text-white">{p.name}</td>
                    <td className="px-4 py-3">{p.monthlyQuota.toLocaleString('pt-BR')}</td>
                    <td className="px-4 py-3">{formatCents(p.priceCents)}/mês</td>
                    <td className="px-4 py-3">{formatPerCredit(p.priceCents, p.monthlyQuota)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-400">
            Conta nova ganha créditos de boas-vindas. Precisa de mais volume? Fale com a gente pelo{' '}
            <Link href="/contato" className="text-cyan-300 hover:underline">contato</Link>.
          </p>
        </section>

        {/* Para quem */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Para quem é</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {useCases.map((useCase) => (
              <div key={useCase.title} className="rounded-lg border border-slate-700 bg-slate-900/50 p-5">
                <h3 className="font-semibold text-white">{useCase.title}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{useCase.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-slate-300 leading-relaxed">
            Não é desenvolvedor e só quer as fotos de uma lista de produtos? Use a{' '}
            <Link href="/" className="text-cyan-300 hover:underline">busca do site</Link>: sem cadastro, paga via PIX e
            recebe um ZIP por e-mail.
          </p>
        </section>

        {/* Guias */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Guias de integração</h2>
          <ul className="space-y-2 text-cyan-300">
            <li><Link href="/blog/api-imagens-produtos-ean" className="hover:underline">API de imagens de produtos por EAN: guia de integração com exemplos</Link></li>
            <li><Link href="/blog/consultar-produto-codigo-de-barras-api" className="hover:underline">Como consultar produto pelo código de barras via API</Link></li>
            <li><Link href="/blog/cadastro-automatico-produtos-erp-ean" className="hover:underline">Cadastro automático de produtos no ERP e PDV pelo EAN</Link></li>
            <li><Link href="/blog/api-gtin-ean-brasil-como-escolher" className="hover:underline">APIs de EAN/GTIN no Brasil: como escolher</Link></li>
            <li><Link href="/blog/fotos-automaticas-loja-virtual-api" className="hover:underline">Fotos automáticas na loja virtual com API (WooCommerce, Nuvemshop, VTEX)</Link></li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="border-t border-slate-800 pt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Perguntas frequentes sobre a API</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                <p className="mt-2 text-slate-300 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">Comece a integrar hoje</h2>
          <p className="mt-3 text-slate-300">Crie a conta, gere sua chave e faça a primeira chamada em minutos.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <a href={apiSignupUrl} className="btn-primary inline-block">Criar conta grátis</a>
            <a href={apiDocsUrl} className="btn-secondary inline-block">Documentação</a>
          </div>
        </section>
      </div>
    </div>
  );
}
