'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';

const STARTER_QUESTIONS = [
  'What is the average settlement for personal injury in SDNY?',
  'How do I interpret win rate statistics?',
  'What case types have the highest success rates?',
];

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, setInput, append } = useChat({
    api: '/api/chat',
  });

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle starter question click
  const handleStarterClick = (question: string) => {
    append({ role: 'user', content: question });
  };

  return (
    <>
      {/* Floating trigger button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-brand-blue text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-40"
          aria-label="Open chat assistant"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <>
          {/* Mobile overlay */}
          <div
            className="fixed inset-0 bg-black/20 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />

          <div className="fixed bottom-0 right-0 w-full h-[85vh] md:bottom-8 md:right-8 md:w-[400px] md:h-auto md:max-h-[600px] bg-white md:rounded-xl shadow-2xl flex flex-col z-50 border border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
              <div>
                <h2 className="text-base font-semibold text-gray-900">Legal AI Assistant</h2>
                <p className="text-xs text-gray-500">Data insights, not legal advice</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Close chat"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 min-h-0">
              {messages.length === 0 ? (
                <div className="flex flex-col pt-8">
                  <p className="text-sm text-gray-600 mb-6 text-center">
                    Ask me anything about federal court data, case outcomes, or legal statistics.
                  </p>
                  <div className="space-y-2">
                    {STARTER_QUESTIONS.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleStarterClick(question)}
                        disabled={isLoading}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-700 hover:border-brand-blue hover:text-brand-blue transition-colors disabled:opacity-50 text-left leading-relaxed"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${
                        message.role === 'user'
                          ? 'bg-brand-blue text-white rounded-2xl rounded-br-sm'
                          : 'bg-gray-100 text-gray-900 rounded-2xl rounded-bl-sm'
                      }`}
                    >
                      {message.content || (
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <form onSubmit={handleSubmit} className="px-4 py-3 border-t border-gray-200 flex-shrink-0">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask a question..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue disabled:bg-gray-50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="px-3 py-2.5 rounded-xl bg-brand-blue text-white hover:bg-brand-blue/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                  aria-label="Send message"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
