import axios from "../src/app/api/axios/axios";
import Cookies from "js-cookie";
export default async function createOrder(orderProps) {
    const refreshToken = Cookies.get("RFTFL");
    const accessToken = Cookies.get("ACTFL");
    
    try {
        const request =await axios.post(`orders/create`,{ 
            signedCookies:JSON.stringify({
                refreshToken,accessToken
            }), 
            
            // "phoneNumber": "09032457431",
            // "name": "Godwin",
            // "address": "Byazin junction",
            // "appartment": "kubwa abuja",
            // "states": "Anambra",
            // "shippingMethod": "Delivery",
            // "items": [
            //     {
            //         "id": "68bc25f14b51b0dc0ec9c0bb",
            //         "quantity": 1
            //     }
            // ],
            // "shippingFee": 230,
            // "paymentIntentId": 9745117,
            // "tx_ref": "1761404419117",
            // "flw_ref": "MockFLWRef-1761404437875"
            ...orderProps
        })
        const response=await request
        
        return response.data
       
    } catch (error) {
        console.log(error)
        return undefined
    }
    
}
