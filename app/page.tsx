"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  Clock3,
  FileSearch,
  Globe2,
  GraduationCap,
  MapPin,
  Search,
  Sparkles,
  Target,
  UsersRound,
} from "lucide-react";
import styles from "./home.module.css";

const quickLinks = [
  { label: "Remote", icon: Globe2 },
  { label: "MNC", icon: Building2 },
  { label: "Salesforce", icon: BriefcaseBusiness },
  { label: "AI & Data", icon: Sparkles },
  { label: "Fresher", icon: GraduationCap },
  { label: "Startup", icon: Target },
  { label: "Internship", icon: Clock3 },
  { label: "Analytics", icon: FileSearch },
];

const companies = [
  { name: "Grafana Labs", image: "/company-proof/grafana.jpg", meta: "Engineering & cloud" },
  { name: "Twilio", image: "/company-proof/twilio.jpg", meta: "Product & communications" },
  { name: "Postman", image: "/company-proof/postman.jpg", meta: "Developer tools" },
  { name: "MongoDB", image: "/company-proof/mongodb.jpg", meta: "Data platform" },
];

const featured = [
  { role: "Salesforce Developer", company: "Cloudworks", location: "Remote · India", exp: "2–5 yrs", skills: ["Apex", "LWC", "Flows"] },
  { role: "Software Engineer", company: "Northstar Labs", location: "Bengaluru · Hybrid", exp: "1–4 yrs", skills: ["React", "Node.js", "TypeScript"] },
  { role: "AI / ML Engineer", company: "Vertex Systems", location: "Gurugram · Hybrid", exp: "2–6 yrs", skills: ["Python", "LLMs", "ML"] },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.brand}>
            <span className={styles.brandMark}><Target /></span>
            <span><b>CarrerFit</b><small>Career intelligence</small></span>
          </Link>

          <nav className={styles.mainNav}>
            <Link href="/jobs">Jobs</Link>
            <Link href="/resume">Resume AI</Link>
            <Link href="/interview">AI Interview</Link>
            <Link href="/blog">Career Guides</Link>
          </nav>

          <div className={styles.headerActions}>
            <Link href="/login" className={styles.signIn}>Sign in</Link>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}><Sparkles /> Intelligent opportunity discovery</span>
          <h1>Find the right job.<br/><em>Build the right career.</em></h1>
          <p>Search verified opportunities, understand your fit, and prepare your profile from one clean career platform.</p>

          <form action="/jobs" className={styles.searchBox}>
            <div className={styles.searchField}>
              <Search />
              <input name="q" placeholder="Enter skills, designation, or company" aria-label="Skills, designation, or company" />
            </div>
            <div className={styles.searchDivider} />
            <label className={styles.selectField}>
              <BriefcaseBusiness />
              <select name="experience" defaultValue="">
                <option value="" disabled>Experience</option>
                <option value="0">Fresher</option>
                <option value="1">1 year</option>
                <option value="2">2 years</option>
                <option value="3">3 years</option>
                <option value="5">5+ years</option>
              </select>
              <ChevronDown />
            </label>
            <div className={styles.searchDivider} />
            <div className={styles.searchField}>
              <MapPin />
              <input name="location" placeholder="Enter location" aria-label="Location" />
            </div>
            <button type="submit">Search jobs</button>
          </form>

          <div className={styles.heroTrust}>
            <span><BadgeCheck /> Verified sources</span>
            <span><UsersRound /> Personalized recommendations</span>
            <span><Clock3 /> Fresh roles added regularly</span>
          </div>
        </div>
      </section>

      <section className={styles.resumeBanner}>
        <div className={styles.resumeCopy}>
          <span className={styles.resumeIcon}><FileSearch /></span>
          <div>
            <small>Need help with your resume?</small>
            <h2>Get an AI review before you apply.</h2>
            <p>Check ATS readiness, missing skills, and improvement opportunities in minutes.</p>
          </div>
        </div>
        <Link href="/resume">Analyze my resume <ArrowRight /></Link>
      </section>

      <section className={styles.quickSection}>
        <div className={styles.quickGrid}>
          {quickLinks.map(({ label, icon: Icon }) => (
            <Link href="/jobs" className={styles.quickChip} key={label}>
              <Icon />
              <span>{label}</span>
              <ArrowRight />
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <div>
            <span>Explore employers</span>
            <h2>Top companies hiring now</h2>
          </div>
          <Link href="/jobs">View all companies <ArrowRight /></Link>
        </div>

        <div className={styles.companyGrid}>
          {companies.map(company => (
            <Link href="/jobs" className={styles.companyCard} key={company.name}>
              <div className={styles.companyImage}>
                <Image src={company.image} alt={company.name} fill sizes="220px" />
              </div>
              <div>
                <h3>{company.name}</h3>
                <p>{company.meta}</p>
              </div>
              <ArrowRight />
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            <div>
              <span>Recommended opportunities</span>
              <h2>Jobs you may want to explore</h2>
            </div>
            <Link href="/jobs">Browse all jobs <ArrowRight /></Link>
          </div>

          <div className={styles.jobGrid}>
            {featured.map(job => (
              <Link href="/jobs" className={styles.jobCard} key={job.role}>
                <div className={styles.jobTop}>
                  <div className={styles.jobBadge}>{job.company.slice(0, 2).toUpperCase()}</div>
                  <div>
                    <h3>{job.role}</h3>
                    <p>{job.company}</p>
                  </div>
                </div>
                <div className={styles.jobMeta}>
                  <span><BriefcaseBusiness /> {job.exp}</span>
                  <span><MapPin /> {job.location}</span>
                </div>
                <div className={styles.skillRow}>
                  {job.skills.map(skill => <span key={skill}>{skill}</span>)}
                </div>
                <div className={styles.cardFooter}>
                  <small>Verified listing</small>
                  <span>View role <ArrowRight /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.aiStrip}>
        <div>
          <span><Sparkles /> CarrerFit intelligence</span>
          <h2>Search jobs. Improve your resume. Practice the interview.</h2>
          <p>A Naukri-style discovery experience, enhanced with CarrerFit’s AI tools for better decisions before you apply.</p>
        </div>
        <div className={styles.aiActions}>
          <Link href="/jobs">Explore jobs</Link>
          <Link href="/interview">Try AI interview</Link>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <Link href="/" className={styles.brand}>
            <span className={styles.brandMark}><Target /></span>
            <span><b>CarrerFit</b><small>Career intelligence</small></span>
          </Link>
          <div className={styles.footerLinks}>
            <Link href="/jobs">Jobs</Link>
            <Link href="/resume">Resume AI</Link>
            <Link href="/interview">AI Interview</Link>
            <Link href="/blog">Career Guides</Link>
            <Link href="/privacy">Privacy</Link>
          </div>
          <small>© 2026 CarrerFit.com</small>
        </div>
      </footer>
    </main>
  );
}
