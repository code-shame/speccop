"use client";

import type { ComplianceItem as Item } from "@/lib/ai";

interface Props {
  item: Item;
}

const STATUS_CONFIG: Record<
  string,
  { emoji: string; label: string; textColor: string; borderColor: string; bgColor: string }
> = {
  implemented: {
    emoji: "✅",
    label: "Implemented",
    textColor: "text-green-400",
    borderColor: "border-green-800/50",
    bgColor: "bg-green-950/20",
  },
  partial: {
    emoji: "⚠️",
    label: "Partial",
    textColor: "text-yellow-400",
    borderColor: "border-yellow-800/50",
    bgColor: "bg-yellow-950/20",
  },
  missing: {
    emoji: "❌",
    label: "Missing",
    textColor: "text-red-400",
    borderColor: "border-red-800/50",
    bgColor: "bg-red-950/20",
  },
  scope_crept: {
    emoji: "🆕",
    label: "Scope Crept",
    textColor: "text-blue-400",
    borderColor: "border-blue-800/50",
    bgColor: "bg-blue-950/20",
  },
};

export default function ComplianceItem({ item }: Props) {
  const config = STATUS_CONFIG[item.status] ?? {
    emoji: "❓",
    label: item.status,
    textColor: "text-zinc-400",
    borderColor: "border-zinc-700",
    bgColor: "bg-zinc-800/20",
  };

  return (
    <div className={`flex gap-4 p-4 rounded-lg border ${config.borderColor} ${config.bgColor}`}>
      <div className="shrink-0 mt-0.5">
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${config.textColor} bg-black/20`}
        >
          {config.emoji} {config.label}
        </span>
      </div>
      <div className="min-w-0">
        <p className="text-zinc-200 font-medium text-sm">{item.requirement}</p>
        <p className="text-zinc-400 text-xs mt-1 leading-relaxed">{item.notes}</p>
      </div>
    </div>
  );
}
