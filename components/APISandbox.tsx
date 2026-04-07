'use client';

import { useState } from 'react';

interface EndpointConfig {
  method: string;
  path: string;
  params: Array<{
    name: string;
    type: string;
    required: boolean;
    placeholder: string;
  }>;
}

const endpoints: Record<string, EndpointConfig> = {
  'cases-nos': {
    method: 'GET',
    path: '/api/v1/cases/nos/:code',
    params: [
      {
        name: 'code',
        type: 'string',
        required: true,
        placeholder: 'e.g., 442',
      },
      {
        name: 'state',
        type: 'string',
        required: false,
        placeholder: 'e.g., CA',
      },
    ],
  },
  'cases-district': {
    method: 'GET',
    path: '/api/v1/cases/nos/:code/district/:district',
    params: [
      {
        name: 'code',
        type: 'string',
        required: true,
        placeholder: 'e.g., 442',
      },
      {
        name: 'district',
        type: 'string',
        required: true,
        placeholder: 'e.g., C.D. Cal.',
      },
    ],
  },
  'districts': {
    method: 'GET',
    path: '/api/v1/districts/:district',
    params: [
      {
        name: 'district',
        type: 'string',
        required: true,
        placeholder: 'e.g., C.D. Cal.',
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        placeholder: 'e.g., 20',
      },
    ],
  },
  'judges-id': {
    method: 'GET',
    path: '/api/v1/judges/:judgeId',
    params: [
      {
        name: 'judgeId',
        type: 'string',
        required: true,
        placeholder: 'e.g., judge_001',
      },
    ],
  },
  'judges-search': {
    method: 'GET',
    path: '/api/v1/judges/search',
    params: [
      {
        name: 'q',
        type: 'string',
        required: true,
        placeholder: 'e.g., Jane Smith',
      },
      {
        name: 'district',
        type: 'string',
        required: false,
        placeholder: 'e.g., C.D. Cal.',
      },
    ],
  },
  'predict': {
    method: 'POST',
    path: '/api/v1/predict',
    params: [
      {
        name: 'nos_code',
        type: 'string',
        required: true,
        placeholder: 'e.g., 442',
      },
      {
        name: 'has_attorney',
        type: 'boolean',
        required: true,
        placeholder: 'true or false',
      },
      {
        name: 'damage_amount',
        type: 'string',
        required: true,
        placeholder: 'small | mid | large | xlarge | huge',
      },
      {
        name: 'case_strength',
        type: 'string',
        required: true,
        placeholder: 'weak | moderate | strong',
      },
    ],
  },
  'trends': {
    method: 'GET',
    path: '/api/v1/trends/nos/:code',
    params: [
      {
        name: 'code',
        type: 'string',
        required: true,
        placeholder: 'e.g., 442',
      },
      {
        name: 'years',
        type: 'integer',
        required: false,
        placeholder: 'e.g., 5',
      },
    ],
  },
};

interface ResponseData {
  status: number;
  time: number;
  data: Record<string, unknown>;
}

