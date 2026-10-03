import Image from "next/image";
import Link from "next/link";

/**
 * The droplet from the brand artwork plus a live-type wordmark. The full
 * chrome artwork is far too detailed to read at header size, so it is used
 * large elsewhere (final call to action, social image).
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="No Sweat, home"
      className={`flex items-center gap-2.5 ${className}`}
    >
      <Image
        src="/images/drop.png"
        alt=""
        width={40}
        height={40}
        className="h-9 w-9 rounded-[9px]"
        priority
      />
      <span className="display text-[1.15rem] leading-none">
        No Sweat<sup className="ml-0.5 align-super text-[0.55em]">®</sup>
      </span>
    </Link>
  );
}
