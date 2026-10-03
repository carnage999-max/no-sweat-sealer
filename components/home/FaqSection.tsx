import Link from "next/link";

import { FaqList } from "@/components/ui/Accordion";
import { featuredFaqs } from "@/content/faq";

export function FaqSection() {
  return (
    <section className="on-paper band bg-paper text-ink">
      <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <h2 className="display display-lg">Questions, answered.</h2>
          <p className="mt-5 max-w-sm text-slate">
            Straight answers about application, safety and what to expect.
          </p>
          <Link
            href="/faq"
            className="mt-6 inline-block font-semibold underline underline-offset-4 hover:text-cyan-deep"
          >
            See all questions
          </Link>
        </div>
        <FaqList faqs={featuredFaqs()} tone="paper" />
      </div>
    </section>
  );
}
