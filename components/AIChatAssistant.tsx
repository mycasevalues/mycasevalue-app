'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const STARTER_QUESTIONS = [
  'How do I research case values?',
  'What data sources does MyCaseValue use?',
  'How are settlement ranges calculated?',
  'What attorney tools are available?',
];

export function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) throw new Error('Failed to get response');

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
      };

      setMessages((prev) => [...prev, assistantMsg]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          assistantContent += decoder.decode(value, { stream: true });
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsg.id
                ? { ...m, content: assistantContent }
                : m
            )
          );
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded text-white shadow-lg hover:shadow-xl transition-all"
          style={{ backgroundColor: 'var(--card, #FFFFFF)', fontFamily: 'var(--font-ui)' }}
          aria-label="Open AI Assistant"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span className="text-sm font-medium">AI Assistant</span>
        </button>
      )}

      {isOpen && (
        <div
          className="fixed bottom-6 right-6 z-50 flex flex-col bg-[#FFFFFF] border border-[var(--bdr, #E2DFD8)] shadow-2xl overflow-hidden"
          style={{ width: '400px', maxWidth: 'calc(100vw - 48px)', height: '560px', maxHeight: 'calc(100vh - 48px)', borderRadius: '4px', fontFamily: 'var(--font-ui)' }}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--bdr, #E2DFD8)]" style={{ backgroundColor: 'var(--card, #FFFFFF)' }}>
            <div className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <div>
                <h3 className="text-white font-semibold text-sm">MyCaseValue AI</h3>
                <p className="text-[var(--link)] text-xs">Legal research assistant</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors p-1" aria-label="Close chat">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {messages.length === 0 ? (
              <div className="space-y-4">
                <p className="text-sm text-[var(--color-text-muted)] text-center mt-4">Ask me anything about federal court data, settlement values, or using MyCaseValue tools.</p>
                <div className="space-y-2">
                  {STARTER_QUESTIONS.map((q) => (
                    <button key={q} onClick={() => sendMessage(q)} className="w-full text-left px-4 py-3 rounded text-sm text-[var(--color-text-muted)] bg-[var(--color-surface-2)] hover:bg-[rgba(255,255,255,0.04)] transition-colors border border-[var(--bdr, #E2DFD8)]">
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className={msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                  <div
                    className={msg.role === 'user' ? 'max-w-[85%] px-4 py-3 rounded text-sm text-white' : 'max-w-[85%] px-4 py-3 rounded text-sm text-[var(--color-text-muted)] bg-[rgba(255,255,255,0.04)]'}
                    style={msg.role === 'user' ? { backgroundColor: 'var(--card, #FFFFFF)' } : undefined}
                  >
                    <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
                  </div>
                </div>
              ))
            )}
            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded bg-[rgba(255,255,255,0.04)]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-[var(--color-text-muted)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-[var(--color-text-muted)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-[var(--color-text-muted)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-[var(--bdr, #E2DFD8)] px-4 py-3">
            <form onSubmit={onSubmit} className="flex items-center gap-2">
              <input ref={inputRef} type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Ask about case values..." className="flex-1 px-4 py-2.5 rounded border border-[var(--bdr, #E2DFD8)] text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400" disabled={isLoading} />
              <button type="submit" disabled={!inputValue.trim() || isLoading} className="p-2.5 rounded-full text-white transition-colors disabled:opacity-50" style={{ backgroundColor: 'var(--card, #FFFFFF)' }} aria-label="Send message">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
            <p className="text-xs text-[var(--color-text-muted)] text-center mt-2">AI responses are for informational purposes only</p>
          </div>
        </div>
      )}
    </>
  );
}
