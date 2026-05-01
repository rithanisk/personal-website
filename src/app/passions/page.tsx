import { PassionTabs } from "@/components/passions/PassionTabs";

export const metadata = {
  title: "Passions — Rithani Saravanakumar",
};

export default function PassionsPage() {
  return (
    <main className="px-5 md:px-[72px] pt-[130px] pb-20">
      <div className="pf-eyebrow mb-5">Passions</div>
      <h1
        className="font-serif font-light tracking-[-0.035em] leading-[0.95] max-w-[720px]"
        style={{ fontSize: "clamp(34px, 5vw, 64px)" }}
      >
        Things I love{" "}
        <span className="italic" style={{ color: "var(--pf-accent)" }}>outside</span>{" "}
        the IDE.
      </h1>
      <p
        className="font-serif text-[19px] font-light mt-5 max-w-[560px]"
        style={{ color: "var(--pf-text-muted)" }}
      >
        I&apos;m happiest when I&apos;m making something with my hands, my camera, or my feet.
      </p>
      <div className="mt-11">
        <PassionTabs />
      </div>
    </main>
  );
}
