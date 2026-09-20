"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Cpu,
  FileSearch,
  Layers3,
  MapPin,
  Network,
  Orbit,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  UsersRound,
  WandSparkles,
} from "lucide-react";
import AppNav from "@/components/AppNav";

const featuredJobs = [
  { role: "Salesforce Developer", company: "Cloudworks", location: "Remote · India", fit: "92", tags: ["Apex", "LWC", "Flows"], accent: "CF" },
  { role: "Software Engineer", company: "Northstar Labs", location: "Bengaluru · Hybrid", fit: "89", tags: ["React", "Node.js", "TypeScript"], accent: "NL" },
  { role: "AI / ML Engineer", company: "Vertex Systems", location: "Gurugram · Hybrid", fit: "86", tags: ["Python", "LLMs", "ML"], accent: "VS" },
];

const categories = [
  ["Engineering", "1,240 roles", "ENG"],
  ["Data & AI", "740 roles", "AI"],
  ["Product", "520 roles", "PM"],
  ["Salesforce", "310 roles", "SF"],
  ["Design", "280 roles", "UX"],
  ["Marketing", "430 roles", "MKT"],
];

export default function Home() {
  return (
    <main className="appShell jobsV2 futureHome">
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

      <section className="futureSignal">
        <div className="futureSignalLine" />
        <div className="futureSignalGrid">
          <article><span>LIVE MARKET</span><strong>3,500+</strong><small>Open opportunities</small></article>
          <article><span>VERIFIED NETWORK</span><strong>120+</strong><small>Hiring companies</small></article>
          <article><span>REMOTE INDEX</span><strong>38%</strong><small>Remote-friendly roles</small></article>
          <article><span>SYNC STATUS</span><strong>24/7</strong><small>Fresh job updates</small></article>
        </div>
      </section>

      <section className="futureSection futureCategories">
        <div className="futureHeader">
          <div>
            <span className="futureEyebrow"><Orbit /> Career graph</span>
            <h2>Navigate the market<br /><em>like a system.</em></h2>
          </div>
          <p>Career paths are organized as live clusters, not static lists. Explore where your skills intersect with demand.</p>
        </div>

        <div className="futureCategoryGrid">
          {categories.map(([name, count, code], index) => (
            <Link href="/jobs" key={name} className="futureCategoryCard">
              <div className="futureCardGlow" />
              <span className="futureCardIndex">0{index + 1}</span>
              <div className="futureCategoryIcon">{code}</div>
              <div>
                <small>{count}</small>
                <h3>{name}</h3>
              </div>
              <ChevronRight />
            </Link>
          ))}
        </div>
      </section>

      <section className="futureSection futureOpportunity">
        <div className="futureOpportunityIntro">
          <span className="futureEyebrow"><Network /> Opportunity intelligence</span>
          <h2>Roles ranked by<br /><em>career signal.</em></h2>
          <p>Every recommendation is backed by explainable fit data from your skills, experience, direction, and role requirements.</p>
          <Link href="/jobs">Open opportunity graph <ArrowRight /></Link>
        </div>

        <div className="futureJobStack">
          {featuredJobs.map((job, index) => (
            <Link href="/jobs" key={job.role} className="futureJobCard">
              <div className="futureJobRail"><span>0{index + 1}</span><i /></div>
              <div className="futureCompanyOrb">{job.accent}</div>
              <div className="futureJobMain">
                <small>{job.company}</small>
                <h3>{job.role}</h3>
                <p><MapPin /> {job.location}</p>
                <div>{job.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              </div>
              <div className="futureFit">
                <small>MATCH</small>
                <strong>{job.fit}<sup>%</sup></strong>
                <i><span style={{ width: `${job.fit}%` }} /></i>
              </div>
              <ArrowRight className="futureJobArrow" />
            </Link>
          ))}
        </div>
      </section>

      <section className="futureIntelligence">
        <div className="futureIntelVisual">
          <div className="futureOrbit futureOrbitA" />
          <div className="futureOrbit futureOrbitB" />
          <div className="futureOrbit futureOrbitC" />
          <div className="futureCore"><Cpu /><span>CAREER OS</span><strong>ACTIVE</strong></div>
          <div className="futureNode futureNodeOne"><FileSearch /><span>Resume</span></div>
          <div className="futureNode futureNodeTwo"><BriefcaseBusiness /><span>Jobs</span></div>
          <div className="futureNode futureNodeThree"><WandSparkles /><span>Interview</span></div>
          <div className="futureNode futureNodeFour"><BarChart3 /><span>Growth</span></div>
        </div>

        <div className="futureIntelCopy">
          <span className="futureEyebrow light"><Layers3 /> One connected career OS</span>
          <h2>Search is only<br /><em>the first layer.</em></h2>
          <p>CarrerFit connects your resume, target roles, interview practice, and progress into one adaptive career intelligence system.</p>

          <div className="futureIntelRows">
            <article><span>01</span><div><h3>Resume intelligence</h3><p>Understand ATS strength, missing evidence, and skill gaps.</p></div><FileSearch /></article>
            <article><span>02</span><div><h3>Live opportunity matching</h3><p>Rank verified roles against your actual career evidence.</p></div><BriefcaseBusiness /></article>
            <article><span>03</span><div><h3>Adaptive interview training</h3><p>Practice questions generated from your resume and target role.</p></div><WandSparkles /></article>
          </div>

          <Link href="/resume">Initialize career profile <ArrowRight /></Link>
        </div>
      </section>

      <section className="futureTrust">
        <div className="futureTrustHeader">
          <span className="futureEyebrow"><ShieldCheck /> Infrastructure you can trust</span>
          <h2>Professional by design.<br /><em>Private by default.</em></h2>
        </div>
        <div className="futureTrustGrid">
          <article><ShieldCheck /><span>01</span><h3>Private processing</h3><p>Your career data is handled as sensitive profile intelligence.</p></article>
          <article><BadgeCheck /><span>02</span><h3>Verified sources</h3><p>Roles point to employer-hosted or trusted application sources.</p></article>
          <article><Clock3 /><span>03</span><h3>Always current</h3><p>Fresh opportunities are synced continuously across the network.</p></article>
          <article><TrendingUp /><span>04</span><h3>Explainable fit</h3><p>Understand why a role matches instead of trusting a black-box score.</p></article>
        </div>
      </section>

      <section className="futureFinal">
        <div className="futureFinalGrid" />
        <span><Sparkles /> ENTER THE NEXT VERSION OF YOUR CAREER</span>
        <h2>Don’t browse the future.<br /><em>Position yourself for it.</em></h2>
        <p>Build your career profile, discover stronger opportunities, and prepare for what comes next.</p>
        <div>
          <Link href="/jobs">Explore jobs <ArrowRight /></Link>
          <Link href="/resume">Build my career profile</Link>
        </div>
        <small><BadgeCheck /> Verified opportunities · AI career intelligence · Direct applications</small>
      </section>

      <footer className="futureFooter">
        <Link href="/"><Target /> <b>CarrerFit.com</b></Link>
        <span>Career intelligence for the next era of work.</span>
        <div>
          <Link href="/jobs">Jobs</Link>
          <Link href="/resume">Resume AI</Link>
          <Link href="/interview">AI Interview</Link>
          <Link href="/blog">Career Guides</Link>
          <Link href="/privacy">Privacy</Link>
        </div>
        <small>© 2026 CarrerFit.com</small>
      </footer>

      <style jsx global>{`
        .futureHome{
          --fh-bg:#05070b;
          --fh-panel:rgba(255,255,255,.055);
          --fh-border:rgba(255,255,255,.1);
          --fh-text:#f7f9fc;
          --fh-muted:#8f9bb0;
          --fh-accent:#89f7d5;
          --fh-accent2:#8ea8ff;
          background:#f7f9fc;
        }
        .futureSignal{
          position:relative;
          max-width:1240px;
          margin:-34px auto 0;
          padding:0 28px;
          z-index:5;
        }
        .futureSignalGrid{
          display:grid;
          grid-template-columns:repeat(4,1fr);
          border:1px solid rgba(12,21,36,.1);
          background:rgba(255,255,255,.88);
          backdrop-filter:blur(24px);
          border-radius:24px;
          overflow:hidden;
          box-shadow:0 24px 70px rgba(18,28,45,.1);
        }
        .futureSignalGrid article{
          padding:24px 28px;
          border-right:1px solid rgba(12,21,36,.08);
        }
        .futureSignalGrid article:last-child{border-right:0}
        .futureSignalGrid span{display:block;font-size:10px;letter-spacing:.16em;font-weight:800;color:#69758a;margin-bottom:9px}
        .futureSignalGrid strong{display:block;font-size:28px;line-height:1;color:#0b1220;margin-bottom:7px}
        .futureSignalGrid small{color:#7a8598;font-size:13px}
        .futureSection{max-width:1240px;margin:0 auto;padding:110px 28px}
        .futureHeader{display:flex;justify-content:space-between;align-items:flex-end;gap:60px;margin-bottom:46px}
        .futureHeader h2,.futureOpportunityIntro h2,.futureIntelCopy h2,.futureTrustHeader h2,.futureFinal h2{
          margin:12px 0 0;font-size:clamp(42px,5vw,72px);letter-spacing:-.055em;line-height:.98;color:#0a1120
        }
        .futureHeader h2 em,.futureOpportunityIntro h2 em,.futureIntelCopy h2 em,.futureTrustHeader h2 em,.futureFinal h2 em{font-style:normal;color:#78849a;font-weight:500}
        .futureHeader>p{max-width:460px;font-size:17px;line-height:1.75;color:#6f7a8e;margin:0}
        .futureEyebrow{display:inline-flex;align-items:center;gap:9px;font-size:11px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#46536a}
        .futureEyebrow svg{width:16px;height:16px}
        .futureCategoryGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        .futureCategoryCard{
          position:relative;min-height:210px;padding:26px;border-radius:28px;overflow:hidden;
          border:1px solid rgba(15,25,42,.08);background:#fff;color:#0d1626;
          display:flex;flex-direction:column;justify-content:space-between;text-decoration:none;
          transition:.35s ease;box-shadow:0 18px 50px rgba(24,36,58,.06)
        }
        .futureCategoryCard:hover{transform:translateY(-7px);border-color:rgba(91,116,255,.28);box-shadow:0 28px 70px rgba(34,49,82,.12)}
        .futureCategoryCard:nth-child(2),.futureCategoryCard:nth-child(5){background:linear-gradient(145deg,#0b1020,#121a2f);color:#fff}
        .futureCategoryCard:nth-child(2) small,.futureCategoryCard:nth-child(5) small{color:#91a0bb}
        .futureCardIndex{font-size:10px;letter-spacing:.15em;opacity:.5}
        .futureCategoryIcon{
          width:60px;height:60px;border-radius:18px;display:grid;place-items:center;
          background:linear-gradient(145deg,rgba(139,247,213,.18),rgba(142,168,255,.18));
          border:1px solid rgba(120,140,200,.16);font-size:13px;font-weight:900;letter-spacing:.08em
        }
        .futureCategoryCard small{color:#768296;font-size:12px}
        .futureCategoryCard h3{font-size:24px;margin:6px 0 0;letter-spacing:-.03em}
        .futureCategoryCard>svg{position:absolute;right:24px;bottom:26px;width:20px}
        .futureOpportunity{
          display:grid;grid-template-columns:.78fr 1.22fr;gap:80px;align-items:center;
          padding-top:70px
        }
        .futureOpportunityIntro p{font-size:17px;line-height:1.75;color:#727e92;max-width:460px;margin:24px 0 30px}
        .futureOpportunityIntro>a,.futureIntelCopy>a{
          display:inline-flex;align-items:center;gap:9px;background:#0b1220;color:#fff;padding:15px 20px;border-radius:14px;text-decoration:none;font-weight:700
        }
        .futureOpportunityIntro>a svg,.futureIntelCopy>a svg{width:17px}
        .futureJobStack{display:grid;gap:14px}
        .futureJobCard{
          display:grid;grid-template-columns:28px 58px 1fr 110px 26px;align-items:center;gap:18px;
          min-height:140px;padding:20px 22px;border-radius:24px;background:#fff;color:#0d1626;
          border:1px solid rgba(15,25,42,.08);box-shadow:0 18px 55px rgba(24,36,58,.06);
          text-decoration:none;transition:.3s ease
        }
        .futureJobCard:hover{transform:translateX(8px);border-color:rgba(83,112,255,.25);box-shadow:0 24px 70px rgba(24,36,58,.12)}
        .futureJobRail{align-self:stretch;display:flex;flex-direction:column;align-items:center;gap:10px}
        .futureJobRail span{font-size:9px;font-weight:800;color:#97a2b5}
        .futureJobRail i{width:1px;flex:1;background:linear-gradient(#c8d1df,transparent)}
        .futureCompanyOrb{width:58px;height:58px;border-radius:18px;display:grid;place-items:center;background:#0e1626;color:#fff;font-size:12px;font-weight:900;letter-spacing:.06em}
        .futureJobMain small{font-size:11px;color:#7c879a;text-transform:uppercase;letter-spacing:.1em}
        .futureJobMain h3{font-size:21px;margin:5px 0 6px;letter-spacing:-.025em}
        .futureJobMain p{display:flex;align-items:center;gap:6px;margin:0 0 10px;color:#7a8597;font-size:12px}
        .futureJobMain p svg{width:13px}
        .futureJobMain>div{display:flex;gap:7px;flex-wrap:wrap}
        .futureJobMain>div span{font-size:10px;padding:6px 9px;border-radius:999px;background:#f1f4f8;color:#5f6b80}
        .futureFit small{font-size:9px;letter-spacing:.12em;color:#8792a5}
        .futureFit strong{display:block;font-size:29px;letter-spacing:-.05em}
        .futureFit sup{font-size:12px;margin-left:2px;color:#748096}
        .futureFit i{display:block;height:4px;border-radius:99px;background:#e8edf4;overflow:hidden;margin-top:6px}
        .futureFit i span{display:block;height:100%;background:linear-gradient(90deg,#6de3bf,#738cff);border-radius:99px}
        .futureJobArrow{width:18px;color:#8d99ab}
        .futureIntelligence{
          position:relative;overflow:hidden;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;
          background:radial-gradient(circle at 20% 35%,rgba(95,126,255,.13),transparent 32%),radial-gradient(circle at 85% 60%,rgba(103,238,196,.1),transparent 28%),#060912;
          padding:120px max(28px,calc((100vw - 1184px)/2));color:#fff
        }
        .futureIntelVisual{position:relative;min-height:570px;display:grid;place-items:center}
        .futureOrbit{position:absolute;border:1px solid rgba(255,255,255,.11);border-radius:50%}
        .futureOrbitA{width:460px;height:460px}.futureOrbitB{width:330px;height:330px}.futureOrbitC{width:205px;height:205px}
        .futureOrbitA:after,.futureOrbitB:after,.futureOrbitC:after{content:"";position:absolute;width:8px;height:8px;border-radius:50%;background:#8df7d5;box-shadow:0 0 22px #8df7d5;top:50%;left:-4px}
        .futureOrbitB:after{background:#8fa7ff;box-shadow:0 0 22px #8fa7ff;top:20%;left:auto;right:18px}
        .futureOrbitC:after{top:auto;bottom:10px;left:65%}
        .futureCore{
          width:138px;height:138px;border-radius:38px;display:grid;place-items:center;align-content:center;gap:6px;
          background:linear-gradient(145deg,rgba(255,255,255,.11),rgba(255,255,255,.035));
          border:1px solid rgba(255,255,255,.16);backdrop-filter:blur(24px);box-shadow:0 0 90px rgba(112,137,255,.18)
        }
        .futureCore svg{width:28px}.futureCore span{font-size:10px;letter-spacing:.15em;color:#aeb9cd}.futureCore strong{font-size:12px;color:#8ff2d1}
        .futureNode{
          position:absolute;display:flex;align-items:center;gap:9px;padding:11px 14px;border-radius:14px;
          background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);backdrop-filter:blur(16px);font-size:12px;color:#d9e1ef
        }
        .futureNode svg{width:16px}.futureNodeOne{top:12%;left:12%}.futureNodeTwo{top:24%;right:5%}.futureNodeThree{bottom:18%;right:10%}.futureNodeFour{bottom:9%;left:14%}
        .futureEyebrow.light{color:#9aa7bd}
        .futureIntelCopy h2{color:#fff}
        .futureIntelCopy p{font-size:17px;line-height:1.75;color:#919db2;max-width:540px;margin:24px 0 34px}
        .futureIntelRows{display:grid;gap:1px;margin-bottom:34px;border-top:1px solid rgba(255,255,255,.1)}
        .futureIntelRows article{display:grid;grid-template-columns:34px 1fr 24px;gap:18px;align-items:center;padding:20px 0;border-bottom:1px solid rgba(255,255,255,.1)}
        .futureIntelRows article>span{font-size:10px;color:#68758a;letter-spacing:.12em}
        .futureIntelRows h3{margin:0 0 5px;font-size:17px}.futureIntelRows p{font-size:13px;margin:0;color:#8290a6}
        .futureIntelRows svg{width:19px;color:#8bf0d1}
        .futureIntelCopy>a{background:#fff;color:#08111f}
        .futureTrust{max-width:1240px;margin:0 auto;padding:115px 28px}
        .futureTrustHeader{max-width:760px;margin-bottom:48px}
        .futureTrustGrid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
        .futureTrustGrid article{min-height:250px;padding:26px;border-radius:24px;background:#fff;border:1px solid rgba(14,24,40,.08);position:relative}
        .futureTrustGrid article>svg{width:28px;height:28px;margin-bottom:52px;color:#263956}
        .futureTrustGrid article>span{position:absolute;right:24px;top:24px;font-size:10px;letter-spacing:.14em;color:#a0aabd}
        .futureTrustGrid h3{font-size:18px;margin:0 0 10px}.futureTrustGrid p{font-size:13px;line-height:1.7;color:#7b8799;margin:0}
        .futureFinal{
          position:relative;overflow:hidden;text-align:center;background:#07101c;color:#fff;padding:120px 28px
        }
        .futureFinal:before{content:"";position:absolute;inset:auto 10% -65% 10%;height:520px;background:radial-gradient(circle,#395bff55,transparent 65%)}
        .futureFinal>*{position:relative;z-index:1}
        .futureFinal>span{font-size:10px;letter-spacing:.18em;font-weight:800;color:#9fb0ca}
        .futureFinal h2{color:#fff;margin:18px auto 22px;max-width:950px}
        .futureFinal h2 em{color:#97a9c6}
        .futureFinal p{max-width:650px;margin:0 auto 32px;color:#8d9ab0;font-size:17px;line-height:1.7}
        .futureFinal>div:not(.futureFinalGrid){display:flex;justify-content:center;gap:12px;flex-wrap:wrap}
        .futureFinal a{padding:15px 20px;border-radius:14px;text-decoration:none;font-weight:700}
        .futureFinal a:first-child{display:inline-flex;align-items:center;gap:8px;background:#fff;color:#09101d}
        .futureFinal a:last-child{border:1px solid rgba(255,255,255,.14);color:#fff;background:rgba(255,255,255,.04)}
        .futureFinal small{display:block;margin-top:24px;color:#66748a}
        .futureFooter{
          display:grid;grid-template-columns:auto 1fr auto auto;gap:30px;align-items:center;
          padding:28px max(28px,calc((100vw - 1184px)/2));background:#050a12;color:#7e8ba0;border-top:1px solid rgba(255,255,255,.08);font-size:12px
        }
        .futureFooter>a{display:flex;align-items:center;gap:8px;color:#fff;text-decoration:none}.futureFooter>a svg{width:18px}
        .futureFooter>div{display:flex;gap:18px}.futureFooter>div a{color:#8794a8;text-decoration:none}.futureFooter>div a:hover{color:#fff}
        @media (max-width: 980px){
          .futureSignalGrid,.futureTrustGrid{grid-template-columns:repeat(2,1fr)}
          .futureSignalGrid article:nth-child(2){border-right:0}.futureSignalGrid article:nth-child(-n+2){border-bottom:1px solid rgba(12,21,36,.08)}
          .futureCategoryGrid{grid-template-columns:repeat(2,1fr)}
          .futureOpportunity,.futureIntelligence{grid-template-columns:1fr;gap:50px}
          .futureHeader{align-items:flex-start;flex-direction:column;gap:20px}
          .futureFooter{grid-template-columns:1fr 1fr}.futureFooter>span{display:none}
        }
        @media (max-width: 680px){
          .futureSignal{margin-top:18px}.futureSignalGrid{grid-template-columns:1fr}
          .futureSignalGrid article{border-right:0;border-bottom:1px solid rgba(12,21,36,.08)}
          .futureCategoryGrid{grid-template-columns:1fr}
          .futureJobCard{grid-template-columns:46px 1fr 72px;padding:18px}
          .futureJobRail,.futureJobArrow{display:none}.futureCompanyOrb{width:46px;height:46px;border-radius:14px}
          .futureJobMain h3{font-size:18px}.futureFit strong{font-size:24px}
          .futureTrustGrid{grid-template-columns:1fr 1fr}.futureTrustGrid article{min-height:210px}
          .futureOrbitA{width:330px;height:330px}.futureOrbitB{width:240px;height:240px}.futureOrbitC{width:150px;height:150px}
          .futureIntelVisual{min-height:430px}.futureNode{font-size:10px;padding:8px 10px}
          .futureFooter{grid-template-columns:1fr;gap:16px}.futureFooter>div{flex-wrap:wrap}
        }
        @media (max-width: 480px){.futureTrustGrid{grid-template-columns:1fr}}
      `}</style>
    </main>
  );
}
