'use client';

import { useState } from 'react';
import NaturalLanguageSearch from './NaturalLanguageSearch';
import SemanticCaseSearch from './SemanticCaseSearch';

type TabType = 'natural' | 'semantic';

/**
 * Search Tabs Component - Client wrapper for tabbed search interface
 */
export default function SearchTabs() {
  const [activeTab, setActiveTab] = useState<TabType>('semantic');

  const tabs: Array<{ id: TabType; label: string; icon: string }> = [
    { id: 'semantic', label: 'Describe your situation', icon: '' },
    { id: 'natural', label: 'Natural language search', icon: '' },
  ];

  return (
    <div>
      {/* Tab Navigation */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '24px',
          borderBottom: '2px solid var(--border-default)',
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '12px 16px',
              fontSize: '14px',
              fontWeight: activeTab === tab.id ? '600' : '500',
              fontFamily: 'var(--font-body)',
              color: activeTab === tab.id ? 'var(--accent-primary)' : '#666',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === tab.id ? '3px solid var(--accent-primary)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.color = 'var(--accent-primary-hover)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.color = '#666';
              }
            }}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'semantic' && <SemanticCaseSearch />}
      {activeTab === 'natural' && <NaturalLanguageSearch />}
    </div>
  );
}
