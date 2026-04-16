'use client';

import { useState } from 'react';

interface MonitoredCase {
  id: string;
  caseNumber: string;
  court: string;
  dateAdded: string;
  lastActivity: string;
  status: 'active' | 'inactive' | 'closed';
}

const SAMPLE_CASES: MonitoredCase[] = [
  {
    id: '1',
    caseNumber: '1:23-cv-01234',
    court: 'N.D. California',
    dateAdded: '2024-03-15',
    lastActivity: '2024-04-05',
    status: 'active',
  },
  {
    id: '2',
    caseNumber: '2:22-cv-05678',
    court: 'S.D. New York',
    dateAdded: '2024-01-20',
    lastActivity: '2024-04-02',
    status: 'active',
  },
  {
    id: '3',
    caseNumber: '3:21-cv-09012',
    court: 'C.D. Illinois',
    dateAdded: '2023-11-10',
    lastActivity: '2024-03-28',
    status: 'inactive',
  },
  {
    id: '4',
    caseNumber: '4:20-cv-03456',
    court: 'D. Texas',
    dateAdded: '2023-06-05',
    lastActivity: '2024-02-15',
    status: 'closed',
  },
];

export default function PACERMonitor() {
  const [cases, setCases] = useState<MonitoredCase[]>(SAMPLE_CASES);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const validateCaseNumber = (num: string): boolean => {
    const pattern = /^\d{1,2}:\d{2}-[a-z]{2}-\d{5}$/i;
    return pattern.test(num);
  };

  const handleAddCase = () => {
    const trimmed = inputValue.trim().toLowerCase();
    if (!trimmed) {
      setError('Please enter a case number');
      return;
    }

    if (!validateCaseNumber(trimmed)) {
      setError('Invalid format. Use: 1:23-cv-01234');
      return;
    }

    if (cases.some((c) => c.caseNumber === trimmed)) {
      setError('This case is already being monitored');
      return;
    }

    const newCase: MonitoredCase = {
      id: String(cases.length + 1),
      caseNumber: trimmed,
      court: 'Unknown',
      dateAdded: new Date().toISOString().split('T')[0],
      lastActivity: new Date().toISOString().split('T')[0],
      status: 'active',
    };

    setCases([newCase, ...cases]);
    setInputValue('');
    setError('');
  };

  const handleRemoveCase = (id: string) => {
    setCases(cases.filter((c) => c.id !== id));
  };

  const getStatusColor = (status: string): { bg: string; text: string } => {
    switch (status) {
      case 'active':
        return { bg: 'rgba(34,197,94,0.1)', text: '#057642' };
      case 'inactive':
        return { bg: '#FDF4EC', text: '#B24020' };
      case 'closed':
        return { bg: '#F0F0F0', text: '#5F5F5F' };
      default:
        return { bg: '#F5F5F5', text: '#333333' };
    }
  };

  const statusColor = getStatusColor('');

  return (
    <div
      style={{
        padding: '24px',
        backgroundColor: 'var(--color-surface-0)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '8px',
        fontFamily: 'var(--font-body)',
      }}
    >
      <h2
        style={{
          fontSize: '18px',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          marginBottom: '16px',
          fontFamily: 'var(--font-heading)',
        }}
      >
        PACER Case Monitoring
      </h2>

      <div style={{ marginBottom: '24px' }}>
        <label
          style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--color-text-primary)',
            marginBottom: '8px',
          }}
        >
          Add Case Number
        </label>
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: error ? '8px' : '0',
          }}
        >
          <input
            type="text"
            placeholder="1:23-cv-01234"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setError('');
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddCase();
              }
            }}
            style={{
              flex: 1,
              padding: '10px 12px',
              border: error ? '1px solid #CC1016' : '1px solid #D1D5DB',
              borderRadius: '6px',
              fontSize: '14px',
              fontFamily: 'var(--font-mono)',
              backgroundColor: 'var(--color-surface-0)',
              color: 'var(--color-text-primary)',
            }}
          />
          <button
            onClick={handleAddCase}
            style={{
              padding: '10px 16px',
              backgroundColor: 'var(--accent-primary)',
              color: 'var(--color-surface-0)',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor = 'var(--accent-primary-hover)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor = 'var(--accent-primary)';
            }}
          >
            Add
          </button>
        </div>
        {error && (
          <p
            style={{
              fontSize: '12px',
              color: '#CC1016',
              margin: 0,
            }}
          >
            {error}
          </p>
        )}
      </div>

      <div style={{ marginBottom: '16px' }}>
        <h3
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '12px',
          }}
        >
          Monitored Cases ({cases.length})
        </h3>
        {cases.length === 0 ? (
          <p
            style={{
              fontSize: '14px',
              color: 'var(--color-text-muted)',
              margin: 0,
            }}
          >
            No cases monitored yet. Add a case to get started.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {cases.map((caseItem) => {
              const colors = getStatusColor(caseItem.status);
              return (
                <div
                  key={caseItem.id}
                  style={{
                    padding: '12px',
                    border: '1px solid var(--border-default)',
                    borderRadius: '6px',
                    backgroundColor: 'var(--color-surface-0)',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr auto',
                    gap: '12px',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: '13px',
                        fontWeight: 500,
                        color: 'var(--color-text-primary)',
                        margin: 0,
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {caseItem.caseNumber}
                    </p>
                    <p
                      style={{
                        fontSize: '12px',
                        color: 'var(--color-text-muted)',
                        margin: '4px 0 0 0',
                      }}
                    >
                      {caseItem.court}
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: '12px',
                        color: 'var(--color-text-muted)',
                        margin: 0,
                      }}
                    >
                      <strong>Added:</strong> {caseItem.dateAdded}
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: '12px',
                        color: 'var(--color-text-muted)',
                        margin: 0,
                      }}
                    >
                      <strong>Activity:</strong> {caseItem.lastActivity}
                    </p>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      gap: '8px',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        padding: '4px 8px',
                        backgroundColor: colors.bg,
                        color: colors.text,
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 500,
                        textTransform: 'capitalize',
                      }}
                    >
                      {caseItem.status}
                    </span>
                    <button
                      onClick={() => handleRemoveCase(caseItem.id)}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: 'transparent',
                        color: '#CC1016',
                        border: '1px solid #CC1016',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLButtonElement).style.backgroundColor =
                          '#FEF0EF';
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLButtonElement).style.backgroundColor =
                          'transparent';
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div
        style={{
          fontSize: '12px',
          color: 'var(--color-text-muted)',
          borderTop: '1px solid var(--border-default)',
          paddingTop: '12px',
          marginTop: '12px',
        }}
      >
        Powered by CourtListener RECAP
      </div>
    </div>
  );
}
