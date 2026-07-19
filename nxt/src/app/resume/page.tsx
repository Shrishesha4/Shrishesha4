import Image from "next/image";
import { Mail, MapPin, Phone, ExternalLink, GitFork } from "lucide-react";
import { getProfile } from "@/lib/data/profile";
import { getProjects } from "@/lib/data/projects";
import { getContactConfig, getSocialLinks } from "@/lib/data/config";
import { optimizeImage } from "@/lib/image-optimizer";
import { ForceLightMode } from "@/components/resume/force-light-mode";
import { PrintButton } from "@/components/resume/print-button";

export const revalidate = 300;

export default async function ResumePage() {
  const [profile, projects, contactConfig, socialLinks] = await Promise.all([
    getProfile(),
    getProjects(),
    getContactConfig(),
    getSocialLinks(),
  ]);

  const topProjects = [...projects]
    .sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1))
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 text-gray-900 sm:px-6 lg:px-8 print:bg-white print:p-0">
      <ForceLightMode />
      <PrintButton />

      <div className="mx-auto min-h-[29.7cm] max-w-[21cm] bg-white p-8 shadow-xl md:p-12 print:p-6 print:shadow-none">
        <header className="mb-6 border-b-2 border-gray-800 pb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="mb-2 text-4xl font-bold uppercase tracking-wide text-gray-900">{profile.name}</h1>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                {contactConfig.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="size-4" />
                    <a href={`mailto:${contactConfig.email}`} className="hover:underline">{contactConfig.email}</a>
                  </div>
                )}
                {(profile.location || contactConfig.location) && (
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4" />
                    <span>{profile.location || contactConfig.location}</span>
                  </div>
                )}
                {contactConfig.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="size-4" />
                    <span>{contactConfig.phone}</span>
                  </div>
                )}
              </div>
              <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                {socialLinks
                  .filter((l) => !l.url.startsWith("mailto:"))
                  .map((link) => (
                    <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {link.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                    </a>
                  ))}
              </div>
            </div>
            {profile.profileImage && (
              <Image
                src={optimizeImage(profile.profileImage, { width: 200 })}
                alt={profile.name}
                width={96}
                height={96}
                className="hidden rounded-full border-2 border-gray-200 object-cover sm:block print:block"
              />
            )}
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 print:grid-cols-3">
          <div className="md:col-span-2 print:col-span-2">
            <section className="mb-6">
              <h3 className="mb-3 border-b border-gray-300 pb-1 text-lg font-bold uppercase tracking-wider text-gray-800">
                Summary
              </h3>
              <p className="text-justify text-sm leading-relaxed text-gray-700">{profile.resumeBio || profile.bio}</p>
            </section>

            {profile.experience.length > 0 && (
              <section className="mb-6">
                <h3 className="mb-3 border-b border-gray-300 pb-1 text-lg font-bold uppercase tracking-wider text-gray-800">
                  Experience
                </h3>
                <ul className="ml-4 list-outside list-disc space-y-2">
                  {profile.experience.map((exp, i) => (
                    <li key={i} className="break-inside-avoid text-sm leading-relaxed text-gray-700">{exp}</li>
                  ))}
                </ul>
              </section>
            )}

            {topProjects.length > 0 && (
              <section className="mb-6">
                <h3 className="mb-3 border-b border-gray-300 pb-1 text-lg font-bold uppercase tracking-wider text-gray-800">
                  Projects
                </h3>
                <div className="space-y-4">
                  {topProjects.map((project) => (
                    <div key={project.id} className="break-inside-avoid">
                      <div className="mb-1 flex items-center gap-2">
                        <h4 className="text-sm font-bold text-gray-800">{project.title}</h4>
                        <div className="flex gap-2 text-xs text-gray-500 print:hidden">
                          {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="Repository">
                              <GitFork className="size-3.5" />
                            </a>
                          )}
                          {project.url && (
                            <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label="Live site">
                              <ExternalLink className="size-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                      {project.resumeSummary && project.resumeSummary.length > 0 ? (
                        <ul className="mb-2 ml-4 list-outside list-disc space-y-1">
                          {project.resumeSummary.map((point, i) => (
                            <li key={i} className="text-justify text-sm leading-relaxed text-gray-700">{point}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mb-2 text-justify text-sm leading-relaxed text-gray-700">{project.description}</p>
                      )}
                      {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech) => (
                            <span key={tech} className="rounded border border-gray-200 bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-600 print:border-gray-300 print:bg-white">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="border-l border-gray-100 md:col-span-1 md:pl-8 print:col-span-1 print:border-l print:pl-8">
            {(profile.skills.length > 0 || profile.techStack.length > 0) && (
              <section className="mb-6">
                <h3 className="mb-3 border-b border-gray-300 pb-1 text-lg font-bold uppercase tracking-wider text-gray-800">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {Array.from(new Set([...profile.skills, ...profile.techStack])).map((skill) => (
                    <span key={skill} className="rounded border border-gray-200 bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 print:bg-transparent">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {profile.education.length > 0 && (
              <section className="mb-6">
                <h3 className="mb-3 border-b border-gray-300 pb-1 text-lg font-bold uppercase tracking-wider text-gray-800">
                  Education
                </h3>
                <div className="space-y-4">
                  {profile.education.map((edu, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-gray-800">{edu.institution}</h4>
                        <p className="text-sm text-gray-700">{edu.degree}</p>
                      </div>
                      <span className="mt-1 rounded bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 sm:mt-0 print:bg-transparent print:p-0">
                        {edu.year}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
