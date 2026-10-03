import type { Metadata } from "next";

import { ContactForm } from "@/components/forms/ContactForm";
import { SocialRow } from "@/components/site/SocialRow";
import { PageIntro } from "@/components/ui/PageIntro";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact No Sweat® about an order, a product question or safety information.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageIntro title="Contact us." lede="Questions about an order, the product or safety information? Send a message." />
      <section className="band">
        <div className="wrap grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div className="glass p-6 sm:p-10">
            <ContactForm />
          </div>
          <div>
            <h2 className="display display-md">Reach us directly</h2>
            <dl className="mt-6 divide-y divide-line border-y border-line">
              <div className="py-4">
                <dt className="text-sm text-frost">{SITE.contact.phoneNote}</dt>
                <dd className="mt-1">
                  <a href={SITE.contact.phoneHref} className="font-semibold hover:text-cyan">
                    {SITE.contact.phone}
                  </a>
                </dd>
              </div>
              <div className="py-4">
                <dt className="text-sm text-frost">Mail</dt>
                <dd className="mt-1 not-italic">
                  <address className="not-italic">
                    {SITE.contact.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                    {SITE.contact.country}
                  </address>
                </dd>
              </div>
            </dl>
            <h2 className="display display-md mt-12">Follow along</h2>
            <SocialRow className="mt-5" />
          </div>
        </div>
      </section>
    </>
  );
}
