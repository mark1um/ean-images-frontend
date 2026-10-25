'use client';

import { CheckCircle, XCircle, BarChart3, ShoppingCart, ArrowLeft, Tag, Mail, MessageCircle, ChevronDown, Package } from 'lucide-react';
import { LARGE_BATCH_MIN_EANS, MIN_ORDER_TOTAL, SUPPORT_CONFIG, whatsappLink } from '@/lib/config';
import { trackEvent } from '@/lib/analytics';
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
  const minimumOrderTotal = MIN_ORDER_TOTAL;
  const displayTotal = hasImages ? Math.max(pricing.total, minimumOrderTotal) : pricing.total;
  const minimumOrderAdjustment = Math.max(0, displayTotal - pricing.total);
  const hasNotFoundEans = stats.totalNotFound > 0;
  const coveragePercent =
    stats.totalValid > 0 ? Math.round((stats.totalFound / stats.totalValid) * 100) : 0;
  const foundEans = result.foundEans ?? [];
  const notFoundEans = result.notFoundEans ?? [];

  // Quantas imagens cabem no valor mínimo (ex.: R$ 1,00 / R$ 0,20 = 5)
  const firstTierPrice = pricing.breakdown[0]?.kind !== 'package' ? pricing.breakdown[0]?.pricePerUnit ?? 0 : 0;
  const imagesInMinimum =
    firstTierPrice > 0 ? Math.floor(minimumOrderTotal / firstTierPrice + 1e-9) : 0;
  const extraImagesForFree = Math.max(0, imagesInMinimum - stats.totalFound);

  // Resumo simples: o pacote (e as imagens extras) ou uma linha só com as imagens
  const packageItem = pricing.breakdown.find((item) => item.kind === 'package');
  const extraItem = pricing.breakdown.find((item) => item.kind === 'extra');
  const summaryLines = packageItem
    ? [
        { label: `Pacote até ${formatNumber(pricing.package?.size ?? packageItem.quantity)} imagens`, value: packageItem.subtotal, isPackage: true },
        ...(extraItem && extraItem.quantity > 0
          ? [{ label: `${formatNumber(extraItem.quantity)} imagens extras`, value: extraItem.subtotal, isPackage: false }]
          : []),
      ]
    : [{ label: `${formatNumber(pricing.quantity)} imagens`, value: pricing.subtotal, isPackage: false }];

  const isLargeBatch = stats.totalValid >= LARGE_BATCH_MIN_EANS;
  const whatsappMessage = isLargeBatch
    ? `Olá! Consultei ${stats.totalValid} EANs no site da EAN Images: ${stats.totalFound} têm imagem e ${stats.totalNotFound} ficaram sem. Vocês conseguem um plano para esse lote?`
    : `Olá! Consultei EANs no site da EAN Images e ${stats.totalNotFound} ficaram sem imagem. Vocês conseguem essas imagens?`;

  // Lista limitada: links mailto muito longos não abrem em alguns clientes de e-mail
  const emailEanList = notFoundEans.slice(0, 100);
  const emailBody = [
    whatsappMessage,
    '',
    'EANs sem imagem:',
    ...emailEanList,
    ...(notFoundEans.length > emailEanList.length
      ? [`(+ ${notFoundEans.length - emailEanList.length} outros)`]
      : []),
  ].join('\n');

  function handleWhatsappClick() {
    trackEvent('whatsapp_click', {
      location: 'result',
      large_batch: isLargeBatch,
      total_valid: stats.totalValid,
      total_not_found: stats.totalNotFound,
    });
  }

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

      {/* EANs identificados */}
      <div className="card">
        <details open>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-green-600/20 p-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <h3 className="font-bold text-white">EANs encontrados</h3>
                <p className="text-sm text-slate-400">
                  {formatNumber(foundEans.length)} produto(s) com imagem disponível
                </p>
              </div>
            </div>
            <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition-transform [details[open]_&]:rotate-180" />
          </summary>

          {foundEans.length > 0 ? (
            <>
              <p className="mt-4 border-t border-slate-800 pt-4 text-xs text-slate-400">
                As imagens exibidas aqui são apenas previews. Após o pagamento, as imagens originais em alta qualidade serão enviadas por e-mail.
              </p>
              <div className="mt-3 max-h-80 space-y-2 overflow-y-auto">
                {foundEans.map((item) => (
                  <div
                    key={item.ean}
                    className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-2.5"
                  >
                    {item.previewUrl ? (
                      <img
                        src={item.previewUrl}
                        alt={`Imagem do produto ${item.ean}`}
                        className="h-16 w-16 shrink-0 rounded-lg bg-white object-contain p-1"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-center text-[10px] text-slate-500">
                        Sem preview
                      </div>
                    )}
                    <span className="min-w-0 break-all font-mono text-sm tracking-wide text-slate-200">
                      {item.ean}
                    </span>
                    <span className="ml-auto text-xs text-green-400">Encontrado</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="mt-4 border-t border-slate-800 pt-4 text-sm text-slate-400">
              Nenhum EAN encontrado nesta análise.
            </p>
          )}
        </details>

        {notFoundEans.length > 0 && (
          <details className="mt-5 border-t border-slate-800 pt-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm [&::-webkit-details-marker]:hidden">
              <span className="text-amber-300">EANs sem imagem ({formatNumber(notFoundEans.length)})</span>
              <ChevronDown className="h-4 w-4 text-slate-500 transition-transform [details[open]_&]:rotate-180" />
            </summary>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {notFoundEans.map((ean) => (
                <span key={ean} className="rounded-lg bg-slate-950/60 px-3 py-2 font-mono text-xs text-slate-400">
                  {ean}
                </span>
              ))}
            </div>
          </details>
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
            {summaryLines.map((line) => (
              <div key={line.label} className="flex justify-between gap-3 text-sm">
                <span className="text-slate-400 flex items-center gap-1.5">
                  {line.isPackage && <Package className="w-3.5 h-3.5 text-cyan-300" />}
                  {line.label}
                </span>
                <span className="text-white font-medium text-right">{formatCurrency(line.value)}</span>
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

            {minimumOrderAdjustment > 0 && (
              <div className="flex justify-between text-sm pt-2 border-t border-slate-800">
                <span className="text-slate-400">Ajuste para o pedido mínimo</span>
                <span className="text-slate-300 font-medium">
                  + {formatCurrency(minimumOrderAdjustment)}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center pt-3 border-t border-slate-700">
              <span className="text-white font-bold text-lg">Total</span>
              <span className="text-2xl font-bold text-green-400">
                {formatCurrency(displayTotal)}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-500 mt-3">
            Você receberá {formatNumber(stats.totalFound)} imagens em um arquivo ZIP por e-mail.
          </p>

          {minimumOrderAdjustment > 0 && (
            <div className="mt-4 rounded-xl border border-cyan-800/40 bg-cyan-950/20 p-3 text-xs text-cyan-200">
              O pedido mínimo é {formatCurrency(minimumOrderTotal)} (custo do PIX).
              {extraImagesForFree > 0 && (
                <>
                  {' '}Por esse mesmo valor você leva até <strong>{formatNumber(imagesInMinimum)} imagens</strong>:
                  faça uma nova consulta incluindo mais {formatNumber(extraImagesForFree)} EAN(s) sem pagar nada a mais.
                </>
              )}
            </div>
          )}
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

      {hasNotFoundEans && (
        <div
          className={
            isLargeBatch
              ? 'card border-emerald-700/50 bg-emerald-950/20'
              : 'card border-amber-900/30 bg-amber-950/10'
          }
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={isLargeBatch ? 'p-2 bg-emerald-600/20 rounded-xl' : 'p-2 bg-amber-600/20 rounded-xl'}>
              <MessageCircle className={isLargeBatch ? 'w-5 h-5 text-emerald-400' : 'w-5 h-5 text-amber-400'} />
            </div>
            <h3 className="text-lg font-bold text-white">
              {isLargeBatch
                ? `Lote grande? Buscamos as ${formatNumber(stats.totalNotFound)} imagens que faltam`
                : 'Não encontrou o que precisa?'}
            </h3>
          </div>

          <p className="text-sm text-slate-400 mb-4">
            {isLargeBatch
              ? 'Para lotes com mais de 100 EANs montamos um plano personalizado: buscamos as imagens que faltam e fazemos um preço para o lote inteiro. Fale com a gente, a mensagem já vai pronta.'
              : 'Mande uma mensagem no WhatsApp ou por e-mail que tentamos conseguir essas imagens para você.'}
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={whatsappLink(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsappClick}
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Falar no WhatsApp
            </a>
            <a
              href={`mailto:${SUPPORT_CONFIG.email}?subject=${encodeURIComponent('EANs sem imagem')}&body=${encodeURIComponent(emailBody)}`}
              onClick={() => trackEvent('email_click', { location: 'result', large_batch: isLargeBatch })}
              className="btn-secondary inline-flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Enviar por e-mail
            </a>
          </div>
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
