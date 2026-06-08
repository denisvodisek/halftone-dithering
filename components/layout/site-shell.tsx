import Link from "next/link";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { SITE_NAME } from "@/lib/site-config";

interface SiteShellProps {
  children: React.ReactNode;
}

const NAV_LINKS = [
  { href: "/", label: "Tool" },
  { href: "/blog", label: "Blog" },
  { href: "/guides", label: "Guides" },
  { href: "/about", label: "About" },
];

const FOOTER_LINKS = [
  { href: "/blog", label: "Blog" },
  { href: "/guides", label: "Guides" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
];

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-foreground/15 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
          <Link href="/" className="group flex items-center gap-2.5">
            <span
              aria-hidden
              className="halftone-dots size-7 shrink-0 border border-foreground/20 text-primary"
            />
            <span className="font-display text-base font-bold uppercase tracking-tight sm:text-lg">
              {SITE_NAME}
            </span>
          </Link>
          <div className="flex items-center gap-3 sm:gap-6">
            <nav
              aria-label="Primary"
              className="hidden items-center gap-5 text-xs font-medium uppercase tracking-[0.12em] sm:flex"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground underline-offset-4 transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 pb-16 sm:px-6 lg:px-8">
        {children}
      </main>

      <footer className="border-t border-foreground/15 bg-card">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground">
            &copy; {new Date().getFullYear()} {SITE_NAME} — Made for designers &amp; illustrators.
          </p>
          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium uppercase tracking-[0.1em]"
          >
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground underline-offset-4 transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
