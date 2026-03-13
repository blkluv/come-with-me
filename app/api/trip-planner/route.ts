import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SAVED_PLACES = [
  "Sushi Nakazawa (West Village, Omakase restaurant, ★4.9, $$$$)",
  "Raoul's (SoHo, French bistro, ★4.7, $$$)",
  "Blank Street Coffee (Williamsburg, Coffee, ★4.5, $$)",
  "The Bar at Bemelmans (Upper East Side, Bar, ★4.8, $$$$)",
  "McNally Jackson (Nolita, Bookshop, ★4.6, $$)",
  "Joe Coffee (West Village, Coffee, ★4.4, $$)",
];

export async function POST(req: NextRequest) {
  const { request } = await req.json();

  if (!request) return NextResponse.json({ error: "No request" }, { status: 400 });

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({
      itinerary: [
        { time: "10:00 AM", place: "Joe Coffee", note: "Start with a single-origin pour over to wake up." },
        { time: "11:30 AM", place: "McNally Jackson", note: "Browse the stacks — great staff picks section." },
        { time: "1:00 PM", place: "Raoul's", note: "Legendary steak au poivre for lunch. Go early to beat the crowd." },
        { time: "8:00 PM", place: "Sushi Nakazawa", note: "End with the 20-course omakase. You'll need a reservation." },
      ],
    });
  }

  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 512,
    messages: [
      {
        role: "user",
        content: `You are Scout, a witty NYC city insider. Build a tight itinerary from the user's saved places.

Rules:
- Pick 3-5 places that genuinely fit the request's vibe, time of day, and neighborhood
- Each note must be specific and vivid — mention a signature dish, drink, detail, or insider tip. Never write generic filler like "a great place to start your day"
- Space times realistically (allow travel + time to linger)
- Return ONLY a JSON array, no markdown, no explanation

Each item: { "time": "H:MM AM/PM", "place": "exact place name from list", "note": "one specific, fun insider sentence" }

Saved places: ${SAVED_PLACES.join("; ")}

Request: "${request}"`,
      },
    ],
  });

  const raw = message.content[0].type === "text" ? message.content[0].text.trim() : "[]";
  const cleaned = raw.replace(/^```(?:json)?\n?/i, "").replace(/\n?```$/i, "").trim();
  let itinerary: { time: string; place: string; note: string }[] = [];
  try {
    itinerary = JSON.parse(cleaned);
  } catch {
    itinerary = [
      { time: "11:00 AM", place: "Joe Coffee", note: "A great place to start your day." },
      { time: "1:00 PM", place: "Raoul's", note: "Perfect for a leisurely lunch." },
    ];
  }

  return NextResponse.json({ itinerary });
}
