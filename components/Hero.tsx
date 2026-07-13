"use client";
import Image from "next/image";
import { BUTTON_CLASSES, COLORS, FONTS } from "@/constants/constants";
import { motion } from "framer-motion";

export interface HeroButton {
  label: string;
  href: string;
}

interface HeroProps {
  title: string;
  subtitle: string;
  buttons: HeroButton[];
  videoSrc?: string;
  logoSrc?: string;
}

export default function Hero({
  title = "Stop the Drip Before It Begins.",
  subtitle = "No Sweat™ is a clear, silica-based spray that blocks condensation on any cup or tumbler—keeping surfaces clean and dry.",
  buttons,
  videoSrc,
  logoSrc,
}: HeroProps) {
  return (

    <section
      className="relative flex items-center justify-center w-full 
                 overflow-hidden bg-gradient-to-b from-[#F7FBFD] to-[#FFFFFF]
                 pt-28 pb-24 md:pt-36 md:pb-28 min-h-[90vh]"
    >
      {/* Background video */}
      {videoSrc && (
        <video
          className="absolute inset-0 w-full h-full object-cover brightness-75"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-[#00AEEF]/40 to-transparent md:from-[#00AEEF]/60" />

      {/* Animated floating bubbles */}
      <div className="absolute -top-8 left-10 w-32 h-32 bg-[#00AEEF]/20 rounded-full blur-2xl animate-bounce-slow" />
      <div className="absolute bottom-10 right-20 w-24 h-24 bg-[#D9E1E5]/30 rounded-full blur-xl animate-ping-slow" />

      {/* Content container */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between px-6">
        {/* Logo image */}
        {logoSrc && (
          <div className="order-1 flex w-full justify-end mb-8 md:order-2 md:mb-0 md:flex-1">
            <Image
              src={logoSrc}
              alt="No Sweat logo"
              width={160}
              height={160}
              className="object-contain drop-shadow-lg md:w-[220px] md:h-[220px]"
            />
          </div>
        )}

        {/* Text content */}
        <div className="order-2 flex-1 text-center md:order-1 md:text-left mb-12 md:mb-0">
          <h1
            className={`text-4xl md:text-6xl mb-4 ${FONTS.heading}`}
            style={{ color: COLORS.iceWhite }}
          >
            {title}
          </h1>
          <p
            className={`text-lg md:text-xl mb-10 ${FONTS.body}`}
            style={{ color: COLORS.iceWhite }}
          >
            {subtitle}
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            {buttons.map((btn) => (
              <motion.a
                key={btn.label}
                href={btn.href}
                className={BUTTON_CLASSES}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {btn.label}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce text-white/80 text-sm">
        ↓ Scroll to explore
      </div>

    </section>
  );
}
