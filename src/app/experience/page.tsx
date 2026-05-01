import { Timeline } from "@/components/experience/Timeline";
import { experiences } from "@/content/experiences";

export const metadata = {
  title: "Experience — Rithani Saravanakumar",
};

export default function ExperiencePage() {
  return (
    <main className="px-5 md:px-[72px] pt-[130px] pb-20">
      <div className="max-w-[760px]">
        <div className="pf-eyebrow mb-5">Experience</div>
        <h1 className="font-serif font-light text-[clamp(36px,5vw,64px)] tracking-[-0.035em] leading-[0.95]">
          A path through{" "}
          <span className="italic" style={{ color: "var(--pf-accent)" }}>five</span>{" "}
          countries.
        </h1>
        <p
          className="font-serif text-xl leading-[1.45] font-light mt-6 max-w-[580px]"
          style={{ color: "var(--pf-text-muted)" }}
        >
          Four internships, one TA role, and a lot of PRs. Here&apos;s what I&apos;ve been up to.
        </p>
        <div className="mt-16">
          <Timeline experiences={experiences} />
        </div>
      </div>
    </main>
  );
}
