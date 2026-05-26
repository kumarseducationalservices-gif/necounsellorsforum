import { Suspense } from 'react'
import { supabase, Consultant, VerificationLevel } from '@/lib/supabase'
import ConsultantCard from '@/components/ConsultantCard'
import ConsultantsFilter from '@/components/ConsultantsFilter'
import { Search } from 'lucide-react'

type SP = { q?:string; city?:string; state?:string; sort?:string; filter?:string; specialization?:string; country?:string }

async function getConsultants(p: SP): Promise<Consultant[]> {
  let q = supabase.from('consultants').select('*').eq('is_active', true)
  if (p.q)             q = q.textSearch('search_vector', p.q)
  if (p.city)          q = q.ilike('city', p.city)
  if (p.state)         q = q.ilike('state', p.state)
  if (p.country)       q = q.contains('countries_covered', [p.country])
  if (p.filter === 'featured')       q = q.eq('is_featured', true)
  if (p.filter === 'verified')       q = q.eq('verification_level', 'establishment_verified' as VerificationLevel)
  if (p.filter === 'google_verified') q = q.eq('verification_level', 'google_verified' as VerificationLevel)
  if (p.specialization) q = q.contains('specializations', [p.specialization])
  if (p.sort === 'rating')   q = q.order('avg_rating', { ascending: false })
  else if (p.sort === 'reviews') q = q.order('total_reviews', { ascending: false })
  else q = q.order('is_featured',{ascending:false}).order('verification_level',{ascending:false}).order('avg_rating',{ascending:false})
  const { data } = await q.limit(48)
  return (data || []) as Consultant[]
}

export default async function ConsultantsPage({ searchParams }: { searchParams: Promise<SP> }) {
  const params = await searchParams
  const consultants = await getConsultants(params)
  const hasQuery = !!(params.q || params.city || params.filter || params.specialization || params.country)

  return (
    <div className="pt-14 min-h-screen pb-20" style={{ background:'var(--body-bg)' }}>

      {/* Sticky filter */}
      <Suspense>
        <ConsultantsFilter params={params} />
      </Suspense>

      <div className="max-w-7xl mx-auto px-4 pt-5">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="font-display font-bold text-xl" style={{ color:'var(--text)' }}>
              {params.q ? `Results for "${params.q}"` : params.city ? `Consultants in ${params.city}` : 'All Consultants'}
            </h1>
            <p className="text-sm mt-0.5" style={{ color:'var(--muted)' }}>
              {consultants.length} consultant{consultants.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>

        {/* Grid */}
        {consultants.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {consultants.map(c => <ConsultantCard key={c.id} consultant={c} />)}
          </div>
        ) : (
          <div className="flex flex-col items-center py-20 text-center">
            <div className="w-14 h-14 rounded-2xl mb-4 flex items-center justify-center"
              style={{ background:'#F3F4F6' }}>
              <Search size={22} style={{ color:'#9CA3AF' }} />
            </div>
            <h3 className="font-semibold mb-1" style={{ color:'var(--text)' }}>No consultants found</h3>
            <p className="text-sm" style={{ color:'var(--muted)' }}>Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
