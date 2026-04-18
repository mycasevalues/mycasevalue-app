'use client';

/**
 * User Data Manager Component
 * Displays and manages saved reports, search history, and user preferences
 * Used in settings page for premium/authenticated users
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSavedReports, useSearchHistory, useUserPreferences } from '../lib/hooks/usePersistence';

export function SavedReportsSection() {
  const { reports, loading, error, remove } = useSavedReports(20);

  return (
    <section
      className="rounded-sm p-6"
      style={{
        border: '1px solid var(--border-default)',
        backgroundColor: 'var(--color-surface-0)',
      }}
    >
      <h2
        className="text-xl font-bold mb-4"
        style={{ fontFamily: 'var(--font-ui)', color: 'var(--color-text-primary)' }}
      >
        Saved Reports
      </h2>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: 14, marginBottom: 16 }}>
        Reports you've downloaded or viewed recently
      </p>

      {loading && (
        <div style={{ color: 'var(--color-text-secondary)', textAlign: 'center', padding: 20 }}>
          Loading...
        </div>
      )}

      {error && (
        <div
          style={{
            padding: 12,
            marginBottom: 16,
            backgroundColor: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: 4,
            color: 'var(--data-negative, #B01E1E)',
            fontSize: 14,
          }}
        >
          {error}
        </div>
      )}

      {!loading && reports.length === 0 && (
        <div style={{ textAlign: 'center', padding: 32 }}>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 16 }}>
            No saved reports yet
          </p>
          <Link
            href="/cases"
            style={{
              display: 'inline-block',
              padding: '8px 16px',
              backgroundColor: 'var(--accent-primary)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: 4,
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Browse Case Types →
          </Link>
        </div>
      )}

      {!loading && reports.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {reports.map(report => (
            <div
              key={report.id}
              style={{
                padding: 12,
                backgroundColor: 'var(--color-surface-1)',
                border: '1px solid var(--border-default)',
                borderRadius: 4,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div style={{ flex: 1 }}>
                <Link
                  href={`/report/${report.category}`}
                  style={{
                    color: 'var(--accent-primary)',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: 14,
                  }}
                >
                  {report.category}
                </Link>
                <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', margin: '4px 0 0' }}>
                  {report.district} · {new Date(report.viewedAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => remove(report.id)}
                style={{
                  padding: '6px 12px',
                  backgroundColor: 'transparent',
                  border: '1px solid var(--border-default)',
                  borderRadius: 3,
                  color: 'var(--color-text-secondary)',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 200ms',
                }}
                onMouseEnter={e => {
                  (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(239, 68, 68, 0.08)';
                  (e.target as HTMLButtonElement).style.borderColor = 'rgba(239, 68, 68, 0.3)';
                }}
                onMouseLeave={e => {
                  (e.target as HTMLButtonElement).style.backgroundColor = 'transparent';
                  (e.target as HTMLButtonElement).style.borderColor = 'var(--border-default)';
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export function SearchHistorySection() {
  const { history, loading, error, clear } = useSearchHistory(20);
  const [confirming, setConfirming] = useState(false);

  const handleClear = async () => {
    setConfirming(false);
    await clear();
  };

  return (
    <section
      className="rounded-sm p-6"
      style={{
        border: '1px solid var(--border-default)',
        backgroundColor: 'var(--color-surface-0)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <h2
            className="text-xl font-bold"
            style={{ fontFamily: 'var(--font-ui)', color: 'var(--color-text-primary)' }}
          >
            Search History
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 14, marginTop: 4 }}>
            Your recent searches are saved locally and synced when you're logged in
          </p>
        </div>
        {history.length > 0 && (
          <button
            onClick={() => setConfirming(true)}
            style={{
              padding: '8px 16px',
              backgroundColor: 'transparent',
              border: '1px solid var(--border-default)',
              borderRadius: 4,
              color: 'var(--color-text-secondary)',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 200ms',
            }}
            onMouseEnter={e => {
              (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(239, 68, 68, 0.08)';
            }}
            onMouseLeave={e => {
              (e.target as HTMLButtonElement).style.backgroundColor = 'transparent';
            }}
          >
            Clear All
          </button>
        )}
      </div>

      {confirming && (
        <div
          style={{
            padding: 12,
            marginBottom: 16,
            backgroundColor: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: 4,
          }}
        >
          <p style={{ color: 'var(--color-text-primary)', fontSize: 14, marginBottom: 8 }}>
            Clear all search history? This cannot be undone.
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={handleClear}
              style={{
                padding: '6px 12px',
                backgroundColor: 'var(--data-negative, #B01E1E)',
                color: 'white',
                border: 'none',
                borderRadius: 3,
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Confirm Clear
            </button>
            <button
              onClick={() => setConfirming(false)}
              style={{
                padding: '6px 12px',
                backgroundColor: 'transparent',
                border: '1px solid var(--border-default)',
                borderRadius: 3,
                color: 'var(--color-text-secondary)',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading && (
        <div style={{ color: 'var(--color-text-secondary)', textAlign: 'center', padding: 20 }}>
          Loading...
        </div>
      )}

      {error && (
        <div
          style={{
            padding: 12,
            marginBottom: 16,
            backgroundColor: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: 4,
            color: 'var(--data-negative, #B01E1E)',
            fontSize: 14,
          }}
        >
          {error}
        </div>
      )}

      {!loading && history.length === 0 && (
        <div style={{ textAlign: 'center', padding: 32 }}>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            No search history yet
          </p>
        </div>
      )}

      {!loading && history.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {history.map(item => (
            <div
              key={item.id}
              style={{
                padding: 12,
                backgroundColor: 'var(--color-surface-1)',
                border: '1px solid var(--border-default)',
                borderRadius: 4,
              }}
            >
              <div style={{ color: 'var(--color-text-primary)', fontSize: 14, fontWeight: 500 }}>
                {item.query}
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                {item.category && (
                  <span
                    style={{
                      fontSize: 12,
                      padding: '2px 8px',
                      backgroundColor: 'var(--accent-primary)',
                      color: 'white',
                      borderRadius: 2,
                    }}
                  >
                    {item.category}
                  </span>
                )}
                <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                  {new Date(item.searchedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export function UserPreferencesSection() {
  const { preferences, update, set } = useUserPreferences();
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>(
    (preferences.theme as 'light' | 'dark' | 'auto') || 'auto'
  );

  useEffect(() => {
    if (preferences.theme) {
      setTheme(preferences.theme as 'light' | 'dark' | 'auto');
    }
  }, [preferences.theme]);

  const handleThemeChange = async (newTheme: 'light' | 'dark' | 'auto') => {
    setTheme(newTheme);
    await set('theme', newTheme);
  };

  const handleEmailNotificationsChange = async (value: boolean) => {
    await set('emailNotifications', value);
  };

  return (
    <section
      className="rounded-sm p-6"
      style={{
        border: '1px solid var(--border-default)',
        backgroundColor: 'var(--color-surface-0)',
      }}
    >
      <h2
        className="text-xl font-bold mb-6"
        style={{ fontFamily: 'var(--font-ui)', color: 'var(--color-text-primary)' }}
      >
        Preferences
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
        {/* Theme Preference */}
        <div>
          <label
            style={{
              display: 'block',
              fontSize: 14,
              fontWeight: 600,
              color: 'var(--color-text-secondary)',
              marginBottom: 8,
            }}
          >
            Appearance
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {['light', 'dark', 'auto'].map(t => (
              <label
                key={t}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 14,
                  color: 'var(--color-text-primary)',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="radio"
                  name="theme"
                  value={t}
                  checked={theme === t}
                  onChange={() => handleThemeChange(t as 'light' | 'dark' | 'auto')}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ textTransform: 'capitalize' }}>
                  {t === 'auto' ? 'System' : t}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Email Notifications */}
        <div>
          <label
            style={{
              display: 'block',
              fontSize: 14,
              fontWeight: 600,
              color: 'var(--color-text-secondary)',
              marginBottom: 8,
            }}
          >
            Notifications
          </label>
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 14,
              color: 'var(--color-text-primary)',
              cursor: 'pointer',
            }}
          >
            <input
              type="checkbox"
              checked={preferences.emailNotifications ?? true}
              onChange={e => handleEmailNotificationsChange(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            Email me updates
          </label>
        </div>
      </div>
    </section>
  );
}
