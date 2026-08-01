import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Latest Jobs in India & Remote Jobs | CarrerFit",
  description: "Search fresh, verified jobs across engineering, data, design, product, marketing, sales, and customer success. Apply directly on the employer website.",
  alternates: { canonical: "/jobs" },
  openGraph: {
    type: "website",
    url: "/jobs",
    title: "Latest Jobs in India & Remote Jobs | CarrerFit",
    description: "Discover fresh opportunities from verified employer-hosted job boards.",
  },
};

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
