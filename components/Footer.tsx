import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'

const links = {
  Platform: [['Find Consultants','/consultants'],['Education Events','/events'],['Compare Consultants','/consultants/compare']],
  'For Consultants': [['Claim Profile','/consultants/claim'],['Get Verified','/consultants/verify'],['Suggest Listing','/consultants/suggest']],
  States: [['Assam','/consultants?state=Assam'],['Meghalaya','/consultants?state=Meghalaya'],['Manipur','/consultants?state=Manipur'],['All 8 States','/consultants']],
}

export default function Footer() {
  return (
    <footer style={{ background: 'var(--ti-surf)', borderTop: '1px solid var(--ti-border)' }}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,#4F46E5,#818CF8)' }}>
                <ShieldCheck size={15} color="white" strokeWidth={2.5} />
              </div>
              <span className="font-display font-bold text-sm" style={{ color: 'var(--ti-text)' }}>NECF</span>
            </div>
            <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--ti-muted)' }}>
              North East Counsellors Forum — Real reviews, verified consultants, student trust.
            </p>
            <p className="text-xs" style={{ color: '#4A5168' }}>
              Operated by<br />
              <strong style={{ color: 'var(--ti-muted)' }}>Sanchaar EduTech Pvt. Ltd.</strong>
            </p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#4A5168' }}>{group}</h4>
              <ul className="space-y-2.5">
                {items.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="text-xs transition-colors" style={{ color: 'var(--ti-muted)' }}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid var(--ti-border)' }}>
          <p className="text-xs" style={{ color: '#4A5168' }}>© 2025 North East Counsellors Forum (NECF). All rights reserved.</p>
          <p className="text-xs" style={{ color: '#4A5168' }}>
            A product of{' '}
            <a href="https://gyansanchaar.com" target="_blank" rel="noopener noreferrer"
              className="underline" style={{ color: 'var(--ti-muted)' }}>
              Sanchaar EduTech Private Limited
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
