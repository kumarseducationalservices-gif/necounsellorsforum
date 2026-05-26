// "We're Trustpilot" style — "We're NECF" card
export default function WhatWeDoCard() {
  return (
    <section className="px-4 py-3">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-2xl p-6 text-center" style={{ background:'#E6F5F0', border:'1px solid #B2DFDB' }}>
          <h3 className="font-display font-bold text-xl mb-2" style={{ color:'#004D40' }}>
            We&apos;re NECF
          </h3>
          <p className="text-sm mb-1 max-w-sm mx-auto leading-relaxed" style={{ color:'#00695C' }}>
            We&apos;re a review platform that&apos;s open to everyone. Our vision is to become the universal symbol of trust for education consultants in Northeast India — by empowering students to choose with confidence, and helping honest consultants grow.
          </p>
          <button className="mt-4 text-sm font-semibold underline underline-offset-2" style={{ color:'#00695C' }}>
            What we do
          </button>
        </div>
      </div>
    </section>
  )
}
