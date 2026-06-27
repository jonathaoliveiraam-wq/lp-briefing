"use client";

import { useState } from "react";

interface Props {
  block: string;
  question: string;
  options: string[];
  value: string;
  otherValue: string;
  onChange: (value: string, otherValue: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function SingleSelectStep({
  block,
  question,
  options,
  value,
  otherValue,
  onChange,
  onNext,
  onBack,
}: Props) {
  const [touched, setTouched] = useState(false);

  const canNext =
    value !== "" && (value !== "OUTRO" || otherValue.trim().length > 0);

  const handleSelect = (opt: string) => {
    onChange(opt, opt === "OUTRO" ? otherValue : "");
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
      <h2 className="text-lg font-bold text-white leading-snug mb-5">{question}</h2>

      <div className="space-y-2">
        {options.map((opt) => {
          const selected = value === opt;
          return (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all ${
                selected
                  ? "border-violet-500 bg-violet-600/10 text-white"
                  : "border-[#222] bg-[#0f0f0f] text-[#ccc] hover:border-[#3a3a3a] hover:bg-[#1a1a1a]"
              }`}
            >
              <span className="flex items-center gap-3">
                <span
                  className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                    selected ? "border-violet-500" : "border-[#444]"
                  }`}
                >
                  {selected && (
                    <span className="w-2 h-2 rounded-full bg-violet-500 block" />
                  )}
                </span>
                <span className="text-sm font-medium">{opt}</span>
              </span>
            </button>
          );
        })}

        {/* Outro option */}
        <button
          onClick={() => handleSelect("OUTRO")}
          className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all ${
            value === "OUTRO"
              ? "border-violet-500 bg-violet-600/10 text-white"
              : "border-[#222] bg-[#0f0f0f] text-[#ccc] hover:border-[#3a3a3a] hover:bg-[#1a1a1a]"
          }`}
        >
          <span className="flex items-center gap-3">
            <span
              className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                value === "OUTRO" ? "border-violet-500" : "border-[#444]"
              }`}
            >
              {value === "OUTRO" && (
                <span className="w-2 h-2 rounded-full bg-violet-500 block" />
              )}
            </span>
            <span className="text-sm font-medium">Outro</span>
          </span>
        </button>

        {value === "OUTRO" && (
          <input
            type="text"
            autoFocus
            placeholder="Descreva..."
            value={otherValue}
            onChange={(e) => onChange("OUTRO", e.target.value)}
            className="w-full bg-[#0f0f0f] border border-violet-500/40 rounded-xl px-4 py-3 text-[#f2f2f2] placeholder-[#444] outline-none focus:border-violet-500 transition-colors text-sm"
          />
        )}
      </div>

      {touched && !canNext && (
        <p className="text-red-400 text-xs mt-3">Selecione uma opção para continuar</p>
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
