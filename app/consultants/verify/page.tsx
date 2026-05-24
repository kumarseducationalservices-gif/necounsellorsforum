import { ShieldCheck, Upload, CheckCircle, Clock } from 'lucide-react'
import VerifyForm from '@/components/VerifyForm'

export default function VerifyPage() {
  return (
    <div className="pt-24 min-h-screen pb-20">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center badge-verified"
            style={{ background: 'var(--verified-green-muted)', border: '1px solid rgba(34,197,94,0.2)' }}>
            <ShieldCheck size={24} style={{ color: '#22C55E' }} />
          </div>
          <h1 className="font-display text-4xl italic mb-3" style={{ color: 'var(--text-primary)' }}>
            Get <span className="gradient-gold">Establishment Verified</span>
          </h1>
          <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
            The highest trust level on NE Counsellors Forum.
            Upload your legal documents — we verify and display your establishment year publicly.
          </p>
        </div>

        {/* What you need */}
        <div className="rounded-2xl p-6 mb-8" style={{ background: 'var(--surface-1)', border: '1px solid var(--border)' }}>
          <h2 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Documents Required</h2>
          <div className="space-y-3">
            {[
              { doc: 'Trade License', required: true, note: 'From your local municipal body' },
              { doc: 'ROC Certificate / Certificate of Incorporation', required: false, note: 'For registered companies' },
              { doc: 'GST Certificate', required: false, note: 'If GST registered' },
              { doc: 'Business PAN Card', required: true, note: 'Firm / Company PAN' },
              { doc: 'Office Photos', required: false, note: '2–3 photos of your office interior' },
            ].map(({ doc, required, note }) => (
              <div key={doc} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                  style={{ background: required ? 'var(--verified-green-muted)' : 'var(--surface-2)' }}>
                  {required
                    ? <CheckCircle size={12} style={{ color: '#22C55E' }} />
                    : <Upload size={11} style={{ color: 'var(--text-muted)' }} />
                  }
                </div>
                <div>
                  <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{doc}</span>
                  {required && <span className="ml-1 text-xs" style={{ color: '#F87171' }}>*required</span>}
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process timeline */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          {[
            { icon: Upload, step: '1', label: 'Submit documents', sub: 'Securely uploaded' },
            { icon: CheckCircle, step: '2', label: 'Admin review', sub: '24–48 hours' },
            { icon: ShieldCheck, step: '3', label: 'Badge live', sub: 'Visible to students' },
          ].map(({ icon: Icon, step, label, sub }) => (
            <div key={step} className="text-center p-4 rounded-xl"
              style={{ background: 'var(--surface-1)', border: '1px solid var(--border)' }}>
              <div className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center"
                style={{ background: 'var(--accent-gold-muted)', color: 'var(--accent-gold)' }}>
                <Icon size={14} />
              </div>
              <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--text-primary)' }}>{label}</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{sub}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <VerifyForm />
      </div>
    </div>
  )
}
