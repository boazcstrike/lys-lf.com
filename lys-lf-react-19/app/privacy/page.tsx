import React from "react";
import type { Metadata } from "next";
import {
  FaBan,
  FaChartBar,
  FaSlidersH,
  FaGlobeAmericas,
  FaBalanceScale,
  FaEnvelope,
  FaChevronDown,
} from "react-icons/fa";

import { siteConfig } from "@/app/assets/data/site-config";
import Reveal from "@/app/components/reveal";
import ConsentStatusChip from "@/app/components/consent-status-chip";

/**
 * Cookies & Analytics Notice for an informational law-firm site that stores
 * no personal data digitally. Scope is deliberately narrow: the only
 * non-essential processing is Google Analytics (consent-gated). Aligned to
 * the PH Data Privacy Act of 2012 (RA 10173) + NPC guidance, with a short
 * GDPR note for EU/UK visitors.
 *
 * Design criteria (from privacy-UX research — NN/g, ICO layered notice,
 * EDPB, CookieYes): 5-second human gist, at-a-glance summary cards, live
 * consent-status control, progressive disclosure (plain summary open;
 * detail + cookie table in accordions), named specifics, no dark patterns.
 * On-brand: Noticia serif, lys palette, Reveal motion, hairline rules. Body
 * stays left-aligned and readable — legal text is never centered/uppercased.
 */

const EFFECTIVE_DATE = "16 May 2026";

