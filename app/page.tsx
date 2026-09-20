"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Clock3,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import AppNav from "@/components/AppNav";

const featuredJobs = [
  { role: "Salesforce Developer", company: "Cloudworks", location: "Remote · India", fit: "92%", tags: ["Apex", "LWC", "Flows"] },
  { role: "Software Engineer", company: "Northstar Labs", location: "Bengaluru · Hybrid", fit: "89%", tags: ["React", "Node.js", "TypeScript"] },
  { role: "AI / ML Engineer", company: "Vertex Systems", location: "Gurugram · Hybrid", fit: "86%", tags: ["Python", "LLMs", "ML"] },
];

const categories = [
  ["Engineering", "1,240 roles"],
  ["Data & AI", "740 roles"],
  ["Product", "520 roles"],
  ["Salesforce", "310 roles"],
  ["Design", "280 roles"],
  ["Marketing", "430 roles"],
];

export default function Home() {
  return (
    <main className="appShell jobsV2">
      <AppNav light />

      <section className="jobsDiscoveryHero">
        <div className="jobsGlow jobsGlowOne" />
        <div className="jobsGlow jobsGlowTwo" />

        <div className="jobsHeroContent">
          <span className="jobsEyebrow"><Sparkles /> Smarter job discovery with AI</span>
          <h1>Find work that actually<br /><em>fits your career.</em></h1>
          <p>
            Discover verified opportunities, understand your fit, and move from
            searching to applying with confidence.
          </p>

          <form className="heroSearch" action="/jobs">
            <Search />
            <input
              name="q"
              aria-label="Search jobs"
              placeholder="Search by role, skill, company, or location"
            />
            <span
              role="button"
              tabIndex={0}
              onClick={() => window.location.assign("/jobs")}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") window.location.assign("/jobs");
              }}
            >
              Search jobs <ArrowRight />
            </span>
          </form>

          <div className="heroTrust">
            <span><CheckCircle2 /> Verified job sources</span>
            <span><Target /> AI match scoring</span>
            <span><ShieldCheck /> Direct employer applications</span>
          </div>
        </div>

        <div className="jobsHeroVisual" aria-hidden="true">
          <div className="floatingJob floatingJobOne">
            <span>SE</span>
            <div><small>Top match</small><b>Software Engineer</b><i>Remote · 94% fit</i></div>
            <strong>94</strong>
          </div>
          <div className="floatingJob floatingJobTwo">
            <span>AI</span>
            <div><small>New today</small><b>AI Engineer</b><i>Hybrid · 89% fit</i></div>
            <strong>89</strong>
          </div>
          <div className="floatingJob floatingJobThree">
            <span>SF</span>
            <div><small>Recommended</small><b>Salesforce Developer</b><i>Remote · 91% fit</i></div>
            <strong>91</strong>
          </div>
          <div className="radar"><i /><i /><i /><Target /></div>
        </div>
      </section>

      <section className="jobsInsightStrip">
        <div><strong>3,500+</strong><span>Open opportunities</span></div>
        <div><strong>120+</strong><span>Hiring companies</span></div>
        <div><strong>38%</strong><span>Remote-friendly roles</span></div>
        <div><strong>Daily</strong><span>Fresh job updates</span></div>
      </section>

      <section className="jobsMarketplace">
        <div className="marketplaceHeading">
          <div>
            <span>Browse by career path</span>
            <h2>Explore opportunities faster</h2>
            <p>Jump into the roles that match where you want your career to go next.</p>
          </div>
          <Link className="marketplaceCount" href="/jobs">View all jobs <ArrowRight /></Link>
        </div>

        <div className="v3ProofGrid">
          {categories.map(([name, count]) => (
            <Link href="/jobs" key={name}>
              <article>
                <BriefcaseBusiness />
                <strong>{name}</strong>
                <span>{count}</span>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <section className="v3Jobs">
        <div className="v3JobsHeader">
          <div>
            <div className="v3SectionLabel"><span>01</span> Featured opportunities</div>
            <h2>Strong roles.<br />Clear reasons to apply.</h2>
          </div>
          <p>
            CarrerFit helps you compare your experience with each role so you can
            spend time on applications with real potential.
          </p>
        </div>

        <div className="v3MatchStack" style={{ maxWidth: 980, margin: "0 auto" }}>
          {featuredJobs.map((job, index) => (
            <Link href="/jobs" key={job.role}>
              <span className="v3Rank">0{index + 1}</span>
              <div className="v3MatchInfo">
                <small>{job.company}</small>
                <h3>{job.role}</h3>
                <p><MapPin /> {job.location}</p>
                <div>{job.tags.map(tag => <i key={tag}><CheckCircle2 />{tag}</i>)}</div>
              </div>
              <strong>{job.fit}</strong>
              <ArrowRight />
            </Link>
          ))}
        </div>
      </section>

      <section className="v3Journey">
        <div className="v3JourneyCopy">
          <div className="v3SectionLabel light"><span>02</span> More than a job board</div>
          <h2>Build the whole application, not just the search.</h2>
          <div className="v3JourneySteps">
            <article><span>01</span><div><h3>Analyze your resume</h3><p>Understand ATS strength, skill gaps, and where your profile can improve.</p></div></article>
            <article><span>02</span><div><h3>Match to real jobs</h3><p>Compare your evidence against live roles from verified employer sources.</p></div></article>
            <article><span>03</span><div><h3>Prepare for interviews</h3><p>Practice with an AI interviewer that adapts to your resume and target role.</p></div></article>
          </div>
          <Link href="/resume">Check my resume <ArrowRight /></Link>
        </div>

        <div className="v3CommandCard">
          <header><span><i /><i /><i /></span><small>JOB SEARCH / CAREER SIGNAL</small><TrendingUp /></header>
          <div className="v3CommandBody">
            <div className="v3SignalList">
              <div><span><Building2 /> Verified companies</span><b>120+</b></div>
              <div><span><UsersRound /> Personalized matching</span><b>Live</b></div>
              <div><span><Clock3 /> Fresh opportunities</span><b>Daily</b></div>
            </div>
          </div>
        </div>
      </section>

      <section className="v3Final">
        <div className="v3FinalGlow" />
        <span><Sparkles /> Your next role could be closer than you think</span>
        <h2>Search smarter.<br /><em>Apply with confidence.</em></h2>
        <p>Explore verified jobs, improve your resume, and prepare for the interview in one place.</p>
        <div>
          <Link href="/jobs">Browse jobs <ArrowRight /></Link>
          <Link href="/resume">Analyze resume</Link>
        </div>
        <small><BadgeCheck /> Verified opportunities · AI-powered matching · Direct applications</small>
      </section>

      <footer className="v3Footer">
        <Link href="/"><Target /> <b>CarrerFit.com</b></Link>
        <span>Career intelligence for better job decisions.</span>
        <div>
          <Link href="/jobs">Jobs</Link>
          <Link href="/resume">Resume AI</Link>
          <Link href="/interview">AI Interview</Link>
          <Link href="/blog">Career Guides</Link>
          <Link href="/privacy">Privacy</Link>
        </div>
        <small>© 2026 CarrerFit.com</small>
      </footer>
    </main>
  );
}
