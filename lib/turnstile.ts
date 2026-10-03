import { getSiteUrl } from "@/lib/config";

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type SiteverifyResponse = {
  success: boolean;
  action?: string;
  hostname?: string;
};

export type TurnstileResult =
  | { ok: true; skipped?: true }
  | { ok: false; error: string; status: number };

function allowedHostnames(): Set<string> {
  const configured = (process.env.TURNSTILE_ALLOWED_HOSTNAMES ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
  if (configured.length > 0) return new Set(configured);

  const derived = new Set<string>();
  try {
    derived.add(new URL(getSiteUrl()).hostname.toLowerCase());
  } catch {
    // An unparsable site URL simply contributes no hostname.
  }
  if (process.env.NODE_ENV !== "production") {
    derived.add("localhost");
    derived.add("127.0.0.1");
  }
  return derived;
}

export function getClientIp(headers: Headers): string | null {
  return (
    headers.get("cf-connecting-ip")?.trim() ||
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    null
  );
}

/**
 * Verifies a Cloudflare Turnstile token. When no secret key is configured at
 * all, verification is skipped (the honeypot still applies) so the forms keep
 * working in development; once a secret is set, it is enforced strictly.
 */
export async function verifyTurnstile(args: {
  token: unknown;
  remoteIp: string | null;
  expectedAction: string;
}): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) return { ok: true, skipped: true };

  const token = typeof args.token === "string" ? args.token.trim() : "";
  if (!token) {
    return { ok: false, error: "Please complete the security check.", status: 400 };
  }

  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);
  body.append("idempotency_key", crypto.randomUUID());
  if (args.remoteIp) body.append("remoteip", args.remoteIp);

  try {
    const response = await fetch(VERIFY_URL, {
      method: "POST",
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      return { ok: false, error: "Security check failed. Please try again.", status: 502 };
    }

    const result = (await response.json()) as SiteverifyResponse;
    if (!result.success || result.action !== args.expectedAction) {
      return { ok: false, error: "Security check failed. Please refresh and try again.", status: 400 };
    }

    const hostname = result.hostname?.toLowerCase();
    if (!hostname || !allowedHostnames().has(hostname)) {
      return { ok: false, error: "Security check failed for this host.", status: 400 };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Security check failed. Please try again.", status: 502 };
  }
}
