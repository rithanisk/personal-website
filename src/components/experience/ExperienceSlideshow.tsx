"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ExperiencePhoto } from "@/types/content";
import styles from "./ExperienceContent.module.css";

export function ExperienceSlideshow({ photos, name }: { photos: ExperiencePhoto[]; name: string }) {
  const [index, setIndex] = useState(0);
  const [enlarged, setEnlarged] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStart = useRef({ x: 0, y: 0 });
  const photo = photos[index];
  const move = (offset: number) => setIndex((current) => (current + offset + photos.length) % photos.length);

  useEffect(() => {
    if (!enlarged) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => { dialog?.close(); document.body.style.overflow = previousOverflow; };
  }, [enlarged]);

  if (!photo) return null;

  return (
    <>
      <figure className={styles.slideshow} role="region" aria-roledescription="carousel" aria-label={`${name} photos`} tabIndex={0}
        onKeyDown={(event) => { if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); move(event.key === "ArrowLeft" ? -1 : 1); } }}>
        <button type="button" className={styles.photoStage} aria-label={`Enlarge photo: ${photo.caption ?? photo.alt}`} onClick={() => setEnlarged(true)}
          onTouchStart={(event) => { touchStart.current = { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY }; }}
          onTouchEnd={(event) => { const dx = event.changedTouches[0].clientX - touchStart.current.x; const dy = event.changedTouches[0].clientY - touchStart.current.y; if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) { move(dx < 0 ? 1 : -1); } }}>
          <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 900px) 90vw, 38vw" className={styles.photo} style={{ objectPosition: photo.objectPosition }} />
          <span className={styles.enlarge} aria-hidden="true">⤢</span>
        </button>
        <figcaption className={styles.photoCaption}><span aria-live="polite" aria-atomic="true">{photo.caption ?? photo.alt}</span><div className={styles.slideControls}><span>{index + 1} / {photos.length}</span><button type="button" aria-label={`Previous ${name} photo`} onClick={() => move(-1)}>←</button><button type="button" aria-label={`Next ${name} photo`} onClick={() => move(1)}>→</button></div></figcaption>
        {photos.length > 1 && <div className={styles.slideDots} aria-label="Choose a photo">{photos.map((item, i) => <button key={item.src} type="button" onClick={() => setIndex(i)} aria-label={`Show photo ${i + 1}: ${item.caption ?? item.alt}`} aria-current={i === index ? "true" : undefined} />)}</div>}
      </figure>
      {enlarged && <dialog ref={dialogRef} className={styles.photoDialog} aria-label={`${name} enlarged photo`} onCancel={() => setEnlarged(false)} onClose={() => setEnlarged(false)}
        onClick={(event) => { if (event.target === event.currentTarget) setEnlarged(false); }}
        onKeyDown={(event) => { if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); move(event.key === "ArrowLeft" ? -1 : 1); } }}>
        <div className={styles.enlargedPhoto}><Image src={photo.src} alt={photo.alt} fill sizes="90vw" className={styles.photo} /></div>
        <div className={styles.dialogFooter}><span>{photo.caption ?? photo.alt} · {index + 1} / {photos.length}</span><div><button type="button" aria-label="Previous photo" onClick={() => move(-1)}>←</button><button type="button" aria-label="Next photo" onClick={() => move(1)}>→</button><button type="button" onClick={() => setEnlarged(false)} autoFocus>Close</button></div></div>
      </dialog>}
    </>
  );
}
