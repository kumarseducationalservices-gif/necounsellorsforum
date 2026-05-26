import Link from 'next/link'
import { Review } from '@/lib/supabase'
import { getInitials, formatDate } from '@/lib/utils'

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({length:5}).map((_,i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24"
          fill={i < rating ? '#00875A' : '#E5E7EB'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  )
}

const AVATAR_COLORS = ['#4F46E5','#FF5A1F','#00875A','#D4AF37','#EC4899','#8B5CF6']

interface Props { reviews: (Review & { consultants?: { name: string; slug: string } })[] }

export default function RecentReviewsRail({ reviews }: Props) {
  if (!reviews.length) return null
  return (
    <section className="px-4 py-5" style={{ background:'var(--body-bg)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-bold text-lg" style={{ color:'var(--text)' }}>Recent reviews</h2>
          <Link href="/consultants" className="text-sm font-medium" style={{ color:'var(--indigo)' }}>See all</Link>
        </div>

        <div className="scroll-rail">
          {reviews.map((r, idx) => {
            const initials = getInitials(r.reviewer_name)
            const bg = AVATAR_COLORS[idx % AVATAR_COLORS.length]
            return (
              <div key={r.id} className="tp-card p-4 flex flex-col gap-3"
                style={{ width:260, flexShrink:0, minHeight:180 }}>

                {/* Reviewer */}
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ background: bg }}>
                    {initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color:'var(--text)' }}>{r.reviewer_name}</div>
                    <div className="text-xs" style={{ color:'var(--muted)' }}>{formatDate(r.created_at)}</div>
                  </div>
                </div>

                {/* Stars */}
                <Stars rating={r.rating} />

                {/* Review text */}
                <p className="text-xs leading-relaxed flex-1 line-clamp-4" style={{ color:'var(--muted)' }}>
                  {r.content}
                </p>

                {/* Company at bottom */}
                {r.country_for && (
                  <div className="flex items-center gap-1.5 pt-2 border-t" style={{ borderColor:'var(--border)' }}>
                    <span className="text-lg">
                      {r.country_for === 'UK' ? '🇬🇧' : r.country_for === 'Canada' ? '🍁' : r.country_for === 'Australia' ? '🇦🇺' : r.country_for === 'Russia' ? '🇷🇺' : r.country_for === 'Germany' ? '🇩🇪' : r.country_for === 'Philippines' ? '🇵🇭' : r.country_for === 'Bangladesh' ? '🇧🇩' : r.country_for === 'Georgia' ? '🇬🇪' : '🌍'}
                    </span>
                    <span className="text-xs font-medium" style={{ color:'var(--muted)' }}>
                      {r.country_for}{r.university_name ? ` · ${r.university_name}` : ''}
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
