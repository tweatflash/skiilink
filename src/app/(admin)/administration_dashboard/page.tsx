import {Metadata} from 'next'
import Dashboard from '.'
export const metadata :Metadata= {
    title: 'Dashboard | SKIILINK VENTURES',
    description:'Dashboard | SKIILINK VENTURES LIMITED',
}
export default function Page() {
  return <Dashboard/>
}
