import Image from "next/image";
import Link from "next/link";

import { btn } from "@/components/ui/button";
import { Reveal } from "@/components/ui/Reveal";
import { CLAIMS } from "@/content/claims";

export function FinalCta() {
  return (
    <section className="band relative overflow-hidden text-center">
      <div aria-hidden className="aurora absolute inset-0 -z-10" />
      <div className="wrap">
        <Reveal variant="scale">
          <Image
            src="/new-des/new-logo.jpeg"
            alt="No Sweat® wordmark in chrome and ice-blue letters, ringed by a blue arc, beside a stainless tumbler with condensation."
            width={1536}
            height={1024}
            sizes="(min-width: 768px) 640px, 90vw"
            className="float mx-auto w-full max-w-[640px] mix-blend-screen [mask-image:radial-gradient(ellipse_closest-side,#000_72%,transparent)]"
          />
        </Reveal>
        <Reveal>
          <h2 className="display display-xl chrome-text -mt-2">
            {CLAIMS.finalHeadline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/products/no-sweat" className={btn("primary", "lg")}>
              Shop No Sweat
            </Link>
            <Link href="/commercial" className={btn("ghost", "lg")}>
              Commercial inquiry
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
