import React from "react";
import type { Metadata } from "next";

import { siteConfig } from "@/app/assets/data/site-config";
import CookieSettingsButton from "@/app/components/cookie-settings-button";

/**
 * DRAFT — review by counsel before publishing.
 *
 * Slim "Cookies & Analytics Notice" for an informational law-firm site
 * that stores no personal data digitally. Scope is deliberately narrow:
 * the only non-essential processing is Google Analytics (consent-gated).
 * Aligned to the PH Data Privacy Act of 2012 (RA 10173) + NPC guidance,
 * with a short GDPR note for EU/UK visitors.
 *
 * Design: "Trust & Authority + Minimal" — editorial serif headings,
 * hairline rules, restrained spacing. Firm LYS palette.
 */

const EFFECTIVE_DATE = "16 May 2026";

// Consent UI ships dev-only by client request; the consent flow is a draft.
// In production GA currently runs without a consent banner.
const CONSENT_UI_ENABLED = process.env.NODE_ENV !== "production";

export const metadata: Metadata = {
  title: "Cookies & Analytics Notice",
  description: `How ${siteConfig.firmName} uses cookies and Google Analytics on this website, and your choices under the Philippine Data Privacy Act of 2012 (RA 10173).`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const { firmName, contact } = siteConfig;

/**
 * Cookies & Analytics Notice page.
 *
 * @returns {React.ReactNode} The rendered notice.
 */
export default function PrivacyPolicyPage(): React.ReactNode {
  return (
    <main className="min-h-dvh bg-white text-lys-black font-opensans">
      <div className="mx-auto max-w-content px-6 py-20 sm:py-24">
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-lys-gray-dark underline-offset-4 transition-colors hover:text-lys-black hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lys-black/40"
        >
          <span aria-hidden="true">&larr;</span> Back to home
        </a>

        <header className="mt-10 border-b border-lys-gray-medium pb-8">
          <p className="font-raleway text-xs font-semibold uppercase tracking-[0.18em] text-lys-gray-dark">
            Legal &middot; Privacy
          </p>
          <h1 className="mt-3 font-noticia text-4xl font-bold leading-tight tracking-tight sm:text-[2.75rem]">
            Cookies &amp; Analytics Notice
          </h1>
          <p className="mt-4 text-sm text-lys-gray-dark">
            Effective {EFFECTIVE_DATE} &middot; {firmName}
          </p>
        </header>

        <div className="mt-10 space-y-10">
          <Section title="What this covers">
            <p>
              This website is informational. We do not run accounts, logins,
              or forms, and we do not collect or store your personal data on
              this site. The only non-essential technology we use is Google
              Analytics, and only with your consent.
            </p>
          </Section>

          <Section title="Cookies we use">
            <dl className="space-y-5">
              <div>
                <dt className="font-semibold text-lys-black">
                  Strictly necessary
                </dt>
                <dd className="mt-1 text-lys-gray-dark">
                  Keep the site secure and remember your cookie choice. No
                  consent required; always active.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-lys-black">Analytics</dt>
                <dd className="mt-1 text-lys-gray-dark">
                  Google Analytics measures aggregate, anonymised usage so we
                  can improve the site. Disabled until you accept. We do not
                  use it for advertising or profiling.
                </dd>
              </div>
            </dl>
          </Section>

          <Section title="Your consent">
            {CONSENT_UI_ENABLED ? (
              <p>
                On your first visit you can Accept or Reject analytics with
                equal ease. Until you accept, Google Consent Mode keeps
                analytics storage off. Your choice is remembered on your
                device and you can change or withdraw it anytime &mdash;{" "}
                <CookieSettingsButton />.
              </p>
            ) : (
              <p>
                We use Google Analytics to measure aggregate, anonymised
                site usage. A granular cookie-consent control is being
                finalised and will be added here. In the meantime, you can
                prevent analytics cookies using your browser settings or a
                privacy extension, or contact us (below) with any request.
              </p>
            )}
          </Section>

          <Section title="Your rights">
            <p>
              Under the Philippine Data Privacy Act of 2012 (RA 10173) you
              have rights to be informed, to object, and to lodge a complaint
              with the National Privacy Commission (
              <a
                href="https://privacy.gov.ph"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-lys-black underline underline-offset-4 transition-colors hover:text-lys-gray-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lys-black/40"
              >
                privacy.gov.ph
              </a>
              ). EU/UK visitors have equivalent rights under the GDPR.
              Analytics data, where collected, is held by Google LLC under
              its own terms.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions about this notice? Email{" "}
              <a
                href={`mailto:${contact.email}`}
                className="font-medium text-lys-black underline underline-offset-4 transition-colors hover:text-lys-gray-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lys-black/40"
              >
                {contact.email}
              </a>{" "}
              or call {contact.phoneDisplay}.
            </p>
          </Section>
        </div>

        <p className="mt-16 border-t border-lys-gray-medium pt-6 text-xs leading-relaxed text-lys-gray-dark">
          Working draft &mdash; to be reviewed by the Firm&rsquo;s counsel
          before it is treated as final.
        </p>
      </div>
    </main>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

/**
 * Titled notice section: raleway eyebrow-weight heading + readable body.
 */
function Section({ title, children }: SectionProps): React.ReactNode {
  return (
    <section>
      <h2 className="font-raleway text-base font-semibold tracking-wide text-lys-black">
        {title}
      </h2>
      <div className="mt-2.5 text-[0.95rem] leading-relaxed text-lys-gray-dark">
        {children}
      </div>
    </section>
  );
}
