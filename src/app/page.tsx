import { HeroSection } from "@/components/home/HeroSection";
import { PhotoCollageHero } from "@/components/shared/PhotoCollageHero";
import { BentoGrid } from "@/components/home/BentoGrid";
import { SkillsSection } from "@/components/home/SkillsSection";
import { StorySnapshot } from "@/components/home/StorySnapshot";

export default function Home() {
  return (
    <>
      <PhotoCollageHero />
      <HeroSection />
      <BentoGrid />
      <SkillsSection />
      <StorySnapshot />
    </>
  );
}
