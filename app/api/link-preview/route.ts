import { NextRequest, NextResponse } from "next/server";

const PREVIEW_TTL_MS = 1000 * 60 * 30;
const cache = new Map<string, { expiresAt: number; payload: PreviewPayload }>();

type PreviewPayload = {
  domain: string;
  title: string;
  description: string;
  image: string;
};

function extractMeta(html: string, keys: string[]) {
  for (const key of keys) {
    const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(
      `<meta[^>]+(?:property|name)=["']${escaped}["'][^>]+content=["']([^"']+)["']`,
      "i",
    );
    const match = html.match(regex);
    if (match?.[1]) return match[1].trim();
  }
  return "";
}

function getDomain(value: string) {
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export async function GET(request: NextRequest) {
  const rawUrl = request.nextUrl.searchParams.get("url") ?? "";

  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return NextResponse.json({ error: "URL invalida" }, { status: 400 });
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    return NextResponse.json({ error: "Protocolo no permitido" }, { status: 400 });
  }

  const url = parsed.toString();
  const domain = getDomain(url);

  const cached = cache.get(url);
  if (cached && cached.expiresAt > Date.now()) {
    return NextResponse.json(cached.payload);
  }

  try {
    const response = await fetch(url, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
      },
      redirect: "follow",
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({ domain, title: "", description: "", image: "" });
    }

    const html = await response.text();
    const slice = html.slice(0, 400_000);

    const title =
      extractMeta(slice, ["og:title", "twitter:title"]) ||
      (slice.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() ?? "");
    const description = extractMeta(slice, ["og:description", "twitter:description"]);
    const image = extractMeta(slice, ["og:image", "twitter:image", "twitter:image:src"]);

    const payload: PreviewPayload = { domain, title, description, image };

    cache.set(url, { expiresAt: Date.now() + PREVIEW_TTL_MS, payload });
    return NextResponse.json(payload);
  } catch {
    return NextResponse.json({ domain, title: "", description: "", image: "" });
  }
}
