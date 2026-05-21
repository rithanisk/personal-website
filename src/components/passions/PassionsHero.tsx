"use client";

import { motion } from "framer-motion";

const fade = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export function PassionsHero() {
  return (
    <>
      <motion.div
        className="pf-eyebrow mb-5"
        {...fade}
        transition={{ duration: 0.5, ease: [0.2, 0.7, 0, 1] }}
      >
        Passions
      </motion.div>
      <motion.h1
        className="font-serif font-light tracking-[-0.035em] leading-[0.95] max-w-[720px]"
        style={{ fontSize: "clamp(34px, 5vw, 64px)" }}
        {...fade}
        transition={{ duration: 0.5, delay: 0.08, ease: [0.2, 0.7, 0, 1] }}
      >
        Things I love{" "}
        <span className="italic" style={{ color: "var(--pf-accent)" }}>outside</span>{" "}
        the IDE.
      </motion.h1>
      <motion.p
        className="font-serif text-[19px] font-light mt-5 max-w-[560px]"
        style={{ color: "var(--pf-text-muted)" }}
        {...fade}
        transition={{ duration: 0.5, delay: 0.16, ease: [0.2, 0.7, 0, 1] }}
      >
        I&apos;m happiest when I&apos;m making something with my hands, my camera, or my feet.
      </motion.p>
    </>
  );
}
