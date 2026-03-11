import Link from "next/link";
import { navLinks, site } from "@/content/site";

export default function Header() {
  return (
    <header className="border-b border-brand-pink/30 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="text-lg font-semibold text-black"
        >
          {site.name}
        </Link>
        <ul className="flex flex-wrap items-center gap-6">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-sm font-medium text-black/70 transition hover:text-brand-pink"
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={site.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-brand-pink transition hover:text-brand-pink-dark hover:underline"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
