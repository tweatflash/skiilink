import Link from 'next/link';
import LoginPage from './signupUi';
import type { Metadata } from 'next'
import { Eye, EyeOff } from 'lucide-react';
import Signup01 from './signup01';
export const metadata :Metadata= {
    title: 'Sign-up | Skiilink Ventures Limited',
    description:'Sign-up your account on Skiilink Ventures Limited',
}
export default function page() {
  const clientId=process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!
  return (
    <Signup01/>
  )
}
