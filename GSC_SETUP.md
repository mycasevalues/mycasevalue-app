# Google Search Console Setup Guide

This guide walks you through setting up Google Search Console (GSC) for MyCaseValue to monitor search visibility, indexing, and search performance.

## Prerequisites

- A Google account with access to the mycasevalues.com domain
- Admin access to the domain's DNS settings
- (Optional) Access to the Google Analytics property for the domain

## Step 1: Add Domain Property in Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **"Add property"** in the left sidebar
3. Select **"Domain"** (not URL prefix) to cover all subdomains and protocols
4. Enter the domain: `mycasevalues.com`
5. Click **"Continue"**

## Step 2: Verify Domain via DNS TXT Record

Google will display a TXT record to add to your domain's DNS settings:

1. Copy the TXT record provided by Google Search Console
   - Format: `google-site-verification=XXXXXXXXXXxxxxxxxxxxxxxxxxxxxx`

2. Log into your DNS provider (e.g., Cloudflare, GoDaddy, Route 53, Namecheap, etc.)

3. Add a new TXT record:
   - **Type:** TXT
   - **Name:** `@` (or the domain root)
   - **Value:** Paste the verification code from Google Search Console
   - **TTL:** 300-3600 seconds (default is fine)

4. Save the DNS record

5. Return to Google Search Console and click **"Verify"**
   - This may take a few minutes to propagate through DNS
   - If verification fails, wait 5-10 minutes and try again

6. Once verified, Google displays: *"Ownership verified"*

## Step 3: Submit Sitemap

1. In Google Search Console, go to **Sitemaps** (left sidebar)
2. In the "Add a sitemap" field, enter: `https://mycasevalues.com/sitemap.xml`
3. Click **"Submit"**
4. Google will crawl and index the sitemap
   - Check back in a few hours to see the indexed count

## Step 4: Request Indexing for Key Pages

Request Google to crawl and index your most important pages immediately:

### Homepage & Core Pages

1. In Google Search Console, use the **"URL Inspection"** tool (search bar at top)
2. Enter each URL and click **"Inspect"**
3. Click **"Request Indexing"** for:
   - `https://mycasevalues.com/` (homepage)
   - `https://mycasevalues.com/cases` (case type directory)
   - `https://mycasevalues.com/judges` (judge profiles)
   - `https://mycasevalues.com/districts` (federal districts)
   - `https://mycasevalues.com/nos-explorer` (NOS code explorer)
   - `https://mycasevalues.com/pricing` (pricing page)
   - `https://mycasevalues.com/about` (about page)
   - `https://mycasevalues.com/methodology` (methodology)
   - `https://mycasevalues.com/how-it-works` (how it works)
   - `https://mycasevalues.com/faq` (FAQ)
   - `https://mycasevalues.com/contact` (contact)
   - `https://mycasevalues.com/attorney` (attorney tools)
   - `https://mycasevalues.com/attorney/api-access` (API access)

### Audience Pages

Request indexing for all /for/ pages:
- `https://mycasevalues.com/for/pro-se`
- `https://mycasevalues.com/for/researchers`
- `https://mycasevalues.com/for/students`
- `https://mycasevalues.com/for/paralegals`

## Step 5: Monitor Indexing & Search Performance

After submitting, monitor:

- **Coverage:** Check how many pages are indexed vs. blocked
- **Search Performance:** View impressions, clicks, CTR, and ranking positions
- **Mobile Usability:** Ensure no mobile-specific errors
- **Core Web Vitals:** Monitor page speed and user experience metrics
- **URL Inspection:** Use the tool to debug individual pages if they're not indexing

## Step 6: Link Google Analytics (Optional but Recommended)

1. In Google Search Console, go to **Settings** → **Associate with Google Analytics**
2. Select your Google Analytics property for the domain
3. This allows you to see search data alongside analytics

## Additional Configuration

### Allow robots.txt Fetch

Google may need to crawl your robots.txt:

1. Go to **Settings** → **Robots.txt Tester**
2. Verify that paths are not unnecessarily blocked
3. Current robots.txt allows all paths except `/api/` and `/admin/`

### Check Core Web Vitals

1. Go to **Core Web Vitals** report
2. Monitor LCP (Largest Contentful Paint), FID/INP (Interaction to Next Paint), and CLS (Cumulative Layout Shift)
3. Address any "Poor" metrics

### Review Manual Actions

1. Go to **Manual Actions** to check for spam or guideline violations
2. If issues exist, review and submit a reconsideration request

## Troubleshooting

**DNS verification failed:**
- Wait 10+ minutes for DNS propagation
- Double-check the TXT record value (copy exactly from GSC)
- Verify with your DNS provider that the record was saved

**Sitemap not updating:**
- Ensure `/sitemap.xml` route is deployed and returns valid XML
- Check that the sitemap URL is accessible: `https://mycasevalues.com/sitemap.xml`
- Wait 24 hours for Google to crawl the sitemap

**Pages not indexing:**
- Check for robots.txt or meta noindex directives
- Verify pages are accessible and not behind authentication
- Use URL Inspection tool to see Google's crawl errors
- Request indexing again if the issue is resolved

**Crawl errors:**
- Review the Coverage report to identify 404, 5xx, or blocked resources
- Fix issues and request re-indexing

## Monitoring Schedule

- **Daily:** Check coverage report and recent indexing changes
- **Weekly:** Review search performance metrics and click-through rates
- **Monthly:** Audit Mobile Usability, Core Web Vitals, and Manual Actions

## Resources

- [Google Search Console Help](https://support.google.com/webmaster)
- [Next.js Sitemap Documentation](https://nextjs.org/docs/app/api-reference/functions/generate-sitemaps)
- [robots.txt Best Practices](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
- [Core Web Vitals Guide](https://web.dev/vitals/)
