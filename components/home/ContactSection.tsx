import { ContactForm } from "@/components/forms/ContactForm";
import { SocialRow } from "@/components/site/SocialRow";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/content/site";

export function ContactSection() {
  return (
    <section id="contact" className="band border-t border-white/10">
      <div className="wrap grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <h2 className="display display-lg">Questions? Talk to us.</h2>
          <p className="lede mt-6 text-frost">
            Orders, the product, safety information or anything else. Send a message and we&rsquo;ll reply by email.
          </p>
          <dl className="mt-10 divide-y divide-white/10 border-y border-white/10">
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
              <dd className="mt-1">{SITE.contact.addressLines.join(", ")}</dd>
            </div>
          </dl>
          <SocialRow className="mt-8" />
        </Reveal>
        <Reveal variant="scale" className="glass p-6 sm:p-10">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
