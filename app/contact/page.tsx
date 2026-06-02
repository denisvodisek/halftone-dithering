import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site-config";
import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with the ${SITE_NAME} team with feedback, bug reports, or feature requests.`,
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default function ContactPage() {
  return (
    <SiteShell>
      <article className="mx-auto w-full max-w-3xl">
        <header className="border-l-2 border-primary/70 pl-5">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">Contact</p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Contact us</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            We read every message about {SITE_NAME} — whether it is a bug, a feature idea, or a question about getting a
            particular halftone look.
          </p>
        </header>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-foreground/90 sm:text-base">
          <section className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight">Email</h3>
            <p>
              The fastest way to reach us is by email at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium underline underline-offset-4">
                {CONTACT_EMAIL}
              </a>
              . We typically reply within a few business days.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight">Reporting a problem</h3>
            <p>
              If something is not working, it helps to include the browser and operating system you are using, the type
              of file you were processing (image or video), and the settings or preset that were active. Screenshots of
              the workbench and the result make issues much faster to reproduce and fix.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight">Feature requests</h3>
            <p>
              New dither algorithms, mark shapes, export formats, and presets are added based on what people actually
              ask for. Tell us what you are trying to make and we will see what we can fit into a future update.
            </p>
          </section>
        </div>
      </article>
    </SiteShell>
  );
}
