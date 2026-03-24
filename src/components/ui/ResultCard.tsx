'use client';

import { CheckCircle, XCircle, BarChart3, ShoppingCart, ArrowLeft, Tag } from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/utils';
import type { AnalyzeResponse } from '@/types';

interface ResultCardProps {
  result: AnalyzeResponse;
  onContinue: () => void;
  onReset: () => void;
}

export function ResultCard({ result, onContinue, onReset }: ResultCardProps) {
  const { stats, pricing } = result;
  const hasImages = stats.totalFound > 0;
  const coveragePercent =
    stats.totalValid > 0 ? Math.round((stats.totalFound / stats.totalValid) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* Header de resultado */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-600/20 rounded-xl">
            <BarChart3 className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Resultado da análise</h2>
            <p className="text-slate-400 text-sm">
              Verificamos {formatNumber(stats.totalValid)} EANs válidos no banco de imagens
            </p>
          </div>
        </div>

        {/* Grid de estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="stat-card bg-slate-800/50 border-slate-700">
            <p className="text-2xl font-bold text-white">{formatNumber(stats.totalSubmitted)}</p>
            <p className="text-xs text-slate-400 mt-1">Enviados</p>
          </div>
          <div className="stat-card bg-slate-800/50 border-slate-700">
            <p className="text-2xl font-bold text-slate-300">{formatNumber(stats.totalValid)}</p>
            <p className="text-xs text-slate-400 mt-1">Válidos</p>
          </div>
          <div className="stat-card bg-green-950/30 border-green-800/40">
            <p className="text-2xl font-bold text-green-400">{formatNumber(stats.totalFound)}</p>
            <p className="text-xs text-green-600 mt-1">Encontrados</p>
          </div>
          <div className="stat-card bg-red-950/20 border-red-900/30">
            <p className="text-2xl font-bold text-red-400">{formatNumber(stats.totalNotFound)}</p>
            <p className="text-xs text-red-600 mt-1">Não encontrados</p>
          </div>
        </div>

        {/* Barra de cobertura */}
        {stats.totalValid > 0 && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-slate-400 mb-1.5">
              <span>Cobertura do banco</span>
              <span className="font-medium text-slate-300">{coveragePercent}%</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full transition-all duration-700"
                style={{ width: `${coveragePercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Avisos de limpeza */}
        {(stats.duplicatesRemoved > 0 || stats.invalidRemoved > 0) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {stats.duplicatesRemoved > 0 && (
              <span className="text-xs px-2.5 py-1 bg-yellow-950/40 border border-yellow-800/40 text-yellow-400 rounded-full">
                {stats.duplicatesRemoved} duplicado(s) removido(s)
              </span>
            )}
            {stats.invalidRemoved > 0 && (
              <span className="text-xs px-2.5 py-1 bg-red-950/40 border border-red-800/40 text-red-400 rounded-full">
                {stats.invalidRemoved} EAN(s) inválido(s) ignorado(s)
              </span>
            )}
          </div>
        )}
      </div>

      {/* Precificação */}
      {hasImages && (
        <div className="card border-blue-900/50 bg-blue-950/10">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-green-600/20 rounded-xl">
              <ShoppingCart className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Resumo do pedido</h3>
          </div>

          <div className="space-y-3">
            {pricing.breakdown.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-slate-400">{item.label}</span>
                <span className="text-slate-300">
                  {formatNumber(item.quantity)} × {formatCurrency(item.pricePerUnit)} ={' '}
                  <span className="text-white font-medium">{formatCurrency(item.subtotal)}</span>
                </span>
              </div>
            ))}

            {pricing.discount > 0 && (
              <div className="flex justify-between text-sm pt-2 border-t border-slate-800">
                <span className="text-green-400 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  Desconto ({pricing.couponApplied})
                </span>
                <span className="text-green-400 font-medium">
                  − {formatCurrency(pricing.discount)}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center pt-3 border-t border-slate-700">
              <span className="text-white font-bold text-lg">Total</span>
              <span className="text-2xl font-bold text-green-400">
                {formatCurrency(pricing.total)}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-500 mt-3">
            Você receberá {formatNumber(stats.totalFound)} imagens em um arquivo ZIP por e-mail.
          </p>
        </div>
      )}

      {/* Estado: nenhuma imagem encontrada */}
      {!hasImages && (
        <div className="card border-red-900/30 bg-red-950/10 text-center py-8">
          <XCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">Nenhuma imagem encontrada</h3>
          <p className="text-slate-400 text-sm max-w-sm mx-auto">
            Nenhum dos EANs informados possui imagem disponível no banco.
            Verifique os códigos e tente novamente.
          </p>
        </div>
      )}

      {/* Ações */}
      <div className="flex gap-3">
        <button onClick={onReset} className="btn-secondary flex-1">
          <ArrowLeft className="w-4 h-4" />
          Nova consulta
        </button>

        {hasImages && (
          <button onClick={onContinue} className="btn-primary flex-2 flex-1">
            <ShoppingCart className="w-4 h-4" />
            Comprar {formatNumber(stats.totalFound)} imagens
          </button>
        )}
      </div>
    </div>
  );
}
