import { HeroSection } from "@/components/home/HeroSection";
import { PhotoCollageHero } from "@/components/shared/PhotoCollageHero";
import { BentoGrid } from "@/components/home/BentoGrid";
import { ContactSection } from "@/components/home/ContactSection";

export default function Home() {
  return (
    <>
      <PhotoCollageHero />
      <HeroSection />
      <BentoGrid />
      <ContactSection />
    </>
  );
}
