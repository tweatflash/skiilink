import React from 'react'
import MainProducts from '.'
import { Metadata } from 'next'

const siteUrl = 'https://skiilinkventures.com'

export const metadata: Metadata = {
  title: {
    default: 'Products — Skiilink Ventures Nigeria Limited',
    template: '%s | Skiilink',
  },
  description:
    'Skiilink Ventures Nigeria Limited — an e-commerce store offering high-quality solar and security gadgets. Browse solar panels, inverters, batteries, CCTV cameras, alarms, and smart access solutions.',
  keywords: [
    'solar gadgets',
    'solar panels',
    'inverters',
    'solar batteries',
    'security gadgets',
    'CCTV cameras',
    'alarms',
    'access control',
    'Skiilink Ventures',
    'Skiilink',
    'ecommerce',
    'Nigeria',
  ],
  authors: [{ name: 'Skiilink Ventures Nigeria Limited', url: siteUrl }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    canonical: `${siteUrl}/products`,
  },
  openGraph: {
    title: 'Products — Skiilink Ventures Nigeria Limited',
    description:
      'Shop solar and security gadgets at Skiilink Ventures Nigeria Limited. Quality solar panels, inverters, batteries, CCTV systems, and smart security solutions.',
    url: `${siteUrl}/products`,
    siteName: 'Skiilink Ventures',
    images: [
      {
        url: `${siteUrl}/og-images/products-og.jpg`,
        width: 1200,
        height: 630,
        alt: 'Skiilink products - solar and security gadgets',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Products — Skiilink Ventures Nigeria Limited',
    description:
      'Shop solar and security gadgets at Skiilink Ventures Nigeria Limited. Quality solar panels, inverters, batteries, CCTV systems, and smart security solutions.',
    creator: '@skiilink',
    images: [`${siteUrl}/og-images/products-og.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function Products() {
  return (
    <MainProducts />
  )
}
