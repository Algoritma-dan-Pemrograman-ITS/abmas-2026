/**
 * Single source of truth for the documentation navigation.
 *
 * `navGroups` drives the left sidebar (grouped categories) while the
 * flattened `allPages` list powers the previous/next pagination at the
 * bottom of every page.
 *
 * This is placeholder content — replace the entries below with your own
 * pages once you're ready to fill in real material.
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
      {
        title: "Installation",
        navLabel: "Installation",
        href: "/docs/installation",
      },
    ],
  },
  {
    title: "Guides",
    links: [
      {
        title: "First Guide",
        navLabel: "First Guide",
        href: "/docs/guides/first-guide",
      },
      {
        title: "Second Guide",
        navLabel: "Second Guide",
        href: "/docs/guides/second-guide",
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
