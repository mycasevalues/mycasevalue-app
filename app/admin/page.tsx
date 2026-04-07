'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import CostMonitor from '@/components/admin/CostMonitor';

/**
 * Admin Panel
 *
 * Comprehensive administrative dashboard with sidebar navigation and multi-section management.
 *
 * TODO: Implement server-side auth check - verify user is admin in Supabase 'admins' table
 * TODO: Add proper RBAC via Supabase auth roles when fully integrated
 * TODO: Implement actual data persistence to Supabase for all sections
 * TODO: Add proper error handling and loading states for all API calls
 */

type SectionType = 'overview' | 'content' | 'data' | 'rules' | 'users' | 'email' | 'costs';

const COLORS = {
  primary: '#0A66C2',
  dark: '#004182',
  black: '#0f0f0f',
};

interface MetricCard {
  label: string;
  value: string;
}

interface SystemStatus {
  name: string;
  status: 'operational' | 'degraded' | 'down';
}

interface ActivityLog {
  id: string;
  action: string;
  timestamp: string;
  user: string;
}

interface BlogPost {
  id: string;
  title: string;
  status: string;
  date: string;
}

interface DataSource {
  name: string;
  lastRefresh: string;
  status: string;
}

interface User {
  id: string;
  email: string;
  role: string;
  lastActive: string;
  isAdmin: boolean;
}

