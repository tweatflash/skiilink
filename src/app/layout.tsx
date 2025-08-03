"use client"
import "./globals.css";
import type { Metadata } from 'next'
import { ThemeProvider } from "./contexts/ThemeContext";

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
        <body className={` h-full w-full bg-[hsl(var(--background))]`}>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </body>
      </html>
  );
}
