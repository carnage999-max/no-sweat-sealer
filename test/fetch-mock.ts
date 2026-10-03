import { vi } from "vitest";

export type RecordedCall = {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: string;
};

type Handler = (call: RecordedCall) => Response | Promise<Response>;

/**
 * Replaces global fetch with a recorder that routes by URL substring. Anything
 * unmatched fails loudly, so a test can never silently hit the real network.
 */
export function mockFetch(routes: Record<string, Handler>) {
  const calls: RecordedCall[] = [];

  const fn = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    const headers: Record<string, string> = {};
    new Headers(init?.headers).forEach((value, key) => {
      headers[key.toLowerCase()] = value;
    });
    const call: RecordedCall = {
      url,
      method: (init?.method ?? "GET").toUpperCase(),
      headers,
      body: typeof init?.body === "string" ? init.body : init?.body ? String(init.body) : "",
    };
    calls.push(call);

    const key = Object.keys(routes).find((fragment) => url.includes(fragment));
    if (!key) throw new Error(`Unexpected network call in test: ${call.method} ${url}`);
    return routes[key](call);
  });

  vi.stubGlobal("fetch", fn);
  return { calls, fn };
}

export function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "request-id": "req_test" },
  });
}