interface EmailRecord {
  id: string;
  recipient: string;
  subject: string;
  sent: string;
}

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState<SectionType>('overview');
  const [localRulesJson, setLocalRulesJson] = useState('{\n  "rules": []\n}');
  const [rulesValidation, setRulesValidation] = useState<{ valid: boolean; error?: string }>({ valid: true });
  const [searchUserQuery, setSearchUserQuery] = useState('');

  const metrics: MetricCard[] = [
    { label: 'Total Cases', value: '4.1M+' },
    { label: 'Active NOS Codes', value: '84' },
    { label: 'Districts', value: '94' },
    { label: 'Monthly Visitors', value: '142K' },
    { label: 'API Calls Today', value: '892K' },
    { label: 'Active Users', value: '3,247' },
  ];

  const systemStatuses: SystemStatus[] = [
    { name: 'API Server', status: 'operational' },
    { name: 'Database', status: 'operational' },
    { name: 'Cache Layer', status: 'operational' },
  ];

  const activityLogs: ActivityLog[] = [
    { id: '1', action: 'Data refresh triggered', timestamp: '2026-04-07 14:30', user: 'Admin User' },
    { id: '2', action: 'Changelog entry added', timestamp: '2026-04-07 12:15', user: 'Admin User' },
    { id: '3', action: 'User role updated', timestamp: '2026-04-07 10:45', user: 'Admin User' },
    { id: '4', action: 'Email digest sent', timestamp: '2026-04-07 09:00', user: 'System' },
  ];

  const blogPosts: BlogPost[] = [
    { id: '1', title: 'Q2 2026 Data Update', status: 'published', date: '2026-04-01' },
    { id: '2', title: 'New District Coverage', status: 'draft', date: '2026-03-28' },
    { id: '3', title: 'API Performance Improvements', status: 'published', date: '2026-03-15' },
  ];

  const dataSources: DataSource[] = [
    { name: 'FJC Data', lastRefresh: '2026-04-07 08:00', status: 'current' },
    { name: 'EEOC Data', lastRefresh: '2026-04-06 18:30', status: 'current' },
    { name: 'NLRB Data', lastRefresh: '2026-04-05 14:15', status: 'current' },
    { name: 'OSHA Data', lastRefresh: '2026-04-04 11:00', status: 'current' },
  ];

  const users: User[] = [
    { id: '1', email: 'alice@casecheck.com', role: 'Admin', lastActive: '2026-04-07 15:30', isAdmin: true },
    { id: '2', email: 'bob@casecheck.com', role: 'Editor', lastActive: '2026-04-07 14:00', isAdmin: false },
    { id: '3', email: 'carol@example.com', role: 'Viewer', lastActive: '2026-04-06 10:20', isAdmin: false },
  ];

  const emailsSent: EmailRecord[] = [
    { id: '1', recipient: 'subscribers@list.com', subject: 'Weekly Digest', sent: '2026-04-07 06:00' },
    { id: '2', recipient: 'alerts@list.com', subject: 'New Cases Alert', sent: '2026-04-06 18:00' },
    { id: '3', recipient: 'subscribers@list.com', subject: 'Weekly Digest', sent: '2026-03-31 06:00' },
  ];

  const handleValidateRules = () => {
    try {
      JSON.parse(localRulesJson);
      setRulesValidation({ valid: true });
    } catch (error) {
      setRulesValidation({
        valid: false,
        error: error instanceof Error ? error.message : 'Invalid JSON',
      });
    }
  };

  const handleSaveRules = () => {
    handleValidateRules();
    if (rulesValidation.valid) {
      // TODO: Persist localRulesJson to Supabase or backend
      console.log('Saving rules:', localRulesJson);
    }
  };

  const sidebarItems = [
    { id: 'overview', label: 'Platform Overview', icon: 'Chart' },
    { id: 'content', label: 'Content Manager', icon: 'File' },
    { id: 'data', label: 'Data Manager', icon: 'Database' },
    { id: 'rules', label: 'Local Rules Editor', icon: 'Settings' },
    { id: 'users', label: 'User Management', icon: 'Users' },
    { id: 'email', label: 'Email Manager', icon: 'Mail' },
    { id: 'costs', label: 'Cost Monitoring', icon: 'DollarSign' },
  ] as const;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '240px',
          backgroundColor: COLORS.dark,
          color: 'white',
          padding: '24px 0',
          position: 'fixed',
          height: '100vh',
          overflowY: 'auto',
          borderRight: `1px solid ${COLORS.black}`,
        }}
      >
        <div style={{ padding: '0 20px', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 8px 0' }}>CaseCheck</h1>
          <p style={{ fontSize: '12px', opacity: 0.7, margin: 0 }}>Admin Panel</p>
        </div>

        <nav>
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id as SectionType)}
              style={{
                width: '100%',
                padding: '12px 20px',
                border: 'none',
                backgroundColor: isActiveItem(item.id as SectionType, activeSection)
                  ? COLORS.primary
                  : 'transparent',
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px',
                textAlign: 'left',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => {
                if (!isActiveItem(item.id as SectionType, activeSection)) {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActiveItem(item.id as SectionType, activeSection)) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ marginLeft: '240px', flex: 1, padding: '32px', overflowY: 'auto' }}>
        {/* Header */}
        <header style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 8px 0', color: COLORS.black }}>
            {getSectionTitle(activeSection)}
          </h1>
          <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
            {getSectionDescription(activeSection)}
          </p>
        </header>

        {/* Platform Overview Section */}
        {activeSection === 'overview' && (
          <div>
            {/* Metrics Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
                marginBottom: '32px',
              }}
            >
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    padding: '20px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  }}
                >
                  <p style={{ fontSize: '12px', color: '#999', margin: '0 0 8px 0', textTransform: 'uppercase' }}>
                    {metric.label}
                  </p>
                  <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: COLORS.primary }}>
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>

            {/* System Status */}
            <div
              style={{
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '24px',
                marginBottom: '32px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0', color: COLORS.black }}>
                System Status
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                {systemStatuses.map((status, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px',
                      backgroundColor: '#f9f9f9',
                      borderRadius: '6px',
                    }}
                  >
                    <div
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: '#22c55e',
                        marginRight: '12px',
                      }}
                    />
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: '500', margin: 0 }}>{status.name}</p>
                      <p style={{ fontSize: '12px', color: '#22c55e', margin: '2px 0 0 0' }}>Operational</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div
              style={{
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0', color: COLORS.black }}>
                Recent Activity
              </h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                      <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '12px', fontWeight: '600', color: '#666' }}>
                        Action
                      </th>
                      <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '12px', fontWeight: '600', color: '#666' }}>
                        User
                      </th>
                      <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '12px', fontWeight: '600', color: '#666' }}>
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {activityLogs.map((log) => (
                      <tr key={log.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                        <td style={{ padding: '12px 0', fontSize: '14px' }}>{log.action}</td>
                        <td style={{ padding: '12px 0', fontSize: '14px' }}>{log.user}</td>
                        <td style={{ padding: '12px 0', fontSize: '14px', color: '#666' }}>{log.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Content Manager Section */}
        {activeSection === 'content' && (
          <div>
            {/* Blog Editor */}
            <div
              style={{
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '24px',
                marginBottom: '32px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0', color: COLORS.black }}>
                Blog Editor
              </h2>
              <p style={{ fontSize: '14px', color: '#666', margin: '0 0 16px 0' }}>
                Manage blog posts and articles
              </p>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                      <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '12px', fontWeight: '600', color: '#666' }}>
                        Title
                      </th>
                      <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '12px', fontWeight: '600', color: '#666' }}>
                        Status
                      </th>
                      <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '12px', fontWeight: '600', color: '#666' }}>
                        Date
                      </th>
                      <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '12px', fontWeight: '600', color: '#666' }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogPosts.map((post) => (
                      <tr key={post.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                        <td style={{ padding: '12px 0', fontSize: '14px' }}>{post.title}</td>
                        <td style={{ padding: '12px 0', fontSize: '14px' }}>
                          <span
                            style={{
                              display: 'inline-block',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontSize: '12px',
                              backgroundColor:
                                post.status === 'published' ? '#d1fae5' : '#fef3c7',
                              color: post.status === 'published' ? '#065f46' : '#92400e',
                            }}
                          >
                            {post.status}
                          </span>
                        </td>
                        <td style={{ padding: '12px 0', fontSize: '14px', color: '#666' }}>{post.date}</td>
                        <td style={{ padding: '12px 0' }}>
                          <button
                            style={{
                              padding: '6px 12px',
                              backgroundColor: COLORS.primary,
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '12px',
                              fontWeight: '500',
                            }}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Changelog Editor */}
            <div
              style={{
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '24px',
                marginBottom: '32px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0', color: COLORS.black }}>
                Changelog Editor
              </h2>
              <p style={{ fontSize: '14px', color: '#666', margin: '0 0 16px 0' }}>
                Add and manage platform updates
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#333', marginBottom: '6px' }}>
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Q2 2026 FJC Data Refresh"
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '4px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#333', marginBottom: '6px' }}>
                    Update Type
                  </label>
                  <select
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '4px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option>data_update</option>
                    <option>feature</option>
                    <option>fix</option>
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#333', marginBottom: '6px' }}>
                  Description
                </label>
                <textarea
                  placeholder="Describe the change or update..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <button
                style={{
                  padding: '8px 16px',
                  backgroundColor: COLORS.primary,
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                }}
              >
                Add Changelog Entry
              </button>
              <p style={{ fontSize: '12px', color: '#666', margin: '12px 0 0 0' }}>
                TODO: Integrate with Supabase to persist changelog entries
              </p>
            </div>

            {/* Whats New Editor */}
            <div
              style={{
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0', color: COLORS.black }}>
                What's New Editor
              </h2>
              <p style={{ fontSize: '14px', color: '#666', margin: '0 0 16px 0' }}>
                Manage featured news and updates for homepage
              </p>
              <div style={{ padding: '32px', backgroundColor: '#f9f9f9', borderRadius: '6px', textAlign: 'center' }}>
                <p style={{ fontSize: '14px', color: '#999', margin: 0 }}>No entries yet. Create your first one.</p>
              </div>
            </div>
          </div>
        )}

        {/* Data Manager Section */}
        {activeSection === 'data' && (
          <div>
            {/* Manual Refresh Triggers */}
            <div
              style={{
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '24px',
                marginBottom: '32px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0', color: COLORS.black }}>
                Manual Refresh Triggers
              </h2>
              <p style={{ fontSize: '14px', color: '#666', margin: '0 0 16px 0' }}>
                Manually trigger data refreshes for each source
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {['FJC Data', 'EEOC Data', 'NLRB Data', 'OSHA Data'].map((source) => (
                  <button
                    key={source}
                    style={{
                      padding: '12px 16px',
                      backgroundColor: COLORS.primary,
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500',
                    }}
                  >
                    Refresh {source}
                  </button>
                ))}
              </div>
              <p style={{ fontSize: '12px', color: '#666', margin: '12px 0 0 0' }}>
                TODO: Implement actual API calls to refresh data sources
              </p>
            </div>

            {/* Data Quality Check */}
            <div
              style={{
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '24px',
                marginBottom: '32px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0', color: COLORS.black }}>
                Data Quality Check
              </h2>
              <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#f0fdf4', borderRadius: '6px', border: '1px solid #d1fae5' }}>
                <p style={{ fontSize: '14px', color: '#065f46', margin: 0 }}>
                  Last check: 2026-04-07 at 13:45 - All systems nominal
                </p>
              </div>
              <button
                style={{
                  padding: '8px 16px',
                  backgroundColor: COLORS.primary,
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                }}
              >
                Run Quality Check Now
              </button>
            </div>

            {/* Last Run Times */}
            <div
              style={{
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0', color: COLORS.black }}>
                Last Refresh Times
              </h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                      <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '12px', fontWeight: '600', color: '#666' }}>
                        Data Source
                      </th>
                      <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '12px', fontWeight: '600', color: '#666' }}>
                        Last Refresh
                      </th>
                      <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '12px', fontWeight: '600', color: '#666' }}>
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataSources.map((source) => (
                      <tr key={source.name} style={{ borderBottom: '1px solid #f0f0f0' }}>
                        <td style={{ padding: '12px 0', fontSize: '14px' }}>{source.name}</td>
                        <td style={{ padding: '12px 0', fontSize: '14px', color: '#666' }}>{source.lastRefresh}</td>
                        <td style={{ padding: '12px 0' }}>
                          <span
                            style={{
                              display: 'inline-block',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontSize: '12px',
                              backgroundColor: '#d1fae5',
                              color: '#065f46',
                            }}
                          >
                            Current
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Local Rules Editor Section */}
        {activeSection === 'rules' && (
          <div>
            <div
              style={{
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0', color: COLORS.black }}>
                Local Rules JSON Editor
              </h2>
              <p style={{ fontSize: '14px', color: '#666', margin: '0 0 16px 0' }}>
                Edit local rules data in JSON format
              </p>

              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#333', marginBottom: '6px' }}>
                Rules JSON
              </label>
              <textarea
                value={localRulesJson}
                onChange={(e) => setLocalRulesJson(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  fontSize: '13px',
                  fontFamily: 'monospace',
                  marginBottom: '12px',
                  boxSizing: 'border-box',
                }}
                rows={12}
              />

              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                <button
                  onClick={handleValidateRules}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#6b7280',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                  }}
                >
                  Validate
                </button>
                <button
                  onClick={handleSaveRules}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: COLORS.primary,
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                  }}
                >
                  Save Rules
                </button>
              </div>

              <div
                style={{
                  padding: '12px',
                  borderRadius: '4px',
                  backgroundColor: rulesValidation.valid ? '#f0fdf4' : '#fef2f2',
                  border: `1px solid ${rulesValidation.valid ? '#d1fae5' : '#fecaca'}`,
                }}
              >
                <p
                  style={{
                    fontSize: '13px',
                    color: rulesValidation.valid ? '#065f46' : '#991b1b',
                    margin: 0,
                  }}
                >
                  {rulesValidation.valid
                    ? 'JSON is valid'
                    : `Validation error: ${rulesValidation.error}`}
                </p>
              </div>

              <p style={{ fontSize: '12px', color: '#666', margin: '12px 0 0 0' }}>
                TODO: Persist rules to Supabase when saved
              </p>
            </div>
          </div>
        )}

        {/* User Management Section */}
        {activeSection === 'users' && (
          <div>
            <div
              style={{
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0', color: COLORS.black }}>
                User Management
              </h2>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#333', marginBottom: '6px' }}>
                  Search Users
                </label>
                <input
                  type="text"
                  placeholder="Search by email..."
                  value={searchUserQuery}
                  onChange={(e) => setSearchUserQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '4px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                      <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '12px', fontWeight: '600', color: '#666' }}>
                        Email
                      </th>
                      <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '12px', fontWeight: '600', color: '#666' }}>
                        Role
                      </th>
                      <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '12px', fontWeight: '600', color: '#666' }}>
                        Last Active
                      </th>
                      <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '12px', fontWeight: '600', color: '#666' }}>
                        Admin
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                        <td style={{ padding: '12px 0', fontSize: '14px' }}>{user.email}</td>
                        <td style={{ padding: '12px 0', fontSize: '14px' }}>{user.role}</td>
                        <td style={{ padding: '12px 0', fontSize: '14px', color: '#666' }}>{user.lastActive}</td>
                        <td style={{ padding: '12px 0' }}>
                          <input
                            type="checkbox"
                            checked={user.isAdmin}
                            onChange={() => {
                              // TODO: Update user admin status in Supabase
                            }}
                            style={{ cursor: 'pointer' }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p style={{ fontSize: '12px', color: '#666', margin: '12px 0 0 0' }}>
                TODO: Add Supabase integration for user management
              </p>
            </div>
          </div>
        )}

        {/* Email Manager Section */}
        {activeSection === 'email' && (
          <div>
            {/* Email Stats */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '16px',
                marginBottom: '32px',
              }}
            >
              <div
                style={{
                  backgroundColor: 'white',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: '20px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                }}
              >
                <p style={{ fontSize: '12px', color: '#999', margin: '0 0 8px 0', textTransform: 'uppercase' }}>
                  Subscriber Count
                </p>
                <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: COLORS.primary }}>
                  24,847
                </p>
              </div>
              <div
                style={{
                  backgroundColor: 'white',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: '20px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                }}
              >
                <p style={{ fontSize: '12px', color: '#999', margin: '0 0 8px 0', textTransform: 'uppercase' }}>
                  This Month
                </p>
                <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: COLORS.primary }}>
                  12
                </p>
              </div>
            </div>

            {/* Recent Emails */}
            <div
              style={{
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '24px',
                marginBottom: '32px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0', color: COLORS.black }}>
                Recent Emails Sent
              </h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                      <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '12px', fontWeight: '600', color: '#666' }}>
                        Recipient
                      </th>
                      <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '12px', fontWeight: '600', color: '#666' }}>
                        Subject
                      </th>
                      <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '12px', fontWeight: '600', color: '#666' }}>
                        Sent
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {emailsSent.map((email) => (
                      <tr key={email.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                        <td style={{ padding: '12px 0', fontSize: '14px' }}>{email.recipient}</td>
                        <td style={{ padding: '12px 0', fontSize: '14px' }}>{email.subject}</td>
                        <td style={{ padding: '12px 0', fontSize: '14px', color: '#666' }}>{email.sent}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Test Digest */}
            <div
              style={{
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0', color: COLORS.black }}>
                Send Test Email
              </h2>
              <p style={{ fontSize: '14px', color: '#666', margin: '0 0 16px 0' }}>
                Send a test digest email to preview content
              </p>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#333', marginBottom: '6px' }}>
                  Recipient Email
                </label>
                <input
                  type="email"
                  placeholder="test@example.com"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '4px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <button
                style={{
                  padding: '8px 16px',
                  backgroundColor: COLORS.primary,
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                }}
              >
                Send Test Digest
              </button>
              <p style={{ fontSize: '12px', color: '#666', margin: '12px 0 0 0' }}>
                TODO: Integrate with Resend email service
              </p>
            </div>
          </div>
        )}

        {/* Cost Monitoring Section */}
        {activeSection === 'costs' && (
          <div>
            <CostMonitor />
          </div>
        )}
      </main>
    </div>
  );
}

function isActiveItem(id: SectionType, active: SectionType): boolean {
  return id === active;
}

function getSectionTitle(section: SectionType): string {
  const titles: Record<SectionType, string> = {
    overview: 'Platform Overview',
    content: 'Content Manager',
    data: 'Data Manager',
    rules: 'Local Rules Editor',
    users: 'User Management',
    email: 'Email Manager',
    costs: 'Cost Monitoring',
  };
  return titles[section];
}

function getSectionDescription(section: SectionType): string {
  const descriptions: Record<SectionType, string> = {
    overview: 'View platform metrics, system status, and recent activity',
    content: 'Manage blog posts, changelogs, and news updates',
    data: 'Trigger data refreshes and monitor data quality',
    rules: 'Edit and manage local rules configuration',
    users: 'Manage user accounts and permissions',
    email: 'Monitor emails and manage subscriber communications',
    costs: 'Track service costs and monthly spending across all platforms',
  };
  return descriptions[section];
}
