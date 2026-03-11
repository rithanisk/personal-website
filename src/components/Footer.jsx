import { site } from "@/content/site";
import SocialIcons from "./SocialIcons";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-brand-pink/30 bg-brand-pink-soft">
      <div className="mx-auto max-w-4xl px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:flex-wrap">
          <p className="text-sm text-black/70">
            © {year} {site.name}
          </p>
          <SocialIcons className="[&_a]:text-brand-pink [&_a:hover]:text-brand-pink-dark" />
        </div>
      </div>
    </footer>
  );
}
