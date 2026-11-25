'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, XCircle } from 'lucide-react';
import { checkGtin } from '@/lib/gtin';

const MAX_CODES = 500;

export function GtinValidator() {
  const [text, setText] = useState('');

  const results = useMemo(
    () =>
      text
        .split(/[\n,;\t]+/)
        .map((line) => line.trim())
        .filter(Boolean)
        .slice(0, MAX_CODES)
        .map(checkGtin),
    [text]
  );

  const validCount = results.filter((result) => result.valid).length;
  const validEans = results.filter((result) => result.valid).map((result) => result.digits);
  const searchHref = `/?ean=${encodeURIComponent(validEans.slice(0, 100).join(','))}`;

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-5 md:p-6">
      <label htmlFor="gtin-input" className="block text-sm font-semibold text-white">
        Digite ou cole os códigos de barras (um por linha, até {MAX_CODES})
      </label>
      <textarea
        id="gtin-input"
        value={text}
        onChange={(event) => setText(event.target.value)}
        rows={5}
        inputMode="numeric"
        placeholder={'7891910000197\n7894900011517'}
        className="mt-3 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 font-mono text-slate-100 placeholder:text-slate-600 focus:border-cyan-500 focus:outline-none"
      />

      {results.length > 0 && (
        <div className="mt-5" aria-live="polite">
          <p className="text-sm text-slate-300">
            {validCount} de {results.length} {results.length === 1 ? 'código válido' : 'códigos válidos'}
          </p>
          <ul className="mt-3 divide-y divide-slate-800 rounded-lg border border-slate-800">
            {results.map((result, index) => (
              <li key={`${result.input}-${index}`} className="flex items-start gap-3 p-3">
                {result.valid ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" aria-label="Válido" />
                ) : (
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" aria-label="Inválido" />
                )}
                <div className="min-w-0">
                  <p className="break-all font-mono text-white">{result.digits || result.input}</p>
                  <p className="mt-1 text-sm text-slate-400">
                    {result.type && <span>{result.type}</span>}
                    {result.valid && result.prefixInfo && <span> · prefixo de {result.prefixInfo}</span>}
                    {result.error && <span className="text-rose-300">{result.type ? ' · ' : ''}{result.error}</span>}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {validEans.length > 0 && (
            <div className="mt-5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-4">
              <p className="text-sm text-slate-200">
                Precisa da foto desses produtos? Veja quais têm imagem no nosso banco. A consulta é grátis.
              </p>
              <Link href={searchHref} className="btn-primary mt-3 inline-block">
                Buscar fotos {validEans.length === 1 ? 'deste produto' : `destes ${validEans.length} produtos`}
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
