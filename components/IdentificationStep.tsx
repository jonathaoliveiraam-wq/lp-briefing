"use client";

import { useState } from "react";

interface Props {
  data: { name: string; project: string; contact: string };
  onChange: (d: { name: string; project: string; contact: string }) => void;
  onNext: () => void;
}

export default function IdentificationStep({ data, onChange, onNext }: Props) {
  const [touched, setTouched] = useState(false);

  const canNext = data.name.trim().length > 0 && data.project.trim().length > 0;

  const handleNext = () => {
    setTouched(true);
    if (canNext) onNext();
  };

  return (
    <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-6 mt-2">
      <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-1">
        Identificação
      </p>
      <h2 className="text-xl font-bold text-white mb-1">Antes de começar</h2>
      <p className="text-[#666] text-sm mb-6">
        Essas informações aparecem no email de briefing.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#aaa] mb-1.5">
            Seu nome <span className="text-violet-400">*</span>
          </label>
          <input
            type="text"
            placeholder="Ex: Maria Silva"
            value={data.name}
            onChange={(e) => onChange({ ...data, name: e.target.value })}
            className={`w-full bg-[#0f0f0f] border rounded-xl px-4 py-3 text-[#f2f2f2] placeholder-[#444] outline-none focus:border-violet-500 transition-colors ${
              touched && !data.name.trim() ? "border-red-500/60" : "border-[#2a2a2a]"
            }`}
          />
          {touched && !data.name.trim() && (
            <p className="text-red-400 text-xs mt-1">Campo obrigatório</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#aaa] mb-1.5">
            Nome do cliente / projeto / LP <span className="text-violet-400">*</span>
          </label>
          <input
            type="text"
            placeholder="Ex: Landing page João Mendes — Consultoria"
            value={data.project}
            onChange={(e) => onChange({ ...data, project: e.target.value })}
            className={`w-full bg-[#0f0f0f] border rounded-xl px-4 py-3 text-[#f2f2f2] placeholder-[#444] outline-none focus:border-violet-500 transition-colors ${
              touched && !data.project.trim() ? "border-red-500/60" : "border-[#2a2a2a]"
            }`}
          />
          {touched && !data.project.trim() && (
            <p className="text-red-400 text-xs mt-1">Campo obrigatório</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#aaa] mb-1.5">
            Seu email ou contato{" "}
            <span className="text-[#555] font-normal">(opcional)</span>
          </label>
          <input
            type="text"
            placeholder="Ex: maria@email.com ou @mariasilva"
            value={data.contact}
            onChange={(e) => onChange({ ...data, contact: e.target.value })}
            className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-4 py-3 text-[#f2f2f2] placeholder-[#444] outline-none focus:border-violet-500 transition-colors"
          />
        </div>
      </div>

      <button
        onClick={handleNext}
        className="mt-6 w-full bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white font-semibold py-4 rounded-xl transition-colors"
      >
        Começar
      </button>
    </div>
  );
}
