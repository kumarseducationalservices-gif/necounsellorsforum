import { Suspense } from 'react'
import { supabase, Consultant, VerificationLevel } from '@/lib/supabase'
import ConsultantCard from '@/components/ConsultantCard'
import ConsultantsFilter from '@/components/ConsultantsFilter'
import { SlidersHorizontal } from 'lucide-react'

interface SearchParams {
  q?: string
  city?: string
  state?: string
  sort?: string
  filter?: string
  specialization?: string
}

async function getConsultants(params: SearchParams): Promise<Consultant[]> {
  let query = supabase.from('consultants').select('*').eq('is_active', true)

  if (params.q) {
    query = query.textSearch('search_vector', params.q)
  }
  if (params.city) query = query.ilike('city', params.city)
  if (params.state) query = query.ilike('state', params.state)
  if (params.filter === 'featured') query = query.eq('is_featured', true)
  if (params.filter === 'verified') query = query.eq('verification_level', 'establishment_verified' as VerificationLevel)
  if (params.specialization) query = query.contains('specializations', [params.specialization])

  if (params.sort === 'rating') {
    query = query.order('avg_rating', { ascending: false })
  } else if (params.sort === 'reviews') {
    query = query.order('total_reviews', { ascending: false })
  } else {
    query = query.order('is_featured', { ascending: false }).order('avg_rating', { ascending: false })
  }

  const { data } = await query.limit(48)
  return (data || []) as Consultant[]
}

export default async function ConsultantsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams
  const consultants = await getConsultants(params)

  const hasFilters = !!(params.q || params.city || params.filter || params.specialization)

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">

        {/* Page header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl italic mb-2" style={{ color: 'var(--text-primary)' }}>
            {params.q ? `Results for "${params.q}"` : 'Find Consultants'}
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {consultants.length} consultant{consultants.length !== 1 ? 's' : ''} found
            {params.city ? ` in ${params.city}` : ' across Northeast India'}
          </p>
        </div>

        {/* Filters */}
        <Suspense>
          <ConsultantsFilter params={params} />
        </Suspense>

        {/* Grid */}
        {consultants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 pb-20">
            {consultants.map(c => (
              <ConsultantCard key={c.id} consultant={c} />
            ))}
          </div>
        ) : (
          <div className="mt-20 text-center py-20">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              style={{ background: 'var(--surface-2)' }}>
              <SlidersHorizontal size={24} style={{ color: 'var(--text-muted)' }} />
            </div>
            <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>No consultants found</h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
