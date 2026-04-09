# JSON-LD Structured Data Implementation Summary

## Overview
This document summarizes the JSON-LD structured data implementation across the MyCaseValue Next.js 14 App Router project. The implementation leverages Schema.org vocabulary to enhance SEO and enable rich snippets in search results.

## Current Implementation Status

### 1. Reusable JsonLd Component
**Location:** `/components/JsonLd.tsx`
**Status:** CREATED

A reusable component for rendering JSON-LD structured data on any page:

```tsx
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

**Usage Example:**
```tsx
<JsonLd data={{
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'My Article',
  author: { '@type': 'Person', name: 'John Doe' }
}} />
```

---

## Page-by-Page Implementation

### 2. Homepage (`app/page.tsx`)
**Status:** ALREADY IMPLEMENTED ✓
**Schemas Used:**
- `WebSite` with `SearchAction`
- `Organization`

**Details:**
- Includes SearchAction pointing to `/cases?q={search_term_string}`
- Organization metadata with logo and brand information
- Uses `SITE_URL` from `lib/site-config` for all URLs

**Code Location:** Lines 153-178 in `app/page.tsx`

---

### 3. Blog Posts (`app/blog/[slug]/page.tsx`)
**Status:** NEWLY UPDATED ✓
**Schemas Used:**
- `Article`

**Details:**
- Headline: Article title
- Description: Article excerpt
- Image: OG image URL
- datePublished: ISO 8601 formatted publication date
- Author: Organization name (e.g., "MyCaseValue Research Team")
- Publisher: Organization with logo
- mainEntityOfPage: WebPage reference with canonical URL

**Implementation:**
- Lines 353-376: JSON-LD data object construction
- Lines 386-391: Script tag rendering with `dangerouslySetInnerHTML`

**Example Output:**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "What 5.1 Million Federal Cases Tell Us About Employment Discrimination in 2024",
  "description": "The national 52.2% win rate, $79K median settlement, and what 10 years of data reveal about circuit-level patterns and the impact of legal representation.",
  "image": "https://www.mycasevalues.com/og-image.png",
  "datePublished": "2025-02-10T00:00:00.000Z",
  "author": {
    "@type": "Organization",
    "name": "MyCaseValue Research Team"
  },
  "publisher": {
    "@type": "Organization",
    "name": "MyCaseValue",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.mycasevalues.com/logo.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.mycasevalues.com/blog/employment-discrimination-2024-data"
  }
}
```

---

### 4. Case Type Pages (`app/cases/[category]/[slug]/page.tsx`)
**Status:** ALREADY IMPLEMENTED ✓
**Schemas Used:**
- `Dataset`
- `BreadcrumbList`

**Details:**
- Dataset includes case type name, description, and accessibility
- BreadcrumbList for navigation hierarchy (Home > Cases > Category > Case Type)
- Indicates data is accessible for free and spatially covers U.S. Federal Courts
- Uses FJC as the data creator

**Code Location:** Lines 200-236 in `app/cases/[category]/[slug]/page.tsx`

---

### 5. Judge Profile Pages (`app/judges/[judgeId]/page.tsx`)
**Status:** ALREADY IMPLEMENTED ✓
**Schemas Used:**
- `Person`

**Details:**
- Judge's full name as the main identifier
- Job title: "United States District Judge" (or specific position)
- Work location: District court information
- Appointment date (when available)
- Appointing president (when available)
- Circuit and district information in description

**Code Location:** Lines 98-116 in `app/judges/[judgeId]/page.tsx`