export default function APISandbox() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('cases-nos');
  const [params, setParams] = useState<Record<string, string>>({});
  const [apiKey, setApiKey] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ResponseData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const endpoint = endpoints[selectedEndpoint];

  const handleParamChange = (paramName: string, value: string) => {
    setParams((prev) => ({
      ...prev,
      [paramName]: value,
    }));
  };

  const handleSendRequest = async () => {
    if (!apiKey.trim()) {
      setError('Please enter your API key');
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const startTime = performance.now();

      let url = `https://www.mycasevalues.com${endpoint.path}`;
      const queryParams: string[] = [];

      endpoint.params.forEach((param) => {
        const value = params[param.name];
        if (param.name.includes('code') || param.name.includes('judgeId') || param.name.includes('district') || param.name === 'q') {
          url = url.replace(`:${param.name}`, encodeURIComponent(value || ''));
        } else if (value && param.name !== 'nos_code' && param.name !== 'has_attorney' && param.name !== 'damage_amount' && param.name !== 'case_strength') {
          queryParams.push(`${param.name}=${encodeURIComponent(value)}`);
        }
      });

      if (queryParams.length > 0) {
        url += '?' + queryParams.join('&');
      }

      const options: RequestInit = {
        method: endpoint.method,
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      };

      if (endpoint.method === 'POST') {
        const bodyData: Record<string, unknown> = {};
        endpoint.params.forEach((param) => {
          const value = params[param.name];
          if (value) {
            if (param.type === 'boolean') {
              bodyData[param.name] = value === 'true';
            } else if (param.type === 'integer') {
              bodyData[param.name] = parseInt(value, 10);
            } else {
              bodyData[param.name] = value;
            }
          }
        });
        options.body = JSON.stringify(bodyData);
      }

      const res = await fetch(url, options);
      const data = await res.json();
      const endTime = performance.now();

      setResponse({
        status: res.status,
        time: Math.round(endTime - startTime),
        data,
      });
    } catch (err) {
      setError(`Request failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* API Key Input */}
      <div style={{ marginBottom: '24px' }}>
        <label
          style={{
            display: 'block',
            fontSize: '13px',
            fontWeight: 600,
            color: '#0f0f0f',
            marginBottom: '8px',
            fontFamily: 'var(--font-heading)',
          }}
        >
          API Key
        </label>
        <input
          type="password"
          placeholder="Enter your API key (starts with sk_...)"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 12px',
            fontSize: '13px',
            border: '1px solid #E5E7EB',
            borderRadius: '6px',
            fontFamily: 'var(--font-mono)',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Endpoint Selector */}
      <div style={{ marginBottom: '24px' }}>
        <label
          style={{
            display: 'block',
            fontSize: '13px',
            fontWeight: 600,
            color: '#0f0f0f',
            marginBottom: '8px',
            fontFamily: 'var(--font-heading)',
          }}
        >
          Endpoint
        </label>
        <select
          value={selectedEndpoint}
          onChange={(e) => {
            setSelectedEndpoint(e.target.value);
            setParams({});
            setResponse(null);
            setError(null);
          }}
          style={{
            width: '100%',
            padding: '10px 12px',
            fontSize: '13px',
            border: '1px solid #E5E7EB',
            borderRadius: '6px',
            fontFamily: 'var(--font-mono)',
            boxSizing: 'border-box',
          }}
        >
          {Object.entries(endpoints).map(([key, ep]) => (
            <option key={key} value={key}>
              {ep.method} {ep.path}
            </option>
          ))}
        </select>
      </div>

      {/* Parameters */}
      {endpoint.params.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h4
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#0f0f0f',
              margin: '0 0 12px',
              fontFamily: 'var(--font-heading)',
            }}
          >
            Parameters
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {endpoint.params.map((param) => (
              <div key={param.name}>
                <label
                  style={{
                    fontSize: '12px',
                    fontWeight: 500,
                    color: '#0f0f0f',
                    display: 'block',
                    marginBottom: '4px',
                  }}
                >
                  {param.name} {param.required && <span style={{ color: '#DC2626' }}>*</span>}
                </label>
                <input
                  type={param.type === 'integer' ? 'number' : param.type === 'boolean' ? 'text' : 'text'}
                  placeholder={param.placeholder}
                  value={params[param.name] || ''}
                  onChange={(e) => handleParamChange(param.name, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    fontSize: '12px',
                    border: '1px solid #E5E7EB',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-mono)',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Send Request Button */}
      <button
        onClick={handleSendRequest}
        disabled={loading}
        style={{
          width: '100%',
          padding: '12px 16px',
          fontSize: '14px',
          fontWeight: 600,
          color: '#FFFFFF',
          backgroundColor: loading ? '#9CA3AF' : '#0A66C2',
          border: 'none',
          borderRadius: '6px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontFamily: 'var(--font-heading)',
          transition: 'all 0.2s ease',
          marginBottom: '24px',
        }}
      >
        {loading ? 'Sending...' : 'Send Request'}
      </button>

      {/* Error Message */}
      {error && (
        <div
          style={{
            padding: '12px',
            backgroundColor: '#FEE2E2',
            border: '1px solid #FECACA',
            borderRadius: '6px',
            marginBottom: '16px',
          }}
        >
          <p
            style={{
              fontSize: '12px',
              color: '#991B1B',
              margin: 0,
              fontFamily: 'var(--font-mono)',
            }}
          >
            {error}
          </p>
        </div>
      )}

      {/* Response Display */}
      {response && (
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '12px',
            }}
          >
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: response.status >= 200 && response.status < 300 ? '#059669' : '#DC2626',
              }}
            >
              Status: {response.status}
            </span>
            <span
              style={{
                fontSize: '12px',
                color: '#4B5563',
              }}
            >
              Response time: {response.time}ms
            </span>
          </div>
          <pre
            style={{
              margin: 0,
              padding: '12px 14px',
              backgroundColor: '#1a1a2e',
              color: '#D4D4D4',
              fontSize: '11px',
              lineHeight: 1.5,
              fontFamily: 'var(--font-mono)',
              overflowX: 'auto',
              borderRadius: '6px',
              maxHeight: '400px',
              overflowY: 'auto',
            }}
          >
            {JSON.stringify(response.data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
