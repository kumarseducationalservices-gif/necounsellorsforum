import Link from 'next/link'
import { MapPin, Award, CheckCircle, Globe, Shield } from 'lucide-react'
import { Consultant } from '@/lib/supabase'
import { getInitials, getYearsInOperation } from '@/lib/utils'

// Deterministic gradient based on name
function nameGradient(name: string) {
  const gradients = [
    ['#4F46E5','#7C3AED'],['#0EA5E9','#0284C7'],['#059669','#047857'],
    ['#D97706','#B45309'],['#DC2626','#B91C1C'],['#7C3AED','#6D28D9'],
    ['#0891B2','#0E7490'],['#65A30D','#4D7C0F'],
  ]
  const idx = name.split('').reduce((a,c)=>a+c.charCodeAt(0),0) % gradients.length
  return gradients[idx]
}

function StarRow({ rating, count }: { rating: number; count: number }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  const ratingColor = rating >= 4 ? '#00875A' : rating >= 3 ? '#F59E0B' : '#EF4444'
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-[2px]">
        {Array.from({length:5}).map((_,i) => {
          const fill = i < full ? ratingColor : (i === full && half) ? ratingColor : '#E5E7EB'
          return (
            <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={fill} style={{ flexShrink:0 }}>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          )
        })}
      </div>
      {count > 0 ? (
        <span className="text-xs font-semibold" style={{ color: ratingColor }}>{rating.toFixed(1)}</span>
      ) : (
        <span className="text-xs" style={{ color:'var(--muted-light)' }}>New</span>
      )}
      {count > 0 && <span className="text-xs" style={{ color:'var(--muted)' }}>({count})</span>}
    </div>
  )
}

const FLAG: Record<string,string> = {
  UK:'🇬🇧', Canada:'🍁', Australia:'🇦🇺', USA:'🇺🇸', Germany:'🇩🇪',
  France:'🇫🇷', Russia:'🇷🇺', Philippines:'🇵🇭', Bangladesh:'🇧🇩',
  Georgia:'🇬🇪', Kazakhstan:'🇰🇿', Netherlands:'🇳🇱', Ireland:'🇮🇪',
  'New Zealand':'🇳🇿', Singapore:'🇸🇬',
}

interface Props { consultant: Consultant; compact?: boolean }

export default function ConsultantCard({ consultant: c, compact = false }: Props) {
  const [g1, g2] = nameGradient(c.name)
  const years = getYearsInOperation(c.established_year)
  const isVerified = c.verification_level === 'establishment_verified'
  const isGoogle  = c.verification_level === 'google_verified'

  return (
    <Link href={`/consultants/${c.slug}`}
      className="tp-card block group flex-shrink-0 overflow-hidden"
      style={{ width: compact ? 224 : '100%', minWidth: compact ? 224 : undefined,
               textDecoration:'none', position:'relative' }}>

      {/* Top accent bar */}
      <div className="h-1 w-full" style={{ background:`linear-gradient(90deg,${g1},${g2})` }} />

      <div className="p-4">
        {/* Logo + verification row */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
            style={{ background:`linear-gradient(135deg,${g1},${g2})`, fontFamily:'Syne,sans-serif', letterSpacing:'-0.5px' }}>
            {getInitials(c.name)}
          </div>
          <div className="flex-shrink-0 mt-0.5">
            {isVerified && (
              <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background:'#E6F5F0', color:'#00875A', border:'1px solid #B2DFDB' }}>
                <CheckCircle size={9} strokeWidth={2.5} />
                Verified
              </span>
            )}
            {isGoogle && (
              <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background:'#EEF2FF', color:'#4F46E5', border:'1px solid #C7D2FE' }}>
                <Globe size={9} strokeWidth={2.5} />
                Google
              </span>
            )}
            {!isVerified && !isGoogle && (
              <span className="text-[10px] px-2 py-0.5 rounded-full"
                style={{ background:'var(--surface-2)', color:'var(--muted-light)', border:'1px solid var(--border)' }}>
                Unclaimed
              </span>
            )}
          </div>
        </div>

        {/* Name + location */}
        <div className="mb-2">
          <h3 className="font-semibold text-sm leading-snug mb-0.5 group-hover:text-indigo-600 transition-colors"
            style={{ color:'var(--text)', fontFamily:'Syne,sans-serif' }}>
            {c.name}
          </h3>
          <div className="flex items-center gap-1 text-xs" style={{ color:'var(--muted)' }}>
            <MapPin size={10} strokeWidth={2} />
            {c.city}{years ? ` · Est. ${c.established_year}` : ''}
          </div>
        </div>

        {/* Stars */}
        <div className="mb-3">
          <StarRow rating={c.avg_rating} count={c.total_reviews} />
        </div>

        {/* Country flags */}
        {c.countries_covered.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {c.countries_covered.slice(0,5).map(ct => (
              <span key={ct} className="text-[11px] px-1.5 py-0.5 rounded-md flex items-center gap-0.5"
                style={{ background:'var(--surface-2)', color:'var(--muted)', border:'1px solid var(--border)' }}>
                {FLAG[ct] || '🌍'} {ct}
              </span>
            ))}
            {c.countries_covered.length > 5 && (
              <span className="text-[11px] px-1.5 py-0.5 rounded-md"
                style={{ background:'var(--surface-2)', color:'var(--muted-light)', border:'1px solid var(--border)' }}>
                +{c.countries_covered.length - 5}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Featured ribbon */}
      {c.is_featured && (
        <div className="absolute top-3 right-3">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ background:'#FEF3C7', color:'#92400E', border:'1px solid #FDE68A' }}>
            ★ Featured
          </span>
        </div>
      )}
    </Link>
  )
}
