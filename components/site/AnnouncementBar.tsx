import Link from "next/link";

import { ANNOUNCEMENT } from "@/content/announcement";

export function AnnouncementBar() {
  if (!ANNOUNCEMENT.enabled) return null;
  return (
    <div className="border-b border-line bg-[linear-gradient(90deg,#0b2438,#0a1119_50%,#0b2438)] text-[0.82rem]">
      <p className="wrap py-2 text-center text-frost">
        {ANNOUNCEMENT.text}{" "}
        <Link href={ANNOUNCEMENT.href} className="font-semibold text-ice underline underline-offset-4 hover:text-cyan">
          {ANNOUNCEMENT.linkLabel}
        </Link>
      </p>
    </div>
  );
}
