import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const { text, creator, platform } = await req.json();

  if (!text) {
    return NextResponse.json({ error: "No text provided" }, { status: 400 });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    // Return mock data if no key configured
    return NextResponse.json({
      place: {
        name: "Sushi Nakazawa",
        neighborhood: "West Village",
        city: "New York",
        category: "Restaurant",
        description: "20-course omakase by Jiro's protégé. Book months in advance.",
        creator: creator || "@mayanyc",
        platform: platform || "tiktok",
      },
    });
  }

  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 512,
    messages: [
      {
        role: "user",
        content: `Extract place information from this social media post and return a JSON object with these fields:
- name: the place name
- neighborhood: the neighborhood or area
- city: the city
- category: one of "Restaurant", "Coffee", "Bar", "Shopping", "Experience", "Hotel", "Other"
- description: a one-sentence description (max 100 chars)

Post text: "${text}"
Creator: ${creator}
Platform: ${platform}

Return ONLY valid JSON, no markdown, no explanation.`,
      },
    ],
  });

  const raw = message.content[0].type === "text" ? message.content[0].text.trim() : "{}";

  let place: Record<string, string>;
  try {
    place = JSON.parse(raw);
  } catch {
    place = {
      name: "Unknown Place",
      neighborhood: "",
      city: "",
      category: "Other",
      description: "Saved from social media",
    };
  }

  return NextResponse.json({
    place: {
      ...place,
      creator,
      platform,
    },
  });
}
