import { supabase, Consultant, Review } from '@/lib/supabase'
import HeroSection from '@/components/home/HeroSection'
import ConsultantRail from '@/components/home/ConsultantRail'
import ConsultantCTA from '@/components/home/ConsultantCTA'
import RecentReviewsRail from '@/components/home/RecentReviewsRail'
import SignupCTA from '@/components/home/SignupCTA'
import WhatWeDoCard from '@/components/home/WhatWeDoCard'

async function getData() {
  const [
    { data: guwahati },
    { data: mbbs },
    { data: recent },
    { data: shillong },
    { data: canada },
    { data: topRated },
  ] = await Promise.all([
    supabase.from('consultants').select('*').eq('city','Guwahati').eq('is_active',true).order('avg_rating',{ascending:false}).limit(8),
    supabase.from('consultants').select('*').contains('specializations',['MBBS Abroad']).eq('is_active',true).order('total_reviews',{ascending:false}).limit(8),
    supabase.from('reviews').select('*').eq('is_verified',true).order('created_at',{ascending:false}).limit(12),
    supabase.from('consultants').select('*').eq('city','Shillong').eq('is_active',true).order('avg_rating',{ascending:false}).limit(8),
    supabase.from('consultants').select('*').contains('countries_covered',['Canada']).eq('is_active',true).order('avg_rating',{ascending:false}).limit(8),
    supabase.from('consultants').select('*').eq('verification_level','establishment_verified').eq('is_active',true).order('avg_rating',{ascending:false}).limit(8),
  ])
  return {
    guwahati: (guwahati||[]) as Consultant[],
    mbbs: (mbbs||[]) as Consultant[],
    recent: (recent||[]) as Review[],
    shillong: (shillong||[]) as Consultant[],
    canada: (canada||[]) as Consultant[],
    topRated: (topRated||[]) as Consultant[],
  }
}

export default async function HomePage() {
  const { guwahati, mbbs, recent, shillong, canada, topRated } = await getData()

  return (
    <div className="pt-14" style={{ background:'var(--body-bg)' }}>

      {/* 1. Search + categories — like Trustpilot homepage header */}
      <HeroSection />

      {/* 2. "Best in Guwahati" rail */}
      <ConsultantRail title="Best in Guwahati" consultants={guwahati} viewAllHref="/consultants?city=Guwahati" />

      {/* 3. Business CTA card — "Looking to grow your consultancy?" */}
      <ConsultantCTA />

      {/* 4. "Best MBBS Abroad Consultants" */}
      <ConsultantRail title="Best MBBS Abroad Consultants" consultants={mbbs} viewAllHref="/consultants?q=MBBS+Abroad" />

      {/* 5. Recent reviews horizontal rail */}
      <RecentReviewsRail reviews={recent} />

      {/* 6. "Help the next student" signup card */}
      <SignupCTA />

      {/* 7. "Best in Shillong" rail */}
      <ConsultantRail title="Best in Shillong" consultants={shillong} viewAllHref="/consultants?city=Shillong" />

      {/* 8. "We're NECF" identity card — mirrors Trustpilot's green card */}
      <WhatWeDoCard />

      {/* 9. Canada specialists */}
      <ConsultantRail title="Top Canada Specialists" consultants={canada} viewAllHref="/consultants?q=Canada" />

      {/* 10. Establishment verified */}
      {topRated.length > 0 && (
        <ConsultantRail title="Established & Verified" consultants={topRated} viewAllHref="/consultants?filter=verified" />
      )}

      {/* Bottom padding */}
      <div className="h-10" />
    </div>
  )
}
