import { Source_Serif_4, Inter } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Layout from "@/components/Layout";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <div className={`${sourceSerif.variable} ${inter.variable}`}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </ThemeProvider>
  );
}
