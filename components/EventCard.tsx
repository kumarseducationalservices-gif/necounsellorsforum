import Link from 'next/link'
import { Calendar, MapPin, Users, Video, ArrowRight } from 'lucide-react'
import { Event } from '@/lib/supabase'
import { formatDate, getDaysUntil } from '@/lib/utils'

const EVENT_TYPE_LABELS: Record<string, string> = {
  webinar: 'Webinar',
  seminar: 'Seminar',
  office_walk_in: 'Open House',
  scholarship_test: 'Scholarship Test',
  visa_guidance: 'Visa Guidance',
  country_fair: 'Education Fair',
  university_event: 'University Event',
}

interface Props {
  event: Event
  compact?: boolean
}

export default function EventCard({ event: e, compact = false }: Props) {
  const daysLeft = getDaysUntil(e.event_date)
  const seatsLeft = e.total_seats ? e.total_seats - e.registered_count : null
  const seatsPercent = e.total_seats ? (e.registered_count / e.total_seats) * 100 : 0
  const isUrgent = daysLeft <= 7

  return (
    <div className="group rounded-xl overflow-hidden gold-hover"
      style={{ background: 'var(--surface-1)', border: '1px solid var(--border)', minWidth: compact ? 280 : 'auto' }}>

      {/* Banner */}
      <div className="relative h-32 flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, var(--surface-2), var(--surface-3))` }}>
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, var(--accent-blue) 0%, transparent 50%)' }} />

        {/* Event type pill */}
        <div className="absolute top-3 left-3">
          <span className="text-xs px-2.5 py-1 rounded-full font-medium"
            style={{ background: 'rgba(74,128,245,0.15)', color: '#4A80F5', border: '1px solid rgba(74,128,245,0.25)' }}>
            {EVENT_TYPE_LABELS[e.event_type] || e.event_type}
          </span>
        </div>

        {e.is_free && (
          <div className="absolute top-3 right-3">
            <span className="text-xs px-2.5 py-1 rounded-full font-medium"
              style={{ background: 'var(--verified-green-muted)', color: 'var(--verified-green)', border: '1px solid rgba(34,197,94,0.2)' }}>
              Free
            </span>
          </div>
        )}

        {/* Countdown */}
        <div className="text-center">
          <div className="font-display text-3xl italic" style={{ color: isUrgent ? '#F87171' : 'var(--accent-gold)' }}>
            {daysLeft <= 0 ? 'Live' : `${daysLeft}d`}
          </div>
          <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            {daysLeft <= 0 ? 'happening now' : 'to go'}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-sm leading-snug mb-2" style={{ color: 'var(--text-primary)' }}>
          {e.title}
        </h3>

        <div className="space-y-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
          <div className="flex items-center gap-1.5">
            <Calendar size={11} />
            {formatDate(e.event_date)}
          </div>
          <div className="flex items-center gap-1.5">
            {e.is_online ? <Video size={11} /> : <MapPin size={11} />}
            {e.is_online ? 'Online Webinar' : e.city}
          </div>
          {e.registered_count > 0 && (
            <div className="flex items-center gap-1.5">
              <Users size={11} />
              {e.registered_count} registered
              {seatsLeft !== null && seatsLeft <= 20 && (
                <span className="ml-1" style={{ color: '#F87171' }}>· {seatsLeft} seats left!</span>
              )}
            </div>
          )}
        </div>

        {/* Seat progress bar */}
        {e.total_seats && (
          <div className="mt-3">
            <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--surface-3)' }}>
              <div className="h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(seatsPercent, 100)}%`, background: seatsPercent > 80 ? '#F87171' : 'var(--accent-gold)' }} />
            </div>
          </div>
        )}

        {/* CTA */}
        <button className="mt-4 w-full py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all duration-150 group-hover:gap-3"
          style={{ background: 'var(--accent-gold-muted)', color: 'var(--accent-gold)', border: '1px solid rgba(232,162,56,0.2)' }}>
          Register Free
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  )
}
