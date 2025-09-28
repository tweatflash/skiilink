import LoginPage from './signupUi';
import type { Metadata } from 'next'
export const metadata :Metadata= {
    title: 'Sign-up | Skiilink Ventures Limited',
    description:'Sign-up your account on Skiilink Ventures Limited',
}
export default function page() {
  const clientId=process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!
  return (
    <>
        <LoginPage clientId={clientId}/>
    </>
  )
}
