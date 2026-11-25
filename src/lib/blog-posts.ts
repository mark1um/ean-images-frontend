import { absoluteUrl, siteName } from '@/lib/site';

export type CodeBlock = {
  code: string;
  /** Rótulo exibido acima do bloco, ex.: "curl" ou "Python". */
  label?: string;
};

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
    /** Parágrafos; um objeto { code } vira bloco de código (exemplos de API). */
    body: Array<string | CodeBlock>;
  }>;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  relatedSlugs?: string[];
  /** Chamada final do artigo. Sem ela, aponta para a busca de imagens do site. */
  cta?: {
    title: string;
    text: string;
    href: string;
    label: string;
  };
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'api-imagens-produtos-ean',
    title: 'API de imagens de produtos por EAN: guia de integração com exemplos',
    description:
      'Como buscar foto, nome e descrição de produtos pelo código de barras (EAN/GTIN) via API REST, com exemplos em curl, JavaScript e Python, custos e boas práticas.',
    tag: 'API',
    publishedAt: '2026-11-19',
    updatedAt: '2026-11-19',
    readTime: '8 min',
    keywords: [
      'API de imagens de produtos',
      'API EAN',
      'API imagem por código de barras',
      'API GTIN imagens',
      'buscar foto de produto pelo EAN API',
      'API dados de produto',
    ],
    sections: [
      {
        heading: 'Resposta rápida',
        body: [
          'Uma API de imagens de produtos por EAN recebe o número do código de barras e devolve a foto do produto, normalmente com nome e descrição. A EAN Images API faz isso para produtos vendidos no Brasil: a consulta de disponibilidade é grátis, a liberação custa 1 crédito pela imagem e 1 pelos dados, e os créditos saem a partir de R$ 0,05, pagos via PIX.',
          'A documentação completa está em developers.eanimages.com.br/docs. Abaixo está o fluxo de integração do começo ao fim.',
        ],
      },
      {
        heading: 'Por que usar o EAN como chave',
        body: [
          'O EAN (ou GTIN) identifica uma versão específica de um produto: marca, sabor, tamanho e embalagem. Buscar foto pelo nome do produto traz resultados parecidos, mas errados com frequência ("500 ml" no lugar de "1 L", sabor diferente, embalagem antiga). Pelo EAN, a correspondência é exata e o arquivo já pode ser nomeado pelo código.',
          'A API aceita EAN-8, UPC de 12 dígitos, EAN-13 e GTIN-14. Códigos com dígito verificador inválido são recusados antes de qualquer cobrança.',
        ],
      },
      {
        heading: 'Passo 1: consultar a disponibilidade (grátis)',
        body: [
          'Antes de gastar créditos, pergunte se o produto existe no catálogo. Para um EAN, a chamada funciona até sem chave:',
          { label: 'curl', code: 'curl https://api.eanimages.com.br/v1/availability/7891910000197' },
          {
            label: 'Resposta',
            code: '{\n  "ean": "7891910000197",\n  "available": true,\n  "image": { "available": true, "format": "jpg", "credits": 1 },\n  "data":  { "available": true, "hasName": true, "hasDescription": true, "credits": 1 }\n}',
          },
          'Com chave, POST /v1/availability aceita até 1.000 EANs por chamada e devolve um resumo com quantos têm imagem, quantos têm dados e quantos créditos custaria liberar tudo. A cota diária de consultas é de 20.000 EANs por conta.',
        ],
      },
      {
        heading: 'Passo 2: liberar imagem e dados',
        body: [
          'Crie a conta em developers.eanimages.com.br, gere uma chave no painel e envie até 100 EANs por chamada. O campo include escolhe o que liberar: "image", "data" ou os dois.',
          {
            label: 'JavaScript (Node 18+)',
            code: "const res = await fetch('https://api.eanimages.com.br/v1/products/unlock', {\n  method: 'POST',\n  headers: {\n    Authorization: `Bearer ${process.env.EANIMAGES_API_KEY}`,\n    'Content-Type': 'application/json',\n  },\n  body: JSON.stringify({ eans: ['7891910000197'], include: ['image', 'data'] }),\n});\nconst { items, creditsCharged, balance } = await res.json();\nconsole.log(items[0].data?.name, items[0].image?.downloadUrl);",
          },
          {
            label: 'Python',
            code: "import os, requests\n\nres = requests.post(\n    'https://api.eanimages.com.br/v1/products/unlock',\n    headers={'Authorization': f\"Bearer {os.environ['EANIMAGES_API_KEY']}\"},\n    json={'eans': ['7891910000197'], 'include': ['image', 'data']},\n    timeout=30,\n)\nres.raise_for_status()\nitem = res.json()['items'][0]\nprint(item['data']['name'], item['image']['downloadUrl'])",
          },
          'A resposta traz, para cada EAN, o link de download da imagem (com data de expiração), o nome do arquivo já com o EAN e, nos dados, nome, descrição em HTML e descrição em texto. Se o saldo não cobre o lote inteiro, nada é cobrado e a API responde 402.',
        ],
      },
      {
        heading: 'Passo 3: guardar a imagem no seu storage',
        body: [
          'O downloadUrl é temporário. Baixe o arquivo e grave no seu próprio storage (S3, R2, disco do servidor ou a mídia da plataforma de e-commerce). Se precisar de um link novo depois, GET /v1/products/{ean}/image redireciona para o download sem cobrar de novo: o que sua conta já liberou continua seu.',
        ],
      },
      {
        heading: 'Quanto custa',
        body: [
          'Consultar é grátis. Liberar custa 1 crédito por imagem e 1 crédito por dados (nome + descrição). Os créditos avulsos vão de R$ 0,05 (pacote de 100 por R$ 5) a R$ 0,035 (10.000 por R$ 350) e não vencem. Há também planos mensais com cota, pagos via PIX um mês por vez, sem renovação automática. A tabela atualizada fica em eanimages.com.br/api-ean.',
          'Para testar sem gastar, use uma chave eani_test_: ela não cobra e devolve dados de exemplo. Conta nova também ganha créditos de boas-vindas.',
        ],
      },
      {
        heading: 'Boas práticas de integração',
        body: [
          'Consulte em lote antes de liberar e libere só o que for usar. Trate o 402 (saldo ou cota insuficiente) mostrando ao usuário quanto falta. Respeite o 429 (limite de requisições) com espera e nova tentativa. Guarde o EAN junto do arquivo para não liberar de novo o mesmo produto. E monitore o saldo com GET /v1/account para não ser surpreendido no meio de uma importação.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Qual API devolve a imagem do produto pelo código de barras?',
        answer:
          'A EAN Images API recebe o EAN/GTIN e devolve a imagem do produto (JPG ou PNG), além de nome e descrição quando disponíveis. A consulta é grátis e a liberação custa a partir de R$ 0,035 por imagem, via PIX.',
      },
      {
        question: 'Dá para testar a API sem pagar?',
        answer:
          'Sim. A consulta de disponibilidade é gratuita, a chave de teste eani_test_ não cobra e conta nova recebe créditos de boas-vindas.',
      },
      {
        question: 'Quantos EANs posso enviar por chamada?',
        answer: 'Até 1.000 EANs por consulta de disponibilidade e até 100 EANs por chamada de liberação.',
      },
    ],
    relatedSlugs: ['consultar-produto-codigo-de-barras-api', 'cadastro-automatico-produtos-erp-ean'],
    cta: {
      title: 'Teste a EAN Images API',
      text: 'Crie a conta, gere sua chave e faça a primeira chamada em minutos. Consulta grátis e pagamento via PIX.',
      href: '/api-ean',
      label: 'Conhecer a API',
    },
  },
  {
    slug: 'consultar-produto-codigo-de-barras-api',
    title: 'Como consultar produto pelo código de barras via API (foto, nome e descrição)',
    description:
      'Veja como transformar um código de barras (EAN/GTIN) em foto, nome e descrição do produto com uma chamada de API, e o que fazer quando o produto não é encontrado.',
    tag: 'API',
    publishedAt: '2026-11-19',
    updatedAt: '2026-11-19',
    readTime: '6 min',
    keywords: [
      'consultar produto pelo código de barras',
      'API código de barras',
      'consulta EAN API',
      'buscar produto por EAN',
      'consulta GTIN',
      'nome do produto pelo código de barras',
    ],
    sections: [
      {
        heading: 'Resposta rápida',
        body: [
          'Para consultar um produto pelo código de barras via API, leia o número do código (EAN/GTIN), valide o dígito verificador e envie para um serviço de catálogo. Na EAN Images API, GET /v1/availability/{ean} diz de graça se existe imagem e dados; POST /v1/products/unlock devolve a foto, o nome e a descrição.',
        ],
      },
      {
        heading: 'O que é o número do código de barras',
        body: [
          'O número embaixo das barras é o GTIN, mais conhecido no Brasil como EAN. O formato mais comum é o EAN-13 (13 dígitos, começando com 789 ou 790 para produtos registrados no Brasil). Também existem EAN-8 (embalagens pequenas), UPC-A de 12 dígitos (produtos americanos) e GTIN-14 (caixas e fardos).',
          'O último dígito é verificador: ele é calculado a partir dos outros e permite detectar erro de digitação ou de leitura antes de consultar qualquer API.',
        ],
      },
      {
        heading: 'Validando o EAN antes de chamar a API',
        body: [
          'Validar localmente evita chamadas desnecessárias. A regra é a mesma para todos os formatos GTIN: multiplique os dígitos alternadamente por 3 e por 1, da direita para a esquerda (sem o verificador), some e confira se o verificador completa a soma até o próximo múltiplo de 10.',
          {
            label: 'JavaScript',
            code: "function isValidGtin(code) {\n  if (!/^(\\d{8}|\\d{12}|\\d{13}|\\d{14})$/.test(code)) return false;\n  const digits = code.split('').map(Number);\n  const check = digits.pop();\n  const sum = digits\n    .reverse()\n    .reduce((acc, d, i) => acc + d * (i % 2 === 0 ? 3 : 1), 0);\n  return (10 - (sum % 10)) % 10 === check;\n}\n\nisValidGtin('7891910000197'); // true",
          },
        ],
      },
      {
        heading: 'Consultando: existe foto e dados?',
        body: [
          'A consulta de disponibilidade é gratuita e funciona sem chave para um EAN por vez (com limite por IP). Com chave, aceita listas de até 1.000 códigos.',
          { label: 'curl', code: 'curl https://api.eanimages.com.br/v1/availability/7891910000197' },
          'A resposta separa imagem (image.available) de dados (data.hasName, data.hasDescription). Assim você decide o que liberar: só a foto, só o texto ou os dois.',
        ],
      },
      {
        heading: 'Obtendo foto, nome e descrição',
        body: [
          'Com o produto encontrado, a liberação devolve o conteúdo na própria resposta:',
          {
            label: 'curl',
            code: 'curl -X POST https://api.eanimages.com.br/v1/products/unlock \\\n  -H "Authorization: Bearer eani_live_SUA_CHAVE" \\\n  -H "Content-Type: application/json" \\\n  -d \'{ "eans": ["7891910000197"], "include": ["image", "data"] }\'',
          },
          'Cada recurso custa 1 crédito e só é cobrado na primeira vez. Depois, GET /v1/products/{ean} devolve de graça o que sua conta já liberou.',
        ],
      },
      {
        heading: 'Quando o produto não é encontrado',
        body: [
          'Nenhum catálogo cobre 100% dos códigos. Produtos regionais, lançamentos recentes e marcas próprias costumam faltar. Para esses casos, mantenha um fluxo alternativo no seu sistema: cadastro manual, foto tirada na loja ou pedido ao fornecedor. Consultar de novo depois também vale: o catálogo da EAN Images recebe imagens novas com frequência.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Existe API gratuita para consultar produto pelo código de barras?',
        answer:
          'Na EAN Images, consultar se um EAN tem foto e dados é gratuito. Para receber a foto, o nome e a descrição, cada recurso custa 1 crédito, a partir de R$ 0,035, pago via PIX.',
      },
      {
        question: 'O código de barras de 13 dígitos é o mesmo que EAN?',
        answer:
          'Sim. O número de 13 dígitos impresso na embalagem é o EAN-13, um tipo de GTIN. Produtos registrados no Brasil normalmente começam com 789 ou 790.',
      },
    ],
    relatedSlugs: ['api-imagens-produtos-ean', 'ean-gtin-codigo-barras-diferencas'],
    cta: {
      title: 'Consulte produtos pelo código de barras',
      text: 'A consulta é grátis. Crie a conta para liberar foto, nome e descrição via API.',
      href: '/api-ean',
      label: 'Conhecer a API',
    },
  },
  {
    slug: 'cadastro-automatico-produtos-erp-ean',
    title: 'Cadastro automático de produtos no ERP e PDV pelo EAN',
    description:
      'Como ERPs, PDVs e sistemas de gestão podem preencher foto, nome e descrição do produto a partir do código de barras, reduzindo o tempo de cadastro.',
    tag: 'API',
    publishedAt: '2026-11-19',
    updatedAt: '2026-11-19',
    readTime: '6 min',
    keywords: [
      'cadastro automático de produtos',
      'cadastro de produtos pelo código de barras',
      'ERP cadastro por EAN',
      'PDV cadastro de produtos',
      'preencher cadastro de produto automaticamente',
    ],
    sections: [
      {
        heading: 'Resposta rápida',
        body: [
          'Para automatizar o cadastro de produtos, o ERP ou PDV lê o código de barras, consulta uma API de catálogo pelo EAN e preenche foto, nome e descrição. O usuário só confere e completa preço, estoque e dados fiscais. A EAN Images API oferece esse conteúdo para produtos vendidos no Brasil, com consulta grátis e pagamento por uso via PIX.',
        ],
      },
      {
        heading: 'Onde o cadastro manual trava',
        body: [
          'Em um mercado ou farmácia, cada produto novo exige digitar descrição, achar uma foto e padronizar o nome. Multiplique por centenas de itens por mês e o cadastro vira gargalo: produtos ficam fora do e-commerce, aparecem sem foto no app de delivery ou com nomes diferentes em cada canal.',
          'Para quem desenvolve o sistema, isso também vira suporte: o cliente reclama que "dá muito trabalho cadastrar".',
        ],
      },
      {
        heading: 'Como fica o fluxo automatizado',
        body: [
          '1. O usuário bipa ou digita o EAN na tela de cadastro. 2. O sistema valida o dígito verificador e chama GET /v1/availability/{ean}, que é grátis. 3. Se houver conteúdo, o sistema libera imagem e dados com POST /v1/products/unlock. 4. A foto é salva no storage do sistema e os campos de nome e descrição chegam preenchidos para revisão.',
          'Para a importação inicial de um cliente novo, o mesmo fluxo roda em lote: até 1.000 EANs por consulta e 100 por liberação.',
        ],
      },
      {
        heading: 'Quem paga os créditos',
        body: [
          'Há dois modelos comuns. No primeiro, a empresa do software tem uma conta só, compra créditos ou um plano mensal e embute o custo na mensalidade do sistema. No segundo, cada cliente cria a própria conta e informa a chave no sistema. O primeiro dá uma experiência melhor; o segundo deixa o custo transparente para quem usa.',
          'Como a cobrança é de 1 crédito por recurso e só na primeira vez, um produto já liberado pela sua conta pode ser reutilizado por todos os seus clientes sem custo extra.',
        ],
      },
      {
        heading: 'O que a API não substitui',
        body: [
          'Preço, estoque, NCM, CEST e tributação continuam sendo responsabilidade do cadastro de cada loja. A API resolve a parte visual e descritiva, que é a mais demorada para fazer à mão.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Meu ERP pode preencher foto do produto pelo código de barras?',
        answer:
          'Sim, integrando uma API de catálogo por EAN. A EAN Images API devolve foto, nome e descrição a partir do código, com consulta grátis e liberação a partir de R$ 0,035 por item.',
      },
      {
        question: 'Preciso pagar de novo se dois clientes cadastrarem o mesmo produto?',
        answer:
          'Não, se os dois usam a mesma conta da API: o conteúdo liberado fica disponível para a conta e baixar de novo não consome créditos.',
      },
    ],
    relatedSlugs: ['api-imagens-produtos-ean', 'auditoria-catalogo-produtos-sem-imagem'],
    cta: {
      title: 'Automatize o cadastro de produtos',
      text: 'Integre a EAN Images API ao seu ERP ou PDV. Consulta grátis e pagamento por uso via PIX.',
      href: '/api-ean',
      label: 'Conhecer a API',
    },
  },
  {
    slug: 'api-gtin-ean-brasil-como-escolher',
    title: 'APIs de EAN/GTIN no Brasil: como escolher a fonte de dados e imagens de produtos',
    description:
      'Comparação prática das opções para obter dados e imagens de produtos pelo código de barras no Brasil: GS1, bases públicas, Open Food Facts e APIs comerciais como a EAN Images.',
    tag: 'API',
    publishedAt: '2026-11-19',
    updatedAt: '2026-11-19',
    readTime: '7 min',
    keywords: [
      'API GTIN Brasil',
      'API EAN Brasil',
      'base de dados de produtos por EAN',
      'alternativa API Cosmos',
      'GS1 Brasil API',
      'Open Food Facts API',
    ],
    sections: [
      {
        heading: 'Resposta rápida',
        body: [
          'Não existe uma fonte única e completa. Para dados oficiais, a referência é o cadastro feito pelo dono da marca na GS1 Brasil. Para alimentos, o Open Food Facts é aberto e gratuito, mas colaborativo. Bases públicas de produtos brasileiros ajudam com nome e categoria. Quando o objetivo principal é a foto do produto pronta para e-commerce, com cobrança por uso via PIX, a EAN Images API é feita para isso.',
        ],
      },
      {
        heading: 'Critérios que importam',
        body: [
          'Cobertura de produtos brasileiros (código 789/790). Se entrega imagem ou só texto. Qualidade e padronização das fotos. Licença de uso do conteúdo. Modelo de cobrança (assinatura, por chamada ou por item). Limites de requisição. Facilidade para testar antes de pagar.',
          'Defina primeiro o que você precisa de verdade. Um PDV pode precisar só do nome; uma loja virtual precisa da foto.',
        ],
      },
      {
        heading: 'GS1 Brasil (dados do dono da marca)',
        body: [
          'A GS1 Brasil é a organização que licencia os códigos de barras no país. As empresas associadas registram os dados dos seus produtos no cadastro da GS1, o que faz dela a fonte mais oficial. O acesso a esses dados é feito por serviços da própria GS1, e a disponibilidade de imagens depende do que cada fabricante cadastrou.',
        ],
      },
      {
        heading: 'Bases públicas de produtos brasileiros',
        body: [
          'Existem bases de consulta por GTIN mantidas por empresas de software de varejo, com páginas públicas e APIs com plano gratuito limitado e planos pagos. São úteis para nome, marca, NCM e categoria. A cobertura de imagens varia e é bom conferir os termos de uso das fotos antes de usar em loja virtual.',
        ],
      },
      {
        heading: 'Open Food Facts',
        body: [
          'Banco de dados aberto e colaborativo, focado em alimentos, com API gratuita. Os dados têm licença aberta (ODbL) e as fotos também são licenciadas abertamente, com exigência de atribuição e compartilhamento pela mesma licença. Como as fotos são enviadas por voluntários, a qualidade e o enquadramento variam bastante, e a cobertura de produtos brasileiros fora de alimentos é pequena.',
        ],
      },
      {
        heading: 'EAN Images API (foco em imagem para e-commerce)',
        body: [
          'A EAN Images é especializada em imagens de produtos vendidos no Brasil: mercado, farmácia, higiene, beleza, limpeza, bebidas e pet. A API devolve a imagem (JPG ou PNG, nomeada pelo EAN) e, quando disponíveis, nome e descrição em HTML e texto.',
          'O modelo é por uso: consultar disponibilidade é grátis (até 1.000 EANs por chamada), liberar custa 1 crédito por imagem e 1 por dados, de R$ 0,05 a R$ 0,035 por crédito, pagos via PIX, sem cartão e sem contrato. Há chave de teste que não cobra. Quem não programa pode usar a busca do site e receber um ZIP por e-mail.',
        ],
      },
      {
        heading: 'Combinação recomendada',
        body: [
          'Para a maioria dos sistemas de varejo, a combinação que funciona é: imagem e descrição pela EAN Images API, dados fiscais (NCM, CEST) pelo cadastro do próprio cliente ou de uma base fiscal, e um fluxo manual para os itens que nenhuma fonte cobre.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Qual a melhor API de EAN para imagens de produtos no Brasil?',
        answer:
          'Depende do uso. Para fotos prontas para e-commerce de produtos vendidos no Brasil, a EAN Images API é especializada nisso, com consulta grátis e cobrança por imagem via PIX. Para dados oficiais do fabricante, a referência é a GS1 Brasil; para alimentos com dados abertos, o Open Food Facts.',
      },
      {
        question: 'Posso usar fotos do Open Food Facts na minha loja?',
        answer:
          'As fotos têm licença aberta que exige atribuição e compartilhamento pela mesma licença. Confira os termos antes de usar comercialmente.',
      },
    ],
    relatedSlugs: ['api-imagens-produtos-ean', 'ean-gtin-codigo-barras-diferencas'],
    cta: {
      title: 'Teste a API de imagens por EAN',
      text: 'Consulta grátis, chave de teste e créditos a partir de R$ 0,035 via PIX.',
      href: '/api-ean',
      label: 'Conhecer a API',
    },
  },
  {
    slug: 'fotos-automaticas-loja-virtual-api',
    title: 'Fotos automáticas na loja virtual com API (WooCommerce, Nuvemshop, VTEX)',
    description:
      'Como preencher as fotos dos produtos da loja virtual automaticamente a partir do EAN, usando uma API de imagens e a API da própria plataforma de e-commerce.',
    tag: 'API',
    publishedAt: '2026-11-19',
    updatedAt: '2026-11-19',
    readTime: '6 min',
    keywords: [
      'fotos automáticas loja virtual',
      'importar imagens de produtos WooCommerce',
      'imagens de produtos Nuvemshop',
      'VTEX imagens por EAN',
      'preencher fotos de produtos automaticamente',
    ],
    sections: [
      {
        heading: 'Resposta rápida',
        body: [
          'Se os produtos da loja já têm EAN cadastrado, dá para preencher as fotos automaticamente: um script lista os produtos sem imagem, consulta os EANs numa API de imagens (como a EAN Images API), baixa as fotos e envia para a plataforma pela API dela. Quem não programa pode fazer o mesmo pelo site da EAN Images, recebendo um ZIP com os arquivos nomeados pelo EAN.',
        ],
      },
      {
        heading: 'O que você precisa',
        body: [
          'Os produtos cadastrados com o EAN preenchido (no WooCommerce costuma ficar em um campo GTIN ou no SKU; na Nuvemshop e na VTEX há campo próprio de código de barras). Uma chave da EAN Images API. E acesso à API da sua plataforma para enviar imagens.',
        ],
      },
      {
        heading: 'O fluxo do script',
        body: [
          '1. Liste os produtos sem imagem e pegue o EAN de cada um. 2. Envie os EANs para POST /v1/availability (até 1.000 por chamada, grátis) e separe os que têm imagem. 3. Libere as imagens com POST /v1/products/unlock, 100 por vez, com include ["image"]. 4. Para cada item, envie o downloadUrl ou o arquivo baixado para a plataforma.',
          {
            label: 'Python (esboço)',
            code: "import os, requests\n\nAPI = 'https://api.eanimages.com.br/v1'\nH = {'Authorization': f\"Bearer {os.environ['EANIMAGES_API_KEY']}\"}\n\neans = ['7891910000197', '7891000100103']  # produtos da loja sem foto\n\navail = requests.post(f'{API}/availability', headers=H, json={'eans': eans}).json()\ncom_imagem = [i['ean'] for i in avail['items'] if i['image']['available']]\n\nfor i in range(0, len(com_imagem), 100):\n    lote = com_imagem[i:i + 100]\n    res = requests.post(f'{API}/products/unlock', headers=H,\n                        json={'eans': lote, 'include': ['image']}).json()\n    for item in res['items']:\n        url = item['image']['downloadUrl']\n        # envie `url` para a API da sua plataforma (ex.: campo images do produto)\n        print(item['ean'], url)",
          },
        ],
      },
      {
        heading: 'Dicas por plataforma',
        body: [
          'WooCommerce: a API REST aceita uma URL em images[].src ao atualizar o produto, e o WordPress baixa o arquivo para a biblioteca de mídia. Nuvemshop: o endpoint de imagens do produto aceita a URL ou o arquivo em base64. VTEX: as imagens são vinculadas ao SKU pelo catálogo; envie a URL do arquivo já gravado no seu storage.',
          'Como o downloadUrl da EAN Images expira, use-o logo em seguida ou grave o arquivo no seu storage antes de enviar.',
        ],
      },
      {
        heading: 'Sem programar',
        body: [
          'Exporte a lista de EANs da loja para uma planilha, cole na busca do site eanimages.com.br, pague via PIX e receba o ZIP. Os arquivos chegam nomeados pelo EAN, o que facilita a importação em massa pelas ferramentas da própria plataforma.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Como colocar foto automática nos produtos da minha loja virtual?',
        answer:
          'Com o EAN cadastrado, use uma API de imagens por EAN, como a EAN Images API, para buscar as fotos e envie para a loja pela API da plataforma. Sem programar, cole os EANs no site da EAN Images e receba as imagens em ZIP.',
      },
      {
        question: 'Funciona com Shopify, Tray ou Loja Integrada?',
        answer:
          'Sim, desde que a plataforma permita enviar imagens por API ou importar em massa. O que muda é só a última etapa, o envio da imagem para a plataforma.',
      },
    ],
    relatedSlugs: ['api-imagens-produtos-ean', 'onde-conseguir-fotos-de-produtos-para-loja-virtual'],
    cta: {
      title: 'Preencha as fotos da loja automaticamente',
      text: 'Integre a EAN Images API ou use a busca do site sem cadastro.',
      href: '/api-ean',
      label: 'Conhecer a API',
    },
  },
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
    relatedSlugs: ['codigo-universal-do-produto-gtin-marketplaces', 'organizar-skus-marketplaces-ean', 'checklist-imagens-catalogo-digital'],
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
    relatedSlugs: ['ean-gtin-codigo-barras-diferencas', 'codigo-universal-do-produto-gtin-marketplaces', 'baixar-imagens-produtos-pelo-ean'],
  },
  {
    slug: 'ean-gtin-codigo-barras-diferencas',
    title: 'Código EAN e GTIN: o que é, tipos e como funciona o código de barras',
    description:
      'O que é código EAN, o que é GTIN e qual a diferença. Tipos (EAN-13, EAN-8, UPC, GTIN-14), o que significam os números, como calcular o dígito verificador e como conseguir um código oficial.',
    tag: 'Catálogo',
    publishedAt: '2026-08-14',
    updatedAt: '2026-11-24',
    readTime: '9 min',
    keywords: [
      'código EAN',
      'o que é código EAN',
      'o que é GTIN',
      'GTIN EAN',
      'código de barras EAN',
      'código GTIN',
      'código universal do produto',
      'diferença entre EAN e GTIN',
      'EAN-13',
      'GTIN-14',
    ],
    sections: [
      {
        heading: 'Resposta rápida',
        body: [
          'Código EAN é o número de 13 dígitos (às vezes 8) impresso embaixo do código de barras dos produtos. Ele identifica uma versão exata de um item: marca, sabor, tamanho e embalagem. GTIN (Global Trade Item Number) é o nome oficial da família de códigos da GS1 da qual o EAN faz parte. Na prática, EAN-13 e GTIN-13 são o mesmo número.',
          'Marketplaces chamam esse número de "código universal do produto" (Mercado Livre), "GTIN" (Shopee, Google, Amazon) ou "código de barras". Na nota fiscal eletrônica, ele vai no campo cEAN. É sempre o mesmo código.',
        ],
      },
      {
        heading: 'O que é GTIN',
        body: [
          'GTIN é o padrão global da GS1, organização sem fins lucrativos que administra os códigos de barras no mundo (no Brasil, a GS1 Brasil). O padrão tem quatro tamanhos: GTIN-8, GTIN-12, GTIN-13 e GTIN-14. Todos seguem a mesma regra de formação e o mesmo cálculo de dígito verificador.',
          'Por isso, quando um sistema pede "GTIN/EAN", ele aceita qualquer um desses tamanhos. Um GTIN mais curto pode ser escrito com zeros à esquerda até 14 dígitos sem mudar de significado: 7891910000197 e 07891910000197 são o mesmo código.',
        ],
      },
      {
        heading: 'EAN e GTIN: qual a diferença',
        body: [
          'EAN (European Article Number) é o nome antigo, de quando o padrão era europeu. Em 2005 os sistemas EAN e UPC (dos EUA) foram unificados sob o nome GTIN. O nome EAN continuou popular no Brasil, por isso você vê "código EAN" no ERP, "GTIN" no marketplace e "código de barras" na conversa com o fornecedor.',
          'Resumo: EAN-13 = GTIN-13, EAN-8 = GTIN-8, UPC-A = GTIN-12. O código de barras é o desenho de barras que o leitor do caixa lê; o EAN/GTIN é o número que esse desenho representa.',
        ],
      },
      {
        heading: 'Tipos de código: EAN-13, EAN-8, UPC e GTIN-14',
        body: [
          'EAN-13 (GTIN-13): 13 dígitos, o mais comum no varejo brasileiro. Está em quase todo produto de supermercado, farmácia e loja.',
          'EAN-8 (GTIN-8): 8 dígitos, usado em embalagens pequenas onde o EAN-13 não cabe, como chicletes, batons e esmaltes.',
          'UPC-A (GTIN-12): 12 dígitos, padrão dos EUA e Canadá. Aparece em produtos importados de lá. Para usar em sistemas brasileiros, basta acrescentar um 0 à esquerda.',
          'GTIN-14 (também chamado DUN-14): 14 dígitos, usado em caixas, fardos e outras embalagens de transporte. O primeiro dígito (indicador, de 1 a 8) diferencia a caixa da unidade. Por exemplo, a caixa com 12 unidades de um produto tem GTIN-14 diferente do EAN-13 da unidade. No cadastro de loja virtual, use o EAN da unidade vendida.',
        ],
      },
      {
        heading: 'O que significam os números do código EAN',
        body: [
          'Um EAN-13 brasileiro tem quatro partes. Os três primeiros dígitos são o prefixo da GS1 do país onde a empresa licenciou o código: 789 ou 790 no Brasil. Depois vem o número da empresa, atribuído pela GS1. Em seguida, o número do item, escolhido pela própria empresa para cada produto. O último dígito é o verificador.',
          'Atenção a um mito comum: o prefixo 789 não garante que o produto foi fabricado no Brasil. Ele só mostra que a empresa dona do código é associada à GS1 Brasil. Um produto feito na China por uma marca brasileira pode ter 789, e um produto brasileiro exportado por uma empresa estrangeira pode ter outro prefixo.',
          'Códigos que começam com 2 (de 20 a 29) são de uso interno da loja, como as etiquetas da balança do açougue e da padaria. Eles não identificam o produto fora daquela loja e não servem para marketplace.',
        ],
      },
      {
        heading: 'Como calcular o dígito verificador',
        body: [
          'O último dígito do EAN é calculado a partir dos outros. Isso permite que o leitor do caixa, o ERP e o marketplace recusem um código digitado errado. O cálculo para EAN-13:',
          '1) Pegue os 12 primeiros dígitos. 2) Multiplique os que estão em posição ímpar (1º, 3º, 5º...) por 1 e os de posição par (2º, 4º, 6º...) por 3. 3) Some tudo. 4) O dígito verificador é quanto falta para a próxima dezena (se a soma já termina em 0, ele é 0).',
          {
            label: 'Exemplo: 7891910000197',
            code: 'Dígitos:  7  8  9  1  9  1  0  0  0  0  1  9\nPesos:    1  3  1  3  1  3  1  3  1  3  1  3\nProduto:  7 24  9  3  9  3  0  0  0  0  1 27   → soma = 83\n\nPróxima dezena: 90  →  90 - 83 = 7  →  dígito verificador = 7',
          },
          'Para não fazer a conta na mão, use o verificador de código de barras da EAN Images (eanimages.com.br/verificar-codigo-de-barras). Ele confere até 500 códigos de uma vez, de graça, direto no navegador.',
        ],
      },
      {
        heading: 'Como conseguir um código EAN para o seu produto',
        body: [
          'O único caminho oficial no Brasil é se associar à GS1 Brasil. A empresa paga uma taxa de filiação e uma anuidade, que variam conforme o faturamento e a quantidade de códigos, e recebe um prefixo de empresa para numerar os próprios produtos. Os códigos ficam registrados no Cadastro Nacional de Produtos, consultado por varejistas, marketplaces e pela SEFAZ.',
          'Sites que vendem "EAN avulso" ou geram GTIN de graça entregam números que não estão registrados em nome da sua empresa. Isso pode causar recusa de anúncios e rejeição de nota fiscal. Explicamos os riscos no artigo sobre GTIN oficial vs GTIN aleatório.',
          'Quem revende produtos de outras marcas não precisa criar código: deve usar o EAN que já vem impresso na embalagem do fabricante.',
        ],
      },
      {
        heading: 'Onde o código EAN é usado no e-commerce',
        body: [
          'Marketplaces: Mercado Livre, Shopee, Amazon e Magalu usam o GTIN para agrupar anúncios do mesmo produto, preencher a ficha técnica e decidir em qual catálogo o item entra. Código errado pode jogar o produto no catálogo de outro item.',
          'Google Shopping: o Merchant Center usa o GTIN para identificar o produto e comparar ofertas. Produtos de marca sem GTIN correto podem ter alcance limitado.',
          'Nota fiscal: a NF-e tem o campo cEAN, e a SEFAZ valida GTINs com prefixo brasileiro no cadastro da GS1.',
          'Fotos e dados: o EAN é a chave mais confiável para buscar a foto e a descrição certas de um produto, porque não depende de como cada fornecedor escreve o nome. É assim que a EAN Images entrega imagens de produtos: você cola a lista de EANs e baixa as fotos já nomeadas pelo código.',
        ],
      },
      {
        heading: 'Erros comuns no cadastro',
        body: [
          'Planilha que corta o zero à esquerda (um UPC 012345678905 vira 12345678905, com 11 dígitos). Formate a coluna como texto antes de colar os códigos.',
          'Excel que mostra o EAN como 7,89191E+12. O número foi convertido para notação científica e pode perder os últimos dígitos. De novo: coluna em formato texto.',
          'Usar o GTIN-14 da caixa no anúncio da unidade, ou o EAN de uma variação (sabor, cor, tamanho) em outra.',
          'Colocar o SKU interno no campo de GTIN. SKU é o código da sua loja; GTIN é o código global do produto.',
        ],
      },
    ],
    faqs: [
      {
        question: 'O que é código EAN?',
        answer:
          'É o número, normalmente de 13 dígitos, que fica embaixo do código de barras de um produto e identifica uma versão exata dele (marca, tamanho, sabor, embalagem). No Brasil, os EANs começam com 789 ou 790.',
      },
      {
        question: 'EAN e GTIN são a mesma coisa?',
        answer:
          'Na prática, sim. GTIN é o nome oficial da família de códigos da GS1, e o EAN-13 é o GTIN-13. Sistemas que pedem GTIN aceitam o EAN impresso no produto.',
      },
      {
        question: 'O que é código universal do produto?',
        answer:
          'É o nome que o Mercado Livre e outras plataformas dão ao GTIN/EAN: o número do código de barras do fabricante. Não é o SKU da sua loja.',
      },
      {
        question: 'Qual a diferença entre GTIN-13 e GTIN-14?',
        answer:
          'O GTIN-13 (EAN-13) identifica a unidade vendida ao consumidor. O GTIN-14 identifica embalagens de transporte, como caixas e fardos, e começa com um dígito indicador.',
      },
      {
        question: 'Como saber se um código EAN é válido?',
        answer:
          'Confira o dígito verificador: ele é calculado a partir dos outros 12 dígitos. O verificador grátis da EAN Images faz a conta para até 500 códigos de uma vez.',
      },
      {
        question: 'Como conseguir código de barras para meu produto?',
        answer:
          'Associando sua empresa à GS1 Brasil, que fornece o prefixo e registra os códigos no Cadastro Nacional de Produtos. Revendedores devem usar o EAN que o fabricante já imprimiu na embalagem.',
      },
    ],
    relatedSlugs: [
      'gtin-oficial-vs-gtin-aleatorio',
      'codigo-universal-do-produto-gtin-marketplaces',
      'codigo-de-barras-produtos-importados',
      'baixar-imagens-produtos-pelo-ean',
    ],
    cta: {
      title: 'Verifique seus códigos de barras',
      text: 'Cole até 500 EANs para conferir o dígito verificador e o prefixo, e veja quais produtos já têm foto disponível.',
      href: '/verificar-codigo-de-barras',
      label: 'Verificar códigos grátis',
    },
  },
  {
    slug: 'gtin-oficial-vs-gtin-aleatorio',
    title: 'GTIN oficial vs GTIN aleatório: riscos de usar código gerado na internet',
    description:
      'Qual a diferença entre um GTIN oficial da GS1 e um código EAN gerado em site ou comprado avulso, o que acontece em marketplaces e na nota fiscal, e quando você nem precisa criar um GTIN.',
    tag: 'Catálogo',
    publishedAt: '2026-11-24',
    updatedAt: '2026-11-24',
    readTime: '6 min',
    keywords: [
      'GTIN oficial vs GTIN aleatório',
      'GTIN aleatório',
      'gerador de EAN',
      'comprar código EAN',
      'GTIN falso',
      'EAN avulso',
      'GS1 Brasil',
    ],
    sections: [
      {
        heading: 'Resposta rápida',
        body: [
          'GTIN oficial é o código emitido a partir do prefixo que a GS1 Brasil atribui à sua empresa e que fica registrado em seu nome no Cadastro Nacional de Produtos. GTIN aleatório é um número montado por um gerador on-line ou revendido por terceiros: tem 13 dígitos e o dígito verificador certo, mas não pertence à sua empresa.',
          'O aleatório passa na validação matemática, mas falha na verificação de dono. Marketplaces, o Google e a SEFAZ conseguem checar o dono do prefixo, e é aí que os problemas aparecem.',
        ],
      },
      {
        heading: 'Por que um código aleatório "parece" válido',
        body: [
          'O dígito verificador só prova que o número foi bem formado. Qualquer pessoa consegue calcular um dígito verificador correto para qualquer sequência de 12 dígitos. É exatamente o que os geradores fazem.',
          'O que um gerador não consegue fazer é registrar o código em nome da sua empresa. O prefixo que ele usa pertence a outra empresa, ou a ninguém. Muitas vezes o mesmo número já está em um produto real de outra marca.',
        ],
      },
      {
        heading: 'O que pode dar errado',
        body: [
          'Nota fiscal rejeitada: a SEFAZ confere os GTINs com prefixo brasileiro (789 e 790) no Cadastro Centralizado de GTIN da GS1 Brasil. Código que não está lá, ou que está registrado para outro produto, pode fazer a NF-e ser rejeitada.',
          'Anúncio no catálogo errado: Mercado Livre, Amazon e Shopee agrupam anúncios pelo GTIN. Se o seu número já pertence a outro produto, seu anúncio pode ser associado à ficha de outro item, perder a buy box ou ser removido por informação incorreta.',
          'Google Shopping limitado: o Merchant Center compara o GTIN com o prefixo da marca. Divergência entre marca e dono do prefixo pode gerar avisos e limitar o alcance do produto.',
          'Problema com grandes varejistas: redes de supermercado e farmácia costumam exigir GTIN oficial no cadastro de fornecedores e podem recusar o produto.',
          'Retrabalho: trocar o código depois exige mexer em embalagem, cadastro, anúncios, etiquetas e histórico de vendas.',
        ],
      },
      {
        heading: 'E os códigos vendidos "avulsos"?',
        body: [
          'Alguns sites vendem EANs avulsos tirados de prefixos antigos, comprados antes das regras atuais. O código pode até ser único, mas fica registrado em nome de outra empresa, não da sua marca. Para quem vende só em loja própria pode passar despercebido. Para marketplace, Google Shopping e nota fiscal, o risco é o mesmo do código aleatório.',
        ],
      },
      {
        heading: 'Quando você não precisa criar um GTIN',
        body: [
          'Revendedor: se você revende produtos de outras marcas, use o EAN que o fabricante imprimiu na embalagem. Criar um código novo para um produto que já tem GTIN é erro, mesmo que seja oficial.',
          'Produto sem código: artesanato, produtos feitos sob encomenda, peças usadas e kits montados pela loja normalmente podem ser anunciados sem GTIN. Mercado Livre e Shopee têm a opção de informar que o produto não tem código, e na NF-e o campo cEAN aceita "SEM GTIN".',
          'Marca própria que vai crescer: se você fabrica ou manda fabricar com a sua marca e quer vender em marketplace e varejo, o caminho é se associar à GS1 Brasil.',
        ],
      },
      {
        heading: 'Como conferir um código antes de usar',
        body: [
          'Primeiro, confira se o número é bem formado no verificador de código de barras da EAN Images (grátis, até 500 códigos). Depois, consulte o dono do código no Verified by GS1 ou no Cadastro Nacional de Produtos da GS1 Brasil. Se a empresa que aparece não é a sua nem a do fabricante, não use o código.',
        ],
      },
    ],
    faqs: [
      {
        question: 'GTIN gerado na internet funciona?',
        answer:
          'Ele passa na validação do dígito verificador, mas não está registrado em nome da sua empresa. Pode causar rejeição de NF-e, anúncios no catálogo errado e problemas no Google Shopping.',
      },
      {
        question: 'Posso comprar código EAN avulso?',
        answer:
          'Existem vendedores, mas o código continua registrado em nome de outra empresa. O único GTIN em nome da sua marca é o emitido a partir de um prefixo da GS1 Brasil.',
      },
      {
        question: 'Preciso de GTIN para vender no Mercado Livre ou na Shopee?',
        answer:
          'Para produtos de marca que têm código de barras, sim: informe o GTIN do fabricante. Produtos sem código, como artesanato ou kits próprios, podem ser anunciados com a opção de produto sem GTIN.',
      },
      {
        question: 'Revendedor precisa se associar à GS1?',
        answer:
          'Não para os produtos que revende: basta usar o EAN impresso na embalagem pelo fabricante. A associação é necessária para quem cria produtos com marca própria.',
      },
    ],
    relatedSlugs: [
      'ean-gtin-codigo-barras-diferencas',
      'codigo-universal-do-produto-gtin-marketplaces',
      'imagens-de-produtos-mercado-livre-shopee',
    ],
    cta: {
      title: 'Confira seus GTINs em segundos',
      text: 'Cole os códigos e veja na hora quais têm dígito verificador errado ou tamanho inválido.',
      href: '/verificar-codigo-de-barras',
      label: 'Abrir o verificador grátis',
    },
  },
  {
    slug: 'codigo-universal-do-produto-gtin-marketplaces',
    title: 'Código universal do produto (GTIN): o que é e como preencher no Mercado Livre e na Shopee',
    description:
      'O que é o código universal do produto pedido pelo Mercado Livre, o GTIN da Shopee e da Amazon, onde encontrar o número, o que fazer quando o produto não tem código e os erros que derrubam anúncios.',
    tag: 'Marketplaces',
    publishedAt: '2026-11-24',
    updatedAt: '2026-11-24',
    readTime: '6 min',
    keywords: [
      'código universal do produto',
      'código universal de produto Mercado Livre',
      'o que é GTIN Shopee',
      'GTIN Shopee',
      'GTIN Mercado Livre',
      'produto sem GTIN',
      'código de barras marketplace',
    ],
    sections: [
      {
        heading: 'Resposta rápida',
        body: [
          'Código universal do produto é o GTIN, o mesmo número do código de barras (EAN) impresso na embalagem pelo fabricante. O Mercado Livre usa o nome "código universal de produto"; a Shopee, a Amazon e o Google chamam de GTIN; ERPs costumam chamar de EAN. É sempre o mesmo número, normalmente com 13 dígitos e começando com 789 ou 790 em produtos registrados no Brasil.',
        ],
      },
      {
        heading: 'Onde encontrar o código universal do produto',
        body: [
          'Na embalagem: é o número embaixo das barras. Ignore códigos internos, lote, validade e o código de barras da etiqueta de preço da loja.',
          'Na nota fiscal de compra: o campo cEAN (ou "GTIN") da NF-e do fornecedor traz o código da unidade. Se aparecer "SEM GTIN", o fornecedor não informou.',
          'No cadastro do fornecedor ou distribuidor: a planilha de produtos normalmente tem a coluna EAN.',
          'Cuidado com a caixa: o código impresso na caixa de transporte (GTIN-14 ou DUN-14) é diferente do código da unidade. No anúncio, use o da unidade que o cliente recebe.',
        ],
      },
      {
        heading: 'Por que os marketplaces pedem o GTIN',
        body: [
          'O GTIN diz ao marketplace exatamente qual produto você está vendendo. Com ele, a plataforma junta seu anúncio ao catálogo do produto, preenche a ficha técnica, mostra seu preço ao lado dos concorrentes e evita anúncios duplicados.',
          'Para o vendedor, isso costuma significar mais visibilidade: produtos com GTIN correto entram no catálogo e aparecem em buscas e comparações onde anúncios soltos não aparecem.',
        ],
      },
      {
        heading: 'No Mercado Livre',
        body: [
          'Ao criar o anúncio, o Mercado Livre pede o "código universal de produto". Com o código certo, ele sugere a ficha do catálogo já preenchida. Se o produto realmente não tem código (artesanato, produto feito por você, kit montado pela loja), existe a opção de informar que ele não tem código universal, com o motivo.',
          'Evite marcar "não tem código" para produtos de marca que têm EAN na embalagem. A plataforma pode pedir correção ou restringir o anúncio.',
        ],
      },
      {
        heading: 'Na Shopee',
        body: [
          'Na Shopee, o campo se chama GTIN e aparece no cadastro do produto e de cada variação. Cada variação (cor, tamanho, sabor) que tem código próprio deve receber o seu GTIN. Produtos sem código podem ser cadastrados com a opção de produto sem GTIN.',
          'Vendedores que emitem nota pela Shopee ou por integração com ERP precisam do GTIN certo também para a NF-e, que valida códigos brasileiros no cadastro da GS1.',
        ],
      },
      {
        heading: 'Erros que derrubam anúncios',
        body: [
          'Usar SKU interno, código do fornecedor ou número de lote no campo GTIN.',
          'Colocar o mesmo GTIN em variações diferentes, ou o GTIN de uma variação em outra.',
          'Usar código gerado na internet ou comprado avulso. Veja os riscos em GTIN oficial vs GTIN aleatório.',
          'Código com dígito a menos por causa da planilha (zero à esquerda cortado ou notação científica no Excel). Confira a lista no verificador de código de barras antes de subir em massa.',
        ],
      },
      {
        heading: 'Do GTIN à foto do anúncio',
        body: [
          'Com a lista de GTINs em mãos, você também resolve as fotos. Na EAN Images, você cola os códigos, vê de graça quais têm imagem e baixa os arquivos já nomeados pelo EAN, prontos para subir em massa no Mercado Livre, na Shopee ou na Amazon.',
        ],
      },
    ],
    faqs: [
      {
        question: 'O que é código universal do produto no Mercado Livre?',
        answer:
          'É o GTIN/EAN do produto, o número do código de barras impresso na embalagem pelo fabricante. Não é o SKU da sua loja.',
      },
      {
        question: 'O que é GTIN na Shopee?',
        answer:
          'É o código de barras global do produto (EAN-13, EAN-8, UPC ou GTIN-14). A Shopee usa o GTIN para identificar o produto e para dados da nota fiscal.',
      },
      {
        question: 'E se o meu produto não tem código de barras?',
        answer:
          'Produtos sem código, como artesanato ou kits montados pela loja, podem ser anunciados com a opção de produto sem GTIN. Se você tem marca própria e quer escalar, o caminho é se associar à GS1 Brasil.',
      },
      {
        question: 'Posso usar o mesmo GTIN em dois anúncios?',
        answer:
          'Pode ter mais de um anúncio do mesmo produto, mas cada variação diferente (cor, tamanho, sabor) tem seu próprio GTIN. Repetir o código em variações diferentes é erro de cadastro.',
      },
    ],
    relatedSlugs: [
      'ean-gtin-codigo-barras-diferencas',
      'imagens-de-produtos-mercado-livre-shopee',
      'organizar-skus-marketplaces-ean',
      'gtin-oficial-vs-gtin-aleatorio',
    ],
  },
  {
    slug: 'codigo-de-barras-produtos-importados',
    title: 'Código de barras de produtos importados: precisa de EAN brasileiro?',
    description:
      'Produto importado pode usar o código de barras de origem? Quando é preciso um EAN brasileiro, o que fazer com UPC de 12 dígitos e produtos sem código, e como cadastrar importados em marketplaces.',
    tag: 'Catálogo',
    publishedAt: '2026-11-24',
    updatedAt: '2026-11-24',
    readTime: '5 min',
    keywords: [
      'código de barras produtos importados',
      'EAN produto importado',
      'GTIN produto importado',
      'UPC para EAN',
      'código de barras importado',
    ],
    sections: [
      {
        heading: 'Resposta rápida',
        body: [
          'Não precisa trocar. O GTIN é global: um produto importado com código de barras de origem (EAN de outro país ou UPC dos EUA) pode ser vendido no Brasil, anunciado em marketplace e informado na NF-e com esse mesmo código. Você só precisa de um EAN brasileiro quando a marca do produto é sua, como em importação com marca própria (private label), ou quando o produto chega sem código nenhum.',
        ],
      },
      {
        heading: 'Por que o código de origem vale no Brasil',
        body: [
          'Todas as organizações GS1 do mundo usam o mesmo padrão. O prefixo (por exemplo 690 a 699 na China, 450 a 459 e 490 a 499 no Japão, 000 a 139 nos EUA) só indica onde a empresa dona do código se registrou. Não é um código "do país", e não precisa ser convertido.',
          'Um produto de marca estrangeira com código de origem continua identificado pelo mesmo GTIN no Mercado Livre, na Amazon, no Google Shopping e em qualquer ERP.',
        ],
      },
      {
        heading: 'UPC de 12 dígitos: o que fazer',
        body: [
          'Produtos dos EUA e do Canadá costumam ter UPC-A, com 12 dígitos. Ele é um GTIN-12 válido. Se o seu sistema só aceita 13 dígitos, acrescente um 0 à esquerda: 012345678905 vira 0012345678905. O dígito verificador continua o mesmo.',
          'Na planilha, formate a coluna como texto. Se ela for numérica, o Excel apaga o zero inicial e o código fica inválido.',
        ],
      },
      {
        heading: 'Quando o importador precisa de código próprio',
        body: [
          'Marca própria: se você manda fabricar na China (ou em qualquer lugar) com a sua marca, os códigos devem ser da sua empresa. O fabricante não deve usar o prefixo dele, e um código gerado na internet traz os riscos de GTIN aleatório. Associe a empresa à GS1 Brasil e imprima o código na embalagem antes do embarque.',
          'Produto sem código: algumas mercadorias chegam sem código de barras. Se forem revendidas em varejo ou marketplace como produto de marca, o dono da marca deve providenciar o GTIN. Para itens genéricos, os marketplaces costumam aceitar o anúncio sem GTIN.',
          'Kits e combos montados no Brasil: um kit novo, montado pelo importador, é um item novo e precisa de GTIN próprio se for vendido como produto de catálogo.',
        ],
      },
      {
        heading: 'Cuidados no cadastro de importados',
        body: [
          'Confira os códigos da invoice ou da lista do fornecedor no verificador de código de barras antes de cadastrar. Erros de digitação são comuns em listas montadas à mão.',
          'Não confunda o código da unidade com o da caixa master (GTIN-14). Anuncie com o código da unidade.',
          'Para fotos, o código de origem também funciona como chave: busque pelo EAN ou UPC na EAN Images para ver se há imagem disponível antes de contratar fotografia.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Produto importado precisa de código de barras brasileiro?',
        answer:
          'Não. O código de barras de origem é um GTIN global e vale no Brasil. Só é preciso código próprio quando a marca é sua (private label) ou quando o produto não tem código.',
      },
      {
        question: 'Posso usar UPC no Mercado Livre e na NF-e?',
        answer:
          'Sim. O UPC-A é um GTIN-12. Se o sistema exigir 13 dígitos, acrescente um zero à esquerda.',
      },
      {
        question: 'O fabricante chinês pode colocar o código dele no meu produto?',
        answer:
          'Para produto com a sua marca, não é o recomendado: o código ficaria registrado para outra empresa. O ideal é usar GTINs do prefixo da sua empresa na GS1 Brasil.',
      },
    ],
    relatedSlugs: [
      'ean-gtin-codigo-barras-diferencas',
      'gtin-oficial-vs-gtin-aleatorio',
      'codigo-universal-do-produto-gtin-marketplaces',
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
