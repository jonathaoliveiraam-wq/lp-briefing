import { Resend } from "resend";
import { buildEmailBody } from "@/lib/buildEmailBody";
import type { FormData } from "@/app/page";

export async function POST(request: Request) {
  try {
    const data: FormData = await request.json();

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return Response.json({ error: "RESEND_API_KEY não configurado" }, { status: 500 });
    }
    const resend = new Resend(apiKey);

    const subject = `Novo briefing de LP — ${data.projectName} (respondido por ${data.responderName})`;
    const body = buildEmailBody(data);

    const from = process.env.FROM_EMAIL ?? "onboarding@resend.dev";
    const to = process.env.DESTINATION_EMAIL;

    if (!to) {
      return Response.json({ error: "DESTINATION_EMAIL não configurado" }, { status: 500 });
    }

    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      text: body,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (e: unknown) {
    console.error("Send route error:", e);
    return Response.json(
      { error: e instanceof Error ? e.message : "Erro interno" },
      { status: 500 }
    );
  }
}
