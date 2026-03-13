"use client";

import { useState } from "react";
import { CHALLENGES } from "@/lib/mock-data";

const EARNED_BADGES = [
  { emoji: "🌍", label: "Explorer", color: "from-purple-600 to-indigo-600" },
  { emoji: "📍", label: "Pioneer", color: "from-rose-600 to-pink-600" },
  { emoji: "☕", label: "Caffeine", color: "from-amber-600 to-orange-600" },
];

function ProgressBar({ value, total, color }: { value: number; total: number; color: string }) {
  const pct = Math.min((value / total) * 100, 100);
  return (
    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${pct}%`, background: color }}
      />
    </div>
  );
}

export default function ChallengesPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="px-5 pt-14 pb-5">
        <h1 className="font-bricolage font-extrabold text-3xl text-white">Challenges</h1>
        <p className="text-white/40 font-jakarta text-sm mt-0.5">Explore more, earn rewards</p>
      </div>

      {/* Badge shelf */}
      <div className="px-5 pb-6">
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="font-bricolage font-bold text-white text-base">Your Badges</p>
            <span className="text-white/40 text-xs font-jakarta">{EARNED_BADGES.length} earned</span>
          </div>
          <div className="flex gap-3">
            {EARNED_BADGES.map((badge) => (
              <div key={badge.label} className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${badge.color} flex items-center justify-center text-2xl shadow-lg`}
                >
                  {badge.emoji}
                </div>
                <span className="text-white/50 text-[10px] font-jakarta">{badge.label}</span>
              </div>
            ))}
            {/* Locked badge */}
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-dashed border-white/20 flex items-center justify-center text-xl opacity-40">
                🔒
              </div>
              <span className="text-white/30 text-[10px] font-jakarta">Locked</span>
            </div>
          </div>
        </div>
      </div>

      {/* Active challenges */}
      <div className="px-5 pb-6">
        <h2 className="font-bricolage font-bold text-white text-lg mb-3">Active Challenges</h2>
        <div className="flex flex-col gap-3">
          {CHALLENGES.map((challenge) => {
            const isExpanded = expanded === challenge.id;
            const pct = Math.round((challenge.progress / challenge.total) * 100);

            return (
              <button
                key={challenge.id}
                onClick={() => setExpanded(isExpanded ? null : challenge.id)}
                className="w-full text-left bg-white/[0.04] border border-white/[0.08] rounded-2xl p-4 hover:border-white/20 transition-all active:scale-[0.98]"
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ background: `${challenge.color}20`, border: `1px solid ${challenge.color}40` }}
                    >
                      {challenge.badgeEmoji}
                    </div>
                    <div>
                      <p className="font-bricolage font-bold text-white text-sm leading-tight">
                        {challenge.title}
                      </p>
                      <p className="text-white/40 text-xs font-jakarta mt-0.5">{challenge.brand}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className="text-xs font-jakarta font-semibold px-2 py-0.5 rounded-full"
                      style={{ color: challenge.color, background: `${challenge.color}20` }}
                    >
                      {challenge.daysLeft}d left
                    </span>
                  </div>
                </div>

                {/* Progress */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-white/40 text-xs font-jakarta">
                      {challenge.progress} / {challenge.total} completed
                    </span>
                    <span className="text-xs font-jakarta font-semibold" style={{ color: challenge.color }}>
                      {pct}%
                    </span>
                  </div>
                  <ProgressBar
                    value={challenge.progress}
                    total={challenge.total}
                    color={challenge.color}
                  />
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-white/[0.07] flex flex-col gap-3">
                    <p className="text-white/60 font-jakarta text-sm leading-relaxed">
                      {challenge.description}
                    </p>
                    <div
                      className="flex items-center gap-2 rounded-xl px-3 py-2.5"
                      style={{ background: `${challenge.color}15`, border: `1px solid ${challenge.color}30` }}
                    >
                      <span className="text-lg">🎁</span>
                      <div>
                        <p className="text-white/50 text-[10px] font-jakarta uppercase tracking-wide">Reward</p>
                        <p className="font-jakarta font-semibold text-white text-sm">{challenge.reward}</p>
                      </div>
                    </div>
                    <button
                      className="w-full py-3 rounded-xl font-bricolage font-bold text-dark text-base active:scale-95 transition-all"
                      style={{ background: challenge.color === "#CAFF33" ? "#CAFF33" : challenge.color }}
                    >
                      View Challenge Map →
                    </button>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Completed */}
      <div className="px-5 pb-6">
        <h2 className="font-bricolage font-bold text-white text-lg mb-3">Completed</h2>
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-lime/20 flex items-center justify-center text-xl">
            ✅
          </div>
          <div>
            <p className="font-bricolage font-bold text-white text-sm">West Village Weekend</p>
            <p className="text-white/40 text-xs font-jakarta">Completed Feb 28 · NYC Food Guide</p>
          </div>
          <span className="ml-auto text-lime text-lg">🏆</span>
        </div>
      </div>
    </div>
  );
}
