import type { ReactNode } from "react";

import { ChevronDownIcon } from "@/components/ui/icons";
import type { Faq } from "@/content/faq";

export function AnswerBody({ faq }: { faq: Faq }) {
  return (
    <div className="measure space-y-3">
      {faq.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {faq.steps ? (
        <ol className="list-decimal space-y-2 pl-5">
          {faq.steps.map((step) => <li key={step}>{step}</li>)}
        </ol>
      ) : null}
    </div>
  );
}

/** Native <details> disclosure: keyboard and screen-reader support for free. */
export function AccordionItem({
  question,
  children,
  tone = "dark",
}: {
  question: string;
  children: ReactNode;
  tone?: "dark" | "paper";
}) {
  const border = tone === "paper" ? "border-ink/15" : "border-line";
  const muted = tone === "paper" ? "text-slate" : "text-frost";

  return (
    <details className={`group border-b ${border}`}>
      <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-left text-[1.05rem] font-semibold">
        <span>{question}</span>
        <ChevronDownIcon className={`h-5 w-5 shrink-0 transition-transform group-open:rotate-180 ${muted}`} />
      </summary>
      <div className={`pb-6 ${muted}`}>{children}</div>
    </details>
  );
}

export function FaqList({ faqs, tone = "dark" }: { faqs: readonly Faq[]; tone?: "dark" | "paper" }) {
  const border = tone === "paper" ? "border-ink/15" : "border-line";
  return (
    <div className={`border-t ${border}`}>
      {faqs.map((faq) => (
        <AccordionItem key={faq.id} question={faq.question} tone={tone}>
          <AnswerBody faq={faq} />
        </AccordionItem>
      ))}
    </div>
  );
}
