"use client";

import { useState } from "react";
import { CHALLENGES } from "@/lib/mock-data";

const EARNED_BADGES = [
  { emoji: "🌍", label: "Explorer", color: "from-purple-700 to-indigo-700" },
  { emoji: "📍", label: "Pioneer", color: "from-rose-700 to-pink-700" },
  { emoji: "☕", label: "Caffeine", color: "from-amber-700 to-orange-700" },
];

const LOCKED_BADGES = [
  { emoji: "🏆", label: "Champion" },
  { emoji: "💎", label: "Hidden" },
];

function ProgressBar({ value, total }: { value: number; total: number }) {
  const pct = Math.min((value / total) * 100, 100);
  return (
    <div className="h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
      <div
        className="h-full rounded-full bg-lime transition-all duration-700"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export default function ChallengesPage() {
  const [expanded, setExpanded] = useState<string | null>(CHALLENGES[0].id);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="px-5 pt-14 pb-6">
        <p className="text-white/40 text-xs font-jakarta uppercase tracking-widest mb-1">Brand Partnerships</p>
        <h1 className="font-bricolage font-extrabold text-3xl text-white leading-tight">
          Challenges
        </h1>
        <p className="text-white/40 font-jakarta text-sm mt-1">
          Explore the city, earn exclusive rewards
        </p>
      </div>

      {/* Active challenges */}
      <div className="px-5 pb-6">
        <div className="flex flex-col gap-3">
          {CHALLENGES.map((challenge) => {
            const isExpanded = expanded === challenge.id;
            const pct = Math.round((challenge.progress / challenge.total) * 100);

            return (
              <div
                key={challenge.id}
                className={`rounded-2xl border overflow-hidden transition-all duration-200 ${
                  isExpanded
                    ? "border-lime/30 bg-white/[0.05]"
                    : "border-white/[0.07] bg-white/[0.03]"
                }`}
              >
                <button
                  onClick={() => setExpanded(isExpanded ? null : challenge.id)}
                  className="w-full text-left p-4"
                >
                  {/* Brand label */}
                  <p className="text-white/30 text-[10px] font-jakarta uppercase tracking-widest mb-2">
                    {challenge.brand}
                  </p>

                  {/* Top row */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-lime/10 border border-lime/20 flex items-center justify-center text-2xl flex-shrink-0">
                      {challenge.badgeEmoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-bricolage font-bold text-white text-base leading-tight">
                          {challenge.title}
                        </p>
                        <span className="flex-shrink-0 text-[10px] font-jakarta font-semibold text-lime/80 bg-lime/10 border border-lime/20 px-2 py-0.5 rounded-full">
                          {challenge.daysLeft}d left
                        </span>
                      </div>
                      <p className="text-white/40 text-xs font-jakarta mt-1 line-clamp-1">
                        {challenge.progress} / {challenge.total} completed
                      </p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <ProgressBar value={challenge.progress} total={challenge.total} />
                    </div>
                    <span className="text-lime text-xs font-jakarta font-bold flex-shrink-0">
                      {pct}%
                    </span>
                  </div>
                </button>

                {/* Expanded */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-white/[0.06] pt-4 flex flex-col gap-3">
                    <p className="text-white/55 font-jakarta text-sm leading-relaxed">
                      {challenge.description}
                    </p>

                    {/* Reward pill */}
                    <div className="flex items-center gap-3 bg-lime/[0.07] border border-lime/20 rounded-xl px-4 py-3">
                      <div className="flex-1">
                        <p className="text-white/40 text-[10px] font-jakarta uppercase tracking-widest">Reward</p>
                        <p className="font-jakarta font-semibold text-white text-sm mt-0.5">
                          {challenge.reward}
                        </p>
                      </div>
                    </div>

                    <button className="w-full bg-lime text-dark font-bricolage font-bold text-base py-3 rounded-xl active:scale-95 transition-all">
                      View Challenge Map →
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Completed */}
      <div className="px-5 pb-6">
        <h2 className="font-bricolage font-bold text-white/60 text-sm uppercase tracking-widest mb-3">
          Completed
        </h2>
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-lime/10 border border-lime/20 flex items-center justify-center text-xl">
            ✅
          </div>
          <div className="flex-1">
            <p className="font-bricolage font-bold text-white text-sm">West Village Weekend</p>
            <p className="text-white/30 text-xs font-jakarta mt-0.5">Completed Feb 28 · NYC Food Guide</p>
          </div>
          <span className="text-xl">🏆</span>
        </div>
      </div>

      {/* Badge shelf */}
      <div className="px-5 pb-8">
        <h2 className="font-bricolage font-bold text-white/60 text-sm uppercase tracking-widest mb-3">
          Your Badges
        </h2>
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4">
          <div className="flex gap-4">
            {EARNED_BADGES.map((badge) => (
              <div key={badge.label} className="flex flex-col items-center gap-2">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${badge.color} flex items-center justify-center text-2xl shadow-lg shadow-black/40`}
                >
                  {badge.emoji}
                </div>
                <span className="text-white/50 text-[10px] font-jakarta">{badge.label}</span>
              </div>
            ))}
            {LOCKED_BADGES.map((badge) => (
              <div key={badge.label} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-dashed border-white/15 flex items-center justify-center text-xl">
                  <span className="opacity-20 text-2xl">{badge.emoji}</span>
                </div>
                <span className="text-white/20 text-[10px] font-jakarta">{badge.label}</span>
              </div>
            ))}
          </div>
          <p className="text-white/25 text-xs font-jakarta mt-3">
            Complete challenges to unlock more badges
          </p>
        </div>
      </div>
    </div>
  );
}
