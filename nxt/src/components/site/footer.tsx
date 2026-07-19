import Link from "next/link";
import type { SocialLink } from "@/lib/types";

export function Footer({ socialLinks = [] }: { socialLinks?: SocialLink[] }) {
  return (
    <footer className="mt-auto border-t border-border/50 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-sm text-muted-foreground md:flex-row md:justify-between md:px-8">
        <p>&copy; {new Date().getFullYear()} Shrishesha Narmatesshvara. Crafting resilient infrastructure from India.</p>
        {socialLinks.length > 0 && (
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <Link
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}
