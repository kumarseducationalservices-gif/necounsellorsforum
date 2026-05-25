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
      <div className="flex items-end justify-between mb-5">
        <div>
          <h2 className="font-display font-bold text-2xl" style={{ color:'var(--ti-text)' }}>{title}</h2>
          {subtitle && <p className="text-sm mt-1" style={{ color:'var(--ti-muted)' }}>{subtitle}</p>}
        </div>
        <Link href={viewAllHref}
          className="flex items-center gap-1.5 text-sm font-semibold flex-shrink-0 ml-4"
          style={{ color:'var(--ti-accent2)' }}>
          View all <ArrowRight size={14} />
        </Link>
      </div>
      <div className="scroll-rail">
        {consultants.map(c => (
          <div key={c.id} style={{ width:272, flexShrink:0 }}>
            <ConsultantCard consultant={c} compact />
          </div>
        ))}
      </div>
    </section>
  )
}
