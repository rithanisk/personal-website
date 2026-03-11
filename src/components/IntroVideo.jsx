export default function IntroVideo() {
  return (
    <div>
      <h2 className="mb-5 font-serif text-2xl font-semibold text-neutral-900 dark:text-white sm:text-3xl">
        A quick introduction to me
      </h2>
      <div className="relative aspect-video overflow-hidden rounded-xl border border-neutral-200 bg-neutral-900 dark:border-neutral-700">
          <video
            className="h-full w-full object-contain"
            controls
            playsInline
            poster="/hero-photo.png"
            preload="metadata"
            aria-label="Introduction video"
          >
            <source src="/intro%20video.MP4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
      </div>
    </div>
  );
}
