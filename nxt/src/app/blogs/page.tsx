import { getBlogs } from "@/lib/data/blogs";
import { KineticTextReveal } from "@/components/ui/kinetic-text-reveal";
import { BlogFilter } from "@/components/blogs/blog-filter";

export const revalidate = 300;

export default async function BlogsPage() {
  const blogs = await getBlogs();
  const sorted = [...blogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:py-24">
      <KineticTextReveal
        text="Field Notes"
        splitBy="characters"
        direction="up"
        className="mb-12 text-5xl font-extrabold tracking-tight md:text-7xl"
      />
      <BlogFilter blogs={sorted} />
    </div>
  );
}
