import Index from "app";
import "./globals.css";
import type { Metadata } from 'next'
import { Manrope, Geist ,Afacad_Flux,Reddit_Sans,Flow_Circular} from "next/font/google";
export const metadata: Metadata = {
  title: {
    default: 'Skiilink Ventures Nigeria Limited',
    template: '%s | Skiilink Ventures Nigeria Limited',
  },
  description:
    'Skiilink online store — shop security and solar gadgets across Africa. CCTV cameras, alarm systems, solar panels, inverters, batteries, and accessories with reliable shipping and support.',
  keywords: [
    'Skiilink',
    'security gadgets',
    'solar gadgets',
    'CCTV cameras',
    'alarm systems',
    'solar panels',
    'inverters',
    'batteries',
    'security systems',
    'ecommerce',
    'electronics store',
    'African tech store',
  ],
  authors: [{ name: 'Skiilink Ventures Nigeria Limited', url: 'https://skiilinkventures.com' }],
  creator: 'Skiilink Ventures Nigeria Limited',
  publisher: 'Skiilink Ventures Nigeria Limited',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Skiilink Ventures Nigeria Limited — Security & Solar Gadgets',
    description:
      'Shop security and solar gadgets at Skiilink Ventures Nigeria Limited — CCTV, alarm systems, solar panels, inverters, and batteries with fast shipping.',
    url: 'https://skiilinkventures.com',
    siteName: 'Skiilink Ventures Nigeria Limited',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skiilink Ventures Nigeria Limited — Security & Solar Gadgets',
    description:
      'Shop security and solar gadgets at Skiilink — CCTV, alarm systems, solar panels, inverters, and batteries.',
    creator: '@SkiilinkVentures',
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
const manrope = Flow_Circular({
  weight: "400",
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-flow-rounded',
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
  return (
      <html lang="en" className={`${manrope.className}`} >
        {/* <link href="https://fonts.googleapis.com/css2?family=Outfit&display=swap" rel="stylesheet"/> */}
        <meta name="google-site-verification" content="QZoD7D2w3ii4ogkCJxvcitzTQyuYxIMgM3N2DOzXfgE" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        ></meta>
        <body className={` h-full w-full bg-[hsl(var(--background))]`}>
          <Index children={children}/>
        </body>
      </html>
  );
}
