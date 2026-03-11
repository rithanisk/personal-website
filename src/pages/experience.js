import Head from "next/head";
import ExperienceList from "@/components/ExperienceList";
import { site } from "@/content/site";

export default function Experience() {
  return (
    <>
      <Head>
        <title>{`Experience | ${site.name}`}</title>
        <meta name="description" content={`Experience and background of ${site.name}`} />
      </Head>
      <div>
        <h1 className="font-serif text-3xl font-semibold text-neutral-900 dark:text-white">
          Experience
        </h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Roles, internships, and work history.
        </p>
        <div className="mt-10">
          <ExperienceList />
        </div>
      </div>
    </>
  );
}
