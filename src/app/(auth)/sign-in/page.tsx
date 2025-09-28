import Login from './pag'
import type { Metadata } from 'next'
export const metadata :Metadata= {
    title: 'Sign-in | Skiilink Ventures Limited',
    description:'Sign-in into your account on Skiilink Ventures Limited',
}
export default function Loginpage() {
  const clientId=process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!
  return (
    <>
      <Login clientId={clientId}/>
    </>
  )
}
