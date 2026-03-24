import { AlertTriangle, ArrowRight, Mail } from 'lucide-react';
import Link from 'next/link';

interface ErrorStateProps {
  title: string;
  message: string;
  showContact?: boolean;
}

export function ErrorState({ title, message, showContact = false }: ErrorStateProps) {
  return (
    <div className="max-w-md w-full mx-auto text-center">
      <div className="card py-10 space-y-5">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-red-600/20 border-2 border-red-500/30 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
          <p className="text-slate-400 text-sm">{message}</p>
        </div>

        {showContact && (
          <div className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-xl text-sm text-slate-400">
            <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <span>
              Dúvidas? Entre em contato:{' '}
              <a href="mailto:suporte@seudominio.com.br" className="text-blue-400 hover:underline">
                suporte@seudominio.com.br
              </a>
            </span>
          </div>
        )}

        <Link href="/" className="btn-primary w-full justify-center">
          Voltar ao início
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
