import Head from "next/head";
import Hero from "@/components/Hero";
import IntroVideo from "@/components/IntroVideo";
import WorldMap from "@/components/WorldMap";
import { site } from "@/content/site";

export default function Home() {
  return (
    <>
      <Head>
        <title>{`${site.name} | Personal Website`}</title>
        <meta name="description" content={site.tagline} />
        <meta property="og:title" content={site.name} />
        <meta property="og:description" content={site.tagline} />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <IntroVideo />
      <WorldMap />
    </>
  );
}
