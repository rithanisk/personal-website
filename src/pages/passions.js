import Head from "next/head";
import Passions from "@/components/Passions";
import { site } from "@/content/site";

export default function PassionsPage() {
  return (
    <>
      <Head>
        <title>{`Passions | ${site.name}`}</title>
        <meta name="description" content={`Get to know ${site.name} — interests and hobbies beyond work.`} />
      </Head>
      <Passions />
    </>
  );
}
