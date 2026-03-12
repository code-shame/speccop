"use client";

interface LeaderboardEntry {
  userId: string;
  userName: string;
  avgScore: number;
  checkCount: number;
  rank: number;
}

interface Props {
  entries: LeaderboardEntry[];
  currentUserId?: string;
}

export default function LeaderboardTable({ entries, currentUserId }: Props) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-8 text-zinc-500">
        <p>No leaderboard data yet.</p>
        <p className="text-sm mt-1">Run some compliance checks to get on the board.</p>
      </div>
    );
  }

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-800">
            <th className="text-left text-zinc-500 font-medium pb-3 pr-4">#</th>
            <th className="text-left text-zinc-500 font-medium pb-3 pr-4">Developer</th>
            <th className="text-right text-zinc-500 font-medium pb-3 pr-4">Avg Score</th>
            <th className="text-right text-zinc-500 font-medium pb-3">Checks</th>
          </tr>
        </thead>
        <tbody className="space-y-2">
          {entries.map((entry) => {
            const isCurrentUser = entry.userId === currentUserId;
            return (
              <tr
                key={entry.userId}
                className={`border-b border-zinc-900 ${isCurrentUser ? "bg-zinc-800/30" : ""}`}
              >
                <td className="py-3 pr-4 text-zinc-400">
                  {entry.rank <= 3 ? medals[entry.rank - 1] : entry.rank}
                </td>
                <td className="py-3 pr-4">
                  <span className={`font-medium ${isCurrentUser ? "text-red-400" : "text-zinc-200"}`}>
                    {entry.userName}
                    {isCurrentUser && <span className="text-zinc-500 text-xs ml-2">(you)</span>}
                  </span>
                </td>
                <td className="py-3 pr-4 text-right">
                  <span
                    className={`font-bold ${
                      entry.avgScore > 60
                        ? "text-red-400"
                        : entry.avgScore > 30
                          ? "text-yellow-400"
                          : "text-green-400"
                    }`}
                  >
                    {entry.avgScore}/100
                  </span>
                </td>
                <td className="py-3 text-right text-zinc-400">{entry.checkCount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
