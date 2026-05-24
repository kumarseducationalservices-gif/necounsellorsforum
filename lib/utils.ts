import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { VerificationLevel } from './supabase'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getVerificationLabel(level: VerificationLevel): string {
  switch (level) {
    case 'establishment_verified': return 'Established & Verified'
    case 'google_verified': return 'Google Verified'
    default: return 'Unverified'
  }
}

export function getVerificationColor(level: VerificationLevel): string {
  switch (level) {
    case 'establishment_verified': return 'text-emerald-400'
    case 'google_verified': return 'text-blue-400'
    default: return 'text-zinc-500'
  }
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function getDaysUntil(dateStr: string): number {
  const now = new Date()
  const target = new Date(dateStr)
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}

export function getInitials(name: string): string {
  return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
}

export function getYearsInOperation(year: number | null): number | null {
  if (!year) return null
  return new Date().getFullYear() - year
}
