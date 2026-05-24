import Link from 'next/link'
import { Star, MapPin, Users, Award } from 'lucide-react'
import { Consultant } from '@/lib/supabase'
import { getInitials, getYearsInOperation } from '@/lib/utils'
import VerificationBadge from './VerificationBadge'

interface Props {
  consultant: Consultant
  compact?: boolean
}

export default function ConsultantCard({ consultant: c, compact = false }: Props) {
  const years = getYearsInOperation(c.established_year)
  const initials = getInitials(c.name)

  return (
    <Link href={`/consultants/${c.slug}`}
      className="group block rounded-xl overflow-hidden gold-hover transition-all duration-200"
      style={{ background: 'var(--surface-1)', border: '1px solid var(--border)', minWidth: compact ? 260 : 'auto' }}>

      {/* Cover / Logo area */}
      <div className="relative h-28 flex items-end px-4 pb-0"
        style={{ background: `linear-gradient(135deg, var(--surface-2) 0%, var(--surface-3) 100%)` }}>
        {/* Pattern bg */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, var(--accent-gold) 0%, transparent 50%)' }} />

        {/* Logo */}
        <div className="relative -mb-7 w-14 h-14 rounded-xl flex items-center justify-center text-sm font-bold border-2"
          style={{
            background: c.logo_url ? 'transparent' : `linear-gradient(135deg, var(--surface-3), var(--accent-gold-muted))`,
            borderColor: 'var(--bg)',
            color: 'var(--accent-gold)',
            fontSize: 16,
          }}>
          {c.logo_url ? <img src={c.logo_url} alt="" className="w-full h-full object-cover rounded-xl" /> : initials}
        </div>

        {c.is_featured && (
          <span className="absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ background: 'var(--accent-gold-muted)', color: 'var(--accent-gold)' }}>
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 pt-10">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-sm leading-tight group-hover:text-white transition-colors"
            style={{ color: 'var(--text-primary)' }}>
            {c.name}
          </h3>
        </div>

        {/* Tagline */}
        {c.tagline && (
          <p className="text-xs mb-3 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>{c.tagline}</p>
        )}

        {/* Badge */}
        <div className="mb-3">
          <VerificationBadge level={c.verification_level} size="sm" />
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-secondary)' }}>
          <span className="flex items-center gap-1">
            <Star size={11} className="fill-amber-400 text-amber-400" />
            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{c.avg_rating.toFixed(1)}</span>
            <span>({c.total_reviews})</span>
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={11} />
            {c.city}
          </span>
          {years && (
            <span className="flex items-center gap-1">
              <Award size={11} />
              {years}y
            </span>
          )}
        </div>

        {/* Countries */}
        {c.countries_covered.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {c.countries_covered.slice(0, 4).map(country => (
              <span key={country} className="text-xs px-2 py-0.5 rounded-md"
                style={{ background: 'var(--surface-3)', color: 'var(--text-secondary)' }}>
                {country}
              </span>
            ))}
            {c.countries_covered.length > 4 && (
              <span className="text-xs px-2 py-0.5 rounded-md" style={{ background: 'var(--surface-3)', color: 'var(--text-muted)' }}>
                +{c.countries_covered.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}
