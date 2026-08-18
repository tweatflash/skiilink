import React from 'react'
import AccountIndex from '.'
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Account — Skiilink',
  description: 'Manage your Skiilink account: profile, security settings, and preferences.',
  keywords: ['Skiilink', 'account', 'profile', 'settings', 'security', 'dashboard'],
  openGraph: {
    title: 'Account — Skiilink',
    description: 'Manage your Skiilink account: profile, security settings, and preferences.',
    siteName: 'Skiilink',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Account — Skiilink',
    description: 'Manage your Skiilink account: profile, security settings, and preferences.',
  },
  icons: {
    icon: '/favicon.ico',
  }
}
export default function Account() {
  return (
    <AccountIndex />
  )
}
