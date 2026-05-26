import { Review } from '@/lib/supabase'
import { formatDate, getInitials } from '@/lib/utils'
import { ThumbsUp, Share2, Flag } from 'lucide-react'

const AVATAR_COLORS = ['#4F46E5','#FF5A1F','#00875A','#D4AF37','#EC4899','#8B5CF6','#0EA5E9']
const TYPE_LABELS: Record<string,string> = { student_proof:'Student Proof ✓', visa_success:'Visa Success ✓', general:'Verified Review' }

let colorIdx = 0
const colorMap: Record<string,string> = {}
function getColor(name: string) {
  if (!colorMap[name]) colorMap[name] = AVATAR_COLORS[(colorIdx++) % AVATAR_COLORS.length]
  return colorMap[name]
}

export default function ReviewCard({ review: r }: { review: Review }) {
  const initials = getInitials(r.reviewer_name)
  const bg = getColor(r.reviewer_name)
  const label = TYPE_LABELS[r.review_type] || 'Review'

  return (
    <div className="tp-card p-4">
      {/* Reviewer row */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
          style={{ background: bg }}>
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm" style={{ color:'var(--text)' }}>{r.reviewer_name}</div>
          <div className="text-xs" style={{ color:'var(--muted)' }}>{formatDate(r.created_at)}</div>
        </div>
        {r.review_type !== 'general' && (
          <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
            style={{ background:'#E6F5F0', color:'#00875A', border:'1px solid #B2DFDB' }}>
            {label}
          </span>
        )}
      </div>

      {/* Stars */}
      <div className="flex gap-0.5 mb-2">
        {Array.from({length:5}).map((_,i)=>(
          <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i<r.rating?'#00875A':'#E5E7EB'}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        ))}
      </div>

      {/* Content */}
      {r.content && <p className="text-sm leading-relaxed mb-3" style={{ color:'var(--text)' }}>{r.content}</p>}

      {/* Company replied indicator — Trustpilot style */}
      {r.is_verified && (
        <div className="flex items-center gap-1.5 mb-3 text-xs" style={{ color:'var(--muted)' }}>
          <div className="w-4 h-4 rounded-full border flex items-center justify-center" style={{ borderColor:'var(--border)' }}>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
            </svg>
          </div>
          Company replied
        </div>
      )}

      {/* Meta */}
      {(r.university_name || r.country_for) && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {r.country_for && <span className="text-xs px-2 py-1 rounded-md" style={{ background:'var(--surface-2)', color:'var(--muted)' }}>📍 {r.country_for}</span>}
          {r.university_name && <span className="text-xs px-2 py-1 rounded-md" style={{ background:'var(--surface-2)', color:'var(--muted)' }}>🎓 {r.university_name}</span>}
        </div>
      )}

      {/* Useful / Share / Flag — exact Trustpilot action row */}
      <div className="flex items-center gap-4 pt-3 border-t" style={{ borderColor:'var(--border)' }}>
        <button className="flex items-center gap-1.5 text-xs transition-opacity hover:opacity-70" style={{ color:'var(--muted)' }}>
          <ThumbsUp size={13} /> Useful {r.helpful_count > 0 ? r.helpful_count : ''}
        </button>
        <button className="flex items-center gap-1.5 text-xs transition-opacity hover:opacity-70" style={{ color:'var(--muted)' }}>
          <Share2 size={13} /> Share
        </button>
        <button className="flex items-center gap-1.5 text-xs transition-opacity hover:opacity-70 ml-auto" style={{ color:'var(--muted)' }}>
          <Flag size={13} />
        </button>
      </div>
    </div>
  )
}
