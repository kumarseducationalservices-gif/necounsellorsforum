import Link from 'next/link'
import { ArrowRight, Zap } from 'lucide-react'
import { Event } from '@/lib/supabase'
import EventCard from '@/components/EventCard'

export default function EventsRail({ events }: { events: Event[] }) {
  return (
    <section>
      <div className="flex items-end justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(255,90,31,0.12)' }}>
            <Zap size={16} style={{ color: '#FF5A1F' }} />
          </div>
          <div>
            <h2 className="font-display font-bold text-xl" style={{ color: 'var(--ti-text)' }}>Upcoming Events</h2>
            <p className="text-sm" style={{ color: 'var(--ti-muted)' }}>Seminars, webinars & fairs by verified consultants</p>
          </div>
        </div>
        <Link href="/events" className="flex items-center gap-1 text-sm font-semibold" style={{ color: '#FF5A1F' }}>
          All events <ArrowRight size={14} />
        </Link>
      </div>
      <div className="scroll-rail pb-4">
        {events.map(e => (
          <div key={e.id} style={{ width: 300, flexShrink: 0 }}>
            <EventCard event={e} compact />
          </div>
        ))}
      </div>
    </section>
  )
}
