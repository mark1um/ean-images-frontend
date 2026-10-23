import { AlertTriangle, ArrowRight, Mail, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { SUPPORT_CONFIG } from '@/lib/config';

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
          <div className="space-y-2 p-3 bg-slate-800/50 rounded-xl text-sm text-slate-400 text-left">
            <p className="text-slate-300 font-medium">Precisa de ajuda? Fale com a gente:</p>
            <a
              href={`mailto:${SUPPORT_CONFIG.email}`}
              className="flex items-center gap-2 text-blue-400 hover:underline"
            >
              <Mail className="w-4 h-4 flex-shrink-0" />
              {SUPPORT_CONFIG.email}
            </a>
            <a
              href={SUPPORT_CONFIG.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-green-400 hover:underline"
            >
              <MessageCircle className="w-4 h-4 flex-shrink-0" />
              WhatsApp {SUPPORT_CONFIG.whatsapp.display}
            </a>
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
