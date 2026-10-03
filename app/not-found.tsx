import Link from "next/link";

import { btn } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="band">
      <div className="wrap max-w-2xl">
        <h1 className="display display-xl">404</h1>
        <p className="display display-md mt-4">That page isn&rsquo;t here.</p>
        <p className="mt-4 text-frost">It may have moved, or the link may be wrong.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className={btn("primary", "lg")}>
            Back to home
          </Link>
          <Link href="/shop" className={btn("ghost", "lg")}>
            Shop No Sweat
          </Link>
        </div>
      </div>
    </section>
  );
}
