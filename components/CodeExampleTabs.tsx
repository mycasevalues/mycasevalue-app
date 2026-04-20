'use client';

import { useState } from 'react';
import { SITE_URL } from '@/lib/site-config';

const codeExamples = {
  javascript: `const apiKey = 'your_api_key_here';
const baseUrl = '${SITE_URL}/api/v1';

async function getCaseStatistics(nosCode) {
  const url = \`\${baseUrl}/cases/nos/\${nosCode}\`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': \`Bearer \${apiKey}\`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(\`API Error: \${response.status}\`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Request failed:', error);
  }
}

// Get statistics for Personal Injury (442)
getCaseStatistics('442');`,

  python: `import requests

api_key = 'your_api_key_here'
base_url = '${SITE_URL}/api/v1'

def get_case_statistics(nos_code):
    url = f'{base_url}/cases/nos/{nos_code}'
    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json'
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        print('Case Statistics:', data)
        return data
    except requests.exceptions.RequestException as error:
        print(f'Request failed: {error}')

# Get statistics for Personal Injury (442)
get_case_statistics('442')`,

  curl: `curl -X GET "${SITE_URL}/api/v1/cases/nos/442" \\
  -H "Authorization: Bearer your_api_key_here" \\
  -H "Content-Type: application/json"`,
};

type Language = 'javascript' | 'python' | 'curl';

export default function CodeExampleTabs() {
  const [activeTab, setActiveTab] = useState<Language>('javascript');

  return (
    <div
      style={{
        background: 'var(--card)',
        borderRadius: '4px',
        border: '1px solid var(--bdr)',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      }}
    >
      {/* Tab Navigation */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid var(--bdr)',
          background: 'var(--surf)',
        }}
      >
        {Object.keys(codeExamples).map((lang) => (
          <button
            key={lang}
            onClick={() => setActiveTab(lang as Language)}
            style={{
              flex: 1,
              padding: '12px 16px',
              fontSize: '14px',
              fontWeight: activeTab === lang ? 600 : 500,
              color: activeTab === lang ? 'var(--link)' : 'var(--text2)',
              background: activeTab === lang ? 'var(--card)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === lang ? '2px solid var(--link)' : 'none',
              cursor: 'pointer',
              transition: 'all 200ms ease',
              fontFamily: 'var(--font-heading)',
              textTransform: 'capitalize',
            }}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Code Display */}
      <div style={{ padding: '24px 24px' }}>
        <pre
          style={{
            margin: 0,
            padding: '12px 14px',
            backgroundColor: 'var(--chrome-bg, #1B2D45)',
            color: 'var(--text-disabled)',
            fontSize: '12px',
            lineHeight: 1.6,
            fontFamily: 'var(--font-mono)',
            overflowX: 'auto',
            borderRadius: '4px',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
          }}
        >
          {codeExamples[activeTab]}
        </pre>
      </div>
    </div>
  );
}
