'use client'
import { useEffect, useRef, useState } from 'react'

interface AnimatedNumberProps {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  decimals?: number
}

const easeOutCubic = (t: number): number => {
  return 1 - Math.pow(1 - t, 3)
}

export function AnimatedNumber({
  value,
  prefix = '',
  suffix = '',
  duration = 2000,
  decimals = 0,
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const elementRef = useRef<HTMLSpanElement>(null)
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let startTime: number
            const animate = (currentTime: number) => {
              if (!startTime) startTime = currentTime
              const elapsed = currentTime - startTime
              const progress = Math.min(elapsed / duration, 1)
              const easedProgress = easeOutCubic(progress)
              const current = Math.floor(value * easedProgress * Math.pow(10, decimals)) / Math.pow(10, decimals)

              setDisplayValue(current)

              if (progress < 1) {
                animationRef.current = requestAnimationFrame(animate)
              }
            }

            animationRef.current = requestAnimationFrame(animate)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      observer.disconnect()
    }
  }, [value, duration, decimals])

  return (
    <span ref={elementRef}>
      {prefix}
      {displayValue.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  )
}
