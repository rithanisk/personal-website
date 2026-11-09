"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import styles from "./TypingIntro.module.css";

const segments = [
  { text: "I'm ", color: undefined },
  { text: "[Rithani]", color: "var(--pf-rose)" },
  { text: ", and I build ", color: undefined },
  { text: "intelligent software", color: "var(--pf-forest-ink)" },
  { text: " with real, measurable impact.", color: undefined },
];
const introText = segments.map((segment) => segment.text).join("");

function IntroWords({ count }: { count: number }) {
  let offset = 0;
  return segments.map((segment, index) => {
    const text = segment.text.slice(0, Math.max(0, count - offset));
    offset += segment.text.length;
    return text ? <span key={index} style={{ color: segment.color }}>{text}</span> : null;
  });
}

export function TypingIntro() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const inView = useInView(headingRef, { once: true, amount: .35 });
  const reduceMotion = useReducedMotion();
  const [visibleCharacters, setVisibleCharacters] = useState(0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    let frame = 0;
    const start = performance.now() + 280;
    const type = (now: number) => {
      const count = Math.max(0, Math.min(introText.length, Math.floor((now - start) / 28)));
      setVisibleCharacters(count);
      if (count < introText.length) frame = requestAnimationFrame(type);
    };
    frame = requestAnimationFrame(type);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduceMotion]);

  const count = reduceMotion ? introText.length : visibleCharacters;

  return (
    <h1 ref={headingRef} className={styles.heading} aria-label={introText}>
      <span className={styles.spacer} aria-hidden="true"><IntroWords count={introText.length} /></span>
      <span className={styles.visual} aria-hidden="true">
        <IntroWords count={count} />
        {inView && count < introText.length && <span className={styles.cursor} />}
      </span>
    </h1>
  );
}
