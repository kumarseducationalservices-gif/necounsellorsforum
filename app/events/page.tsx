import { supabase, Event } from '@/lib/supabase'
import EventCard from '@/components/EventCard'
import { Calendar } from 'lucide-react'

async function getEvents() {
  const { data } = await supabase
    .from('events')
    .select('*, consultants(name, slug, logo_url, verification_level)')
    .eq('is_active', true)
    .gte('event_date', new Date().toISOString())
    .order('event_date', { ascending: true })
  return (data || []) as unknown as Event[]
}

const TYPE_FILTERS = ['All', 'Webinar', 'Seminar', 'University Event', 'Country Fair', 'Visa Guidance']

export default async function EventsPage() {
  const events = await getEvents()

  const featured = events.filter(e => e.is_featured)
  const upcoming = events.filter(e => !e.is_featured)

  return (
    <div className="pt-24 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(74,128,245,0.12)' }}>
              <Calendar size={18} style={{ color: '#4A80F5' }} />
            </div>
            <h1 className="font-display text-4xl italic" style={{ color: 'var(--text-primary)' }}>
              Education Events
            </h1>
          </div>
          <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
            Seminars, webinars & fairs by verified Northeast India consultants
          </p>
        </div>

        {/* Featured events */}
        {featured.length > 0 && (
          <section className="mb-12">
            <h2 className="font-semibold text-sm uppercase tracking-wider mb-5"
              style={{ color: 'var(--text-muted)' }}>
              Featured Events
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featured.map(e => <EventCard key={e.id} event={e} />)}
            </div>
          </section>
        )}

        {/* All upcoming */}
        {upcoming.length > 0 && (
          <section>
            <h2 className="font-semibold text-sm uppercase tracking-wider mb-5"
              style={{ color: 'var(--text-muted)' }}>
              Upcoming Events
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {upcoming.map(e => <EventCard key={e.id} event={e} />)}
            </div>
          </section>
        )}

        {events.length === 0 && (
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              style={{ background: 'var(--surface-2)' }}>
              <Calendar size={24} style={{ color: 'var(--text-muted)' }} />
            </div>
            <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>No upcoming events</h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Check back soon for seminars and webinars.</p>
          </div>
        )}

        {/* CTA for consultants */}
        <div className="mt-16 rounded-2xl p-8 text-center"
          style={{ background: 'var(--surface-1)', border: '1px solid var(--border)' }}>
          <h3 className="font-semibold text-xl mb-2" style={{ color: 'var(--text-primary)' }}>
            Running an education event?
          </h3>
          <p className="text-sm mb-6 max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Feature your seminar, webinar or scholarship fair on NE Counsellors Forum.
            Reach thousands of students across Northeast India.
          </p>
          <a href="/consultants/verify"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
            style={{ background: 'linear-gradient(135deg, #E8A238, #F5C842)', color: '#0D0F14' }}>
            Feature My Event — ₹5,000
          </a>
        </div>
      </div>
    </div>
  )
}
