"use client";

import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  CircleCheck,
  Clock3,
  Compass,
  FileText,
  Layers3,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import AppNav from "@/components/AppNav";
import { useState } from "react";

const roles = [
  { title: "Product Analyst", company: "BrightLoop", score: 96, salary: "₹18–28L", skills: ["SQL", "Analytics", "AI workflows"] },
  { title: "Growth Data Analyst", company: "Arclight", score: 94, salary: "₹16–25L", skills: ["Python", "Experiments", "Tableau"] },
  { title: "RevOps Specialist", company: "CloudMint", score: 91, salary: "₹14–22L", skills: ["Salesforce", "Automation", "Ops"] },
];

const steps = [
  { icon: FileText, number: "01", title: "Tell us where you are", copy: "A focused assessment maps your experience, strengths, working style, and ambitions." },
  { icon: Layers3, number: "02", title: "See your strongest paths", copy: "We rank realistic career directions against your profile and current market demand." },
  { icon: TrendingUp, number: "03", title: "Build proof, then apply", copy: "Close skill gaps with a clear plan and focus your effort on roles worth pursuing." },
];

const testimonials = [
  { quote: "The match explanation made it obvious which roles were realistic—and which skills I should build next.", label: "Resume matcher user", initials: "RM" },
  { quote: "I stopped opening twenty job tabs. The evidence-backed shortlist gave me a much calmer place to start.", label: "Career explorer", initials: "CE" },
  { quote: "The ATS breakdown was specific enough to improve the resume instead of just showing another mystery score.", label: "Job seeker", initials: "JS" },
  { quote: "Interview practice followed my actual projects, so the questions felt relevant instead of recycled.", label: "Interview studio user", initials: "IS" },
  { quote: "Seeing matching and missing skills together helped me decide where an application was worth the effort.", label: "Career switcher", initials: "CS" },
];

const careerBoards = [
  { company: "Grafana Labs", image: "/company-proof/grafana.jpg", detail: "Remote engineering roles" },
  { company: "Twilio", image: "/company-proof/twilio.jpg", detail: "Remote-first opportunities" },
  { company: "Postman", image: "/company-proof/postman.jpg", detail: "Product and growth roles" },
  { company: "Smart Working", image: "/company-proof/smart-working.jpg", detail: "Remote technology roles" },
  { company: "Netomi", image: "/company-proof/netomi.jpg", detail: "AI and product roles" },
  { company: "MongoDB", image: "/company-proof/mongodb.jpg", detail: "Global career opportunities" },
];

