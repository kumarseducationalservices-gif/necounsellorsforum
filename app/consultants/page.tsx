import { Suspense } from 'react'
import { supabase, Consultant, VerificationLevel } from '@/lib/supabase'
import ConsultantCard from '@/components/ConsultantCard'
import ConsultantsFilter from '@/components/ConsultantsFilter'
import { Search } from 'lucide-react'

interface SP { q?:string; city?:string; state?:string; sort?:string; filter?:string; specialization?:string; country?:string }

async function getConsultants(p: SP): Promise<Consultant[]> {
  let q = supabase.from('consultants').select('*').eq('is_active', true)
  if (p.q)   q = q.textSearch('search_vector', p.q)
  if (p.city) q = q.ilike('city', p.city)
  if (p.state) q = q.ilike('state', p.state)
  if (p.filter === 'featured')  q = q.eq('is_featured', true)
  if (p.filter === 'verified')  q = q.eq('verification_level', 'establishment_verified' as VerificationLevel)
  if (p.specialization) q = q.contains('specializations', [p.specialization])
  if (p.country) q = q.contains('countries_covered', [p.country])
  if (p.sort === 'rating')   q = q.order('avg_rating', { ascending: false })
  else if (p.sort === 'reviews') q = q.order('total_reviews', { ascending: false })
  else q = q.order('is_featured', { ascending: false }).order('avg_rating', { ascending: false })
  const { data } = await q.limit(48)
  return (data || []) as Consultant[]
}

export default async function ConsultantsPage({ searchParams }: { searchParams: Promise<SP> }) {
  const params = await searchParams
  const consultants = await getConsultants(params)
  const hasFilters = !!(params.city || params.filter || params.sort || params.specialization || params.country)

  return (
    <div className="pt-14 min-h-screen pb-20" style={{ background:'var(--body-bg)' }}>
      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Page header */}
        <div className="mb-6">
          <h1 className="font-display font-bold text-2xl mb-1" style={{ color:'var(--text)' }}>
            {params.q ? `Results for "${params.q}"` : 'Find Consultants'}
          </h1>
          <p className="text-sm" style={{ color:'var(--muted)' }}>
            {consultants.length} consultant{consultants.length !== 1 ? 's' : ''}
            {params.city ? ` in ${params.city}` : ' across Northeast India'}
          </p>
        </div>

        <div className="grid lg:grid-cols-[300px,1fr] gap-6 items-start">
          {/* Sidebar filter */}
          <div className="lg:sticky lg:top-20">
            <Suspense>
              <ConsultantsFilter params={params} />
            </Suspense>
          </div>

          {/* Results grid */}
          <div>
            {consultants.length > 0 ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {consultants.map(c => <ConsultantCard key={c.id} consultant={c} />)}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 tp-card">
                <Search size={32} style={{ color:'var(--muted-light)', marginBottom:12 }} />
                <h3 className="font-semibold text-base mb-1" style={{ color:'var(--text)' }}>No consultants found</h3>
                <p className="text-sm text-center max-w-xs" style={{ color:'var(--muted)' }}>
                  Try adjusting your filters or search term.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
