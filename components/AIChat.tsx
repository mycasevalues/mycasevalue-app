'use client';

import { useState, useRef, useEffect } from 'react';
import { useCompletion } from '@ai-sdk/react';
import { motion, AnimatePresence } from 'framer-motion';

interface AIChatProps {
  context?: string;
  type?: 'case-analysis' | 'search' | 'settlement' | 'general';
  placeholder?: string;
  compact?: boolean;
}

export default function AIChat({ context, type = 'general', placeholder = 'Ask about federal court data...', compact = false }: AIChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);

  const { completion, input, handleInputChange, handleSubmit, isLoading, error } = useCompletion({
    api: '/api/ai/stream',
    streamProtocol: 'text',
    body: { context, type },
    onFinish: (prompt, completion) => {
      setHistory(prev => [...prev, { role: 'user', content: prompt }, { role: 'assistant', content: completion }]);
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [completion, history]);

  if (compact && !isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 1000,
          width: 56, height: 56, borderRadius: '50%',
          background: 'linear-gradient(135deg, #0A66C2, #004182)',
          color: '#fff', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(139,92,246,0.4)',
          fontSize: 24,
        }}
        aria-label="Open AI Assistant"
      >
        🤖
      </button>
    );
  }

  const containerStyle: React.CSSProperties = compact
    ? { position: 'fixed', bottom: 24, right: 24, zIndex: 1000, width: 400, maxHeight: 500, borderRadius: 16, border: '1px solid #e5e7eb', backgroundColor: '#fff', boxShadow: '0 8px 40px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }
    : { borderRadius: 12, border: '1px solid #e5e7eb', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      style={containerStyle}
    >
      {/* Header */}
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(135deg, #0A66C2, #004182)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff' }}>
          <span style={{ fontSize: 18 }}>🤖</span>
          <span style={{ fontWeight: 600, fontSize: 14 }}>AI Case Analyst</span>
        </div>
        {compact && (
          <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 18 }}>✕</button>
        )}
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12, maxHeight: compact ? 320 : 400 }}>
        {history.length === 0 && !completion && (
          <div style={{ textAlign: 'center', color: '#9CA3AF', padding: 24, fontSize: 13 }}>
            <p style={{ marginBottom: 8 }}>Ask questions about federal court data, settlement values, case trends, and more.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
              {['Average PI settlement?', 'Employment case trends', 'Top districts by volume'].map(q => (
                <button key={q} onClick={() => { const e = { target: { value: q } } as React.ChangeEvent<HTMLInputElement>; handleInputChange(e); }} style={{ fontSize: 11, padding: '4px 10px', borderRadius: 12, border: '1px solid #e5e7eb', background: '#f9fafb', cursor: 'pointer', color: '#6B7280' }}>{q}</button>
              ))}
            </div>
          </div>
        )}

        {history.map((msg, i) => (
          <div key={i} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
            <div style={{
              padding: '8px 14px', borderRadius: 12, fontSize: 13, lineHeight: 1.5,
              ...(msg.role === 'user'
                ? { backgroundColor: '#0A66C2', color: '#fff', borderBottomRightRadius: 4 }
                : { backgroundColor: '#f3f4f6', color: '#1f2937', borderBottomLeftRadius: 4 })
            }}>
              {msg.content}
            </div>
          </div>
        ))}

        {completion && (
          <div style={{ alignSelf: 'flex-start', maxWidth: '85%' }}>
            <div style={{ padding: '8px 14px', borderRadius: 12, fontSize: 13, lineHeight: 1.5, backgroundColor: '#f3f4f6', color: '#1f2937', borderBottomLeftRadius: 4 }}>
              {completion}
              <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }}>▋</motion.span>
            </div>
          </div>
        )}

        {isLoading && !completion && (
          <div style={{ alignSelf: 'flex-start' }}>
            <motion.div style={{ display: 'flex', gap: 4, padding: '8px 14px' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {[0, 1, 2].map(i => (
                <motion.div key={i} style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#0A66C2' }} animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }} />
              ))}
            </motion.div>
          </div>
        )}

        {error && (
          <div style={{ padding: '8px 14px', borderRadius: 8, backgroundColor: '#FEF2F2', color: '#991B1B', fontSize: 13 }}>
            Unable to get AI response. Please try again.
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} style={{ padding: '12px 16px', borderTop: '1px solid #e5e7eb', display: 'flex', gap: 8 }}>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={isLoading}
          style={{ flex: 1, padding: '8px 12px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 13, outline: 'none' }}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          style={{
            padding: '8px 16px', borderRadius: 8, border: 'none',
            background: isLoading || !input.trim() ? '#d1d5db' : '#0A66C2',
            color: '#fff', cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
            fontSize: 13, fontWeight: 600,
          }}
        >
          {isLoading ? '...' : 'Ask'}
        </button>
      </form>
    </motion.div>
  );
}
