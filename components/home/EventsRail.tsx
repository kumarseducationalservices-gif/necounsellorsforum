import Link from 'next/link'
import { ArrowRight, Zap } from 'lucide-react'
import { Event } from '@/lib/supabase'
import EventCard from '@/components/EventCard'

interface Props {
  events: Event[]
}

export default function EventsRail({ events }: Props) {
  return (
    <section>
      <div className="flex items-end justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(74,128,245,0.12)' }}>
            <Zap size={15} style={{ color: '#4A80F5' }} />
          </div>
          <div>
            <h2 className="font-semibold text-xl" style={{ color: 'var(--text-primary)' }}>Upcoming Education Events</h2>
            <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>
              Seminars, webinars & fairs by verified consultants
            </p>
          </div>
        </div>
        <Link href="/events" className="flex items-center gap-1.5 text-sm font-medium"
          style={{ color: '#4A80F5' }}>
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
