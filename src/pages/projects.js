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
      <div className="mx-auto max-w-3xl px-6 py-14 sm:py-16">
        <h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
          Projects
        </h1>
        <p className="mt-3 text-black/70">
          Research, ML pipelines, and side projects.
        </p>
        <div className="mt-12">
          <ProjectsList />
        </div>
      </div>
    </>
  );
}
