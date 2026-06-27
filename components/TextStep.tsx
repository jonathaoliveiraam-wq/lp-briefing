"use client";

import { useState } from "react";

interface Props {
  block: string;
  question: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
  optional?: boolean;
}

export default function TextStep({
  block,
  question,
  placeholder,
  value,
  onChange,
  onNext,
  onBack,
  optional = false,
}: Props) {
  const [touched, setTouched] = useState(false);

  const canNext = optional || value.trim().length > 0;

  const handleNext = () => {
    setTouched(true);
    if (canNext) onNext();
  };

  return (
    <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-6 mt-2">
      <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">
        {block}
      </p>
      <h2 className="text-lg font-bold text-white leading-snug mb-5">{question}</h2>

      <textarea
        autoFocus
        rows={4}
        placeholder={placeholder ?? "Escreva aqui..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-[#0f0f0f] border rounded-xl px-4 py-3 text-[#f2f2f2] placeholder-[#444] outline-none focus:border-violet-500 transition-colors text-sm resize-none leading-relaxed ${
          touched && !canNext ? "border-red-500/60" : "border-[#2a2a2a]"
        }`}
      />
      {touched && !canNext && (
        <p className="text-red-400 text-xs mt-1">Campo obrigatório</p>
      )}

      <div className="flex items-center gap-3 mt-5">
        <button
          onClick={onBack}
          className="text-[#666] hover:text-[#aaa] text-sm flex items-center gap-1 transition-colors py-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Voltar
        </button>
        <button
          onClick={handleNext}
          className="flex-1 bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white font-semibold py-4 rounded-xl transition-colors"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
