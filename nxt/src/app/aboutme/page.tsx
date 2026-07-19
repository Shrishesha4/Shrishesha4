import { getProfile } from "@/lib/data/profile";
import { CursorDrivenParticleTypography } from "@/components/ui/cursor-driven-particle-typography";
import { KineticTextReveal } from "@/components/ui/kinetic-text-reveal";
import { ScrollBasedVelocity } from "@/components/ui/scroll-based-velocity";
import { OrbitCardStack, type OrbitStackItem } from "@/components/ui/orbit-card-stack";
import { DitheredLogo } from "@/components/ui/dithered-logo";

export const revalidate = 300;

export default async function AboutMePage() {
  const profile = await getProfile();

  const educationItems: OrbitStackItem[] = profile.education.map((edu) => ({
    name: edu.degree,
    role: edu.institution,
    description: `Class of ${edu.year}`,
    stat: edu.year,
    initials: edu.institution.slice(0, 2).toUpperCase(),
  }));

  return (
    <div className="relative">
      <section className="mx-auto flex max-w-6xl flex-col items-center px-4 pt-20 pb-16 text-center md:pt-32">
        {profile.profileImage && (
          <DitheredLogo
            imageSrc={profile.profileImage}
            gridSize={10}
            className="mb-10 h-40 w-40 text-primary md:h-56 md:w-56"
          />
        )}
        <CursorDrivenParticleTypography
          text={profile.name || "Shrishesha"}
          fontSize={64}
          particleDensity={2}
          className="mb-4 h-24 w-full max-w-3xl text-4xl font-extrabold md:h-32 md:text-6xl"
        />
        <KineticTextReveal
          text={profile.title}
          splitBy="words"
          direction="up"
          className="text-lg font-medium text-primary md:text-2xl"
        />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-balance text-center font-heading text-2xl leading-relaxed text-foreground md:text-3xl">
          <span className="text-primary">&ldquo;</span>
          {profile.bio}
          <span className="text-primary">&rdquo;</span>
        </p>
      </section>

      {profile.skills.length > 0 && (
        <section className="overflow-hidden border-y border-border/50 py-8">
          <ScrollBasedVelocity
            text={profile.skills.join("  •  ")}
            default_velocity={3}
            className="text-2xl font-semibold text-muted-foreground md:text-4xl"
          />
        </section>
      )}

      {profile.experience.length > 0 && (
        <section className="mx-auto max-w-3xl px-4 py-20">
          <h2 className="mb-10 text-center text-sm font-semibold tracking-[0.3em] text-muted-foreground uppercase">
            Experience
          </h2>
          <div className="space-y-8">
            {profile.experience.map((item, i) => (
              <KineticTextReveal
                key={i}
                text={item}
                splitBy="lines"
                direction="left"
                autoPlay
                delay={i * 0.1}
                className="block border-l-2 border-primary/30 pl-6 text-lg text-foreground md:text-xl"
              />
            ))}
          </div>
        </section>
      )}

      {educationItems.length > 0 && (
        <section className="mx-auto max-w-5xl px-4 py-20">
          <h2 className="mb-12 text-center text-sm font-semibold tracking-[0.3em] text-muted-foreground uppercase">
            Education
          </h2>
          <OrbitCardStack items={educationItems} className="mx-auto" />
        </section>
      )}
    </div>
  );
}
