"use client";

import { useState } from "react";
import { LISTS, PLACES } from "@/lib/mock-data";
import type { PlaceList } from "@/lib/mock-data";

function CollabAvatars({ names }: { names: string[] }) {
  const colors = ["bg-purple", "bg-pink-500", "bg-emerald-500", "bg-amber-500"];
  return (
    <div className="flex -space-x-2">
      {names.slice(0, 3).map((n, i) => (
        <div
          key={i}
          className={`w-6 h-6 rounded-full ${colors[i % colors.length]} border-2 border-dark flex items-center justify-center text-[10px] font-bold text-white`}
        >
          {n}
        </div>
      ))}
      {names.length > 3 && (
        <div className="w-6 h-6 rounded-full bg-white/20 border-2 border-dark flex items-center justify-center text-[9px] text-white/60 font-bold">
          +{names.length - 3}
        </div>
      )}
    </div>
  );
}

function ListCard({ list, onClick }: { list: PlaceList; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white/[0.04] border border-white/[0.08] rounded-2xl overflow-hidden hover:border-white/20 transition-colors active:scale-[0.98]"
    >
      {/* Gradient banner */}
      <div className={`h-20 bg-gradient-to-br ${list.gradient} relative flex items-end p-3`}>
        <div className="absolute inset-0 bg-black/20" />
        <span className="text-3xl relative z-10">{list.emoji}</span>
        {list.isShared && (
          <span className="absolute top-2 right-2 text-[10px] font-jakarta font-semibold text-white/80 bg-black/40 backdrop-blur px-2 py-0.5 rounded-full">
            Shared
          </span>
        )}
      </div>
      {/* Info */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div>
          <p className="font-bricolage font-bold text-white text-base">{list.name}</p>
          <p className="text-white/40 text-xs font-jakarta mt-0.5">{list.placeCount} places</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <CollabAvatars names={list.collaborators} />
          {list.isShared && (
            <button className="text-purple text-xs font-jakarta font-semibold">
              + Invite
            </button>
          )}
        </div>
      </div>
    </button>
  );
}

function ListDetail({ list, onBack }: { list: PlaceList; onBack: () => void }) {
  const listPlaces = PLACES.slice(0, Math.min(list.placeCount, PLACES.length));

  return (
    <div>
      {/* Header banner */}
      <div className={`h-48 bg-gradient-to-br ${list.gradient} relative`}>
        <div className="absolute inset-0 bg-black/30" />
        <button
          onClick={onBack}
          className="absolute top-14 left-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur flex items-center justify-center"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M12 5l-7 7 7 7" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <div className="absolute bottom-4 left-5 right-5">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-white/70 text-sm font-jakarta">{list.emoji}</p>
              <h1 className="font-bricolage font-extrabold text-white text-2xl leading-tight">
                {list.name}
              </h1>
              <p className="text-white/60 text-xs font-jakarta mt-1">
                {list.placeCount} places · Updated 2 days ago
              </p>
            </div>
            <CollabAvatars names={list.collaborators} />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 px-5 py-4">
        <button className="flex-1 bg-purple text-white font-jakarta font-semibold text-sm py-2.5 rounded-xl">
          + Add Place
        </button>
        <button className="flex-1 bg-white/5 border border-white/10 text-white/60 font-jakarta font-semibold text-sm py-2.5 rounded-xl">
          Share List
        </button>
      </div>

      {/* Places */}
      <div className="px-5 flex flex-col gap-2 mb-6">
        <h2 className="font-bricolage font-bold text-white text-base mb-1">Places</h2>
        {listPlaces.map((place) => (
          <div
            key={place.id}
            className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.07] rounded-2xl p-3"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${place.gradient} flex-shrink-0 flex items-center justify-center`}>
              <span className="text-base">
                {place.category === "Restaurants" ? "🍽️" :
                 place.category === "Coffee" ? "☕" :
                 place.category === "Shopping" ? "🛍️" : "🍸"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bricolage font-bold text-white text-sm">{place.name}</p>
              <p className="text-white/40 text-xs font-jakarta">{place.neighborhood} · {place.creator}</p>
            </div>
            <span className="text-lime text-xs font-semibold font-jakarta">★ {place.rating}</span>
          </div>
        ))}
      </div>

      {/* Activity feed */}
      <div className="px-5 mb-6">
        <h2 className="font-bricolage font-bold text-white text-base mb-3">Activity</h2>
        <div className="flex flex-col gap-3">
          {[
            { avatar: "M", name: "Maya", action: "added Sushi Nakazawa", time: "2h ago", color: "bg-pink-500" },
            { avatar: "S", name: "You", action: "saved Joe Coffee", time: "1d ago", color: "bg-purple" },
            { avatar: "K", name: "Kat", action: "invited 2 friends", time: "3d ago", color: "bg-emerald-500" },
          ].map((a) => (
            <div key={a.name + a.time} className="flex items-center gap-3">
              <div className={`w-7 h-7 rounded-full ${a.color} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>
                {a.avatar}
              </div>
              <p className="text-white/60 text-sm font-jakarta flex-1">
                <span className="text-white font-semibold">{a.name}</span> {a.action}
              </p>
              <span className="text-white/30 text-xs font-jakarta">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ListsPage() {
  const [selectedList, setSelectedList] = useState<PlaceList | null>(null);

  if (selectedList) {
    return <ListDetail list={selectedList} onBack={() => setSelectedList(null)} />;
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="px-5 pt-14 pb-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bricolage font-extrabold text-3xl text-white">My Lists</h1>
            <p className="text-white/40 font-jakarta text-sm mt-0.5">{LISTS.length} collections</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-purple/20 border border-purple/30 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="#7B2FFF" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Lists grid */}
      <div className="px-5 grid grid-cols-2 gap-3 pb-6">
        {LISTS.map((list) => (
          <ListCard key={list.id} list={list} onClick={() => setSelectedList(list)} />
        ))}
      </div>

      {/* Create new */}
      <div className="px-5 pb-6">
        <button className="w-full border-2 border-dashed border-white/15 rounded-2xl py-5 flex flex-col items-center gap-2 hover:border-purple/40 transition-colors">
          <span className="text-2xl">✨</span>
          <span className="text-white/50 font-jakarta text-sm">Create a new list</span>
        </button>
      </div>
    </div>
  );
}
