import { getBlogs } from "@/lib/data/blogs";

const SITE_URL = "https://shrishesha.space";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const blogs = await getBlogs();
  const sorted = [...blogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const items = sorted
    .map(
      (blog) => `
    <item>
      <title>${escapeXml(blog.title)}</title>
      <link>${SITE_URL}/blogs/${blog.slug}</link>
      <guid>${SITE_URL}/blogs/${blog.slug}</guid>
      <description>${escapeXml(blog.description)}</description>
      <pubDate>${new Date(blog.date).toUTCString()}</pubDate>
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>Shrishesha Narmatesshvara — Blog</title>
  <link>${SITE_URL}/blogs</link>
  <description>Crafting resilient infrastructure from India.</description>${items}
</channel>
</rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}
