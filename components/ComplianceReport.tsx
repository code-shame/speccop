"use client";

import type { ComplianceReport as ReportType } from "@/lib/ai";
import ComplianceItem from "./ComplianceItem";

interface Props {
  report: ReportType;
}

export default function ComplianceReport({ report }: Props) {
  const counts = {
    implemented: report.items.filter((i) => i.status === "implemented").length,
    partial: report.items.filter((i) => i.status === "partial").length,
    missing: report.items.filter((i) => i.status === "missing").length,
    scope_crept: report.items.filter((i) => i.status === "scope_crept").length,
  };

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Summary</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Ticket</p>
            <p className="text-zinc-300 text-sm">{report.ticketSummary}</p>
          </div>
          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Implementation</p>
            <p className="text-zinc-300 text-sm">{report.implementationSummary}</p>
          </div>
        </div>

        {/* Status counts */}
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-zinc-800 rounded-lg p-3 text-center">
            <p className="text-2xl">✅</p>
            <p className="text-white font-bold text-lg">{counts.implemented}</p>
            <p className="text-zinc-400 text-xs">Implemented</p>
          </div>
          <div className="bg-zinc-800 rounded-lg p-3 text-center">
            <p className="text-2xl">⚠️</p>
            <p className="text-white font-bold text-lg">{counts.partial}</p>
            <p className="text-zinc-400 text-xs">Partial</p>
          </div>
          <div className="bg-zinc-800 rounded-lg p-3 text-center">
            <p className="text-2xl">❌</p>
            <p className="text-white font-bold text-lg">{counts.missing}</p>
            <p className="text-zinc-400 text-xs">Missing</p>
          </div>
          <div className="bg-zinc-800 rounded-lg p-3 text-center">
            <p className="text-2xl">🆕</p>
            <p className="text-white font-bold text-lg">{counts.scope_crept}</p>
            <p className="text-zinc-400 text-xs">Scope Crept</p>
          </div>
        </div>
      </div>

      {/* Compliance items */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Requirement Breakdown</h2>
        <div className="space-y-3">
          {report.items.map((item, i) => (
            <ComplianceItem key={i} item={item} />
          ))}
        </div>
      </div>

      {/* Verdict */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-3">Verdict</h2>
        <p className="text-zinc-300 leading-relaxed">{report.verdict}</p>
      </div>
    </div>
  );
}
