import { Suspense } from 'react'
import { supabase, Consultant, VerificationLevel } from '@/lib/supabase'
import ConsultantCard from '@/components/ConsultantCard'
import ConsultantsFilter from '@/components/ConsultantsFilter'

interface SP { q?:string; city?:string; state?:string; sort?:string; filter?:string; specialization?:string }

async function getConsultants(p: SP): Promise<Consultant[]> {
  let q = supabase.from('consultants').select('*').eq('is_active', true)
  if (p.q)   q = q.textSearch('search_vector', p.q)
  if (p.city) q = q.ilike('city', p.city)
  if (p.state) q = q.ilike('state', p.state)
  if (p.filter === 'featured')  q = q.eq('is_featured', true)
  if (p.filter === 'verified')  q = q.eq('verification_level', 'establishment_verified' as VerificationLevel)
  if (p.specialization) q = q.contains('specializations', [p.specialization])
  if (p.sort === 'rating')  q = q.order('avg_rating', { ascending: false })
  else if (p.sort === 'reviews') q = q.order('total_reviews', { ascending: false })
  else q = q.order('is_featured', { ascending: false }).order('avg_rating', { ascending: false })
  const { data } = await q.limit(48)
  return (data || []) as Consultant[]
}

export default async function ConsultantsPage({ searchParams }: { searchParams: Promise<SP> }) {
  const params = await searchParams
  const consultants = await getConsultants(params)

  return (
    <div className="pt-24 min-h-screen section-dark pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="font-display font-extrabold text-4xl mb-2" style={{ color:'var(--ti-text)' }}>
            {params.q ? `Results for "${params.q}"` : 'Find Consultants'}
          </h1>
          <p className="text-sm" style={{ color:'var(--ti-muted)' }}>
            {consultants.length} consultant{consultants.length !== 1 ? 's' : ''} found
            {params.city ? ` in ${params.city}` : ' across Northeast India'}
          </p>
        </div>
        <Suspense><ConsultantsFilter params={params} /></Suspense>
        {consultants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            {consultants.map(c => <ConsultantCard key={c.id} consultant={c} />)}
          </div>
        ) : (
          <div className="mt-20 text-center py-20 card-dark max-w-md mx-auto">
            <p className="font-display font-bold text-lg mb-2" style={{ color:'var(--ti-text)' }}>No consultants found</p>
            <p className="text-sm" style={{ color:'var(--ti-muted)' }}>Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}
