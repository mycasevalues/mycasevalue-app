'use client'
import { useEffect, useRef, useState, useCallback } from 'react'

interface AnimatedNumberProps {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  decimals?: number
}

const easeOutExpo = (t: number): number => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

export function AnimatedNumber({
  value,
  prefix = '',
  suffix = '',
  duration = 1800,
  decimals = 0,
}: AnimatedNumberProps) {
  // Start with the target value to prevent flash of "0"
  const [displayValue, setDisplayValue] = useState(value)
  const elementRef = useRef<HTMLSpanElement>(null)
  const animationRef = useRef<number>(0)
  const hasAnimated = useRef(false)

  const animate = useCallback(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true

    // Reset to 0 then animate up
    setDisplayValue(0)
    let startTime: number

    const step = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutExpo(progress)
      const current = Math.round(value * easedProgress * Math.pow(10, decimals)) / Math.pow(10, decimals)

      setDisplayValue(current)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(step)
      } else {
        // Ensure final value is exact
        setDisplayValue(value)
      }
    }

    animationRef.current = requestAnimationFrame(step)
  }, [value, duration, decimals])

  useEffect(() => {
    const el = elementRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Small delay for visual effect
            requestAnimationFrame(() => animate())
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(el)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      observer.disconnect()
    }
  }, [animate])

  return (
    <span ref={elementRef} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {prefix}
      {displayValue.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  )
}
