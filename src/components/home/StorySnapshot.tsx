import Link from "next/link";
import { ArrowRightIcon } from "@/components/shared/Icons";

export function StorySnapshot() {
  return (
    <section className="px-5 md:px-[72px] mt-[72px] pb-[100px]">
      <div className="flex items-baseline justify-between mb-6 pb-[18px] border-b border-pf-border">
        <div>
          <div className="pf-eyebrow mb-2.5">About</div>
          <h2 className="font-serif font-light text-[clamp(26px,3.5vw,40px)] tracking-[-0.025em] leading-[1.05]">
            My{" "}
            <span className="italic" style={{ color: "var(--pf-rose-ink)" }}>
              story
            </span>
            .
          </h2>
        </div>
        <Link
          href="/my-story"
          className="text-[13px] inline-flex items-center gap-1.5"
          style={{ color: "var(--pf-text-muted)" }}
        >
          Read more <ArrowRightIcon />
        </Link>
      </div>

      <div className="max-w-[640px]">
        <p
          className="font-serif text-[20px] font-light leading-relaxed tracking-tight"
          style={{ color: "var(--pf-text)" }}
        >
          Born in India, raised in the US, and currently building software across Singapore, Vietnam, and Toronto. I&apos;ve always been drawn to the unconventional path.
        </p>
        <div className="flex flex-col gap-4 mt-6">
          <div className="flex items-baseline gap-3">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
              style={{ background: "var(--pf-forest)" }}
            />
            <p
              className="text-[15px] leading-relaxed tracking-tight"
              style={{ color: "var(--pf-text-muted)" }}
            >
              Moved to Singapore for university knowing no one — learned independence the hard way.
            </p>
          </div>
          <div className="flex items-baseline gap-3">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
              style={{ background: "var(--pf-amber)" }}
            />
            <p
              className="text-[15px] leading-relaxed tracking-tight"
              style={{ color: "var(--pf-text-muted)" }}
            >
              Shipped production code at a Vietnamese startup, building scraping pipelines and AI tools.
            </p>
          </div>
          <div className="flex items-baseline gap-3">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
              style={{ background: "var(--pf-rose)" }}
            />
            <p
              className="text-[15px] leading-relaxed tracking-tight"
              style={{ color: "var(--pf-text-muted)" }}
            >
              Now in Toronto, building AI-driven health tools that make a real difference.
            </p>
          </div>
        </div>
        <Link
          href="/my-story"
          className="inline-flex items-center gap-2 mt-7 text-[14px] font-medium pb-[2px]"
          style={{
            color: "var(--pf-rose-ink)",
            borderBottom:
              "1px solid color-mix(in oklab, var(--pf-rose) 35%, transparent)",
          }}
        >
          Read the full story <ArrowRightIcon />
        </Link>
      </div>
    </section>
  );
}
