interface Props {
  responderName: string;
}

export default function SuccessScreen({ responderName }: Props) {
  return (
    <main className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        <div className="w-16 h-16 rounded-full bg-violet-600/15 border border-violet-500/30 flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-violet-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          {responderName ? `Obrigado, ${responderName.split(" ")[0]}!` : "Enviado!"}
        </h2>
        <p className="text-[#888] leading-relaxed">
          Suas respostas foram enviadas com sucesso.
          <br />
          Você já pode fechar esta página.
        </p>
      </div>
    </main>
  );
}
