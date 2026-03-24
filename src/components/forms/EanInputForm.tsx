'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, ChevronRight, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EanInputFormProps {
  onSubmit: (data: { text?: string; file?: File; couponCode?: string }) => void;
  isLoading: boolean;
}

export function EanInputForm({ onSubmit, isLoading }: EanInputFormProps) {
  const [inputMode, setInputMode] = useState<'text' | 'file'>('text');
  const [eanText, setEanText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [showCoupon, setShowCoupon] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      setSelectedFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
    disabled: isLoading,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (inputMode === 'file' && selectedFile) {
      onSubmit({ file: selectedFile, couponCode: couponCode || undefined });
    } else if (inputMode === 'text' && eanText.trim()) {
      onSubmit({ text: eanText.trim(), couponCode: couponCode || undefined });
    }
  }

  const isValid =
    (inputMode === 'text' && eanText.trim().length > 0) ||
    (inputMode === 'file' && selectedFile !== null);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="card glow-blue">
        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-slate-800/50 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => setInputMode('text')}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all',
              inputMode === 'text'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            <FileText className="w-4 h-4" />
            Colar EANs
          </button>
          <button
            type="button"
            onClick={() => setInputMode('file')}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all',
              inputMode === 'file'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            <Upload className="w-4 h-4" />
            Upload de arquivo
          </button>
        </div>

        {/* Modo texto */}
        {inputMode === 'text' && (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-300">
              Cole seus EANs abaixo
              <span className="text-slate-500 font-normal ml-2">
                (separados por vírgula, ponto-e-vírgula ou nova linha)
              </span>
            </label>
            <textarea
              value={eanText}
              onChange={(e) => setEanText(e.target.value)}
              placeholder={'7891234567890\n7891234567891\n7891234567892'}
              rows={8}
              disabled={isLoading}
              className="input-field resize-none font-mono text-sm"
            />
            <p className="text-xs text-slate-500">
              Suporta EAN-8, EAN-12, EAN-13 e EAN-14. Duplicados são removidos automaticamente.
            </p>
          </div>
        )}

        {/* Modo arquivo */}
        {inputMode === 'file' && (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-300">
              Faça upload do seu arquivo
            </label>

            {!selectedFile ? (
              <div
                {...getRootProps()}
                className={cn(
                  'border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-200',
                  isDragActive
                    ? 'border-blue-500 bg-blue-950/30'
                    : 'border-slate-700 hover:border-slate-500 hover:bg-slate-800/30'
                )}
              >
                <input {...getInputProps()} />
                <Upload className="w-10 h-10 text-slate-500 mx-auto mb-3" />
                <p className="text-slate-300 font-medium">
                  {isDragActive ? 'Solte o arquivo aqui' : 'Arraste ou clique para selecionar'}
                </p>
                <p className="text-slate-500 text-sm mt-1">
                  .txt, .csv ou .xlsx — máximo 5MB e 10.000 EANs
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
                <FileText className="w-8 h-8 text-blue-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-slate-200 font-medium truncate">{selectedFile.name}</p>
                  <p className="text-slate-500 text-sm">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedFile(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Cupom de desconto 
        <div className="mt-4">
          {!showCoupon ? (
            <button
              type="button"
              onClick={() => setShowCoupon(true)}
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-400 transition-colors"
            >
              <Tag className="w-3.5 h-3.5" />
              Tenho um cupom de desconto
            </button>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="CÓDIGO DO CUPOM"
                className="input-field flex-1 text-sm uppercase tracking-widest"
                maxLength={50}
              />
              <button
                type="button"
                onClick={() => { setShowCoupon(false); setCouponCode(''); }}
                className="p-3 text-slate-400 hover:text-slate-200 hover:bg-slate-700 rounded-xl transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        */}
      </div>

      {/* CTA Button */}
      <button
        type="submit"
        disabled={!isValid || isLoading}
        className="btn-primary w-full py-4 text-lg"
      >
        {isLoading ? (
          <>
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Analisando...
          </>
        ) : (
          <>
            Verificar disponibilidade
            <ChevronRight className="w-5 h-5" />
          </>
        )}
      </button>
    </form>
  );
}
