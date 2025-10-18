import Index from "app";
import "./globals.css";
import type { Metadata } from 'next'
import { Manrope, Geist ,Afacad_Flux,Reddit_Sans} from "next/font/google";
export const metadata :Metadata= {
    title: 'Skiilink Ventures Limited',
    description:'Skiilink Ventures Limited',
}
// const instrument_sans = Inria_Sans({
//   weight:"400",
//   subsets: ["latin"],
// });
const manrope = Manrope({
  weight: "400",
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope'
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
  return (
      <html lang="en" className={manrope.className} >
        {/* <link href="https://fonts.googleapis.com/css2?family=Outfit&display=swap" rel="stylesheet"/> */}
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
