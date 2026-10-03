import Link from "next/link";

import { FOOTER_LINKS, SITE } from "@/content/site";

import { Logo } from "./Logo";

function Column({
  title,
  links,
}: {
  title: string;
  links: readonly { href: string; label: string; external?: boolean }[];
}) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-ice">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.95rem] text-frost transition-colors hover:text-cyan"
              >
                {link.label}
              </a>
            ) : (
              <Link href={link.href} className="text-[0.95rem] text-frost transition-colors hover:text-cyan">
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-graphite">
      <div className="wrap grid gap-12 py-16 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-[0.95rem] text-frost">
            A clear, water-based spray engineered to reduce exterior condensation on cold drinkware.
          </p>
          <address className="mt-6 text-[0.95rem] not-italic text-frost">
            {SITE.contact.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <a href={SITE.contact.phoneHref} className="mt-1 block hover:text-cyan">
              {SITE.contact.phone}
            </a>
          </address>
        </div>
        <Column title="Shop" links={FOOTER_LINKS.shop} />
        <Column title="Learn" links={FOOTER_LINKS.learn} />
        <Column title="Support" links={FOOTER_LINKS.support} />
      </div>

      <div className="border-t border-line">
        <div className="wrap flex flex-col gap-3 py-6 text-sm text-frost sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}. All rights reserved.{" "}
            {FOOTER_LINKS.legal.map((link, index) => (
              <span key={link.href}>
                {index > 0 ? " " : ""}
                <Link href={link.href} className="underline underline-offset-4 hover:text-cyan">
                  {link.label}
                </Link>
              </span>
            ))}
          </p>
          <p>
            Part of the{" "}
            <a
              href={SITE.family.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-cyan"
            >
              {SITE.family.name}
            </a>{" "}
            family of companies.
          </p>
        </div>
      </div>
    </footer>
  );
}
