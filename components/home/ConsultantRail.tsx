'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Consultant } from '@/lib/supabase'
import ConsultantCard from '@/components/ConsultantCard'

gsap.registerPlugin(ScrollTrigger)

interface Props { title: string; subtitle?: string; consultants: Consultant[]; viewAllHref: string }

export default function ConsultantRail({ title, subtitle, consultants, viewAllHref }: Props) {
  const headRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!headRef.current) return
    gsap.fromTo(headRef.current,
      { opacity:0, x:-24 },
      { opacity:1, x:0, duration:0.55, ease:'power3.out',
        scrollTrigger:{ trigger:headRef.current, start:'top 88%', once:true } })
  }, [])

  if (!consultants.length) return null

  return (
    <section style={{ padding:'20px 0' }}>
      <div ref={headRef} style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between',
        marginBottom:14, padding:'0 16px', maxWidth:1280, margin:'0 auto 14px', opacity:0 }}>
        <div>
          <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:18, color:'var(--text)', margin:0 }}>{title}</h2>
          {subtitle && <p style={{ fontSize:12, color:'var(--muted)', margin:'2px 0 0' }}>{subtitle}</p>}
        </div>
        <Link href={viewAllHref}
          style={{ display:'flex', alignItems:'center', gap:4, fontSize:13, fontWeight:600,
            color:'#4F46E5', textDecoration:'none', flexShrink:0 }}>
          See more <ArrowRight size={13} />
        </Link>
      </div>
      <div ref={railRef}
        style={{ display:'flex', gap:12, overflowX:'auto', padding:'4px 16px 12px',
          scrollbarWidth:'none', WebkitOverflowScrolling:'touch' }}>
        {consultants.map((c, i) => (
          <ConsultantCard key={c.id} consultant={c} compact index={i} />
        ))}
      </div>
    </section>
  )
}
