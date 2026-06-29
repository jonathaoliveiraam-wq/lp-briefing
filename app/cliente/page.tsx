"use client";

import { useState } from "react";
import ProgressBar from "@/components/ProgressBar";
import IdentificationClientStep from "@/components/IdentificationClientStep";
import SingleSelectStep from "@/components/SingleSelectStep";
import MultiSelectStep from "@/components/MultiSelectStep";
import TextStep from "@/components/TextStep";
import ClientSuccessScreen from "@/components/ClientSuccessScreen";
import FinalNotesStep from "@/components/FinalNotesStep";

export interface ClientFormData {
  responderName: string;
  businessName: string;
  socialMedia: string;
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  q6: string;
  q7: string;
  q8: string;
  q9: string[];
  q9Other: string;
  q10: string;
  q11: string;
  q11Other: string;
  q12: string[];
  q12Other: string;
  q13: string[];
  q14: string;
  q15: string;
  q16: string[];
  q16Other: string;
  q17: string;
  q17Other: string;
  additionalNotes: string;
}

const TOTAL_QUESTIONS = 17;

const initial: ClientFormData = {
  responderName: "",
  businessName: "",
  socialMedia: "",
  q1: "",
  q2: "",
  q3: "",
  q4: "",
  q5: "",
  q6: "",
  q7: "",
  q8: "",
  q9: [],
  q9Other: "",
  q10: "",
  q11: "",
  q11Other: "",
  q12: [],
  q12Other: "",
  q13: [],
  q14: "",
  q15: "",
  q16: [],
  q16Other: "",
  q17: "",
  q17Other: "",
  additionalNotes: "",
};

