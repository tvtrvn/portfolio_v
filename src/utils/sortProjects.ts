import type { Project } from '../types/content';

/**
 * Extract the most recent 4-digit year from a project's `year` string.
 * Handles "2026", "2025–2026", "2024–present", etc.
 */
function yearSortKey(year: string): number {
  const nums = year.match(/\d{4}/g)?.map((n) => Number.parseInt(n, 10)) ?? [0];
  return Math.max(...nums);
}

/**
 * Canonical project ordering used across every surface that lists projects.
 *
 * Priority:
 *   1. `starred` projects first (in source-array order)
 *   2. `featured` projects next (in source-array order)
 *   3. Everything else, most recent year first
 *
 * Returns a new array — does not mutate input.
 */
export function sortStarredFirst<T extends Project>(projects: readonly T[]): T[] {
  return [...projects].sort((a, b) => {
    const as = a.starred ? 1 : 0;
    const bs = b.starred ? 1 : 0;
    if (bs !== as) return bs - as;
    const af = a.featured ? 1 : 0;
    const bf = b.featured ? 1 : 0;
    if (bf !== af) return bf - af;
    return yearSortKey(b.year) - yearSortKey(a.year);
  });
}
