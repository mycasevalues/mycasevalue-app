'use client'
import React, { useState } from 'react'
// Simple className joiner
function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ')
}

interface AccordionItem {
  id: string
  title: string
  content: string
}

interface AccordionProps {
  items: AccordionItem[]
}

export function Accordion({ items }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items.length > 0 ? items[0].id : null)

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="rounded-lg overflow-hidden"
          style={{ border: '1px solid #334155' }}
        >
          <button
            id={`accordion-btn-${item.id}`}
            onClick={() => toggleAccordion(item.id)}
            aria-expanded={openId === item.id}
            aria-controls={`accordion-panel-${item.id}`}
            className={cn(
              'w-full px-6 py-4 flex items-center justify-between text-left font-medium transition-colors duration-200',
              openId === item.id
                ? 'text-[#A5B4FC]'
                : 'text-[#F0F2F5] hover:bg-[#1E293B]'
            )}
            style={{
              background: openId === item.id ? '#1E293B' : '#131B2E',
            }}
          >
            <span>{item.title}</span>
            <span
              className={cn(
                'text-xl font-light transition-transform duration-300',
                openId === item.id ? 'text-[#A5B4FC] rotate-0' : 'text-[#64748B] rotate-45'
              )}
            >
              {openId === item.id ? '×' : '+'}
            </span>
          </button>

          <div
            id={`accordion-panel-${item.id}`}
            role="region"
            aria-labelledby={`accordion-btn-${item.id}`}
            style={{
              gridTemplateRows: openId === item.id ? '1fr' : '0fr',
              display: 'grid',
              transition: 'grid-template-rows 0.3s ease-out',
            }}
          >
            <div className="overflow-hidden">
              <div className="px-6 py-4 leading-relaxed" style={{
                background: 'rgba(19,27,46,0.5)',
                color: '#CBD5E1',
              }}>
                {item.content}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
