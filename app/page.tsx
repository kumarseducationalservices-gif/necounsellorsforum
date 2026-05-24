import { supabase, Consultant, Event } from '@/lib/supabase'
import HeroSection from '@/components/home/HeroSection'
import TrustBar from '@/components/home/TrustBar'
import ConsultantRail from '@/components/home/ConsultantRail'
import EventsRail from '@/components/home/EventsRail'
import CommunitySection from '@/components/home/CommunitySection'
import VerificationCTA from '@/components/home/VerificationCTA'

async function getData() {
  const [{ data: featured }, { data: topRated }, { data: events }] = await Promise.all([
    supabase.from('consultants').select('*').eq('is_featured',true).order('avg_rating',{ascending:false}).limit(8),
    supabase.from('consultants').select('*').eq('verification_level','establishment_verified').order('total_reviews',{ascending:false}).limit(8),
    supabase.from('events').select('*, consultants(name,slug,logo_url,verification_level)').eq('is_active',true).order('event_date',{ascending:true}).limit(6),
  ])
  return {
    featured: (featured||[]) as Consultant[],
    topRated: (topRated||[]) as Consultant[],
    events: (events||[]) as unknown as Event[],
  }
}

export default async function HomePage() {
  const { featured, topRated, events } = await getData()
  return (
    <div>
      {/* MOOD 1 — Transparent Insider (dark) */}
      <div className="section-dark">
        <HeroSection />
        <TrustBar />
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-14">
          {featured.length > 0 && (
            <ConsultantRail title="Featured Consultants" subtitle="Handpicked, establishment-verified" consultants={featured} viewAllHref="/consultants?filter=featured" dark />
          )}
          {events.length > 0 && <EventsRail events={events} />}
        </div>
      </div>

      {/* MOOD 2 — Community Campus (warm) */}
      <CommunitySection />

      {/* MOOD 3 — Global Scholar (light) */}
      <div className="section-light">
        <div className="max-w-7xl mx-auto px-4 py-16 space-y-14">
          {topRated.length > 0 && (
            <ConsultantRail title="Most Trusted This Month" subtitle="Highest-rated by verified students" consultants={topRated} viewAllHref="/consultants?sort=rating" />
          )}
          <VerificationCTA />
        </div>
      </div>
    </div>
  )
}
