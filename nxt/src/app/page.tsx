import Link from "next/link";
import { Star } from "lucide-react";
import { getProfile } from "@/lib/data/profile";
import { getBlogs } from "@/lib/data/blogs";
import { getProjects } from "@/lib/data/projects";
import { getGithubRepos } from "@/lib/data/github";
import { slugify } from "@/lib/slugify";
import { CursorDrivenParticleTypography } from "@/components/ui/cursor-driven-particle-typography";
import { KineticTextReveal } from "@/components/ui/kinetic-text-reveal";
import { ScrollBasedVelocity } from "@/components/ui/scroll-based-velocity";
import { WebGLLiquid } from "@/components/ui/webgl-liquid";
import { OrbitCardStack, type OrbitStackItem } from "@/components/ui/orbit-card-stack";
import { Carousel_003 } from "@/components/ui/skiper-ui/skiper49";
import { Badge } from "@/components/ui/badge";

export const revalidate = 300;

export default async function HomePage() {
  const [profile, blogs, projects, repos] = await Promise.all([
    getProfile(),
    getBlogs(),
    getProjects(),
    getGithubRepos(),
  ]);

  const recentBlogs = [...blogs]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const featuredProjects = projects.filter((p) => p.featured);
  const projectSlides = (featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 6))
    .filter((p) => p.image)
    .map((p) => ({
      src: p.image!,
      alt: p.title,
      caption: p.title,
      href: `/projects/${slugify(p.title)}`,
    }));

  const repoItems: OrbitStackItem[] = repos.slice(0, 8).map((r) => ({
    name: r.name,
    role: r.language ?? "Code",
    description: r.description ?? "No description provided.",
    stat: `★ ${r.stargazers_count}`,
    initials: r.name.slice(0, 2).toUpperCase(),
  }));

  return (
    <div>
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <WebGLLiquid
          title=""
          subtitle=""
          description=""
          className="absolute inset-0 min-h-0"
          opacity={0.6}
        />
        <div className="relative z-10 flex flex-col items-center px-4 text-center">
          <CursorDrivenParticleTypography
            text={profile.name || "Shrishesha"}
            fontSize={80}
            particleDensity={2}
            className="mb-6 h-28 w-full max-w-4xl text-5xl font-extrabold text-white md:h-40 md:text-8xl"
          />
          <KineticTextReveal
            text={profile.title}
            splitBy="words"
            direction="up"
            className="text-xl font-medium text-white/80 md:text-3xl"
          />
        </div>
      </section>

      {profile.techStack.length > 0 && (
        <section className="overflow-hidden border-y border-border/50 py-8">
          <ScrollBasedVelocity
            text={profile.techStack.join("  •  ")}
            default_velocity={4}
            className="text-2xl font-semibold text-muted-foreground md:text-4xl"
          />
        </section>
      )}

      {projectSlides.length > 0 && (
        <section className="py-20">
          <h2 className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Featured Work
          </h2>
          <div className="flex justify-center">
            <Carousel_003 images={projectSlides} showPagination loop />
          </div>
        </section>
      )}

      {recentBlogs.length > 0 && (
        <section className="mx-auto max-w-3xl px-4 py-20">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Latest Writing
            </h2>
            <Link href="/blogs" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-border">
            {recentBlogs.map((blog) => (
              <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group flex items-baseline gap-6 py-6">
                <span className="hidden shrink-0 font-mono text-sm text-muted-foreground sm:block">
                  {new Date(blog.date).toLocaleDateString(undefined, { month: "short", day: "2-digit" })}
                </span>
                <h3 className="flex-1 text-lg font-semibold transition-transform duration-300 group-hover:translate-x-2">
                  {blog.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {repoItems.length > 0 && (
        <section className="mx-auto max-w-5xl px-4 py-20">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              From GitHub
            </h2>
            <a
              href="https://github.com/shrishesha4"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-primary hover:underline"
            >
              <Star className="size-3.5" /> @shrishesha4
            </a>
          </div>
          <OrbitCardStack items={repoItems} className="mx-auto" />
        </section>
      )}

      {profile.badges.length > 0 && (
        <section className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3 px-4 pb-20">
          {profile.badges.map((badge, i) => (
            <Badge key={i} variant="outline" className="px-4 py-2">
              {badge.title}
            </Badge>
          ))}
        </section>
      )}
    </div>
  );
}
