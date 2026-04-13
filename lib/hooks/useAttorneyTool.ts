'use client';

import { useState, useCallback } from 'react';

interface UseAttorneyToolOptions<TInput> {
  apiEndpoint: string;
  requireAuth?: boolean;
}

interface UseAttorneyToolReturn<TResult> {
  execute: (input: unknown) => Promise<void>;
  result: TResult | null;
  loading: boolean;
  error: string | null;
  reset: () => void;
}

export function useAttorneyTool<TInput, TResult>(
  options: UseAttorneyToolOptions<TInput>
): UseAttorneyToolReturn<TResult> {
  const [result, setResult] = useState<TResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  const execute = useCallback(
    async (input: unknown) => {
      setLoading(true);
      setError(null);
      setResult(null);

      let attempt = 0;
      const maxAttempts = 2;

      while (attempt < maxAttempts) {
        try {
          const response = await fetch(options.apiEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
          });

          if (!response.ok) {
            throw new Error(
              `API error: ${response.status} ${response.statusText}`
            );
          }

          // Check if response is streaming or JSON
          const contentType = response.headers.get('content-type');
          let data: TResult;

          if (contentType?.includes('text/event-stream')) {
            // Handle streaming response
            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let fullText = '';

            if (!reader) {
              throw new Error('Response body is not readable');
            }

            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              const chunk = decoder.decode(value, { stream: true });
              fullText += chunk;
            }

            data = JSON.parse(fullText) as TResult;
          } else {
            // Handle JSON response
            data = (await response.json()) as TResult;
          }

          setResult(data);
          setLoading(false);
          return;
        } catch (err) {
          attempt++;

          if (attempt >= maxAttempts) {
            const errorMessage =
              err instanceof Error ? err.message : 'An unexpected error occurred';
            setError(errorMessage);
            setLoading(false);
            return;
          }

          // Retry after a short delay
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }
    },
    [options.apiEndpoint]
  );

  return {
    execute,
    result,
    loading,
    error,
    reset,
  };
}
