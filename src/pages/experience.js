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
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-2xl font-bold text-black">
          Experience
        </h1>
        <p className="mt-2 text-black/70">
          Roles, internships, and work history.
        </p>
        <div className="mt-10">
          <ExperienceList />
        </div>
      </div>
    </>
  );
}
