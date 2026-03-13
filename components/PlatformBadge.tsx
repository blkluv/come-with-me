export function TikTokBadge() {
  return (
    <span className="inline-flex items-center gap-1 bg-black border border-white/10 text-white text-[10px] font-jakarta font-semibold px-1.5 py-0.5 rounded-full">
      <svg width="8" height="9" viewBox="0 0 24 27" fill="white">
        <path d="M22.5 5.5C20.7 5.5 19.2 4 19.2 2.2V0h-4v18.6c0 2-1.6 3.6-3.6 3.6s-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6c.3 0 .7 0 1 .1V11c-.3 0-.7-.1-1-.1C5.5 10.9 1.5 14.9 1.5 19.9S5.5 28.9 10.5 28.9s9-4 9-9V9.3c1.6 1 3.4 1.6 5.4 1.6V7c-1 0-1.9-.5-2.4-1.5z" />
      </svg>
      TikTok
    </span>
  );
}

export function InstagramBadge() {
  return (
    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-[10px] font-jakarta font-semibold px-1.5 py-0.5 rounded-full">
      <svg width="8" height="8" viewBox="0 0 24 24" fill="white">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="2" fill="none" />
        <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="2" fill="none" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="white" />
      </svg>
      Instagram
    </span>
  );
}