**Example Output:**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Judge John Doe",
  "givenName": "John",
  "familyName": "Doe",
  "jobTitle": "United States District Judge",
  "description": "Federal judge in the Northern District of California District, Ninth Circuit",
  "dateOfAppointment": "2010-05-15",
  "appointedBy": "Barack Obama",
  "workLocation": {
    "@type": "Place",
    "name": "Northern District of California District Court"
  }
}
```

---

## Configuration & Best Practices

### URL Configuration
All JSON-LD implementations use the centralized `SITE_URL` from `lib/site-config.ts`:

```tsx
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mycasevalues.com';
```

This ensures consistency across all structured data and makes it easy to switch environments.

### Safe Usage in Client Components
JSON-LD script tags are safe to use even in Client Components (`'use client'`), as they are just script tags that don't interact with React state. They can appear anywhere in the component tree.

### Non-Blocking Implementation
JSON-LD structured data does not affect rendering performance or SEO negatively if it's not included. It's purely additive, so removing any schema won't break the page.

---

## Schema.org Reference

### Relevant Schema Types Used

**WebSite (Homepage)**
- Property: `potentialAction` → SearchAction
- Enables Google Sitelinks search box

**SearchAction**
- Property: `target` → URL template with `{search_term_string}` placeholder
- Guides search engines to the search functionality

**Article (Blog Posts)**
- Properties: `headline`, `description`, `image`, `datePublished`
- Enables rich snippets in search results
- Shows publication date and article preview

**Dataset (Case Type Pages)**
- Properties: `name`, `description`, `url`, `creator`, `isAccessibleForFree`
- Indicates the page contains structured data
- Useful for research and data discovery

**Person (Judge Profiles)**
- Properties: `name`, `jobTitle`, `workLocation`, `dateOfAppointment`
- Identifies notable persons
- Links to biographical information

**Organization (All pages)**
- Properties: `name`, `url`, `logo`, `sameAs`
- Core brand identity in search results
- Supports knowledge graph entries

---

## Testing & Validation

To validate JSON-LD implementation:

1. **Google Rich Results Test:**
   - Visit: https://search.google.com/test/rich-results
   - Enter page URL
   - Verify all schemas are detected

2. **Schema.org Validator:**
   - Visit: https://validator.schema.org/
   - Paste HTML or URL
   - Verify valid schema markup

3. **Inspection in Browser:**
   - Open DevTools > Elements
   - Search for `<script type="application/ld+json">`
   - Verify JSON is valid and properly formatted

---

## Future Enhancements

### Potential Additional Schemas
- **BreadcrumbList**: Already implemented on case pages; could be expanded to judge pages and blog posts for better navigation SEO
- **FAQPage**: For FAQ pages (`app/faq/page.tsx`) to enable FAQ rich snippets
- **LocalBusiness**: If office locations are added
- **VideoObject**: If tutorial videos are added
- **StructuredData Events**: For webinars or upcoming events

### Dynamic Schema Updates
Consider updating the following pages with structured data:
- **`app/blog/page.tsx`**: `CollectionPage` or `ItemList` schema for the blog landing page
- **`app/search/page.tsx`**: `SearchResultsPage` schema
- **`app/pricing/page.tsx`**: `PricingTable` or `Service` schema
- **`app/integrations/page.tsx`**: `SoftwareApplication` schema for integrations

---

## Files Modified

1. **CREATED:** `/components/JsonLd.tsx` - Reusable component
2. **UPDATED:** `/app/blog/[slug]/page.tsx` - Added Article schema
3. **VERIFIED:** `/app/page.tsx` - Homepage WebSite + Organization (existing)
4. **VERIFIED:** `/app/cases/[category]/[slug]/page.tsx` - Dataset + BreadcrumbList (existing)
5. **VERIFIED:** `/app/judges/[judgeId]/page.tsx` - Person schema (existing)

---

## Implementation Checklist

- [x] Create reusable `JsonLd` component
- [x] Add `Article` schema to blog post pages
- [x] Verify `WebSite` with `SearchAction` on homepage
- [x] Verify `Dataset` schema on case type pages
- [x] Verify `Person` schema on judge profile pages
- [x] Ensure all URLs use `SITE_URL` from config
- [x] Document implementation and usage

---

## Questions?

For additional Schema.org vocabulary reference, visit: https://schema.org/
