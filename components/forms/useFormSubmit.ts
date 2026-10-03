"use client";

import { useCallback, useState, type FormEvent } from "react";

import type { FieldErrors, ValidationResult } from "@/lib/forms";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Validates in the browser for instant feedback, then posts to the API, which
 * validates again as the authoritative check.
 */
export function useFormSubmit<T>({
  endpoint,
  validate,
  onSuccess,
}: {
  endpoint: string;
  validate: (input: unknown) => ValidationResult<T>;
  onSuccess?: () => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [token, setToken] = useState("");
  const [resetKey, setResetKey] = useState(0);

  const onToken = useCallback((value: string) => setToken(value), []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const values = { ...Object.fromEntries(new FormData(form).entries()), turnstileToken: token };

    const check = validate(values);
    if (!check.ok) {
      setFieldErrors(check.fieldErrors);
      setError(check.error);
      setStatus("error");
      form.querySelector<HTMLElement>(`#${Object.keys(check.fieldErrors)[0]}`)?.focus();
      return;
    }

    setStatus("sending");
    setError(null);
    setFieldErrors({});

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const body = (await response.json().catch(() => null)) as
        | { ok: true }
        | { ok: false; error: string; fieldErrors?: FieldErrors }
        | null;

      if (!response.ok || !body || !body.ok) {
        setFieldErrors(body && !body.ok ? (body.fieldErrors ?? {}) : {});
        setError(
          body && !body.ok ? body.error : "We couldn't send your message just now. Please try again.",
        );
        setStatus("error");
        setResetKey((key) => key + 1);
        return;
      }

      form.reset();
      setStatus("sent");
      setResetKey((key) => key + 1);
      onSuccess?.();
    } catch {
      setError("We couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  return { status, error, fieldErrors, submit, onToken, resetKey };
}
