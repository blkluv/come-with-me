"use client";

import { useEffect, useRef } from "react";
import { PLACES } from "@/lib/mock-data";

interface Props {
  onSelectPlace: (id: string) => void;
}

// NYC coordinates for each place (approximate)
const PLACE_COORDS: Record<string, [number, number]> = {
  "1": [-74.0059, 40.7312], // West Village
  "2": [-74.0000, 40.7231], // SoHo
  "3": [-73.9538, 40.7128], // Williamsburg
  "4": [-73.9633, 40.7735], // Upper East Side
  "5": [-73.9963, 40.7231], // Nolita
  "6": [-74.0059, 40.7360], // West Village
};

export default function MapView({ onSelectPlace }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    if (!token) {
      // Render a styled placeholder when no token
      return;
    }

    async function initMap() {
      const mapboxgl = (await import("mapbox-gl")).default;

      // Inject Mapbox CSS once
      if (!document.getElementById("mapbox-css")) {
        const link = document.createElement("link");
        link.id = "mapbox-css";
        link.rel = "stylesheet";
        link.href = "https://api.mapbox.com/mapbox-gl-js/v3.0.0/mapbox-gl.css";
        document.head.appendChild(link);
      }

      mapboxgl.accessToken = token!;
      const map = new mapboxgl.Map({
        container: mapRef.current!,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [-73.9857, 40.7484],
        zoom: 12.5,
      });

      mapInstanceRef.current = map;

      map.on("load", () => {
        PLACES.forEach((place) => {
          const coords = PLACE_COORDS[place.id];
          if (!coords) return;

          // Custom purple marker
          const el = document.createElement("div");
          el.style.cssText = `
            width: 28px; height: 28px;
            background: #7B2FFF;
            border: 2px solid #CAFF33;
            border-radius: 6px;
            cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            font-size: 13px;
            box-shadow: 0 4px 12px rgba(123,47,255,0.5);
          `;
          el.innerHTML =
            place.category === "Restaurants" ? "🍽️" :
            place.category === "Coffee" ? "☕" :
            place.category === "Shopping" ? "🛍️" : "🍸";
          el.addEventListener("click", () => onSelectPlace(place.id));

          new mapboxgl.Marker(el).setLngLat(coords).addTo(map);
        });
      });
    }

    initMap();
  }, [token, onSelectPlace]);

  if (!token) {
    return (
      <div
        ref={mapRef}
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
          <p className="text-white/40 font-jakarta text-sm">
            Add your Mapbox token to enable the interactive dark map
          </p>
          {/* Fake pins */}
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

  return <div ref={mapRef} className="absolute inset-0" />;
}
