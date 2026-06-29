"use client";

import { useState } from "react";
import type { ClientFormData } from "@/app/cliente/page";

interface Props {
  responderName: string;
  data: ClientFormData;
}

function fmtMulti(values: string[], otherValue?: string): string {
  if (!values.length) return "Não respondido";
  return values
    .map((v) => (v === "OUTRO" ? `${otherValue || "Outro (não especificado)"}` : v))
    .join(" • ");
}

function fmtSingle(value: string, otherValue?: string): string {
  if (!value) return "Não respondido";
  if (value === "OUTRO") return otherValue || "Outro (não especificado)";
  return value;
}

export default function ClientSuccessScreen({ responderName, data }: Props) {
  const [copied, setCopied] = useState(false);

  const plainText = `ONBOARDING DE CLIENTE — ${data.businessName}
Respondido por: ${data.responderName}
Site/Redes: ${data.socialMedia || "—"}
Data: ${new Date().toLocaleDateString("pt-BR")}

━━━ CAMADA 1 — A OFERTA ━━━

O que você faz ou vende?
${data.q1 || "—"}

Oferta principal e investimento:
${data.q2 || "—"}

Resultado / transformação entregue:
${data.q3 || "—"}

━━━ CAMADA 2 — O CLIENTE IDEAL ━━━

Quem é seu cliente ideal?
${data.q4 || "—"}

Maior dor antes de te encontrar:
${data.q5 || "—"}

Vida/negócio depois de trabalhar com você:
${data.q6 || "—"}

━━━ CAMADA 3 — DIFERENCIAL E PROVA ━━━

Por que você e não a concorrência?
${data.q7 || "—"}

Resultado concreto (case, número, antes/depois):
${data.q8 || "—"}

Tipo de prova disponível:
${fmtMulti(data.q9, data.q9Other)}

━━━ CAMADA 4 — PERSONALIDADE E TOM ━━━

3 palavras que descrevem você/sua marca:
${data.q10 || "—"}

Tom da LP:
${fmtSingle(data.q11, data.q11Other)}

O que NÃO quer que a LP pareça:
${fmtMulti(data.q12, data.q12Other)}

━━━ CAMADA 5 — IDENTIDADE VISUAL ━━━

Identidade visual disponível:
${fmtMulti(data.q13)}

Referências visuais:
${data.q14 || "—"}

Cores que gosta / quer evitar:
${data.q15 || "—"}

━━━ CAMADA 6 — MATERIAIS E LP ━━━

Materiais disponíveis:
${fmtMulti(data.q16, data.q16Other)}

Ação que a LP deve gerar:
${fmtSingle(data.q17, data.q17Other)}

━━━ OBSERVAÇÕES FINAIS ━━━

${data.additionalNotes || "Nenhuma observação adicional."}
`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(plainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => window.print();

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: #fff !important; color: #111 !important; font-family: Arial, sans-serif; }
          .print-doc { background: #fff !important; color: #111 !important; max-width: 100% !important; padding: 0 !important; border: none !important; box-shadow: none !important; }
          .print-doc h1 { color: #111 !important; font-size: 18px !important; margin-bottom: 4px !important; }
          .print-doc .meta { color: #555 !important; font-size: 12px !important; margin-bottom: 20px !important; }
          .print-doc .camada-title { color: #111 !important; font-size: 11px !important; font-weight: bold !important; text-transform: uppercase !important; letter-spacing: 1px !important; border-bottom: 1px solid #ccc !important; padding-bottom: 4px !important; margin: 16px 0 10px !important; }
          .print-doc .qa-label { color: #555 !important; font-size: 10px !important; font-weight: 600 !important; margin: 8px 0 2px !important; }
          .print-doc .qa-value { color: #111 !important; font-size: 12px !important; line-height: 1.5 !important; }
        }
      `}</style>

      <main className="min-h-screen bg-[#0a0a0a] py-10 px-4">
        <div className="w-full max-w-xl mx-auto">

          {/* Success header — oculto na impressão */}
          <div className="no-print text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-emerald-600/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">
              {responderName ? `Perfeito, ${responderName.split(" ")[0]}!` : "Enviado!"}
            </h2>
            <p className="text-[#666] text-sm">
              Gere o PDF abaixo e encaminhe para quem vai criar sua LP.
            </p>
          </div>

          {/* Botões — ocultos na impressão */}
          <div className="no-print flex gap-3 mb-6">
            <button
              onClick={handlePrint}
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-xl transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Gerar PDF
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 px-5 border border-[#2a2a2a] hover:border-[#444] text-[#aaa] hover:text-white rounded-xl transition-colors text-sm font-medium"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Copiado!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copiar texto
                </>
              )}
            </button>
          </div>

          <p className="no-print text-[#444] text-xs text-center mb-6">
            No menu de impressão, selecione <strong className="text-[#666]">Salvar como PDF</strong>
          </p>

          {/* Documento — visível na tela e na impressão */}
          <div className="print-doc bg-[#141414] border border-[#1e1e1e] rounded-2xl p-6">
            <h1 className="text-xl font-bold text-white mb-0.5">
              Onboarding — {data.businessName}
            </h1>
            <p className="meta text-[#555] text-xs mb-6">
              Respondido por {data.responderName}{data.socialMedia ? ` · ${data.socialMedia}` : ""} · {new Date().toLocaleDateString("pt-BR")}
            </p>

            {/* Camada 1 */}
            <p className="camada-title text-[10px] font-bold uppercase tracking-widest text-emerald-500 border-b border-[#222] pb-1 mb-3">
              Camada 1 — A Oferta
            </p>
            <QA label="O que você faz ou vende?" value={data.q1} />
            <QA label="Oferta principal e investimento" value={data.q2} />
            <QA label="Resultado / transformação entregue" value={data.q3} />

            {/* Camada 2 */}
            <p className="camada-title text-[10px] font-bold uppercase tracking-widest text-emerald-500 border-b border-[#222] pb-1 mb-3 mt-5">
              Camada 2 — O Cliente Ideal
            </p>
            <QA label="Quem é seu cliente ideal?" value={data.q4} />
            <QA label="Maior dor antes de te encontrar" value={data.q5} />
            <QA label="Vida/negócio depois de trabalhar com você" value={data.q6} />

            {/* Camada 3 */}
            <p className="camada-title text-[10px] font-bold uppercase tracking-widest text-emerald-500 border-b border-[#222] pb-1 mb-3 mt-5">
              Camada 3 — Diferencial e Prova
            </p>
            <QA label="Por que você e não a concorrência?" value={data.q7} />
            <QA label="Resultado concreto (case, número, antes/depois)" value={data.q8} />
            <QA label="Tipo de prova disponível" value={fmtMulti(data.q9, data.q9Other)} />

            {/* Camada 4 */}
            <p className="camada-title text-[10px] font-bold uppercase tracking-widest text-emerald-500 border-b border-[#222] pb-1 mb-3 mt-5">
              Camada 4 — Personalidade e Tom
            </p>
            <QA label="3 palavras que descrevem você/sua marca" value={data.q10} />
            <QA label="Tom da LP" value={fmtSingle(data.q11, data.q11Other)} />
            <QA label="O que NÃO quer que a LP pareça" value={fmtMulti(data.q12, data.q12Other)} />

            {/* Camada 5 */}
            <p className="camada-title text-[10px] font-bold uppercase tracking-widest text-emerald-500 border-b border-[#222] pb-1 mb-3 mt-5">
              Camada 5 — Identidade Visual
            </p>
            <QA label="Identidade visual disponível" value={fmtMulti(data.q13)} />
            <QA label="Referências visuais" value={data.q14} />
            <QA label="Cores que gosta / quer evitar" value={data.q15} />

            {/* Camada 6 */}
            <p className="camada-title text-[10px] font-bold uppercase tracking-widest text-emerald-500 border-b border-[#222] pb-1 mb-3 mt-5">
              Camada 6 — Materiais e LP
            </p>
            <QA label="Materiais disponíveis" value={fmtMulti(data.q16, data.q16Other)} />
            <QA label="Ação que a LP deve gerar" value={fmtSingle(data.q17, data.q17Other)} />

            {data.additionalNotes && (
              <>
                <p className="camada-title text-[10px] font-bold uppercase tracking-widest text-emerald-500 border-b border-[#222] pb-1 mb-3 mt-5">
                  Observações Finais
                </p>
                <p className="qa-value text-[#ccc] text-sm leading-relaxed">{data.additionalNotes}</p>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

function QA({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-3">
      <p className="qa-label text-[10px] font-semibold uppercase tracking-wide text-[#555] mb-0.5">{label}</p>
      <p className="qa-value text-[#ccc] text-sm leading-relaxed">{value || "—"}</p>
    </div>
  );
}
