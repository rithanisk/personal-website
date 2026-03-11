import Head from "next/head";
import ProjectsList from "@/components/ProjectsList";
import { site } from "@/content/site";

export default function Projects() {
  return (
    <>
      <Head>
        <title>{`Projects | ${site.name}`}</title>
        <meta name="description" content={`Projects and work by ${site.name}`} />
      </Head>
      <div>
        <h1 className="font-serif text-3xl font-semibold text-neutral-900 dark:text-white">
          Projects
        </h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Research, ML pipelines, and side projects.
        </p>
        <div className="mt-10 grid gap-6">
          <ProjectsList />
        </div>
      </div>
    </>
  );
}
