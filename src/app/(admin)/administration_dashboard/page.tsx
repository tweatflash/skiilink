import {Metadata} from 'next'
import Dashboard from '.'
import { DashboardContent } from 'app/components/dashboard-content'
export const metadata :Metadata= {
    title: 'Dashboard | SKIILINK VENTURES',
    description:'Dashboard | SKIILINK VENTURES LIMITED',
}
DashboardContent
export default function Page() {
  return <DashboardContent/>
}
