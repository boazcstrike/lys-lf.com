/**
 * Cookie consent core: types, storage, and Google Consent Mode v2 helpers.
 *
 * Compliance basis:
 * - PH Data Privacy Act of 2012 (RA 10173) + NPC guidance — informed, freely
 *   given, specific consent for non-essential processing.
 * - GDPR / ePrivacy + EDPB guidance — prior opt-in for non-essential cookies,
 *   reject as easy as accept, withdrawable at any time.
 *
 * Strictly necessary cookies need no consent. Analytics (Google Analytics) is
 * non-essential and is denied until the visitor explicitly accepts.
 */

/**
 * Bump when categories or policy change so prior consent is re-requested.
 */
export const CONSENT_VERSION = 1 as const;

/**
 * localStorage key holding the visitor's stored consent decision.
 * Static export (no server) → client-side persistence only.
 */
export const CONSENT_STORAGE_KEY = "lys-cookie-consent" as const;

/**
 * Custom event dispatched when consent changes, so listeners (e.g. a footer
 * "Cookie settings" link or the banner itself) can react without a reload.
 */
export const CONSENT_CHANGE_EVENT = "lys:cookie-consent-change" as const;

/**
 * Event any UI can dispatch to reopen the preferences modal so visitors can
 * withdraw/change consent at any time — RA 10173 / GDPR requirement.
 *
 * Usage: `window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))`
 */
export const OPEN_SETTINGS_EVENT = "lys:open-cookie-settings" as const;

/**
 * Consent categories surfaced in the preferences modal.
 * `necessary` is always granted and cannot be toggled off.
 */
export interface ConsentCategories {
  /** Strictly necessary — always true, no opt-out (security, layout, consent itself). */
  necessary: true;
  /** Analytics (Google Analytics). Default false until explicit opt-in. */
  analytics: boolean;
}

/**
 * Persisted consent record.
 */
export interface ConsentRecord {
  version: number;
  categories: ConsentCategories;
  /** ISO-8601 timestamp of the decision (audit trail for accountability). */
  timestamp: string;
}

/**
 * Default state before any decision: only strictly necessary is on.
 */
export const DEFAULT_CATEGORIES: ConsentCategories = {
  necessary: true,
  analytics: false,
};

/**
 * Read the stored consent record.
 *
 * @returns The valid current-version record, or null if absent, malformed,
 *          or from an older version (which forces re-consent).
 */
export function readConsent(): ConsentRecord | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<ConsentRecord>;
    if (
      !parsed ||
      parsed.version !== CONSENT_VERSION ||
      typeof parsed.categories?.analytics !== "boolean"
    ) {
      return null;
    }

    return {
      version: CONSENT_VERSION,
      categories: {
        necessary: true,
        analytics: parsed.categories.analytics,
      },
      timestamp:
        typeof parsed.timestamp === "string"
          ? parsed.timestamp
          : new Date().toISOString(),
    };
  } catch {
    // Corrupt/blocked storage → treat as no decision (re-prompt). Never throw.
    return null;
  }
}

/**
 * Persist a consent decision, apply it to Google Consent Mode, and notify
 * listeners via {@link CONSENT_CHANGE_EVENT}.
 *
 * @param analytics - Whether the visitor consents to analytics cookies.
 * @returns The stored record.
 */
export function writeConsent(analytics: boolean): ConsentRecord {
  const record: ConsentRecord = {
    version: CONSENT_VERSION,
    categories: { necessary: true, analytics },
    timestamp: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(
        CONSENT_STORAGE_KEY,
        JSON.stringify(record),
      );
    } catch {
      // Storage blocked (private mode / quota). Consent Mode update below
      // still applies for this session; choice just won't persist.
    }

    applyConsentMode(analytics);
    window.dispatchEvent(
      new CustomEvent<ConsentRecord>(CONSENT_CHANGE_EVENT, {
        detail: record,
      }),
    );
  }

  return record;
}

type GtagConsentValue = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Push a Consent Mode v2 `update` so Google Analytics enables/disables
 * cookie storage without a page reload.
 *
 * Defaults are set to "denied" by the inline script in the document head
 * (see ConsentModeInit) *before* GA loads, so GA runs cookieless until
 * this grant.
 *
 * @param analytics - Whether analytics storage is granted.
 */
export function applyConsentMode(analytics: boolean): void {
  if (typeof window === "undefined") return;

  const value: GtagConsentValue = analytics ? "granted" : "denied";

  // gtag may not exist yet if GA env id is unset; the dataLayer queue still
  // records the update so it applies if/when GA initializes.
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: value,
    });
  } else {
    window.dataLayer.push([
      "consent",
      "update",
      { analytics_storage: value },
    ]);
  }
}
