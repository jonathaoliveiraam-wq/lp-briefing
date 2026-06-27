"use client";

import { useState } from "react";

const PROOF_OPTIONS = [
  { id: "depoimentos", label: "Depoimentos de clientes (prints, áudios, vídeos)" },
  { id: "numeros", label: "Números e resultados mensuráveis (ROI, faturamento, crescimento)" },
  { id: "cases", label: "Cases e histórias de transformação" },
  { id: "credenciais", label: "Credenciais, certificações ou prêmios" },
  { id: "parcerias", label: "Parcerias, menções na mídia ou reconhecimentos" },
];

interface Props {
  value: string[];
  otherValue: string;
  details: Record<string, string>;
  onChange: (value: string[], otherValue: string, details: Record<string, string>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ProofStep({ value, otherValue, details, onChange, onNext, onBack }: Props) {
  const [touched, setTouched] = useState(false);
  const MAX = 3;

  const canNext = value.length > 0 && (!value.includes("OUTRO") || otherValue.trim().length > 0);

  const toggle = (id: string) => {
    if (value.includes(id)) {
      const newVal = value.filter((v) => v !== id);
      const newDetails = { ...details };
      delete newDetails[id];
      onChange(newVal, id === "OUTRO" ? "" : otherValue, newDetails);
    } else {
      if (value.length >= MAX) return;
      onChange([...value, id], otherValue, details);
    }
  };

  const setDetail = (id: string, text: string) => {
    onChange(value, otherValue, { ...details, [id]: text });
  };

  const handleNext = () => {
    setTouched(true);
    if (canNext) onNext();
  };

  const allOptions = [...PROOF_OPTIONS, { id: "OUTRO", label: "Outro" }];

  return (
    <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-6 mt-2">
      <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">
        BLOCO 4 — Prova
      </p>
      <h2 className="text-lg font-bold text-white leading-snug mb-1">
        Quais provas devem ter mais destaque na LP?
      </h2>
      <p className="text-[#555] text-xs mb-4">
        Selecione até {MAX}. Cada item selecionado abre um campo de detalhe opcional.
      </p>

      <div className="space-y-2">
        {allOptions.map(({ id, label }) => {
          const selected = value.includes(id);
          const atMax = value.length >= MAX && !selected;
          return (
            <div key={id}>
              <button
                onClick={() => toggle(id)}
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
                  <span className="text-sm font-medium">{label}</span>
                </span>
              </button>

              {selected && id === "OUTRO" && (
                <input
                  type="text"
                  autoFocus
                  placeholder="Qual outro tipo de prova?"
                  value={otherValue}
                  onChange={(e) => onChange(value, e.target.value, details)}
                  className="mt-1.5 w-full bg-[#0f0f0f] border border-violet-500/40 rounded-xl px-4 py-2.5 text-[#f2f2f2] placeholder-[#444] outline-none focus:border-violet-500 transition-colors text-sm"
                />
              )}

              {selected && (
                <input
                  type="text"
                  placeholder={`Detalhe sobre "${id === "OUTRO" ? (otherValue || "este item") : label.split("(")[0].trim()}" (opcional)`}
                  value={details[id] ?? ""}
                  onChange={(e) => setDetail(id, e.target.value)}
                  className="mt-1.5 w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-[#f2f2f2] placeholder-[#444] outline-none focus:border-violet-500/60 transition-colors text-xs"
                />
              )}
            </div>
          );
        })}
      </div>

      {touched && !canNext && (
        <p className="text-red-400 text-xs mt-3">
          {value.includes("OUTRO") && !otherValue.trim()
            ? 'Descreva o item "Outro" para continuar'
            : "Selecione ao menos uma prova"}
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
