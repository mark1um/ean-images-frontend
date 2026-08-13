'use client';

import { useState } from 'react';
import { ArrowLeft, QrCode, Lock, Mail, User } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import type { PricingResult } from '@/types';

interface CheckoutFormProps {
  pricing: PricingResult;
  onSubmit: (data: { email: string; name?: string }) => void;
  onBack: () => void;
  isLoading: boolean;
  initialEmail?: string;
  initialName?: string;
}

export function CheckoutForm({ pricing, onSubmit, onBack, isLoading, initialEmail = '', initialName = '' }: CheckoutFormProps) {
  const [email, setEmail] = useState(initialEmail);
  const [name, setName] = useState(initialName);
  const [emailError, setEmailError] = useState('');

  function validateEmail(value: string): boolean {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setEmailError(valid ? '' : 'Informe um e-mail valido');
    return valid;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateEmail(email)) return;
    onSubmit({ email: email.trim(), name: name.trim() || undefined });
  }

  return (
    <div className="space-y-4">
      <div className="card">
        <h2 className="text-lg font-bold text-white mb-4">Finalizar pedido</h2>

        <div className="flex justify-between items-center p-4 bg-slate-800/50 rounded-xl">
          <div>
            <p className="text-slate-300 font-medium">{pricing.quantity} imagens</p>
            <p className="text-slate-500 text-sm">
              {formatCurrency(pricing.pricePerUnit)} por imagem
            </p>
          </div>
          <div className="text-right">
            {pricing.discount > 0 && (
              <p className="text-slate-500 text-sm line-through">
                {formatCurrency(pricing.subtotal)}
              </p>
            )}
            <p className="text-2xl font-bold text-green-400">
              {formatCurrency(pricing.total)}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card space-y-4">
        <h3 className="font-semibold text-white flex items-center gap-2">
          <Mail className="w-4 h-4 text-blue-400" />
          Para onde enviamos as imagens?
        </h3>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            E-mail <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) validateEmail(e.target.value);
              }}
              onBlur={(e) => validateEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              disabled={isLoading}
              className="input-field pl-10"
            />
          </div>
          {emailError && <p className="text-red-400 text-xs mt-1">{emailError}</p>}
          <p className="text-slate-500 text-xs mt-1">
            O link de download sera enviado para este e-mail.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Nome <span className="text-slate-500 font-normal">(opcional)</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              disabled={isLoading}
              maxLength={100}
              className="input-field pl-10"
            />
          </div>
        </div>

        <div className="flex items-start gap-2 p-3 bg-slate-800/30 rounded-xl text-xs text-slate-500">
          <Lock className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
          <span>
            Pagamento seguro via PIX (QR Code). A liberacao do pedido ocorre
            automaticamente após confirmação do pagamento.
          </span>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onBack} disabled={isLoading} className="btn-secondary">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>

          <button
            type="submit"
            disabled={!email || !!emailError || isLoading}
            className="btn-primary flex-1 py-4"
          >
            {isLoading ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Gerando QR...
              </>
            ) : (
              <>
                <QrCode className="w-5 h-5" />
                Gerar PIX {formatCurrency(pricing.total)}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
