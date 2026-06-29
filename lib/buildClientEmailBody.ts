import type { ClientFormData } from "@/app/cliente/page";

function fmt(v: string): string {
  return v?.trim() || "_(não respondido)_";
}

function fmtMulti(values: string[], otherValue: string): string {
  if (!values.length) return "_(não respondido)_";
  return values
    .map((v) => (v === "OUTRO" ? `- Outro: ${otherValue || "(não especificado)"}` : `- ${v}`))
    .join("\n");
}

export function buildClientEmailBody(data: ClientFormData): string {
  const now = new Date().toLocaleString("pt-BR", { timeZone: "America/Manaus" });

  return `# Onboarding de Cliente — ${data.businessName}

**Respondido por:** ${data.responderName}
**Negócio/Projeto:** ${data.businessName}
**Site / Redes Sociais:** ${data.socialMedia || "_(não informado)_"}
**Data/hora:** ${now}

---

## CAMADA 1 — A Oferta

**1. O que você faz / vende?**
${fmt(data.q1)}

**2. Qual é a sua oferta principal e quanto custa?**
${fmt(data.q2)}

**3. Qual é o grande resultado ou transformação que você entrega?**
${fmt(data.q3)}

---

## CAMADA 2 — O Cliente Ideal

**4. Quem é o seu cliente ideal?**
${fmt(data.q4)}

**5. Qual é a maior dor ou frustração do seu cliente ANTES de te encontrar?**
${fmt(data.q5)}

**6. Como é a vida ou negócio do cliente DEPOIS de trabalhar com você?**
${fmt(data.q6)}

---

## CAMADA 3 — Diferencial e Prova

**7. Por que alguém deve te escolher e não a concorrência?**
${fmt(data.q7)}

**8. Qual resultado concreto (número, case, antes e depois) você pode mostrar?**
${fmt(data.q8)}

**9. Que tipo de prova você tem disponível?**
${fmtMulti(data.q9, data.q9Other)}

---

## CAMADA 4 — Personalidade e Tom

**10. Três palavras que descrevem você ou sua marca:**
${fmt(data.q10)}

**11. Que tom a LP deve ter?**
${data.q11 === "OUTRO" ? `Outro: ${data.q11Other}` : fmt(data.q11)}

**12. O que você NÃO quer que a LP pareça?**
${fmtMulti(data.q12, data.q12Other)}

---

## CAMADA 5 — Identidade Visual

**13. O que você já tem de identidade visual?**
${fmtMulti(data.q13, "")}

**14. Marcas, sites ou pessoas que você admira visualmente:**
${fmt(data.q14)}

**15. Cores que gosta / quer evitar:**
${fmt(data.q15)}

---

## CAMADA 6 — Materiais e LP

**16. O que você já tem disponível para usar na LP?**
${fmtMulti(data.q16, data.q16Other)}

**17. Qual ação a LP deve gerar?**
${data.q17 === "OUTRO" ? `Outro: ${data.q17Other}` : fmt(data.q17)}

---

## Observações Finais

${data.additionalNotes || "_(nenhuma observação adicional)_"}

---
_Enviado via formulário lp-briefing — Onboarding de Cliente_
`;
}
