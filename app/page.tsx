import { Applications } from "@/components/home/Applications";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { BuySection } from "@/components/home/BuySection";
import { CommercialBand } from "@/components/home/CommercialBand";
import { ContactSection } from "@/components/home/ContactSection";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Problem } from "@/components/home/Problem";
import { Proof } from "@/components/home/Proof";
import { Science } from "@/components/home/Science";
import { ValueStrip } from "@/components/home/ValueStrip";
import { Why } from "@/components/home/Why";
import { resolveVideo } from "@/lib/media";

export default function HomePage() {
  return (
    <>
      <Hero video={resolveVideo("home-hero")} />
      <ValueStrip />
      <Problem />
      <Proof />
      <HowItWorks />
      <BuySection />
      <BeforeAfter />
      <Why />
      <Applications />
      <Science />
      <CommercialBand video={resolveVideo("commercial-hero")} />
      <FaqSection />
      <ContactSection />
      <FinalCta />
    </>
  );
}
