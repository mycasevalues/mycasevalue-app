import { Metadata } from 'next';
import DataQualityStatus from '../../components/DataQualityStatus';

export const metadata: Metadata = {
  title: 'Admin Dashboard | CaseCheck',
  description: 'Administrative dashboard for CaseCheck operations.',
  robots: { index: false, follow: false },
};

/**
 * Admin Dashboard
 *
 * Centralized admin interface for monitoring and managing CaseCheck operations.
 * Currently includes data quality monitoring widget.
 *
 * TODO: Add role-based access control (RBAC) when auth system is fully integrated.
 * TODO: Add more widgets as needed (system health, analytics, user management, etc.)
 */
export default function AdminPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7F8FA' }}>
      {/* Navy Header */}
      <header style={{ backgroundColor: '#1B3A5C' }} className="text-white py-8">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
            Admin Dashboard
          </h1>
          <p className="text-sm mt-2 opacity-90">Manage CaseCheck operations and monitor system health</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* TODO: Add role-based access control message */}
        {/* {!isAdmin && (
          <div className="bg-data-bg-neg border border-data-negative rounded-card p-4 mb-6">
            <p className="text-data-negative font-medium">
              You do not have admin access to this page.
            </p>
          </div>
        )} */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Data Quality Monitoring Widget */}
          <div className="lg:col-span-1">
            <DataQualityStatus />
          </div>

          {/* Changelog Editor Widget */}
          <div className="lg:col-span-1">
            <div className="rounded-card bg-surface-1 border border-border-light p-6">
              <h2 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Changelog Editor
              </h2>
              <p className="text-sm text-text-color-secondary mb-4">
                Manage platform updates and data changelog entries
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-text-color-muted mb-2 uppercase tracking-wide">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Q1 2025 FJC Data Refresh"
                    disabled
                    className="w-full px-3 py-2 border border-border-light rounded-card bg-surface-0 text-sm text-text-color-secondary"
                    style={{ opacity: 0.6 }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-color-muted mb-2 uppercase tracking-wide">
                    Description
                  </label>
                  <textarea
                    placeholder="Describe the change or update..."
                    disabled
                    className="w-full px-3 py-2 border border-border-light rounded-card bg-surface-0 text-sm text-text-color-secondary"
                    rows={3}
                    style={{ opacity: 0.6 }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-color-muted mb-2 uppercase tracking-wide">
                    Update Type
                  </label>
                  <select
                    disabled
                    className="w-full px-3 py-2 border border-border-light rounded-card bg-surface-0 text-sm text-text-color-secondary"
                    style={{ opacity: 0.6 }}
                  >
                    <option>data_update</option>
                    <option>feature</option>
                    <option>fix</option>
                  </select>
                </div>
                <button
                  disabled
                  className="w-full py-2 px-3 rounded-card bg-border-light text-text-color-muted text-sm font-semibold opacity-50 cursor-not-allowed"
                >
                  Add Changelog Entry
                </button>
              </div>
              <p className="text-xs text-text-color-secondary mt-4 p-2 bg-surface-0 rounded border border-border-light">
                TODO: Integrate with Supabase to persist changelog entries to database
              </p>
            </div>
          </div>

          {/* TODO: Add more admin widgets here */}
          {/* System Health Widget */}
          {/* Analytics Overview */}
          {/* Recent Activity Log */}
          {/* User Management */}

          {/* Placeholder for future widgets */}
          <div className="rounded-card bg-surface-1 border border-border-light p-6 flex items-center justify-center min-h-64">
            <div className="text-center">
              <p className="text-text-color-muted text-sm mb-2">More admin features coming soon</p>
              <p className="text-text-color-secondary text-xs">System health, analytics, user management, etc.</p>
            </div>
          </div>
        </div>

        {/* Development Notes */}
        {process.env.NODE_ENV !== 'production' && (
          <div className="mt-8 p-4 bg-surface-0 border border-border-light rounded-card text-xs text-text-color-secondary font-mono">
            <p className="font-semibold mb-2">Development Notes:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Admin auth currently uses dev-local-testing header in dev mode</li>
              <li>TODO: Implement proper RBAC via Supabase auth roles</li>
              <li>TODO: Add ADMIN_DATA_QUALITY_TOKEN env var for production</li>
              <li>TODO: Integrate Resend for email notifications</li>
              <li>Data quality checks run in-process on REAL_DATA in lib/realdata.ts</li>
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
