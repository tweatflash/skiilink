import axios from "app/api/axios/axios"

export default async function getSingleProduct(productId:number) {
    
    try {
        const request = await axios.post(`/products/getItem/${productId}` ,{next:{revalidate:60}})
        const response=await request.data
        if (!response) return undefined
        return response
    } catch (error) {
        return undefined
    }
}
 