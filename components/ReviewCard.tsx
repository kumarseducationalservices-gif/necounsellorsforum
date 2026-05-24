import { Star, CheckCircle2, Plane, ThumbsUp } from 'lucide-react'
import { Review } from '@/lib/supabase'
import { formatDate, getInitials } from '@/lib/utils'

const TYPE_CONFIG = {
  student_proof: { label: 'Student Proof ✓', bg: 'rgba(34,197,94,0.08)', color: '#22C55E', border: 'rgba(34,197,94,0.2)' },
  visa_success:  { label: 'Visa Success ✈',  bg: 'rgba(79,70,229,0.08)', color: '#818CF8', border: 'rgba(79,70,229,0.2)' },
  general:       { label: 'Review',           bg: 'rgba(0,0,0,0.04)',     color: '#6B7280', border: 'rgba(0,0,0,0.08)' },
}

const AVATAR_COLORS = ['#4F46E5','#FF5A1F','#D4AF37','#22C55E','#EC4899','#06B6D4']

export default function ReviewCard({ review: r }: { review: Review }) {
  const cfg = TYPE_CONFIG[r.review_type as keyof typeof TYPE_CONFIG] || TYPE_CONFIG.general
  const avatarColor = AVATAR_COLORS[r.reviewer_name.charCodeAt(0) % AVATAR_COLORS.length]

  return (
    <div className="rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1"
      style={{ background: 'white', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-display font-bold text-white flex-shrink-0"
            style={{ background: avatarColor }}>
            {getInitials(r.reviewer_name)}
          </div>
          <div>
            <div className="font-semibold text-sm" style={{ color: 'var(--gs-text)' }}>{r.reviewer_name}</div>
            <div className="text-xs" style={{ color: 'var(--cc-muted)' }}>{formatDate(r.created_at)}</div>
          </div>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full font-semibold flex-shrink-0"
          style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
          {cfg.label}
        </span>
      </div>

      {/* Stars */}
      <div className="flex items-center gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={13} className={i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'} />
        ))}
      </div>

      {/* Content */}
      {r.content && (
        <p className="text-sm leading-relaxed mb-3" style={{ color: '#374151' }}>{r.content}</p>
      )}

      {/* Meta tags */}
      {(r.university_name || r.country_for || r.year) && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {r.country_for && (
            <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: '#F3F4F6', color: '#4B5563' }}>
              📍 {r.country_for}
            </span>
          )}
          {r.university_name && (
            <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: '#F3F4F6', color: '#4B5563' }}>
              🎓 {r.university_name}
            </span>
          )}
          {r.year && (
            <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: '#F3F4F6', color: '#4B5563' }}>
              {r.year}
            </span>
          )}
        </div>
      )}

      {/* Helpful */}
      <button className="flex items-center gap-1.5 text-xs transition-colors"
        style={{ color: '#9CA3AF' }}
        onMouseEnter={e => (e.currentTarget.style.color = '#6B7280')}
        onMouseLeave={e => (e.currentTarget.style.color = '#9CA3AF')}>
        <ThumbsUp size={11} />
        Helpful ({r.helpful_count})
      </button>
    </div>
  )
}
