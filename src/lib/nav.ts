/**
 * Single source of truth for the documentation navigation.
 *
 * `navGroups` drives the left sidebar (grouped categories) while the
 * flattened `allPages` list powers the previous/next pagination at the
 * bottom of every page.
 *
 * Content lives in `src-materi/Sesi-*.md` — each entry below is the web
 * version of one training session ("sesi") from that source material.
 */

export type DocLink = {
  /** Long, descriptive page title shown as the <h1>. */
  title: string;
  /** Shorter label used inside the sidebar list. */
  navLabel: string;
  /** Route path. */
  href: string;
};

export type NavGroup = {
  title: string;
  links: DocLink[];
};

export const navGroups: NavGroup[] = [
  {
    title: "Getting Started",
    links: [
      {
        title: "Welcome",
        navLabel: "Home / Welcome",
        href: "/",
      },
    ],
  },
  {
    title: "Materi Pelatihan",
    links: [
      {
        title: "Sesi 1: Mengenal LLM & AI dalam Pendidikan",
        navLabel: "Sesi 1 — Mengenal LLM & AI",
        href: "/sesi-1",
      },
      {
        title: "Sesi 2: LLM sebagai Asisten Guru",
        navLabel: "Sesi 2 — LLM sebagai Asisten Guru",
        href: "/sesi-2",
      },
      {
        title: "Sesi 3: Prompt Engineering untuk Guru",
        navLabel: "Sesi 3 — Prompt Engineering",
        href: "/sesi-3",
      },
      {
        title: "Sesi 4: Kelas Prompt — Buat Materi Bareng AI",
        navLabel: "Sesi 4 — Hands-on: Kelas Prompt",
        href: "/sesi-4",
      },
      {
        title: "Sesi 5: Critical Thinking & Fact Checking",
        navLabel: "Sesi 5 — Critical Thinking",
        href: "/sesi-5",
      },
      {
        title: "Sesi 6: Etika, Privasi & Integritas Akademik",
        navLabel: "Sesi 6 — Etika & Privasi",
        href: "/sesi-6",
      },
    ],
  },
];

/** Flat, ordered list of every page for sequential navigation. */
export const allPages: DocLink[] = navGroups.flatMap((group) => group.links);

/** Return the previous and next page relative to the given href. */
export function getAdjacentPages(href: string): {
  prev: DocLink | null;
  next: DocLink | null;
} {
  const index = allPages.findIndex((page) => page.href === href);
  if (index === -1) {
    return { prev: null, next: null };
  }
  return {
    prev: index > 0 ? allPages[index - 1] : null,
    next: index < allPages.length - 1 ? allPages[index + 1] : null,
  };
}
