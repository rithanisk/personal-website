import { PassionTabs } from "@/components/passions/PassionTabs";
import { PassionsHero } from "@/components/passions/PassionsHero";

export const metadata = {
  title: "Passions — Rithani Saravanakumar",
};

export default function PassionsPage() {
  return (
    <main className="px-5 md:px-[72px] pt-20 md:pt-24 pb-20">
      <PassionsHero />
      <div className="mt-11">
        <PassionTabs />
      </div>
    </main>
  );
}
