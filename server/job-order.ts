import type { Job } from "../lib/types.js";

export function newestJobsFirst(items: Job[]) {
  return [...items].sort((left, right) => {
    const ageDifference = left.postedDaysAgo - right.postedDaysAgo;
    if (ageDifference) return ageDifference;

    const discoveredDifference = timestamp(right.discoveredAt) - timestamp(left.discoveredAt);
    if (discoveredDifference) return discoveredDifference;

    const verifiedDifference = timestamp(right.verifiedAt) - timestamp(left.verifiedAt);
    if (verifiedDifference) return verifiedDifference;

    return left.id.localeCompare(right.id);
  });
}

function timestamp(value?: string) {
  if (!value) return 0;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : 0;
}