export const metadata: Metadata = {
  title: "Cookies & Analytics Notice",
  description: `How ${siteConfig.firmName} uses cookies and Google Analytics on this website, and your choices under the Philippine Data Privacy Act of 2012 (RA 10173).`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const { firmName, contact } = siteConfig;

/** Every cookie this site can set — named specifics, no vagueness. */
const COOKIE_ROWS: ReadonlyArray<{
  name: string;
  purpose: string;
  provider: string;
  expiry: string;
  category: "Necessary" | "Analytics";
}> = [
  {
    name: "Consent choice",
    purpose:
      "Remembers your cookie decision so you are not asked again. Stored in your browser, not a tracking cookie.",
    provider: "This site (local storage)",
    expiry: "Until you clear it",
    category: "Necessary",
  },
  {
    name: "_ga",
    purpose: "Distinguishes visitors to produce aggregated usage statistics.",
    provider: "Google LLC",
    expiry: "2 years",
    category: "Analytics",
  },
  {
    name: "_ga_VE4EEKPNEQ",
    purpose: "Persists session state for Google Analytics.",
    provider: "Google LLC",
    expiry: "2 years",
    category: "Analytics",
  },
];

export default function PrivacyPolicyPage(): React.ReactNode {
  return (
    <main className="min-h-dvh bg-white text-lys-black font-opensans">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-lys-gray-dark underline-offset-4 transition-colors hover:text-lys-black hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lys-black/40"
        >
          <span aria-hidden="true">&larr;</span> Back to home
        </a>

        {/* Hero — 5-second human gist */}
        <Reveal as="header" className="mt-10">
          <p className="font-raleway text-xs font-semibold uppercase tracking-[0.18em] text-lys-gray-dark">
            Legal &middot; Privacy
          </p>
          <h1 className="mt-3 font-noticia text-4xl font-bold leading-tight tracking-tight sm:text-[2.75rem]">
            Cookies &amp; Analytics Notice
          </h1>
          <p className="mt-4 font-noticia text-xl leading-snug text-lys-black sm:text-2xl">
            We don&rsquo;t collect your personal data. <strong>Full stop.</strong>
          </p>
          <p className="mt-4 text-sm text-lys-gray-dark">
            Effective {EFFECTIVE_DATE} &middot; {firmName}
          </p>
        </Reveal>

        {/* At-a-glance triptych */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <SummaryCard
            icon={<FaBan aria-hidden="true" />}
            title="What we don't do"
            delay={0}
          >
            No accounts, no logins, no forms. We don&rsquo;t sell your data or
            use it for advertising or profiling.
          </SummaryCard>
          <SummaryCard
            icon={<FaChartBar aria-hidden="true" />}
            title="The one thing we use"
            delay={80}
          >
            Google Analytics &mdash; and only with your consent &mdash; to see
            aggregated usage so we can improve the site.
          </SummaryCard>
          <SummaryCard
            icon={<FaSlidersH aria-hidden="true" />}
            title="You're in control"
            delay={160}
          >
            Accept or reject with equal ease, and change your mind anytime.
            <ConsentStatusChip />
          </SummaryCard>
        </div>

        {/* Plain summary — always open */}
        <div className="mt-14 space-y-10">
          <Section title="What this covers">
            <p>
              This website is informational. We do not run accounts, logins, or
              forms, and we do not collect or store your personal data on this
              site. The only non-essential technology we use is Google
              Analytics, and only with your consent.
            </p>
          </Section>

          <Section title="Your consent">
            <p>
              On your first visit you can Accept or Reject analytics with equal
              ease. Until you accept, Google Consent Mode keeps analytics
              storage off. Your choice is remembered on your device, and you
              can change or withdraw it anytime using the{" "}
              <strong>You&rsquo;re in control</strong> card above.
            </p>
          </Section>
        </div>

        {/* Progressive disclosure — the detail on demand */}
        <div className="mt-12 space-y-4">
          <Accordion
            icon={<FaChartBar aria-hidden="true" />}
            title="Cookies we use"
            defaultOpen
          >
            <CookieTable />
          </Accordion>

          <Accordion
            icon={<FaGlobeAmericas aria-hidden="true" />}
            title="Data transfer & retention"
          >
            <p>
              Google Analytics is provided by Google LLC in the United States,
              so accepting analytics transfers limited, aggregated usage data
              outside the Philippines, where it is processed under Google&rsquo;s
              terms. We keep no analytics data ourselves; Google retains it
              according to its configured retention period (2&ndash;14 months).
            </p>
          </Accordion>

          <Accordion
            icon={<FaBalanceScale aria-hidden="true" />}
            title="Your rights"
          >
            <p>
              Under the Philippine Data Privacy Act of 2012 (RA 10173) you have
              rights to be informed, to object, and to lodge a complaint with
              the National Privacy Commission (
              <a
                href="https://privacy.gov.ph"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-lys-black underline underline-offset-4 transition-colors hover:text-lys-gray-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lys-black/40"
              >
                privacy.gov.ph
              </a>
              ). EU/UK visitors have equivalent rights under the GDPR. Analytics
              data, where collected, is held by Google LLC under its own terms.
            </p>
          </Accordion>
        </div>

        {/* Contact CTA — always visible */}
        <Reveal className="mt-12 rounded-xl border border-lys-gray-medium bg-lys-gray-light/40 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <span className="mt-0.5 text-lys-black" aria-hidden="true">
              <FaEnvelope className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-noticia text-xl font-bold tracking-tight text-lys-black">
                Questions about this notice?
              </h2>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-lys-gray-dark">
                Email{" "}
                <a
                  href={`mailto:${contact.email}`}
                  className="font-medium text-lys-black underline underline-offset-4 transition-colors hover:text-lys-gray-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lys-black/40"
                >
                  {contact.email}
                </a>{" "}
                or call {contact.phoneDisplay}.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

/**
 * Titled notice section — Noticia serif heading, lys-gray hairline top rule
 * (echoing SectionTitle's bordered motif), Reveal entrance motion.
 */
function Section({ title, children }: SectionProps): React.ReactNode {
  return (
    <Reveal as="section" className="border-t border-lys-gray-medium pt-8">
      <h2 className="font-noticia text-xl font-bold tracking-tight text-lys-black">
        {title}
      </h2>
      <div className="mt-3 text-[0.95rem] leading-relaxed text-lys-gray-dark">
        {children}
      </div>
    </Reveal>
  );
}

interface SummaryCardProps {
  icon: React.ReactNode;
  title: string;
  delay?: number;
  children: React.ReactNode;
}

/**
 * At-a-glance summary card — icon, serif title, short body. Subtle hover
 * lift mirrors the practice-area cards on the live homepage.
 */
function SummaryCard({
  icon,
  title,
  delay = 0,
  children,
}: SummaryCardProps): React.ReactNode {
  return (
    <Reveal
      delay={delay}
      className="flex h-full flex-col rounded-xl border border-lys-gray-medium bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md"
    >
      <span
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-lys-black text-white"
        aria-hidden="true"
      >
        <span className="text-lg">{icon}</span>
      </span>
      <h2 className="mt-4 font-noticia text-base font-bold tracking-tight text-lys-black">
        {title}
      </h2>
      <div className="mt-2 text-sm leading-relaxed text-lys-gray-dark">
        {children}
      </div>
    </Reveal>
  );
}

interface AccordionProps {
  icon: React.ReactNode;
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

/**
 * Progressive-disclosure section built on native <details> — keyboard
 * accessible and JS-free (works in static export). Serif summary heading with
 * a chevron that rotates open.
 */
function Accordion({
  icon,
  title,
  defaultOpen = false,
  children,
}: AccordionProps): React.ReactNode {
  return (
    <details
      open={defaultOpen}
      className="group rounded-xl border border-lys-gray-medium bg-white px-5 open:pb-5 sm:px-6"
    >
      <summary className="flex cursor-pointer list-none items-center gap-3 py-5 font-noticia text-xl font-bold tracking-tight text-lys-black marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lys-black/40 [&::-webkit-details-marker]:hidden">
        <span className="text-lys-black" aria-hidden="true">
          {icon}
        </span>
        <span className="flex-1">{title}</span>
        <FaChevronDown
          className="h-4 w-4 shrink-0 text-lys-gray-dark transition-transform duration-300 group-open:rotate-180 motion-reduce:transition-none"
          aria-hidden="true"
        />
      </summary>
      <div className="text-[0.95rem] leading-relaxed text-lys-gray-dark">
        {children}
      </div>
    </details>
  );
}

/**
 * Named cookie inventory. Responsive: table on sm+, stacked cards on mobile.
 */
function CookieTable(): React.ReactNode {
  return (
    <>
      {/* Mobile: stacked cards */}
      <ul className="space-y-4 sm:hidden">
        {COOKIE_ROWS.map((row) => (
          <li
            key={row.name}
            className="rounded-lg border border-lys-gray-medium p-4"
          >
            <div className="flex items-center justify-between gap-2">
              <code className="rounded bg-lys-gray-light/60 px-1.5 py-0.5 text-[0.85em] font-semibold text-lys-black">
                {row.name}
              </code>
              <CategoryBadge category={row.category} />
            </div>
            <p className="mt-2">{row.purpose}</p>
            <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs text-lys-gray-dark">
              <dt className="font-semibold">Provider</dt>
              <dd>{row.provider}</dd>
              <dt className="font-semibold">Expiry</dt>
              <dd>{row.expiry}</dd>
            </dl>
          </li>
        ))}
      </ul>

      {/* Desktop: table */}
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-lys-gray-medium text-xs uppercase tracking-wide text-lys-gray-dark">
              <th scope="col" className="py-2 pr-4 font-semibold">
                Cookie
              </th>
              <th scope="col" className="py-2 pr-4 font-semibold">
                Purpose
              </th>
              <th scope="col" className="py-2 pr-4 font-semibold">
                Provider
              </th>
              <th scope="col" className="py-2 font-semibold">
                Expiry
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-lys-gray-medium/60">
            {COOKIE_ROWS.map((row) => (
              <tr key={row.name} className="align-top">
                <td className="py-3 pr-4">
                  <code className="rounded bg-lys-gray-light/60 px-1.5 py-0.5 text-[0.85em] font-semibold text-lys-black">
                    {row.name}
                  </code>
                  <span className="mt-1.5 block">
                    <CategoryBadge category={row.category} />
                  </span>
                </td>
                <td className="py-3 pr-4 text-lys-gray-dark">{row.purpose}</td>
                <td className="py-3 pr-4 text-lys-gray-dark">{row.provider}</td>
                <td className="py-3 text-lys-gray-dark">{row.expiry}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/** Small category pill — necessary vs analytics. */
function CategoryBadge({
  category,
}: {
  category: "Necessary" | "Analytics";
}): React.ReactNode {
  const isNecessary = category === "Necessary";
  return (
    <span
      className={`inline-block rounded-full border px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider ${
        isNecessary
          ? "border-lys-gray-medium text-lys-gray-dark"
          : "border-emerald-500/40 text-emerald-700"
      }`}
    >
      {category}
    </span>
  );
}
