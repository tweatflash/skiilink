import axios from "../src/app/api/axios/axios";
import Cookies from "js-cookie";
export default async function getSingleOrders(id) {
  const refreshToken = Cookies.get("RFTFL");
  const accessToken = Cookies.get("ACTFL");
  try {
    const request = await axios.post(`orders/getSingle/${id}`,{
        signedCookies:JSON.stringify({
            refreshToken,accessToken
        }),
      }
    );
    const response = await request;
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
