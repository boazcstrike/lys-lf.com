import { FC } from "react";

import {
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
} from "@/app/lib/cookie-consent";

/**
 * Google Consent Mode v2 bootstrap.
 *
 * Renders an inline script that MUST execute in <head> before Google
 * Analytics loads. It:
 *  1. Defines the `gtag` stub + `dataLayer`.
 *  2. Sets all consent signals to "denied" by default (GDPR/ePrivacy +
 *     PH RA 10173 — no non-essential storage before consent).
 *  3. Re-reads any stored decision and, for a returning visitor who already
 *     accepted analytics, upgrades `analytics_storage` to "granted"
 *     immediately — avoiding a denied→granted flicker on every page load.
 *
 * `functionality_storage` / `security_storage` stay granted: they cover
 * strictly necessary operation, which needs no consent.
 *
 * @component
 * @returns {React.ReactNode} An inline head script element.
 */
const ConsentModeInit: FC = () => {
  const script = `
(function(){
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  gtag('consent','default',{
    ad_storage:'denied',
    ad_user_data:'denied',
    ad_personalization:'denied',
    analytics_storage:'denied',
    functionality_storage:'granted',
    security_storage:'granted'
  });
  try {
    var raw = window.localStorage.getItem(${JSON.stringify(CONSENT_STORAGE_KEY)});
    if (raw) {
      var saved = JSON.parse(raw);
      if (saved && saved.version === ${CONSENT_VERSION} &&
          saved.categories && saved.categories.analytics === true) {
        gtag('consent','update',{ analytics_storage:'granted' });
      }
    }
  } catch (e) { /* blocked/corrupt storage → stay denied */ }
})();`;

  return (
    <script
      id="consent-mode-init"
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
};

export default ConsentModeInit;
