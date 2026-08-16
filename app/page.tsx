"use client";

import type { CSSProperties } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, AudioLines, BadgeCheck, BrainCircuit, BriefcaseBusiness, Check, ChevronRight, FileSearch, FileText, Fingerprint, Globe2, LockKeyhole, MapPin, MessageSquareText, Mic2, Play, Radar, ShieldCheck, Sparkles, Target, WandSparkles, Zap } from "lucide-react";
import AppNav from "@/components/AppNav";

const CareerOrbit = dynamic(() => import("@/components/CareerOrbit"), { ssr: false });
const companies = [
  { name: "Grafana Labs", image: "/company-proof/grafana.jpg" },
  { name: "Twilio", image: "/company-proof/twilio.jpg" },
  { name: "Postman", image: "/company-proof/postman.jpg" },
  { name: "MongoDB", image: "/company-proof/mongodb.jpg" },
];
const matches = [
  { role: "Senior Product Analyst", company: "Northstar", fit: 94, skills: ["SQL", "Experiments", "AI"] },
  { role: "Growth Data Lead", company: "Arc Labs", fit: 89, skills: ["Python", "Strategy", "BI"] },
  { role: "Revenue Operations", company: "CloudMint", fit: 86, skills: ["CRM", "Automation", "Ops"] },
];

