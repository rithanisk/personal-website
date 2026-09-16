type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const DEFAULT_VOICE_ID = "JBFqnCBsd6RMkjVDRZzb";
const DEFAULT_MODEL_ID = "eleven_flash_v2_5";
const MAX_TEXT_LENGTH = 2_000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_REQUESTS = 12;
const rateLimits = new Map<string, RateLimitEntry>();

function getClientIdentifier(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "anonymous"
  );
}

function isRateLimited(request: Request) {
  const now = Date.now();
  const client = getClientIdentifier(request);

  if (rateLimits.size > 500) {
    for (const [key, entry] of rateLimits) {
      if (entry.resetAt <= now) rateLimits.delete(key);
    }
  }

  const existing = rateLimits.get(client);

  if (!existing || existing.resetAt <= now) {
    rateLimits.set(client, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  existing.count += 1;
  return existing.count > RATE_LIMIT_REQUESTS;
}

function parseText(body: unknown) {
  if (!body || typeof body !== "object" || !("text" in body) || typeof body.text !== "string") {
    return null;
  }

  const text = body.text.trim();
  if (!text || text.length > MAX_TEXT_LENGTH) return null;

  return text;
}

export async function POST(request: Request) {
  if (isRateLimited(request)) {
    return Response.json(
      { error: "Too many speech requests. Please wait a minute and try again." },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Voice replies are not configured." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const text = parseText(body);
  if (!text) {
    return Response.json(
      { error: `Text must be between 1 and ${MAX_TEXT_LENGTH.toLocaleString()} characters.` },
      { status: 400 },
    );
  }

  const voiceId = process.env.ELEVENLABS_VOICE_ID || DEFAULT_VOICE_ID;
  const modelId = process.env.ELEVENLABS_MODEL_ID || DEFAULT_MODEL_ID;
  const endpoint = new URL(
    `/v1/text-to-speech/${encodeURIComponent(voiceId)}`,
    "https://api.elevenlabs.io",
  );
  endpoint.searchParams.set("output_format", "mp3_44100_128");

  try {
    const upstreamResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify({ text, model_id: modelId }),
      cache: "no-store",
      signal: AbortSignal.timeout(30_000),
    });

    if (!upstreamResponse.ok || !upstreamResponse.body) {
      if (upstreamResponse.status === 429) {
        return Response.json(
          { error: "Voice replies are busy right now. Please try again shortly." },
          {
            status: 429,
            headers: { "Retry-After": upstreamResponse.headers.get("retry-after") ?? "30" },
          },
        );
      }

      return Response.json(
        { error: "Voice reply generation is temporarily unavailable." },
        { status: 502 },
      );
    }

    return new Response(upstreamResponse.body, {
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": upstreamResponse.headers.get("content-type") || "audio/mpeg",
      },
    });
  } catch {
    return Response.json(
      { error: "Voice reply generation is temporarily unavailable." },
      { status: 502 },
    );
  }
}
