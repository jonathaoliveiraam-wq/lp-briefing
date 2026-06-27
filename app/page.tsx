"use client";

import { useState } from "react";
import ProgressBar from "@/components/ProgressBar";
import IdentificationStep from "@/components/IdentificationStep";
import SingleSelectStep from "@/components/SingleSelectStep";
import MultiSelectStep from "@/components/MultiSelectStep";
import TextStep from "@/components/TextStep";
import ProofStep from "@/components/ProofStep";
import FinalNotesStep from "@/components/FinalNotesStep";
import SuccessScreen from "@/components/SuccessScreen";

export interface FormData {
  responderName: string;
  projectName: string;
  responderContact: string;
  q1: string[];
  q1Other: string;
  q2: string;
  q2Other: string;
  q3: string;
  q4: string;
  q4Other: string;
  q5: string;
  q6: string[];
  q6Other: string;
  q7: string[];
  q7Other: string;
  q7Details: Record<string, string>;
  q8: string;
  q8Other: string;
  q9: string;
  q9Other: string;
  q10: string[];
  q10Other: string;
  q11: string;
  q11Other: string;
  additionalNotes: string;
}

const TOTAL_QUESTIONS = 12;

const initial: FormData = {
  responderName: "",
  projectName: "",
  responderContact: "",
  q1: [],
  q1Other: "",
  q2: "",
  q2Other: "",
  q3: "",
  q4: "",
  q4Other: "",
  q5: "",
  q6: [],
  q6Other: "",
  q7: [],
  q7Other: "",
  q7Details: {},
  q8: "",
  q8Other: "",
  q9: "",
  q9Other: "",
  q10: [],
  q10Other: "",
  q11: "",
  q11Other: "",
  additionalNotes: "",
};

