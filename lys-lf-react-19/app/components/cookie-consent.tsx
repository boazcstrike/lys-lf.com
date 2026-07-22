"use client";

import React, {
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  readConsent,
  writeConsent,
  DEFAULT_CATEGORIES,
  OPEN_SETTINGS_EVENT,
  type ConsentCategories,
} from "@/app/lib/cookie-consent";

const POLICY_HREF = "/privacy";

type View = "hidden" | "banner" | "preferences";

/** Tab-focusable elements inside the consent panel. */
const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),[tabindex]:not([tabindex="-1"])';

/**
 * Cookie consent banner + granular preferences modal.
 *
 * Compliance design (EDPB / PH NPC):
 * - Shown only until a decision is recorded; non-essential cookies stay
 *   denied until then (Consent Mode defaults set in <head>).
 * - "Accept All" and "Reject All" have equal visual prominence — no dark
 *   patterns, reject is not buried or muted.
 * - "Preferences" exposes per-category toggles; necessary is locked on.
 * - Choice is withdrawable later via OPEN_SETTINGS_EVENT.
 *
 * Accessibility: role="dialog" on the visible panel, focus moved into the
 * panel on open, Tab focus trapped within it, Escape returns from
 * preferences to the banner. The banner itself is not Escape-dismissible —
 * a consent decision must be made explicitly.
 *
 * Design: "Trust & Authority + Minimal" — restrained dark panel, raleway
 * eyebrow, hairline border, motion-safe entrance. LYS palette.
 *
 * @component
 * @returns {React.ReactNode} The consent UI, or null once a choice exists.
 */
