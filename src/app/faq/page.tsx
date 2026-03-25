'use client';

import type { Metadata } from 'next';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

// Note: Metadata export não funciona em 'use client' components
// Este será feito via arquivo metadata.ts separado

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  keywords?: string[];
}

const faqItems: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'O que é EAN e como funciona a busca por código EAN?',
    answer:
      'EAN (Código de Barras Europeu) é um código numérico de 8 ou 13 dígitos que identifica produtos no varejo. Na EAN Images, você insere o código EAN do produto (o mesmo da embalagem) e nossa plataforma busca automaticamente imagens de alta qualidade desse produto. Utilizamos um banco de dados extenso de imagens de produtos para encontrar os melhores resultados instantaneamente.',
    keywords: ['EAN', 'código de barras', 'buscar imagens'],
  },
  {
    id: 'faq-2',
    question: 'Como faço para baixar imagens de produtos pelo EAN?',
    answer:
      'É muito simples! Acesse a EAN Images, insira o código EAN (8 ou 13 dígitos) ou faça upload de um arquivo com múltiplos EANs. Nossa plataforma analisa instantaneamente e mostra a disponibilidade de imagens. Selecione as imagens que deseja, faça o pagamento via PIX (seguro), e receba o download imediato das imagens em um arquivo ZIP por e-mail.',
    keywords: ['baixar imagens', 'EAN', 'como fazer'],
  },
  {
    id: 'faq-3',
    question: 'Qual é a qualidade das imagens disponíveis?',
    answer:
      'Nossas imagens de produtos são de alta qualidade, ideais para e-commerce, marketplaces, catálogos digitais e redes sociais. Todas as imagens são originais de fabricantes e distribuidoras oficiais, garantindo autenticidade e profissionalismo. As imagens estão disponíveis em alta resolução para uso profissional.',
    keywords: ['qualidade', 'imagens', 'resolução'],
  },
  {
    id: 'faq-4',
    question: 'Preciso fazer cadastro ou assinar uma assinatura?',
    answer:
      'Não! A EAN Images funciona 100% sem cadastro. Você não precisa criar conta, pagar assinatura recorrente ou se comprometer com contrato. Basta inserir seu EAN, pagá lo que deseja (apenas pelo que usa), e receber as imagens por e-mail. Simples, transparente e sem burocracias.',
    keywords: ['sem cadastro', 'sem assinatura', 'simples'],
  },
  {
    id: 'faq-5',
    question: 'Quanto custa para baixar imagens de produtos?',
    answer:
      'Oferecemos preços competitivos com desconto progressivo: quanto mais imagens você baixa, menor é o preço por unidade. Não cobramos taxa de assinatura, apenas o valor das imagens que você realmente utiliza. Você pode validar a disponibilidade antes de pagar! Aceitamos PIX e outras formas de pagamento seguro.',
    keywords: ['preço', 'custo', 'valor'],
  },
  {
    id: 'faq-6',
    question: 'Como funciona o método de pagamento?',
    answer:
      'Aceitamos pagamento via PIX, que é instantâneo, seguro e sem taxas adicionais. Todos os nossos pagamentos são processados através de parceiros certificados e seguros. Você verá o código QR PIX e/ou cópia-cola na página de checkout, e após confirmação, as imagens são liberadas imediatamente para download.',
    keywords: ['pagamento', 'PIX', 'seguro'],
  },
  {
    id: 'faq-7',
    question: 'Posso fazer upload de um arquivo com múltiplos EANs?',
    answer:
      'Sim! Você pode fazer upload de um arquivo Excel, CSV ou texto com múltiplos códigos EAN. Nossa plataforma processa instantaneamente todos os EANs, mostra a disponibilidade de imagens para cada um, e calcula o preço total com desconto progressivo. Isso torna muito mais eficiente para empresas que precisam de muitas imagens.',
    keywords: ['upload', 'arquivo', 'múltiplos EANs', 'Excel', 'CSV'],
  },
  {
    id: 'faq-8',
    question: 'As imagens podem ser usadas comercialmente?',
    answer:
      'Sim, todas as imagens que você compra na EAN Images têm licença para uso comercial, incluindo e-commerce, marketplaces, redes sociais e catálogos digitais. A licença permite que você use as imagens em seus negócios sem limitações. Consulte nossos termos de serviço para detalhes específicos sobre direitos de uso.',
    keywords: ['uso comercial', 'licença', 'direitos'],
  },
  {
    id: 'faq-9',
    question: 'Qual é a diferença entre EAN-8 e EAN-13?',
    answer:
      'EAN-8 é uma versão reduzida do código de barras com 8 dígitos, usada em produtos menores. EAN-13 é o formato padrão com 13 dígitos e é o mais comum em produtos de varejo. Na EAN Images, você pode buscar por ambos os formatos — nossa plataforma reconhece automaticamente qual tipo de código você inseriu e procura pelas imagens correspondentes.',
    keywords: ['EAN-8', 'EAN-13', 'diferença'],
  },
  {
    id: 'faq-10',
    question: 'Tenho dúvidas ou problemas na plataforma. Como entrar em contato?',
    answer:
      'Estamos sempre dispostos a ajudar! Se tiver dúvidas, problemas técnicos ou sugestões, entre em contato através do formulário de contato em nosso site ou envie um e-mail direto. Nossa equipe responde dentro de 24 horas úteis. Também oferecemos suporte durante o processo de checkout se precisar de assistência.',
    keywords: ['contato', 'suporte', 'ajuda'],
  },
];

function FAQAccordion() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {faqItems.map((item) => (
        <div
          key={item.id}
          className="border border-slate-700 rounded-lg overflow-hidden hover:border-slate-600 transition-colors"
        >
          <button
            onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
            className="w-full px-6 py-4 flex items-center justify-between bg-slate-900/50 hover:bg-slate-900/80 transition-colors text-left"
          >
            <h3 className="font-semibold text-white text-base">{item.question}</h3>
            {expandedId === item.id ? (
              <ChevronUp className="w-5 h-5 text-cyan-400 flex-shrink-0 ml-4" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0 ml-4" />
            )}
          </button>

          {expandedId === item.id && (
            <div className="px-6 py-4 bg-slate-950 border-t border-slate-700">
              <p className="text-slate-300 leading-relaxed">{item.answer}</p>
              {item.keywords && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="text-xs px-2 py-1 bg-slate-800 text-slate-300 rounded"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function FAQPage() {
  // JSON-LD Schema para FAQPage (para Rich Snippets no Google)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-20 border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[540px] h-[240px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Perguntas Frequentes — FAQ EAN Images
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
            Encontre respostas sobre como baixar imagens de produtos pelo código EAN, preços, 
            pagamentos e tudo mais que você precisa saber.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="max-w-2xl mx-auto px-4 py-16 md:py-20">
        <FAQAccordion />
      </section>

      {/* CTA Section */}
      <section className="border-t border-slate-800 bg-slate-900/50 py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Pronto para começar a buscar imagens por EAN?
          </h2>
          <p className="text-slate-300 mb-8">
            Sem cadastro, sem assinatura. Apenas busque, pague o que usar e receba por e-mail.
          </p>
          <a
            href="/"
            className="inline-block px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold rounded-lg transition-colors"
          >
            Ir para Banco de Imagens EAN
          </a>
        </div>
      </section>
    </main>
  );
}
