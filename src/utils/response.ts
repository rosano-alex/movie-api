export const corsHeaders: Record<string, string> = {
  // The catalog is public read-only data, and browser clients (the Stream Shelf
  // web build) are cross-origin, so every response opts in to CORS.
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, OPTIONS",
  "access-control-allow-headers": "content-type",
  "access-control-max-age": "86400"
};

export function json(body: unknown, init: ResponseInit = {}): Response {
  const headers = new Headers(init.headers);
  headers.set("content-type", "application/json; charset=UTF-8");
  for (const [name, value] of Object.entries(corsHeaders)) {
    headers.set(name, value);
  }

  return new Response(JSON.stringify(body), { ...init, headers });
}

/** Preflight response for browsers that ask before a cross-origin request. */
export function preflight(): Response {
  return new Response(null, { status: 204, headers: corsHeaders });
}