const CookieConsent: FC = () => {
  const [view, setView] = useState<View>("hidden");
  const [draft, setDraft] = useState<ConsentCategories>(DEFAULT_CATEGORIES);
  // Drives the motion-safe slide/fade in. False on first paint → animates.
  const [entered, setEntered] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Decide initial visibility after mount (localStorage is client-only and
  // the site is statically exported — never gate render on SSR).
  useEffect(() => {
    if (!readConsent()) setView("banner");
  }, []);

  // Allow other components to reopen the preferences modal.
  useEffect(() => {
    const open = () => {
      const stored = readConsent();
      setDraft(stored?.categories ?? DEFAULT_CATEGORIES);
      setView("preferences");
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, open);
  }, []);

  // Trigger the entrance transition once the panel is in the DOM.
  useEffect(() => {
    if (view === "hidden") {
      setEntered(false);
      return;
    }
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, [view]);

  // Move focus into the panel when it opens so keyboard/SR users land on it.
  useEffect(() => {
    if (view === "hidden") return;
    const id = requestAnimationFrame(() => panelRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [view]);

  const persist = useCallback((analytics: boolean) => {
    writeConsent(analytics);
    setView("hidden");
  }, []);

  const acceptAll = useCallback(() => persist(true), [persist]);
  const rejectAll = useCallback(() => persist(false), [persist]);
  const savePreferences = useCallback(
    () => persist(draft.analytics),
    [persist, draft.analytics],
  );

  const openPreferences = useCallback(() => {
    const stored = readConsent();
    setDraft(stored?.categories ?? DEFAULT_CATEGORIES);
    setView("preferences");
  }, []);

  // Escape (preferences → banner only) + Tab focus trap within the panel.
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape" && view === "preferences") {
        e.stopPropagation();
        setView("banner");
        return;
      }
      if (e.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const nodes = panel.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (!first || !last) return;
      const active = document.activeElement;

      if (e.shiftKey && (active === first || active === panel)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [view],
  );

  if (view === "hidden") return null;

  const isModal = view === "preferences";

  return (
    <div className="fixed inset-x-0 bottom-0 z-[1000] font-opensans">
      {isModal && (
        <div
          className={`fixed inset-0 bg-lys-black/60 transition-opacity duration-300 motion-reduce:transition-none ${
            entered ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
          onClick={() => setView("banner")}
        />
      )}

      <div
        ref={panelRef}
        role="dialog"
        aria-modal={isModal || undefined}
        aria-label="Cookie consent"
        tabIndex={-1}
        onKeyDown={onKeyDown}
        className={`relative mx-auto m-3 sm:m-5 max-w-2xl rounded-xl border border-white/10 bg-lys-black text-lys-gray-light shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] outline-none transition-all duration-300 ease-out motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-white/40 ${
          entered
            ? "translate-y-0 opacity-100"
            : "translate-y-3 opacity-0"
        }`}
      >
        <div className="p-6 sm:p-8">
          {view === "banner" ? (
            <BannerBody />
          ) : (
            <PreferencesBody draft={draft} setDraft={setDraft} />
          )}

          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-end">
            {view === "banner" ? (
              <>
                <ConsentButton variant="ghost" onClick={openPreferences}>
                  Preferences
                </ConsentButton>
                <ConsentButton variant="outline" onClick={rejectAll}>
                  Reject All
                </ConsentButton>
                <ConsentButton variant="solid" onClick={acceptAll}>
                  Accept All
                </ConsentButton>
              </>
            ) : (
              <>
                <ConsentButton variant="outline" onClick={rejectAll}>
                  Reject All
                </ConsentButton>
                <ConsentButton variant="ghost" onClick={savePreferences}>
                  Save Preferences
                </ConsentButton>
                <ConsentButton variant="solid" onClick={acceptAll}>
                  Accept All
                </ConsentButton>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Banner explanatory copy.
 */
const BannerBody: FC = () => (
  <>
    <p className="font-raleway text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-lys-gray">
      Privacy
    </p>
    <h2 className="mt-2 font-noticia text-xl font-bold tracking-tight text-white">
      We value your privacy
    </h2>
    <p className="mt-3 text-sm leading-relaxed text-lys-gray-light/85">
      We use strictly necessary cookies to make this site work, and Google
      Analytics &mdash; only with your consent &mdash; to understand usage
      and improve the site. Analytics stays off until you allow it, and you
      can change your choice anytime. See our{" "}
      <a
        href={POLICY_HREF}
        className="font-semibold text-white underline underline-offset-4 transition-colors hover:text-lys-gray focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        Cookies &amp; Analytics Notice
      </a>
      .
    </p>
  </>
);

interface PreferencesBodyProps {
  draft: ConsentCategories;
  setDraft: React.Dispatch<React.SetStateAction<ConsentCategories>>;
}

/**
 * Granular per-category preferences.
 */
const PreferencesBody: FC<PreferencesBodyProps> = ({ draft, setDraft }) => (
  <>
    <p className="font-raleway text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-lys-gray">
      Privacy
    </p>
    <h2 className="mt-2 font-noticia text-xl font-bold tracking-tight text-white">
      Cookie preferences
    </h2>
    <p className="mt-3 text-sm leading-relaxed text-lys-gray-light/85">
      Choose what we may use. Strictly necessary cookies cannot be switched
      off. Details in the{" "}
      <a
        href={POLICY_HREF}
        className="font-semibold text-white underline underline-offset-4 transition-colors hover:text-lys-gray focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        Cookies &amp; Analytics Notice
      </a>
      .
    </p>

    <div className="mt-5 divide-y divide-white/10 border-y border-white/10">
      <CategoryRow
        title="Strictly necessary"
        description="Keeps the site secure and remembers your cookie choice (stored in your browser, not a tracking cookie). Always active."
        checked
        locked
      />
      <CategoryRow
        title="Analytics"
        description="Google Analytics — aggregated usage statistics to help us improve the site. No advertising or profiling."
        checked={draft.analytics}
        onChange={(v) =>
          setDraft((prev) => ({ ...prev, analytics: v }))
        }
      />
    </div>
  </>
);

interface CategoryRowProps {
  title: string;
  description: string;
  checked: boolean;
  locked?: boolean;
  onChange?: (value: boolean) => void;
}

/**
 * One toggleable consent category row.
 */
const CategoryRow: FC<CategoryRowProps> = ({
  title,
  description,
  checked,
  locked = false,
  onChange,
}) => (
  <label
    className={`flex items-start gap-4 py-4 ${
      locked ? "cursor-default" : "cursor-pointer"
    }`}
  >
    <input
      type="checkbox"
      checked={checked}
      disabled={locked}
      onChange={(e) => onChange?.(e.target.checked)}
      className="mt-0.5 h-4 w-4 shrink-0 accent-lys-gray-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 disabled:opacity-50"
    />
    <span>
      <span className="flex items-center gap-2 text-sm font-semibold text-white">
        {title}
        {locked && (
          <span className="rounded-full border border-white/15 px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wider text-lys-gray">
            Always on
          </span>
        )}
      </span>
      <span className="mt-1 block text-xs leading-relaxed text-lys-gray-light/70">
        {description}
      </span>
    </span>
  </label>
);

type ButtonVariant = "solid" | "outline" | "ghost";

interface ConsentButtonProps {
  variant: ButtonVariant;
  onClick: () => void;
  children: React.ReactNode;
}

/**
 * Consent action button. `solid` and `outline` carry equal visual weight so
 * Accept and Reject are equally prominent (EDPB anti-dark-pattern guidance).
 */
const ConsentButton: FC<ConsentButtonProps> = ({
  variant,
  onClick,
  children,
}) => {
  const base =
    "rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors duration-200 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-lys-black focus-visible:ring-white/70";
  const styles: Record<ButtonVariant, string> = {
    solid: "bg-lys-gray-light text-lys-black hover:bg-white",
    outline:
      "border border-lys-gray-light/70 text-lys-gray-light hover:border-lys-gray-light hover:bg-white/10",
    ghost:
      "text-lys-gray-light underline underline-offset-4 hover:text-white",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${styles[variant]}`}
    >
      {children}
    </button>
  );
};

export default CookieConsent;
