import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../lib/site-config';
import { SavedReportsSection, SearchHistorySection, UserPreferencesSection } from '../../components/UserDataManager';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage your MyCaseValue account settings and preferences.',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/settings` },
  openGraph: {
    title: 'Settings',
    description: 'Manage your MyCaseValue account settings and preferences.',
    url: `${SITE_URL}/settings`,
    type: 'website',
    siteName: 'MyCaseValue',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Settings',
    description: 'Manage your MyCaseValue account settings and preferences.',
  },
};

export default function SettingsPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--surf)' }}>
      <style>{`
        .settings-nav-link:hover {
          background-color: var(--surf);
        }

        .settings-link-button:hover {
          background-color: var(--surf);
        }
      `}</style>
      {/* Navy Header */}
      <header style={{ backgroundColor: 'var(--link)' }} className="text-white py-8">
        <div className="max-w-6xl mx-auto px-6">
          <h1 style={{ fontFamily: 'var(--font-legal)', fontSize: 28, fontWeight: 700 }}>
            Settings
          </h1>
          <p className="mt-2 opacity-90" style={{ fontSize: 14 }}>Manage your account and preferences</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <nav className="lg:col-span-1">
            <div
              className="rounded-sm p-4 space-y-1"
              style={{
                border: '1px solid var(--bdr)',
                backgroundColor: 'var(--card)',
              }}
            >
              {[
                { label: 'Account Information', id: 'account' },
                { label: 'Preferences', id: 'preferences' },
                { label: 'Data & Privacy', id: 'privacy' },
                { label: 'Saved Reports', id: 'saved-reports' },
                { label: 'Search History', id: 'search-history' },
                { label: 'User Preferences', id: 'user-prefs' },
                { label: 'Appearance', id: 'appearance' },
                { label: 'Subscription', id: 'subscription' },
              ].map((item) => (
                <a
 key={item.id}
 href={`#${item.id}`}
 className="settings-nav-link block px-3 py-2 rounded-sm transition-colors"
 style={{ color: 'var(--text2)', fontSize: 14 }}
 >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Account Information Section */}
            <section
              id="account"
              className="rounded-sm p-6"
              style={{
                border: '1px solid var(--bdr)',
                backgroundColor: 'var(--card)',
              }}
            >
              <h2 className="mb-6" style={{ fontFamily: 'var(--font-ui)', color: 'var(--text1)', fontSize: 20, fontWeight: 700 }}>
                Account Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2" style={{ color: 'var(--text2)', fontSize: 14, fontWeight: 600 }}>
                    Full Name
                  </label>
                  <div
 className="px-3 py-2 rounded-sm"
 style={{ backgroundColor: 'var(--surf)',
 color: 'var(--text2)',
 border: '1px solid var(--bdr)', fontSize: 14 }}
 >
                    John Federal Analyst
                  </div>
                  <p className="mt-2" style={{ color: 'var(--text-tertiary)', fontSize: 12 }}>
                    Display only. Contact support to change.
                  </p>
                </div>
                <div>
                  <label className="block mb-2" style={{ color: 'var(--text2)', fontSize: 14, fontWeight: 600 }}>
                    Email Address
                  </label>
                  <div
 className="px-3 py-2 rounded-sm"
 style={{ backgroundColor: 'var(--surf)',
 color: 'var(--text2)',
 border: '1px solid var(--bdr)', fontSize: 14 }}
 >
                    john@casecheck.legal
                  </div>
                  <p className="mt-2" style={{ color: 'var(--text-tertiary)', fontSize: 12 }}>
                    Primary account email
                  </p>
                </div>
                <div>
                  <label className="block mb-2" style={{ color: 'var(--text2)', fontSize: 14, fontWeight: 600 }}>
                    Account Created
                  </label>
                  <div
 className="px-3 py-2 rounded-sm"
 style={{ backgroundColor: 'var(--surf)',
 color: 'var(--text2)',
 border: '1px solid var(--bdr)', fontSize: 14 }}
 >
                    January 15, 2024
                  </div>
                </div>
                <div>
                  <label className="block mb-2" style={{ color: 'var(--text2)', fontSize: 14, fontWeight: 600 }}>
                    Account Type
                  </label>
                  <div
 className="px-3 py-2 rounded-sm"
 style={{ backgroundColor: 'var(--surf)',
 color: 'var(--text2)',
 border: '1px solid var(--bdr)', fontSize: 14 }}
 >
                    Research User
                  </div>
                </div>
              </div>
            </section>

            {/* Preferences Section */}
            <section
              id="preferences"
              className="rounded-sm p-6"
              style={{
                border: '1px solid var(--bdr)',
                backgroundColor: 'var(--card)',
              }}
            >
              <h2 className="mb-6" style={{ fontFamily: 'var(--font-ui)', color: 'var(--text1)', fontSize: 20, fontWeight: 700 }}>
                Preferences
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block mb-2" style={{ color: 'var(--text2)', fontSize: 14, fontWeight: 600 }}>
                    Default District
                  </label>
                  <select
 className="w-full px-3 py-2 rounded-sm"
 style={{ border: '1px solid var(--bdr)',
 backgroundColor: 'var(--card)',
 color: 'var(--text2)', fontSize: 14 }}
 >
                    <option>All Districts</option>
                    <option>N.D. California</option>
                    <option>C.D. California</option>
                    <option>S.D. California</option>
                    <option>D. Colorado</option>
                    <option>D. Delaware</option>
                    <option>D. Illinois</option>
                    <option>D. New York</option>
                    <option>E.D. New York</option>
                    <option>D. Texas</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-3" style={{ color: 'var(--text2)', fontSize: 14, fontWeight: 600 }}>
                    Preferred Case Types
                  </label>
                  <div className="space-y-2">
                    {['Patent', 'Copyright', 'Trademark', 'Antitrust', 'Securities', 'Employment'].map((caseType) => (
                      <label key={caseType} className="flex items-center" style={{ fontSize: 14 }}>
                        <input
                          type="checkbox"
                          className="mr-3 rounded-sm"
                          defaultChecked={caseType === 'Patent'}
                          style={{
                            accentColor: 'var(--link)',
                          }}
                        />
                        <span style={{ color: 'var(--text2)' }}>{caseType}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block mb-3" style={{ color: 'var(--text2)', fontSize: 14, fontWeight: 600 }}>
                    Notification Preferences
                  </label>
                  <div className="space-y-2">
                    {[
                      { label: 'Email notifications for relevant case updates', checked: true },
                      { label: 'Weekly litigation digest', checked: true },
                      { label: 'New judge assignment alerts', checked: false },
                    ].map((pref) => (
                      <label key={pref.label} className="flex items-center" style={{ fontSize: 14 }}>
                        <input
                          type="checkbox"
                          className="mr-3 rounded-sm"
                          defaultChecked={pref.checked}
                          style={{
                            accentColor: 'var(--link)',
                          }}
                        />
                        <span style={{ color: 'var(--text2)' }}>{pref.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Data & Privacy Section */}
            <section
              id="privacy"
              className="rounded-sm p-6"
              style={{
                border: '1px solid var(--bdr)',
                backgroundColor: 'var(--card)',
              }}
            >
              <h2 className="mb-6" style={{ fontFamily: 'var(--font-ui)', color: 'var(--text1)', fontSize: 20, fontWeight: 700 }}>
                Data & Privacy
              </h2>
              <p className="mb-6" style={{ color: 'var(--text2)', fontSize: 14 }}>
                Manage how your data is collected, used, and protected.
              </p>
              <div className="space-y-3">
                <a
 href="/privacy"
 className="settings-link-button block px-4 py-3 rounded-sm transition-colors"
 style={{ color: 'var(--gold)',
 border: '1px solid var(--bdr)',
 backgroundColor: 'var(--card)', fontSize: 14, fontWeight: 500 }}
 >
                  View Privacy Policy {'>'}
                </a>
                <a
 href="/terms"
 className="settings-link-button block px-4 py-3 rounded-sm transition-colors"
 style={{ color: 'var(--gold)',
 border: '1px solid var(--bdr)',
 backgroundColor: 'var(--card)', fontSize: 14, fontWeight: 500 }}
 >
                  Terms of Service {'>'}
                </a>
                <button
 className="settings-link-button w-full px-4 py-3 rounded-sm transition-colors text-left"
 style={{ color: 'var(--gold)',
 border: '1px solid var(--bdr)',
 backgroundColor: 'var(--card)', fontSize: 14, fontWeight: 500 }}
 >
                  Request Data Export
                </button>
              </div>
            </section>

            {/* Appearance Section */}
            <section
              id="appearance"
              className="rounded-sm p-6"
              style={{
                border: '1px solid var(--bdr)',
                backgroundColor: 'var(--card)',
              }}
            >
              <h2 className="mb-6" style={{ fontFamily: 'var(--font-ui)', color: 'var(--text1)', fontSize: 20, fontWeight: 700 }}>
                Appearance
              </h2>
              <div>
                <label className="block mb-3" style={{ color: 'var(--text2)', fontSize: 14, fontWeight: 600 }}>
                  View Density
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'compact', label: 'Compact' },
                    { value: 'comfortable', label: 'Comfortable' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center" style={{ fontSize: 14 }}>
                      <input
                        type="radio"
                        name="density"
                        value={option.value}
                        defaultChecked={option.value === 'comfortable'}
                        className="mr-3"
                        style={{
                          accentColor: 'var(--link)',
                        }}
                      />
                      <span style={{ color: 'var(--text2)' }}>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </section>

            {/* Saved Reports Section */}
            <div id="saved-reports">
              <SavedReportsSection />
            </div>

            {/* Search History Section */}
            <div id="search-history">
              <SearchHistorySection />
            </div>

            {/* User Preferences Section */}
            <div id="user-prefs">
              <UserPreferencesSection />
            </div>

            {/* Subscription Section */}
            <section
              id="subscription"
              className="rounded-sm p-6"
              style={{
                border: '1px solid var(--bdr)',
                backgroundColor: 'var(--card)',
              }}
            >
              <h2 className="mb-6" style={{ fontFamily: 'var(--font-ui)', color: 'var(--text1)', fontSize: 20, fontWeight: 700 }}>
                Subscription
              </h2>
              <div
                className="p-4 rounded-sm flex items-start justify-between"
                style={{
                  backgroundColor: 'var(--surf)',
                  border: '1px solid var(--bdr)',
                }}
              >
                <div>
                  <h3 className="mb-1" style={{ color: 'var(--text1)', fontWeight: 600 }}>
                    MyCaseValue Free Launch
                  </h3>
                  <p style={{ color: 'var(--text2)', fontSize: 14 }}>
                    Free access during public launch period. Premium features available during beta.
                  </p>
                </div>
                <div
 className="px-3 py-1 rounded-sm whitespace-nowrap ml-4"
 style={{ backgroundColor: 'var(--data-positive)',
 color: 'white', fontSize: 14, fontWeight: 600 }}
 >
                  Active
                </div>
              </div>
            </section>

            {/* Quick Links Section */}
            <section className="rounded-sm p-6" style={{ border: '1px solid var(--bdr)', backgroundColor: 'var(--card)' }}>
              <h2 className="mb-6" style={{ fontFamily: 'var(--font-ui)', color: 'var(--text1)', fontSize: 20, fontWeight: 700 }}>
                Quick Links
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: 'Search Cases', href: '/search' },
                  { label: 'Calculator', href: '/calculator' },
                  { label: 'Districts', href: '/districts' },
                  { label: 'Judges', href: '/judges' },
                  { label: 'Help Center', href: '/help' },
                  { label: 'Contact Support', href: '/support' },
                ].map((link) => (
                  <Link
 key={link.href}
 href={link.href}
 className="settings-link-button px-4 py-3 rounded-sm transition-colors"
 style={{ color: 'var(--gold)',
 border: '1px solid var(--bdr)',
 backgroundColor: 'var(--card)', fontSize: 14, fontWeight: 500 }}
 >
                    {link.label}
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
