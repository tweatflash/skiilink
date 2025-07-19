import localFont from "next/font/local";
import { Figtree } from "next/font/google";
import "./globals.css";
import type { Metadata } from 'next'
// const bricolage = localFont({
//   src: "../../public/fonts/segoe-ui-emoji.ttf",
//   fallback: [
//     "sans-serif",
//     "Apple Color Emoji",
//     "Segoe UI Emoji",
//     "Segoe UI Symbol",
//   ],
// });
// const Outfitfont = Figtree({
//   subsets: ["latin"],
//   weight: ["300", "400", "700"],
//   fallback: ["sans-serif"],
//   style: "normal",
// });
export const metadata :Metadata= {
  title: 'SKIILINK VENTURES LIMITED',
  description:'SKIILINK VENTURES LIMITED',
}
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
          {children}
        </body>
      </html>
  );
}
