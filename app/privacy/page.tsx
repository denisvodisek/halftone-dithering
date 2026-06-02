import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site-config";
import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE_NAME} handles your data: in-browser processing, local storage, cookies, and third-party advertising.`,
  alternates: { canonical: `${SITE_URL}/privacy` },
};

const EFFECTIVE_DATE = "June 2, 2026";

export default function PrivacyPage() {
  return (
    <SiteShell>
      <article className="mx-auto w-full max-w-3xl">
        <header className="border-l-2 border-primary/70 pl-5">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">Legal</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Privacy Policy</h2>
          <p className="mt-3 text-xs text-muted-foreground">Last updated {EFFECTIVE_DATE}</p>
        </header>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-foreground/90 sm:text-base">
          <section className="space-y-4">
            <p>
              This Privacy Policy explains how {SITE_NAME} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;the
              site&rdquo;) handles information when you use this website. We have designed the tool to collect as little
              personal data as possible.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight">Your images and video stay on your device</h3>
            <p>
              {SITE_NAME} processes images and video entirely within your web browser. The files you open are never
              uploaded to, transmitted to, or stored on our servers. All halftone and dithering processing happens
              locally on your own device, and your media is discarded from memory when you close or reload the page.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight">Local storage</h3>
            <p>
              When you save a preset or configuration, it is stored in your browser&apos;s local storage on your own
              device. This data is not transmitted to us and can be cleared at any time by clearing your browser&apos;s
              site data.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight">Cookies and advertising</h3>
            <p>
              We use third-party advertising, including Google AdSense, to help keep this tool free. Third-party vendors,
              including Google, use cookies to serve ads based on your prior visits to this and other websites.
            </p>
            <ul className="list-inside list-disc space-y-2 text-muted-foreground">
              <li>
                Google&apos;s use of advertising cookies enables it and its partners to serve ads to you based on your
                visit to this site and/or other sites on the internet.
              </li>
              <li>
                You may opt out of personalized advertising by visiting{" "}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline underline-offset-4"
                >
                  Google Ads Settings
                </a>
                .
              </li>
              <li>
                You can also opt out of a third-party vendor&apos;s use of cookies for personalized advertising by
                visiting{" "}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline underline-offset-4"
                >
                  www.aboutads.info
                </a>
                .
              </li>
            </ul>
            <p>
              For more information about how Google uses data when you use our partners&apos; sites or apps, see{" "}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-4"
              >
                Google&apos;s policy
              </a>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight">Analytics</h3>
            <p>
              We may use privacy-respecting analytics to understand aggregate usage, such as which features and pages are
              most used. This information is collected in aggregate and is not used to identify individual visitors.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight">Children&apos;s privacy</h3>
            <p>
              This site is not directed at children under the age of 13, and we do not knowingly collect personal
              information from children.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight">Your choices</h3>
            <p>
              You can control or delete cookies through your browser settings and clear locally stored presets at any
              time. Disabling cookies may affect the ads you see but will not affect the core functionality of the
              halftone tool.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight">Changes to this policy</h3>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an
              updated date above.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight">Contact</h3>
            <p>
              If you have questions about this Privacy Policy, contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium underline underline-offset-4">
                {CONTACT_EMAIL}
              </a>{" "}
              or through the{" "}
              <Link href="/contact" className="font-medium underline underline-offset-4">
                contact page
              </Link>
              .
            </p>
          </section>
        </div>
      </article>
    </SiteShell>
  );
}
