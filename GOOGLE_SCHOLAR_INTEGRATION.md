# Google Scholar Integration for MyCaseValue

## Overview

This integration enriches case data with legal scholarship context from Google Scholar. The system can operate with or without an external API key, providing a complete offline experience with pre-built fallback data.

## Files Created/Modified

### New Files
1. **`lib/google-scholar.ts`** - Core module providing scholarship data
2. **`app/api/scholar/route.ts`** - API endpoint for fetching insights

### Modified Files
1. **`app/methodology/page.tsx`** - Added Google Scholar to data sources
2. **`components/MyCaseValue.tsx`** - Added to verified data sources footer
3. **`app/layout.tsx`** - Updated Schema.org Dataset structured data

## Usage

### Frontend Usage

```typescript
import { fetchScholarInsights, ScholarInsight } from '@/lib/google-scholar';

// Direct module usage
const insights: ScholarInsight = await fetchScholarInsights('employment', 'CA');

// Or via API endpoint
const response = await fetch('/api/scholar?category=employment&state=CA');
const insights: ScholarInsight = await response.json();
```

### API Endpoint

**GET** `/api/scholar?category=employment&state=CA`

**Query Parameters:**
- `category` (required): Case type (e.g., employment, personal_injury, contract, etc.)
- `state` (optional): State jurisdiction filter (e.g., CA, NY)

**Response:**
```json
{
  "topCitations": [
    {
      "title": "...",
      "authors": "...",
      "year": 2023,
      "citedBy": 8742,
      "snippet": "...",
      "url": "https://scholar.google.com/..."
    }
  ],
  "legalTrends": [
    "Expansion of remote work accommodation requirements under ADA",
    ...
  ],
  "keyStatutes": [
    "Title VII of the Civil Rights Act, 42 U.S.C. § 2000e et seq.",
    ...
  ],
  "recentDevelopments": "..."
}
```

### Supported Case Categories

The integration includes comprehensive fallback data for:

- `employment` - Employment law & discrimination
- `personal_injury` - Tort law & negligence
- `contract` - Contract interpretation & disputes
- `intellectual_property` - Patents, copyright, trademarks
- `securities` - Securities fraud & trading
- `civil_rights` - Constitutional rights & police misconduct
- `environmental` - Environmental law & regulations
- `bankruptcy` - Bankruptcy proceedings & debt relief
- `real_estate` - Property law & disputes
- `product_liability` - Product defects & warnings
- `medical_malpractice` - Medical negligence
- `family` - Divorce, custody, child support
- `administrative` - Administrative law & judicial review

## Configuration

### Optional SerpAPI Integration

To enable live Google Scholar API calls:

1. Get API key from [SerpAPI](https://serpapi.com/)
2. Set environment variable:
   ```bash
   SERPAPI_KEY=your_api_key_here
   ```

Without the API key, the system uses pre-built fallback data automatically.

## Features

### Caching
- **Client-side**: In-memory cache with 24-hour TTL
- **Server-side**: HTTP cache headers with 24-hour max-age
- **Stale-while-revalidate**: 48-hour stale content window

### Rate Limiting
- 30 requests per minute per IP address
- Returns 429 status code when exceeded
- Includes `Retry-After` header

### Fallback Data
Each case category includes:
- 3+ top citations with full metadata
- 4+ current legal trends
- 5+ key statutory references
- Recent developments summary

### Error Handling
- Graceful fallback if SerpAPI fails
- Proper HTTP error codes
- Detailed error logging

## Data Structure

```typescript
export interface ScholarInsight {
  topCitations: {
    title: string;
    authors: string;
    year: number;
    citedBy: number;
    snippet: string;
    url: string;
  }[];
  legalTrends: string[];
  keyStatutes: string[];
  recentDevelopments: string;
}
```

## Integration Points

### Methodology Page
- Listed as "Supplementary" data source
- Explains role in providing legal context
- Appears alongside FJC IDB, CourtListener, PACER

### Homepage Footer
- "Google Scholar" added to verified data sources
- Displayed alongside Federal Judicial Center, CourtListener, uscourts.gov

### Schema.org Metadata
- Dataset schema updated to reference Google Scholar
- Added structured data fields:
  - `spatialCoverage`: United States Federal Courts
  - `temporalCoverage`: 1970-present
  - `inLanguage`: en
  - `isAccessibleForFree`: true

## Performance Notes

- In-memory cache prevents redundant API calls
- 24-hour caching reduces external API usage
- Fallback data loads instantly with no external dependency
- Rate limiting protects against abuse

## Future Enhancements

Potential improvements:
- Redis caching for multi-instance deployments
- Database persistence for analytics
- More granular filtering by jurisdiction
- Integration with case recommendation engine
- Scholar trending data visualization
