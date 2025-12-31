import type { SiteConfig, HeaderConfig } from "@/app/types"

export const siteConfig: SiteConfig = {
  firmName: "Lim & Yutatco-Sze Law Firm",
  firmShortName: "LYS",
  establishedYear: 2015,
  
  contact: {
    phone: "(02) 8-293-8254",
    phoneDisplay: "(02) 8-293-8254",
    email: "limandsze.lf@gmail.com",
  },
  
  location: {
    address: {
      line1: "Unit 901 Parkway Corporate Center",
      line2: "Corporate Ave. corner Parkway Place",
      line3: "Filinvest City, Alabang",
      city: "Muntinlupa City",
      postalCode: "1781",
    },
    coordinates: {
      lat: 14.4152799,
      lng: 121.0380395,
    },
    markerTitle: "Parkway Corporate Center",
  },
  
  officeHours: {
    days: "Monday–Friday",
    hours: "8am - 5pm",
  },
  
  socialLinks: {
    facebook: "https://www.facebook.com/nichole.salvana",
  },
  
  googleAnalyticsId: undefined,
}

export const headerConfig: HeaderConfig = {
  backgroundImages: [
    "/images/optimized/LYS-29.webp",
    "/images/optimized/LYS-24.webp",
  ],
  tagline: `The ${siteConfig.firmName} (${siteConfig.firmShortName}) is a full-service law office established in ${siteConfig.establishedYear}.`,
  description: "It is engaged in diversified practice of law primarily focusing in corporate, labor and tax laws. The Firm likewise represents both corporate and individual clients in different courts and administrative agencies in the country.",
}

export default siteConfig
