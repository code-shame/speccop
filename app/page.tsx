import Link from "next/link";
import { Shield, GitPullRequest, Zap, Bell, Lock, TrendingUp, ChevronRight, Check } from "lucide-react";

const DEMO_REPORT = {
  ticketSummary: "Add a 'Forgot Password' link to the login form",
  implementationSummary: "Rewrote authentication system, added OAuth, migrated database schema, updated 47 files",
  scopeCreepScore: 94,
  items: [
    { requirement: "Add 'Forgot Password' link", status: "implemented", notes: "Link added (in a completely new auth UI)" },
    { requirement: "Link goes to /reset-password", status: "implemented", notes: "Route exists but was completely rebuilt" },
    { requirement: "No other changes required", status: "scope_crept", notes: "You rewrote the entire auth system" },
  ],
  snarkComment: "You were asked to add a link. You touched 47 files. Interesting interpretation.",
  verdict: "What started as a CSS change became a full authentication overhaul. Scope creep score: 94/100. Please see your manager.",
};

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { emoji: string; color: string }> = {
    implemented: { emoji: "✅", color: "text-green-400 bg-green-400/10" },
    partial: { emoji: "⚠️", color: "text-yellow-400 bg-yellow-400/10" },
    missing: { emoji: "❌", color: "text-red-400 bg-red-400/10" },
    scope_crept: { emoji: "🆕", color: "text-blue-400 bg-blue-400/10" },
  };
  const c = config[status] ?? { emoji: "❓", color: "text-zinc-400 bg-zinc-400/10" };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${c.color}`}>
      {c.emoji} {status.replace("_", " ")}
    </span>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Nav */}
      <nav className="border-b border-zinc-800/50 px-6 py-4 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-sm z-50">
        <div className="flex items-center gap-2 font-bold text-lg">
          <Shield className="w-5 h-5 text-red-400" />
          Spec.cop
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <a href="#features" className="text-zinc-400 hover:text-white transition-colors">Features</a>
          <Link href="/pricing" className="text-zinc-400 hover:text-white transition-colors">Pricing</Link>
          <Link href="/login" className="text-zinc-400 hover:text-white transition-colors">Sign in</Link>
        </div>
        <Link
          href="/login"
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
        >
          Catch My Scope Creep
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium px-3 py-1.5 rounded-full mb-8">
          <Shield className="w-3 h-3" />
          AI Compliance Officer for Your PRs
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
          You built{" "}
          <span className="text-red-400">what</span>{" "}
          now?
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Spec.cop connects your Linear/Jira tickets to your GitHub PRs and
          tells you — with surgical precision and zero mercy — exactly how far
          you strayed from the spec.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            Catch My Scope Creep
            <ChevronRight className="w-5 h-5" />
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center gap-2 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            View Pricing
          </Link>
        </div>
      </section>

      {/* Demo Report */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden shadow-2xl">
          {/* Window chrome */}
          <div className="bg-zinc-800 px-4 py-3 flex items-center gap-2 border-b border-zinc-700">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-zinc-500 text-xs ml-4 font-mono">spec.cop — compliance report</span>
          </div>

          <div className="p-6">
            {/* Score */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-zinc-400 text-sm mb-1">Scope Creep Score</p>
                <p className="text-5xl font-black text-red-400">{DEMO_REPORT.scopeCreepScore}<span className="text-2xl text-zinc-500">/100</span></p>
              </div>
              <div className="text-right">
                <p className="text-zinc-400 text-xs mb-1">PR vs Ticket</p>
                <p className="text-sm text-zinc-300 font-medium">{DEMO_REPORT.ticketSummary}</p>
              </div>
            </div>

            {/* Score bar */}
            <div className="h-3 bg-zinc-800 rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full transition-all"
                style={{ width: `${DEMO_REPORT.scopeCreepScore}%` }}
              />
            </div>

            {/* Snark */}
            <blockquote className="border-l-2 border-red-500 pl-4 mb-6">
              <p className="text-zinc-300 italic">&ldquo;{DEMO_REPORT.snarkComment}&rdquo;</p>
            </blockquote>

            {/* Items */}
            <div className="space-y-3">
              {DEMO_REPORT.items.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-zinc-800/50 rounded-lg">
                  <StatusBadge status={item.status} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-zinc-200">{item.requirement}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">{item.notes}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Verdict */}
            <div className="mt-6 p-4 bg-red-950/30 border border-red-800/50 rounded-lg">
              <p className="text-sm text-zinc-300"><span className="text-red-400 font-semibold">Verdict: </span>{DEMO_REPORT.verdict}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-zinc-800 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for teams that ship fast<br /><span className="text-zinc-400">and sometimes a little too much</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <GitPullRequest className="w-6 h-6 text-blue-400" />,
                title: "Automatic PR Analysis",
                desc: "Webhook fires on every PR open or update. Compliance report lands as a PR comment before you can say 'but the ticket was vague'.",
              },
              {
                icon: <Zap className="w-6 h-6 text-purple-400" />,
                title: "Linear & Jira Integration",
                desc: "Connects directly to your ticket system. No copy-pasting specs — Spec.cop reads the source of truth.",
              },
              {
                icon: <TrendingUp className="w-6 h-6 text-yellow-400" />,
                title: "Scope Creep Score",
                desc: "A 0–100 score that quantifies how badly you overbuilt. 0 = you did exactly what was asked. 100 = seeking employment.",
              },
              {
                icon: <Shield className="w-6 h-6 text-red-400" />,
                title: "AI-Powered Analysis",
                desc: "GPT-4o reads intent vs implementation and matches each requirement against the actual diff. Line by line.",
              },
              {
                icon: <Lock className="w-6 h-6 text-green-400" />,
                title: "Merge Blocking",
                desc: "Set a score threshold. PRs above it fail the status check. Your scope creep can no longer land quietly in prod.",
              },
              {
                icon: <Bell className="w-6 h-6 text-orange-400" />,
                title: "Team Leaderboard",
                desc: "See who has the highest average scope creep score on your team. Recognition for the wrong reasons.",
              },
            ].map((f, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="border-t border-zinc-800 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Simple pricing, no surprises</h2>
          <p className="text-zinc-400 mb-12">Unlike your PRs, our pricing stays in scope.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { name: "Free", price: "$0", desc: "10 checks/month", features: ["GitHub + Linear", "PR comments", "Basic reports"] },
              { name: "Pro", price: "$19/mo", desc: "Unlimited checks", features: ["Everything in Free", "Jira integration", "Email notifications"], popular: true },
              { name: "Team", price: "$59/mo", desc: "Per team", features: ["Everything in Pro", "Merge blocking", "Leaderboard + history"] },
            ].map((plan) => (
              <div key={plan.name} className={`rounded-xl p-6 border ${plan.popular ? "border-red-500 bg-red-950/20" : "border-zinc-800 bg-zinc-900"}`}>
                {plan.popular && <div className="text-xs text-red-400 font-medium mb-2">MOST POPULAR</div>}
                <p className="font-bold text-lg">{plan.name}</p>
                <p className="text-3xl font-black mt-1 mb-1">{plan.price}</p>
                <p className="text-zinc-400 text-sm mb-4">{plan.desc}</p>
                <ul className="space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-zinc-300">
                      <Check className="w-4 h-4 text-green-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            Catch My Scope Creep
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 text-center text-zinc-500 text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Shield className="w-4 h-4 text-red-400" />
          <span className="font-semibold text-zinc-300">Spec.cop</span>
        </div>
        <p>Exposing scope creep with zero mercy since 2024.</p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <Link href="/pricing" className="hover:text-zinc-300 transition-colors">Pricing</Link>
          <Link href="/login" className="hover:text-zinc-300 transition-colors">Sign in</Link>
          <a href="mailto:hello@speccop.dev" className="hover:text-zinc-300 transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
}