export default function Home() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(initial);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const set = (patch: Partial<FormData>) => setData((d) => ({ ...d, ...patch }));
  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Falha no envio");
      }
      setSubmitted(true);
    } catch (e: unknown) {
      setError(
        e instanceof Error ? e.message : "Erro ao enviar. Tente novamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) return <SuccessScreen responderName={data.responderName} />;

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-violet-600/15 border border-violet-500/20 mb-3">
            <svg
              className="w-5 h-5 text-violet-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-white">Briefing de LP</h1>
          <p className="text-[#555] text-sm mt-0.5">
            {step === 0 ? "Preencha antes de começar as perguntas" : data.projectName}
          </p>
        </div>

        {step > 0 && <ProgressBar current={step} total={TOTAL_QUESTIONS} />}

        <div key={step} className="step-enter">
          {step === 0 && (
            <IdentificationStep
              data={{
                name: data.responderName,
                project: data.projectName,
                contact: data.responderContact,
              }}
              onChange={(d) =>
                set({
                  responderName: d.name,
                  projectName: d.project,
                  responderContact: d.contact,
                })
              }
              onNext={next}
            />
          )}

          {step === 1 && (
            <MultiSelectStep
              block="BLOCO 1 — Diagnóstico de posicionamento"
              question="O que está mais desalinhado no posicionamento atual?"
              options={[
                "Falta clareza sobre o público",
                "Falta prova/autoridade",
                "Tom de voz inconsistente",
                "Mensagem genérica, parece «mais um do mercado»",
                "Não comunica diferencial real",
              ]}
              value={data.q1}
              otherValue={data.q1Other}
              onChange={(v, o) => set({ q1: v, q1Other: o })}
              onNext={next}
              onBack={back}
            />
          )}

          {step === 2 && (
            <SingleSelectStep
              block="BLOCO 1 — Diagnóstico de posicionamento"
              question="Qual deve ser o foco principal do reposicionamento/LP?"
              options={[
                "Autoridade técnica / especialista",
                "Inspiração / história / storytelling",
                "Resultado prático / solução de um problema",
                "Método ou sistema proprietário",
              ]}
              value={data.q2}
              otherValue={data.q2Other}
              onChange={(v, o) => set({ q2: v, q2Other: o })}
              onNext={next}
              onBack={back}
            />
          )}

          {step === 3 && (
            <TextStep
              block="BLOCO 2 — Público e dor"
              question="Quem é o público prioritário desta LP?"
              placeholder="Ex: Nutricionistas autônomas entre 28-40 anos que querem escalar o atendimento online"
              value={data.q3}
              onChange={(v) => set({ q3: v })}
              onNext={next}
              onBack={back}
            />
          )}

          {step === 4 && (
            <SingleSelectStep
              block="BLOCO 2 — Público e dor"
              question="Qual é a dor #1 desse público — o que faz a pessoa parar e prestar atenção?"
              options={[
                "Medo de perder algo (dinheiro, tempo, oportunidade)",
                "Sensação de estar perdido / sem direção",
                "Sobrecarga, não consegue avançar/escalar",
                "Já tentou outras soluções e não funcionou",
              ]}
              value={data.q4}
              otherValue={data.q4Other}
              onChange={(v, o) => set({ q4: v, q4Other: o })}
              onNext={next}
              onBack={back}
            />
          )}

          {step === 5 && (
            <TextStep
              block="BLOCO 3 — Promessa e diferencial"
              question="Qual é a promessa central da LP?"
              placeholder="Ex: Em 90 dias, triplicar o faturamento do consultório sem aumentar carga de horas"
              value={data.q5}
              onChange={(v) => set({ q5: v })}
              onNext={next}
              onBack={back}
            />
          )}

          {step === 6 && (
            <MultiSelectStep
              block="BLOCO 3 — Promessa e diferencial"
              question="Qual é o principal diferencial frente à concorrência?"
              options={[
                "Prova prática (já fez, não é só teoria)",
                "Formação/credencial forte",
                "Resultados documentados/números",
                "Identidade/origem/história pessoal",
              ]}
              value={data.q6}
              otherValue={data.q6Other}
              onChange={(v, o) => set({ q6: v, q6Other: o })}
              onNext={next}
              onBack={back}
            />
          )}

          {step === 7 && (
            <ProofStep
              value={data.q7}
              otherValue={data.q7Other}
              details={data.q7Details}
              onChange={(v, o, d) => set({ q7: v, q7Other: o, q7Details: d })}
              onNext={next}
              onBack={back}
            />
          )}

          {step === 8 && (
            <SingleSelectStep
              block="BLOCO 5 — Objeções"
              question="Qual é a objeção mais provável de quem ler a LP?"
              options={[
                '"Tem tempo/capacidade pra mim?"',
                '"É caro?"',
                '"Funciona pro meu caso/nicho?"',
                '"Por que essa opção e não outra do mercado?"',
              ]}
              value={data.q8}
              otherValue={data.q8Other}
              onChange={(v, o) => set({ q8: v, q8Other: o })}
              onNext={next}
              onBack={back}
            />
          )}

          {step === 9 && (
            <SingleSelectStep
              block="BLOCO 6 — Tom de voz"
              question="Que tom de voz a LP deve ter?"
              options={[
                "Direto e sem rodeios",
                "Inspiracional / storytelling",
                "Técnico e analítico",
                "Provocador (quebra crenças do leitor)",
              ]}
              value={data.q9}
              otherValue={data.q9Other}
              onChange={(v, o) => set({ q9: v, q9Other: o })}
              onNext={next}
              onBack={back}
            />
          )}

          {step === 10 && (
            <MultiSelectStep
              block="BLOCO 6 — Tom de voz"
              question="O que devemos EVITAR no tom?"
              options={[
                'Clichês de "mentor de internet"',
                "Linguagem corporativa/formal demais",
                "Promessas exageradas",
                "Storytelling longo demais",
              ]}
              value={data.q10}
              otherValue={data.q10Other}
              onChange={(v, o) => set({ q10: v, q10Other: o })}
              onNext={next}
              onBack={back}
            />
          )}

          {step === 11 && (
            <SingleSelectStep
              block="BLOCO 7 — Oferta e CTA"
              question="Qual ação a LP deve gerar?"
              options={[
                "Captar lead (nome + contato)",
                "Agendar diagnóstico/conversa",
                "Inscrição em produto/oferta específica",
              ]}
              value={data.q11}
              otherValue={data.q11Other}
              onChange={(v, o) => set({ q11: v, q11Other: o })}
              onNext={next}
              onBack={back}
            />
          )}

          {step === 12 && (
            <FinalNotesStep
              value={data.additionalNotes}
              onChange={(v) => set({ additionalNotes: v })}
              onSubmit={handleSubmit}
              onBack={back}
              isSubmitting={isSubmitting}
              error={error}
            />
          )}
        </div>
      </div>
    </main>
  );
}
