"use client";

import { FC } from "react";

import { OPEN_SETTINGS_EVENT } from "@/app/lib/cookie-consent";

/**
 * Reopens the cookie preferences modal from anywhere (privacy notice,
 * footer). Lets visitors withdraw or change consent as easily as they
 * gave it — RA 10173 / GDPR requirement.
 *
 * Dispatches the event that CookieConsent listens for.
 *
 * @component
 * @returns {React.ReactNode} An inline text button.
 */
const CookieSettingsButton: FC = () => {
  // Consent UI is dev-only by client request; in production there is no
  // banner to reopen, so this control is omitted (no hooks above — safe).
  if (process.env.NODE_ENV === "production") return null;

  const open = () => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));

  return (
    <button
      type="button"
      onClick={open}
      className="font-semibold text-lys-black underline underline-offset-2 transition-colors hover:text-lys-gray-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lys-black/40"
    >
      manage your cookie settings
    </button>
  );
};

export default CookieSettingsButton;
