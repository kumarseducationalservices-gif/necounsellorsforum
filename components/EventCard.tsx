'use client'
import Link from 'next/link'
import { Calendar, MapPin, Users, Video, ArrowRight } from 'lucide-react'
import { Event } from '@/lib/supabase'
import { formatDate, getDaysUntil } from '@/lib/utils'

const TYPE_LABELS: Record<string,string> = {
  webinar:'Webinar', seminar:'Seminar', office_walk_in:'Open House',
  scholarship_test:'Scholarship Test', visa_guidance:'Visa Guidance',
  country_fair:'Education Fair', university_event:'University Event',
}

export default function EventCard({ event: e, compact }: { event: Event; compact?: boolean }) {
  const daysLeft = getDaysUntil(e.event_date)
  const seatsLeft = e.total_seats ? e.total_seats - e.registered_count : null
  const seatsPercent = e.total_seats ? (e.registered_count / e.total_seats) * 100 : 0
  const isUrgent = daysLeft <= 7

  return (
    <div className="rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
      style={{ background: 'var(--ti-surf)', border: '1px solid var(--ti-border)', minWidth: compact ? 280 : 'auto',
        boxShadow: '0 2px 12px rgba(0,0,0,0.2)' }}>

      {/* Banner */}
      <div className="relative h-28 flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg,var(--ti-surf2),#1a2540)' }}>
        <div className="absolute inset-0 opacity-25"
          style={{ backgroundImage: 'radial-gradient(circle at 80% 20%,#4F46E5,transparent 55%)' }} />
        <div className="absolute top-3 left-3">
          <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
            style={{ background: 'rgba(79,70,229,0.18)', color: '#818CF8', border: '1px solid rgba(79,70,229,0.3)' }}>
            {TYPE_LABELS[e.event_type] || e.event_type}
          </span>
        </div>
        {e.is_free && (
          <div className="absolute top-3 right-3">
            <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
              style={{ background: 'rgba(34,197,94,0.15)', color: '#22C55E', border: '1px solid rgba(34,197,94,0.25)' }}>
              Free
            </span>
          </div>
        )}
        <div className="text-center">
          <div className="font-display font-extrabold text-4xl italic" style={{ color: isUrgent ? '#F87171' : '#D4AF37' }}>
            {daysLeft <= 0 ? 'Live' : `${daysLeft}d`}
          </div>
          <div className="text-xs" style={{ color: 'var(--ti-muted)' }}>{daysLeft <= 0 ? 'happening now' : 'to go'}</div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-sm leading-snug mb-2" style={{ color: 'var(--ti-text)' }}>{e.title}</h3>
        <div className="space-y-1.5 text-xs mb-3" style={{ color: 'var(--ti-muted)' }}>
          <div className="flex items-center gap-1.5"><Calendar size={11} />{formatDate(e.event_date)}</div>
          <div className="flex items-center gap-1.5">
            {e.is_online ? <Video size={11} /> : <MapPin size={11} />}
            {e.is_online ? 'Online' : e.city}
          </div>
          {e.registered_count > 0 && (
            <div className="flex items-center gap-1.5"><Users size={11} />{e.registered_count} registered
              {seatsLeft !== null && seatsLeft <= 20 && (
                <span className="ml-1 font-semibold" style={{ color: '#F87171' }}>· {seatsLeft} left!</span>
              )}
            </div>
          )}
        </div>

        {e.total_seats && (
          <div className="h-1 rounded-full overflow-hidden mb-4" style={{ background: 'var(--ti-surf2)' }}>
            <div className="h-full rounded-full" style={{ width: `${Math.min(seatsPercent,100)}%`,
              background: seatsPercent > 80 ? '#F87171' : '#D4AF37', transition: 'width 0.5s' }} />
          </div>
        )}

        <button className="w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-150 group"
          style={{ background: 'rgba(79,70,229,0.12)', color: '#818CF8', border: '1px solid rgba(79,70,229,0.2)' }}>
          Register Free <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  )
}
