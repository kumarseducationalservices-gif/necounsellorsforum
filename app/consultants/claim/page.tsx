import { Search, FileCheck, ShieldCheck } from 'lucide-react'
import ClaimForm from '@/components/ClaimForm'
import VerificationCTA from '@/components/home/VerificationCTA'

export default function ClaimProfilePage() {
  return (
    <div className="pt-20 min-h-screen section-dark pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center"
            style={{ background:'rgba(79,70,229,0.12)', border:'1px solid rgba(79,70,229,0.25)' }}>
            <ShieldCheck size={24} style={{ color:'var(--ti-accent2)' }} />
          </div>
          <h1 className="font-display font-extrabold text-4xl mb-3" style={{ color:'var(--ti-text)' }}>
            Claim Your Profile
          </h1>
          <p className="text-base leading-relaxed" style={{ color:'var(--ti-muted)' }}>
            Your consultancy may already be listed. Claim it to reply to reviews,
            access your dashboard, and get verified.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          {[
            { icon: Search,     step:'1', label:'Search your name',        sub:'Find your listing' },
            { icon: FileCheck,  step:'2', label:'Submit request',          sub:'Takes 2 minutes' },
            { icon: ShieldCheck,step:'3', label:'Approved in 48hrs',       sub:'Badge goes live' },
          ].map(({ icon: Icon, step, label, sub }) => (
            <div key={step} className="text-center p-4 rounded-2xl"
              style={{ background:'var(--ti-surf)', border:'1px solid var(--ti-border)' }}>
              <div className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-xs font-bold"
                style={{ background:'rgba(79,70,229,0.15)', color:'var(--ti-accent2)' }}>
                {step}
              </div>
              <p className="text-xs font-semibold mb-0.5" style={{ color:'var(--ti-text)' }}>{label}</p>
              <p className="text-xs" style={{ color:'var(--ti-muted)' }}>{sub}</p>
            </div>
          ))}
        </div>

        <ClaimForm />
      </div>

      {/* Verification tiers — only visible here for logged-in consultants */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-20">
        <p className="text-center text-sm mb-8 font-semibold uppercase tracking-widest"
          style={{ color:'var(--ti-muted)' }}>
          After claiming — choose your verification level
        </p>
        <VerificationCTA />
      </div>
    </div>
  )
}
