# SEO Upgrade Plan for lys-lf.com

> Generated: January 15, 2026  
> Status: Planning Phase

---

## Current State Summary

The site has a **solid SEO foundation** with proper Next.js metadata API usage, Open Graph, Twitter Cards, and LegalService JSON-LD schema. The following opportunities exist to boost local search visibility and rich snippet eligibility.

### What's Working Well

| Component | Status | Notes |
|-----------|--------|-------|
| Metadata API | ✅ | Title template, description, keywords |
| Open Graph | ✅ | 1200x630 image, locale en_PH |
| Twitter Cards | ✅ | summary_large_image |
| Canonical URL | ✅ | metadataBase configured |
| LegalService Schema | ✅ | Address, geo, hours, services |
| Geo Meta Tags | ✅ | geo.region, geo.position, ICBM |
| WebP Images | ✅ | All images have optimized versions |
| robots.txt | ✅ | Allows all, references sitemap |
| sitemap.xml | ✅ | Single page listed |
| Google Analytics | ✅ | Conditional loading ready |

---

## Priority 1: High Impact, Quick Wins

### 1.1 Expand Structured Data (JSON-LD)

**Current:** Only LegalService schema  
**Add:** Organization, WebSite, and optionally FAQPage schemas

```typescript
// Add to layout.tsx alongside existing structuredData

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://lys-lf.com/#organization",
  name: siteConfig.firmName,
  url: "https://lys-lf.com",
  logo: "https://lys-lf.com/images/optimized/lys-logo.webp",
  sameAs: [
    siteConfig.socialLinks.facebook,
    // Add LinkedIn, etc. when available
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    contactType: "customer service",
    areaServed: "PH",
    availableLanguage: ["en", "fil"],
  },
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://lys-lf.com/#website",
  url: "https://lys-lf.com",
  name: siteConfig.firmName,
  description: "Full-service law office in Muntinlupa City, Philippines",
  publisher: { "@id": "https://lys-lf.com/#organization" },
  inLanguage: "en-PH",
};
```

**Impact:** High - Improves entity clarity for Google  
**Effort:** 1-2 hours

### 1.2 Google Search Console Verification

**Current:** Not configured  
**Add:** Verification meta tag in metadata export

```typescript
// In layout.tsx metadata export
verification: {
  google: 'YOUR_VERIFICATION_CODE_HERE',
},
```

**Impact:** High - Required for indexing insights and submission  
**Effort:** 5 minutes (once you have the code from GSC)

### 1.3 Update Sitemap lastmod

**Current:** Static date `2025-01-01`  
**Change:** Update to actual deployment date or automate

```xml
<lastmod>2026-01-15</lastmod>
```

