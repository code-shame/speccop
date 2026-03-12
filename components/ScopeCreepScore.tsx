"use client";

interface Props {
  score: number;
}

export default function ScopeCreepScore({ score }: Props) {
  const color =
    score < 30
      ? { text: "text-green-400", bg: "from-green-500", label: "Compliant", desc: "You actually built what was asked. A rare achievement." }
      : score < 60
        ? { text: "text-yellow-400", bg: "from-yellow-500", label: "Moderate Drift", desc: "Some deviation, but nothing catastrophic. Yet." }
        : score < 80
          ? { text: "text-orange-400", bg: "from-orange-500", label: "Significant Creep", desc: "The ticket is somewhere under all those extra files." }
          : { text: "text-red-400", bg: "from-red-500", label: "Scope Explosion", desc: "The original ticket would like to speak to your manager." };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-zinc-400 text-sm mb-1">Scope Creep Score</p>
          <p className={`text-6xl font-black ${color.text}`}>
            {score}
            <span className="text-3xl text-zinc-500">/100</span>
          </p>
          <p className={`text-sm font-semibold mt-1 ${color.text}`}>{color.label}</p>
        </div>
        <div className="text-right max-w-48">
          <p className="text-zinc-500 text-sm italic">{color.desc}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-4 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${color.bg} to-transparent rounded-full transition-all duration-700`}
          style={{ width: `${score}%` }}
        />
      </div>

      <div className="flex justify-between mt-2 text-xs text-zinc-600">
        <span>0 — Perfect</span>
        <span>50 — Meh</span>
        <span>100 — Chaos</span>
      </div>
    </div>
  );
}
