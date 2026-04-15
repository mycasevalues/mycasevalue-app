'use client';

import { useState, useMemo } from 'react';
import { SITS } from '@/lib/data';

type DisplayStyle = 'compact' | 'full';

interface CaseTypeOption {
  nos: string;
  label: string;
  category: string;
}

export default function WidgetGenerator() {
  const [selectedNos, setSelectedNos] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [displayStyle, setDisplayStyle] = useState<DisplayStyle>('compact');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  // Flatten all case types from SITS
  const allCaseTypes = useMemo(() => {
    const types: CaseTypeOption[] = [];
    SITS.forEach((category) => {
      category.opts.forEach((option) => {
        types.push({
          nos: option.nos,
          label: option.label,
          category: category.label,
        });
      });
    });
    return types;
  }, []);

  // Filter case types based on search
  const filteredCaseTypes = useMemo(() => {
    if (!searchQuery) return allCaseTypes;
    return allCaseTypes.filter(
      (type) =>
        type.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        type.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        type.nos.includes(searchQuery)
    );
  }, [searchQuery, allCaseTypes]);

  const selectedCaseType = allCaseTypes.find((t) => t.nos === selectedNos);
  const dimensions = displayStyle === 'compact' ? { width: 280, height: 160 } : { width: 340, height: 220 };
  const embedCode = selectedNos
    ? `<iframe
  src="https://mycasevalues.com/widget/${selectedNos}/${selectedDistrict}"
  width="${dimensions.width}"
  height="${dimensions.height}"
  frameborder="0"
  style="border: none; border-radius: 6px;"
  title="MyCaseValue Case Settlement Widget"
></iframe>`
    : '';

  const copyToClipboard = () => {
    if (embedCode) {
      navigator.clipboard.writeText(embedCode);
      alert('Embed code copied to clipboard!');
    }
  };

  // Determine step indicator
  const currentStep = selectedNos ? (selectedDistrict !== 'all' ? 3 : 2) : 1;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '40px',
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '32px',
      border: '1px solid #e5e7eb',
    }}>
      {/* Left column: Configuration */}
      <div>
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: 600,
            color: '#1f2937',
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
            Step 1: Select Case Type
          </h3>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search case types..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              style={{
                width: '100%',
                padding: '10px 12px',
                fontSize: '14px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
              }}
            />
            {showDropdown && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                backgroundColor: '#fff',
                border: '1px solid #d1d5db',
                borderTop: 'none',
                borderRadius: '0 0 6px 6px',
                maxHeight: '300px',
                overflowY: 'auto',
                zIndex: 10,
              }}>
                {filteredCaseTypes.slice(0, 50).map((type) => (
                  <div
                    key={`${type.nos}-${type.label}`}
                    onClick={() => {
                      setSelectedNos(type.nos);
                      setShowDropdown(false);
                      setSearchQuery('');
                    }}
                    style={{
                      padding: '10px 12px',
                      fontSize: '14px',
                      borderBottom: '1px solid #f3f4f6',
                      cursor: 'pointer',
                      backgroundColor: selectedNos === type.nos ? '#eff6ff' : 'transparent',
                      color: selectedNos === type.nos ? 'var(--accent-primary)' : '#374151',
                    }}
                    onMouseEnter={(e) => {
                      if (selectedNos !== type.nos) {
                        e.currentTarget.style.backgroundColor = '#f9fafb';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = selectedNos === type.nos ? '#eff6ff' : 'transparent';
                    }}
                  >
                    <div style={{ fontWeight: 500, color: 'inherit' }}>{type.label}</div>
                    <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>
                      {type.category} • NOS {type.nos}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {selectedCaseType && (
            <div style={{
              marginTop: '12px',
              padding: '8px 12px',
              backgroundColor: '#eff6ff',
              border: '1px solid #bfdbfe',
              borderRadius: '6px',
              fontSize: '13px',
              color: 'var(--accent-primary)',
            }}>
              Selected: {selectedCaseType.label}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: 600,
            color: '#1f2937',
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
            Step 2: Display Style
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { value: 'compact', label: 'Compact', size: '280×160' },
              { value: 'full', label: 'Full', size: '340×220' },
            ].map((style) => (
              <button
                key={style.value}
                onClick={() => setDisplayStyle(style.value as DisplayStyle)}
                style={{
                  padding: '12px',
                  fontSize: '14px',
                  fontWeight: 500,
                  border: displayStyle === style.value ? '2px solid var(--accent-primary)' : '1px solid #d1d5db',
                  backgroundColor: displayStyle === style.value ? '#eff6ff' : '#fff',
                  color: displayStyle === style.value ? 'var(--accent-primary)' : '#374151',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'left',
                }}
              >
                <div>{style.label}</div>
                <div style={{ fontSize: '12px', color: 'inherit', opacity: 0.7, marginTop: '4px' }}>
                  {style.size}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: 600,
            color: '#1f2937',
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
            Step 3: Embed Code
          </h3>
          {embedCode ? (
            <div>
              <textarea
                value={embedCode}
                readOnly
                style={{
                  width: '100%',
                  height: '120px',
                  padding: '12px',
                  fontSize: '12px',
                  fontFamily: '"Courier New", monospace',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  boxSizing: 'border-box',
                  resize: 'none',
                  color: '#374151',
                  backgroundColor: '#f9fafb',
                }}
              />
              <button
                onClick={copyToClipboard}
                style={{
                  marginTop: '12px',
                  padding: '10px 16px',
                  fontSize: '14px',
                  fontWeight: 500,
                  backgroundColor: 'var(--accent-primary)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                Copy to Clipboard
              </button>
            </div>
          ) : (
            <div style={{
              padding: '16px',
              backgroundColor: '#f3f4f6',
              borderRadius: '6px',
              color: '#9ca3af',
              fontSize: '14px',
              textAlign: 'center',
            }}>
              Select a case type to generate embed code
            </div>
          )}
        </div>

        <div style={{
          padding: '16px',
          backgroundColor: '#fef3c7',
          border: '1px solid #fcd34d',
          borderRadius: '6px',
          fontSize: '13px',
          color: '#92400e',
        }}>
          <strong>Attribution:</strong> All widgets include a "Powered by MyCaseValue" attribution. This is required.
        </div>
      </div>

      {/* Right column: Live preview */}
      <div>
        <h3 style={{
          fontSize: '14px',
          fontWeight: 600,
          color: '#1f2937',
          marginBottom: '16px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          Step 4: Live Preview
        </h3>
        <div style={{
          padding: '32px',
          backgroundColor: '#f9fafb',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}>
          {selectedNos ? (
            <div>
              <div style={{
                marginBottom: '16px',
                fontSize: '12px',
                color: '#9ca3af',
                textAlign: 'center',
              }}>
                {dimensions.width}×{dimensions.height}px
              </div>
              <iframe
                src={`/widget/${selectedNos}/${selectedDistrict}`}
                width={dimensions.width}
                height={dimensions.height}
                frameBorder="0"
                style={{ borderRadius: '6px', border: 'none' }}
                title="Widget Preview"
              />
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              color: '#9ca3af',
            }}>
              <div style={{ fontSize: '16px', marginBottom: '8px' }}>Select a case type to preview</div>
              <div style={{ fontSize: '13px' }}>The widget will appear here</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
