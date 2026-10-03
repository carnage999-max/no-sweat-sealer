import Image from "next/image";
import Link from "next/link";

import { btn } from "@/components/ui/button";
import { CLAIMS } from "@/content/claims";

export function FinalCta() {
  return (
    <section className="band border-t border-line bg-void text-center">
      <div className="wrap">
        <Image
          src="/images/logo-art.jpg"
          alt="No Sweat® wordmark in chrome and ice-blue letters, ringed by a blue arc, beside a stainless tumbler with condensation."
          width={1536}
          height={1024}
          sizes="(min-width: 768px) 720px, 92vw"
          className="mx-auto w-full max-w-[720px] mix-blend-screen [mask-image:radial-gradient(closest-side,#000_62%,transparent)]"
        />
        <h2 className="display display-xl -mt-4">
          {CLAIMS.finalHeadline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/products/no-sweat" className={btn("primary", "lg")}>
            Shop No Sweat
          </Link>
          <Link href="/commercial" className={btn("ghost", "lg")}>
            Commercial inquiry
          </Link>
        </div>
      </div>
    </section>
  );
}
