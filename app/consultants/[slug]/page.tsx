import { notFound } from 'next/navigation'
import { supabase, Consultant, Review } from '@/lib/supabase'
import VerificationBadge from '@/components/VerificationBadge'
import TrustMatrix from '@/components/TrustMatrix'
import ReviewCard from '@/components/ReviewCard'
import { Star, MapPin, Phone, Mail, Globe, Award, ExternalLink } from 'lucide-react'
import { getInitials, getYearsInOperation } from '@/lib/utils'

async function getData(slug: string) {
  const [{ data: consultant }, { data: reviews }] = await Promise.all([
    supabase.from('consultants').select('*').eq('slug', slug).single(),
    supabase.from('reviews').select('*').eq('consultant_id',
      supabase.from('consultants').select('id').eq('slug', slug)
    ).order('created_at', { ascending: false }).limit(10),
  ])
  return { consultant: consultant as Consultant | null, reviews: (reviews || []) as Review[] }
}

// Simpler approach - fetch consultant first then reviews
async function getConsultantData(slug: string) {
  const { data: consultant } = await supabase
    .from('consultants').select('*').eq('slug', slug).single()
  if (!consultant) return { consultant: null, reviews: [] }

  const { data: reviews } = await supabase
    .from('reviews').select('*').eq('consultant_id', consultant.id)
    .order('created_at', { ascending: false }).limit(20)

  return { consultant: consultant as Consultant, reviews: (reviews || []) as Review[] }
}

export default async function ConsultantProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { consultant: c, reviews } = await getConsultantData(slug)

  if (!c) notFound()

  const years = getYearsInOperation(c.established_year)
  const initials = getInitials(c.name)

  return (
    <div className="pt-20 min-h-screen pb-20">
      {/* Cover */}
      <div className="relative h-48 md:h-64"
        style={{ background: `linear-gradient(135deg, var(--surface-2) 0%, var(--surface-3) 100%)` }}>
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(ellipse at 30% 50%, var(--accent-gold) 0%, transparent 50%)' }} />
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Profile header */}
        <div className="relative -mt-16 mb-8 flex flex-col md:flex-row md:items-end gap-5">
          {/* Logo */}
          <div className="w-28 h-28 rounded-2xl flex items-center justify-center text-2xl font-bold border-4 flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, var(--surface-3), var(--accent-gold-muted))`,
              borderColor: 'var(--bg)',
              color: 'var(--accent-gold)',
            }}>
            {c.logo_url ? <img src={c.logo_url} alt="" className="w-full h-full object-cover rounded-xl" /> : initials}
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="font-display text-3xl md:text-4xl italic" style={{ color: 'var(--text-primary)' }}>
                {c.name}
              </h1>
              <VerificationBadge level={c.verification_level} size="md" />
            </div>
            {c.tagline && <p className="text-base" style={{ color: 'var(--text-secondary)' }}>{c.tagline}</p>}
            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <span className="flex items-center gap-1.5"><MapPin size={14} />{c.city}, {c.state}</span>
              {years && <span className="flex items-center gap-1.5"><Award size={14} />Est. {c.established_year} ({years} years)</span>}
              <span className="flex items-center gap-1.5">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <strong style={{ color: 'var(--text-primary)' }}>{c.avg_rating.toFixed(1)}</strong> ({c.total_reviews} reviews)
              </span>
            </div>
          </div>

          {/* Contact buttons */}
          <div className="flex flex-wrap gap-2">
            {c.phone && (
              <a href={`tel:${c.phone}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium"
                style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
                <Phone size={14} /> Call
              </a>
            )}
            {c.whatsapp && (
              <a href={`https://wa.me/${c.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium"
                style={{ background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.2)', color: '#25D366' }}>
                WhatsApp
              </a>
            )}
            {c.website && (
              <a href={c.website} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium"
                style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                <Globe size={14} /> Website <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>

        {/* Body grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="md:col-span-2 space-y-8">
            {/* About */}
            {c.description && (
              <section>
                <h2 className="font-semibold text-lg mb-3" style={{ color: 'var(--text-primary)' }}>About</h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{c.description}</p>
              </section>
            )}

            {/* Specializations */}
            {c.specializations.length > 0 && (
              <section>
                <h2 className="font-semibold text-lg mb-3" style={{ color: 'var(--text-primary)' }}>Specializations</h2>
                <div className="flex flex-wrap gap-2">
                  {c.specializations.map(s => (
                    <span key={s} className="px-3 py-1.5 rounded-lg text-sm"
                      style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Countries */}
            {c.countries_covered.length > 0 && (
              <section>
                <h2 className="font-semibold text-lg mb-3" style={{ color: 'var(--text-primary)' }}>Countries Covered</h2>
                <div className="flex flex-wrap gap-2">
                  {c.countries_covered.map(country => (
                    <span key={country} className="px-3 py-1.5 rounded-lg text-sm"
                      style={{ background: 'var(--accent-gold-muted)', border: '1px solid rgba(232,162,56,0.2)', color: 'var(--accent-gold)' }}>
                      {country}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Reviews */}
            <section>
              <h2 className="font-semibold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>
                Student Reviews
                <span className="ml-2 text-sm font-normal" style={{ color: 'var(--text-muted)' }}>
                  ({c.total_reviews} total · {c.student_proof_reviews} with proof)
                </span>
              </h2>
              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map(r => <ReviewCard key={r.id} review={r} />)}
                </div>
              ) : (
                <div className="rounded-xl py-10 text-center"
                  style={{ background: 'var(--surface-1)', border: '1px solid var(--border)' }}>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No reviews yet.</p>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <TrustMatrix consultant={c} />

            {/* Established since callout */}
            {c.verification_level === 'establishment_verified' && c.established_year && (
              <div className="rounded-xl p-5 text-center badge-verified"
                style={{ background: 'var(--verified-green-muted)', border: '1px solid rgba(34,197,94,0.2)' }}>
                <div className="text-3xl font-bold mb-1" style={{ color: '#22C55E' }}>
                  {c.established_year}
                </div>
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Verified operating since<br />
                  <span className="font-semibold" style={{ color: '#22C55E' }}>{years} years in business</span>
                </div>
              </div>
            )}

            {/* Contact card */}
            <div className="rounded-xl p-5 space-y-3" style={{ background: 'var(--surface-1)', border: '1px solid var(--border)' }}>
              <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Contact Details</h3>
              {c.phone && (
                <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <Phone size={13} /> {c.phone}
                </div>
              )}
              {c.email && (
                <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <Mail size={13} /> {c.email}
                </div>
              )}
              {c.city && (
                <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <MapPin size={13} /> {c.city}, {c.state}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
