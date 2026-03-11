export default function IntroVideo() {
  return (
    <section className="border-b border-brand-pink/30 bg-white py-11 sm:py-16">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="mb-5 text-center text-2xl font-bold text-black sm:text-3xl">
          A Quick Introduction to Me!
        </h2>
        <div className="relative aspect-video overflow-hidden border-2 border-brand-pink/30 bg-black shadow-md">
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
    </section>
  );
}
