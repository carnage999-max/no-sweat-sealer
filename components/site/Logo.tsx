import Image from "next/image";
import Link from "next/link";

/**
 * The brand logo, used exactly as supplied. It sits on black, so the screen
 * blend mode lets the page's own dark background show through it.
 */
export function Logo({ className = "", height = 44 }: { className?: string; height?: number }) {
  return (
    <Link href="/" aria-label="No Sweat, home" className={`block shrink-0 ${className}`}>
      <Image
        src="/new-des/new-logo.jpeg"
        alt="No Sweat®"
        width={1536}
        height={1024}
        priority
        sizes={`${Math.round(height * 1.5)}px`}
        style={{ height, width: "auto" }}
        className="rounded-md"
      />
    </Link>
  );
}
