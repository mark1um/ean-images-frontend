'use client';

import { useState } from 'react';
import { ArrowLeft, Eye, Lock, Mail, User } from 'lucide-react';
import type { AnalyzeStats } from '@/types';

interface LeadCaptureFormProps {
  stats: AnalyzeStats;
  onSubmit: (data: { email: string; name?: string }) => void;
  onBack: () => void;
  isLoading: boolean;
}

export function LeadCaptureForm({ stats, onSubmit, onBack, isLoading }: LeadCaptureFormProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
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
    <form onSubmit={handleSubmit} className="card space-y-5">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-300">
          <Eye className="h-4 w-4" />
          Resultado pronto
        </div>
        <h2 className="text-2xl font-bold text-white">Falta pouco! <br />Digite seu e-mail para ver o resultado</h2>
       {/* <p className="text-slate-400">
          Encontramos a disponibilidade para {stats.totalValid} EANs. Envie seu e-mail para liberar o resumo completo.
        </p>*/}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* <div className="rounded-xl bg-slate-800/50 p-4">
          <p className="text-sm text-slate-400">EANs analisados</p>
          <p className="text-2xl font-bold text-white">{stats.totalValid}</p>
        </div> */}
        <div className="rounded-xl bg-slate-800/50 p-4">
          <p className="text-sm text-slate-400">Status</p>
          <p className="text-lg font-semibold text-cyan-300">Pronto</p>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-300">
          E-mail <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
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
        {emailError && <p className="mt-1 text-xs text-red-400">{emailError}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-300">
          Nome <span className="font-normal text-slate-500">(opcional)</span>
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
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

      <div className="flex items-start gap-2 rounded-xl bg-slate-800/30 p-3 text-xs text-slate-500">
        <Lock className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-green-400" />
        <span>Usaremos seu e-mail para enviar comunicados sobre sua busca e ofertas da EAN Images.</span>
      </div>

      <div className="flex gap-3 pt-1">
        <button type="button" onClick={onBack} disabled={isLoading} className="btn-secondary">
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </button>
        <button type="submit" disabled={!email || !!emailError || isLoading} className="btn-primary flex-1 py-4">
          {isLoading ? (
            <>
              <span className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              Liberando...
            </>
          ) : (
            <>
              <Eye className="h-5 w-5" />
              Ver resultado
            </>
          )}
        </button>
      </div>
    </form>
  );
}
