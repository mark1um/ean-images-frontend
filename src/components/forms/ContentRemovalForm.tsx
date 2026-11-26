'use client';

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { submitContentRemoval } from '@/services/api';
import { SUPPORT_CONFIG } from '@/lib/config';

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent'; requestId: string } | { kind: 'error'; message: string };

export function ContentRemovalForm() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const value = (name: string) => String(form.get(name) ?? '').trim();

    if (!value('eans') && !value('urls')) {
      setStatus({ kind: 'error', message: 'Informe os EANs ou os links do conteúdo.' });
      return;
    }

    setStatus({ kind: 'sending' });
    try {
      const { requestId } = await submitContentRemoval({
        name: value('name'),
        email: value('email'),
        company: value('company'),
        role: value('role') === 'representante' ? 'representante' : 'titular',
        eans: value('eans'),
        urls: value('urls'),
        description: value('description'),
        goodFaith: true,
        website: value('website'),
      });
      setStatus({ kind: 'sent', requestId });
    } catch (error) {
      setStatus({
        kind: 'error',
        message:
          error instanceof Error && error.message !== 'Dados inválidos na requisição'
            ? error.message
            : `Não foi possível enviar. Confira os campos ou escreva para ${SUPPORT_CONFIG.email}.`,
      });
    }
  }

  if (status.kind === 'sent') {
    return (
      <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-6" role="status">
        <CheckCircle2 className="h-6 w-6 text-emerald-400" />
        <h2 className="mt-3 text-xl font-bold text-white">Pedido recebido</h2>
        <p className="mt-2 text-slate-300">
          Protocolo <span className="font-mono text-white">{status.requestId}</span>. Enviamos uma confirmação para o seu
          e-mail e vamos responder em até 2 dias úteis.
        </p>
      </div>
    );
  }

  const label = 'block text-sm font-semibold text-white';
  const field = 'input-field mt-2';

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-slate-700 bg-slate-900/60 p-5 md:p-6">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="cr-name" className={label}>Nome *</label>
          <input id="cr-name" name="name" required minLength={2} maxLength={120} className={field} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="cr-email" className={label}>E-mail *</label>
          <input id="cr-email" name="email" type="email" required maxLength={200} className={field} autoComplete="email" />
        </div>
        <div>
          <label htmlFor="cr-company" className={label}>Empresa / marca</label>
          <input id="cr-company" name="company" maxLength={160} className={field} autoComplete="organization" />
        </div>
        <div>
          <label htmlFor="cr-role" className={label}>Você é *</label>
          <select id="cr-role" name="role" className={field} defaultValue="titular">
            <option value="titular">Titular dos direitos</option>
            <option value="representante">Representante do titular</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="cr-eans" className={label}>EANs do conteúdo (um por linha)</label>
        <textarea id="cr-eans" name="eans" rows={4} maxLength={40000} className={`${field} font-mono`} placeholder={'7891234567890\n7891234567891'} />
      </div>

      <div>
        <label htmlFor="cr-urls" className={label}>Links onde o conteúdo aparece (opcional)</label>
        <textarea id="cr-urls" name="urls" rows={2} maxLength={5000} className={field} />
      </div>

      <div>
        <label htmlFor="cr-description" className={label}>Descreva o conteúdo e o seu direito sobre ele *</label>
        <textarea
          id="cr-description"
          name="description"
          rows={4}
          required
          minLength={10}
          maxLength={5000}
          className={field}
          placeholder="Ex.: somos o fabricante e as fotos dos EANs acima foram produzidas pela nossa equipe."
        />
      </div>

      {/* Campo escondido contra robôs */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="cr-website">Site</label>
        <input id="cr-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex items-start gap-3 text-sm text-slate-300">
        <input type="checkbox" name="goodFaith" required className="mt-1 h-4 w-4 accent-cyan-500" />
        <span>
          Declaro, de boa-fé, que sou titular dos direitos sobre o conteúdo indicado ou estou autorizado a agir em nome
          do titular, e que as informações deste pedido são verdadeiras.
        </span>
      </label>

      {status.kind === 'error' && (
        <p className="rounded-lg border border-rose-500/40 bg-rose-500/10 p-3 text-sm text-rose-200" role="alert">
          {status.message}
        </p>
      )}

      <button type="submit" className="btn-primary" disabled={status.kind === 'sending'}>
        {status.kind === 'sending' ? 'Enviando...' : 'Enviar pedido de remoção'}
      </button>
    </form>
  );
}
