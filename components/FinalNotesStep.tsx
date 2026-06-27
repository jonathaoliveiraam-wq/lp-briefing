"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
  error: string;
}

export default function FinalNotesStep({
  value,
  onChange,
  onSubmit,
  onBack,
  isSubmitting,
  error,
}: Props) {
  return (
    <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-6 mt-2">
      <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">
        BLOCO 7 — Observações finais
      </p>
      <h2 className="text-lg font-bold text-white leading-snug mb-1">
        Algo mais que os agentes de copy precisam saber?
      </h2>
      <p className="text-[#555] text-xs mb-5">Opcional. Contexto extra, restrições, referências, etc.</p>

      <textarea
        rows={5}
        placeholder="Ex: evitar mencionar o concorrente X, incluir caso do cliente Y, tom mais leve para o público Z..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-4 py-3 text-[#f2f2f2] placeholder-[#444] outline-none focus:border-violet-500 transition-colors text-sm resize-none leading-relaxed"
      />

      {error && (
        <p className="text-red-400 text-sm mt-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5">
          {error}
        </p>
      )}

      <div className="flex items-center gap-3 mt-5">
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="text-[#666] hover:text-[#aaa] text-sm flex items-center gap-1 transition-colors py-2 disabled:opacity-40"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Voltar
        </button>
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="flex-1 bg-violet-600 hover:bg-violet-700 active:bg-violet-800 disabled:opacity-60 text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Enviando...
            </>
          ) : (
            "Finalizar e enviar"
          )}
        </button>
      </div>
    </div>
  );
}
