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
          className="border border-navy-100 dark:border-navy-700 rounded-lg overflow-hidden"
        >
          <button
            onClick={() => toggleAccordion(item.id)}
            className={cn(
              'w-full px-6 py-4 flex items-center justify-between text-left font-medium transition-colors duration-200',
              openId === item.id
                ? 'bg-navy-50 dark:bg-navy-800 text-gold-500'
                : 'bg-white dark:bg-navy-900 text-navy-900 dark:text-cream-50 hover:bg-navy-50 dark:hover:bg-navy-800'
            )}
          >
            <span>{item.title}</span>
            <span
              className={cn(
                'text-xl font-light transition-transform duration-300',
                openId === item.id ? 'text-gold-500 rotate-0' : 'text-navy-400 dark:text-navy-500 rotate-45'
              )}
            >
              {openId === item.id ? '×' : '+'}
            </span>
          </button>

          <div
            style={{
              gridTemplateRows: openId === item.id ? '1fr' : '0fr',
              display: 'grid',
              transition: 'grid-template-rows 0.3s ease-out',
            }}
          >
            <div className="overflow-hidden">
              <div className="px-6 py-4 bg-navy-50 dark:bg-navy-900/50 text-navy-700 dark:text-cream-100 leading-relaxed">
                {item.content}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
