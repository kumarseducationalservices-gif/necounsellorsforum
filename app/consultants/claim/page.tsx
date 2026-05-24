import { ShieldCheck, Search, FileCheck } from 'lucide-react'
import ClaimForm from '@/components/ClaimForm'

export default function ClaimProfilePage() {
  return (
    <div className="pt-24 min-h-screen pb-20">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            style={{ background: 'var(--accent-gold-muted)', border: '1px solid rgba(232,162,56,0.2)' }}>
            <ShieldCheck size={24} style={{ color: 'var(--accent-gold)' }} />
          </div>
          <h1 className="font-display text-4xl italic mb-3" style={{ color: 'var(--text-primary)' }}>
            Claim Your Profile
          </h1>
          <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
            Your consultancy may already be listed. Claim it to reply to reviews,
            access your dashboard, and get verified.
          </p>
        </div>

        {/* How it works */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          {[
            { icon: Search, step: '1', label: 'Search your consultancy name' },
            { icon: FileCheck, step: '2', label: 'Submit verification request' },
            { icon: ShieldCheck, step: '3', label: 'Get approved in 48 hours' },
          ].map(({ icon: Icon, step, label }) => (
            <div key={step} className="text-center p-4 rounded-xl"
              style={{ background: 'var(--surface-1)', border: '1px solid var(--border)' }}>
              <div className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-xs font-bold"
                style={{ background: 'var(--accent-gold-muted)', color: 'var(--accent-gold)' }}>
                {step}
              </div>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Claim form */}
        <ClaimForm />
      </div>
    </div>
  )
}
