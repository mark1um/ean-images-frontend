import { Search } from 'lucide-react';

export function AnalyzingLoader() {
  return (
    <div className="card text-center py-16">
      <div className="relative inline-flex mb-6">
        <div className="w-16 h-16 rounded-full border-4 border-blue-900 border-t-blue-500 animate-spin" />
        <Search className="absolute inset-0 m-auto w-6 h-6 text-blue-400" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">Analisando seus EANs</h3>
      <p className="text-slate-400 text-sm max-w-xs mx-auto">
        Verificando disponibilidade no banco de imagens e calculando o preço...
      </p>

      <div className="mt-8 space-y-2 max-w-xs mx-auto">
        {['Normalizando EANs...', 'Verificando banco de imagens...', 'Calculando preço...'].map(
          (step, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-xs text-slate-500"
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse-slow" />
              {step}
            </div>
          )
        )}
      </div>
    </div>
  );
}
