import ProductManagement from "."
import {Metadata} from 'next'
export const metadata :Metadata= {
    title: 'Product Management | SKIILINK VENTURES',
    description:'Product Management | SKIILINK VENTURES LIMITED',
}
export default function Page() {
    
  return <ProductManagement/>
}
