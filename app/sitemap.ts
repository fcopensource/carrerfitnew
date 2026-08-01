import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { listPublishedBlogPosts } from "@/server/blog-store";
import { listImportedJobs } from "@/server/job-database";
import { jobs as curatedJobs } from "@/server/data/jobs";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date(); const pages: MetadataRoute.Sitemap = [
    ["/", "weekly", 1], ["/jobs", "daily", .95], ["/blog", "weekly", .9], ["/privacy", "monthly", .5],
  ].map(([path, changeFrequency, priority]) => ({ url: siteUrl(String(path)), lastModified: now, changeFrequency: changeFrequency as "daily" | "weekly" | "monthly", priority: Number(priority) }));
  try {
    const [posts, importedJobs] = await Promise.all([listPublishedBlogPosts({ limit: 1000 }), listImportedJobs({ limit: 1000 })]);
    const jobs = [...new Map([...importedJobs, ...curatedJobs].map(job => [job.id, job])).values()];
    return [
      ...pages,
      ...jobs.map(job => ({ url: siteUrl(`/jobs/${job.id}`), lastModified: new Date(job.discoveredAt || job.verifiedAt), changeFrequency: "daily" as const, priority: .8 })),
      ...posts.map(post => ({ url: siteUrl(`/blog/${post.slug}`), lastModified: new Date(post.updatedAt), changeFrequency: "monthly" as const, priority: .8 })),
    ];
  }
  catch { return pages; }
}
