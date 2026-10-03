import Link from "next/link";

import { ANNOUNCEMENT } from "@/content/announcement";

export function AnnouncementBar() {
  if (!ANNOUNCEMENT.enabled) return null;
  return (
    <div className="border-b border-line bg-panel text-[0.875rem]">
      <p className="wrap py-2.5 text-center text-frost">
        {ANNOUNCEMENT.text}{" "}
        <Link href={ANNOUNCEMENT.href} className="font-semibold text-ice underline underline-offset-4 hover:text-cyan">
          {ANNOUNCEMENT.linkLabel}
        </Link>
      </p>
    </div>
  );
}
