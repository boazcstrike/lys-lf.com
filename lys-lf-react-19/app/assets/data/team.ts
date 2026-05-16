import type { TeamRole } from "@/app/types"

const LIM_BIO =
  "Atty. Lim is a Managing/Founding Partner and serving leader of the firm since its establishment in 2015. Before co-founding the firm, he practiced as a senior lawyer with other law officers and later took on leadership at Lim and Yutatco-Sze Law Firm. He has acted as legal counsel in high-profile matters. As managing partner, he oversees the firm's operations and legal strategy, and is involved in recruiting and mentoring associate lawyers. He is the lead partner in all the litigation practice of the firm, and integrates legal expertise with his engineering knowledge, beneficial in construction, infrastructure, and technical disputes."

const SZE_BIO =
  "Atty. Sze is a founding partner and key figure in the firm's financial and administrative matters. Prior to co-founding Lim and Yutatco-Sze law Firm, she worked in various legal and compliance roles, including positions in private law offices and the legal/compliance team of corporate organizations. Atty. Sze has taught at the collegiate level and served in leadership roles within the Integrated Bar of the Philippines, giving her engagement beyond private practice into professional legal community service. At the firm, she is involved in guiding legal and administrative strategy, particularly in areas where legal and financial issues intersect."

export const partners: TeamRole = {
  position: "Partners",
  employees: [
    {
      key: "Atty. Gloriosa Yutatco-Sze",
      name: "Atty. Gloriosa Yutatco-Sze",
      img: "/images/optimized/LYS-GLO-7-18-23.webp",
      bio: SZE_BIO,
    },
    {
      key: "Atty. Juanito R. Lim, Jr.",
      name: "Atty. Juanito R. Lim, Jr.",
      img: "/images/optimized/LYS-JUN-7-18-23.webp",
      bio: LIM_BIO,
    },
  ],
}

export const seniorAssociates: TeamRole = {
  position: "Senior Associate Lawyer",
  employees: [
    {
      key: "Atty. Albert Caesar M. Pereña",
      name: "Atty. Albert Caesar M. Pereña",
    },
  ],
}

export const juniorAssociates: TeamRole = {
  position: "Junior Associate Lawyers",
  employees: [
    {
      key: "Atty. Dana F. Ruedas",
      name: "Atty. Dana F. Ruedas",
    },
    {
      key: "Atty. Jan Ethan L. Gordola",
      name: "Atty. Jan Ethan L. Gordola",
    },
    {
      key: "Atty. Hannah Mikaella C. Yamit",
      name: "Atty. Hannah Mikaella C. Yamit",
    },
  ],
}

export const teamRoles: TeamRole[] = [
  partners,
  seniorAssociates,
  juniorAssociates,
]

export default teamRoles
