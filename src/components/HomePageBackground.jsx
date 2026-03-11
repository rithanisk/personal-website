/**
 * Decorative background for the home page only: soft pink shapes.
 */
export default function HomePageBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute -right-20 -top-10 h-72 w-72 rounded-full bg-brand-pink/10 blur-2xl" />
      <div className="absolute bottom-20 -left-16 h-56 w-56 rounded-full bg-brand-pink/15 blur-2xl" />
      <div className="absolute right-1/4 top-1/3 h-40 w-40 rounded-full bg-brand-pink/10 blur-xl" />
      <div className="absolute left-1/3 bottom-1/4 h-32 w-32 rounded-full bg-brand-pink/10 blur-xl" />
    </div>
  );
}
