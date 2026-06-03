'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { Review } from '@/lib/supabase'
import { getInitials, formatDate } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

const AVATAR_COLORS = ['#4F46E5','#FF5A1F','#00875A','#D4AF37','#EC4899','#8B5CF6','#0EA5E9']
const FLAG: Record<string,string> = {
  UK:'🇬🇧',Canada:'🍁',Australia:'🇦🇺',USA:'🇺🇸',Germany:'🇩🇪',Russia:'🇷🇺',
  Philippines:'🇵🇭',Bangladesh:'🇧🇩',Georgia:'🇬🇪',Kazakhstan:'🇰🇿',
}

interface Props { reviews: Review[] }

export default function RecentReviewsRail({ reviews }: Props) {
  const headRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!headRef.current) return
    gsap.fromTo(headRef.current,
      { opacity:0, y:16 },
      { opacity:1, y:0, duration:0.5, ease:'power3.out',
        scrollTrigger:{ trigger:headRef.current, start:'top 88%', once:true } })
  }, [])

  if (!reviews.length) return null

  return (
    <section style={{ padding:'20px 0', background:'var(--body-bg)' }}>
      <div ref={headRef} style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'0 16px', maxWidth:1280, margin:'0 auto 14px', opacity:0 }}>
        <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:18, color:'var(--text)', margin:0 }}>
          Recent reviews
        </h2>
        <Link href="/consultants" style={{ fontSize:13, fontWeight:600, color:'#4F46E5', textDecoration:'none' }}>
          See all
        </Link>
      </div>

      <div style={{ display:'flex', gap:12, overflowX:'auto', padding:'4px 16px 12px', scrollbarWidth:'none', WebkitOverflowScrolling:'touch' }}>
        {reviews.map((r, idx) => {
          const bg = AVATAR_COLORS[idx % AVATAR_COLORS.length]
          const flag = r.country_for ? (FLAG[r.country_for] || '🌍') : null

          return (
            <motion.div key={r.id}
              initial={{ opacity:0, y:20 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, margin:'-40px' }}
              transition={{ duration:0.4, delay: idx * 0.04, ease:[0.23,1,0.32,1] }}
              whileHover={{ y:-3, boxShadow:'0 8px 24px rgba(0,0,0,0.10)' }}
              style={{ background:'#fff', border:'1px solid #E5E7EB', borderRadius:16,
                padding:16, width:256, flexShrink:0, cursor:'default',
                display:'flex', flexDirection:'column', gap:10, minHeight:180 }}>

              {/* Reviewer */}
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ width:34, height:34, borderRadius:'50%', background:bg, display:'flex',
                  alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700,
                  color:'white', flexShrink:0 }}>
                  {getInitials(r.reviewer_name)}
                </div>
                <div>
                  <div style={{ fontWeight:600, fontSize:12.5, color:'#111827' }}>{r.reviewer_name}</div>
                  <div style={{ fontSize:11, color:'#9CA3AF' }}>{formatDate(r.created_at)}</div>
                </div>
              </div>

              {/* Stars */}
              <div style={{ display:'flex', gap:2 }}>
                {Array.from({length:5}).map((_,i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 24 24"
                    fill={i < r.rating ? '#00875A' : '#E5E7EB'}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>

              {/* Text */}
              {r.content && (
                <p style={{ fontSize:12, lineHeight:1.55, color:'#4B5563', flex:1,
                  display:'-webkit-box', WebkitLineClamp:4, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
                  {r.content}
                </p>
              )}

              {/* Country */}
              {flag && (
                <div style={{ display:'flex', alignItems:'center', gap:5, paddingTop:8,
                  borderTop:'1px solid #F3F4F6', fontSize:11, color:'#6B7280' }}>
                  <span style={{ fontSize:15 }}>{flag}</span>
                  {r.country_for}{r.university_name ? ` · ${r.university_name.split(' ').slice(0,3).join(' ')}` : ''}
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
