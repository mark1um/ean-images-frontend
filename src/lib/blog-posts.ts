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
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  relatedSlugs?: string[];
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
    faqs: [
      {
        question: 'Consigo buscar imagens de vários produtos ao mesmo tempo?',
        answer:
          'Sim. A busca em lote permite enviar uma lista de EANs para validar a disponibilidade de imagens antes da compra, o que ajuda equipes com muitos SKUs.',
      },
      {
        question: 'O EAN evita imagem errada no cadastro?',
        answer:
          'Ele reduz bastante o risco, porque funciona como uma chave objetiva para diferenciar embalagens, variações e produtos parecidos.',
      },
    ],
    relatedSlugs: ['checklist-imagens-catalogo-digital', 'ean-gtin-codigo-barras-diferencas'],
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
    faqs: [
      {
        question: 'Imagem de produto influencia SEO?',
        answer:
          'Influência direta ou indiretamente porque melhora a experiência da página, reduz dúvidas do comprador e ajuda mecanismos de busca a entenderem melhor o conteúdo do produto quando há contexto, alt text e dados corretos.',
      },
      {
        question: 'Qual imagem priorizar primeiro em um catálogo grande?',
        answer:
          'Comece por produtos com maior tráfego, margem, recorrência, estoque parado ou abandono de carrinho, depois avance por categorias inteiras.',
      },
    ],
    relatedSlugs: ['checklist-imagens-catalogo-digital', 'organizar-skus-marketplaces-ean'],
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
    faqs: [
      {
        question: 'Marketplace exige EAN em todos os produtos?',
        answer:
          'Muitos marketplaces exigem EAN, GTIN ou outro identificador válido para categorias de varejo, mas as regras variam por canal e tipo de produto.',
      },
      {
        question: 'SKU interno pode substituir EAN?',
        answer:
          'Não. O SKU organiza a operação interna da loja, enquanto o EAN identifica o item comercial de forma padronizada.',
      },
    ],
    relatedSlugs: ['ean-gtin-codigo-barras-diferencas', 'baixar-imagens-produtos-pelo-ean'],
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
    faqs: [
      {
        question: 'EAN e GTIN são a mesma coisa?',
        answer:
          'GTIN é a família de identificadores globais. EAN-13 é uma das formas mais usadas para representar esse identificador em produtos de varejo.',
      },
      {
        question: 'Por que o GTIN ajuda em dados estruturados de produto?',
        answer:
          'Porque ele torna mais claro qual item está sendo descrito, reduz ambiguidade e melhora a consistência entre loja, marketplace, buscadores e comparadores.',
      },
    ],
    relatedSlugs: ['organizar-skus-marketplaces-ean', 'imagens-produto-conversao-ecommerce'],
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
    faqs: [
      {
        question: 'O checklist deve ser feito antes ou depois da publicação?',
        answer:
          'O ideal é revisar antes da publicação, mas catálogos grandes também se beneficiam de auditorias periódicas para corrigir produtos sem foto, imagem desatualizada ou variação incorreta.',
      },
      {
        question: 'Como nomear arquivos de imagem de produto?',
        answer:
          'Use uma chave estável, como EAN ou SKU, e mantenha controle de origem, data de atualização e observações de uso.',
      },
    ],
    relatedSlugs: ['baixar-imagens-produtos-pelo-ean', 'imagens-produto-conversao-ecommerce'],
  },
  {
    slug: 'seo-para-imagens-de-produtos',
    title: 'SEO para imagens de produtos: como preparar fotos para buscadores',
    description:
      'Aprenda como nomes de arquivo, texto alternativo, contexto da página e qualidade visual ajudam imagens de produto a performar melhor na busca.',
    tag: 'SEO',
    publishedAt: '2026-09-14',
    updatedAt: '2026-09-14',
    readTime: '7 min',
    keywords: ['SEO para imagens', 'imagem de produto SEO', 'alt text produto', 'Google Imagens e-commerce'],
    sections: [
      {
        heading: 'Imagem boa precisa de contexto claro',
        body: [
          'Buscadores não avaliam a imagem isoladamente. Eles interpretam o arquivo junto com título da página, descrição do produto, legenda, texto alternativo, dados estruturados e links internos.',
          'Por isso, uma foto correta por EAN ganha mais valor quando aparece em uma página com nome do produto, marca, categoria, variação e informações comerciais consistentes.',
        ],
      },
      {
        heading: 'Boas práticas para arquivo e texto alternativo',
        body: [
          'Use nomes de arquivo descritivos quando possível, evitando sequências genéricas como IMG_001. Em catálogos grandes, incluir EAN ou SKU no nome ajuda a rastrear origem e reduzir trocas acidentais.',
          'O texto alternativo deve descrever o produto de forma objetiva. Em vez de repetir palavras-chave, informe marca, tipo, volume, sabor, cor ou variação quando esses detalhes forem visíveis e relevantes.',
        ],
      },
      {
        heading: 'Qualidade visual também é experiência de página',
        body: [
          'Imagens nítidas, leves e bem dimensionadas ajudam o usuário a confirmar o produto sem esperar carregamentos longos. Essa experiência é especialmente importante em mobile, onde a foto costuma ser o primeiro elemento analisado.',
          'Para SEO e GEO, o objetivo não é criar marcações especiais para IA, mas entregar uma página pública, rápida, rastreável e útil para quem precisa decidir ou cadastrar o produto.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Preciso repetir a palavra-chave no alt text?',
        answer:
          'Não. O alt text deve ser útil e descritivo. Repetição artificial de palavras-chave pode piorar a experiência e não acrescenta valor real.',
      },
      {
        question: 'O nome do arquivo com EAN ajuda?',
        answer:
          'Ajuda principalmente na organização e auditoria do catálogo. Para buscadores, o conjunto da página e a qualidade do conteúdo continuam sendo mais importantes.',
      },
    ],
    relatedSlugs: ['imagens-produto-conversao-ecommerce', 'checklist-imagens-catalogo-digital'],
  },
  {
    slug: 'auditoria-catalogo-produtos-sem-imagem',
    title: 'Como auditar produtos sem imagem no catálogo',
    description:
      'Um método prático para encontrar SKUs sem imagem, priorizar correções e organizar uma rotina de enriquecimento de catálogo por EAN.',
    tag: 'Operação',
    publishedAt: '2026-09-14',
    updatedAt: '2026-09-14',
    readTime: '8 min',
    keywords: ['produtos sem imagem', 'auditoria de catálogo', 'enriquecimento de catálogo', 'SKU sem foto'],
    sections: [
      {
        heading: 'Comece separando ausência de erro visual',
        body: [
          'Um produto sem imagem é fácil de encontrar em relatórios, mas o maior problema costuma estar nas imagens incorretas: embalagem antiga, variação errada, kit confundido com unidade ou foto genérica.',
          'A auditoria deve separar três grupos: produtos sem foto, produtos com foto suspeita e produtos com foto aprovada. Essa classificação reduz retrabalho e facilita acompanhar evolução por categoria.',
        ],
      },
      {
        heading: 'Use EAN como chave de conferência',
        body: [
          'Quando o catálogo tem EAN, a equipe ganha uma referência mais estável do que o nome do produto. Isso é útil porque fornecedores e marketplaces podem escrever o mesmo item de formas diferentes.',
          'Ao consultar imagens por lote, é possível descobrir rapidamente quais códigos têm imagem disponível, quais precisam de produção própria e quais devem voltar para saneamento cadastral.',
        ],
      },
      {
        heading: 'Priorize pelo impacto comercial',
        body: [
          'A fila de correção deve começar por itens com venda recorrente, tráfego relevante, campanha ativa, alto estoque ou maior margem. Depois, avance para categorias inteiras para manter consistência visual.',
          'Registre data de revisão, origem da imagem e responsável pela aprovação. Esse histórico ajuda a explicar mudanças e evita que uma imagem antiga volte em integrações futuras.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Com que frequência devo auditar imagens do catálogo?',
        answer:
          'Catálogos dinâmicos devem ser revisados de forma recorrente, especialmente após entrada de novos fornecedores, migração de ERP, troca de embalagens ou expansão para marketplaces.',
      },
      {
        question: 'O que fazer quando não encontro imagem pelo EAN?',
        answer:
          'Valide se o EAN está correto, confira se não há troca de variação e, se necessário, encaminhe o item para produção própria de imagem ou revisão com o fornecedor.',
      },
    ],
    relatedSlugs: ['baixar-imagens-produtos-pelo-ean', 'organizar-skus-marketplaces-ean'],
  },
  {
    slug: 'dados-produto-google-shopping-ean',
    title: 'EAN, imagens e dados de produto para Google Shopping',
    description:
      'Veja como identificadores, imagens e dados consistentes ajudam feeds de produto a ficarem mais confiáveis para canais de aquisição.',
    tag: 'Shopping',
    publishedAt: '2026-09-14',
    updatedAt: '2026-09-14',
    readTime: '7 min',
    keywords: ['Google Shopping EAN', 'feed de produtos', 'GTIN Google Shopping', 'imagem produto Merchant Center'],
    sections: [
      {
        heading: 'Feeds precisam de consistência entre campos',
        body: [
          'Em canais como Google Shopping, a imagem não trabalha sozinha. Ela precisa conversar com título, descrição, marca, categoria, preço, disponibilidade e identificadores como GTIN ou EAN.',
          'Quando esses dados entram em conflito, o produto pode perder qualidade de anúncio, gerar reprovações ou criar uma experiência ruim para quem clica esperando outro item.',
        ],
      },
      {
        heading: 'Por que o EAN reduz ambiguidade',
        body: [
          'Produtos de varejo têm muitas variações parecidas. Um mesmo shampoo pode ter volumes, linhas, kits e refis diferentes. O EAN ajuda a confirmar exatamente qual versão está sendo oferecida.',
          'Ao enriquecer imagens por EAN, a loja diminui a chance de associar uma foto bonita, mas incorreta, ao feed enviado para comparadores, marketplaces e campanhas.',
        ],
      },
      {
        heading: 'Checklist antes de enviar ou atualizar o feed',
        body: [
          'Confirme se a imagem abre publicamente, não está bloqueada por robots, carrega rápido e representa o produto vendido. Verifique também se título, GTIN/EAN, marca e categoria seguem o mesmo cadastro mestre.',
          'Depois de publicar, monitore relatórios do Merchant Center e Search Console para identificar páginas com queda de impressão, problemas de rastreamento ou avisos de qualidade.',
        ],
      },
    ],
    faqs: [
      {
        question: 'EAN é obrigatório no Google Shopping?',
        answer:
          'Produtos que têm identificadores oficiais geralmente devem informá-los no feed. As exigências podem variar por categoria e disponibilidade real do identificador.',
      },
      {
        question: 'Imagem errada pode prejudicar campanha?',
        answer:
          'Sim. Ela pode gerar baixa confiança, cliques desperdiçados, reprovação em canais de venda ou conversão menor porque o comprador não reconhece o item correto.',
      },
    ],
    relatedSlugs: ['seo-para-imagens-de-produtos', 'ean-gtin-codigo-barras-diferencas'],
  },
  {
    slug: 'geo-seo-ia-generativa-ecommerce',
    title: 'GEO e SEO para e-commerce: o que realmente importa na busca com IA',
    description:
      'Um resumo prático das recomendações do Google para aparecer melhor na busca tradicional e nas experiências com IA generativa.',
    tag: 'GEO',
    publishedAt: '2026-09-14',
    updatedAt: '2026-09-14',
    readTime: '8 min',
    keywords: ['GEO para e-commerce', 'SEO IA generativa', 'AEO GEO', 'busca com IA Google'],
    sections: [
      {
        heading: 'GEO não substitui SEO',
        body: [
          'O Google orienta que a otimização para experiências de IA generativa continua apoiada nas mesmas bases de SEO: conteúdo útil, páginas rastreáveis, boa experiência e informações confiáveis.',
          'Para um e-commerce ou ferramenta de catálogo, isso significa explicar problemas reais do usuário, mostrar processo, organizar conteúdo por seções claras e manter páginas técnicas acessíveis ao rastreamento.',
        ],
      },
      {
        heading: 'Conteúdo precisa trazer experiência própria',
        body: [
          'Páginas genéricas sobre “dicas para vender mais” dificilmente se destacam. O conteúdo mais forte nasce da prática: auditoria de SKU, erros de EAN, imagem trocada, feed reprovado, rotina de marketplace e impacto operacional.',
          'Esse tipo de material é melhor para pessoas e também mais fácil de ser citado em respostas de IA, porque oferece detalhes específicos que não parecem apenas uma reciclagem do que já existe.',
        ],
      },
      {
        heading: 'Evite atalhos que não ajudam o usuário',
        body: [
          'Não é necessário criar marcações especiais para IA, dividir conteúdo artificialmente ou publicar páginas quase iguais para cada variação de consulta. Isso pode enfraquecer o site em vez de melhorar.',
          'A estratégia mais sustentável é criar um acervo enxuto de páginas completas, interligadas e atualizadas, com dados estruturados quando eles representam fielmente o conteúdo visível.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Preciso criar um arquivo llms.txt para ranquear no Google?',
        answer:
          'Não para o Google. Segundo o guia oficial, a Pesquisa Google não usa arquivos llms.txt como requisito ou vantagem de ranking, embora eles possam ser mantidos para outros sistemas.',
      },
      {
        question: 'Dados estruturados garantem presença em respostas de IA?',
        answer:
          'Não. Eles ajudam a clareza e podem qualificar páginas para recursos de pesquisa, mas não são uma marcação especial para IA nem garantem exibição.',
      },
    ],
    relatedSlugs: ['seo-para-imagens-de-produtos', 'dados-produto-google-shopping-ean'],
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

export function getFaqSchema(post: BlogPost) {
  if (!post.faqs?.length) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
