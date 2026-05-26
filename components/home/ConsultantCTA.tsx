// "Looking to grow your business?" — Trustpilot's business CTA card
export default function ConsultantCTA() {
  return (
    <section className="px-4 py-3">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden p-6 flex flex-col items-center text-center"
          style={{ background:'linear-gradient(135deg,#EEF2FF 0%,#E0E7FF 100%)', border:'1px solid #C7D2FE' }}>

          {/* Background bar chart illustration (like Trustpilot) */}
          <div className="absolute bottom-0 right-4 flex items-end gap-1.5 opacity-20 pointer-events-none">
            {[24,40,32,56,44,64,52].map((h,i) => (
              <div key={i} className="rounded-t-sm" style={{ width:18, height:h, background:'#4F46E5' }} />
            ))}
          </div>

          <h3 className="font-display font-bold text-lg mb-1 relative z-10" style={{ color:'var(--text)' }}>
            Looking to grow your consultancy?
          </h3>
          <p className="text-sm mb-4 max-w-xs relative z-10" style={{ color:'var(--muted)' }}>
            Strengthen your reputation with verified reviews on NECF.
          </p>
          <a href="/consultants/claim" className="btn-dark relative z-10" style={{ borderRadius:8 }}>
            Get listed free
          </a>
        </div>
      </div>
    </section>
  )
}
