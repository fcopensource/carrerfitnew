"use client";

import { ArrowRight, BriefcaseBusiness, CheckCircle2, ChevronLeft, ChevronRight, MapPin, Search, SlidersHorizontal, Sparkles, Target, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import AppNav from "../../components/AppNav";
import JobCard from "../../components/JobCard";
import { api } from "../../lib/api";
import type { Job } from "../../lib/types";

const categories = ["All", "Product", "Data", "Design", "Engineering", "Salesforce", "Marketing", "Customer Success", "Other"];
const modes = ["All", "Remote", "Hybrid", "On-site"];
const JOBS_PER_PAGE = 18;

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All");
  const [mode, setMode] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true); setError("");
      api<{ jobs: Job[] }>(`/api/jobs?q=${encodeURIComponent(q)}&category=${encodeURIComponent(category)}&mode=${encodeURIComponent(mode)}`)
        .then(data => setJobs(data.jobs)).catch(err => setError(err.message)).finally(() => setLoading(false));
    }, 180);
    return () => clearTimeout(timer);
  }, [q, category, mode]);
  useEffect(() => setPage(1), [q, category, mode]);

  const insights = useMemo(() => ({
    remote: jobs.filter(job => job.workMode === "Remote").length,
    strong: jobs.filter(job => job.fitScore >= 75).length,
    newRoles: jobs.filter(job => job.postedDaysAgo <= 7).length
  }), [jobs]);
  const activeFilters = Number(category !== "All") + Number(mode !== "All") + Number(Boolean(q));
  const clear = () => { setQ(""); setCategory("All"); setMode("All"); };
  const pageCount = Math.max(1, Math.ceil(jobs.length / JOBS_PER_PAGE));
  const visibleJobs = useMemo(() => jobs.slice((page - 1) * JOBS_PER_PAGE, page * JOBS_PER_PAGE), [jobs, page]);
  const goToPage = (nextPage: number) => {
    setPage(Math.max(1, Math.min(pageCount, nextPage)));
    requestAnimationFrame(() => document.getElementById("job-results")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };
  const paginationPages = Array.from({ length: pageCount }, (_, index) => index + 1).filter(number => number === 1 || number === pageCount || Math.abs(number - page) <= 1);

  return <main className="appShell jobsV2">
    <AppNav light />
    <section className="jobsDiscoveryHero">
      <div className="jobsGlow jobsGlowOne"/><div className="jobsGlow jobsGlowTwo"/>
      <div className="jobsHeroContent">
        <span className="jobsEyebrow"><Sparkles/> Intelligent opportunity discovery</span>
        <h1>Don’t search harder.<br/><em>Match smarter.</em></h1>
        <p>Explore verified opportunities ranked around your skills, direction, and working style—before you spend time applying.</p>
        <label className="heroSearch"><Search/><input value={q} onChange={event => setQ(event.target.value)} placeholder="Search role, company, skill, or location"/>{q && <button onClick={() => setQ("")} aria-label="Clear search"><X/></button>}<span>Find roles <ArrowRight/></span></label>
        <div className="heroTrust"><span><CheckCircle2/> Verified sources</span><span><Target/> AI fit scoring</span><span><BriefcaseBusiness/> Fresh opportunities</span></div>
      </div>
      <div className="jobsHeroVisual" aria-hidden="true">
        <div className="floatingJob floatingJobOne"><span>SF</span><div><small>Strong match</small><b>Salesforce Developer</b><i>Remote · 91% fit</i></div><strong>91</strong></div>
        <div className="floatingJob floatingJobTwo"><span>DA</span><div><small>New today</small><b>Data Analyst</b><i>Hybrid · 84% fit</i></div><strong>84</strong></div>
        <div className="floatingJob floatingJobThree"><span>PM</span><div><small>Trending</small><b>Product Manager</b><i>On-site · 78% fit</i></div><strong>78</strong></div>
        <div className="radar"><i/><i/><i/><Target/></div>
      </div>
    </section>

    <section className="jobsInsightStrip">
      <div><strong>{loading ? "—" : jobs.length}</strong><span>Open roles</span></div>
      <div><strong>{loading ? "—" : insights.strong}</strong><span>Strong matches</span></div>
      <div><strong>{loading ? "—" : insights.remote}</strong><span>Remote options</span></div>
      <div><strong>{loading ? "—" : insights.newRoles}</strong><span>Added this week</span></div>
    </section>

    <section className="jobsMarketplace" id="job-results">
      <div className="marketplaceHeading"><div><span>Curated for your next move</span><h2>Opportunity marketplace</h2><p>Every listing includes transparent match context and direct employer application links.</p></div><div className="marketplaceCount">{loading ? <><i/> Finding the best roles…</> : <><b>{jobs.length}</b> opportunities found</>}</div></div>
      <div className="jobsLayout">
        <aside className="modernFilters">
          <div className="filterTitle"><span><SlidersHorizontal/> Refine results</span>{activeFilters > 0 && <button onClick={clear}>Clear all</button>}</div>
          <label>Career field<select value={category} onChange={event => setCategory(event.target.value)}>{categories.map(item => <option key={item}>{item}</option>)}</select></label>
          <label>Work arrangement<select value={mode} onChange={event => setMode(event.target.value)}>{modes.map(item => <option key={item}>{item}</option>)}</select></label>
          <div className="filterPromise"><span><Sparkles/></span><div><b>Personalized ranking</b><p>Upload your resume to improve match accuracy and see evidence behind every score.</p></div></div>
          <a href="/resume">Improve my matches <ArrowRight/></a>
        </aside>
        <div className="marketplaceResults">
          <div className="mobileFilterSummary"><SlidersHorizontal/> {activeFilters ? `${activeFilters} filters active` : "All opportunities"}{activeFilters > 0 && <button onClick={clear}>Reset</button>}</div>
          {error && <div className="jobsEmpty"><span><BriefcaseBusiness/></span><h3>We couldn’t load opportunities</h3><p>{error}</p><button onClick={() => window.location.reload()}>Try again</button></div>}
          {!loading && !error && jobs.length === 0 && <div className="jobsEmpty"><span><Search/></span><h3>No exact matches—yet</h3><p>Try a broader keyword or reset your filters to discover more opportunities.</p><button onClick={clear}>Show all roles</button></div>}
          {loading && <div className="jobSkeletonGrid">{[1,2,3,4].map(item => <div key={item}><span/><b/><i/><i/><em/></div>)}</div>}
          {!loading && !error && <div className="premiumJobGrid">{visibleJobs.map((job, index) => <JobCard job={job} index={index} key={job.id}/>)}</div>}
          {!loading && !error && jobs.length > JOBS_PER_PAGE && <nav className="jobsPagination" aria-label="Job results pages">
            <button onClick={() => goToPage(page - 1)} disabled={page === 1} aria-label="Previous page"><ChevronLeft/></button>
            <div>{paginationPages.map((number, index) => <span key={number}>{index > 0 && number - paginationPages[index - 1] > 1 && <i>…</i>}<button className={number === page ? "active" : ""} onClick={() => goToPage(number)} aria-current={number === page ? "page" : undefined}>{number}</button></span>)}</div>
            <button onClick={() => goToPage(page + 1)} disabled={page === pageCount} aria-label="Next page"><ChevronRight/></button>
            <small>Showing {(page - 1) * JOBS_PER_PAGE + 1}–{Math.min(page * JOBS_PER_PAGE, jobs.length)} of {jobs.length}</small>
          </nav>}
          {!loading && jobs.length > 0 && page === pageCount && <div className="jobsEndNote"><MapPin/><span><b>You’re all caught up.</b> New verified roles are added automatically throughout the day.</span></div>}
        </div>
      </div>
    </section>
  </main>;
}
