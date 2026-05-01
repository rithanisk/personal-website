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
        </ThemeProvider>
      </body>
    </html>
  );
}
