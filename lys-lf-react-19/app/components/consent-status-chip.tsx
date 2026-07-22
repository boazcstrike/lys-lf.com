"use client";

import React, { FC, useEffect, useState } from "react";
import { FaCheckCircle, FaRegCircle, FaBan } from "react-icons/fa";

import {
  readConsent,
  OPEN_SETTINGS_EVENT,
  CONSENT_CHANGE_EVENT,
} from "@/app/lib/cookie-consent";

type Status = "loading" | "unset" | "on" | "off";

/**
 * Live cookie-consent status chip for the privacy notice.
 *
 * Reads the visitor's stored decision on mount, reflects it, and updates in
 * real time when they change it via the consent modal (CONSENT_CHANGE_EVENT).
 * The button reopens that modal (OPEN_SETTINGS_EVENT) so a choice can be
 * withdrawn as easily as it was given — RA 10173 / GDPR requirement.
 *
 * Self-contained (does not depend on cookie-settings-button) so it works in
 * every environment where the consent modal renders.
 */
const ConsentStatusChip: FC = () => {
  // Start "loading" so SSR/static markup matches first client paint (no
  // localStorage on the server), then resolve after mount.
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const sync = () => {
      const record = readConsent();
      if (!record) return setStatus("unset");
      setStatus(record.categories.analytics ? "on" : "off");
    };

    sync();
    window.addEventListener(CONSENT_CHANGE_EVENT, sync);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, sync);
  }, []);

  const openSettings = () =>
    window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));

  const meta: Record<Status, { label: string; icon: React.ReactNode; tone: string }> = {
    loading: {
      label: "Checking…",
      icon: <FaRegCircle aria-hidden="true" />,
      tone: "text-lys-gray-dark",
    },
    unset: {
      label: "Not set yet",
      icon: <FaRegCircle aria-hidden="true" />,
      tone: "text-lys-gray-dark",
    },
    on: {
      label: "Analytics on",
      icon: <FaCheckCircle aria-hidden="true" />,
      tone: "text-emerald-600",
    },
    off: {
      label: "Analytics off",
      icon: <FaBan aria-hidden="true" />,
      tone: "text-lys-black",
    },
  };

  const { label, icon, tone } = meta[status];

  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border border-lys-gray-medium bg-white px-3 py-1 text-xs font-semibold ${tone}`}
      >
        {icon}
        <span aria-live="polite">{label}</span>
      </span>
      <button
        type="button"
        onClick={openSettings}
        className="text-xs font-semibold text-lys-black underline underline-offset-4 transition-colors hover:text-lys-gray-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lys-black/40"
      >
        Change your choice
      </button>
    </div>
  );
};

export default ConsentStatusChip;
