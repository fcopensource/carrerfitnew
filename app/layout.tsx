import type { Metadata } from "next";
import { connection } from "next/server";
import { siteUrl } from "@/lib/site";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl("/")),
  title: { default: "CarrerFit | AI Resume Checker, Career Tools & Latest Jobs", template: "%s" },
  description:
    "Analyze your resume, check ATS readiness, practice interviews, explore career paths, and discover fresh verified jobs with CarrerFit.",
  applicationName: "CarrerFit.com",
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "CarrerFit.com", url: "/", title: "CarrerFit | AI Resume Checker, Career Tools & Latest Jobs", description: "AI-powered resume analysis, interview practice, career guidance, and verified job opportunities." },
  twitter: { card: "summary_large_image", title: "CarrerFit | AI Resume Checker, Career Tools & Latest Jobs", description: "Build a clearer, evidence-backed career move." },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Render each document against the active deployment so CDN HTML can never
  // outlive the content-hashed CSS and JavaScript files it references.
  await connection();
  return (
    <html lang="en">
      <body><AnalyticsTracker/>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(siteSchema()) }}/></body>
    </html>
  );
}

function siteSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": siteUrl("/#organization"), name: "CarrerFit", alternateName: "CarrerFit.com", url: siteUrl("/"), logo: siteUrl("/opengraph-image") },
      { "@type": "WebSite", "@id": siteUrl("/#website"), name: "CarrerFit", alternateName: "CarrerFit.com", url: siteUrl("/"), publisher: { "@id": siteUrl("/#organization") }, inLanguage: "en" },
    ],
  };
}

function safeJson(value: unknown) { return JSON.stringify(value).replace(/</g, "\\u003c"); }
