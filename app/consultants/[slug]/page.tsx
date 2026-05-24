import { notFound } from 'next/navigation'
import { supabase, Consultant, Review } from '@/lib/supabase'
import TrustMatrix from '@/components/TrustMatrix'
import ReviewCard from '@/components/ReviewCard'
import { Star, MapPin, Phone, Mail, Globe, Award, ExternalLink, ShieldCheck } from 'lucide-react'
import { getInitials, getYearsInOperation } from '@/lib/utils'

const BADGE = {
  establishment_verified: { label:'Established & Verified', cls:'badge-verified green' },
  google_verified:        { label:'Google Verified',         cls:'badge-verified' },
  unverified:             { label:'Unverified',              cls:'' },
}

async function getData(slug: string) {
  const { data: c } = await supabase.from('consultants').select('*').eq('slug', slug).single()
  if (!c) return null
  const { data: reviews } = await supabase.from('reviews').select('*').eq('consultant_id', c.id).order('created_at', { ascending: false }).limit(20)
  return { consultant: c as Consultant, reviews: (reviews || []) as Review[] }
}

export default async function ProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = await getData(slug)
  if (!data) notFound()
  const { consultant: c, reviews } = data
  const years = getYearsInOperation(c.established_year)
  const badge = BADGE[c.verification_level]

  return (
    <div className="pt-20 min-h-screen pb-24 section-dark">
      {/* Cover */}
      <div className="relative h-52" style={{ background:'linear-gradient(135deg,var(--ti-surf),var(--ti-surf2))' }}>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage:'radial-gradient(ellipse at 30% 60%,#4F46E5,transparent 60%)' }} />
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="relative -mt-14 mb-8 flex flex-col md:flex-row md:items-end gap-5">
          <div className="w-28 h-28 rounded-2xl flex items-center justify-center text-2xl font-display font-bold border-4 flex-shrink-0"
            style={{ background:'linear-gradient(135deg,#4F46E5,#818CF8)', borderColor:'var(--ti-bg)', color:'white' }}>
            {getInitials(c.name)}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <h1 className="font-display font-extrabold text-3xl md:text-4xl" style={{ color:'var(--ti-text)' }}>{c.name}</h1>
              {badge.cls && <span className={`${badge.cls} shimmer-badge`}><ShieldCheck size={11}/>{badge.label}</span>}
            </div>
            {c.tagline && <p className="text-base mb-2" style={{ color:'var(--ti-muted)' }}>{c.tagline}</p>}
            <div className="flex flex-wrap gap-4 text-sm" style={{ color:'var(--ti-muted)' }}>
              <span className="flex items-center gap-1.5"><MapPin size={13}/>{c.city}, {c.state}</span>
              {years && <span className="flex items-center gap-1.5"><Award size={13}/>Est. {c.established_year} · {years} years</span>}
              <span className="flex items-center gap-1.5">
                <Star size={13} className="fill-amber-400 text-amber-400"/>
                <strong style={{ color:'var(--ti-text)' }}>{c.avg_rating.toFixed(1)}</strong>
                <span>({c.total_reviews} reviews)</span>
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {c.phone && <a href={`tel:${c.phone}`} className="btn-primary" style={{ padding:'10px 18px', fontSize:13 }}><Phone size={13}/>Call</a>}
            {c.whatsapp && <a href={`https://wa.me/${c.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noreferrer"
              className="text-sm font-semibold px-4 py-2.5 rounded-full flex items-center gap-2"
              style={{ background:'rgba(37,211,102,0.12)', color:'#25D366', border:'1px solid rgba(37,211,102,0.25)' }}>WhatsApp</a>}
            {c.website && <a href={c.website} target="_blank" rel="noreferrer"
              className="text-sm font-semibold px-4 py-2.5 rounded-full flex items-center gap-2 card-dark"
              style={{ color:'var(--ti-muted)' }}><Globe size={13}/>Website<ExternalLink size={11}/></a>}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {c.description && (
              <section>
                <h2 className="font-display font-bold text-xl mb-3" style={{ color:'var(--ti-text)' }}>About</h2>
                <p className="text-sm leading-relaxed" style={{ color:'var(--ti-muted)' }}>{c.description}</p>
              </section>
            )}
            {c.specializations.length > 0 && (
              <section>
                <h2 className="font-display font-bold text-xl mb-3" style={{ color:'var(--ti-text)' }}>Specializations</h2>
                <div className="flex flex-wrap gap-2">
                  {c.specializations.map(s => (
                    <span key={s} className="text-sm px-3 py-1.5 rounded-xl" style={{ background:'var(--ti-surf2)', border:'1px solid var(--ti-border)', color:'var(--ti-muted)' }}>{s}</span>
                  ))}
                </div>
              </section>
            )}
            {c.countries_covered.length > 0 && (
              <section>
                <h2 className="font-display font-bold text-xl mb-3" style={{ color:'var(--ti-text)' }}>Countries Covered</h2>
                <div className="flex flex-wrap gap-2">
                  {c.countries_covered.map(ct => (
                    <span key={ct} className="text-sm px-3 py-1.5 rounded-xl badge-verified gold">{ct}</span>
                  ))}
                </div>
              </section>
            )}
            {/* Reviews — switch to warm mood */}
            <section className="section-warm rounded-2xl p-6 -mx-2">
              <h2 className="font-display font-bold text-xl mb-1" style={{ color:'var(--cc-text)' }}>
                Student Reviews
                <span className="ml-2 text-sm font-normal" style={{ color:'var(--cc-muted)' }}>
                  ({c.total_reviews} · {c.student_proof_reviews} with proof)
                </span>
              </h2>
              <div className="mt-4 space-y-4">
                {reviews.length > 0
                  ? reviews.map(r => <ReviewCard key={r.id} review={r} />)
                  : <p className="text-sm py-8 text-center" style={{ color:'var(--cc-muted)' }}>No reviews yet.</p>
                }
              </div>
            </section>
          </div>

          <div className="space-y-5">
            <TrustMatrix consultant={c} />
            {c.verification_level === 'establishment_verified' && c.established_year && (
              <div className="rounded-2xl p-5 text-center" style={{ background:'rgba(34,197,94,0.06)', border:'1px solid rgba(34,197,94,0.2)' }}>
                <div className="font-display font-extrabold text-3xl" style={{ color:'#22C55E' }}>{c.established_year}</div>
                <div className="text-sm mt-1" style={{ color:'var(--ti-muted)' }}>Verified operating since<br/>
                  <strong style={{ color:'#22C55E' }}>{years} years in business</strong>
                </div>
              </div>
            )}
            <div className="card-dark p-5 space-y-3">
              <h3 className="font-semibold text-sm" style={{ color:'var(--ti-text)' }}>Contact Details</h3>
              {c.phone && <div className="flex items-center gap-2 text-sm" style={{ color:'var(--ti-muted)' }}><Phone size={13}/>{c.phone}</div>}
              {c.email && <div className="flex items-center gap-2 text-sm" style={{ color:'var(--ti-muted)' }}><Mail size={13}/>{c.email}</div>}
              <div className="flex items-center gap-2 text-sm" style={{ color:'var(--ti-muted)' }}><MapPin size={13}/>{c.city}, {c.state}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
