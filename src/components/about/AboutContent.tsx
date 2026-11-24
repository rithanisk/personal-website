"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { GithubIcon, LinkedInIcon, MailIcon, ArrowRightIcon } from "@/components/shared/Icons";
import styles from "./AboutContent.module.css";

const MotionLink = motion.create(Link);

export function AboutContent() {
  const reduceMotion = useReducedMotion();
  const tileVariants = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: .5, ease: [0.22, 1, 0.36, 1] as const } } };
  const [filmOpen, setFilmOpen] = useState(false);
  const filmDialogRef = useRef<HTMLDialogElement>(null);
  const [message, setMessage] = useState("");
  const emailHref = `mailto:rithanisk@gmail.com?subject=${encodeURIComponent("Hello Rithani")}&body=${encodeURIComponent(message)}`;

  useEffect(() => {
    if (!filmOpen) return;
    const dialog = filmDialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => { dialog?.close(); document.body.style.overflow = previousOverflow; };
  }, [filmOpen]);

  return (
    <main className={styles.page}>
      <motion.div className={styles.grid} initial={reduceMotion ? false : "hidden"} animate="visible" variants={{ visible: { transition: { staggerChildren: .075 } } }}>
        <motion.figure variants={tileVariants} className={`${styles.photoPanel} ${styles.portrait}`}>
          <Image src="/media-v1/about-brooklyn-bridge.webp" alt="Rithani Saravanakumar on the Brooklyn Bridge at sunset" fill sizes="(max-width: 560px) 90vw, (max-width: 950px) 45vw, 25vw" className={styles.portraitImage} priority />
        </motion.figure>
        <motion.section variants={tileVariants} className={`${styles.panel} ${styles.bio}`} aria-labelledby="about-title">
          <header>
            <div className="pf-eyebrow">About</div><h1 id="about-title">[A little about <span style={{ color: "var(--pf-rose)" }}>Rithani</span>.]</h1>
          </header>
          <div className={styles.bioSections}>
            <section><h2>Where I’m from</h2><p>I grew up in the US and <mark className={`${styles.highlight} ${styles.forest}`}>moved to Singapore</mark> to study computer science at the <strong>National University of Singapore</strong>. Since then, I’ve also lived and worked in Vietnam and Toronto.</p></section>
            <section><h2>What I do</h2><p>Most of my work so far has been in health tech. I spent a summer at <Link href="/experience#buymed">Buymed</Link> working on internal software, then a year at <Link href="/experience#nia">NiaHealth</Link> as an <mark className={`${styles.highlight} ${styles.rose}`}>AI Product Engineer</mark>, building tools for patients and clinicians.</p></section>
            <section><h2>Right now</h2><p>I’m back at NUS, researching <mark className={`${styles.highlight} ${styles.forest}`}><Link href="/experience#icu-mortality-research">ICU mortality prediction</Link></mark> and teaching <Link href="/experience#nus-ta">digital ethics and data privacy</Link>. Alongside that, I’m building <Link href="/projects">Alankara</Link>, an AI wardrobe stylist, and <Link href="/projects">Timecapsule</Link>, a shared photo booth for friends.</p></section>
            <section><h2>Away from my laptop</h2><p>Before I started coding, I spent years learning <mark className={`${styles.highlight} ${styles.rose}`}>Bharatanatyam and Carnatic music</mark>. I still make time for both, as well as art and cooking for my family.</p></section>
            <section><h2>What I care about</h2><p>I try to <mark className={`${styles.highlight} ${styles.amber}`}>understand who a product is for</mark> before deciding how to build it. I also enjoy making smaller things for people I know, like a bot for a coding challenge with a friend.</p></section>
          </div>
          <Link className={styles.storyLink} href="/my-story">The longer story <ArrowRightIcon /></Link>
          <nav className={styles.socials} aria-label="Find me online">
            <a href="mailto:rithanisk@gmail.com" aria-label="Email Rithani"><MailIcon /></a>
            <a href="https://www.linkedin.com/in/rithanisk/" target="_blank" rel="noopener noreferrer" aria-label="Rithani on LinkedIn"><LinkedInIcon /></a>
            <a href="https://github.com/rithanisk" target="_blank" rel="noopener noreferrer" aria-label="Rithani on GitHub"><GithubIcon /></a>
          </nav>
        </motion.section>
        <motion.a variants={tileVariants} className={`${styles.panel} ${styles.linkedin}`} aria-label="Rithani Saravanakumar on LinkedIn" href="https://www.linkedin.com/in/rithanisk/" target="_blank" rel="noopener noreferrer">
          <div className={styles.linkedinBanner}><Image src="/media-v1/linkedin-official-icon.png" alt="LinkedIn" width={32} height={27} className={styles.linkedinLogo} /></div>
          <div className={styles.linkedinBody}>
            <Image src="/media-v1/about-avatar.webp" alt="" width={56} height={56} className={styles.linkedinAvatar} />
            <h2>Rithani Saravanakumar</h2>
            <p>Computer Science @ NUS<br />AI products · ML research</p>
            <span className={styles.linkedinLink}>View LinkedIn profile <ArrowRightIcon /></span>
          </div>
        </motion.a>
        <motion.section variants={tileVariants} className={`${styles.panel} ${styles.storytelling}`} aria-labelledby="storytelling-title">
          <div className={styles.filmIntro}><h2 id="storytelling-title">Filmmaking & storytelling</h2><p>I make videos about what I’m building and how I pitch it.</p></div>
          <button type="button" className={styles.filmPreview} aria-label="Watch Rithani’s intro film" onClick={() => setFilmOpen(true)}>
            <Image src="/media-v1/toronto2.webp" alt="Rithani presenting her work at NiaHealth" fill sizes="(max-width: 560px) 90vw, (max-width: 1100px) 45vw, 23vw" className={styles.cover} style={{ objectPosition: "25% center" }} />
            <span className={styles.filmShade} aria-hidden="true" /><span className={styles.filmPlay} aria-hidden="true">▶</span><span className={styles.filmLabel}>Watch my intro film <ArrowRightIcon /></span>
          </button>
        </motion.section>
        <MotionLink variants={tileVariants} href="/passions" className={`${styles.photoPanel} ${styles.passions}`} aria-label="Explore my Bharatanatyam and other passions">
          <Image src="/media-v1/passions/dancing/dancing-1.webp" alt="Rithani performing Bharatanatyam" fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 45vw, 23vw" className={styles.cover} style={{ objectPosition: "center 35%" }} />
          <div className={styles.photoShade} /><div className={styles.photoTop}><span>Beyond the screen</span></div><div className={styles.photoBottom}><div><h2>Passions</h2><p>Dance, music, art & cooking.</p></div><ArrowRightIcon /></div>
        </MotionLink>
        <MotionLink variants={tileVariants} href="/projects" className={`${styles.panel} ${styles.projects}`} aria-label="Explore my projects and Alankara">
          <div className={styles.projectLabel}><div><h2>Currently building</h2><p>Alankara · AI wardrobe stylist</p></div><ArrowRightIcon /></div>
          <div className={styles.photoPrint}><Image src="/media-v1/projects/closet-ai-stylist-screen.webp" alt="The Alankara wardrobe and AI stylist interface" fill sizes="(max-width: 560px) 90vw, (max-width: 1100px) 45vw, 23vw" className={styles.projectImage} /></div>
        </MotionLink>
        <motion.section variants={tileVariants} className={`${styles.panel} ${styles.contact}`} aria-labelledby="contact-title">
          <div className={styles.contactIntro}><span className={styles.mailBadge}><MailIcon /></span><div><h2 id="contact-title">Have something in mind?</h2><p>I’d love to hear about it.</p></div></div>
          <label className={styles.srOnly} htmlFor="about-message">Your message to Rithani</label>
          <div className={styles.composer}><input id="about-message" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="An idea, an opportunity, or just hello…" maxLength={2000} /><a href={emailHref} aria-label="Draft an email to Rithani"><ArrowRightIcon /></a></div>
          <a className={styles.emailAddress} href="mailto:rithanisk@gmail.com">rithanisk@gmail.com</a>
        </motion.section>
      </motion.div>
      {filmOpen && <dialog ref={filmDialogRef} className={styles.filmDialog} aria-label="Rithani’s intro film" onCancel={() => setFilmOpen(false)} onClose={() => setFilmOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) setFilmOpen(false); }}>
        <div className={styles.filmDialogHeader}><h2>An intro, on film</h2><button type="button" onClick={() => setFilmOpen(false)} autoFocus aria-label="Close film">Close ×</button></div>
        <video src="/intro-video.mp4" controls autoPlay playsInline aria-label="Rithani’s intro film" />
      </dialog>}
    </main>
  );
}
