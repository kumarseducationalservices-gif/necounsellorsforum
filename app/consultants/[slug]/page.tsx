import { notFound } from 'next/navigation'
import { supabase, Consultant, Review } from '@/lib/supabase'
import VerificationBadge from '@/components/VerificationBadge'
import TrustMatrix from '@/components/TrustMatrix'
import ReviewCard from '@/components/ReviewCard'
import { Star, MapPin, Phone, Mail, Globe, Award, ExternalLink, MessageSquare } from 'lucide-react'
import { getInitials, getYearsInOperation } from '@/lib/utils'

async function getConsultantData(slug: string) {
  const { data: consultant } = await supabase.from('consultants').select('*').eq('slug', slug).single()
  if (!consultant) return { consultant: null, reviews: [] }
  const { data: reviews } = await supabase.from('reviews').select('*').eq('consultant_id', consultant.id)
    .order('created_at', { ascending: false }).limit(20)
  return { consultant: consultant as Consultant, reviews: (reviews||[]) as Review[] }
}

export default async function ConsultantProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { consultant: c, reviews } = await getConsultantData(slug)
  if (!c) notFound()
  const years = getYearsInOperation(c.established_year)

  return (
    <div className="pt-16 min-h-screen pb-20 section-light">
      {/* Cover band — Global Scholar sage */}
      <div className="h-52 md:h-64 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#1E3A34,#2D5446)' }}>
        <div className="absolute inset-0 opacity-15"
          style={{ backgroundImage: 'radial-gradient(circle at 30% 60%,#D4AF37,transparent 50%)' }} />
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="relative -mt-16 mb-8 flex flex-col md:flex-row md:items-end gap-5">
          {/* Logo */}
          <div className="w-28 h-28 rounded-2xl flex items-center justify-center font-display font-extrabold text-2xl border-4 flex-shrink-0"
            style={{ background: 'linear-gradient(135deg,#D4AF37,#F0C757)', borderColor: 'var(--gs-bg)', color: '#1a1500' }}>
            {c.logo_url ? <img src={c.logo_url} alt="" className="w-full h-full object-cover rounded-2xl" /> : getInitials(c.name)}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <h1 className="font-display font-extrabold text-3xl md:text-4xl" style={{ color: 'var(--gs-text)' }}>{c.name}</h1>
              <VerificationBadge level={c.verification_level} size="lg" />
            </div>
            {c.tagline && <p className="text-base mb-2" style={{ color: '#6B7280' }}>{c.tagline}</p>}
            <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: '#6B7280' }}>
              <span className="flex items-center gap-1.5"><MapPin size={14} />{c.city}, {c.state}</span>
              {years && <span className="flex items-center gap-1.5"><Award size={14} />Est. {c.established_year} · {years} years</span>}
              <span className="flex items-center gap-1.5">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <strong style={{ color: 'var(--gs-text)' }}>{c.avg_rating.toFixed(1)}</strong>
                <span>({c.total_reviews} reviews)</span>
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {c.phone && (
              <a href={`tel:${c.phone}`} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={{ background: 'white', border: '1px solid rgba(0,0,0,0.1)', color: 'var(--gs-text)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <Phone size={14} /> Call
              </a>
            )}
            {c.whatsapp && (
              <a href={`https://wa.me/${c.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.25)', color: '#25D366' }}>
                WhatsApp
              </a>
            )}
            {c.website && (
              <a href={c.website} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: 'white', border: '1px solid rgba(0,0,0,0.1)', color: '#6B7280' }}>
                <Globe size={14} /> <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {c.description && (
              <section>
                <h2 className="font-display font-bold text-xl mb-3" style={{ color: 'var(--gs-text)' }}>About</h2>
                <p className="text-sm leading-relaxed" style={{ color: '#4B5563' }}>{c.description}</p>
              </section>
            )}
            {c.specializations.length > 0 && (
              <section>
                <h2 className="font-display font-bold text-xl mb-3" style={{ color: 'var(--gs-text)' }}>Specializations</h2>
                <div className="flex flex-wrap gap-2">
                  {c.specializations.map(s => (
                    <span key={s} className="px-3 py-1.5 rounded-full text-sm font-medium"
                      style={{ background: 'rgba(30,58,52,0.08)', color: 'var(--gs-sage)', border: '1px solid rgba(30,58,52,0.12)' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </section>
            )}
            {c.countries_covered.length > 0 && (
              <section>
                <h2 className="font-display font-bold text-xl mb-3" style={{ color: 'var(--gs-text)' }}>Countries Covered</h2>
                <div className="flex flex-wrap gap-2">
                  {c.countries_covered.map(co => (
                    <span key={co} className="px-3 py-1.5 rounded-full text-sm font-semibold"
                      style={{ background: 'rgba(212,175,55,0.1)', color: '#B8960C', border: '1px solid rgba(212,175,55,0.25)' }}>
                      {co}
                    </span>
                  ))}
                </div>
              </section>
            )}
            <section>
              <h2 className="font-display font-bold text-xl mb-4" style={{ color: 'var(--gs-text)' }}>
                Student Reviews
                <span className="ml-2 font-normal text-sm" style={{ color: '#9CA3AF' }}>
                  ({c.total_reviews} total · {c.student_proof_reviews} with proof)
                </span>
              </h2>
              {reviews.length > 0
                ? <div className="space-y-4">{reviews.map(r => <ReviewCard key={r.id} review={r} />)}</div>
                : (
                  <div className="rounded-2xl py-12 text-center"
                    style={{ background: 'white', border: '1px solid rgba(0,0,0,0.07)' }}>
                    <MessageSquare size={32} className="mx-auto mb-3" style={{ color: '#D1D5DB' }} />
                    <p className="text-sm" style={{ color: '#9CA3AF' }}>No reviews yet. Be the first!</p>
                  </div>
                )}
            </section>
          </div>

          <div className="space-y-5">
            <TrustMatrix consultant={c} />
            {c.verification_level === 'establishment_verified' && c.established_year && (
              <div className="rounded-2xl p-5 text-center"
                style={{ background: 'var(--gs-sage)', border: '1px solid rgba(212,175,55,0.2)' }}>
                <div className="font-display font-extrabold text-3xl mb-1 text-gold">{c.established_year}</div>
                <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  Verified operating since<br />
                  <span className="font-bold text-white">{years} years in business</span>
                </div>
              </div>
            )}
            <div className="rounded-2xl p-5 space-y-3"
              style={{ background: 'white', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
              <h3 className="font-semibold text-sm" style={{ color: 'var(--gs-text)' }}>Contact Details</h3>
              {c.phone && <div className="flex items-center gap-2 text-sm" style={{ color: '#6B7280' }}><Phone size={13} />{c.phone}</div>}
              {c.email && <div className="flex items-center gap-2 text-sm" style={{ color: '#6B7280' }}><Mail size={13} />{c.email}</div>}
              {c.city && <div className="flex items-center gap-2 text-sm" style={{ color: '#6B7280' }}><MapPin size={13} />{c.city}, {c.state}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
