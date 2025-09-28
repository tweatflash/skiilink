import axios from "../src/app/api/axios/axios";
export default async function getExplorePosts(data,accessToken,refreshToken) {
    try {
        const request =await axios.post(`/search/?md=${data}`,{
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
