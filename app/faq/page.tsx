import type { Metadata } from "next";

import { FaqSearch } from "@/components/ui/FaqSearch";
import { PageIntro } from "@/components/ui/PageIntro";
import { FAQS } from "@/content/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about applying No Sweat®, where to use it, safety, storage and testing.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: [...(faq.paragraphs ?? []), ...(faq.steps ?? []).map((step, i) => `${i + 1}. ${step}`)].join(" "),
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageIntro title="Questions, answered." lede="Straight answers about application, safety and what to expect." />
      <section className="band">
        <div className="wrap max-w-4xl">
          <FaqSearch faqs={FAQS} />
        </div>
      </section>
    </>
  );
}
