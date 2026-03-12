import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { Shield, GitPullRequest, TrendingUp, AlertTriangle, CheckCircle, Clock, Plus } from "lucide-react";
import { signOut } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth();
  const userId = session!.user!.id;

  const [user, recentChecks, topCreepers] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId }, select: { name: true, email: true, image: true, subscriptionTier: true, checksThisMonth: true } }),
    prisma.complianceCheck.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
    prisma.complianceCheck.groupBy({
      by: ["userId"],
      _avg: { scopeCreepScore: true },
      _count: { id: true },
      where: { status: "COMPLETED" },
      orderBy: { _avg: { scopeCreepScore: "desc" } },
      take: 5,
    }),
  ]);

  const completedChecks = recentChecks.filter((c) => c.status === "COMPLETED");
  const avgScore = completedChecks.length
    ? Math.round(completedChecks.reduce((s, c) => s + (c.scopeCreepScore ?? 0), 0) / completedChecks.length)
    : 0;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Nav */}
      <nav className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Shield className="w-5 h-5 text-red-400" />
          Spec.cop
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/settings" className="text-zinc-400 hover:text-white text-sm">Settings</Link>
          <form action={async () => { "use server"; await signOut({ redirectTo: "/" }); }}>
            <button className="text-zinc-400 hover:text-white text-sm">Sign out</button>
          </form>
          {user?.image && (
            <img src={user.image} alt={user.name ?? ""} className="w-8 h-8 rounded-full" />
          )}
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-zinc-400 text-sm mt-1">
              Welcome back, {user?.name?.split(" ")[0] ?? "Developer"}. Time to face the music.
            </p>
          </div>
          <Link
            href="/check/new"
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Check
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <GitPullRequest className="w-5 h-5 text-blue-400" />
              <span className="text-zinc-400 text-sm">Total Checks</span>
            </div>
            <p className="text-3xl font-bold">{recentChecks.length}</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-yellow-400" />
              <span className="text-zinc-400 text-sm">Avg Scope Creep</span>
            </div>
            <p className={`text-3xl font-bold ${avgScore > 60 ? "text-red-400" : avgScore > 30 ? "text-yellow-400" : "text-green-400"}`}>
              {avgScore}/100
            </p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <span className="text-zinc-400 text-sm">Plan</span>
            </div>
            <p className="text-3xl font-bold capitalize">{user?.subscriptionTier?.toLowerCase()}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Checks */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Recent Checks</h2>
            {recentChecks.length === 0 ? (
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
                <GitPullRequest className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                <p className="text-zinc-400">No compliance checks yet.</p>
                <p className="text-zinc-600 text-sm mt-1">Run your first check to find out how badly you strayed.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentChecks.map((check) => (
                  <Link
                    key={check.id}
                    href={`/check/${check.id}`}
                    className="block bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-xl p-4 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="font-medium truncate">{check.prTitle}</p>
                        <p className="text-zinc-500 text-sm truncate mt-1">
                          {check.repoOwner}/{check.repoName} · PR #{check.prNumber}
                        </p>
                        <p className="text-zinc-600 text-xs mt-1 truncate">{check.ticketTitle}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        {check.status === "COMPLETED" && check.scopeCreepScore !== null ? (
                          <span className={`text-sm font-bold ${
                            check.scopeCreepScore > 60 ? "text-red-400" :
                            check.scopeCreepScore > 30 ? "text-yellow-400" : "text-green-400"
                          }`}>
                            {check.scopeCreepScore}/100
                          </span>
                        ) : check.status === "PENDING" || check.status === "RUNNING" ? (
                          <Clock className="w-4 h-4 text-zinc-400 animate-spin" />
                        ) : check.status === "FAILED" ? (
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        )}
                        <span className="text-zinc-600 text-xs">
                          {new Date(check.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Leaderboard */}
          <div>
            <h2 className="text-lg font-semibold mb-4">🏆 Scope Creep Leaders</h2>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              {topCreepers.length === 0 ? (
                <p className="text-zinc-500 text-sm text-center py-4">No data yet</p>
              ) : (
                <div className="space-y-3">
                  {topCreepers.map((creeper, i) => (
                    <div key={creeper.userId} className="flex items-center gap-3">
                      <span className="text-zinc-500 text-sm w-4">{i + 1}</span>
                      <div className="flex-1">
                        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-red-500 rounded-full"
                            style={{ width: `${creeper._avg.scopeCreepScore ?? 0}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-sm font-medium text-red-400 w-12 text-right">
                        {Math.round(creeper._avg.scopeCreepScore ?? 0)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
