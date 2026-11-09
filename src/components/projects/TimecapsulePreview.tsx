import Image from "next/image";
import styles from "./TimecapsulePreview.module.css";

const photos = ["arcade-friends.webp", "cafe-toast.webp", "seaside-friends.webp", "boardgame-night.webp"];

export function TimecapsulePreview() {
  return <div className={styles.preview} aria-label="Timecapsule: capture separately, reveal together">
    <div className={styles.copy}><span>Timecapsule</span><p>Capture separately.<br />Reveal together.</p><small>A little keepsake for your people.</small></div>
    <div className={styles.strip}>{photos.map((photo, index) => <div className={styles.frame} key={photo}><Image src={`/media-v1/projects/timecapsule/${photo}`} alt={`Photo booth sample ${index + 1}`} fill sizes="120px" className={styles.photo} /></div>)}<span>timecapsule</span></div>
  </div>;
}
