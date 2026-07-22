/**
 * Primary navigation — single source of truth for draft 1's desktop nav
 * (Hero SiteHeader) and mobile disclosure (MobileNav), so the two never drift.
 * Hrefs are in-page anchors matching the section ids rendered by _sections/*.
 */

export interface NavItem {
  label: string
  href: string
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Practice Areas", href: "#practice-areas" },
  { label: "About", href: "#about" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
]
