import axios from "../src/app/api/axios/axios";
import Cookies from "js-cookie";
export default async function getOrders() {
    const refreshToken = Cookies.get("RFTFL");
    const accessToken = Cookies.get("ACTFL");
    try {
        const request =await axios.post(`orders/get`,{ 
            signedCookies:JSON.stringify({
                refreshToken,accessToken
            }),
           
        })
        const response=await request
        return response.data
       
    } catch (error) {
        return undefined
    }
    
}
