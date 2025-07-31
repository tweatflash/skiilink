import React from 'react'
import Login from './pag'
export default function Loginpage() {
  const clientId=process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!
  return (
    <>
      <Login clientId={clientId}/>
    </>
  )
}
