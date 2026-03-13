"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  {
    href: "/app",
    label: "Home",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 9.5L12 3l9 6.5V21a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z"
          stroke={active ? "#7B2FFF" : "#ffffff60"}
          strokeWidth="1.8"
          fill={active ? "#7B2FFF20" : "none"}
        />
        <path d="M9 21V13h6v8" stroke={active ? "#7B2FFF" : "#ffffff60"} strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    href: "/app/map",
    label: "Map",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
          stroke={active ? "#7B2FFF" : "#ffffff60"}
          strokeWidth="1.8"
          fill={active ? "#7B2FFF20" : "none"}
        />
        <circle cx="12" cy="9" r="2.5" stroke={active ? "#7B2FFF" : "#ffffff60"} strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    href: "/app/save",
    label: "",
    icon: (/* active */) => (
      <div className="w-12 h-12 rounded-full bg-purple flex items-center justify-center shadow-lg shadow-purple/40 -mt-4">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
    ),
  },
  {
    href: "/app/lists",
    label: "Lists",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="3"
          width="7"
          height="7"
          rx="1.5"
          stroke={active ? "#7B2FFF" : "#ffffff60"}
          strokeWidth="1.8"
          fill={active ? "#7B2FFF20" : "none"}
        />
        <rect
          x="14"
          y="3"
          width="7"
          height="7"
          rx="1.5"
          stroke={active ? "#7B2FFF" : "#ffffff60"}
          strokeWidth="1.8"
          fill={active ? "#7B2FFF20" : "none"}
        />
        <rect
          x="3"
          y="14"
          width="7"
          height="7"
          rx="1.5"
          stroke={active ? "#7B2FFF" : "#ffffff60"}
          strokeWidth="1.8"
          fill={active ? "#7B2FFF20" : "none"}
        />
        <rect
          x="14"
          y="14"
          width="7"
          height="7"
          rx="1.5"
          stroke={active ? "#7B2FFF" : "#ffffff60"}
          strokeWidth="1.8"
          fill={active ? "#7B2FFF20" : "none"}
        />
      </svg>
    ),
  },
  {
    href: "/app/challenges",
    label: "Explore",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke={active ? "#7B2FFF" : "#ffffff60"} strokeWidth="1.8" fill={active ? "#7B2FFF20" : "none"} />
        <path
          d="M16.5 7.5l-3.75 8.25-1.5-4.5-4.5-1.5 8.25-2.25z"
          stroke={active ? "#7B2FFF" : "#ffffff60"}
          strokeWidth="1.5"
          fill={active ? "#7B2FFF" : "none"}
        />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-dark/95 backdrop-blur border-t border-white/[0.08] z-50">
      <div className="flex items-end justify-around px-2 pb-6 pt-2">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 min-w-[48px]"
            >
              {item.icon(active)}
              {item.label && (
                <span
                  className={`text-[10px] font-jakarta font-medium ${
                    active ? "text-purple" : "text-white/40"
                  }`}
                >
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
