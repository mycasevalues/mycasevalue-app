'use client';

import { useState, useMemo } from 'react';
import { SITE_URL } from '@/lib/site-config';
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
  src="${SITE_URL}/widget/${selectedNos}/${selectedDistrict}"
  width="${dimensions.width}"
  height="${dimensions.height}"
  frameborder="0"
  style="border: none; border-radius: 4px;"
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
      backgroundColor: 'var(--card, #FFFFFF)',
      borderRadius: '4px',
      padding: '32px',
      border: '1px solid rgba(255,255,255,0.08)',
    }}>
      {/* Left column: Configuration */}
      <div>
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--text1)',
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
                padding: '8px 12px',
                fontSize: '14px',
                border: '1px solid var(--bdr)',
                borderRadius: '4px',
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
                backgroundColor: 'var(--card, #FFFFFF)',
                border: '1px solid var(--bdr)',
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
                      padding: '8px 12px',
                      fontSize: '14px',
                      borderBottom: '1px solid var(--bdr)',
                      cursor: 'pointer',
                      backgroundColor: selectedNos === type.nos ? 'var(--link-light)' : 'transparent',
                      color: selectedNos === type.nos ? 'var(--link)' : 'var(--text2)',
                    }}
                    onMouseEnter={(e) => {
                      if (selectedNos !== type.nos) {
                        e.currentTarget.style.backgroundColor = 'var(--card)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = selectedNos === type.nos ? 'var(--link-light)' : 'transparent';
                    }}
                  >
                    <div style={{ fontWeight: 500, color: 'inherit' }}>{type.label}</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
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
              backgroundColor: 'rgba(59,130,246,0.06)',
              border: '1px solid var(--link-light, #BAE6FD)',
              borderRadius: '4px',
              fontSize: '14px',
              color: 'var(--link)',
            }}>
              Selected: {selectedCaseType.label}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--text1)',
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
                  border: displayStyle === style.value ? '2px solid var(--link)' : '1px solid #d1d5db',
                  backgroundColor: displayStyle === style.value ? '#eff6ff' : 'var(--card, #FFFFFF)',
                  color: displayStyle === style.value ? 'var(--link)' : 'var(--text2)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'all 200ms',
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
            color: 'var(--text1)',
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
                  border: '1px solid var(--bdr)',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                  resize: 'none',
                  color: 'var(--text1)',
                  backgroundColor: 'var(--card)',
                }}
              />
              <button
                onClick={copyToClipboard}
                style={{
                  marginTop: '12px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  fontWeight: 500,
                  backgroundColor: 'var(--link)',
                  color: 'var(--card)',
                  border: 'none',
                  borderRadius: '4px',
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
              backgroundColor: 'rgba(255,255,255,0.05)',
              borderRadius: '4px',
              color: 'var(--color-text-muted)',
              fontSize: '14px',
              textAlign: 'center',
            }}>
              Select a case type to generate embed code
            </div>
          )}
        </div>

        <div style={{
          padding: '16px',
          backgroundColor: 'rgba(234,179,8,0.06)',
          border: '1px solid var(--wrn-bg, #FCD34D)',
          borderRadius: '4px',
          fontSize: '14px',
          color: 'var(--wrn-txt)',
        }}>
          <strong>Attribution:</strong> All widgets include a "Powered by MyCaseValue" attribution. This is required.
        </div>
      </div>

      {/* Right column: Live preview */}
      <div>
        <h3 style={{
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--text1)',
          marginBottom: '16px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          Step 4: Live Preview
        </h3>
        <div style={{
          padding: '32px',
          backgroundColor: 'var(--card)',
          borderRadius: '4px',
          border: '1px solid rgba(255,255,255,0.08)',
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
                color: 'var(--color-text-muted)',
                textAlign: 'center',
              }}>
                {dimensions.width}×{dimensions.height}px
              </div>
              <iframe
                src={`/widget/${selectedNos}/${selectedDistrict}`}
                width={dimensions.width}
                height={dimensions.height}
                frameBorder="0"
                style={{ borderRadius: '4px', border: 'none' }}
                title="Widget Preview"
              />
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              color: 'var(--color-text-muted)',
            }}>
              <div style={{ fontSize: '16px', marginBottom: '8px' }}>Select a case type to preview</div>
              <div style={{ fontSize: '14px' }}>The widget will appear here</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
