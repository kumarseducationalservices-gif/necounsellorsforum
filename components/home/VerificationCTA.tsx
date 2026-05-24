import Link from 'next/link'
import { ShieldCheck, ArrowRight, Building2, FileCheck, Globe } from 'lucide-react'

const tiers = [
  {
    level: 'Google Verified',
    price: '₹1,200/year',
    icon: Globe,
    color: '#4A80F5',
    bg: 'rgba(74,128,245,0.08)',
    border: 'rgba(74,128,245,0.2)',
    perks: ['Claim your profile', 'Reply to reviews', 'Dashboard access', 'Business email badge'],
  },
  {
    level: 'Established & Verified',
    price: '₹3,500/year',
    icon: ShieldCheck,
    color: '#22C55E',
    bg: 'rgba(34,197,94,0.08)',
    border: 'rgba(34,197,94,0.2)',
    recommended: true,
    perks: ['Everything in Google', 'Trade License verified', 'ROC certificate badge', '"Operating since XXXX" display', 'Trust Matrix unlocked', 'Priority listing'],
  },
  {
    level: 'Event Activation',
    price: '₹5,000/event',
    icon: Building2,
    color: '#E8A238',
    bg: 'rgba(232,162,56,0.08)',
    border: 'rgba(232,162,56,0.2)',
    perks: ['Homepage featured rail', 'Push notification blast', 'Email to students', 'Event analytics', 'Student registrations', 'Post-event archive'],
  },
]

export default function VerificationCTA() {
  return (
    <section className="py-4">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full mb-4"
          style={{ background: 'var(--accent-gold-muted)', color: 'var(--accent-gold)', border: '1px solid rgba(232,162,56,0.2)' }}>
          <ShieldCheck size={12} />
          For Education Consultants
        </div>
        <h2 className="font-display text-4xl md:text-5xl italic mb-3" style={{ color: 'var(--text-primary)' }}>
          Build Trust.<br />
          <span className="gradient-gold">Get Verified.</span>
        </h2>
        <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
          Students and parents are choosing consultants based on verified proof.
          Stand out with a Trust Matrix that can&apos;t be faked.
        </p>
      </div>

      {/* Tier cards */}
      <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {tiers.map(tier => {
          const Icon = tier.icon
          return (
            <div key={tier.level}
              className="relative rounded-2xl p-6 gold-hover"
              style={{
                background: tier.bg,
                border: `1px solid ${tier.border}`,
              }}>
              {tier.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="text-xs px-3 py-1 rounded-full font-semibold"
                    style={{ background: 'var(--verified-green)', color: '#0D0F14' }}>
                    Recommended
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: tier.bg, border: `1px solid ${tier.border}` }}>
                  <Icon size={18} style={{ color: tier.color }} />
                </div>
                <div>
                  <div className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{tier.level}</div>
                  <div className="text-sm font-bold" style={{ color: tier.color }}>{tier.price}</div>
                </div>
              </div>

              <ul className="space-y-2 mb-6">
                {tier.perks.map(perk => (
                  <li key={perk} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: tier.color }} />
                    {perk}
                  </li>
                ))}
              </ul>

              <Link href="/consultants/verify"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
                style={{ background: tier.bg, border: `1px solid ${tier.border}`, color: tier.color }}>
                Get Started <ArrowRight size={14} />
              </Link>
            </div>
          )
        })}
      </div>

      {/* Bottom note */}
      <p className="text-center text-xs mt-6" style={{ color: 'var(--text-muted)' }}>
        Already listed? <Link href="/consultants/claim" className="underline" style={{ color: 'var(--accent-gold)' }}>Claim your existing profile →</Link>
      </p>
    </section>
  )
}
