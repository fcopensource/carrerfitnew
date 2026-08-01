import type { Metadata } from "next";
import { ArrowLeft, Building2, Check, CircleDollarSign, Clock3, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import AppNav from "@/components/AppNav";
import { siteUrl } from "@/lib/site";
import type { Job } from "@/lib/types";
import { jobs } from "@/server/data/jobs";
import { getImportedJob } from "@/server/job-database";
import JobActions from "./JobActions";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = await findJob((await params).id);
  if (!job) return { title: "Job not found | CarrerFit", robots: { index: false, follow: false } };
  const title = `${job.title} at ${job.company} | CarrerFit Jobs`;
  const description = `${job.title} opportunity at ${job.company} in ${job.location}. Review skills, requirements, work arrangement, and the verified employer application link.`;
  const canonical = `/jobs/${job.id}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { type: "website", url: canonical, title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function JobDetailPage({ params }: Props) {
  const job = await findJob((await params).id);
  if (!job) notFound();
  const schema = jobSchema(job);

  return <main className="appShell"><AppNav light />
    <section className="jobDetailHero"><Link href="/jobs"><ArrowLeft size={17}/> All jobs</Link><div className="detailTitle"><span className="companyLogo large">{job.logo}</span><div><span className="fitPill"><Sparkles size={14}/>{job.fitScore}% match</span><h1>{job.title}</h1><p><Building2 size={17}/>{job.company}</p></div></div><div className="detailMeta"><span><MapPin/>{job.location}</span><span><Clock3/>{job.postedDaysAgo === 0 ? "Posted today" : `Posted ${job.postedDaysAgo} days ago`}</span><span><CircleDollarSign/>{job.salaryMin > 0 ? `₹${job.salaryMin}–${job.salaryMax} LPA` : "Salary on employer site"}</span></div></section>
    <section className="jobDetailGrid"><article className="jobCopy"><h2>About the role</h2><p>{job.description}</p><h2>What you’ll bring</h2><ul>{job.requirements.map(skill => <li key={skill}><Check size={17}/>{skill}</li>)}</ul><h2>Skills connected to this role</h2><ul>{job.skills.map(skill => <li key={skill}><Check size={17}/>{skill}</li>)}</ul><h2>Application source</h2><p>This opportunity was collected from the employer-hosted {job.source} board. CarrerFit is an independent career platform and is not the hiring employer.</p><div className="originalSource"><Check/> Original listing verified on {job.source} · {new Date(job.verifiedAt).toLocaleDateString("en-IN")}</div></article><JobActions job={job}/></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(schema) }}/>
  </main>;
}

async function findJob(id: string) {
  const curated = jobs.find(item => item.id === id);
  if (curated) return curated;
  try { return await getImportedJob(id); } catch { return null; }
}

function jobSchema(job: Job) {
  const remote = job.workMode === "Remote";
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.postedAt || new Date(Date.now() - job.postedDaysAgo * 86_400_000).toISOString(),
    identifier: { "@type": "PropertyValue", name: job.company, value: job.id },
    hiringOrganization: { "@type": "Organization", name: job.company },
    url: siteUrl(`/jobs/${job.id}`),
    directApply: false,
    ...(remote
      ? { jobLocationType: "TELECOMMUTE", applicantLocationRequirements: { "@type": "Country", name: job.location === "Global" ? "Worldwide" : job.location } }
      : { jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: job.location } } }),
  };
}

function safeJson(value: unknown) { return JSON.stringify(value).replace(/</g, "\\u003c"); }
