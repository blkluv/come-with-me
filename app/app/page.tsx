"use client";

import { useState } from "react";
import Link from "next/link";
import { PLACES } from "@/lib/mock-data";
import { TikTokBadge, InstagramBadge } from "@/components/PlatformBadge";

const FILTERS = ["All", "Restaurants", "Coffee", "Shopping", "Bars"];

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-lime text-xs font-semibold font-jakarta">★ {rating}</span>
  );
}

function PriceLevel({ level }: { level: number }) {
  return (
    <span className="text-white/30 text-xs font-jakarta">
      {"$".repeat(level)}
    </span>
  );
}

export default function AppHome() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [savedIds, setSavedIds] = useState<Set<string>>(
    new Set(PLACES.filter((p) => p.saved).map((p) => p.id))
  );

  const filtered =
    activeFilter === "All"
      ? PLACES
      : PLACES.filter((p) => p.category === activeFilter);

  const featuredPlaces = PLACES.slice(0, 4);

  function toggleSave(id: string) {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-purple flex items-center justify-center text-white font-bricolage font-bold text-sm">
            S
          </div>
          <div>
            <p className="text-white/40 text-xs font-jakarta">Good morning</p>
            <p className="text-white font-bricolage font-bold text-sm leading-tight">Sabrina</p>
          </div>
        </div>
        <button className="relative w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute top-2 right-2 w-2 h-2 bg-lime rounded-full" />
        </button>
      </div>

      {/* City header */}
      <div className="px-5 pb-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-white/40 text-sm font-jakarta">📍 New York City</span>
        </div>
        <h1 className="font-bricolage font-extrabold text-4xl text-white leading-tight">
          Discover{" "}
          <span className="text-lime">NYC</span>
        </h1>

        {/* Stats row */}
        <div className="flex items-center gap-4 mt-3">
          {[
            { label: "places", value: "847" },
            { label: "saved", value: "24" },
            { label: "following", value: "12" },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-baseline gap-1">
              <span className="text-white font-bricolage font-bold text-lg">{value}</span>
              <span className="text-white/40 text-xs font-jakarta">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="px-5 pb-4">
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="#ffffff60" strokeWidth="2" />
            <path d="M16.5 16.5l4 4" stroke="#ffffff60" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="text-white/30 font-jakarta text-sm">Search places, creators...</span>
        </div>
      </div>

      {/* Filter chips */}
      <div className="px-5 pb-5">
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-jakarta font-semibold transition-all duration-150 ${
                activeFilter === f
                  ? "bg-purple text-white"
                  : "bg-white/5 border border-white/10 text-white/50 hover:text-white/80"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Featured horizontal scroll */}
      <div className="pb-5">
        <div className="flex items-center justify-between px-5 mb-3">
          <h2 className="font-bricolage font-bold text-white text-lg">Featured</h2>
          <button className="text-purple text-sm font-jakarta font-semibold">See all</button>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-none px-5 pb-2">
          {featuredPlaces.map((place) => (
            <div
              key={place.id}
              className={`flex-shrink-0 w-52 rounded-2xl bg-gradient-to-br ${place.gradient} border border-white/10 overflow-hidden`}
            >
              {/* Card image area */}
              <div className="h-32 relative p-3 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  {place.platform === "tiktok" ? <TikTokBadge /> : <InstagramBadge />}
                  <button
                    onClick={() => toggleSave(place.id)}
                    className="w-7 h-7 rounded-full bg-black/30 backdrop-blur flex items-center justify-center"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"
                        stroke={savedIds.has(place.id) ? "#CAFF33" : "white"}
                        strokeWidth="2"
                        fill={savedIds.has(place.id) ? "#CAFF33" : "none"}
                      />
                    </svg>
                  </button>
                </div>
                <div>
                  <p className="text-white/50 text-xs font-jakarta">{place.creator}</p>
                </div>
              </div>
              {/* Card info */}
              <div className="bg-black/30 backdrop-blur px-3 py-2.5">
                <p className="font-bricolage font-bold text-white text-sm leading-tight">{place.name}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-white/50 text-xs font-jakarta">{place.neighborhood}</p>
                  <div className="flex items-center gap-1.5">
                    <StarRating rating={place.rating} />
                    <PriceLevel level={place.priceLevel} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Place list */}
      <div className="px-5 pb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bricolage font-bold text-white text-lg">
            {activeFilter === "All" ? "All Places" : activeFilter}
          </h2>
          <span className="text-white/30 text-sm font-jakarta">{filtered.length} spots</span>
        </div>
        <div className="flex flex-col gap-2">
          {filtered.map((place) => (
            <div
              key={place.id}
              className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.07] rounded-2xl p-3"
            >
              {/* Color dot */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${place.gradient} flex-shrink-0 flex items-center justify-center`}>
                <span className="text-lg">
                  {place.category === "Restaurants" ? "🍽️" :
                   place.category === "Coffee" ? "☕" :
                   place.category === "Shopping" ? "🛍️" : "🍸"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-bricolage font-bold text-white text-sm truncate">{place.name}</p>
                  <StarRating rating={place.rating} />
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-white/40 text-xs font-jakarta">{place.neighborhood}</span>
                  <span className="text-white/20 text-xs">·</span>
                  <span className="text-white/40 text-xs font-jakarta">{place.creator}</span>
                </div>
              </div>
              <button
                onClick={() => toggleSave(place.id)}
                className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"
                    stroke={savedIds.has(place.id) ? "#CAFF33" : "#ffffff60"}
                    strokeWidth="2"
                    fill={savedIds.has(place.id) ? "#CAFF33" : "none"}
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Save CTA */}
      <div className="px-5 pb-6">
        <Link
          href="/app/save"
          className="flex items-center justify-center gap-2 w-full bg-purple/20 border border-purple/40 rounded-2xl py-4 text-purple font-bricolage font-bold text-base hover:bg-purple/30 transition-colors"
        >
          <span className="text-xl">+</span>
          Save a place from TikTok or Instagram
        </Link>
      </div>
    </div>
  );
}
