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
    slug: 'onde-conseguir-fotos-de-produtos-para-loja-virtual',
    title: 'Onde conseguir fotos de produtos para loja virtual sem fotografar',
    description:
      'Comparamos as opções para conseguir imagens de produtos para e-commerce: fotografar, pedir ao fornecedor, copiar da internet ou buscar pelo código EAN.',
    tag: 'E-commerce',
    publishedAt: '2026-11-03',
    updatedAt: '2026-11-03',
    readTime: '7 min',
    keywords: [
      'fotos de produtos para loja virtual',
      'onde conseguir imagens de produtos',
      'imagens de produtos para e-commerce',
      'banco de imagens de produtos',
      'foto de produto pelo código de barras',
    ],
    sections: [
      {
        heading: 'O problema: centenas de produtos e nenhuma foto',
        body: [
          'Quem abre uma loja virtual, um delivery de mercado ou passa a vender em marketplace quase sempre esbarra no mesmo ponto: o estoque já existe, mas as fotos não. Sem imagem, o produto não é aprovado em vários canais e, quando é, vende muito menos.',
          'Para lojas com poucos itens, fotografar resolve. Para quem tem centenas ou milhares de SKUs de marcas conhecidas, como mercados, farmácias, pet shops, lojas de cosméticos e distribuidores, fotografar tudo vira um projeto caro e lento.',
        ],
      },
      {
        heading: 'Opção 1: fotografar os produtos',
        body: [
          'Dá controle total sobre ângulo, luz e fundo. O custo está no tempo: separar o produto, montar o fundo, fotografar, tratar e renomear cada arquivo. Mesmo com estúdio montado, a produção costuma ficar em dezenas de fotos por dia.',
          'Faz sentido para produtos próprios, artesanais, sem código de barras ou em que a foto é diferencial de venda.',
        ],
      },
      {
        heading: 'Opção 2: pedir ao fornecedor ou ao fabricante',
        body: [
          'É a fonte mais confiável, mas depende de cada fornecedor responder, enviar arquivos com nomes padronizados e manter o material atualizado. Na prática, o retorno chega aos poucos, em formatos diferentes, e ainda precisa ser conferido produto a produto.',
        ],
      },
      {
        heading: 'Opção 3: copiar imagens da internet',
        body: [
          'Parece rápido, mas cada imagem precisa ser procurada, conferida e renomeada à mão. O risco de pegar a versão errada da embalagem, outro tamanho ou um sabor diferente é alto, e algumas imagens têm marca d’água ou baixa resolução.',
        ],
      },
      {
        heading: 'Opção 4: buscar as imagens pelo código EAN',
        body: [
          'Como o EAN (código de barras) identifica um produto específico, ele funciona como chave de busca: você envia a lista de EANs e recebe as imagens já associadas a cada código. Isso elimina a busca por nome e a renomeação manual.',
          'Na EAN Images, a consulta é gratuita: você cola os EANs ou envia uma planilha (Excel ou CSV) e vê quantas imagens existem antes de pagar. Só paga pelas imagens encontradas: R$ 0,10 por imagem, ou até 1.000 imagens por R$ 99. O pagamento é por PIX e o ZIP chega no e-mail em minutos, com cada arquivo nomeado pelo EAN.',
        ],
      },
      {
        heading: 'Qual opção escolher',
        body: [
          'Para produtos industrializados com código de barras, comece pela busca por EAN e fotografe só o que não for encontrado. Assim, o trabalho de fotografia fica concentrado nos itens que realmente precisam.',
          'Para produtos próprios ou sem EAN, a fotografia continua sendo o caminho.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Qual a forma mais rápida de conseguir fotos para muitos produtos?',
        answer:
          'Para produtos com código de barras, buscar as imagens pelo EAN em lote. Na EAN Images você envia uma planilha com os EANs, vê na hora quantas imagens existem e recebe todas em um ZIP por e-mail após o PIX.',
      },
      {
        question: 'Quanto custa conseguir imagens de produtos pelo EAN?',
        answer:
          'Na EAN Images, R$ 0,10 por imagem encontrada (mínimo de R$ 1,00), até 1.000 imagens por R$ 99, até 3.000 por R$ 179 e até 10.000 por R$ 299. A consulta de disponibilidade é gratuita.',
      },
      {
        question: 'Preciso criar conta para baixar as imagens?',
        answer: 'Não. Basta informar os EANs, um e-mail para entrega e pagar por PIX.',
      },
    ],
    relatedSlugs: ['baixar-imagens-produtos-pelo-ean', 'quanto-custa-foto-de-produto-ecommerce'],
  },
  {
    slug: 'imagens-de-produtos-mercado-livre-shopee',
    title: 'Imagens de produtos para Mercado Livre, Shopee e Amazon: como conseguir em lote',
    description:
      'O que os marketplaces costumam exigir das fotos de produtos e como conseguir imagens para centenas de anúncios usando o código EAN.',
    tag: 'Marketplace',
    publishedAt: '2026-11-03',
    updatedAt: '2026-11-03',
    readTime: '6 min',
    keywords: [
      'imagens para Mercado Livre',
      'fotos de produtos Shopee',
      'imagens de produtos marketplace',
      'fundo branco produto marketplace',
      'cadastro em massa marketplace',
    ],
    sections: [
      {
        heading: 'Por que a foto trava o cadastro no marketplace',
        body: [
          'Marketplaces dependem de catálogo padronizado. Por isso pedem o código universal do produto (EAN/GTIN) e uma foto principal que mostre o item com clareza. Anúncio sem foto adequada pode ser recusado, perder exposição ou ficar fora do catálogo do produto.',
          'Para quem sobe dezenas ou centenas de anúncios de uma vez, por planilha ou integrador (ERP, hub de marketplaces), a foto costuma ser a etapa mais lenta.',
        ],
      },
      {
        heading: 'Requisitos comuns da foto principal',
        body: [
          'As regras mudam com o tempo e variam por categoria, então confira sempre a central do vendedor de cada canal. Em geral, os marketplaces pedem: fundo branco ou neutro na foto principal, produto centralizado ocupando boa parte da imagem, sem textos promocionais, logotipos da loja ou marca d’água, e boa resolução (imagens quadradas a partir de 1.000 px de lado funcionam bem na maioria dos canais, com zoom).',
          'A imagem também precisa corresponder exatamente ao produto anunciado: mesma embalagem, tamanho, sabor e versão do EAN informado.',
        ],
      },
      {
        heading: 'Como conseguir as imagens em lote pelo EAN',
        body: [
          '1. Exporte do seu ERP ou planilha a lista de EANs dos produtos que vai anunciar.',
          '2. Cole a lista ou envie a planilha na EAN Images. A consulta é gratuita e mostra quais EANs têm imagem e o valor exato.',
          '3. Pague por PIX (R$ 0,10 por imagem ou até 1.000 imagens por R$ 99) e receba o ZIP no e-mail, com cada arquivo nomeado pelo EAN.',
          '4. Como o nome do arquivo é o próprio EAN, fica fácil associar as imagens aos anúncios na planilha de cadastro em massa ou no integrador.',
        ],
      },
      {
        heading: 'O que fazer com os EANs sem imagem',
        body: [
          'A consulta mostra a lista dos códigos não encontrados. Use essa lista para pedir as fotos ao fornecedor ou fotografar apenas esses itens. Na EAN Images, quem consulta recebe um aviso por e-mail quando chegam imagens novas para os EANs procurados.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Posso usar a mesma imagem no Mercado Livre, na Shopee e na Amazon?',
        answer:
          'Em geral sim, desde que a imagem atenda aos requisitos de cada canal (fundo, resolução e ausência de textos promocionais) e corresponda exatamente ao produto anunciado. Confira as regras atuais na central do vendedor de cada marketplace.',
      },
      {
        question: 'Como associar as imagens aos anúncios em massa?',
        answer:
          'Na EAN Images cada arquivo vem nomeado com o EAN do produto, então basta cruzar o nome do arquivo com a coluna de EAN da sua planilha de cadastro ou do seu integrador.',
      },
    ],
    relatedSlugs: ['organizar-skus-marketplaces-ean', 'checklist-imagens-catalogo-digital'],
  },
  {
    slug: 'fotos-de-produtos-para-supermercado-online',
    title: 'Fotos de produtos para supermercado online e delivery: guia para montar o catálogo',
    description:
      'Como mercados, atacarejos, farmácias e conveniências conseguem imagens para milhares de itens do catálogo online usando o código de barras.',
    tag: 'Varejo',
    publishedAt: '2026-11-03',
    updatedAt: '2026-11-03',
    readTime: '6 min',
    keywords: [
      'fotos de produtos supermercado',
      'imagens de produtos para delivery',
      'catálogo de supermercado online',
      'banco de imagens supermercado',
      'imagens para aplicativo de mercado',
    ],
    sections: [
      {
        heading: 'O desafio do catálogo de mercado',
        body: [
          'Um supermercado de bairro tem facilmente de 3 mil a 15 mil itens ativos. Para vender em site próprio, aplicativo de delivery ou WhatsApp com catálogo, cada item precisa de foto, e a maioria são produtos de marcas da indústria com código de barras.',
          'Fotografar tudo é inviável na rotina da loja. Copiar da internet um a um leva semanas e gera erros de versão (embalagem antiga, tamanho diferente, sabor trocado).',
        ],
      },
      {
        heading: 'Use o EAN que já está no seu sistema',
        body: [
          'O sistema de frente de caixa ou ERP do mercado já tem o EAN de quase todo produto industrializado. Esse código é a forma mais segura de encontrar a imagem certa, porque identifica a versão exata do item.',
          'Exporte a lista de produtos com o código de barras, de preferência só os ativos e com estoque, e use essa lista como base para buscar as imagens.',
        ],
      },
      {
        heading: 'Passo a passo com a EAN Images',
        body: [
          '1. Exporte os EANs do ERP em Excel ou CSV.',
          '2. Envie a planilha na EAN Images. A consulta é gratuita e mostra quantos produtos têm imagem e o valor total antes do pagamento.',
          '3. Pague por PIX. Para catálogos grandes, os pacotes saem mais em conta: até 1.000 imagens por R$ 99, até 3.000 por R$ 179 e até 10.000 por R$ 299.',
          '4. Receba o ZIP por e-mail com os arquivos nomeados pelo EAN e importe na plataforma da loja, no app de delivery ou no catálogo.',
        ],
      },
      {
        heading: 'Itens que normalmente ficam de fora',
        body: [
          'Hortifrúti, açougue, padaria e produtos pesados na loja usam códigos internos e não têm imagem de fabricante. Para esses, vale um pequeno ensaio fotográfico ou imagens ilustrativas por categoria.',
          'Os EANs não encontrados aparecem na consulta. Guarde essa lista para fotografar ou pedir aos fornecedores.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Quanto custa montar as fotos de um catálogo de supermercado?',
        answer:
          'Pela EAN Images, um catálogo de até 3.000 itens com imagem sai por até R$ 179 e até 10.000 itens por até R$ 299. Você vê o valor exato antes de pagar, porque só são cobradas as imagens encontradas.',
      },
      {
        question: 'As imagens servem para aplicativos de delivery?',
        answer:
          'Sim. As imagens são entregues em arquivo, nomeadas pelo EAN, e podem ser importadas em site próprio, aplicativo de delivery, catálogo de WhatsApp ou marketplace, respeitando as regras de cada plataforma.',
      },
    ],
    relatedSlugs: ['auditoria-catalogo-produtos-sem-imagem', 'baixar-imagens-produtos-pelo-ean'],
  },
  {
    slug: 'quanto-custa-foto-de-produto-ecommerce',
    title: 'Quanto custa foto de produto para e-commerce? Comparativo de custos',
    description:
      'Compare o custo de fotografar, terceirizar fotos e comprar imagens de produtos pelo EAN para montar o catálogo da loja virtual.',
    tag: 'Custos',
    publishedAt: '2026-11-03',
    updatedAt: '2026-11-03',
    readTime: '5 min',
    keywords: [
      'quanto custa foto de produto',
      'preço foto produto e-commerce',
      'custo imagens de produtos',
      'fotografia de produto preço',
      'imagens de produtos barato',
    ],
    sections: [
      {
        heading: 'O que entra no custo de uma foto de produto',
        body: [
          'O custo real não é só o valor pago ao fotógrafo. Entra o tempo de separar e devolver o produto ao estoque, o tratamento da imagem, a renomeação dos arquivos e a associação de cada foto ao produto certo no sistema.',
          'Em catálogos grandes, essa parte operacional costuma pesar mais que a própria fotografia.',
        ],
      },
      {
        heading: 'Fotografia própria ou terceirizada',
        body: [
          'Estúdios de fotografia de produto cobram, em geral, por foto ou por diária, com valores que variam bastante conforme cidade, complexidade do produto e tratamento. Para produtos industrializados simples, o valor por foto costuma ficar na casa de alguns reais a dezenas de reais.',
          'Fazer internamente reduz o custo por foto, mas exige equipamento, espaço e alguém dedicado à tarefa.',
        ],
      },
      {
        heading: 'Imagens pelo EAN',
        body: [
          'Para produtos com código de barras, a EAN Images cobra R$ 0,10 por imagem encontrada (pedido mínimo de R$ 1,00). Em volume, os pacotes reduzem o custo por imagem: até 1.000 imagens por R$ 99 (cerca de R$ 0,10 cada), até 3.000 por R$ 179 (cerca de R$ 0,06) e até 10.000 por R$ 299 (cerca de R$ 0,03).',
          'A consulta é gratuita, você vê o valor exato antes de pagar e só paga pelas imagens que existem no banco. Os arquivos já chegam nomeados pelo EAN, o que elimina a etapa de renomear e associar.',
        ],
      },
      {
        heading: 'Exemplos de custo',
        body: [
          '100 produtos: R$ 10,00 pelo EAN.',
          '500 produtos: R$ 50,00 pelo EAN.',
          '1.000 produtos: R$ 99,00 pelo EAN.',
          '5.000 produtos: R$ 219,00 pelo EAN (pacote de 3.000 + R$ 0,02 por imagem extra).',
          'Combine as opções: compre pelo EAN tudo o que for encontrado e fotografe só os itens restantes.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Qual a forma mais barata de conseguir fotos de produtos?',
        answer:
          'Para produtos industrializados com código de barras, comprar as imagens pelo EAN costuma ser a opção mais barata: na EAN Images custa R$ 0,10 por imagem, ou menos em pacotes (até 10.000 imagens por R$ 299).',
      },
      {
        question: 'Pago pelas imagens que não forem encontradas?',
        answer:
          'Não. A consulta mostra antes do pagamento quais EANs têm imagem, e o valor cobrado considera só as imagens encontradas.',
      },
    ],
    relatedSlugs: ['onde-conseguir-fotos-de-produtos-para-loja-virtual', 'imagens-produto-conversao-ecommerce'],
  },
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
    image: absoluteUrl('/assets/logo-escura.jpg'),
    inLanguage: 'pt-BR',
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
