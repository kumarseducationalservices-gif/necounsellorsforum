'use client'
import Link from 'next/link'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { MapPin, CheckCircle, Globe } from 'lucide-react'
import { Consultant } from '@/lib/supabase'
import { getInitials, getYearsInOperation } from '@/lib/utils'
import { useRef } from 'react'

function nameGradient(name: string): [string, string] {
  const gradients: [string,string][] = [
    ['#4F46E5','#7C3AED'],['#0EA5E9','#0284C7'],['#059669','#047857'],
    ['#D97706','#B45309'],['#DC2626','#B91C1C'],['#7C3AED','#6D28D9'],
    ['#0891B2','#0E7490'],['#65A30D','#4D7C0F'],
  ]
  return gradients[name.split('').reduce((a,c)=>a+c.charCodeAt(0),0) % gradients.length]
}

const FLAG: Record<string,string> = {
  UK:'🇬🇧',Canada:'🍁',Australia:'🇦🇺',USA:'🇺🇸',Germany:'🇩🇪',
  France:'🇫🇷',Russia:'🇷🇺',Philippines:'🇵🇭',Bangladesh:'🇧🇩',
  Georgia:'🇬🇪',Kazakhstan:'🇰🇿',Netherlands:'🇳🇱',Ireland:'🇮🇪',
  'New Zealand':'🇳🇿',Singapore:'🇸🇬',
}

function StarBar({ rating, count }: { rating: number; count: number }) {
  const color = rating >= 4 ? '#00875A' : rating >= 3 ? '#F59E0B' : '#EF4444'
  return (
    <div style={{ display:'flex', alignItems:'center', gap:6 }}>
      <div style={{ display:'flex', gap:2 }}>
        {Array.from({length:5}).map((_,i) => (
          <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i < Math.round(rating) ? color : '#E5E7EB'}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        ))}
      </div>
      {count > 0
        ? <><span style={{ fontSize:11, fontWeight:700, color }}>{rating.toFixed(1)}</span>
            <span style={{ fontSize:11, color:'#9CA3AF' }}>({count})</span></>
        : <span style={{ fontSize:11, color:'#9CA3AF' }}>New</span>
      }
    </div>
  )
}

interface Props { consultant: Consultant; compact?: boolean; index?: number }

export default function ConsultantCard({ consultant: c, compact = false, index = 0 }: Props) {
  const [g1, g2] = nameGradient(c.name)
  const years = getYearsInOperation(c.established_year)
  const isVerified = c.verification_level === 'establishment_verified'
  const isGoogle   = c.verification_level === 'google_verified'
  const cardRef    = useRef<HTMLDivElement>(null)

  // 3D tilt via Framer Motion springs
  const rotX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const rotY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const glow = useSpring(useMotionValue(0), { stiffness: 300, damping: 25 })
  const glowOpacity = useTransform(glow, [0,1], [0, 0.6])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = (e.clientY - rect.top  - rect.height / 2) / rect.height * 10
    const y = (e.clientX - rect.left - rect.width  / 2) / rect.width  * -10
    rotX.set(x); rotY.set(y); glow.set(1)
  }
  const handleMouseLeave = () => { rotX.set(0); rotY.set(0); glow.set(0) }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity:0, y:30 }}
      animate={{ opacity:1, y:0 }}
      transition={{ duration:0.45, delay: index * 0.05, ease:[0.23,1,0.32,1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotX, rotateY: rotY,
        transformStyle: 'preserve-3d',
        width: compact ? 224 : '100%',
        flexShrink: compact ? 0 : undefined,
        position: 'relative',
      }}>

      {/* Glow layer */}
      <motion.div style={{
        position:'absolute', inset:-1, borderRadius:17, pointerEvents:'none', zIndex:0,
        background:`linear-gradient(135deg,${g1},${g2})`,
        opacity: glowOpacity, filter:'blur(8px)',
      }} />

      <Link href={`/consultants/${c.slug}`} style={{ textDecoration:'none', display:'block', position:'relative', zIndex:1 }}>
        <div style={{
          background:'#fff', border:'1px solid #E5E7EB', borderRadius:16,
          overflow:'hidden', transition:'box-shadow 0.2s',
        }}>
          {/* Gradient accent bar */}
          <div style={{ height:4, background:`linear-gradient(90deg,${g1},${g2})` }} />

          <div style={{ padding:16 }}>
            {/* Logo + badge row */}
            <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:12 }}>
              <div style={{ width:44, height:44, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center',
                fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:14, color:'white', flexShrink:0,
                background:`linear-gradient(135deg,${g1},${g2})` }}>
                {getInitials(c.name)}
              </div>
              <div style={{ flexShrink:0, marginTop:2 }}>
                {isVerified && (
                  <span style={{ display:'inline-flex', alignItems:'center', gap:4, fontSize:10, fontWeight:700,
                    padding:'3px 8px', borderRadius:999, background:'#E6F5F0', color:'#00875A', border:'1px solid #B2DFDB' }}>
                    <CheckCircle size={8} strokeWidth={3} /> Verified
                  </span>
                )}
                {isGoogle && (
                  <span style={{ display:'inline-flex', alignItems:'center', gap:4, fontSize:10, fontWeight:700,
                    padding:'3px 8px', borderRadius:999, background:'#EEF2FF', color:'#4F46E5', border:'1px solid #C7D2FE' }}>
                    <Globe size={8} strokeWidth={3} /> Google
                  </span>
                )}
                {!isVerified && !isGoogle && (
                  <span style={{ fontSize:10, padding:'3px 8px', borderRadius:999,
                    background:'#F9FAFB', color:'#D1D5DB', border:'1px solid #F3F4F6' }}>
                    Unclaimed
                  </span>
                )}
              </div>
            </div>

            {/* Name + city */}
            <div style={{ marginBottom:8 }}>
              <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:13.5, lineHeight:1.3,
                color:'#111827', marginBottom:3 }}>
                {c.name}
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:4, fontSize:11, color:'#9CA3AF' }}>
                <MapPin size={10} strokeWidth={2} />
                {c.city}{years ? ` · ${c.established_year}` : ''}
              </div>
            </div>

            {/* Stars */}
            <div style={{ marginBottom:10 }}>
              <StarBar rating={c.avg_rating} count={c.total_reviews} />
            </div>

            {/* Country flags */}
            {c.countries_covered.length > 0 && (
              <div style={{ display:'flex', flexWrap:'wrap', gap:4 }}>
                {c.countries_covered.slice(0,4).map(ct => (
                  <span key={ct} style={{ fontSize:10, padding:'2px 7px', borderRadius:6, display:'inline-flex',
                    alignItems:'center', gap:3, background:'#F9FAFB', color:'#6B7280', border:'1px solid #F3F4F6' }}>
                    {FLAG[ct] || '🌍'} {ct}
                  </span>
                ))}
                {c.countries_covered.length > 4 && (
                  <span style={{ fontSize:10, padding:'2px 7px', borderRadius:6,
                    background:'#F9FAFB', color:'#D1D5DB', border:'1px solid #F3F4F6' }}>
                    +{c.countries_covered.length - 4}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* Featured */}
      {c.is_featured && (
        <div style={{ position:'absolute', top:14, right:14, zIndex:2 }}>
          <span style={{ fontSize:10, fontWeight:700, padding:'2px 7px', borderRadius:999,
            background:'#FEF3C7', color:'#92400E', border:'1px solid #FDE68A' }}>★ Featured</span>
        </div>
      )}
    </motion.div>
  )
}
