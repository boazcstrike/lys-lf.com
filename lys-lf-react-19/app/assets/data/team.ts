import type { TeamRole } from "@/app/types"

export const partners: TeamRole = {
  position: "Partners",
  employees: [
    {
      key: "Atty. Gloriosa Yutatco-Sze",
      name: "Atty. Gloriosa Yutatco-Sze",
      img: "/images/optimized/LYS-GLO-7-18-23.webp",
    },
    {
      key: "Atty. Juanito R. Lim, Jr.",
      name: "Atty. Juanito R. Lim, Jr.",
      img: "/images/optimized/LYS-JUN-7-18-23.webp",
    },
  ],
}

export const associates: TeamRole = {
  position: "Associate Lawyers",
  employees: [
    {
      key: "Atty. Albert Caesar M. Pereña",
      name: "Atty. Albert Caesar M. Pereña",
    },
    {
      key: "Atty. Dana F. Ruedas",
      name: "Atty. Dana F. Ruedas",
    },
    {
      key: "Atty. Jan Ethan L. Gordola",
      name: "Atty. Jan Ethan L. Gordola",
    },
  ],
}

export const teamRoles: TeamRole[] = [partners, associates]

export default teamRoles
