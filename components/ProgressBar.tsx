interface Props {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: Props) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-[#666] font-medium uppercase tracking-wider">
          Pergunta {current} de {total}
        </span>
        <span className="text-xs text-[#444]">{pct}%</span>
      </div>
      <div className="w-full h-1 bg-[#1e1e1e] rounded-full overflow-hidden">
        <div
          className="h-full bg-violet-600 rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
