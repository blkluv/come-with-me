"use client";

import { useState } from "react";
import Link from "next/link";

type Step = 1 | 2 | 3;

interface ExtractedPlace {
  name: string;
  neighborhood: string;
  city: string;
  category: string;
  description: string;
  creator: string;
  platform: string;
}

const EXTRACTION_STEPS = [
  "Reading post content...",
  "Identifying the place...",
  "Fetching location details...",
  "Adding to your map...",
];

export default function SavePage() {
  const [step, setStep] = useState<Step>(1);
  const [extracting, setExtracting] = useState(false);
  const [extractedSteps, setExtractedSteps] = useState<number>(0);
  const [result, setResult] = useState<ExtractedPlace | null>(null);
  const [saved, setSaved] = useState(false);

  async function handleExtract() {
    setStep(3);
    setExtracting(true);
    setExtractedSteps(0);

    // Animate steps
    for (let i = 1; i <= 4; i++) {
      await new Promise((r) => setTimeout(r, 700));
      setExtractedSteps(i);
    }

    // Call API
    try {
      const res = await fetch("/api/extract-place", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: "@mayanyc: Sushi Nakazawa in the West Village is an absolute must. Chef Nakazawa trained under Jiro himself — 20-course omakase that will change your life. Book months in advance! #NYC #sushi #omakase #foodie",
          creator: "@mayanyc",
          platform: "tiktok",
        }),
      });
      const data = await res.json();
      setResult(data.place || {
        name: "Sushi Nakazawa",
        neighborhood: "West Village",
        city: "New York",
        category: "Restaurant",
        description: "20-course omakase by Jiro's protégé. Book months in advance.",
        creator: "@mayanyc",
        platform: "tiktok",
      });
    } catch {
      setResult({
        name: "Sushi Nakazawa",
        neighborhood: "West Village",
        city: "New York",
        category: "Restaurant",
        description: "20-course omakase by Jiro's protégé. Book months in advance.",
        creator: "@mayanyc",
        platform: "tiktok",
      });
    }

    setExtracting(false);
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-14 pb-4">
        <Link
          href="/app"
          className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M12 5l-7 7 7 7" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </Link>
        <div>
          <h1 className="font-bricolage font-extrabold text-white text-xl">Save a Place</h1>
          <p className="text-white/40 text-xs font-jakarta">From TikTok or Instagram</p>
        </div>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 px-5 pb-6">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-jakarta font-bold transition-all ${
                step === s
                  ? "bg-purple text-white"
                  : step > s
                  ? "bg-lime text-dark"
                  : "bg-white/10 text-white/40"
              }`}
            >
              {step > s ? "✓" : s}
            </div>
            {s < 3 && (
              <div className={`flex-1 h-px w-8 transition-all ${step > s ? "bg-lime" : "bg-white/10"}`} />
            )}
          </div>
        ))}
        <span className="ml-2 text-white/40 text-xs font-jakarta">
          {step === 1 ? "The post" : step === 2 ? "Share sheet" : "Saving..."}
        </span>
      </div>

      <div className="flex-1 px-5">
        {/* STEP 1: TikTok post */}
        {step === 1 && (
          <div className="flex flex-col gap-5">
            <p className="text-white/60 font-jakarta text-sm">
              Here&apos;s a post you spotted from your feed:
            </p>

            {/* TikTok post mockup */}
            <div className="bg-black rounded-3xl overflow-hidden border border-white/10">
              {/* Video area */}
              <div className="h-72 bg-gradient-to-b from-indigo-900 via-purple-900 to-black relative flex items-end p-4">
                {/* Fake video content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-3">🍣</div>
                    <p className="text-white/60 text-sm font-jakarta">sushi nakazawa, nyc</p>
                  </div>
                </div>
                {/* Right action bar */}
                <div className="absolute right-3 bottom-16 flex flex-col items-center gap-5">
                  {[
                    { icon: "❤️", count: "42.1K" },
                    { icon: "💬", count: "1.2K" },
                    { icon: "🔖", count: "18.4K" },
                    { icon: "↗️", count: "Share" },
                  ].map(({ icon, count }) => (
                    <div key={count} className="flex flex-col items-center gap-1">
                      <span className="text-2xl">{icon}</span>
                      <span className="text-white text-[10px] font-jakarta">{count}</span>
                    </div>
                  ))}
                </div>
                {/* Bottom info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">M</div>
                    <span className="text-white font-jakarta font-semibold text-sm">@mayanyc</span>
                    <span className="text-white/50 text-xs">· Follow</span>
                  </div>
                  <p className="text-white text-xs font-jakarta leading-relaxed line-clamp-2">
                    Sushi Nakazawa in the West Village is an absolute must 🍣 Chef Nakazawa trained under Jiro himself — 20-course omakase that will change your life. Book months in advance! #NYC #sushi #omakase
                  </p>
                </div>
              </div>
              {/* TikTok bottom bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-black">
                <div className="flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white" opacity="0.6">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                  </svg>
                  <div className="flex-1 h-1 bg-white/20 rounded-full w-40">
                    <div className="w-1/3 h-full bg-white rounded-full" />
                  </div>
                </div>
                <span className="text-white/40 text-xs font-jakarta">0:24 / 1:12</span>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-lime text-dark font-bricolage font-extrabold text-lg py-4 rounded-xl active:scale-95 transition-all"
            >
              Save this Place →
            </button>
          </div>
        )}

        {/* STEP 2: iOS Share sheet */}
        {step === 2 && (
          <div className="flex flex-col gap-4">
            <p className="text-white/60 font-jakarta text-sm">
              On your phone, tap the share button and select <strong className="text-white">Come With Me</strong>:
            </p>

            {/* iOS share sheet mockup */}
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              {/* Preview card at top */}
              <div className="bg-[#F2EDE4] p-4">
                <div className="flex items-center gap-3 bg-white rounded-2xl p-3 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-800 to-purple-900 flex-shrink-0 flex items-center justify-center text-xl">
                    🍣
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">@mayanyc on TikTok</p>
                    <p className="text-gray-500 text-xs truncate">Sushi Nakazawa in the West Village...</p>
                  </div>
                </div>
              </div>

              {/* App icons row */}
              <div className="bg-[#F2EDE4] px-4 pb-4">
                <div className="flex justify-between overflow-x-auto gap-3 pb-1">
                  {[
                    { emoji: "💬", label: "Messages", bg: "bg-green-500" },
                    { emoji: "📧", label: "Mail", bg: "bg-blue-500" },
                    { emoji: "📋", label: "Notes", bg: "bg-yellow-400" },
                    { emoji: "🔗", label: "Copy", bg: "bg-gray-500" },
                  ].map(({ emoji, label, bg }) => (
                    <div key={label} className="flex flex-col items-center gap-1.5 flex-shrink-0">
                      <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center text-2xl shadow-sm`}>
                        {emoji}
                      </div>
                      <span className="text-gray-600 text-[10px]">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="bg-[#F2EDE4] px-4">
                <div className="border-t border-gray-200" />
              </div>

              {/* Actions list */}
              <div className="bg-[#F2EDE4] p-2">
                {/* Come With Me — highlighted */}
                <button
                  onClick={handleExtract}
                  className="w-full flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-sm mb-2 active:scale-[0.98] transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center flex-shrink-0 relative">
                    <span className="text-white font-serif italic text-base font-bold">CW</span>
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-bold px-1 rounded-full">
                      NEW
                    </span>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-900 text-sm">Come With Me</p>
                    <p className="text-gray-400 text-xs">Tap to instantly save this place</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18l6-6-6-6" stroke="#C7C7CC" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>

                {[
                  { icon: "📌", label: "Add to Maps" },
                  { icon: "📤", label: "AirDrop" },
                  { icon: "🔖", label: "Add Bookmark" },
                ].map(({ icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 px-4 py-3 border-t border-gray-100 first:border-0"
                  >
                    <span className="text-xl w-8 text-center">{icon}</span>
                    <span className="text-gray-800 text-sm">{label}</span>
                  </div>
                ))}
              </div>

              {/* Cancel */}
              <div className="bg-[#F2EDE4] p-3">
                <div className="bg-white rounded-2xl py-3 text-center">
                  <span className="text-blue-500 font-semibold text-base">Cancel</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Extraction */}
        {step === 3 && (
          <div className="flex flex-col gap-5">
            {/* Extraction animation */}
            <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-2 h-2 rounded-full ${extracting ? "bg-lime animate-pulse" : "bg-lime"}`} />
                <p className="text-white/60 font-jakarta text-xs uppercase tracking-widest">
                  {extracting ? "AI Extraction" : "Extraction complete"}
                </p>
              </div>
              {EXTRACTION_STEPS.map((s, i) => (
                <div key={s} className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      extractedSteps > i
                        ? "bg-lime"
                        : extractedSteps === i
                        ? "border-2 border-lime animate-pulse bg-transparent"
                        : "border border-white/20 bg-transparent"
                    }`}
                  >
                    {extractedSteps > i && (
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="#111113" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>
                  <span
                    className={`font-jakarta text-sm transition-colors ${
                      extractedSteps > i ? "text-white" : extractedSteps === i ? "text-lime" : "text-white/30"
                    }`}
                  >
                    {s}
                  </span>
                </div>
              ))}
            </div>

            {/* Result card */}
            {result && !extracting && (
              <div className="flex flex-col gap-4">
                <div className="bg-white/[0.04] border border-lime/30 rounded-2xl overflow-hidden">
                  {/* Place info */}
                  <div className="p-4 flex gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center text-2xl flex-shrink-0">
                      🍣
                    </div>
                    <div className="flex-1">
                      <h2 className="font-bricolage font-extrabold text-white text-xl leading-tight">
                        {result.name}
                      </h2>
                      <p className="text-white/50 font-jakarta text-sm mt-0.5">
                        {result.neighborhood} · {result.city}
                      </p>
                      <span className="inline-block mt-1.5 px-2 py-0.5 bg-purple/20 border border-purple/30 rounded-full text-purple text-xs font-jakarta font-semibold">
                        {result.category}
                      </span>
                    </div>
                  </div>
                  {/* Description */}
                  <div className="px-4 pb-3">
                    <p className="text-white/60 font-jakarta text-sm leading-relaxed">
                      {result.description}
                    </p>
                  </div>
                  {/* Creator attribution */}
                  <div className="border-t border-white/[0.07] px-4 py-3 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                      M
                    </div>
                    <span className="text-white/60 text-xs font-jakarta">
                      Saved from <span className="text-white font-semibold">{result.creator}</span> on{" "}
                      <span className="text-white font-semibold capitalize">{result.platform}</span>
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3 text-white/60 font-jakarta font-semibold text-sm hover:border-white/20 transition-colors">
                    Add to List
                  </button>
                  <button
                    onClick={() => setSaved(true)}
                    className={`flex-1 rounded-xl py-3 font-bricolage font-bold text-base transition-all ${
                      saved
                        ? "bg-lime/20 border border-lime/40 text-lime"
                        : "bg-lime text-dark active:scale-95"
                    }`}
                  >
                    {saved ? "✓ Saved to Map" : "Save to Map →"}
                  </button>
                </div>

                {saved && (
                  <Link
                    href="/app"
                    className="text-center text-purple font-jakarta font-semibold text-sm py-2"
                  >
                    View on your map →
                  </Link>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
