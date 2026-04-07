import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Settings | MyCaseValue',
  description: 'Manage your MyCaseValue account settings and preferences.',
  robots: { index: false, follow: false },
};

export default function SettingsPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7F8FA' }}>
      <style>{`
        .settings-nav-link:hover {
          background-color: #F7F8FA;
        }

        .settings-link-button:hover {
          background-color: #F7F8FA;
        }
      `}</style>
      {/* Navy Header */}
      <header style={{ backgroundColor: '#1B3A5C' }} className="text-white py-8">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
            Settings
          </h1>
          <p className="text-sm mt-2 opacity-90">Manage your account and preferences</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <nav className="lg:col-span-1">
            <div
              className="rounded-sm p-4 space-y-1"
              style={{
                border: '1px solid #E5E7EB',
                backgroundColor: 'white',
              }}
            >
              {[
                { label: 'Account Information', id: 'account' },
                { label: 'Preferences', id: 'preferences' },
                { label: 'Data & Privacy', id: 'privacy' },
                { label: 'Appearance', id: 'appearance' },
                { label: 'Subscription', id: 'subscription' },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="settings-nav-link block px-3 py-2 text-sm rounded-sm transition-colors"
                  style={{
                    color: '#4B5563',
                  }}
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
                border: '1px solid #E5E7EB',
                backgroundColor: 'white',
              }}
            >
              <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)', color: '#1B3A5C' }}>
                Account Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#4B5563' }}>
                    Full Name
                  </label>
                  <div
                    className="px-3 py-2 rounded-sm text-sm"
                    style={{
                      backgroundColor: '#F7F8FA',
                      color: '#4B5563',
                      border: '1px solid #E5E7EB',
                    }}
                  >
                    John Federal Analyst
                  </div>
                  <p className="text-xs mt-2" style={{ color: '#6C757D' }}>
                    Display only. Contact support to change.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#4B5563' }}>
                    Email Address
                  </label>
                  <div
                    className="px-3 py-2 rounded-sm text-sm"
                    style={{
                      backgroundColor: '#F7F8FA',
                      color: '#4B5563',
                      border: '1px solid #E5E7EB',
                    }}
                  >
                    john@casecheck.legal
                  </div>
                  <p className="text-xs mt-2" style={{ color: '#6C757D' }}>
                    Primary account email
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#4B5563' }}>
                    Account Created
                  </label>
                  <div
                    className="px-3 py-2 rounded-sm text-sm"
                    style={{
                      backgroundColor: '#F7F8FA',
                      color: '#4B5563',
                      border: '1px solid #E5E7EB',
                    }}
                  >
                    January 15, 2024
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#4B5563' }}>
                    Account Type
                  </label>
                  <div
                    className="px-3 py-2 rounded-sm text-sm"
                    style={{
                      backgroundColor: '#F7F8FA',
                      color: '#4B5563',
                      border: '1px solid #E5E7EB',
                    }}
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
                border: '1px solid #E5E7EB',
                backgroundColor: 'white',
              }}
            >
              <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)', color: '#1B3A5C' }}>
                Preferences
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#4B5563' }}>
                    Default District
                  </label>
                  <select
                    className="w-full px-3 py-2 rounded-sm text-sm"
                    style={{
                      border: '1px solid #E5E7EB',
                      backgroundColor: 'white',
                      color: '#4B5563',
                    }}
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
                  <label className="block text-sm font-semibold mb-3" style={{ color: '#4B5563' }}>
                    Preferred Case Types
                  </label>
                  <div className="space-y-2">
                    {['Patent', 'Copyright', 'Trademark', 'Antitrust', 'Securities', 'Employment'].map((caseType) => (
                      <label key={caseType} className="flex items-center text-sm">
                        <input
                          type="checkbox"
                          className="mr-3 rounded-sm"
                          defaultChecked={caseType === 'Patent'}
                          style={{
                            accentColor: '#0A66C2',
                          }}
                        />
                        <span style={{ color: '#4B5563' }}>{caseType}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: '#4B5563' }}>
                    Notification Preferences
                  </label>
                  <div className="space-y-2">
                    {[
                      { label: 'Email notifications for relevant case updates', checked: true },
                      { label: 'Weekly litigation digest', checked: true },
                      { label: 'New judge assignment alerts', checked: false },
                    ].map((pref) => (
                      <label key={pref.label} className="flex items-center text-sm">
                        <input
                          type="checkbox"
                          className="mr-3 rounded-sm"
                          defaultChecked={pref.checked}
                          style={{
                            accentColor: '#0A66C2',
                          }}
                        />
                        <span style={{ color: '#4B5563' }}>{pref.label}</span>
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
                border: '1px solid #E5E7EB',
                backgroundColor: 'white',
              }}
            >
              <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)', color: '#1B3A5C' }}>
                Data & Privacy
              </h2>
              <p className="text-sm mb-6" style={{ color: '#4B5563' }}>
                Manage how your data is collected, used, and protected.
              </p>
              <div className="space-y-3">
                <a
                  href="/privacy"
                  className="settings-link-button block px-4 py-3 rounded-sm text-sm font-medium transition-colors"
                  style={{
                    color: '#004182',
                    border: '1px solid #E5E7EB',
                    backgroundColor: 'white',
                  }}
                >
                  View Privacy Policy {'>'}
                </a>
                <a
                  href="/terms"
                  className="settings-link-button block px-4 py-3 rounded-sm text-sm font-medium transition-colors"
                  style={{
                    color: '#004182',
                    border: '1px solid #E5E7EB',
                    backgroundColor: 'white',
                  }}
                >
                  Terms of Service {'>'}
                </a>
                <button
                  className="settings-link-button w-full px-4 py-3 rounded-sm text-sm font-medium transition-colors text-left"
                  style={{
                    color: '#004182',
                    border: '1px solid #E5E7EB',
                    backgroundColor: 'white',
                  }}
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
                border: '1px solid #E5E7EB',
                backgroundColor: 'white',
              }}
            >
              <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)', color: '#1B3A5C' }}>
                Appearance
              </h2>
              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: '#4B5563' }}>
                  View Density
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'compact', label: 'Compact' },
                    { value: 'comfortable', label: 'Comfortable' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center text-sm">
                      <input
                        type="radio"
                        name="density"
                        value={option.value}
                        defaultChecked={option.value === 'comfortable'}
                        className="mr-3"
                        style={{
                          accentColor: '#0A66C2',
                        }}
                      />
                      <span style={{ color: '#4B5563' }}>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </section>

            {/* Subscription Section */}
            <section
              id="subscription"
              className="rounded-sm p-6"
              style={{
                border: '1px solid #E5E7EB',
                backgroundColor: 'white',
              }}
            >
              <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)', color: '#1B3A5C' }}>
                Subscription
              </h2>
              <div
                className="p-4 rounded-sm flex items-start justify-between"
                style={{
                  backgroundColor: '#F7F8FA',
                  border: '1px solid #E5E7EB',
                }}
              >
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: '#1B3A5C' }}>
                    MyCaseValue Free Launch
                  </h3>
                  <p className="text-sm" style={{ color: '#4B5563' }}>
                    Free access during public launch period. Premium features available during beta.
                  </p>
                </div>
                <div
                  className="px-3 py-1 rounded-sm text-sm font-semibold whitespace-nowrap ml-4"
                  style={{
                    backgroundColor: '#059669',
                    color: 'white',
                  }}
                >
                  Active
                </div>
              </div>
            </section>

            {/* Quick Links Section */}
            <section className="rounded-sm p-6" style={{ border: '1px solid #E5E7EB', backgroundColor: 'white' }}>
              <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)', color: '#1B3A5C' }}>
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
                    className="settings-link-button px-4 py-3 rounded-sm text-sm font-medium transition-colors"
                    style={{
                      color: '#004182',
                      border: '1px solid #E5E7EB',
                      backgroundColor: 'white',
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
