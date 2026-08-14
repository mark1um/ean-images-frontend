import { absoluteUrl, siteName } from '@/lib/site';

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  tag: string;
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  keywords: string[];
  sections: Array<{
    heading: string;
    body: string[];
  }>;
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'baixar-imagens-produtos-pelo-ean',
    title: 'Como baixar imagens de produtos pelo EAN',
    description:
      'Veja como usar o código EAN para encontrar imagens de produtos com mais rapidez e organizar o cadastro de SKUs no e-commerce.',
    tag: 'EAN',
    publishedAt: '2026-08-14',
    updatedAt: '2026-08-14',
    readTime: '5 min',
    keywords: ['baixar imagens pelo EAN', 'imagens de produtos', 'código EAN', 'cadastro de produtos'],
    sections: [
      {
        heading: 'O que o EAN resolve no cadastro de produtos',
        body: [
          'O EAN é um identificador padronizado usado para reconhecer um item específico no varejo. Quando a loja usa esse código como chave de busca, reduz a dependência de descrições manuais, nomes incompletos e variações de fornecedor.',
          'Na prática, isso ajuda equipes de cadastro a encontrar imagens compatíveis com o produto correto, acelerar a publicação de SKUs e diminuir erros visuais em vitrines digitais.',
        ],
      },
      {
        heading: 'Passo a passo para encontrar imagens',
        body: [
          'Separe os códigos EAN dos produtos que precisam de imagem, cole a lista na EAN Images ou envie um arquivo com múltiplos códigos. A plataforma analisa a disponibilidade e mostra quantas imagens foram encontradas antes da compra.',
          'Esse fluxo é útil para operações com muitos SKUs, porque permite validar lotes inteiros sem procurar imagem por imagem em buscadores genéricos.',
        ],
      },
      {
        heading: 'Quando usar busca por EAN em lote',
        body: [
          'A busca em lote é indicada para marketplaces, distribuidores, indústrias e lojas virtuais que precisam enriquecer catálogo rapidamente. Ela também ajuda em migrações de ERP, integrações com hub de marketplace e revisão de produtos sem foto.',
          'Depois da validação, as imagens podem ser usadas em páginas de produto, catálogos internos, apresentações comerciais e materiais de venda, conforme as condições de uso contratadas.',
        ],
      },
    ],
  },
  {
    slug: 'imagens-produto-conversao-ecommerce',
    title: 'Como imagens de produto impactam a conversão no e-commerce',
    description:
      'Entenda por que imagens corretas, nítidas e consistentes aumentam confiança e reduzem fricção na jornada de compra.',
    tag: 'E-commerce',
    publishedAt: '2026-08-14',
    updatedAt: '2026-08-14',
    readTime: '6 min',
    keywords: ['imagens de produto', 'conversão no e-commerce', 'foto de produto', 'vitrine online'],
    sections: [
      {
        heading: 'Imagem é informação de compra',
        body: [
          'Em uma página de produto, a imagem não é apenas decoração. Ela confirma embalagem, variante, tamanho, marca, sabor, cor e outros sinais que o comprador usa para decidir se está no item certo.',
          'Quando a imagem está ausente, genérica ou errada, o cliente precisa compensar a falta de confiança lendo mais detalhes, comparando em outros sites ou abandonando a compra.',
        ],
      },
      {
        heading: 'Consistência melhora a percepção da loja',
        body: [
          'Catálogos com imagens padronizadas passam uma sensação de operação mais confiável. Isso vale para e-commerce próprio, loja em marketplace, aplicativo de delivery, catálogo B2B e venda por WhatsApp.',
          'A consistência também facilita revisão interna: equipes conseguem identificar rapidamente SKUs sem imagem, duplicados ou produtos com foto incompatível.',
        ],
      },
      {
        heading: 'Como priorizar a atualização de imagens',
        body: [
          'Comece pelos produtos com maior tráfego, maior margem, maior recorrência ou maior taxa de abandono. Depois avance para categorias inteiras, usando o EAN para organizar a busca e evitar confusão entre produtos parecidos.',
          'Para catálogos grandes, a abordagem por lote costuma ser mais eficiente do que corrigir item por item apenas quando surge reclamação.',
        ],
      },
    ],
  },
  {
    slug: 'organizar-skus-marketplaces-ean',
    title: 'Como organizar SKUs para vender em marketplaces usando EAN',
    description:
      'Boas práticas para estruturar SKUs, códigos EAN e imagens antes de publicar produtos em marketplaces.',
    tag: 'Marketplace',
    publishedAt: '2026-08-14',
    updatedAt: '2026-08-14',
    readTime: '7 min',
    keywords: ['SKU marketplace', 'EAN marketplace', 'cadastro de SKU', 'catálogo digital'],
    sections: [
      {
        heading: 'SKU interno e EAN não são a mesma coisa',
        body: [
          'O SKU é um código interno criado pela empresa para controlar estoque, preço e operação. O EAN é um código padronizado que identifica o produto no varejo e costuma ser exigido por marketplaces.',
          'Manter os dois campos separados evita problemas em integrações, principalmente quando o mesmo produto é vendido em canais diferentes com regras comerciais distintas.',
        ],
      },
      {
        heading: 'Checklist antes de publicar em marketplace',
        body: [
          'Valide se cada SKU tem EAN correto, título claro, categoria adequada, atributos obrigatórios e imagem compatível. Produtos sem imagem ou com imagem divergente tendem a sofrer reprovação, queda de qualidade no anúncio ou baixa conversão.',
          'Também vale registrar a origem da imagem e manter um padrão de resolução para reduzir retrabalho nas próximas atualizações de catálogo.',
        ],
      },
      {
        heading: 'Como o EAN acelera enriquecimento de catálogo',
        body: [
          'Com uma lista de EANs, a equipe consegue consultar disponibilidade de imagens em lote e priorizar os produtos que já podem ser publicados. Isso reduz dependência de buscas manuais e libera tempo para revisão de preço, estoque e descrição.',
          'Esse processo é especialmente importante em operações com alta rotatividade de produtos, entrada frequente de fornecedores ou expansão para novos canais de venda.',
        ],
      },
    ],
  },
  {
    slug: 'ean-gtin-codigo-barras-diferencas',
    title: 'EAN, GTIN e código de barras: diferenças para cadastro de produtos',
    description:
      'Guia direto sobre EAN, GTIN, código de barras e como esses identificadores ajudam a padronizar cadastros digitais.',
    tag: 'Catálogo',
    publishedAt: '2026-08-14',
    updatedAt: '2026-08-14',
    readTime: '5 min',
    keywords: ['EAN', 'GTIN', 'código de barras', 'identificador de produto'],
    sections: [
      {
        heading: 'Entendendo os termos',
        body: [
          'GTIN é a família de identificadores globais de itens comerciais. EAN-13 é uma das formas mais conhecidas de representar esse identificador em produtos vendidos no varejo brasileiro.',
          'O código de barras é a representação visual que pode ser lida por scanners. O número abaixo dele é o identificador que sistemas de e-commerce, ERP e marketplaces costumam armazenar.',
        ],
      },
      {
        heading: 'Por que isso importa para SEO de produto',
        body: [
          'Dados estruturados de produto ficam mais confiáveis quando identificadores como GTIN/EAN estão corretos. Isso ajuda buscadores, comparadores e plataformas de venda a entenderem qual item está sendo anunciado.',
          'Além disso, uma base com EAN correto facilita associação com imagens, descrições, categorias e variações legítimas do produto.',
        ],
      },
      {
        heading: 'Erros comuns no cadastro',
        body: [
          'Os erros mais frequentes são cadastrar EAN incompleto, usar o EAN de outra variação, misturar SKU interno com código de barras ou reutilizar o mesmo identificador em produtos diferentes.',
          'Uma rotina de revisão por EAN ajuda a encontrar inconsistências antes que elas afetem anúncios, integrações ou experiência de compra.',
        ],
      },
    ],
  },
  {
    slug: 'checklist-imagens-catalogo-digital',
    title: 'Checklist de imagens para catálogo digital de produtos',
    description:
      'Um checklist prático para revisar imagens de produtos antes de publicar em loja virtual, marketplace ou catálogo B2B.',
    tag: 'Operação',
    publishedAt: '2026-08-14',
    updatedAt: '2026-08-14',
    readTime: '6 min',
    keywords: ['checklist de imagens', 'catálogo digital', 'cadastro de produtos', 'imagem para marketplace'],
    sections: [
      {
        heading: 'Critérios mínimos de qualidade',
        body: [
          'A imagem deve mostrar o produto correto, estar nítida, não cortar informações importantes da embalagem e ter resolução suficiente para zoom ou visualização em telas maiores.',
          'Evite fotos com marca d’água de terceiros, baixa iluminação, distorção, fundo confuso ou produto diferente da descrição cadastrada.',
        ],
      },
      {
        heading: 'Conferência por EAN',
        body: [
          'Sempre que possível, compare a imagem com o EAN do produto. Isso reduz risco de trocar sabores, volumes, cores, kits, refis ou embalagens visualmente parecidas.',
          'A conferência por EAN também cria uma rotina objetiva para equipes de cadastro, compra, estoque e marketplace trabalharem sobre a mesma referência.',
        ],
      },
      {
        heading: 'Organização dos arquivos',
        body: [
          'Nomeie arquivos com uma chave clara, como EAN ou SKU, e mantenha uma planilha de controle com status de imagem, origem, data de atualização e observações de uso.',
          'Esse controle evita retrabalho quando o produto muda de embalagem, entra em novo canal de venda ou precisa ser auditado por uma equipe externa.',
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogPostUrl(slug: string) {
  return absoluteUrl(`/blog/${slug}`);
}

export function getArticleSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Organization',
      name: siteName,
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/assets/logo-escura.jpg'),
      },
    },
    mainEntityOfPage: getBlogPostUrl(post.slug),
    keywords: post.keywords.join(', '),
  };
}
