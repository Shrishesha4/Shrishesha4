import { notFound } from "next/navigation";
import { ExternalLink, GitFork } from "lucide-react";
import { getProjectBySlug, getProjects } from "@/lib/data/projects";
import { slugify } from "@/lib/slugify";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KineticTextReveal } from "@/components/ui/kinetic-text-reveal";
import { ScrollSplitCard } from "@/components/ui/scroll-split-card";

export const revalidate = 300;

const PALETTE = [
  { bgColor: "#1e293b", textColor: "#f8fafc" },
  { bgColor: "#0f766e", textColor: "#f0fdfa" },
  { bgColor: "#7c2d12", textColor: "#fff7ed" },
];

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: slugify(p.title) }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const cards = project.technologies.slice(0, 3).map((tech, i) => ({
    title: tech,
    description: `Built with ${tech}`,
    ...PALETTE[i % PALETTE.length],
  }));

  return (
    <article>
      {project.image && cards.length > 0 && (
        <ScrollSplitCard imageSrc={project.image} cards={cards} />
      )}

      <div className="mx-auto max-w-3xl px-4 py-16">
        <KineticTextReveal
          text={project.title}
          splitBy="words"
          direction="up"
          className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl"
        />

        <div className="mb-8 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary">{tech}</Badge>
          ))}
        </div>

        <div className="mb-10 flex flex-wrap gap-4">
          {project.url && (
            <Button render={<a href={project.url} target="_blank" rel="noopener noreferrer" />} nativeButton={false}>
              <ExternalLink className="size-4" />
              Live
            </Button>
          )}
          {project.github && (
            <Button
              variant="secondary"
              render={<a href={project.github} target="_blank" rel="noopener noreferrer" />}
              nativeButton={false}
            >
              <GitFork className="size-4" />
              Repo
            </Button>
          )}
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h3>About the Project</h3>
          <p className="whitespace-pre-line">{project.description}</p>
        </div>
      </div>
    </article>
  );
}
