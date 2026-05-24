import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type VerificationLevel = 'unverified' | 'google_verified' | 'establishment_verified'

export interface Consultant {
  id: string
  slug: string
  name: string
  tagline: string | null
  description: string | null
  logo_url: string | null
  cover_url: string | null
  city: string
  state: string
  phone: string | null
  email: string | null
  website: string | null
  whatsapp: string | null
  established_year: number | null
  verification_level: VerificationLevel
  google_verified: boolean
  trade_license_verified: boolean
  roc_verified: boolean
  gst_verified: boolean
  office_verified: boolean
  specializations: string[]
  countries_covered: string[]
  total_reviews: number
  avg_rating: number
  student_proof_reviews: number
  visa_success_reviews: number
  is_featured: boolean
  created_at: string
}

export interface Event {
  id: string
  consultant_id: string
  title: string
  description: string | null
  event_type: string
  banner_url: string | null
  country_focus: string | null
  city: string | null
  is_online: boolean
  event_date: string
  registration_deadline: string | null
  total_seats: number | null
  registered_count: number
  is_free: boolean
  price: number | null
  is_featured: boolean
  consultants?: Consultant
}

export interface Review {
  id: string
  consultant_id: string
  reviewer_name: string
  reviewer_photo_url: string | null
  rating: number
  content: string | null
  review_type: string
  country_for: string | null
  university_name: string | null
  year: number | null
  is_verified: boolean
  helpful_count: number
  created_at: string
}