export default function ClientePage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<ClientFormData>(initial);
  const [submitted, setSubmitted] = useState(false);

  const set = (patch: Partial<ClientFormData>) => setData((d) => ({ ...d, ...patch }));
  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const handleSubmit = () => {
    setSubmitted(true);
    // tenta enviar email em segundo plano — não bloqueia se não configurado
    fetch("/api/send-client", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch(() => {});
  };

  if (submitted) return <ClientSuccessScreen responderName={data.responderName} data={data} />;

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-600/15 border border-emerald-500/20 mb-3">
            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-white">Conheça seu negócio</h1>
          <p className="text-[#555] text-sm mt-0.5">
            {step === 0 ? "Para criar a landing page certa pra você" : data.businessName}
          </p>
        </div>

        {step > 0 && <ProgressBar current={step} total={TOTAL_QUESTIONS} />}

        <div key={step} className="step-enter">
          {step === 0 && (
            <IdentificationClientStep
              data={{ name: data.responderName, business: data.businessName, social: data.socialMedia }}
              onChange={(d) => set({ responderName: d.name, businessName: d.business, socialMedia: d.social })}
              onNext={next}
            />
          )}

          {/* CAMADA 1 — A Oferta */}
          {step === 1 && (
            <TextStep
              block="CAMADA 1 — A Oferta"
              question="Em uma frase: o que você faz ou vende?"
              placeholder="Ex: Ajudo nutricionistas a conseguirem mais clientes pelo Instagram sem depender de indicação"
              value={data.q1}
              onChange={(v) => set({ q1: v })}
              onNext={next}
              onBack={back}
            />
          )}

          {step === 2 && (
            <TextStep
              block="CAMADA 1 — A Oferta"
              question="Qual é a sua oferta principal e qual é o investimento?"
              placeholder="Ex: Mentoria em grupo de 3 meses — R$4.800 à vista ou 6x R$900"
              value={data.q2}
              onChange={(v) => set({ q2: v })}
              onNext={next}
              onBack={back}
            />
          )}

          {step === 3 && (
            <TextStep
              block="CAMADA 1 — A Oferta"
              question="Qual é o grande resultado ou transformação que você entrega?"
              placeholder="Ex: O cliente sai com agenda lotada, faturamento previsível e sem precisar postar todo dia"
              value={data.q3}
              onChange={(v) => set({ q3: v })}
              onNext={next}
              onBack={back}
            />
          )}

          {/* CAMADA 2 — O Cliente Ideal */}
          {step === 4 && (
            <TextStep
              block="CAMADA 2 — O Cliente Ideal"
              question="Quem é o seu cliente ideal?"
              placeholder="Ex: Nutricionistas autônomas, 28–40 anos, que já têm clientes mas quer escalar sem trabalhar mais horas"
              value={data.q4}
              onChange={(v) => set({ q4: v })}
              onNext={next}
              onBack={back}
            />
          )}

          {step === 5 && (
            <TextStep
              block="CAMADA 2 — O Cliente Ideal"
              question="Qual é a maior dor ou frustração do seu cliente ANTES de te encontrar?"
              placeholder="Ex: Posta todo dia, tem seguidores, mas não consegue converter em clientes pagantes"
              value={data.q5}
              onChange={(v) => set({ q5: v })}
              onNext={next}
              onBack={back}
            />
          )}

          {step === 6 && (
            <TextStep
              block="CAMADA 2 — O Cliente Ideal"
              question="Como é a vida ou negócio do seu cliente DEPOIS de trabalhar com você?"
              placeholder="Ex: Agenda cheia, 3–5 novos clientes por mês, faturamento acima de R$10k, mais tempo pra família"
              value={data.q6}
              onChange={(v) => set({ q6: v })}
              onNext={next}
              onBack={back}
            />
          )}

          {/* CAMADA 3 — Diferencial e Prova */}
          {step === 7 && (
            <TextStep
              block="CAMADA 3 — Diferencial e Prova"
              question="Por que alguém deve te escolher e não a concorrência?"
              placeholder="Ex: Método criado a partir do meu próprio negócio, não copiado de gringo. Já apliquei em 200+ nutricionistas."
              value={data.q7}
              onChange={(v) => set({ q7: v })}
              onNext={next}
              onBack={back}
            />
          )}

          {step === 8 && (
            <TextStep
              block="CAMADA 3 — Diferencial e Prova"
              question="Qual resultado concreto você pode mostrar? (número, case, antes e depois)"
              placeholder="Ex: Aluna passou de R$3k para R$18k em 90 dias. 87% dos alunos fecham cliente no 1º mês."
              value={data.q8}
              onChange={(v) => set({ q8: v })}
              onNext={next}
              onBack={back}
            />
          )}

          {step === 9 && (
            <MultiSelectStep
              block="CAMADA 3 — Diferencial e Prova"
              question="Que tipo de prova você tem disponível?"
              options={[
                "Depoimentos escritos de clientes",
                "Áudios ou vídeos de clientes",
                "Prints de resultados (WhatsApp, DM, etc.)",
                "Números e dados concretos",
                "Cases documentados (antes e depois)",
                "Credenciais ou certificações",
                "Menções na mídia ou parcerias",
              ]}
              value={data.q9}
              otherValue={data.q9Other}
              onChange={(v, o) => set({ q9: v, q9Other: o })}
              onNext={next}
              onBack={back}
            />
          )}

          {/* CAMADA 4 — Personalidade e Tom */}
          {step === 10 && (
            <TextStep
              block="CAMADA 4 — Personalidade e Tom"
              question="Três palavras que descrevem você ou sua marca"
              placeholder="Ex: direta, acolhedora, sem enrolação — ou: séria, técnica, confiável"
              value={data.q10}
              onChange={(v) => set({ q10: v })}
              onNext={next}
              onBack={back}
            />
          )}

          {step === 11 && (
            <SingleSelectStep
              block="CAMADA 4 — Personalidade e Tom"
              question="Que tom a LP deve ter?"
              options={[
                "Direto e sem rodeios — vai ao ponto, sem enrolação",
                "Acolhedor e próximo — fala como amiga/mentor",
                "Técnico e autoridade — credencial, dados, método",
                "Inspiracional — história, emoção, transformação",
                "Provocador — quebra crença, sacode o leitor",
              ]}
              value={data.q11}
              otherValue={data.q11Other}
              onChange={(v, o) => set({ q11: v, q11Other: o })}
              onNext={next}
              onBack={back}
            />
          )}

          {step === 12 && (
            <MultiSelectStep
              block="CAMADA 4 — Personalidade e Tom"
              question="O que você NÃO quer que a LP pareça?"
              options={[
                'Vendedor de curso de internet ("ganhe dinheiro rápido")',
                "Corporativo ou formal demais",
                "Motivacional e vazio",
                "Exagerado, promessas irreais",
                "Frio, sem personalidade",
              ]}
              value={data.q12}
              otherValue={data.q12Other}
              onChange={(v, o) => set({ q12: v, q12Other: o })}
              onNext={next}
              onBack={back}
            />
          )}

          {/* CAMADA 5 — Identidade Visual */}
          {step === 13 && (
            <MultiSelectStep
              block="CAMADA 5 — Identidade Visual"
              question="O que você já tem de identidade visual?"
              hint="Selecione tudo que já existe"
              options={[
                "Logo",
                "Paleta de cores definida",
                "Fonte ou tipografia escolhida",
                "Manual de marca",
                "Templates prontos",
                "Ainda não tenho nada definido",
              ]}
              value={data.q13}
              otherValue=""
              onChange={(v) => set({ q13: v })}
              onNext={next}
              onBack={back}
            />
          )}

          {step === 14 && (
            <TextStep
              block="CAMADA 5 — Identidade Visual"
              question="Marcas, sites ou pessoas que você admira visualmente"
              placeholder="Ex: @fulano no Instagram tem um feed elegante. Gosto do site da empresa X. Referência: Nubank (simples, direto, escuro)."
              value={data.q14}
              onChange={(v) => set({ q14: v })}
              onNext={next}
              onBack={back}
            />
          )}

          {step === 15 && (
            <TextStep
              block="CAMADA 5 — Identidade Visual"
              question="Cores que você gosta / cores que quer evitar"
              placeholder="Ex: Gosto de verde e preto. Quero evitar rosa e laranja. Ou: sem restrição de cor, só precisa parecer premium."
              value={data.q15}
              onChange={(v) => set({ q15: v })}
              onNext={next}
              onBack={back}
            />
          )}

          {/* CAMADA 6 — Materiais e LP */}
          {step === 16 && (
            <MultiSelectStep
              block="CAMADA 6 — Materiais e LP"
              question="O que você já tem disponível para usar na LP?"
              options={[
                "Fotos profissionais suas",
                "Fotos informais / do dia a dia",
                "Vídeos seus (depoimento, apresentação)",
                "Depoimentos escritos de clientes",
                "Depoimentos em áudio ou vídeo",
                "Prints de resultados",
                "Não tenho nada ainda",
              ]}
              value={data.q16}
              otherValue={data.q16Other}
              onChange={(v, o) => set({ q16: v, q16Other: o })}
              onNext={next}
              onBack={back}
            />
          )}

          {step === 17 && (
            <SingleSelectStep
              block="CAMADA 6 — Materiais e LP"
              question="Qual ação a LP deve gerar?"
              options={[
                "Captar lead (nome + contato)",
                "Agendar uma conversa / diagnóstico gratuito",
                "Comprar diretamente (checkout)",
                "Entrar no grupo ou comunidade",
              ]}
              value={data.q17}
              otherValue={data.q17Other}
              onChange={(v, o) => set({ q17: v, q17Other: o })}
              onNext={next}
              onBack={back}
            />
          )}

          {step === 18 && (
            <FinalNotesStep
              value={data.additionalNotes}
              onChange={(v) => set({ additionalNotes: v })}
              onSubmit={handleSubmit}
              onBack={back}
              isSubmitting={false}
              error=""
            />
          )}
        </div>
      </div>
    </main>
  );
}
