"use client";

import { useState } from "react";

interface Props {
  data: { name: string; business: string; social: string };
  onChange: (d: { name: string; business: string; social: string }) => void;
  onNext: () => void;
}

export default function IdentificationClientStep({ data, onChange, onNext }: Props) {
  const [touched, setTouched] = useState(false);

  const canNext = data.name.trim().length > 0 && data.business.trim().length > 0;

  const handleNext = () => {
    setTouched(true);
    if (canNext) onNext();
  };

  return (
    <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-6 mt-2">
      <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-1">
        Identificação
      </p>
      <h2 className="text-xl font-bold text-white mb-1">Vamos começar</h2>
      <p className="text-[#666] text-sm mb-6">
        Leva menos de 10 minutos. Suas respostas guiam a criação da sua landing page.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#aaa] mb-1.5">
            Seu nome <span className="text-emerald-400">*</span>
          </label>
          <input
            type="text"
            placeholder="Ex: Jessy Carvalho"
            value={data.name}
            onChange={(e) => onChange({ ...data, name: e.target.value })}
            className={`w-full bg-[#0f0f0f] border rounded-xl px-4 py-3 text-[#f2f2f2] placeholder-[#444] outline-none focus:border-emerald-500 transition-colors ${
              touched && !data.name.trim() ? "border-red-500/60" : "border-[#2a2a2a]"
            }`}
          />
          {touched && !data.name.trim() && (
            <p className="text-red-400 text-xs mt-1">Campo obrigatório</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#aaa] mb-1.5">
            Nome do seu negócio / projeto <span className="text-emerald-400">*</span>
          </label>
          <input
            type="text"
            placeholder="Ex: Jessy Carvalho Nutrição ou @jessycarvalho"
            value={data.business}
            onChange={(e) => onChange({ ...data, business: e.target.value })}
            className={`w-full bg-[#0f0f0f] border rounded-xl px-4 py-3 text-[#f2f2f2] placeholder-[#444] outline-none focus:border-emerald-500 transition-colors ${
              touched && !data.business.trim() ? "border-red-500/60" : "border-[#2a2a2a]"
            }`}
          />
          {touched && !data.business.trim() && (
            <p className="text-red-400 text-xs mt-1">Campo obrigatório</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#aaa] mb-1.5">
            Site, Instagram ou outro link{" "}
            <span className="text-[#555] font-normal">(opcional)</span>
          </label>
          <input
            type="text"
            placeholder="Ex: instagram.com/jessycarvalho ou seusite.com.br"
            value={data.social}
            onChange={(e) => onChange({ ...data, social: e.target.value })}
            className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-4 py-3 text-[#f2f2f2] placeholder-[#444] outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
      </div>

      <button
        onClick={handleNext}
        className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold py-4 rounded-xl transition-colors"
      >
        Começar
      </button>
    </div>
  );
}