export default function Home() {
  return (
    <main className="homeV3">
      <section className="v3Hero">
        <AppNav />
        <div className="v3Grid" />
        <div className="v3HeroScene"><CareerOrbit variant="hero" /></div>
        <div className="v3HeroInner">
          <div className="v3HeroCopy">
            <span className="v3Kicker"><i /> AI career intelligence, reimagined</span>
            <h1>Your career has a signal.<br/><em>We make it visible.</em></h1>
            <p>CarrerFit reads the evidence in your resume, maps it to the live market, and turns it into a precise path—from stronger applications to sharper interviews.</p>
            <div className="v3HeroActions"><Link href="/resume">Analyze my resume <ArrowRight /></Link><Link href="/interview"><Play /> Experience AI interview</Link></div>
            <div className="v3HeroProof"><span><ShieldCheck /> Private, encrypted processing</span><span><BadgeCheck /> Verified employer sources</span></div>
          </div>
          <div className="v3CommandCard">
            <header><span><i/><i/><i/></span><small>CAREER SIGNAL / LIVE</small><Radar /></header>
            <div className="v3CommandBody">
              <div className="v3ScoreCore"><span>Career readiness</span><strong>87</strong><small>+12 this month</small></div>
              <div className="v3SignalList"><div><span><BrainCircuit /> Resume intelligence</span><b>Complete</b></div><div><span><BriefcaseBusiness /> Market alignment</span><b>Strong</b></div><div><span><Mic2 /> Interview confidence</span><b>Building</b></div></div>
              <div className="v3MiniGraph">{[28,38,34,52,47,63,58,76,70,87].map((height,index)=><i key={index} style={{height:`${height}%`}} />)}</div>
            </div>
          </div>
        </div>
        <div className="v3ScrollCue"><span>Scroll to explore</span><i /></div>
      </section>

      <section className="v3Ticker" aria-label="CarrerFit capabilities"><div>{["RESUME INTELLIGENCE","ATS SCORING","VERIFIED JOBS","AI INTERVIEWS","CAREER ANALYTICS","SKILL-GAP MAPPING","RESUME INTELLIGENCE","ATS SCORING","VERIFIED JOBS","AI INTERVIEWS","CAREER ANALYTICS","SKILL-GAP MAPPING"].map((item,index)=><span key={`${item}-${index}`}><Sparkles /> {item}</span>)}</div></section>

      <section className="v3Manifesto">
        <div className="v3SectionLabel"><span>01</span> The intelligence layer</div>
        <div className="v3ManifestoCopy"><h2>Not another job board.<br/><em>A system that understands you.</em></h2><p>Your career data should do more than sit inside a PDF. CarrerFit turns it into a living intelligence layer—structured, measurable, and connected to real opportunity.</p></div>
        <div className="v3Bento">
          <article className="v3BentoMain"><div><span>RESUME DNA</span><FileSearch /></div><h3>Every line becomes evidence.</h3><p>Experience, impact, skills, seniority, education, and career direction are extracted into a structured private profile.</p><div className="v3ResumeScan"><span className="scanBeam"/><header><i>VK</i><div><b>Vikram Kumar</b><small>Product & data professional</small></div><strong>92%</strong></header><div className="scanLines"><i/><i/><i/><i/><i/></div><footer><span>12 skills</span><span>4 roles</span><span>18 outcomes</span></footer></div></article>
          <article className="v3BentoMetric"><span><Target /> ATS precision</span><strong>91<small>/100</small></strong><div><i /></div><p>Actionable feedback linked to exact resume evidence.</p></article>
          <article className="v3BentoSecurity"><Fingerprint/><div><span>PRIVATE VAULT</span><h3>Your data stays yours.</h3><p>AES-256 encrypted storage, private sessions, and controlled access.</p></div></article>
          <article className="v3BentoSkills"><span>SKILL GRAPH</span><div className="skillCloud"><i>SQL</i><i>AI</i><i>Python</i><i>Strategy</i><i>Analytics</i><i>CRM</i></div></article>
        </div>
      </section>

      <section className="v3Journey">
        <div className="v3JourneyVisual"><CareerOrbit variant="resume"/><div className="v3OrbitCaption"><span>01</span><b>Upload</b><i/><span>02</span><b>Understand</b><i/><span>03</span><b>Act</b></div></div>
        <div className="v3JourneyCopy"><div className="v3SectionLabel light"><span>02</span> One connected journey</div><h2>From uncertainty to a next move you can explain.</h2><div className="v3JourneySteps"><article><span>01</span><div><h3>Decode your profile</h3><p>AI converts your resume into a structured map of skills, outcomes, strengths, and gaps.</p></div></article><article><span>02</span><div><h3>Rank real opportunities</h3><p>Verified roles are scored against your actual evidence—not generic keyword overlap.</p></div></article><article><span>03</span><div><h3>Practice the conversation</h3><p>Your interviewer adapts to your resume, answers, role, and performance in real time.</p></div></article></div><Link href="/resume">Start with your resume <ArrowRight /></Link></div>
      </section>

      <section className="v3Jobs">
        <div className="v3JobsHeader"><div><div className="v3SectionLabel"><span>03</span> Opportunity radar</div><h2>Jobs ranked by evidence,<br/>not noise.</h2></div><p>Fresh roles from public employer career pages. Every match explains what aligns, what is missing, and why it deserves your attention.</p></div>
        <div className="v3JobsStage"><div className="v3JobsGalaxy"><CareerOrbit variant="jobs"/><div><Globe2/><b>Live market graph</b><span>Verified sources syncing</span></div></div><div className="v3MatchStack">{matches.map((match,index)=><Link href="/jobs" key={match.role} style={{"--stack":index} as CSSProperties}><span className="v3Rank">0{index+1}</span><div className="v3MatchInfo"><small>{match.company}</small><h3>{match.role}</h3><p><MapPin/> India · Remote friendly</p><div>{match.skills.map(skill=><i key={skill}><Check/>{skill}</i>)}</div></div><strong>{match.fit}<small>%</small></strong><ChevronRight/></Link>)}</div></div>
        <div className="v3CompanyRail">{companies.map(company=><Link href="/jobs" key={company.name}><div><Image src={company.image} alt={`${company.name} careers`} fill sizes="240px" /></div><span><i/> LIVE ROLES</span><b>{company.name}</b><ArrowRight/></Link>)}</div>
      </section>

      <section className="v3Interview">
        <div className="v3InterviewCopy"><div className="v3SectionLabel light"><span>04</span> Adaptive interview studio</div><h2>Practice with an interviewer that actually read your resume.</h2><p>Questions deepen with every answer. Get focused coaching on clarity, evidence, structure, confidence, and role-specific knowledge.</p><ul><li><AudioLines/> Real-time voice conversation</li><li><BrainCircuit/> Resume-aware follow-up questions</li><li><MessageSquareText/> Evidence-based feedback report</li></ul><Link href="/interview">Enter interview studio <ArrowRight/></Link></div>
        <div className="v3InterviewStage"><CareerOrbit variant="interview"/><div className="v3QuestionCard"><span><WandSparkles/> INTERVIEWER</span><p>Tell me about the product analytics project where you influenced a business decision.</p><div>{Array.from({length:12},(_,index)=><i key={index}/>)}</div></div><div className="v3LivePill"><i/> Listening</div></div>
      </section>

      <section className="v3Proof"><div className="v3SectionLabel"><span>05</span> Built for trust</div><h2>Serious intelligence.<br/><em>Responsible by design.</em></h2><div className="v3ProofGrid"><article><LockKeyhole/><strong>AES-256</strong><span>Encrypted resume vault</span></article><article><BadgeCheck/><strong>Verified</strong><span>Employer-hosted job sources</span></article><article><FileText/><strong>PDF + DOCX</strong><span>Validated document parsing</span></article><article><Zap/><strong>Explainable</strong><span>Evidence behind every score</span></article></div></section>

      <section className="v3Final"><div className="v3FinalGlow"/><span><Sparkles/> Your career signal is waiting</span><h2>Stop guessing.<br/><em>Start seeing the path.</em></h2><p>Upload your resume. See what the market sees. Build the version of your career that fits.</p><div><Link href="/resume">Analyze my resume <ArrowRight/></Link><Link href="/jobs">Explore live roles</Link></div><small><ShieldCheck/> Private processing · No credit card · Employer-hosted applications</small></section>
      <footer className="v3Footer"><Link href="/"><Target/> <b>CarrerFit.com</b></Link><span>Career intelligence for better decisions.</span><div><Link href="/resume">Resume</Link><Link href="/jobs">Jobs</Link><Link href="/interview">Interview</Link><Link href="/blog">Guides</Link><Link href="/privacy">Privacy</Link></div><small>© 2026 CarrerFit.com</small></footer>
    </main>
  );
}
