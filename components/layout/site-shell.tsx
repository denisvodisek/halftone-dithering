import { AdSlot } from "@/components/ads/ad-slot";
import { ThemeToggle } from "@/components/layout/theme-toggle";

interface SiteShellProps {
  children: React.ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-xl font-semibold sm:text-2xl">Halftone Dithering FX</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 pb-16 sm:px-6 lg:px-8">
        <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP ?? "1111111111"} format="horizontal" />
        {children}
      </main>
    </div>
  );
}
