# Persistence System Implementation

## Overview

This document describes the new persistence system for MyCaseValue that enables saving reports, search history, and user preferences with seamless Supabase + localStorage integration.

## Architecture

### Core Principle: Graceful Degradation

The persistence system uses a "Supabase-first, localStorage-fallback" approach:
- **When user is logged in**: Data syncs to Supabase (primary storage)
- **When user is not logged in**: Data falls back to browser's localStorage
- **When Supabase is unavailable**: Gracefully degrades to localStorage
- **When localStorage is unavailable**: Silently fails without blocking app

## Files Created

### 1. `/lib/persistence.ts`
Core persistence module providing low-level functions for:

#### Saved Reports
- `saveReport(reportData)` - Save a report view
- `getSavedReports(limit?)` - Retrieve saved reports
- `deleteReport(reportId)` - Remove a saved report

#### Search History
- `saveSearchHistory(query, category?)` - Add search to history
- `getSearchHistory(limit?)` - Retrieve search history
- `clearSearchHistory()` - Clear all history
- `getSearchSuggestions(limit?)` - Get unique queries for autocomplete

#### User Preferences
- `getUserPreferences()` - Get all preferences
- `updateUserPreferences(updates)` - Update preferences
- `setPreference(key, value)` - Set single preference
- `getPreference(key, defaultValue?)` - Get single preference

#### Sync Helpers
- `syncLocalDataToSupabase()` - One-way sync from localStorage to Supabase (after login)
- `hasSupabaseData()` - Check if user has Supabase data

### 2. `/lib/hooks/usePersistence.ts`
React hooks for easier component integration:

#### Main Hook
- `usePersistence()` - General-purpose hook with all persistence functions

#### Specialized Hooks
- `useSavedReports(limit?)` - Manages reports with automatic state updates
- `useSearchHistory(limit?)` - Manages search history with automatic state updates
- `useUserPreferences()` - Manages preferences with automatic state updates

### 3. `/components/UserDataManager.tsx`
Reusable UI components for settings page:

- `SavedReportsSection` - Displays saved reports with delete functionality
- `SearchHistorySection` - Displays search history with clear all option
- `UserPreferencesSection` - Interface for managing preferences

## Database Schema

The system uses existing Supabase tables (no migrations needed):

```sql
-- Saved Reports
CREATE TABLE saved_reports (
  id UUID PRIMARY KEY,
  user_email TEXT NOT NULL,
  category TEXT NOT NULL,
  district TEXT DEFAULT 'national',
  viewed_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_saved_reports_user ON saved_reports(user_email, viewed_at DESC);

-- Search History
CREATE TABLE search_history (
  id UUID PRIMARY KEY,
  user_email TEXT NOT NULL,
  query TEXT NOT NULL DEFAULT '',
  category TEXT,
  searched_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_search_history_user ON search_history(user_email, searched_at DESC);

-- Note: User preferences are stored in localStorage only (can be extended to Supabase)
```

## Integration Points

### 1. Report PDF Download
**File**: `/app/report/[nos]/ReportPDFButton.tsx`

```typescript
async function handleDownload() {
  // Save to user's report history
  const { saveReport } = await import('../../../lib/persistence');
  await saveReport({
    category: props.nos || props.category,
    district: props.district,
  });
  // ... PDF generation
}
```

**When**: User clicks "Download PDF Report" button
**Effect**: Report is saved to user's saved reports list

### 2. Case Search History
**File**: `/app/case-search/page.tsx`

```typescript
// In performSearch callback
if (query) {
  const { saveSearchHistory } = await import('../../lib/persistence');
  await saveSearchHistory(query, caseType || undefined);
}
```

**When**: User performs a search
**Effect**: Query is saved to user's search history

### 3. Settings Page
**File**: `/app/settings/page.tsx`

Integrated three new sections:
- Saved Reports (shows recent downloads)
- Search History (shows recent searches, with clear all option)
- User Preferences (theme, notifications, etc.)

**Components**:
```typescript
import { SavedReportsSection, SearchHistorySection, UserPreferencesSection } from '../../components/UserDataManager';
```

## Usage Examples

### Basic Usage in Components

#### Save a Report
```typescript
import { saveReport } from '@/lib/persistence';

await saveReport({
  category: 'employment-discrimination',
  district: 'N.D. California',
});
```

#### Get Search History
```typescript
import { getSearchHistory } from '@/lib/persistence';

const history = await getSearchHistory(20);
history.forEach(item => console.log(item.query));
```

#### Update Preferences
```typescript
import { updateUserPreferences } from '@/lib/persistence';

await updateUserPreferences({
  theme: 'dark',
  emailNotifications: false,
});
```

### Using Hooks

#### In Functional Component
```typescript
'use client';
import { useSavedReports } from '@/lib/hooks/usePersistence';

export function ReportsPage() {
  const { reports, loading, error, refresh, remove } = useSavedReports(10);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {reports.map(r => (
        <div key={r.id}>
          <h3>{r.category}</h3>
          <button onClick={() => remove(r.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

### Using General Hook
```typescript
'use client';
import { usePersistence } from '@/lib/hooks/usePersistence';

