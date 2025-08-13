import Index from "app";
import "./globals.css";
import { Rubik} from 'next/font/google';
import type { Metadata } from 'next'
export const metadata :Metadata= {
    title: 'SKIILINK VENTURES LIMITED',
    description:'SKIILINK VENTURES LIMITED',
}
const Outfitfont = Rubik(
    {
      subsets: ['latin'],
      weight: ['300', '400', '700', ],
      fallback: ["sans-serif"],
      style:"normal"
      

    }
  )
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
  return (
      <html lang="en">
        {/* <link href="https://fonts.googleapis.com/css2?family=Outfit&display=swap" rel="stylesheet"/> */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        ></meta>
        <body className={`h-full w-full bg-[hsl(var(--background))]`}>
          <Index children={children}/>
        </body>
      </html>
  );
}
