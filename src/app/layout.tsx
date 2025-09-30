import Index from "app";
import "./globals.css";
import type { Metadata } from 'next'
import { Livvic, Inria_Sans ,Afacad_Flux,Inter} from "next/font/google";
export const metadata :Metadata= {
    title: 'Skiilink Ventures Limited',
    description:'Skiilink Ventures Limited',
}
// const instrument_sans = Inria_Sans({
//   weight:"400",
//   subsets: ["latin"],
// });
const inter = Afacad_Flux({
  weight: "400",
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
  return (
      <html lang="en" className={``} >
        {/* <link href="https://fonts.googleapis.com/css2?family=Outfit&display=swap" rel="stylesheet"/> */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        ></meta>
        <body className={`${inter.className} h-full w-full bg-[hsl(var(--background))]`}>
          <Index children={children}/>
        </body>
      </html>
  );
}
