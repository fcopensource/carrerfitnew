"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import {
  ArrowRight, BadgeCheck, BarChart3, BriefcaseBusiness, Building2, CheckCircle2,
  Clock3, Cpu, FileSearch, Layers3, MapPin, Network, Orbit, Search, ShieldCheck,
  Sparkles, Target, TrendingUp, UsersRound, WandSparkles
} from "lucide-react";
import AppNav from "@/components/AppNav";
import styles from "./home.module.css";

const categories = [
  ["Engineering","1,240 roles","ENG"],["Data & AI","740 roles","AI"],["Product","520 roles","PM"],
  ["Salesforce","310 roles","SF"],["Design","280 roles","UX"],["Marketing","430 roles","MKT"]
];

const jobs = [
  {role:"Salesforce Developer",company:"Cloudworks",location:"Remote · India",fit:92,tags:["Apex","LWC","Flows"],badge:"CF"},
  {role:"Software Engineer",company:"Northstar Labs",location:"Bengaluru · Hybrid",fit:89,tags:["React","Node.js","TypeScript"],badge:"NL"},
  {role:"AI / ML Engineer",company:"Vertex Systems",location:"Gurugram · Hybrid",fit:86,tags:["Python","LLMs","ML"],badge:"VS"},
  {role:"Product Engineer",company:"VectorOne",location:"Remote · APAC",fit:84,tags:["Next.js","APIs","Product"],badge:"VO"}
];