Or create dynamic sitemap at build time:

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://lys-lf.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
```

**Impact:** High - Fresh content signal to crawlers  
**Effort:** 10 minutes (manual) or 30 minutes (dynamic)

---

## Priority 2: Medium Impact Improvements

### 2.1 Add Web App Manifest

**Current:** Not present  
**Create:** `public/site.webmanifest`

```json
{
  "name": "Lim & Yutatco-Sze Law Firm",
  "short_name": "LYS Law",
  "description": "Full-service law office in Muntinlupa City, Philippines",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#1a1a1a",
  "icons": [
    {
      "src": "/images/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/images/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

**Impact:** Medium - PWA capability, mobile "Add to Home"  
**Effort:** 30 minutes

### 2.2 Add Complete Favicon Set

**Current:** Only `favicon.ico`  
**Add:**

| File | Size | Purpose |
|------|------|---------|
| `apple-touch-icon.png` | 180x180 | iOS home screen |
| `favicon-32x32.png` | 32x32 | Browser tabs |
| `favicon-16x16.png` | 16x16 | Browser tabs (small) |
| `icon-192.png` | 192x192 | Android/PWA |
| `icon-512.png` | 512x512 | PWA splash |

Update metadata:

```typescript
icons: {
  icon: [
    { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
  ],
  apple: '/apple-touch-icon.png',
},
manifest: '/site.webmanifest',
```

**Impact:** Medium - Brand consistency across platforms  
**Effort:** 30-60 minutes (need to generate icons from logo)

### 2.3 Add Theme Color Meta Tag

**Current:** Not set  
**Add:**

```typescript
// In layout.tsx metadata
themeColor: [
  { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
],
```

**Impact:** Medium - Mobile browser chrome styling  
**Effort:** 5 minutes

### 2.4 Add Preconnect Hints

**Current:** Not present  
**Add:** In layout.tsx head

```tsx
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
  {/* If using Google Maps */}
  <link rel="preconnect" href="https://maps.googleapis.com" />
</head>
```

**Impact:** Medium - Improves Core Web Vitals (LCP)  
**Effort:** 10 minutes

---

## Priority 3: Nice-to-Have Enhancements

### 3.1 Add FAQPage Schema

**Requires:** Adding visible FAQ section to the page first

```typescript
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What areas of law does LYS Law Firm specialize in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LYS Law Firm specializes in corporate law, labor and employment law, and tax law. We represent both corporate and individual clients.",
      },
    },
    {
      "@type": "Question",
      name: "Where is LYS Law Firm located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our office is located at Unit 901 Parkway Corporate Center, Filinvest City, Alabang, Muntinlupa City 1781, Philippines.",
      },
    },
    // Add 3-5 more FAQs
  ],
};
```

**Impact:** Medium - Can show FAQ rich snippets in SERP  
**Effort:** 2-4 hours (content creation + implementation)

### 3.2 Add Service Schemas Per Practice Area

```typescript
const servicesSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Corporate Legal Services",
    provider: { "@id": "https://lys-lf.com/#organization" },
    areaServed: {
      "@type": "City",
      name: "Muntinlupa City",
    },
    description: "Corporate law services including incorporation, contracts, and compliance.",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Labor and Employment Law",
    provider: { "@id": "https://lys-lf.com/#organization" },
    areaServed: {
      "@type": "Country",
      name: "Philippines",
    },
    description: "Labor law services including NLRC representation and HR compliance.",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Tax Law Services",
    provider: { "@id": "https://lys-lf.com/#organization" },
    areaServed: {
      "@type": "Country",
      name: "Philippines",
    },
    description: "Tax advisory, BIR dispute resolution, and compliance services.",
  },
];
```

**Impact:** Medium - Better query matching for practice areas  
**Effort:** 1 hour

### 3.3 Update robots.txt with AI Crawler Rules

```txt
User-agent: *
Allow: /

# AI Crawlers (optional - based on preference)
User-agent: GPTBot
User-agent: CCBot
User-agent: Google-Extended
Disallow: /

Sitemap: https://lys-lf.com/sitemap.xml
```

**Impact:** Low - Future-proofing, content control  
**Effort:** 5 minutes

---

## Strategic Recommendations (Non-Technical)

### Google Business Profile (HIGHEST Local Impact)

1. **Claim and verify** GBP listing for the Alabang/Muntinlupa office
2. **Ensure NAP consistency** - Name, Address, Phone must match exactly:
   - Website footer
   - JSON-LD schema
   - GBP listing
   - Facebook page
3. **Optimize GBP listing:**
   - Primary category: "Law firm" or "Corporate lawyer"
   - Add all services (Corporate, Labor, Tax)
   - Upload office photos (exterior, interior, team)
   - Add business hours
   - Post updates 1-2x per month
   - Respond to reviews promptly

### Consider Multi-Page Structure (Future)

For better ranking on specific queries like "corporate lawyer muntinlupa":

```
/                    → Home (overview)
/corporate-law/      → Corporate law services
/labor-law/          → Labor and employment
/tax-law/            → Tax services
/team/               → Attorney profiles
/contact/            → Contact details + map
```

This is compatible with static export and would significantly improve SEO for practice-specific queries.

### Local Content Enhancement

Add service area mentions throughout content:
- "Serving Alabang, Muntinlupa, Las Piñas, Parañaque, and Metro Manila"
- Include local landmarks near office
- Add parking/transit directions

---

## Implementation Checklist

### Phase 1: Quick Wins (1-2 hours)

- [ ] Update sitemap.xml lastmod to current date
- [ ] Add Google Search Console verification meta tag
- [ ] Add theme-color meta tag
- [ ] Add preconnect hints for fonts

### Phase 2: Schema Expansion (2-3 hours)

- [ ] Add Organization schema
- [ ] Add WebSite schema
- [ ] Update layout.tsx to include all schemas

### Phase 3: Assets & PWA (1-2 hours)

- [ ] Generate favicon set from logo
- [ ] Create site.webmanifest
- [ ] Update metadata icons configuration
- [ ] Place all icon files in public/

### Phase 4: Content Enhancement (4-8 hours)

- [ ] Add FAQ section to page
- [ ] Implement FAQPage schema
- [ ] Add Service schemas per practice area
- [ ] Update robots.txt with AI crawler rules

### Phase 5: Strategic (Ongoing)

- [ ] Claim Google Business Profile
- [ ] Ensure NAP consistency across all platforms
- [ ] Consider multi-page structure for practice areas

---

## Resources

- [Google Search Console](https://search.google.com/search-console)
- [Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Favicon Generator](https://realfavicongenerator.net/)

---

## Notes

- All changes are compatible with Next.js static export (`output: 'export'`)
- No server-side features required
- Test all schema changes with Google's Rich Results Test before deploying
