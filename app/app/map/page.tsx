"use client";

import { useState } from "react";
import MapView from "@/components/MapView";
import { PLACES } from "@/lib/mock-data";

export default function MapPage() {
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(true);

  const selected = PLACES.find((p) => p.id === selectedPlace);

  return (
    <>
      {/* Map fills the viewport behind everything */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <MapView onSelectPlace={setSelectedPlace} />
      </div>

      {/* UI overlays */}
      <div style={{ position: "relative", zIndex: 10, height: "100vh", pointerEvents: "none" }}>

        {/* Floating search bar */}
        <div style={{ pointerEvents: "auto" }} className="absolute top-14 left-4 right-4">
          <div className="flex items-center gap-3 bg-dark/90 backdrop-blur border border-white/15 rounded-2xl px-4 py-3 shadow-lg">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="#ffffff60" strokeWidth="2" />
              <path d="M16.5 16.5l4 4" stroke="#ffffff60" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="text-white/30 font-jakarta text-sm flex-1">Search saved places...</span>
            <div className="flex items-center gap-1.5 bg-purple/20 border border-purple/30 rounded-full px-2.5 py-1">
              <span className="text-purple text-xs font-jakarta font-semibold">NYC</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="#7B2FFF" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>

        {/* Filter pills */}
        <div style={{ pointerEvents: "auto" }} className="absolute top-28 left-4 right-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-none">
            {["All", "Restaurants", "Coffee", "Bars", "Shopping"].map((f, i) => (
              <button
                key={f}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-jakarta font-semibold transition-all border ${
                  i === 0
                    ? "bg-purple border-purple text-white"
                    : "bg-dark/80 backdrop-blur border-white/20 text-white/60 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom sheet */}
        <div
          style={{ pointerEvents: "auto" }}
          className={`absolute bottom-0 left-0 right-0 transition-transform duration-300 ${
            sheetOpen ? "translate-y-0" : "translate-y-[calc(100%-60px)]"
          }`}
        >
          <div className="bg-dark/95 backdrop-blur border-t border-white/10 rounded-t-3xl">
            <button
              onClick={() => setSheetOpen(!sheetOpen)}
              className="w-full flex flex-col items-center pt-3 pb-2"
            >
              <div className="w-10 h-1 bg-white/20 rounded-full" />
            </button>

            <div className="flex items-center justify-between px-5 py-2">
              <div>
                <h2 className="font-bricolage font-bold text-white text-lg">Nearby Places</h2>
                <p className="text-white/40 text-xs font-jakarta">
                  {selected ? selected.name : "6 saved spots in this area"}
                </p>
              </div>
              <button className="text-purple font-jakarta font-semibold text-sm">Filter</button>
            </div>

            <div className="flex flex-col pb-28 max-h-72 overflow-y-auto">
              {PLACES.map((place, i) => (
                <button
                  key={place.id}
                  onClick={() => setSelectedPlace(place.id === selectedPlace ? null : place.id)}
                  className={`flex items-center gap-3 px-5 py-3 text-left transition-colors ${
                    place.id === selectedPlace ? "bg-purple/10" : i % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${place.gradient} flex-shrink-0 flex items-center justify-center`}>
                    <span className="text-base">
                      {place.category === "Restaurants" ? "🍽️" :
                       place.category === "Coffee" ? "☕" :
                       place.category === "Shopping" ? "🛍️" : "🍸"}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bricolage font-bold text-white text-sm truncate">{place.name}</p>
                    <p className="text-white/40 text-xs font-jakarta">{place.neighborhood} · {place.creator}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-lime text-xs font-jakarta font-semibold">★ {place.rating}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
