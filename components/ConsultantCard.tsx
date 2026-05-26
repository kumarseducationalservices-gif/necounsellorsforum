import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { Consultant } from '@/lib/supabase'
import { getInitials, getYearsInOperation } from '@/lib/utils'

interface Props { consultant: Consultant; compact?: boolean }

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({length:5}).map((_,i) => {
        const filled = i < full || (i === full && half)
        return (
          <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={filled ? '#00875A' : '#E5E7EB'}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        )
      })}
    </div>
  )
}

export default function ConsultantCard({ consultant: c, compact = false }: Props) {
  const initials = getInitials(c.name)
  const years = getYearsInOperation(c.established_year)
  const isVerified = c.verification_level === 'establishment_verified'
  const isGoogle = c.verification_level === 'google_verified'

  return (
    <Link href={`/consultants/${c.slug}`}
      className="tp-card block p-4 flex-shrink-0"
      style={{ width: compact ? 220 : '100%', minWidth: compact ? 220 : undefined }}>

      {/* Logo + name row */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
          style={{ background: `linear-gradient(135deg, #4F46E5, #6D63FF)` }}>
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm leading-snug truncate" style={{ color:'var(--text)' }}>
            {c.name}
          </div>
          <div className="text-xs truncate mt-0.5" style={{ color:'var(--muted)' }}>
            {c.city}, {c.state}
          </div>
        </div>
      </div>

      {/* Stars + count */}
      <div className="flex items-center gap-2 mb-2">
        <Stars rating={c.avg_rating} />
        <span className="text-xs font-bold" style={{ color:'var(--text)' }}>
          {c.avg_rating > 0 ? c.avg_rating.toFixed(1) : 'New'}
        </span>
        {c.total_reviews > 0 && (
          <span className="text-xs" style={{ color:'var(--muted)' }}>({c.total_reviews})</span>
        )}
      </div>

      {/* Verified tag */}
      {isVerified && (
        <div className="flex items-center gap-1 text-xs font-medium" style={{ color:'#00875A' }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#00875A" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
          Established & Verified
        </div>
      )}
      {isGoogle && (
        <div className="text-xs" style={{ color:'#4F46E5' }}>Google Verified</div>
      )}
    </Link>
  )
}
