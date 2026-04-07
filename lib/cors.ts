export function corsHeaders(origin: string | null) {
  const allowedOrigins = [
    'https://www.mycasevalues.com',
    'https://mycasevalues.com',
    ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : []),
  ];

  const isAllowed = origin && allowedOrigins.includes(origin);

  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : 'https://www.mycasevalues.com',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
    'Access-Control-Max-Age': '86400',
  };
}
