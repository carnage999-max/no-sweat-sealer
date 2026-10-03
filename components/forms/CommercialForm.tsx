"use client";

import { btn } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import {
  DESIRED_SIZES,
  INDUSTRIES,
  MONTHLY_VOLUMES,
  validateCommercialInquiry,
} from "@/lib/forms";

import { Honeypot, SelectField, TextAreaField, TextField } from "./fields";
import { Turnstile } from "./Turnstile";
import { useFormSubmit } from "./useFormSubmit";

export function CommercialForm() {
  const { status, error, fieldErrors, submit, onToken, resetKey } = useFormSubmit({
    endpoint: "/api/commercial",
    validate: validateCommercialInquiry,
    onSuccess: () => track("commercial_lead"),
  });

  if (status === "sent") {
    return (
      <div role="status" className="rounded-[14px] border border-cyan/50 bg-cyan/10 p-8">
        <p className="display display-md">Inquiry received.</p>
        <p className="mt-3 text-frost">
          Thanks. We&rsquo;ll follow up by email about sizes and pricing for your business.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="relative grid gap-6">
      <Honeypot />
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField label="Business name" name="business" autoComplete="organization" error={fieldErrors.business} />
        <TextField label="Your name" name="name" autoComplete="name" error={fieldErrors.name} />
        <TextField label="Email" name="email" type="email" autoComplete="email" error={fieldErrors.email} />
        <TextField label="Phone" name="phone" type="tel" autoComplete="tel" optional error={fieldErrors.phone} />
        <SelectField label="Industry" name="industry" options={INDUSTRIES} error={fieldErrors.industry} />
        <SelectField
          label="Estimated monthly volume"
          name="monthlyVolume"
          options={MONTHLY_VOLUMES}
          error={fieldErrors.monthlyVolume}
        />
      </div>
      <SelectField label="Desired size" name="desiredSize" options={DESIRED_SIZES} error={fieldErrors.desiredSize} />
      <TextAreaField
        label="Anything we should know?"
        name="message"
        optional
        placeholder="Locations, how many drinks you serve, timing."
        error={fieldErrors.message}
      />

      <Turnstile action="commercial_inquiry" onToken={onToken} resetKey={resetKey} />

      {status === "error" && error ? (
        <p role="alert" className="rounded-[10px] border border-wet/50 bg-wet/10 px-4 py-3 text-sm">
          {error}
        </p>
      ) : null}

      <button type="submit" disabled={status === "sending"} className={`${btn("primary", "lg")} justify-self-start`}>
        {status === "sending" ? "Sending…" : "Send inquiry"}
      </button>
    </form>
  );
}
