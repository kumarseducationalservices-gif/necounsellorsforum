import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://necounsellorsforum.vercel.app'

  const { data: consultants } = await supabase
    .from('consultants')
    .select('slug, updated_at')
    .eq('is_active', true)

  const consultantUrls = (consultants || []).map(c => ({
    url: `${base}/consultants/${c.slug}`,
    lastModified: new Date(c.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${base}/consultants`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/events`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${base}/consultants/claim`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/consultants/verify`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    ...consultantUrls,
  ]
}
