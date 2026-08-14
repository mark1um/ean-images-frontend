import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900/50 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-white font-bold mb-4">EAN Images</h3>
            <p className="text-slate-400 text-sm">
              Banco de imagens de produtos por EAN. A forma mais rápida e simples de encontrar imagens 
              de qualidade para seu e-commerce.
            </p>
          </div>

          {/* Produto */}
          <div>
            <h4 className="text-white font-semibold mb-4">Produto</h4>
            <nav className="space-y-2 flex flex-col">
              <Link href="/" className="text-slate-400 hover:text-white text-sm transition-colors">
                Buscar Imagens
              </Link>
              <Link href="/como-funciona" className="text-slate-400 hover:text-white text-sm transition-colors">
                Como Funciona
              </Link>
              <Link href="/faq" className="text-slate-400 hover:text-white text-sm transition-colors">
                Perguntas Frequentes
              </Link>
              <Link href="/#pricing" className="text-slate-400 hover:text-white text-sm transition-colors">
                Tabela de Preços
              </Link>
            </nav>
          </div>

          {/* Recursos */}
          <div>
            <h4 className="text-white font-semibold mb-4">Recursos</h4>
            <nav className="space-y-2 flex flex-col">
              <Link href="/faq" className="text-slate-400 hover:text-white text-sm transition-colors">
                O que é EAN?
              </Link>
              <Link href="/blog/ean-gtin-codigo-barras-diferencas" className="text-slate-400 hover:text-white text-sm transition-colors">
                EAN, GTIN e código de barras
              </Link>
              <Link href="/blog/checklist-imagens-catalogo-digital" className="text-slate-400 hover:text-white text-sm transition-colors">
                Checklist de imagens
              </Link>
              <Link href="/blog/baixar-imagens-produtos-pelo-ean" className="text-slate-400 hover:text-white text-sm transition-colors">
                Baixar imagens pelo EAN
              </Link>
            </nav>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="text-white font-semibold mb-4" >Empresa</h4>
            <nav className="space-y-2 flex flex-col">
              <Link href="/sobre-nos" className="text-slate-400 hover:text-white text-sm transition-colors">
                Sobre Nós
              </Link>
              <Link href="/contato" className="text-slate-400 hover:text-white text-sm transition-colors">
                Contato
              </Link>
              <Link href="/blog" className="text-slate-400 hover:text-white text-sm transition-colors">
                Blog
              </Link>
              <Link href="/status" className="text-slate-400 hover:text-white text-sm transition-colors">
                Status
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} EAN Images. Todos os direitos reservados. Banco de imagens de produtos por EAN.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
              Política de Privacidade
            </a>
            <span className="text-slate-700">•</span>
            <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
