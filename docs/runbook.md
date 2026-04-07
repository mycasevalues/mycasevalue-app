# CaseCheck Disaster Recovery Runbook

## Overview

This document provides procedures for responding to and recovering from critical infrastructure failures affecting the CaseCheck application. All estimated recovery times assume standard incident response protocols.

**Last Updated:** 2026-04-07
**Version:** 1.0
**Audience:** DevOps, Engineering, Support Teams

---

## Table of Contents

1. [Supabase Database Failure](#supabase-database-failure)
2. [Vercel Deployment Failure](#vercel-deployment-failure)
3. [Anthropic API Outage](#anthropic-api-outage)
4. [CourtListener API Outage](#courtlistener-api-outage)
5. [Domain/DNS Failure](#domaindns-failure)
6. [Upstash Redis Failure](#upstash-redis-failure)
7. [Emergency Contact List](#emergency-contact-list)

---

## Supabase Database Failure

### Identification

Symptoms of a Supabase database failure include:

- Sentry error dashboard shows spike in database-related errors
- API endpoints return HTTP 500 errors
- Health check endpoint returns failure status
- Application logs show connection timeouts to PostgreSQL
- Users report inability to load case data or save changes

### Initial Assessment (1-2 minutes)

1. Open [Supabase Status Page](https://status.supabase.com)
2. Check for any active incidents or ongoing maintenance
3. Review Sentry dashboard: Filter by `supabase` tag
4. Verify database connectivity:
   ```bash
   # From application server
   psql -h [SUPABASE_HOST] -U postgres -d postgres -c "SELECT 1;"
   ```

### Recovery Procedure: Restore from Backup (5-15 minutes)

1. **Access Supabase Dashboard**
   - Navigate to https://supabase.com/dashboard
   - Select the CaseCheck project
   - Go to Settings → Backups

2. **Identify Latest Valid Backup**
   - Review backup list (automatic daily backups are retained for 30 days)
   - Select the most recent backup before the failure was detected

3. **Initiate Restore**
   - Click the backup timestamp to select it
   - Click "Restore from backup"
   - Confirm the target database (production)
   - Warning: This will overwrite current database contents
   - Estimate: 10-15 minutes for full restore

4. **Verify Restoration**
   - After restore completes, test database connectivity again
   - Run basic queries via Supabase SQL Editor
   - Check application health endpoint for success status
   - Monitor Sentry for error rate decline

### Fallback: Cached Static Data (Immediate)

If database restoration is delayed:

1. **Enable REAL_DATA mode fallback** (if available in environment)
   - Set environment variable: `NEXT_PUBLIC_USE_CACHED_DATA=true`
   - Redeploy to Vercel (see [Vercel Deployment Failure](#vercel-deployment-failure))
   - Application serves cached static data for read operations
   - Write operations are queued locally for retry

2. **Communication**
   - Display banner to users: "View-only mode - recent changes may not be visible"
   - Provide status updates every 15 minutes

### Escalation

- **If not recovered in 30 minutes:** Contact Supabase support
  - Email: support@supabase.io
  - Slack: Use #supabase-support (if available)
  - Priority Enterprise Support phone number in Emergency Contact List

---

## Vercel Deployment Failure

### Identification

Symptoms of a deployment failure include:

- Build fails during automated deployment
- Runtime errors occur immediately after deployment
- New version fails health checks
- Sentry shows spike of errors after recent deployment
- Previous version was stable (no errors)

### Quick Assessment (1 minute)

1. Check Vercel Dashboard: https://vercel.com/dashboard
2. Select CaseCheck project
3. View "Deployments" tab - note the failing deployment status
4. Review "Build Logs" for specific error messages

### Rollback Procedure (3 minutes)

#### Option 1: Using Vercel Dashboard (Recommended)

1. Navigate to Vercel Dashboard → CaseCheck project
2. Click "Deployments" tab
3. Find the **last successful deployment** (green checkmark)
4. Click the three-dot menu (⋮) on that deployment
5. Select "Promote to Production"
6. Confirm promotion
7. Wait for DNS propagation (typically < 1 minute)

#### Option 2: Using Vercel CLI

```bash
# Authenticate (if not already)
vercel login

# List recent deployments
vercel deployments --limit 10

# Rollback to previous production deployment
vercel rollback

# Confirm the rollback action
```

### Verification (2 minutes)

1. **Check Site Health**
   ```bash
   curl -I https://casecheck.app/api/health
   # Should return HTTP 200
   ```

2. **Verify in Browser**
   - Visit https://casecheck.app
   - Check core functionality works
   - Login test
   - Basic case search

3. **Monitor Error Rates**
   - Open Sentry dashboard
   - Confirm error spike is declining
   - Check last 5 minutes of data

4. **Notify Team**
   - Post in #incidents or equivalent channel
   - Include rollback timestamp and affected version

### Investigation (Post-Recovery)

1. Review the failed deployment's build logs
2. Check Git commits between last good and bad deployment
3. Look for:
   - New dependencies with compatibility issues
   - Environment variable misconfigurations
   - Next.js build errors (dynamic imports, API routes)

---

## Anthropic API Outage

### Identification

Affected features when API is unavailable:

- Natural language search functionality fails
- Semantic search returns cached results only
- Jargon translator shows placeholder text
- AI-powered case summaries unavailable
- UI shows loading spinner then times out

Unaffected features:

- All database operations (case filing, metadata)
- Basic case search and filtering
- Document uploads
- User authentication
- Financial features

### Monitoring

- Check [Anthropic Status Page](https://status.anthropic.com)
- Monitor Sentry for API timeout errors
- Track response times to `/api/ai/*` endpoints

### Graceful Degradation (Automatic)

The application automatically handles Anthropic API unavailability:

1. **User-Facing Behavior**
   - AI feature sections display: "AI features temporarily unavailable"
   - Users can access all non-AI features normally
   - No error messages or crashes

2. **Backend Behavior**
   - API requests timeout after 30 seconds
   - Fallback text is returned to client
   - Non-AI API routes continue normal operation
   - Errors are logged with `anthropic-timeout` tag in Sentry

### Expected Recovery Time

- Anthropic typically restores service within 1-4 hours
- No action required from operations team
- Service automatically resumes when API recovers

### Communication to Users

If outage exceeds 30 minutes:

1. Post status update to CaseCheck status page
2. Notify customers in support channels
3. Message: "AI-powered features are temporarily unavailable due to upstream service disruption. All other features are operating normally."

---

## CourtListener API Outage

### Identification

Affected features when API is unavailable:

- Filing ticker updates stop
- Relevant opinions search fails
- Opposing counsel search unavailable
- New docket data not fetched

Symptoms:

- `/api/filing-ticker` returns stale data
- Sentry shows `courtlistener-api-error` tags
- Date on cached responses is older than current day

Unaffected features:

- Historical filing data (served from cache)
- Case metadata in database
- Document uploads and management

### Monitoring & Recovery

- Check [CourtListener API Status](https://www.courtlistener.com/api/rest-info/)
- Application automatically serves cached data from Upstash Redis
- Scheduled cache refresh is automatically retried every 5 minutes
- No manual intervention required

### Expected Recovery Time

- Typical CourtListener outages: 15-60 minutes
- Cached data is valid for 24 hours
- Users may see slightly outdated filing information during outage
- Full refresh occurs automatically within 5 minutes of API recovery

### Communication to Users

If outage exceeds 1 hour:

- Email to users: "Filing ticker data may be delayed while we resolve upstream API issues"
- Include timestamp of last successful update from logs

### Manual Data Refresh (If Needed)

```bash
# SSH into Vercel serverless function or local environment
# Trigger manual cache refresh
curl https://casecheck.app/api/filing-ticker?refresh=true
# Requires REFRESH_TOKEN environment variable
```

---

## Domain/DNS Failure

### Identification

Users unable to access https://casecheck.app:

- Browser shows "ERR_NAME_NOT_RESOLVED" or similar DNS error
- `nslookup casecheck.app` returns no A records
- Site works on VPN but not on public internet
- Intermittent connectivity (DNS propagation in progress)

### Current DNS Configuration

**A Record:**
- Domain: `casecheck.app`
- Target: Vercel nameserver IP (Vercel auto-manages)
- TTL: 3600 seconds

**CNAME Record:**
- Subdomain: `www.casecheck.app`
- Target: `cname.vercel-dns.com`
- TTL: 3600 seconds

### Domain Registrar Information

- **Registrar:** [Document registrar - e.g., Namecheap, GoDaddy, etc.]
- **Registrar Login:** [Insert credentials management system reference]
- **Account Owner:** [Insert contact name]

### Recovery Procedure (1-24 hours)

1. **Verify DNS Records**
   ```bash
   # Check A record
   nslookup casecheck.app
   # Should return Vercel IP address

   # Check CNAME record
   nslookup www.casecheck.app
   # Should return cname.vercel-dns.com
   ```

2. **Access Domain Registrar**
   - Log into registrar account
   - Navigate to DNS settings for `casecheck.app`
   - Verify A record and CNAME record are correct

3. **Reconfigure if Needed**
   - Update A record to point to Vercel's current IP (available in Vercel Dashboard → Settings → Domains)
   - Update CNAME record to `cname.vercel-dns.com`
   - Save changes

4. **Wait for Propagation**
   - DNS changes propagate over 1-24 hours globally
   - Use https://dnschecker.org to verify propagation
   - Check that multiple nameservers return correct records

5. **Backup Configuration Steps**
   - Screenshot current DNS configuration in registrar
   - Store in shared documentation
   - Keep Vercel domain settings page saved (DNS records provided by Vercel)

### Vercel Domain Configuration Backup

1. Log into Vercel Dashboard
2. Project Settings → Domains
3. Note the nameservers assigned to casecheck.app
4. Store this in team documentation for quick reference

### Escalation

- **If DNS propagation takes > 4 hours:** Contact registrar support
- **If Vercel nameservers are incorrect:** Contact Vercel support
- **Priority contacts in Emergency Contact List**

---

## Upstash Redis Failure

### Identification

Symptoms of Redis failure:

- Rate limiting errors appear (503 Too Many Requests)
- API response times spike
- Caching not functioning (repeated slow requests for same data)
- Filing ticker serves very stale data (> 24 hours old)
- Sentry shows `redis-connection-error` tags

### Monitoring

- Check [Upstash Status Page](https://status.upstash.com)
- Monitor Sentry error rate for rate-limiting errors
- Check Upstash Dashboard for connection metrics

### Affected Features

- Rate limiting (falls back to in-memory limiter)
- Response caching for API calls
- Filing ticker data freshness
- Session data caching (may affect login)

### Fallback Mechanisms (Automatic)

1. **Rate Limiting Fallback**
   - In-memory rate limiter activates automatically
   - Limits per IP address (less accurate than distributed Redis)
   - Continues to prevent abuse

2. **Caching Fallback**
   - Requests proceed without caching
   - Direct API calls to database and external services
   - Performance may degrade but no data loss

3. **Session Handling**
   - Sessions fallback to secure HTTP-only cookies
   - Token-based authentication continues normally
   - No user re-authentication required

### Expected Recovery Time

- Upstash typical recovery: 15-45 minutes
- No manual intervention required
- Automatic recovery when Redis connection restored

### Communication to Users

If outage exceeds 30 minutes:

- Inform users: "Some features may be slower than usual while we resolve infrastructure issues"
- No functionality is lost

### Manual Cache Invalidation (If Needed)

```bash
# If Redis is restarted and cached data is suspect
curl https://casecheck.app/api/cache/invalidate \
  -H "Authorization: Bearer $CACHE_ADMIN_TOKEN" \
  -X POST
```

---

## Emergency Contact List

### Vercel Support

- **Website:** https://vercel.com/help
- **Priority Support Email:** support@vercel.com
- **Slack:** Available for enterprise plans
- **Response Time:** 15-30 minutes (Enterprise), 24 hours (Standard)
- **Account Contact:** [Insert primary contact]

### Supabase Support

- **Website:** https://supabase.com/dashboard/support
- **Email:** support@supabase.io
- **Slack Community:** https://supabase.com/community
- **Response Time:** 1-2 hours (Pro plan), 24 hours (Free)
- **Account Contact:** [Insert primary contact]

### Anthropic Support

- **Website:** https://www.anthropic.com/contact
- **Email:** support@anthropic.com
- **Status Page:** https://status.anthropic.com
- **Response Time:** Variable (depends on support tier)
- **Account Contact:** [Insert primary contact]

### CourtListener (PACER)

- **API Docs:** https://www.courtlistener.com/api/
- **Status:** https://www.courtlistener.com/api/rest-info/
- **Contact:** api@courtlistener.com
- **Community:** No dedicated support (community-maintained)

### Upstash Support

- **Website:** https://console.upstash.com/support
- **Email:** support@upstash.com
- **Status Page:** https://status.upstash.com
- **Response Time:** 4-24 hours
- **Account Contact:** [Insert primary contact]

### Domain Registrar Support

- **Registrar:** [Insert domain registrar name]
- **Support URL:** [Insert support link]
- **Phone:** [Insert phone number]
- **Account Owner:** [Insert name]
- **Account ID:** [Insert account ID]

### Internal Escalation

- **On-Call Engineer:** [Insert contact info and rotation schedule]
- **Engineering Lead:** [Insert contact info]
- **CTO/Technical Director:** [Insert contact info]
- **Incident Channel:** #incidents (Slack)

---

## General Incident Response Guidelines

### Initial Response (First 2 minutes)

1. Identify the affected service
2. Check corresponding status page
3. Assess impact on users
4. Post initial update to #incidents channel

### Investigation Phase (2-15 minutes)

1. Follow the procedure for the identified failure type
2. Check logs and monitoring dashboards
3. Attempt recovery steps in sequence
4. Document findings

### Recovery Phase (15+ minutes)

1. Execute recovery procedure
2. Verify fixes with testing
3. Monitor error rates post-recovery
4. Ensure no data corruption

### Communication Phase (Ongoing)

1. Update #incidents channel every 15 minutes
2. Post status updates to status page
3. Email key stakeholders if outage > 1 hour
4. Include: Issue, actions taken, ETA for resolution

### Post-Incident Phase (After recovery)

1. Document root cause
2. Create follow-up tickets for prevention
3. Update this runbook if needed
4. Schedule incident review meeting

---

## Document Maintenance

- **Review Frequency:** Quarterly
- **Last Reviewed:** [Insert date]
- **Next Review Due:** [Insert date]
- **Owner:** [Insert team name]
- **Contributors:** [Insert names]

Update this runbook when:

- New external services are integrated
- Contact information changes
- DNS records are updated
- Domain registrar changes
- New failure scenarios are discovered
