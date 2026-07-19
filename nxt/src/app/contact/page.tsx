import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { getContactConfig, getSocialLinks } from "@/lib/data/config";
import { KineticTextReveal } from "@/components/ui/kinetic-text-reveal";
import { PixelCanvas } from "@/components/ui/pixel-canvas";
import { ContactForm } from "@/components/contact/contact-form";

export const revalidate = 300;

export default async function ContactPage() {
  const [contactConfig, socialLinks] = await Promise.all([getContactConfig(), getSocialLinks()]);

  return (
    <div className="relative overflow-hidden">
      <PixelCanvas className="absolute inset-0 -z-10 opacity-30" variant="trail" gap={8} />

      <div className="relative mx-auto max-w-3xl px-4 py-20 md:py-28">
        <div className="mb-6 text-center">
          <KineticTextReveal
            text="Let's Connect"
            splitBy="words"
            direction="up"
            className="text-4xl font-extrabold tracking-tight md:text-6xl"
          />
        </div>
        <p className="mx-auto mb-12 max-w-md text-center text-muted-foreground">
          Have an idea? Let&apos;s build something amazing together. I usually respond within 24 hours.
        </p>

        <div className="mb-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
          {contactConfig.email && (
            <a href={`mailto:${contactConfig.email}`} className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
              <Mail className="size-4" /> {contactConfig.email}
            </a>
          )}
          {contactConfig.phone && (
            <a href={`tel:${contactConfig.phone.replace(/\s+/g, "")}`} className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
              <Phone className="size-4" /> {contactConfig.phone}
            </a>
          )}
          {contactConfig.location && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactConfig.location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <MapPin className="size-4" /> {contactConfig.location}
            </a>
          )}
        </div>

        <ContactForm />

        {socialLinks.length > 0 && (
          <div className="mt-16 flex justify-center gap-6">
            {socialLinks.map((link) => (
              <Link
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.platform}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