export default function Home() {
  const [activeRole, setActiveRole] = useState(0);
  const role = roles[activeRole];

  return (
    <main className="modernHome">
      <section className="modernHero">
        <AppNav />

        <div className="heroNoise" />
        <div className="modernHeroGrid">
          <div className="modernHeroCopy">
            <span className="modernEyebrow"><Sparkles size={14} /> Career intelligence, built around you</span>
            <h1>Make your next career move the <em>right</em> one.</h1>
            <p>CarrerFit.com turns your experience and ambitions into a clear career direction, a focused skill plan, and job matches you can act on.</p>
            <div className="modernActions">
              <Link href="/resume">Match my resume <ArrowRight size={18}/></Link>
              <Link href="/jobs">Browse live roles</Link>
            </div>
            <div className="trustRow">
              <div><ShieldCheck size={21}/><strong>Private by design</strong></div>
              <p>Encrypted resume storage, verified accounts, and employer-hosted applications.</p>
            </div>
          </div>

          <div className="productStage" aria-label="CarrerFit.com product preview">
            <div className="stageGlow" />
            <div className="productWindow">
              <div className="windowBar"><span><i/><i/><i/></span><small>carrerfit.com / matches</small><ShieldCheck size={15}/></div>
              <div className="windowBody">
                <aside className="mockSidebar"><span className="mockLogo"><Target/></span>{[Compass, Search, BriefcaseBusiness, BarChart3].map((Icon, index) => <i className={index === 1 ? "active" : ""} key={index}><Icon /></i>)}</aside>
                <div className="mockContent">
                  <div className="mockHeader"><div><small>YOUR CAREER DIRECTION</small><h2>Top matches</h2></div><span>Updated today</span></div>
                  <div className="roleTabs">{roles.map((item, index) => <button className={activeRole === index ? "active" : ""} onClick={() => setActiveRole(index)} key={item.title}>{index + 1}</button>)}</div>
                  <div className="fitReport">
                    <div className="fitTop"><div><span className="companyMonogram">{role.company.slice(0,2).toUpperCase()}</span><div><small>BEST-FIT ROLE</small><h3>{role.title}</h3><p>{role.company} · Bengaluru</p></div></div><div className="fitScore"><strong>{role.score}</strong><span>% fit</span></div></div>
                    <div className="scoreTrack"><i style={{width: `${role.score}%`}} /></div>
                    <div className="reportMeta"><div><small>SALARY RANGE</small><strong>{role.salary}</strong></div><div><small>MARKET DEMAND</small><strong><TrendingUp size={14}/> High</strong></div><div><small>READINESS</small><strong>8 weeks</strong></div></div>
                    <div className="skillMatch"><div><small>YOUR MATCHING SKILLS</small><span>3 of 4 core skills</span></div><div>{role.skills.map(skill => <span key={skill}><Check size={12}/>{skill}</span>)}</div></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="stageNote noteOne"><span><Zap size={16}/></span><div><strong>12 roles unlocked</strong><small>Based on your strengths</small></div></div>
            <div className="stageNote noteTwo"><CircleCheck size={18}/><span>Profile scan complete</span></div>
          </div>
        </div>
        <div className="signalBar"><span>Job-source support</span><div><b>Lever</b><b>Greenhouse</b><b>Ashby</b><b>JSON-LD</b><b>Company careers</b></div></div>
      </section>

      <section className="proofStrip">
        <div className="proofMetrics">
          <article><strong>PDF + DOCX</strong><span>validated resume parsing</span></article>
          <article><strong>AES-256</strong><span>encrypted private storage</span></article>
          <article><strong>Evidence</strong><span>skills linked to resume text</span></article>
          <article><strong>30 days</strong><span>automatic stale-job cleanup</span></article>
        </div>
        <div className="careerBoardHeading">
          <div><span>LIVE EMPLOYER SOURCES</span><h2>Jobs from official company career boards</h2></div>
          <Link href="/jobs">Explore all live jobs <ArrowRight size={16}/></Link>
        </div>
        <div className="careerBoardMarquee" aria-label="Examples of official company career boards indexed by CarrerFit">
          <div className="careerBoardTrack">
            {[...careerBoards, ...careerBoards].map((board, index) => (
              <Link className="careerBoardCard" href="/jobs" key={`${board.company}-${index}`} aria-hidden={index >= careerBoards.length} tabIndex={index >= careerBoards.length ? -1 : 0}>
                <div className="careerBoardShot"><Image src={board.image} alt={index < careerBoards.length ? `${board.company} official career board showing an available role` : ""} fill sizes="(max-width: 600px) 82vw, 350px" /></div>
                <div className="careerBoardMeta"><span><i /> Jobs available</span><strong>{board.company}</strong><small>{board.detail}</small></div>
                <ArrowRight className="careerBoardArrow" size={17}/>
              </Link>
            ))}
          </div>
        </div>
        <p className="careerBoardNote"><ShieldCheck size={14}/> CarrerFit indexes public roles from employer-hosted career pages. Companies shown are job sources, not sponsors or endorsements.</p>
      </section>

      <section className="modernSection methodSection">
        <div className="sectionIntro"><span className="sectionIndex">01 / HOW IT WORKS</span><h2>Clarity before applications.</h2><p>Stop collecting generic advice. CarrerFit.com gives you a practical answer to three questions: where to go, what to build, and which roles deserve your time.</p></div>
        <div className="methodGrid">{steps.map(({icon: Icon, number, title, copy}) => <article key={number}><div><span>{number}</span><Icon/></div><h3>{title}</h3><p>{copy}</p><Link href="/assessment">Learn more <ChevronRight size={15}/></Link></article>)}</div>
      </section>

      <section className="insightSection">
        <div className="insightVisual">
          <div className="radarCard"><div className="radarHeading"><span>PROFILE SIGNALS</span><small>Strong alignment</small></div><div className="radarChart"><i/><i/><i/><i/><i/><span>82</span></div><div className="radarLegend"><span><i/>Analytical</span><span><i/>Creative</span><span><i/>People</span><span><i/>Systems</span></div></div>
          <div className="floatingMetric"><Users/><div><strong>Top 8%</strong><span>candidate readiness</span></div></div>
        </div>
        <div className="insightCopy"><span className="sectionIndex">02 / PERSONAL INTELLIGENCE</span><h2>A career plan that understands the whole picture.</h2><p>Your strongest direction sits at the intersection of what you’re good at, what energizes you, and what employers actually need.</p><ul><li><CircleCheck/> Transferable skills, translated into hiring language</li><li><CircleCheck/> Role-specific gaps, prioritized by impact</li><li><CircleCheck/> Market demand and salary context</li><li><CircleCheck/> A 30-day proof-of-skill roadmap</li></ul><Link href="/assessment">Build my CarrerFit.com profile <ArrowRight size={17}/></Link></div>
      </section>

      <section className="roleSection">
        <div className="sectionIntro light"><span className="sectionIndex">03 / LIVE OPPORTUNITIES</span><h2>Fewer applications.<br/>Stronger reasons.</h2><p>Every recommendation explains why it fits, what is missing, and how competitive you are today.</p></div>
        <div className="featuredRoles">{roles.map((item,index) => <article key={item.title}><div><span className="companyMonogram">{item.company.slice(0,2).toUpperCase()}</span><span className="matchPill">{item.score}% fit</span></div><h3>{item.title}</h3><p>{item.company}</p><div className="roleLocation"><MapPin size={14}/> Bengaluru · Hybrid <Clock3 size={14}/> 2d</div><div className="roleSkills">{item.skills.map(x => <span key={x}>{x}</span>)}</div><div><strong>{item.salary}</strong><Link href="/jobs">View role <ArrowRight size={16}/></Link></div></article>)}</div>
        <Link className="allRoles" href="/resume">Get my resume-ranked roles <ArrowRight size={17}/></Link>
      </section>

      <section className="testimonialSection">
        <div className="testimonialHeading">
          <div><span className="sectionIndex">04 / USER SIGNALS</span><h2>Career clarity,<br/><em>in their words.</em></h2></div>
          <p>What early users value across resume matching, ATS analysis, job discovery, and interview practice.</p>
        </div>
        <div className="testimonialMarquee">
          <div className="testimonialTrack">
            {[...testimonials, ...testimonials].map((item, index) => (
              <article key={`${item.initials}-${index}`} aria-hidden={index >= testimonials.length}>
                <div className="testimonialStars" aria-label="Positive feedback"><Star/><Star/><Star/><Star/><Star/></div>
                <blockquote>“{item.quote}”</blockquote>
                <footer><i>{item.initials}</i><span><strong>{item.label}</strong><small>Early CarrerFit experience</small></span><b>0{index % testimonials.length + 1}</b></footer>
              </article>
            ))}
          </div>
        </div>
        <div className="testimonialTrust"><span><ShieldCheck/> Privacy-first by design</span><span><Sparkles/> Resume-aware intelligence</span><span><Target/> Evidence before recommendations</span></div>
      </section>

      <section className="quoteSection"><span><ShieldCheck/></span><blockquote>Your resume is sensitive career data. CarrerFit encrypts the original file, extracted text, and detailed resume document, keeps sessions server-side, and sends applications only to the employer&apos;s own page.</blockquote><div><i>CF</i><p><strong>Privacy by design</strong><span>No fabricated hiring guarantees · No automatic applications</span></p></div></section>

      <section className="modernCta"><div><span className="modernEyebrow"><Sparkles size={14}/> Your next move starts here</span><h2>Know where you fit.<br/>Build what matters.</h2></div><div><p>Upload your resume and get evidence-based matches to verified opportunities.</p><Link href="/resume">Match my resume free <ArrowRight/></Link><small>PDF or DOCX · Secure processing · No credit card</small></div></section>

      <footer className="modernFooter"><Link className="modernBrand" href="/"><span><Target size={20}/></span>CarrerFit.com</Link><p>Career intelligence for better decisions.</p><div><Link href="/resume">Resume match</Link><Link href="/jobs">Jobs</Link><Link href="/blog">Career guides</Link><Link href="/privacy">Privacy</Link><Link href="/dashboard">Dashboard</Link></div><span>© 2026 CarrerFit.com</span></footer>
    </main>
  );
}
