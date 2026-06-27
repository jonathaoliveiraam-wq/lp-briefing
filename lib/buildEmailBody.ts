import type { FormData } from "@/app/page";

const Q7_LABELS: Record<string, string> = {
  "depoimentos": "Depoimentos de clientes (prints, áudios, vídeos)",
  "numeros": "Números e resultados mensuráveis (ROI, faturamento, crescimento)",
  "cases": "Cases e histórias de transformação",
  "credenciais": "Credenciais, certificações ou prêmios",
  "parcerias": "Parcerias, menções na mídia ou reconhecimentos",
};

function formatSelected(values: string[], otherValue: string): string {
  const lines = values.map((v) => {
    if (v === "OUTRO") return `- Outro: ${otherValue || "(não especificado)"}`;
    return `- ${v}`;
  });
  return lines.join("\n") || "_(não respondido)_";
}

function formatSingle(value: string, otherValue: string): string {
  if (!value) return "_(não respondido)_";
  if (value === "OUTRO") return `Outro: ${otherValue || "(não especificado)"}`;
  return value;
}

export function buildEmailBody(data: FormData): string {
  const now = new Date().toLocaleString("pt-BR", { timeZone: "America/Manaus" });

  const q7Lines = data.q7.map((v) => {
    const label =
      v === "OUTRO"
        ? `Outro: ${data.q7Other || "(não especificado)"}`
        : Q7_LABELS[v] ?? v;
    const detail = data.q7Details[v];
    return `- ${label}${detail ? `\n  → Detalhe: ${detail}` : ""}`;
  });

  return `# Briefing de LP — ${data.projectName}

**Respondido por:** ${data.responderName}
**Contato:** ${data.responderContact || "_(não informado)_"}
**Data/hora:** ${now}

---

## Tela 0 — Identificação

- **Nome:** ${data.responderName}
- **Projeto / LP:** ${data.projectName}
- **Contato:** ${data.responderContact || "_(não informado)_"}

---

## BLOCO 1 — Diagnóstico de posicionamento

**1. O que está mais desalinhado no posicionamento atual?**
${formatSelected(data.q1, data.q1Other)}

**2. Qual deve ser o foco principal do reposicionamento/LP?**
${formatSingle(data.q2, data.q2Other)}

---

## BLOCO 2 — Público e dor

**3. Quem é o público prioritário desta LP?**
${data.q3 || "_(não respondido)_"}

**4. Qual é a dor #1 desse público?**
${formatSingle(data.q4, data.q4Other)}

---

## BLOCO 3 — Promessa e diferencial

**5. Qual é a promessa central da LP?**
${data.q5 || "_(não respondido)_"}

**6. Qual é o principal diferencial frente à concorrência?**
${formatSelected(data.q6, data.q6Other)}

---

## BLOCO 4 — Prova

**7. Quais provas devem ter mais destaque na LP?**
${q7Lines.join("\n") || "_(não respondido)_"}

---

## BLOCO 5 — Objeções

**8. Qual é a objeção mais provável de quem ler a LP?**
${formatSingle(data.q8, data.q8Other)}

---

## BLOCO 6 — Tom de voz

**9. Que tom de voz a LP deve ter?**
${formatSingle(data.q9, data.q9Other)}

**10. O que devemos EVITAR no tom?**
${formatSelected(data.q10, data.q10Other)}

---

## BLOCO 7 — Oferta e CTA

**11. Qual ação a LP deve gerar?**
${formatSingle(data.q11, data.q11Other)}

---

## Observações finais

${data.additionalNotes || "_(nenhuma observação adicional)_"}

---
_Enviado via formulário lp-briefing_
`;
}
