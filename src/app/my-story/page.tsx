import Image from "next/image";

export const metadata = {
  title: "My Story — Rithani Saravanakumar",
};

const sections = [
  {
    heading: "Who I Am",
    accent: "rose",
    body: "I\u2019m Rithani, a second-generation Indian American, born in India and raised in the US. I was born in Karur, a small town in Tamil Nadu, India, and just nine months later, my parents moved us to Seattle, WA. That's kind of been the pattern of my life ever since: starting somewhere new and figuring it out. Growing up, I lived between two worlds. As hard as it was building my identity in a foreign country as a young girl, my parents worked equally hard to make sure we also didn't lose where we came from. They taught my younger brother and I to read and write our mother tongue, Tamil, not just speak it. Every other summer, we would all fly back to our parents' hometown to spend time with family — grandparents, cousins, relatives who felt both close and far away at the same time. I didn't fully appreciate those trips as a kid, but they're a big part of who I am. Even our daily routines were a reminder of where we came from. Weekly temple visits, eating home-cooked Tamil food, listening to Tamil music. By high school, I knew I wanted to do something different. ",
    images: ["/usa.JPG", "/usa2.jpg", "/usa3.png"],
  },
  {
    heading: "Moving to Singapore",
    accent: "forest",
    body: "I moved to Singapore for university, knowing almost no one. The first few months were disorienting \u2014 new country, new people, a completely different rhythm of life. But that discomfort became the best thing for me. I learned to be independent, to adapt fast, and to find my footing in unfamiliar places. Singapore gave me confidence I didn\u2019t know I was missing.",
    images: ["/singapore1.png", "/singapore2.jpg", "/singapore3.jpg"],
  },
  {
    heading: "NOC Vietnam \u2014 Buymed",
    accent: "amber",
    body: "In the summer of 2024, I spent three months in Ho Chi Minh City as a Software Engineer at Buymed. I shipped 10+ production features, built a Go-based scraping pipeline that cut manual work by 80%, and prototyped a RAG-powered company chatbot. It was my first taste of fast-paced startup culture \u2014 tight deadlines, real users, and code that actually mattered.",
    images: ["/vietnam.png", "/vietnam2.png", "/vietnam3.png"],
  },
  {
    heading: "NOC Toronto \u2014 Nia Health",
    accent: "rose",
    body: "Now I\u2019m in Toronto on a year-long program, working as an AI Engineer at Nia Health. I\u2019m building GPT-powered parsing pipelines, a real-time glucose monitoring system, and tools that help clinicians make faster, better decisions. It\u2019s the most meaningful work I\u2019ve done \u2014 software that directly impacts someone\u2019s health.",
    images: ["/toronto.png", "/toronto2.png", "/toronto3.png"],
  },
];

function StorySection({
  heading,
  accent,
  body,
  images,
  index,
}: {
  heading: string;
  accent: string;
  body: string;
  images: string[];
  index: number;
}) {
  return (
    <div className="relative pl-8 pb-14 last:pb-0">
      {/* Timeline line */}
      {index < sections.length - 1 && (
        <div
          className="absolute left-[7px] top-3 bottom-0 w-px"
          style={{ background: "var(--pf-border-strong)" }}
        />
      )}
      {/* Dot */}
      <div
        className="absolute left-0 top-[6px] w-[15px] h-[15px] rounded-full border-2"
        style={{
          borderColor: `var(--pf-${accent})`,
          background: "var(--pf-bg)",
        }}
      />
      <h3
        className="font-serif text-[22px] md:text-[26px] font-normal tracking-[-0.02em] leading-tight mb-3"
        style={{ color: "var(--pf-text)" }}
      >
        {heading}
      </h3>
      <p
        className="text-[15px] md:text-[16px] leading-relaxed tracking-tight"
        style={{ color: "var(--pf-text-muted)" }}
      >
        {body}
      </p>

      {/* Images */}
      {images.length > 0 && (
        <div className="flex gap-3 mt-5">
          {images.map((src, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-xl flex-1"
              style={{
                aspectRatio: images.length === 1 ? "16 / 10" : "1 / 1",
                border: "1px solid var(--pf-border)",
              }}
            >
              <Image src={src} alt={heading} fill className="object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MyStoryPage() {
  return (
    <main className="px-5 md:px-[72px] pt-[130px] pb-20">
      <div>
        <div className="pf-eyebrow mb-5">My Story</div>
        <h1
          className="font-serif font-light tracking-[-0.035em] leading-[0.95]"
          style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
        >
          From India to the US, to Singapore, to{" "}
          <span className="italic" style={{ color: "var(--pf-accent)" }}>
            wherever&apos;s next
          </span>
          .
        </h1>
        <p
          className="text-[17px] font-light mt-6 leading-relaxed tracking-tight"
          style={{ color: "var(--pf-text-muted)" }}
        >
          Every move taught me something new. Here&apos;s how I got here.
        </p>

        <div className="mt-14">
          {sections.map((section, i) => (
            <StorySection key={i} {...section} index={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
