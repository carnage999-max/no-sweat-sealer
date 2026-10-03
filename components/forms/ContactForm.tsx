"use client";

import { btn } from "@/components/ui/button";
import { CONTACT_TOPICS, validateContactMessage } from "@/lib/forms";

import { Honeypot, SelectField, TextAreaField, TextField } from "./fields";
import { Turnstile } from "./Turnstile";
import { useFormSubmit } from "./useFormSubmit";

export function ContactForm() {
  const { status, error, fieldErrors, submit, onToken, resetKey } = useFormSubmit({
    endpoint: "/api/contact",
    validate: validateContactMessage,
  });

  if (status === "sent") {
    return (
      <div role="status" className="rounded-[14px] border border-cyan/50 bg-cyan/10 p-8">
        <p className="display display-md">Message sent.</p>
        <p className="mt-3 text-frost">Thanks. We&rsquo;ll reply by email.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="relative grid gap-6">
      <Honeypot />
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField label="Your name" name="name" autoComplete="name" error={fieldErrors.name} />
        <TextField label="Email" name="email" type="email" autoComplete="email" error={fieldErrors.email} />
      </div>
      <SelectField label="Topic" name="topic" options={CONTACT_TOPICS} error={fieldErrors.topic} />
      <TextAreaField label="Message" name="message" error={fieldErrors.message} />

      <Turnstile action="contact_form" onToken={onToken} resetKey={resetKey} />

      {status === "error" && error ? (
        <p role="alert" className="rounded-[10px] border border-wet/50 bg-wet/10 px-4 py-3 text-sm">
          {error}
        </p>
      ) : null}

      <button type="submit" disabled={status === "sending"} className={`${btn("primary", "lg")} justify-self-start`}>
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
