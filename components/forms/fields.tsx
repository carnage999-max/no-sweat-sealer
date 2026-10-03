import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const control =
  "mt-2 w-full rounded-[10px] border bg-void px-4 py-3 text-ice placeholder:text-frost/60 focus:border-cyan focus:outline-none aria-[invalid=true]:border-wet";

function Wrapper({
  label,
  name,
  error,
  optional,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-[0.95rem] font-semibold">
        {label}
        {optional ? <span className="ml-1.5 font-normal text-frost">(optional)</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${name}-error`} role="alert" className="mt-1.5 text-sm text-wet">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type Common = { label: string; name: string; error?: string; optional?: boolean };

export function TextField({
  label,
  name,
  error,
  optional,
  ...rest
}: Common & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Wrapper label={label} name={name} error={error} optional={optional}>
      <input
        id={name}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`${control} ${error ? "border-wet" : "border-line-strong"}`}
        {...rest}
      />
    </Wrapper>
  );
}

export function SelectField({
  label,
  name,
  error,
  optional,
  options,
  ...rest
}: Common & { options: readonly string[] } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <Wrapper label={label} name={name} error={error} optional={optional}>
      <select
        id={name}
        name={name}
        defaultValue=""
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`${control} ${error ? "border-wet" : "border-line-strong"}`}
        {...rest}
      >
        <option value="" disabled>
          Choose one
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Wrapper>
  );
}

export function TextAreaField({
  label,
  name,
  error,
  optional,
  ...rest
}: Common & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Wrapper label={label} name={name} error={error} optional={optional}>
      <textarea
        id={name}
        name={name}
        rows={5}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`${control} resize-y ${error ? "border-wet" : "border-line-strong"}`}
        {...rest}
      />
    </Wrapper>
  );
}

/** Hidden from people, visible to bots. Server drops any submission that fills it. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label htmlFor="website">Website</label>
      <input id="website" name="website" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
