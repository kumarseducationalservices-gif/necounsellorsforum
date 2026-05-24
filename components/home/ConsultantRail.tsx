import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Consultant } from '@/lib/supabase'
import ConsultantCard from '@/components/ConsultantCard'

interface Props { title: string; subtitle?: string; consultants: Consultant[]; viewAllHref: string; dark?: boolean }

export default function ConsultantRail({ title, subtitle, consultants, viewAllHref, dark }: Props) {
  return (
    <section>
      <div className="flex items-end justify-between mb-5">
        <div>
          <h2 className="font-display font-bold text-xl" style={{ color: dark ? 'var(--ti-text)' : 'var(--gs-text)' }}>{title}</h2>
          {subtitle && <p className="text-sm mt-0.5" style={{ color: dark ? 'var(--ti-muted)' : '#6B7280' }}>{subtitle}</p>}
        </div>
        <Link href={viewAllHref} className="flex items-center gap-1 text-sm font-semibold transition-all"
          style={{ color: dark ? 'var(--ti-accent2)' : 'var(--gs-gold)' }}>
          View all <ArrowRight size={14} />
        </Link>
      </div>
      <div className="scroll-rail pb-4">
        {consultants.map(c => (
          <div key={c.id} style={{ width: 280, flexShrink: 0 }}>
            <ConsultantCard consultant={c} compact />
          </div>
        ))}
      </div>
    </section>
  )
}
