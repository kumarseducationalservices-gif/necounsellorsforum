'use client'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { MapPin, Award, Star } from 'lucide-react'
import { Consultant } from '@/lib/supabase'
import { getInitials, getYearsInOperation } from '@/lib/utils'

const GRADIENT_PRESETS = [
  'linear-gradient(135deg,#4F46E5 0%,#7C3AED 100%)',
  'linear-gradient(135deg,#0369A1 0%,#0EA5E9 100%)',
  'linear-gradient(135deg,#065F46 0%,#10B981 100%)',
  'linear-gradient(135deg,#9D174D 0%,#EC4899 100%)',
  'linear-gradient(135deg,#92400E 0%,#F59E0B 100%)',
  'linear-gradient(135deg,#1E3A5F 0%,#3B82F6 100%)',
]

function getGradient(name: string) {
  const i = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % GRADIENT_PRESETS.length
  return GRADIENT_PRESETS[i]
}

function StarRow({ rating, count }: { rating: number; count: number }) {
  const full = Math.floor(rating)
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {[1,2,3,4,5].map(i => (
          <svg key={i} width="13" height="13" viewBox="0 0 24 24"
            fill={i <= full ? '#00875A' : i === full + 1 && rating % 1 >= 0.5 ? '#00875A' : '#D1FAE5'}
            opacity={i <= full ? 1 : i === full + 1 && rating % 1 >= 0.5 ? 0.7 : 0.3}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        ))}
      </div>
      <span className="text-xs font-bold tabular-nums" style={{ color:'#064E3B' }}>
        {rating > 0 ? rating.toFixed(1) : '—'}
      </span>
      {count > 0 && <span className="text-xs" style={{ color:'#9CA3AF' }}>({count})</span>}
    </div>
  )
}

const COUNTRY_FLAGS: Record<string,string> = {
  UK:'🇬🇧', Canada:'🍁', Australia:'🇦🇺', USA:'🇺🇸', Germany:'🇩🇪',
  France:'🇫🇷', Russia:'🇷🇺', Philippines:'🇵🇭', Bangladesh:'🇧🇩',
  Georgia:'🇬🇪', Kazakhstan:'🇰🇿', Netherlands:'🇳🇱', Ireland:'🇮🇪',
  'New Zealand':'🇳🇿', Singapore:'🇸🇬',
}

export default function ConsultantCard({ consultant: c, compact = false }: { consultant: Consultant; compact?: boolean }) {
  const initials = getInitials(c.name)
  const years = getYearsInOperation(c.established_year)
  const gradient = getGradient(c.name)
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0, gx: 50, gy: 50 })

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current; if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    setTilt({ x: (py - 0.5) * 6, y: -(px - 0.5) * 6, gx: px * 100, gy: py * 100 })
  }
  const onLeave = () => setTilt({ x: 0, y: 0, gx: 50, gy: 50 })

  const isEV = c.verification_level === 'establishment_verified'
  const isGV = c.verification_level === 'google_verified'

  return (
    <Link href={`/consultants/${c.slug}`}
      className="block flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-2xl"
      style={{ width: compact ? 230 : '100%' }}>
      <div ref={cardRef} onMouseMove={onMove} onMouseLeave={onLeave}
        className="relative rounded-2xl overflow-hidden cursor-pointer group"
        style={{
          background: '#fff',
          border: '1px solid #E5E7EB',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
          transform: `perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: tilt.x === 0 ? 'transform 0.5s cubic-bezier(0.23,1,0.32,1), box-shadow 0.3s' : 'none',
        }}>

        {/* ── Gradient band ── */}
        <div className="relative h-[52px] overflow-hidden" style={{ background: gradient }}>
          {/* Dot pattern */}
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage:'radial-gradient(circle,rgba(255,255,255,0.8) 1px,transparent 1px)', backgroundSize:'14px 14px' }} />
          {/* Shimmer on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
            style={{ background:`radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, white, transparent 60%)` }} />
          {/* Featured badge */}
          {c.is_featured && (
            <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background:'rgba(255,255,255,0.25)', color:'white', border:'1px solid rgba(255,255,255,0.4)', backdropFilter:'blur(4px)' }}>
              ★ Featured
            </span>
          )}
        </div>

        {/* ── Avatar — overlaps band ── */}
        <div className="absolute top-[28px] left-4">
          <div className="w-[44px] h-[44px] rounded-xl border-[2.5px] border-white flex items-center justify-center
            text-sm font-bold text-white shadow-md"
            style={{ background: gradient, boxShadow:'0 2px 8px rgba(0,0,0,0.2)' }}>
            {initials}
          </div>
        </div>

        {/* ── Body ── */}
        <div className="pt-7 px-4 pb-4">

          {/* Name */}
          <div className="font-bold text-sm leading-snug mb-0.5 pr-2 line-clamp-2"
            style={{ color:'#111827' }}>
            {c.name}
          </div>

          {/* City + Years */}
          <div className="flex items-center gap-2 mb-2.5">
            <span className="flex items-center gap-1 text-xs" style={{ color:'#6B7280' }}>
              <MapPin size={10} strokeWidth={2} />{c.city}
            </span>
            {years && (
              <span className="flex items-center gap-1 text-xs" style={{ color:'#9CA3AF' }}>
                <Award size={10} strokeWidth={2} />{years}y
              </span>
            )}
          </div>

          {/* Stars */}
          <div className="mb-2.5">
            <StarRow rating={c.avg_rating} count={c.total_reviews} />
          </div>

          {/* Verification badge */}
          {isEV && (
            <div className="flex items-center gap-1 mb-2.5">
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background:'#D1FAE5', color:'#065F46', border:'1px solid #6EE7B7' }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#065F46" strokeWidth="3">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                Established & Verified
              </span>
            </div>
          )}
          {isGV && !isEV && (
            <div className="flex items-center gap-1 mb-2.5">
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background:'#EEF2FF', color:'#4338CA', border:'1px solid #C7D2FE' }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#4338CA" strokeWidth="3">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                Google Verified
              </span>
            </div>
          )}

          {/* Country flags */}
          {c.countries_covered.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {c.countries_covered.slice(0, 3).map(ct => (
                <span key={ct} className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-md"
                  style={{ background:'#F3F4F6', color:'#374151', border:'1px solid #E5E7EB' }}>
                  {COUNTRY_FLAGS[ct] || '🌍'} {ct}
                </span>
              ))}
              {c.countries_covered.length > 3 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-md"
                  style={{ background:'#F3F4F6', color:'#9CA3AF', border:'1px solid #E5E7EB' }}>
                  +{c.countries_covered.length - 3}
                </span>
              )}
            </div>
          )}

          {/* CTA row */}
          <div className="flex items-center justify-between pt-2.5 border-t" style={{ borderColor:'#F3F4F6' }}>
            <span className="text-xs font-semibold group-hover:translate-x-0.5 transition-transform"
              style={{ color:'#4F46E5' }}>
              View Profile →
            </span>
            {c.student_proof_reviews > 0 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full"
                style={{ background:'#F0FDF4', color:'#16A34A', border:'1px solid #BBF7D0' }}>
                {c.student_proof_reviews} proofs
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
