import { site } from "@/content/site";
import SocialIcons from "./SocialIcons";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-neutral-200 py-8 dark:border-neutral-800">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 px-6 sm:flex-row sm:flex-wrap">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Planted by {site.name.split(" ")[0]}
        </p>
        <SocialIcons className="[&_a]:text-neutral-500 [&_a:hover]:text-brand-pink dark:[&_a]:text-neutral-400" />
      </div>
    </footer>
  );
}
