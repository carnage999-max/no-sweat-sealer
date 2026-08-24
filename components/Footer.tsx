import Link from 'next/link';
import Image from 'next/image';
import { COLORS, FONTS } from '@/constants/constants';

/**
 * Footer component summarises the No Sweat™ product and provides quick links.
 * A small logo with text description sits alongside navigation links. Social
 * icons have been removed and a copyright notice is included.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#111111] text-white py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {/* Logo and summary */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <div className="flex items-center space-x-2">
            <Image
              src="/assets/logo_red_cup.png"
              alt="No Sweat logo"
              width={40}
              height={40}
            />
            <span
              className={`${FONTS.heading} text-xl`}
              style={{ color: COLORS.iceWhite }}
            >
              No Sweat<sup className="text-xs align-top">®</sup>
            </span>
          </div>
          <p
            className={`${FONTS.body} text-sm`}
            style={{ color: COLORS.iceWhite }}
          >
            No Sweat™ is a clear, silica‑based spray that blocks condensation on
            any cup or tumbler—keeping surfaces clean and dry.
          </p>
        </div>
        {/* Quick Links */}
        <div className="flex flex-col space-y-2 items-center md:items-start">
          <h4
            className={`${FONTS.heading} mb-2`}
            style={{ color: COLORS.iceWhite }}
          >
            Quick Links
          </h4>
          <Link
            href="/"
            className={`${FONTS.body} text-sm hover:underline`}
            style={{ color: COLORS.iceWhite }}
          >
            Home
          </Link>
          <Link
            href="/product"
            className={`${FONTS.body} text-sm hover:underline`}
            style={{ color: COLORS.iceWhite }}
          >
            Product
          </Link>
          <Link
            href="/wholesale"
            className={`${FONTS.body} text-sm hover:underline`}
            style={{ color: COLORS.iceWhite }}
          >
            Wholesale
          </Link>
          <Link
            href="/privacy"
            className={`${FONTS.body} text-sm hover:underline`}
            style={{ color: COLORS.iceWhite }}
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className={`${FONTS.body} text-sm hover:underline`}
            style={{ color: COLORS.iceWhite }}
          >
            Terms
          </Link>
        </div>
        {/* Copyright */}
        <div className="flex flex-col items-center md:items-end justify-center">
          <p
            className={`${FONTS.body} text-sm`}
            style={{ color: COLORS.iceWhite }}
          >
            © {year} No Sweat. All rights reserved.
          </p>
        </div>
      </div>
      <p
        className={`${FONTS.body} text-sm text-center mt-8`}
        style={{ color: COLORS.iceWhite, opacity: 0.6 }}
      >
        Part of the{" "}
        <a
          href="https://se7eninc.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:opacity-100"
          style={{ color: COLORS.iceWhite }}
        >
          Se7en
        </a>{" "}
        family of companies.
      </p>
    </footer>
  );
}
