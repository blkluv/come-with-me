"use client";

import { useEffect, useRef } from "react";
import { PLACES } from "@/lib/mock-data";

interface Props {
  onSelectPlace: (id: string) => void;
}

const PLACE_COORDS: Record<string, [number, number]> = {
  "1": [-74.0059, 40.7312], // West Village - Sushi Nakazawa
  "2": [-74.0000, 40.7231], // SoHo - Raoul's
  "3": [-73.9538, 40.7128], // Williamsburg - Blank Street
  "4": [-73.9633, 40.7735], // Upper East Side - Bemelmans
  "5": [-73.9963, 40.7231], // Nolita - McNally Jackson
  "6": [-74.0059, 40.7360], // West Village - Joe Coffee
};

function categoryEmoji(category: string) {
  if (category === "Restaurants") return "🍽️";
  if (category === "Coffee") return "☕";
  if (category === "Shopping") return "🛍️";
  return "🍸";
}

export default function MapView({ onSelectPlace }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !token) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let map: any = null;

    (async () => {
      const mapboxgl = (await import("mapbox-gl")).default;
      mapboxgl.accessToken = token;

      map = new mapboxgl.Map({
        container,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [-73.9857, 40.7484],
        zoom: 12.5,
        attributionControl: false,
      });

      map.on("load", () => {
        PLACES.forEach((place) => {
          const coords = PLACE_COORDS[place.id];
          if (!coords) return;

          const el = document.createElement("div");
          el.style.cssText = `
            width: 32px;
            height: 32px;
            background: #7B2FFF;
            border: 2px solid #CAFF33;
            border-radius: 8px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            box-shadow: 0 4px 16px rgba(123,47,255,0.6);
            transition: transform 0.15s;
          `;
          el.innerHTML = categoryEmoji(place.category);
          el.onmouseenter = () => (el.style.transform = "scale(1.2)");
          el.onmouseleave = () => (el.style.transform = "scale(1)");
          el.addEventListener("click", () => onSelectPlace(place.id));

          new mapboxgl.Marker({ element: el }).setLngLat(coords).addTo(map);
        });
      });
    })();

    return () => {
      map?.remove();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!token) {
    return (
      <div
        className="absolute inset-0 bg-[#0d0d0f] flex items-center justify-center"
        style={{
          backgroundImage: `
            linear-gradient(rgba(123,47,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(123,47,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      >
        <div className="flex flex-col items-center gap-3 text-center px-8">
          <div className="w-14 h-14 rounded-2xl bg-purple/20 border border-purple/30 flex items-center justify-center text-3xl">
            🗺️
          </div>
          <p className="font-bricolage font-bold text-white text-lg">Map Preview</p>
          <p className="text-white/40 font-jakarta text-sm">Add NEXT_PUBLIC_MAPBOX_TOKEN to enable the map</p>
          <div className="flex gap-3 mt-2">
            {["🍽️", "☕", "🍸", "🛍️"].map((e, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-lg bg-purple border-2 border-lime flex items-center justify-center text-base shadow-lg shadow-purple/40"
              >
                {e}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}
