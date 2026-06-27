"use client";

import { useState } from "react";

interface Props {
  block: string;
  question: string;
  options: string[];
  value: string[];
  otherValue: string;
  onChange: (value: string[], otherValue: string) => void;
  onNext: () => void;
  onBack: () => void;
  maxSelect?: number;
  hint?: string;
}

export default function MultiSelectStep({
  block,
  question,
  options,
  value,
  otherValue,
  onChange,
  onNext,
  onBack,
  maxSelect,
  hint,
}: Props) {
  const [touched, setTouched] = useState(false);

  const canNext = value.length > 0 && (!value.includes("OUTRO") || otherValue.trim().length > 0);

  const toggle = (opt: string) => {
    if (value.includes(opt)) {
      onChange(
        value.filter((v) => v !== opt),
        opt === "OUTRO" ? "" : otherValue
      );
    } else {
      if (maxSelect && value.length >= maxSelect) return;
      onChange([...value, opt], otherValue);
    }
  };

  const handleNext = () => {
    setTouched(true);
    if (canNext) onNext();
  };

  return (
    <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-6 mt-2">
      <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">
        {block}
      </p>
      <h2 className="text-lg font-bold text-white leading-snug mb-1">{question}</h2>
      {hint && <p className="text-[#555] text-xs mb-4">{hint}</p>}
      {!hint && <div className="mb-4" />}

      <div className="space-y-2">
        {options.map((opt) => {
          const selected = value.includes(opt);
          const atMax = !!maxSelect && value.length >= maxSelect && !selected;
          return (
            <button
              key={opt}
              onClick={() => toggle(opt)}
              disabled={atMax}
              className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all ${
                selected
                  ? "border-violet-500 bg-violet-600/10 text-white"
                  : atMax
                  ? "border-[#1a1a1a] bg-[#0c0c0c] text-[#444] cursor-not-allowed"
                  : "border-[#222] bg-[#0f0f0f] text-[#ccc] hover:border-[#3a3a3a] hover:bg-[#1a1a1a]"
              }`}
            >
              <span className="flex items-center gap-3">
                <span
                  className={`w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                    selected ? "border-violet-500 bg-violet-600" : "border-[#444]"
                  }`}
                >
                  {selected && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                <span className="text-sm font-medium">{opt}</span>
              </span>
            </button>
          );
        })}

        {/* Outro option */}
        <button
          onClick={() => toggle("OUTRO")}
          disabled={!!maxSelect && value.length >= maxSelect && !value.includes("OUTRO")}
          className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all ${
            value.includes("OUTRO")
              ? "border-violet-500 bg-violet-600/10 text-white"
              : maxSelect && value.length >= maxSelect && !value.includes("OUTRO")
              ? "border-[#1a1a1a] bg-[#0c0c0c] text-[#444] cursor-not-allowed"
              : "border-[#222] bg-[#0f0f0f] text-[#ccc] hover:border-[#3a3a3a] hover:bg-[#1a1a1a]"
          }`}
        >
          <span className="flex items-center gap-3">
            <span
              className={`w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                value.includes("OUTRO") ? "border-violet-500 bg-violet-600" : "border-[#444]"
              }`}
            >
              {value.includes("OUTRO") && (
                <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </span>
            <span className="text-sm font-medium">Outro</span>
          </span>
        </button>

        {value.includes("OUTRO") && (
          <input
            type="text"
            autoFocus
            placeholder="Descreva..."
            value={otherValue}
            onChange={(e) => onChange(value, e.target.value)}
            className="w-full bg-[#0f0f0f] border border-violet-500/40 rounded-xl px-4 py-3 text-[#f2f2f2] placeholder-[#444] outline-none focus:border-violet-500 transition-colors text-sm"
          />
        )}
      </div>

      {touched && !canNext && (
        <p className="text-red-400 text-xs mt-3">
          {value.includes("OUTRO") && !otherValue.trim()
            ? 'Descreva o item "Outro" para continuar'
            : "Selecione ao menos uma opção"}
        </p>
      )}

      <div className="flex items-center gap-3 mt-6">
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
