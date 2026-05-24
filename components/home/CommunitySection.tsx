import { MessageCircle, Star, Users, TrendingUp, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const SAMPLE_REVIEWS = [
  { name: 'Priya B.', city: 'Guwahati', text: 'Got into University of Manchester for MSc Data Science! They handled everything from SOP to visa. 🔥', rating: 5, country: 'UK', tag: 'Student Proof ✓' },
  { name: 'Rahul B.', city: 'Jorhat', text: 'Canada PR after Masters from Toronto. This team tracked every single step with me.', rating: 5, country: 'Canada', tag: 'Visa Success ✈' },
  { name: 'Ankita D.', city: 'Dibrugarh', text: 'MBBS in Kursk State Medical University. All documents done in record time. Highly recommend!', rating: 4, country: 'Russia', tag: 'Student Proof ✓' },
  { name: 'Simran T.', city: 'Shillong', text: 'Study in Australia — dream come true. The team was available on WhatsApp literally 24/7.', rating: 5, country: 'Australia', tag: 'Student Proof ✓' },
]

const COLORS = ['#4F46E5','#FF5A1F','#D4AF37','#22C55E']

export default function CommunitySection() {
  return (
    <section className="py-16 section-warm">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full mb-3 font-semibold"
              style={{ background: 'rgba(255,90,31,0.1)', color: '#FF5A1F', border: '1px solid rgba(255,90,31,0.2)' }}>
              <MessageCircle size={12} />
              Real Student Voices
            </div>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl" style={{ color: 'var(--cc-text)' }}>
              Honest Reviews.<br />
              <span className="text-saffron">No Filters.</span>
            </h2>
          </div>
          <Link href="/consultants" className="btn-saffron self-start md:self-auto" style={{ padding: '10px 20px', fontSize: 13 }}>
            Read All Reviews <ArrowRight size={14} />
          </Link>
        </div>

        {/* Review cards horizontal scroll */}
        <div className="scroll-rail pb-4 mb-10">
          {SAMPLE_REVIEWS.map((r, i) => (
            <div key={r.name} style={{ width: 300, flexShrink: 0 }}>
              <div className="rounded-2xl p-5 h-full"
                style={{ background: 'white', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
                {/* Tag */}
                <span className="text-xs px-2.5 py-1 rounded-full font-semibold mb-3 inline-block"
                  style={{ background: 'rgba(255,90,31,0.08)', color: '#FF5A1F', border: '1px solid rgba(255,90,31,0.15)' }}>
                  {r.tag}
                </span>
                {/* Stars */}
                <div className="flex gap-0.5 mb-2">
                  {Array.from({length:5}).map((_,j) => (
                    <Star key={j} size={12} className={j<r.rating?'fill-amber-400 text-amber-400':'text-gray-200'} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#374151' }}>{r.text}</p>
                <div className="flex items-center gap-2 pt-3" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: COLORS[i % COLORS.length] }}>
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="text-xs font-semibold" style={{ color: '#1F2937' }}>{r.name}</div>
                    <div className="text-xs" style={{ color: '#9CA3AF' }}>{r.city} · {r.country}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stats strip */}
        <div className="grid grid-cols-3 gap-4 p-6 rounded-2xl"
          style={{ background: 'var(--cc-surf)', border: '1px solid rgba(0,0,0,0.07)' }}>
          {[
            { icon: Star, value: '4.7 avg', label: 'Platform Rating' },
            { icon: Users, value: '8,000+', label: 'Student Reviews' },
            { icon: TrendingUp, value: '92%', label: 'Would Recommend' },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center">
              <Icon size={18} className="mx-auto mb-1" style={{ color: '#FF5A1F' }} />
              <div className="font-display font-bold text-xl" style={{ color: 'var(--cc-text)' }}>{value}</div>
              <div className="text-xs" style={{ color: 'var(--cc-muted)' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
