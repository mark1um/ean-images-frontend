import Image from 'next/image';
import Link from 'next/link';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex-shrink-0">
            <Image
              src="/assets/logo-horizontal-semfundo.png"
              alt="EAN Images - Banco de Imagens de Produtos"
              width={180}
              height={200}
              className="object-contain group-hover:opacity-80 transition-opacity"
              priority
            />
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <Link
            href="/como-funciona"
            className="text-sm text-slate-300 hover:text-white transition-colors"
          >
            Como Funciona
          </Link>
          <Link
            href="/faq"
            className="text-sm text-slate-300 hover:text-white transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="/blog"
            className="text-sm text-slate-300 hover:text-white transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/#pricing"
            className="text-sm text-slate-300 hover:text-white transition-colors"
          >
            Preços
          </Link>
        </nav>
      </div>
    </header>
  );
}
