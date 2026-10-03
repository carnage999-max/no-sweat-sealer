import {
  isHoneypotTripped,
  type FieldErrors,
  type ValidationResult,
} from "@/lib/forms";
import { sendTeamEmail } from "@/lib/mail";
import { getClientIp, verifyTurnstile } from "@/lib/turnstile";

export type FormResponse =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: FieldErrors };

function respond(body: FormResponse, status = 200): Response {
  return Response.json(body, { status });
}

/**
 * The shared pipeline behind every public form: parse, drop bots, validate,
 * verify the security check, then email the team. Each route only supplies its
 * validator and how to turn the validated data into an email.
 */
export async function handleFormPost<T>(
  request: Request,
  options: {
    turnstileAction: string;
    validate: (input: unknown) => ValidationResult<T>;
    compose: (data: T) => {
      subject: string;
      text: string;
      html: string;
      replyTo: string;
    };
  },
): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return respond({ ok: false, error: "Please complete the form and try again." }, 400);
  }

  // Pretend success so a bot gets no signal that it was detected.
  if (isHoneypotTripped(body)) return respond({ ok: true });

  const validation = options.validate(body);
  if (!validation.ok) {
    return respond(
      { ok: false, error: validation.error, fieldErrors: validation.fieldErrors },
      400,
    );
  }

  const token =
    typeof body === "object" && body !== null
      ? (body as Record<string, unknown>).turnstileToken
      : undefined;
  const turnstile = await verifyTurnstile({
    token,
    remoteIp: getClientIp(request.headers),
    expectedAction: options.turnstileAction,
  });
  if (!turnstile.ok) {
    return respond({ ok: false, error: turnstile.error }, turnstile.status);
  }

  const result = await sendTeamEmail(options.compose(validation.data));
  if (!result.ok) {
    return respond(
      {
        ok: false,
        error:
          result.reason === "not-configured"
            ? "We can't accept messages right now. Please try again in a little while."
            : "We couldn't send your message just now. Please try again.",
      },
      result.reason === "not-configured" ? 503 : 502,
    );
  }

  return respond({ ok: true });
}
