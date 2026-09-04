"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GithubIcon, LinkedInIcon, MailIcon } from "@/components/shared/Icons";
import { profile } from "@/content/profile";
import type { Social } from "@/types/content";

const socialDetails: Record<
  Social["kind"],
  { detail: string; icon: typeof MailIcon; color: string }
> = {
  email: {
    detail: "rithanisk@gmail.com",
    icon: MailIcon,
    color: "var(--pf-rose-ink)",
  },
  linkedin: {
    detail: "/in/rithanisk",
    icon: LinkedInIcon,
    color: "var(--pf-forest-ink)",
  },
  github: {
    detail: "@rithanisk",
    icon: GithubIcon,
    color: "var(--pf-amber-ink)",
  },
};

export function ContactSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="px-5 pb-20 pt-12 md:px-[72px] md:pb-28 md:pt-16">
      <motion.div
        className="mx-auto max-w-[1296px] border-t pt-10 sm:pt-12"
        style={{ borderColor: "var(--pf-border)" }}
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: shouldReduceMotion ? 0.25 : 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="grid gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.72fr)] lg:items-end lg:gap-16">
          <div className="max-w-[700px]">
            <div className="pf-eyebrow mb-3">Say hello</div>
            <h2 className="font-serif text-[clamp(30px,4vw,48px)] font-light leading-[1.05] tracking-[-0.03em]">
              Let&apos;s make something meaningful.
            </h2>
            <p className="mt-4 max-w-[610px] text-[15px] leading-relaxed" style={{ color: "var(--pf-text-muted)" }}>
              Have an idea, an opportunity, or just want to talk about products, people, and technology? My inbox is always open.
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:gap-x-7 sm:gap-y-4 lg:justify-end">
            {profile.socials.map((social, index) => {
              const details = socialDetails[social.kind];
              const Icon = details.icon;
              const isExternal = social.kind !== "email";

              return (
                <motion.a
                  key={social.kind}
                  href={social.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                  className="group inline-flex items-center gap-2.5 py-1 text-[14px] font-medium"
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : index * 0.07 }}
                >
                  <span className="transition-transform duration-200 group-hover:-translate-y-0.5" style={{ color: details.color }}>
                    <Icon />
                  </span>
                  <span>
                    <span className="block" style={{ color: "var(--pf-text)" }}>{social.label}</span>
                    <span className="block text-[11px] font-normal" style={{ color: "var(--pf-text-dim)" }}>{details.detail}</span>
                  </span>
                  <span aria-hidden="true" className="ml-0.5 text-[13px] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: details.color }}>
                    ↗
                  </span>
                </motion.a>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
