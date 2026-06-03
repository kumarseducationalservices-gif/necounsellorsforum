'use client'
import { useEffect, useRef, ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props { children: ReactNode; delay?: number; from?: 'left'|'right'|'bottom' }

export default function ScrollReveal({ children, delay = 0, from = 'bottom' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const from_x = from === 'left' ? -32 : from === 'right' ? 32 : 0
    const from_y = from === 'bottom' ? 28 : 0
    gsap.fromTo(ref.current,
      { opacity:0, x:from_x, y:from_y },
      { opacity:1, x:0, y:0, duration:0.6, delay, ease:'power3.out',
        scrollTrigger:{ trigger:ref.current, start:'top 88%', once:true } })
  }, [delay, from])
  return <div ref={ref} style={{ opacity:0 }}>{children}</div>
}
