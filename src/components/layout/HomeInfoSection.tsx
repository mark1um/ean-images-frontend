import Link from 'next/link';
import { ChevronDown, ClipboardList, FileArchive, QrCode, ShoppingBag, Store, Truck, Code2 } from 'lucide-react';
import { MIN_ORDER_TOTAL } from '@/lib/config';
import { PRICING_PACKAGES, PRICING_TIERS } from '@/lib/pricing';
import { formatCurrency, formatNumber } from '@/lib/utils';

const unitPrice = PRICING_TIERS[0].pricePerUnit;
const packagesText = PRICING_PACKAGES.map(
  (pkg) => `até ${formatNumber(pkg.size)} imagens por ${formatCurrency(pkg.price)}`
).join(', ');

const steps = [
  {
    title: 'Envie os EANs',
    description:
      'Cole os códigos de barras ou envie uma planilha (.xlsx, .csv ou .txt). Aceita EAN-8, EAN-12, EAN-13 e EAN-14.',
    icon: ClipboardList,
  },
  {
    title: 'Veja o que existe, grátis',
    description:
      'Em segundos você vê quais produtos têm imagem, uma prévia das fotos e o valor exato. Só paga pelo que for encontrado.',
    icon: QrCode,
  },
  {
    title: 'Pague por PIX e receba',
    description:
      'Após o PIX, as imagens chegam em um ZIP no seu e-mail em minutos, com cada arquivo nomeado pelo EAN.',
    icon: FileArchive,
  },
];

const audiences = [
  {
    title: 'Lojas virtuais e marketplaces',
    description: 'Fotos para cadastrar produtos em massa no Mercado Livre, Shopee, Amazon e loja própria.',
    href: '/blog/imagens-de-produtos-mercado-livre-shopee',
    icon: ShoppingBag,
  },
  {
    title: 'Supermercados e delivery',
    description: 'Catálogo com milhares de itens para site, aplicativo de delivery ou WhatsApp.',
    href: '/blog/fotos-de-produtos-para-supermercado-online',
    icon: Store,
  },
  {
    title: 'Distribuidores e equipes de cadastro',
    description: 'Imagens padronizadas por EAN para enviar a clientes, ERPs e integradores.',
    href: '/blog/organizar-skus-marketplaces-ean',
    icon: Truck,
  },
  {
    title: 'Desenvolvedores e sistemas (API)',
    description: 'ERPs, PDVs e integradores buscam foto, nome e descrição pelo EAN via API, a partir de R$ 0,035 por imagem.',
    href: '/api-ean',
    icon: Code2,
  },
];

const faqs = [
  {
    question: 'Como conseguir a imagem de um produto pelo código de barras?',
    answer:
      'Informe o código de barras (EAN) do produto na EAN Images. A consulta mostra na hora se existe imagem para aquele código. Se existir, você paga por PIX e recebe a imagem por e-mail, com o arquivo nomeado pelo EAN.',
  },
  {
    question: 'Quanto custa?',
    answer: `${formatCurrency(unitPrice)} por imagem encontrada, com pedido mínimo de ${formatCurrency(
      MIN_ORDER_TOTAL
    )}. Para volumes maiores existem pacotes: ${packagesText}. A consulta é gratuita e você vê o valor exato antes de pagar.`,
  },
  {
    question: 'Pago pelas imagens que não forem encontradas?',
    answer:
      'Não. O valor considera apenas as imagens encontradas. Os EANs sem imagem aparecem na consulta e você recebe um aviso por e-mail se elas chegarem depois.',
  },
  {
    question: 'Preciso criar conta?',
    answer: 'Não. Basta informar os EANs, um e-mail para a entrega e pagar por PIX.',
  },
  {
    question: 'Tem API para integrar ao meu sistema?',
    answer:
      'Sim. A EAN Images API devolve foto, nome e descrição do produto pelo EAN para ERPs, PDVs, marketplaces e lojas virtuais. A consulta é grátis e a liberação custa a partir de R$ 0,035 por imagem, via PIX. Veja em eanimages.com.br/api-ean.',
  },
  {
    question: 'Em quanto tempo recebo as imagens?',
    answer:
      'Em poucos minutos após a confirmação do PIX. As imagens chegam em um arquivo ZIP no e-mail informado.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

export function HomeInfoSection() {
  return (
    <div className="space-y-16 pt-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section aria-labelledby="como-funciona-home">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Como funciona</p>
          <h2 id="como-funciona-home" className="mt-2 text-2xl md:text-3xl font-bold text-white">
            Imagens de produtos pelo código de barras em 3 passos
          </h2>
        </div>
        <ol className="mt-6 grid gap-3 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex items-center gap-2">
                <step.icon className="w-4 h-4 text-cyan-300" />
                <p className="text-sm font-semibold text-white">
                  {index + 1}. {step.title}
                </p>
              </div>
              <p className="text-sm text-slate-400 mt-3 leading-relaxed">{step.description}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-center text-sm text-slate-400">
          <Link href="/como-funciona" className="text-cyan-300 hover:text-cyan-200">
            Ver o passo a passo completo
          </Link>
        </p>
      </section>

      <section aria-labelledby="para-quem-home">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Para quem é</p>
          <h2 id="para-quem-home" className="mt-2 text-2xl md:text-3xl font-bold text-white">
            Feito para quem tem muitos produtos com EAN
          </h2>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {audiences.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="block rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-colors hover:border-cyan-500/60"
            >
              <div className="flex items-center gap-2">
                <item.icon className="w-4 h-4 text-cyan-300" />
                <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              </div>
              <p className="text-sm text-slate-400 mt-3 leading-relaxed">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="faq-home">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Dúvidas</p>
          <h2 id="faq-home" className="mt-2 text-2xl md:text-3xl font-bold text-white">
            Perguntas frequentes
          </h2>
        </div>
        <div className="mt-6 space-y-3 max-w-3xl mx-auto">
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-white">
                <h3>{faq.question}</h3>
                <ChevronDown className="w-4 h-4 shrink-0 text-slate-400 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
        <p className="mt-4 text-center text-sm text-slate-400">
          <Link href="/faq" className="text-cyan-300 hover:text-cyan-200">
            Ver todas as perguntas
          </Link>
        </p>
      </section>
    </div>
  );
}
