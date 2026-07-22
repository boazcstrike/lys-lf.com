/**
 * Primary navigation for draft 6 — single source of truth for FloatingNav
 * (scroll-spy rail) and MobileNav. Items carry a section `id`; hrefs are built
 * as `#${id}` at each call site. Ids match the section ids in _sections/*.
 */

export interface NavItem {
  id: string
  label: string
}

export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "practice-areas", label: "Practice" },
  { id: "about", label: "About" },
  { id: "team", label: "Team" },
  { id: "contact", label: "Contact" },
]
