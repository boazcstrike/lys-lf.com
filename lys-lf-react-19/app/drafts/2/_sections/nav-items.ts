/**
 * Primary navigation — single source of truth for draft 2's desktop nav
 * (Hero) and mobile disclosure (MobileNav). Hrefs are in-page anchors matching
 * the section ids rendered by draft 2's sections.
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
