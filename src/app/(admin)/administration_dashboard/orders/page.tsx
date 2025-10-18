import {Metadata} from 'next'
import { OrdersList } from '.'
export const metadata :Metadata= {
    title: 'Orders Management | SKIILINK VENTURES',
    description:'Orders Management | SKIILINK VENTURES LIMITED',
}
export default function Page() {
    
  return <OrdersList/>
}
