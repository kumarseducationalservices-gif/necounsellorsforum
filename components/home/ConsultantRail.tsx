import Link from 'next/link'
import { Consultant } from '@/lib/supabase'
import ConsultantCard from '@/components/ConsultantCard'

interface Props { title: string; consultants: Consultant[]; viewAllHref: string }

export default function ConsultantRail({ title, consultants, viewAllHref }: Props) {
  if (!consultants.length) return null
  return (
    <section className="px-4 py-5">
      <div className="flex items-center justify-between mb-3 max-w-7xl mx-auto">
        <h2 className="font-display font-bold text-lg" style={{ color:'var(--text)' }}>{title}</h2>
        <Link href={viewAllHref} className="text-sm font-medium" style={{ color:'var(--indigo)' }}>See more</Link>
      </div>
      <div className="scroll-rail max-w-7xl mx-auto px-0">
        {consultants.map(c => <ConsultantCard key={c.id} consultant={c} compact />)}
      </div>
    </section>
  )
}
