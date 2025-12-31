export interface Employee {
  key: string
  name: string
  img?: string
  position?: string
  mobile?: string
  email?: string
}

export interface TeamRole {
  position: string
  employees: Employee[]
}

export interface PracticeArea {
  icon: string
  title: string
  description: string
}

export interface Address {
  line1: string
  line2: string
  line3: string
  city: string
  postalCode: string
}

export interface ContactInfo {
  phone: string
  phoneDisplay: string
  email: string
}

export interface OfficeHours {
  days: string
  hours: string
}

export interface MapCoordinates {
  lat: number
  lng: number
}

export interface LocationConfig {
  address: Address
  coordinates: MapCoordinates
  markerTitle: string
}

export interface SiteConfig {
  firmName: string
  firmShortName: string
  establishedYear: number
  contact: ContactInfo
  location: LocationConfig
  officeHours: OfficeHours
  socialLinks: {
    facebook?: string
  }
  googleAnalyticsId?: string
}

export interface BusinessProfileContent {
  title: string
  paragraphs: string[]
}

export interface HeaderConfig {
  backgroundImages: string[]
  tagline: string
  description: string
}
