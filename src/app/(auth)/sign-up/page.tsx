import LoginPage from './signupUi';
export default function page() {
  const clientId=process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!
  return (
    <>
        <LoginPage clientId={clientId}/>
    </>
  )
}
