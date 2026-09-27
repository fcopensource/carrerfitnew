import { siteUrl } from "@/lib/site";
import { listPublishedBlogPosts } from "@/server/blog-store";
export const runtime = "nodejs"; export const dynamic = "force-dynamic";
export async function GET() {
  const posts = await listPublishedBlogPosts({ limit: 100 });
  const feedUrl = siteUrl("/rss.xml");
  const items = posts.map((post) => {
    const categories = [post.category, ...post.tags.slice(0, 5)].map((value) => `<category>${xml(value)}</category>`).join("");
    return `<item><title>${xml(post.title)}</title><link>${xml(siteUrl(`/blog/${post.slug}`))}</link><guid isPermaLink="true">${xml(siteUrl(`/blog/${post.slug}`))}</guid><description>${xml(post.excerpt)}</description>${categories}<pubDate>${new Date(post.publishedAt || post.createdAt).toUTCString()}</pubDate></item>`;
  }).join("");
  const feed = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>CarrerFit Career Guides</title><link>${xml(siteUrl("/blog"))}</link><atom:link href="${xml(feedUrl)}" rel="self" type="application/rss+xml"/><description>Practical guides for resumes, interviews, career changes, technical skills, and focused job searches.</description><language>en-in</language><lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${items}</channel></rss>`;
  return new Response(feed, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=3600" } });
}
function xml(value: string) { return value.replace(/[<>&'"]/g, character => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[character]!); }
