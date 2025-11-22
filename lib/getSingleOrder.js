import axios from "app/api/axios/axios";
import Cookies from "js-cookie";
export default async function getSingleOrders(id) {
  
  try {
    const refreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InRva2VuVXNlciI6eyJfaWQiOiI2ODkyZDdmNWM2OGFkODBkNWU3NGE1ODUifSwicmVmcmVzaFRva2VuIjoiOGMxNzJkYmE1NjQxZDNkMTljNjMwNWZiMDg0NzdlMTFkY2Y4ZTc1MTNkNzNlMWNjOTJiOTA1ZDRmMmJlMDJhNTAwYmNlZWY1YzczZjBlMGMifSwiaWF0IjoxNzYyNzA5NTkwfQ.99_273gLkCIYOv_tqtVMSD4Zrf2u7wczyQTWCPYjZVU"
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InRva2VuVXNlciI6eyJfaWQiOiI2ODkyZDdmNWM2OGFkODBkNWU3NGE1ODUifX0sImlhdCI6MTc2MjcwOTU5MH0.5sliaVe9QNJlmTQuM3dLQsxS2rErM7Ogaf9OoJJ-Aoc"
    const signedCookies = {
      refreshToken,
      accessToken,
    };
    const request = await axios.post(`/orders/getSingle/${id}`,{
       signedCookies: JSON.stringify(signedCookies),
    });
    const response = await request;
    console.log(response)
    return response.data;
    
  } catch (error) {
    return undefined;
  }
}
