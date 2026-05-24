import Link from 'next/link'
import { ShieldCheck, Globe, Building2, ArrowRight, Zap } from 'lucide-react'

const tiers = [
  { level: 'Google Verified', price: '₹1,200/yr', icon: Globe, color: '#818CF8', border: 'rgba(79,70,229,0.25)',
    perks: ['Claim your profile','Reply to reviews','Dashboard access','Business email badge'] },
  { level: 'Established & Verified', price: '₹3,500/yr', icon: ShieldCheck, color: '#22C55E',
    border: 'rgba(34,197,94,0.3)', recommended: true,
    perks: ['Everything in Google','Trade License badge','"Operating since XXXX"','Trust Matrix unlocked','Priority listing'] },
  { level: 'Event Activation', price: '₹5,000/event', icon: Zap, color: '#D4AF37',
    border: 'rgba(212,175,55,0.3)',
    perks: ['Homepage featured rail','Push notifications','Student registrations','Post-event recording','Analytics dashboard'] },
]

export default function VerificationCTA() {
  return (
    <section className="py-8 rounded-3xl px-6 md:px-10"
      style={{ background: 'linear-gradient(135deg,var(--ti-surf),var(--ti-surf2))', border: '1px solid var(--ti-border)' }}>
      <div className="text-center mb-10">
        <span className="badge-verified mb-4 inline-flex">
          <Building2 size={11} /> For Education Consultants
        </span>
        <h2 className="font-display font-extrabold text-4xl md:text-5xl mb-3" style={{ color: 'var(--ti-text)' }}>
          Build Trust.<br /><span className="text-gold">Get Verified.</span>
        </h2>
        <p className="text-base max-w-lg mx-auto" style={{ color: 'var(--ti-muted)' }}>
          Students pick consultants based on verified proof. A Trust Matrix badge can&apos;t be faked — and students know it.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {tiers.map(t => {
          const Icon = t.icon
          return (
            <div key={t.level} className="relative rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1"
              style={{ background: `${t.color}08`, border: `1px solid ${t.border}` }}>
              {t.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="text-xs px-3 py-1 rounded-full font-bold"
                    style={{ background: '#22C55E', color: '#0B0F19' }}>Recommended</span>
                </div>
              )}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${t.color}15`, border: `1px solid ${t.border}` }}>
                  <Icon size={18} style={{ color: t.color }} />
                </div>
                <div>
                  <div className="font-semibold text-sm" style={{ color: 'var(--ti-text)' }}>{t.level}</div>
                  <div className="font-bold text-sm" style={{ color: t.color }}>{t.price}</div>
                </div>
              </div>
              <ul className="space-y-2 mb-6">
                {t.perks.map(p => (
                  <li key={p} className="flex items-center gap-2 text-sm" style={{ color: 'var(--ti-muted)' }}>
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: t.color }} />
                    {p}
                  </li>
                ))}
              </ul>
              <Link href="/consultants/verify"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={{ background: `${t.color}12`, border: `1px solid ${t.border}`, color: t.color }}>
                Get Started <ArrowRight size={13} />
              </Link>
            </div>
          )
        })}
      </div>

      <p className="text-center text-xs mt-6" style={{ color: 'var(--ti-muted)' }}>
        Already listed?{' '}
        <Link href="/consultants/claim" style={{ color: 'var(--ti-accent2)' }} className="underline">
          Claim your existing profile →
        </Link>
      </p>
    </section>
  )
}
