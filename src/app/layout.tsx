import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SidebarNav } from "@/components/sidebar-nav";
import { OnThisPage } from "@/components/on-this-page";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Named "--font-jetbrains-mono" (not "--font-mono") to avoid colliding with
// Tailwind v4's own `--font-mono` theme key, which globals.css maps to this
// variable via `@theme inline`.
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Docs",
    template: "%s | Docs",
  },
  description: "Documentation site.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${jetBrainsMono.variable}`}
    >
      <body className="font-sans">
        <SiteHeader />

        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[16rem_minmax(0,1fr)_16rem]">
            {/* Left sidebar: fixed width, independently scrollable */}
            <aside className="hidden lg:block">
              <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-8 pr-2">
                <SidebarNav />
              </div>
            </aside>

            {/* Center column: readable measure, capped width */}
            <main className="min-w-0">
              <div className="mx-auto max-w-3xl xl:mx-0">{children}</div>
            </main>

            {/* Right sidebar: table of contents */}
            <aside className="hidden xl:block">
              <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-10 pl-2">
                <OnThisPage />
              </div>
            </aside>
          </div>
        </div>

        <SiteFooter />
      </body>
    </html>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-slate-200">
      <div className="mx-auto flex max-w-8xl flex-col items-start justify-between gap-3 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} Your Organization.</p>
        <div className="flex items-center gap-5">
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="hover:text-slate-900"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
