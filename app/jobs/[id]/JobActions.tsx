"use client";

import { Bookmark, Check, ExternalLink } from "lucide-react";
import { useState } from "react";
import { api } from "@/lib/api";
import type { Job } from "@/lib/types";

export default function JobActions({ job }: { job: Job }) {
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  async function save() {
    try {
      setError("");
      await api("/api/applications", { method: "POST", body: JSON.stringify({ jobId: job.id }) });
      setSaved(true);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Sign in to save this opportunity.");
    }
  }

  return <aside className="applyCard">
    <span>CarrerFit.com score</span><strong>{job.fitScore}%</strong><progress value={job.fitScore} max="100"/>
    <p>Upload your resume to replace this baseline score with your personal match.</p>
    <a className="externalApply" href={job.applyUrl} target="_blank" rel="noopener noreferrer sponsored">Apply on {job.source} <ExternalLink/></a>
    <button onClick={save}>{saved ? <><Check/> Saved to dashboard</> : <><Bookmark/> Save opportunity</>}</button>
    {error && <small role="alert">{error}</small>}
    <small>Applications happen on the employer-hosted page. CarrerFit.com never submits your data.</small>
  </aside>;
}
