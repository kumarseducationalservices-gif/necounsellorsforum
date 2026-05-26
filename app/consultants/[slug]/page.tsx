import { notFound } from 'next/navigation'
import { supabase, Consultant, Review } from '@/lib/supabase'
import TrustMatrix from '@/components/TrustMatrix'
import ReviewCard from '@/components/ReviewCard'
import { Star, MapPin, Phone, Mail, Globe, Award, ExternalLink, ShieldCheck, CheckCircle, AlertCircle, PenLine } from 'lucide-react'
import { getInitials, getYearsInOperation } from '@/lib/utils'

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({length:5}).map((_,i)=>(
        <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill={i<Math.floor(rating)?'#00875A':'#E5E7EB'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  )
}

async function getData(slug: string) {
  const { data: c } = await supabase.from('consultants').select('*').eq('slug',slug).single()
  if (!c) return null
  const { data: reviews } = await supabase.from('reviews').select('*').eq('consultant_id',c.id).order('created_at',{ascending:false}).limit(20)
  return { consultant: c as Consultant, reviews: (reviews||[]) as Review[] }
}

export default async function ProfilePage({ params }: { params: Promise<{slug:string}> }) {
  const { slug } = await params
  const data = await getData(slug)
  if (!data) notFound()
  const { consultant: c, reviews } = data
  const years = getYearsInOperation(c.established_year)
  const isVerified = c.verification_level === 'establishment_verified'

  return (
    <div className="pt-14 min-h-screen pb-20" style={{ background:'var(--body-bg)' }}>
      <div className="max-w-2xl mx-auto px-4 py-5">

        {/* Breadcrumb */}
        <div className="text-xs mb-4 flex items-center gap-1.5" style={{ color:'var(--muted)' }}>
          <a href="/consultants" style={{ color:'var(--indigo)' }}>Consultants</a>
          <span>›</span>
          <span>{c.city}</span>
          <span>›</span>
          <span>{c.name}</span>
        </div>

        {/* Profile header — Trustpilot card style */}
        <div className="tp-card p-5 mb-4">
          <div className="flex items-start justify-between gap-3 mb-3">
            {/* Logo */}
            <div className="w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold text-white flex-shrink-0"
              style={{ background:'linear-gradient(135deg,#4F46E5,#6D63FF)' }}>
              {getInitials(c.name)}
            </div>
            {/* Visit website */}
            {c.website && (
              <a href={c.website} target="_blank" rel="noreferrer" className="btn-outline flex-shrink-0">
                Visit website <ExternalLink size={12} />
              </a>
            )}
          </div>

          {/* Verified / Unverified warning — like Trustpilot's Warning badge */}
          {!isVerified && (
            <div className="flex items-center gap-2 mb-2 p-2.5 rounded-lg"
              style={{ background:'#FEF2F2', border:'1px solid #FECACA' }}>
              <AlertCircle size={14} style={{ color:'#DC2626' }} />
              <span className="text-xs font-semibold" style={{ color:'#DC2626' }}>Not establishment-verified</span>
            </div>
          )}

          <h1 className="font-display font-bold text-2xl mb-0.5" style={{ color:'var(--text)' }}>{c.name}</h1>
          {c.tagline && <p className="text-sm mb-2" style={{ color:'var(--muted)' }}>{c.tagline}</p>}

          {/* Category tag */}
          <div className="flex flex-wrap gap-2 mb-3">
            {c.specializations.slice(0,3).map(s=>(
              <span key={s} className="text-xs px-2.5 py-1 rounded-full"
                style={{ background:'var(--surface-2)', color:'var(--muted)', border:'1px solid var(--border)' }}>
                {s}
              </span>
            ))}
          </div>

          {/* Write a review — full-width blue pill, exactly like Trustpilot */}
          <a href="#reviews" className="btn-indigo w-full justify-center mt-2"
            style={{ borderRadius:10, padding:'12px 24px' }}>
            <PenLine size={16} />
            Write a review
          </a>
        </div>

        {/* Trust signal — like Trustpilot's integrity note */}
        {isVerified && (
          <div className="tp-card p-4 mb-4 flex items-start gap-3"
            style={{ background:'#E6F5F0', border:'1px solid #B2DFDB' }}>
            <ShieldCheck size={18} style={{ color:'#00875A', flexShrink:0, marginTop:1 }} />
            <div>
              <div className="font-semibold text-sm mb-0.5" style={{ color:'#004D40' }}>
                Established & Verified
              </div>
              <p className="text-xs leading-relaxed" style={{ color:'#00695C' }}>
                This consultant has been verified by NECF. Trade license, ROC certificate, and business documents have been reviewed.
                {years && ` Operating since ${c.established_year} — ${years} years in business.`}
              </p>
            </div>
          </div>
        )}

        {/* Tabs — Summary / About / Reviews */}
        <div className="flex border-b mb-5 tp-card rounded-none bg-transparent"
          style={{ borderColor:'var(--border)', background:'transparent', boxShadow:'none', border:'none' }}>
          {['Summary','About','Reviews'].map((tab,i)=>(
            <button key={tab} className="px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors"
              style={{
                borderColor: i===0 ? 'var(--text)' : 'transparent',
                color: i===0 ? 'var(--text)' : 'var(--muted)',
              }}>
              {tab}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 pb-2">
            <a href={c.website||'#'} className="w-8 h-8 rounded-full border flex items-center justify-center"
              style={{ borderColor:'var(--border)' }}>
              <ExternalLink size={13} style={{ color:'var(--muted)' }} />
            </a>
            <a href={`/consultants/${c.slug}/write-review`}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background:'var(--indigo)', color:'white' }}>
              <PenLine size={13} />
            </a>
          </div>
        </div>

        {/* See what reviewers are saying */}
        <div id="reviews" className="mb-6">
          <h2 className="font-display font-bold text-lg mb-4" style={{ color:'var(--text)' }}>
            See what reviewers are saying
            <span className="text-sm ml-2 font-normal" style={{ color:'var(--muted)' }}>ⓘ</span>
          </h2>

          {/* Rating breakdown */}
          <div className="tp-card p-4 mb-4">
            <div className="flex items-center gap-4 mb-3">
              <div className="text-center">
                <div className="font-display font-bold text-4xl" style={{ color:'var(--text)' }}>
                  {c.avg_rating > 0 ? c.avg_rating.toFixed(1) : 'New'}
                </div>
                <div className="flex justify-center mt-1">
                  <div className="flex gap-0.5">
                    {Array.from({length:5}).map((_,i)=>(
                      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i<Math.floor(c.avg_rating)?'#00875A':'#E5E7EB'}>
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                </div>
                <div className="text-xs mt-1" style={{ color:'var(--muted)' }}>{c.total_reviews} reviews</div>
              </div>
              <div className="flex-1 space-y-1">
                {[5,4,3,2,1].map(star => {
                  const count = reviews.filter(r=>r.rating===star).length
                  const pct = reviews.length ? (count/reviews.length)*100 : 0
                  return (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-xs w-3 text-right" style={{ color:'var(--muted)' }}>{star}</span>
                      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background:'var(--surface-2)' }}>
                        <div className="h-full rounded-full" style={{ width:`${pct}%`, background:'#00875A' }} />
                      </div>
                      <span className="text-xs w-4" style={{ color:'var(--muted)' }}>{count}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Proof stats */}
            <div className="flex gap-3 pt-3 border-t" style={{ borderColor:'var(--border)' }}>
              <div className="text-center flex-1">
                <div className="font-bold text-lg" style={{ color:'#00875A' }}>{c.student_proof_reviews}</div>
                <div className="text-xs" style={{ color:'var(--muted)' }}>Student Proof</div>
              </div>
              <div className="text-center flex-1">
                <div className="font-bold text-lg" style={{ color:'#4F46E5' }}>{c.visa_success_reviews}</div>
                <div className="text-xs" style={{ color:'var(--muted)' }}>Visa Success</div>
              </div>
            </div>
          </div>

          {/* Reviews list */}
          <div className="space-y-3">
            {reviews.map(r => (
              <ReviewCard key={r.id} review={r} />
            ))}
            {reviews.length === 0 && (
              <div className="tp-card p-8 text-center">
                <p className="text-sm" style={{ color:'var(--muted)' }}>No reviews yet. Be the first to write one.</p>
                <a href="#" className="btn-indigo mt-4 inline-flex" style={{ borderRadius:8, padding:'10px 20px', fontSize:13 }}>
                  Write a review
                </a>
              </div>
            )}
          </div>

          {reviews.length > 5 && (
            <button className="w-full mt-4 py-3 rounded-xl text-sm font-semibold"
              style={{ background:'var(--indigo-light)', color:'var(--indigo)', border:'1px solid #C7D2FE' }}>
              See all {c.total_reviews} reviews
            </button>
          )}
        </div>

        {/* Company details */}
        <div className="mb-6">
          <h2 className="font-display font-bold text-lg mb-3" style={{ color:'var(--text)' }}>Company details</h2>
          <div className="tp-card p-4 flex flex-wrap gap-2 mb-3">
            {c.specializations.map(s=>(
              <span key={s} className="text-xs px-2.5 py-1.5 rounded-full"
                style={{ background:'var(--surface-2)', color:'var(--text)', border:'1px solid var(--border)' }}>
                {s}
              </span>
            ))}
          </div>
          <div className="tp-card p-4 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color:'var(--muted)' }}>Written by the company</h3>
            <p className="text-sm leading-relaxed" style={{ color:'var(--muted)' }}>
              {c.description || `${c.name} is an education consultant based in ${c.city}, ${c.state}, helping students navigate overseas university admissions since ${c.established_year || 'establishment'}.`}
            </p>
          </div>
        </div>

        {/* Trust Matrix */}
        <TrustMatrix consultant={c} />
      </div>
    </div>
  )
}
