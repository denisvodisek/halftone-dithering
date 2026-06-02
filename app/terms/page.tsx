import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { SITE_NAME } from "@/lib/site-config";
import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that govern your use of ${SITE_NAME}, including acceptable use, intellectual property, and disclaimers.`,
  alternates: { canonical: `${SITE_URL}/terms` },
};

const EFFECTIVE_DATE = "June 2, 2026";

export default function TermsPage() {
  return (
    <SiteShell>
      <article className="mx-auto w-full max-w-3xl">
        <header className="border-l-2 border-primary/70 pl-5">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">Legal</p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Terms of Service</h1>
          <p className="mt-3 text-xs text-muted-foreground">Last updated {EFFECTIVE_DATE}</p>
        </header>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-foreground/90 sm:text-base">
          <section className="space-y-4">
            <p>
              By accessing or using {SITE_NAME} (&ldquo;the service&rdquo;), you agree to these Terms of Service. If you
              do not agree, please do not use the service.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight">Use of the service</h3>
            <p>
              {SITE_NAME} is provided as a free, browser-based tool for creating halftone and dithered artwork from
              images and video. You may use it for personal and commercial projects. You are responsible for ensuring
              you have the rights to any image or video file you process with the tool.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight">Acceptable use</h3>
            <p>You agree not to use the service to:</p>
            <ul className="list-inside list-disc space-y-2 text-muted-foreground">
              <li>process content that is unlawful, infringing, or that you do not have permission to use;</li>
              <li>attempt to disrupt, overload, or reverse-engineer the service in a way that harms its operation;</li>
              <li>misrepresent the origin of work produced with the tool in a way that violates the law.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight">Your content and output</h3>
            <p>
              You retain all rights to the files you process and to the output you create. Because processing happens
              locally in your browser, we do not claim ownership of, store, or access your media. See our{" "}
              <Link href="/privacy" className="font-medium underline underline-offset-4">
                Privacy Policy
              </Link>{" "}
              for details.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight">Disclaimer and limitation of liability</h3>
            <p>
              The service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind,
              whether express or implied. We do not guarantee that the service will be uninterrupted, error-free, or
              suitable for any particular purpose. To the fullest extent permitted by law, {SITE_NAME} is not liable for
              any indirect, incidental, or consequential damages arising from your use of the service.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight">Third-party services</h3>
            <p>
              The site displays advertising provided by third parties and may link to external websites. We are not
              responsible for the content, policies, or practices of those third parties.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight">Changes to these terms</h3>
            <p>
              We may update these Terms of Service from time to time. Continued use of the service after changes are
              posted constitutes acceptance of the updated terms.
            </p>
          </section>
        </div>
      </article>
    </SiteShell>
  );
}
