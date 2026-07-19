import { getProjects } from "@/lib/data/projects";
import { KineticTextReveal } from "@/components/ui/kinetic-text-reveal";
import { ProjectFilter } from "@/components/projects/project-filter";

export const revalidate = 300;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <KineticTextReveal
        text="Projects"
        splitBy="characters"
        direction="up"
        className="mb-12 text-5xl font-extrabold tracking-tight md:text-7xl"
      />
      <ProjectFilter projects={projects} />
    </div>
  );
}
