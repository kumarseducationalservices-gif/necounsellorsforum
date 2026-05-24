import { supabase, Consultant, Event } from '@/lib/supabase'
import HeroSection from '@/components/home/HeroSection'
import TrustBar from '@/components/home/TrustBar'
import ConsultantRail from '@/components/home/ConsultantRail'
import EventsRail from '@/components/home/EventsRail'
import VerificationCTA from '@/components/home/VerificationCTA'

async function getHomeData() {
  const [{ data: featured }, { data: trending }, { data: events }] = await Promise.all([
    supabase.from('consultants').select('*').eq('is_featured', true).order('avg_rating', { ascending: false }).limit(8),
    supabase.from('consultants').select('*').eq('verification_level', 'establishment_verified').order('total_reviews', { ascending: false }).limit(8),
    supabase.from('events').select('*, consultants(name, slug, logo_url, verification_level)').eq('is_active', true).order('event_date', { ascending: true }).limit(6),
  ])
  return {
    featured: (featured || []) as Consultant[],
    trending: (trending || []) as Consultant[],
    events: (events || []) as unknown as Event[],
  }
}

export default async function HomePage() {
  const { featured, trending, events } = await getHomeData()
  return (
    <div className="pt-16">
      <HeroSection />
      <TrustBar />
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {featured.length > 0 && (
          <ConsultantRail title="Featured Consultants" subtitle="Handpicked, establishment-verified advisors" consultants={featured} viewAllHref="/consultants?filter=featured" />
        )}
        {events.length > 0 && <EventsRail events={events} />}
        {trending.length > 0 && (
          <ConsultantRail title="Most Trusted This Month" subtitle="Highest-rated by verified student reviews" consultants={trending} viewAllHref="/consultants?sort=rating" />
        )}
        <VerificationCTA />
      </div>
    </div>
  )
}
