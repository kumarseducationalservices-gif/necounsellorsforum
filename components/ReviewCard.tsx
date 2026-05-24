import { Star, CheckCircle2, Plane } from 'lucide-react'
import { Review } from '@/lib/supabase'
import { formatDate, getInitials } from '@/lib/utils'

interface Props { review: Review }

const TYPE_CONFIG = {
  student_proof: { label: 'Student Proof', color: '#22C55E', bg: 'rgba(34,197,94,0.1)', icon: CheckCircle2 },
  visa_success: { label: 'Visa Success', color: '#4A80F5', bg: 'rgba(74,128,245,0.1)', icon: Plane },
  general: { label: 'Review', color: 'var(--text-muted)', bg: 'var(--surface-2)', icon: Star },
}

export default function ReviewCard({ review: r }: Props) {
  const config = TYPE_CONFIG[r.review_type as keyof typeof TYPE_CONFIG] || TYPE_CONFIG.general
  const Icon = config.icon

  return (
    <div className="rounded-xl p-5" style={{ background: 'var(--surface-1)', border: '1px solid var(--border)' }}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{ background: 'var(--surface-3)', color: 'var(--accent-gold)' }}>
            {getInitials(r.reviewer_name)}
          </div>
          <div>
            <div className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{r.reviewer_name}</div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{formatDate(r.created_at)}</div>
          </div>
        </div>

        {/* Type badge */}
        <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0"
          style={{ background: config.bg, color: config.color, border: `1px solid ${config.color}30` }}>
          <Icon size={11} />
          {config.label}
          {r.is_verified && ' ✓'}
        </span>
      </div>

      {/* Stars */}
      <div className="flex items-center gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={13}
            className={i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-700'} />
        ))}
      </div>

      {/* Content */}
      {r.content && (
        <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>{r.content}</p>
      )}

      {/* Meta */}
      {(r.university_name || r.country_for) && (
        <div className="text-xs flex flex-wrap gap-2" style={{ color: 'var(--text-muted)' }}>
          {r.country_for && (
            <span className="px-2 py-1 rounded-md" style={{ background: 'var(--surface-2)' }}>
              📍 {r.country_for}
            </span>
          )}
          {r.university_name && (
            <span className="px-2 py-1 rounded-md" style={{ background: 'var(--surface-2)' }}>
              🎓 {r.university_name}
            </span>
          )}
          {r.year && (
            <span className="px-2 py-1 rounded-md" style={{ background: 'var(--surface-2)' }}>
              {r.year}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
