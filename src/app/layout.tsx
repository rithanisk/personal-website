import type { Metadata } from "next";
import { Source_Serif_4, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/lib/theme";
import { FloatingNav } from "@/components/chrome/FloatingNav";
import { MobileTopBar } from "@/components/chrome/MobileTopBar";
import { GrainOverlay } from "@/components/shared/GrainOverlay";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rithani Saravanakumar",
  description: "CS student building backends, AI tools, and things in between.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sourceSerif.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <GrainOverlay />
          <FloatingNav />
          <MobileTopBar />
          <div>{children}</div>
          <footer
            className="px-5 md:px-[72px] py-8 text-center font-mono text-[12px] tracking-[0.04em]"
            style={{ color: "var(--pf-text-muted)", borderTop: "1px solid var(--pf-border)" }}
          >
            &copy; {new Date().getFullYear()} Rithani Saravanakumar
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
