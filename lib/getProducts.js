
import axios from "../src/app/api/axios/axios"
export default async function getWikiResults(category) {
    try {   
        const request = await axios.post(category==="all"?'/products/all':'/products/search?q='+category ,{next:{revalidate:60}})
        const response=await request.data
        if (!response) return undefined
        return response
        
    } catch (error) {
        return undefined
    }   
    
}
