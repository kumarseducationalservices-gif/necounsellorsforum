'use client'
import { useRef, MouseEvent } from 'react'
import Link from 'next/link'
import { Star, MapPin, Award, CheckCircle2 } from 'lucide-react'
import { Consultant } from '@/lib/supabase'
import { getInitials, getYearsInOperation } from '@/lib/utils'

interface Props { consultant: Consultant; compact?: boolean }

const LEVEL_CONFIG = {
  establishment_verified: { label: 'Established & Verified', color: '#22C55E', cls: 'green' },
  google_verified:        { label: 'Google Verified',        color: '#818CF8', cls: '' },
  unverified:             { label: 'Unverified',             color: '#64748B', cls: '' },
}

export default function ConsultantCard({ consultant: c, compact = false }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const years = getYearsInOperation(c.established_year)
  const cfg = LEVEL_CONFIG[c.verification_level]
  const initials = getInitials(c.name)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = (e.clientX - left) / width - 0.5
    const y = (e.clientY - top) / height - 0.5
    el.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-3px)`
  }
  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = ''
  }

  return (
    <Link href={`/consultants/${c.slug}`}>
      <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
        className="tilt-card rounded-2xl overflow-hidden cursor-pointer"
        style={{
          background: 'var(--gs-bg)',
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
          minWidth: compact ? 260 : 'auto',
          transition: 'box-shadow 0.25s',
        }}
        onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.14)')}
        onMouseOut={e => (e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)')}>

        {/* Top band — Global Scholar moss/sage */}
        <div className="h-20 relative flex items-end px-4 pb-0"
          style={{ background: 'linear-gradient(135deg,#1E3A34,#2D5446)' }}>
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 30% 50%,#D4AF37,transparent 60%)' }} />
          {c.is_featured && (
            <span className="absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full font-semibold"
              style={{ background: 'rgba(212,175,55,0.2)', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.3)' }}>
              Featured
            </span>
          )}
          {/* Avatar */}
          <div className="relative -mb-7 w-14 h-14 rounded-2xl flex items-center justify-center font-display font-bold text-sm border-2"
            style={{ background: 'linear-gradient(135deg,#D4AF37,#F0C757)', borderColor: 'var(--gs-bg)', color: '#1a1500' }}>
            {c.logo_url ? <img src={c.logo_url} alt="" className="w-full h-full object-cover rounded-2xl" /> : initials}
          </div>
        </div>

        {/* Body */}
        <div className="p-4 pt-10">
          <h3 className="font-display font-bold text-sm leading-snug mb-0.5" style={{ color: 'var(--gs-text)' }}>
            {c.name}
          </h3>
          {c.tagline && (
            <p className="text-xs mb-3 line-clamp-2 leading-relaxed" style={{ color: '#6B7280' }}>{c.tagline}</p>
          )}

          {/* Badge */}
          <span className={`badge-verified ${cfg.cls} mb-3`} style={{ color: cfg.color }}>
            <CheckCircle2 size={11} />
            {cfg.label}
          </span>

          {/* Stats */}
          <div className="flex items-center gap-3 mt-3 text-xs" style={{ color: '#6B7280' }}>
            <span className="flex items-center gap-1">
              <Star size={11} className="fill-amber-400 text-amber-400" />
              <strong style={{ color: 'var(--gs-text)' }}>{c.avg_rating.toFixed(1)}</strong>
              <span>({c.total_reviews})</span>
            </span>
            <span className="flex items-center gap-1"><MapPin size={11} />{c.city}</span>
            {years && <span className="flex items-center gap-1"><Award size={11} />{years}y</span>}
          </div>

          {/* Countries */}
          {c.countries_covered.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {c.countries_covered.slice(0,4).map(co => (
                <span key={co} className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: 'rgba(212,175,55,0.1)', color: '#B8960C', border: '1px solid rgba(212,175,55,0.2)' }}>
                  {co}
                </span>
              ))}
              {c.countries_covered.length > 4 && (
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#F3F4F6', color: '#9CA3AF' }}>
                  +{c.countries_covered.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