export default function Home(){
  const goJobs = () => window.location.assign("/jobs");
  return <main className={styles.page}>
    <AppNav light />

    <section className={styles.hero}>
      <div className={styles.heroGlow}/>
      <div className={styles.heroCopy}>
        <span className={styles.kicker}><Sparkles/> AI career intelligence · live market graph</span>
        <h1>Find the role that<br/><em>fits your future.</em></h1>
        <p>CarrerFit combines verified jobs, resume intelligence, and adaptive interview preparation into one powerful career operating system.</p>

        <form className={styles.searchBar} action="/jobs">
          <Search/>
          <input name="q" aria-label="Search jobs" placeholder="Search role, skill, company, or location"/>
          <button type="submit">Explore jobs <ArrowRight/></button>
        </form>

        <div className={styles.heroMeta}>
          <span><CheckCircle2/> Verified sources</span>
          <span><Target/> AI fit scoring</span>
          <span><ShieldCheck/> Direct employer applications</span>
        </div>
      </div>

      <div className={styles.heroVisual}>
        <div className={styles.visualPanel}>
          <div className={styles.live}><i/> MARKET ONLINE</div>
          <div className={`${styles.orbit} ${styles.orbit1}`}/>
          <div className={`${styles.orbit} ${styles.orbit2}`}/>
          <div className={`${styles.orbit} ${styles.orbit3}`}/>
          <div className={styles.core}><Cpu/><span>CAREER OS</span><strong>ACTIVE</strong></div>

          <div className={`${styles.floatCard} ${styles.cardA}`}><FileSearch/><div><b>Resume signal</b><small>92 / 100</small></div></div>
          <div className={`${styles.floatCard} ${styles.cardB}`}><BriefcaseBusiness/><div><b>Strong matches</b><small>28 live roles</small></div></div>
          <div className={`${styles.floatCard} ${styles.cardC}`}><WandSparkles/><div><b>Interview readiness</b><small>Improving</small></div></div>
          <div className={`${styles.floatCard} ${styles.cardD}`}><TrendingUp/><div><b>Career momentum</b><small>+18% this month</small></div></div>
        </div>
      </div>
    </section>

    <section className={styles.stats}>
      <div className={styles.statsGrid}>
        <article><span>LIVE MARKET</span><strong>3,500+</strong><small>Open opportunities</small></article>
        <article><span>VERIFIED NETWORK</span><strong>120+</strong><small>Hiring companies</small></article>
        <article><span>REMOTE INDEX</span><strong>38%</strong><small>Remote-friendly roles</small></article>
        <article><span>SYNC STATUS</span><strong>24/7</strong><small>Fresh job updates</small></article>
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <div><span className={styles.label}><Orbit/> Career graph</span><h2>Explore the market<br/><em>as a living system.</em></h2></div>
        <p>Move beyond old-fashioned job lists. Explore career clusters where your skills, interests, and market demand intersect.</p>
      </div>
      <div className={styles.categoryGrid}>
        {categories.map(([name,count,code],i)=><Link className={styles.categoryCard} href="/jobs" key={name}>
          <span className={styles.cardNum}>0{i+1}</span>
          <div className={styles.categoryIcon}>{code}</div>
          <small>{count}</small><h3>{name}</h3><ArrowRight/>
        </Link>)}
      </div>
    </section>

    <section className={`${styles.section} ${styles.jobSection}`}>
      <div className={styles.jobIntro}>
        <span className={styles.label}><Network/> Opportunity intelligence</span>
        <h2>Jobs ranked by<br/><em>career signal.</em></h2>
        <p>Every role is evaluated against the evidence in your profile, so you can see where you are strong, where you are missing signals, and where to spend your time.</p>
        <Link href="/jobs">Open opportunity graph <ArrowRight/></Link>
      </div>

      <div className={styles.jobStack}>
        {jobs.map(job=><Link href="/jobs" key={job.role} className={styles.jobCard}>
          <div className={styles.companyBadge}>{job.badge}</div>
          <div className={styles.jobMain}>
            <small>{job.company}</small><h3>{job.role}</h3>
            <p><MapPin/> {job.location}</p>
            <div className={styles.tags}>{job.tags.map(tag=><span key={tag}>{tag}</span>)}</div>
          </div>
          <div className={styles.fit}>
            <small>MATCH</small><strong>{job.fit}<sup>%</sup></strong>
            <div className={styles.fitBar}><i style={{width:`${job.fit}%`} as CSSProperties}/></div>
          </div>
          <ArrowRight/>
        </Link>)}
      </div>
    </section>

    <section className={styles.intel}>
      <div className={styles.intelVisual}>
        <div className={`${styles.nodeRing} ${styles.ring1}`}/>
        <div className={`${styles.nodeRing} ${styles.ring2}`}/>
        <div className={`${styles.nodeRing} ${styles.ring3}`}/>
        <div className={styles.intelCore}><Cpu/><span>CAREER OS</span><strong>CONNECTED</strong></div>
        <div className={`${styles.node} ${styles.n1}`}><FileSearch/> Resume</div>
        <div className={`${styles.node} ${styles.n2}`}><BriefcaseBusiness/> Jobs</div>
        <div className={`${styles.node} ${styles.n3}`}><WandSparkles/> Interview</div>
        <div className={`${styles.node} ${styles.n4}`}><BarChart3/> Growth</div>
      </div>

      <div className={styles.intelCopy}>
        <span className={styles.label}><Layers3/> One connected career OS</span>
        <h2>Your search is only<br/><em>the first layer.</em></h2>
        <p>CarrerFit connects your resume, job discovery, interview preparation, and career progress into one adaptive system.</p>

        <div className={styles.intelRows}>
          <article><span>01</span><div><h3>Resume intelligence</h3><p>ATS analysis, evidence extraction, and skill-gap mapping.</p></div><FileSearch/></article>
          <article><span>02</span><div><h3>Live opportunity matching</h3><p>Verified roles ranked against your actual experience.</p></div><BriefcaseBusiness/></article>
          <article><span>03</span><div><h3>Adaptive interview studio</h3><p>Questions that react to your resume, answers, and target role.</p></div><WandSparkles/></article>
        </div>

        <Link href="/resume">Initialize my career profile <ArrowRight/></Link>
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <div><span className={styles.label}><ShieldCheck/> Trust infrastructure</span><h2>Powerful intelligence.<br/><em>Professional by design.</em></h2></div>
        <p>Your profile should be useful without becoming another source of noise. CarrerFit keeps the experience explainable, focused, and private.</p>
      </div>
      <div className={styles.trustGrid}>
        <article><ShieldCheck/><span>01</span><h3>Private processing</h3><p>Your career data is treated as sensitive profile intelligence.</p></article>
        <article><BadgeCheck/><span>02</span><h3>Verified sources</h3><p>Job discovery is centered on trusted and employer-hosted sources.</p></article>
        <article><Clock3/><span>03</span><h3>Fresh by default</h3><p>The market layer is designed around current opportunities, not stale listings.</p></article>
        <article><Building2/><span>04</span><h3>Explainable matching</h3><p>Understand why a role fits instead of trusting a black-box percentage.</p></article>
      </div>
    </section>

    <section className={styles.cta}>
      <span>ENTER THE NEXT VERSION OF YOUR CAREER</span>
      <h2>Don’t just search for work.<br/><em>Build career momentum.</em></h2>
      <p>Discover stronger opportunities, understand your profile, and prepare for the interview—all in one system.</p>
      <div className={styles.ctaActions}>
        <Link href="/jobs">Explore jobs <ArrowRight/></Link>
        <Link href="/resume">Analyze my resume</Link>
      </div>
    </section>

    <footer className={styles.footer}>
      <Link href="/"><Target/><b>CarrerFit.com</b></Link>
      <span>Career intelligence for the next era of work.</span>
      <nav>
        <Link href="/jobs">Jobs</Link><Link href="/resume">Resume AI</Link><Link href="/interview">AI Interview</Link><Link href="/blog">Guides</Link><Link href="/privacy">Privacy</Link>
      </nav>
      <small>© 2026 CarrerFit.com</small>
    </footer>
  </main>;
}
