"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { AccordionItem, AnswerBody } from "@/components/ui/Accordion";
import { FAQ_TOPICS, type Faq } from "@/content/faq";

function searchText(faq: Faq): string {
  return [faq.question, ...(faq.paragraphs ?? []), ...(faq.steps ?? [])].join(" ").toLowerCase();
}

export function FaqSearch({ faqs }: { faqs: readonly Faq[] }) {
  const [query, setQuery] = useState("");

  const matches = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (terms.length === 0) return faqs;
    return faqs.filter((faq) => {
      const text = searchText(faq);
      return terms.every((term) => text.includes(term));
    });
  }, [faqs, query]);

  return (
    <div>
      <label htmlFor="faq-search" className="text-[0.95rem] font-semibold">
        Search the FAQ
      </label>
      <input
        id="faq-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Try “dry time” or “storage”"
        className="mt-2 w-full max-w-md rounded-[10px] border border-line-strong bg-void px-4 py-3 text-ice placeholder:text-frost/60 focus:border-cyan focus:outline-none"
      />
      <p className="mt-3 text-sm text-frost" role="status" aria-live="polite">
        {query.trim()
          ? `${matches.length} ${matches.length === 1 ? "answer" : "answers"} found`
          : `${faqs.length} questions`}
      </p>

      {matches.length === 0 ? (
        <div className="mt-8 glass p-8">
          <p className="display display-md">No match.</p>
          <p className="mt-3 text-frost">
            Try fewer words, or{" "}
            <Link href="/contact" className="font-semibold text-ice underline underline-offset-4 hover:text-cyan">
              ask us directly
            </Link>
            .
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-12">
          {FAQ_TOPICS.map((topic) => {
            const items = matches.filter((faq) => faq.topic === topic);
            if (items.length === 0) return null;
            return (
              <section key={topic} aria-labelledby={`topic-${topic}`}>
                <h2 id={`topic-${topic}`} className="display display-md">
                  {topic}
                </h2>
                <div className="mt-4 border-t border-line">
                  {items.map((faq) => (
                    <AccordionItem key={faq.id} question={faq.question}>
                      <AnswerBody faq={faq} />
                    </AccordionItem>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
