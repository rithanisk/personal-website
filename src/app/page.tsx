import { HeroSection } from "@/components/home/HeroSection";
import { BentoGrid } from "@/components/home/BentoGrid";
import { SkillsSection } from "@/components/home/SkillsSection";
import { StorySnapshot } from "@/components/home/StorySnapshot";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BentoGrid />
      <SkillsSection />
      <StorySnapshot />
    </>
  );
}
