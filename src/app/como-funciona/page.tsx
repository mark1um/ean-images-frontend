import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ean-images.com';

export const metadata: Metadata = {
  title: 'Como Funciona — Guia Completo do Banco de Imagens EAN',
  description:
    'Aprenda como funciona o banco de imagens EAN. Guia completo sobre como buscar, encontrar e comprar imagens de produtos pelo código EAN de forma rápida e segura.',
  keywords: [
    'como funciona EAN Images',
    'buscar imagens por EAN',
    'código de barras',
    'banco de imagens',
    'e-commerce',
  ],
  openGraph: {
    type: 'website',
    url: `${siteUrl}/como-funciona`,
    title: 'Como Funciona — Banco de Imagens EAN',
    description: 'Guia completo para buscar e comprar imagens de produtos pelo EAN.',
  },
};

export default function ComoFuncionaPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-20 border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[540px] h-[240px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Como Funciona o Banco de Imagens EAN
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
            Busque imagens de produtos pelo código EAN em 3 simples passos. Rápido, seguro e sem cadastro.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 py-16 md:py-20">
        <div className="space-y-12">
          {/* Step 1 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-semibold mb-4">
                Passo 1
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Insira o Código EAN ou Faça Upload de Arquivo
              </h2>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Digite um código EAN individual (8 ou 13 dígitos) ou faça upload de um arquivo com múltiplos EANs. 
                Suportamos formatos Excel, CSV e texto. Nossa plataforma processa instantaneamente seus dados.
              </p>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>EAN-8 e EAN-13 suportados</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Upload de arquivos em lote</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Processamento instantâneo</span>
                </li>
              </ul>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-8 border border-slate-700">
              <div className="bg-slate-800 rounded p-4 font-mono text-sm text-cyan-300">
                <p>Exemplo de EAN:</p>
                <p className="mt-2 text-white">7894900000006</p>
                <p className="mt-4 text-slate-400 text-xs">Insira um EAN para buscar</p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-slate-900/50 rounded-lg p-8 border border-slate-700 md:order-2">
              <div className="space-y-3">
                <div className="h-20 bg-slate-800 rounded-lg"></div>
                <div className="h-20 bg-slate-800 rounded-lg"></div>
                <p className="text-slate-400 text-sm text-center mt-4">Imagens encontradas</p>
              </div>
            </div>
            <div className="md:order-1">
              <div className="inline-block px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-semibold mb-4">
                Passo 2
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Veja a Disponibilidade Instantaneamente
              </h2>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Nosso banco de dados consulta milhões de imagens de produtos em tempo real. Você vê imediatamente 
                quantas imagens foram encontradas para cada EAN, com preview das imagens e informações detalhadas.
              </p>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Análise em segundos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Preview das imagens</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Preço calculado automaticamente</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Step 3 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-semibold mb-4">
                Passo 3
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Pague com PIX e Receba as Imagens
              </h2>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Realize o pagamento via PIX (instantâneo e seguro). Após confirmação, receba imediatamente 
                um arquivo ZIP com todas as imagens de alta qualidade no seu e-mail. Sem demoras, sem complicações.
              </p>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Pagamento via PIX seguro</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Download imediato</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Imagens em alta resolução</span>
                </li>
              </ul>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-8 border border-slate-700">
              <div className="text-center">
                <div className="inline-block w-32 h-32 bg-slate-800 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-slate-600">PIX</span>
                </div>
                <p className="text-slate-400">QR Code PIX Gerado</p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <section className="mt-20 pt-12 border-t border-slate-700">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Por Que Escolher EAN Images?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-2">Sem Cadastro</h3>
              <p className="text-slate-300">
                Não precisa criar conta ou preencher formulários longos. Comece a usar em segundos.
              </p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-2">Preços Justos</h3>
              <p className="text-slate-300">
                Pague apenas pelo que usar. Desconto progressivo para grandes quantidades. Sem taxas ocultas.
              </p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-2">Alta Qualidade</h3>
              <p className="text-slate-300">
                Imagens de alta resolução, originais de fabricantes. Perfeitas para e-commerce e marketing.
              </p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-2">Segurança Garantida</h3>
              <p className="text-slate-300">
                Pagamento via PIX com certificação de segurança. Seus dados estão protegidos.
              </p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-2">Entrega Rápida</h3>
              <p className="text-slate-300">
                Receba as imagens no e-mail imediatamente após o pagamento. Sem esperas.
              </p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-2">Uso Comercial</h3>
              <p className="text-slate-300">
                Todas as imagens têm licença para uso comercial em e-commerce, redes sociais e catálogos.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Comece Agora — Sem Riscos
          </h2>
          <p className="text-slate-300 mb-8">
            Teste com um EAN agora. Nenhum cadastro necessário, nenhuma cobrança sem seu consentimento.
          </p>
          <a
            href="/"
            className="inline-block px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold rounded-lg transition-colors"
          >
            Ir para o Banco de Imagens
          </a>
        </section>
      </section>
    </main>
  );
}
