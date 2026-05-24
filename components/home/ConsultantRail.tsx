import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Consultant } from '@/lib/supabase'
import ConsultantCard from '@/components/ConsultantCard'

interface Props {
  title: string
  subtitle?: string
  consultants: Consultant[]
  viewAllHref: string
}

export default function ConsultantRail({ title, subtitle, consultants, viewAllHref }: Props) {
  return (
    <section>
      {/* Rail header */}
      <div className="flex items-end justify-between mb-5">
        <div>
          <h2 className="font-semibold text-xl" style={{ color: 'var(--text-primary)' }}>{title}</h2>
          {subtitle && <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>{subtitle}</p>}
        </div>
        <Link href={viewAllHref}
          className="flex items-center gap-1.5 text-sm font-medium transition-colors"
          style={{ color: 'var(--accent-gold)' }}>
          View all <ArrowRight size={14} />
        </Link>
      </div>

      {/* Scroll rail */}
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
