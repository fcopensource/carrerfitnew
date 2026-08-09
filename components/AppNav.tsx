"use client";

import { LogIn, Menu, Target, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [["/jobs", "Jobs"], ["/resume", "Resume AI"], ["/interview", "AI interview"], ["/practice", "Practice lab"], ["/blog", "Career guides"]];

export default function AppNav({ light = false }: { light?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [account, setAccount] = useState<{ name: string } | null>(null);
  useEffect(() => { setOpen(false); fetch("/api/auth/me", { cache: "no-store" }).then((response) => response.json()).then((body) => setAccount(body.user || null)).catch(() => null); }, [pathname]);
  useEffect(() => { const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); }; window.addEventListener("keydown", close); return () => window.removeEventListener("keydown", close); }, []);
  async function logout() { await fetch("/api/auth/logout", { method: "POST" }); window.location.assign("/login"); }
  return (
    <header className={`appNav ${light ? "navLight" : ""}`}>
      <Link className="brand" href="/">
        <span className="brandMark"><Target size={21} /></span><span><b>CarrerFit</b><small>Career intelligence</small></span>
      </Link>
      <button className="menuButton" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open} aria-controls="primary-navigation">{open ? <X /> : <Menu />}</button>
      <nav id="primary-navigation" className={open ? "open" : ""}>
        {links.map(([href, label]) => <Link className={pathname === href ? "current" : ""} href={href} key={href} onClick={() => setOpen(false)}>{label}</Link>)}
      </nav>
      <div className="navAccount">{account ? <><Link className="navCta" href="/dashboard">Open dashboard</Link><button onClick={logout}>Sign out</button></> : <Link className="navCta" href="/login"><LogIn size={15}/> Sign in</Link>}</div>
    </header>
  );
}
