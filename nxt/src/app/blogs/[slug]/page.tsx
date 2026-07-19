import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getBlogBySlug, getBlogs } from "@/lib/data/blogs";
import { Badge } from "@/components/ui/badge";
import { BlogContent } from "@/components/blogs/blog-content";
import { optimizeImage } from "@/lib/image-optimizer";

export const revalidate = 300;

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((b) => ({ slug: b.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 md:py-20">
      <Link href="/blogs" className="mb-8 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground">
        <ChevronLeft className="mr-1 size-4" />
        Posts
      </Link>

      <header className="mb-10">
        <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl">{blog.title}</h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <time>
            {new Date(blog.date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
          </time>
          {blog.tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </header>

      {blog.image && (
        <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-2xl shadow-2xl">
          <Image src={optimizeImage(blog.image, { width: 1200 })} alt={blog.title} fill className="object-cover" sizes="768px" priority />
        </div>
      )}

      <BlogContent content={blog.content} />
    </article>
  );
}
