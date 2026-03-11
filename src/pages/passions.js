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
      <div>
        <h1 className="font-serif text-3xl font-semibold text-neutral-900 dark:text-white">
          Passions
        </h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Beyond work—here's what I'm into and what keeps me inspired.
        </p>
        <div className="mt-10">
          <Passions />
        </div>
      </div>
    </>
  );
}
