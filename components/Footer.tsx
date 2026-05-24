import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'

const links = {
  Platform: [
    { href: '/consultants', label: 'Find Consultants' },
    { href: '/events', label: 'Education Events' },
    { href: '/consultants/compare', label: 'Compare Consultants' },
  ],
  'For Consultants': [
    { href: '/consultants/claim', label: 'Claim Profile' },
    { href: '/consultants/verify', label: 'Get Verified' },
    { href: '/consultants/suggest', label: 'Suggest a Consultant' },
  ],
  Northeast: [
    { href: '/consultants?state=Assam', label: 'Assam' },
    { href: '/consultants?state=Meghalaya', label: 'Meghalaya' },
    { href: '/consultants?state=Manipur', label: 'Manipur' },
    { href: '/consultants?state=Nagaland', label: 'Nagaland' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t mt-20" style={{ borderColor: 'var(--border)', background: 'var(--surface-1)' }}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #E8A238 0%, #F5C842 100%)' }}>
                <ShieldCheck size={16} color="#0D0F14" strokeWidth={2.5} />
              </div>
              <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>NE Counsellors Forum</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Northeast India&apos;s verified education consultant discovery platform. Trust built on proof.
            </p>
          </div>

          {/* Link groups */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>{group}</h4>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm transition-colors"
                      style={{ color: 'var(--text-secondary)' }}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--border)' }}>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            © 2025 NE Counsellors Forum. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Protecting students across Northeast India&apos;s 8 states
          </p>
        </div>
      </div>
    </footer>
  )
}
