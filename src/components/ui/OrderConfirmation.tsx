import { CheckCircle, Mail, Clock, MessageSquare, Phone, Mail as MailIcon } from 'lucide-react';
import Link from 'next/link';
import { SUPPORT_CONFIG, PROCESSING_CONFIG } from '@/lib/config';
import type { OrderStatus } from '@/types';

interface OrderConfirmationProps {
  status: OrderStatus;
  orderId: string;
}

export function OrderConfirmation({ status, orderId }: OrderConfirmationProps) {
  return (
    <div className="max-w-2xl w-full mx-auto mt-20 px-4">
      {/* Confirmação Principal */}
      <div className="card py-10 space-y-6 mb-6">
        {/* Ícone de sucesso */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-green-600/20 border-2 border-green-500/30 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
        </div>

        {/* Título */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-3">
            Pagamento Confirmado!
          </h1>
          <p className="text-base text-slate-300">
            Seu pedido foi processado com sucesso. Obrigado por usar EAN Images!
          </p>
        </div>

        {/* Informações do Pedido */}
        <div className="bg-slate-800/50 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">ID do Pedido:</span>
            <span className="font-mono text-sm text-cyan-400">{orderId}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Imagens:</span>
            <span className="font-semibold text-white">{status?.totalFound ?? 0} imagens</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Valor Total:</span>
            <span className="font-semibold text-cyan-400">R$ {((status?.totalPrice ?? 0) / 100).toFixed(2)}</span>
          </div>
        </div>

        {/* Próximos Passos */}
        <div className="bg-blue-950/30 border border-blue-800/30 rounded-xl p-5 space-y-4">
          <div className="flex gap-3">
            <Clock className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-white mb-1">O que fazer agora?</h3>
              <p className="text-sm text-slate-300">
                Você <strong>não precisa esperar</strong> nesta página. Sua solicitação está sendo processada automaticamente em background.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-white mb-1">Quando receberá o email?</h3>
              <p className="text-sm text-slate-300">
                Estimamos <strong>{PROCESSING_CONFIG.estimatedTimeMin} a {PROCESSING_CONFIG.estimatedTimeMax} minutos</strong> para gerar e enviar suas imagens. Verifique a caixa de entrada do e-mail informado no checkout.<br/>
                <span className="text-xs text-slate-400 mt-1 block">Não esqueça de conferir a pasta de spam/lixo eletrônico.</span>
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <MailIcon className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-white mb-1">Quando receber o email</h3>
              <p className="text-sm text-slate-300">
                Clique no link de download para acessar seu arquivo ZIP com todas as imagens. 
                O link é válido por <strong>24 horas</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Botão */}
        <div>
          <Link
            href="/"
            className="block w-full px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-colors text-center"
          >
            Voltar para Home
          </Link>
        </div>
      </div>

      {/* Seção de Suporte */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white">Precisa de Ajuda?</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Email Support */}
          <div className="card p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-cyan-600/20 flex items-center justify-center flex-shrink-0">
              <MailIcon className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">Email Support</h3>
              <p className="text-sm text-slate-400 mb-3">
                Envie suas dúvidas para nossa equipe
              </p>
              <a
                href={`mailto:${SUPPORT_CONFIG.email}`}
                className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
              >
                {SUPPORT_CONFIG.email}
              </a>
            </div>
          </div>

          {/* WhatsApp/Phone */}
          <div className="card p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-green-600/20 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">Suporte Rápido</h3>
              <p className="text-sm text-slate-400 mb-3">
                Conecte-se conosco via WhatsApp ou telefone
              </p>
              <div className="space-y-1">
                <a
                  href={SUPPORT_CONFIG.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 text-sm font-medium transition-colors block"
                >
                  WhatsApp: {SUPPORT_CONFIG.whatsapp.display}
                </a>
                <a
                  href={SUPPORT_CONFIG.phone.tel}
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                >
                  Tel: {SUPPORT_CONFIG.phone.display}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ rápido */}
        <div className="card p-6 bg-slate-900/50">
          <h3 className="font-semibold text-white mb-4">Dúvidas Comuns</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-cyan-400 font-medium mb-1">Não recebi o email ainda</p>
              <p className="text-slate-400">
                Aguarde {PROCESSING_CONFIG.estimatedTimeMin}-{PROCESSING_CONFIG.estimatedTimeMax} minutos e verifique a pasta de spam. Se continuar sem receber após {PROCESSING_CONFIG.timeoutMinutes} minutos, contate nosso suporte.
              </p>
            </div>
            <div>
              <p className="text-cyan-400 font-medium mb-1">O link de download expirou</p>
              <p className="text-slate-400">
                Links de download são válidos por 24 horas. Entre em contato conosco em caso de problemas.
              </p>
            </div>
            <div>
              <p className="text-cyan-400 font-medium mb-1">Falta alguma imagem</p>
              <p className="text-slate-400">
                Se nem todas as imagens foram encontradas, verifique a tela de resultado que apareceu após a análise dos EANs.
              </p>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}