export function MyComponent() {
  const { addReport, fetchReports, loading } = usePersistence();

  const handleSaveReport = async () => {
    await addReport('employment-discrimination', 'national');
  };

  return <button onClick={handleSaveReport}>Save Report</button>;
}
```

## Data Sync Flow

### Scenario 1: Anonymous User
1. User browses reports (no login)
2. Downloads PDF → Saved to **localStorage**
3. Searches for cases → Saved to **localStorage**
4. Later logs in → `syncLocalDataToSupabase()` transfers data to Supabase

### Scenario 2: Logged-In User
1. User logs in (auth established)
2. Downloads PDF → Saved to **Supabase** (+ localStorage fallback)
3. Searches for cases → Saved to **Supabase** (+ localStorage fallback)
4. Logs out → Data remains in **localStorage**

### Scenario 3: Supabase Unavailable
1. User is logged in
2. Supabase service is down
3. Any persistence operation → Silently falls back to **localStorage**
4. No errors thrown, user experience unaffected
5. When Supabase recovers → Data can be synced via `syncLocalDataToSupabase()`

## Storage Limits

### localStorage
- **Typical Limit**: 5-10 MB per origin
- **Search History**: Capped at 50 items (max ~50 KB)
- **Saved Reports**: No hard limit, grows as needed
- **Preferences**: Small object (~1 KB)

### Supabase
- **Rows**: No practical limit for typical usage
- **Storage**: Based on plan (Supabase free tier = 1 GB)
- **Bandwidth**: Rate limited per plan

## Error Handling

The system never throws errors that break app functionality:

```typescript
try {
  // Try Supabase
  const result = await supabase.from('saved_reports').insert(...);
  if (!error) return result;
} catch {
  // Silently fall through to localStorage
}

// Fallback to localStorage
return localStorageOperation();
```

## Future Enhancements

### 1. Preference Sync to Supabase
Currently preferences are localStorage-only. Could add:
```sql
CREATE TABLE user_preferences (
  id UUID PRIMARY KEY,
  user_email TEXT NOT NULL UNIQUE,
  preferences JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2. Conflict Resolution
For users with data in both localStorage and Supabase:
```typescript
async function mergeAndSync() {
  // Compare timestamps, merge conflicts intelligently
  // Update Supabase with latest data
}
```

### 3. Data Export
Allow users to export their saved data:
```typescript
async function exportUserData() {
  const reports = await getSavedReports(999);
  const history = await getSearchHistory(999);
  const prefs = await getUserPreferences();
  return { reports, history, prefs };
}
```

### 4. Sharing
Allow users to share reports/searches:
```typescript
async function shareReport(reportId: string) {
  // Generate shareable link with public access
}
```

## Testing

### Unit Tests
```typescript
// Test localStorage fallback
const report = await saveReport({ category: 'employment' });
expect(report).toBeDefined();
expect(localStorage.getItem('mcv_saved_reports')).toBeTruthy();

// Test Supabase sync
const items = await getSearchHistory(5);
expect(items.length).toBeLessThanOrEqual(5);
```

### Integration Tests
```typescript
// Test full flow
await saveReport({ category: 'patent', district: 'N.D. California' });
await saveSearchHistory('patent infringement');
const prefs = await getUserPreferences();
await updateUserPreferences({ theme: 'dark' });

// Verify persistence
const savedReports = await getSavedReports();
expect(savedReports.length).toBeGreaterThan(0);
```

## Performance Considerations

### Optimization 1: Lazy Loading
```typescript
// Only import on demand
const { saveReport } = await import('@/lib/persistence');
```

### Optimization 2: Batch Operations
```typescript
// Save multiple items efficiently
const items = history.map(item => ({
  user_email: userEmail,
  query: item.query,
}));
await supabase.from('search_history').insert(items);
```

### Optimization 3: Caching
```typescript
// Cache preferences in memory
let cachedPrefs: UserPreferences | null = null;
async function getUserPreferences() {
  if (cachedPrefs) return cachedPrefs;
  cachedPrefs = await fetchFromStorage();
  return cachedPrefs;
}
```

## Security

### Row-Level Security (RLS)
Supabase tables should have RLS enabled:

```sql
ALTER TABLE saved_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only access their own reports"
ON saved_reports FOR SELECT
USING (auth.jwt() ->> 'email' = user_email);
```

### localStorage Security
- localStorage is accessible via JavaScript (no XSS protection)
- Avoid storing sensitive data
- Clear on logout (optional):

```typescript
function clearLocalStorage() {
  localStorage.removeItem('mcv_saved_reports');
  localStorage.removeItem('mcv_search_history');
  localStorage.removeItem('mcv_user_preferences');
}
```

## Troubleshooting

### Issue: Data Not Saving
1. Check if Supabase is configured (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
2. Check localStorage is enabled in browser
3. Check RLS policies allow inserts
4. Check browser console for errors

### Issue: Stale Data
1. Call `refresh()` on hooks to force reload
2. For manual functions, create new query (Supabase caches results)
3. Check `searched_at` or `viewed_at` timestamps

### Issue: Storage Quota Exceeded
1. Clear old search history: `await clearSearchHistory()`
2. Implement automatic cleanup: Remove items older than 30 days
3. Use Supabase for primary storage instead of localStorage

## Deployment

No special deployment steps required:
1. Tables already exist in Supabase schema
2. No migrations needed
3. Code is backward compatible
4. Can be enabled/disabled via feature flags

## Related Files

- `/lib/supabase.ts` - Supabase client initialization
- `/app/report/[nos]/page.tsx` - Report page (saves on download)
- `/app/case-search/page.tsx` - Search page (saves queries)
- `/app/settings/page.tsx` - Settings page (displays saved data)
- `/components/UserDataManager.tsx` - Settings UI components
