import Cookies from "js-cookie";
import axios from "../src/app/api/axios/axios";
export default async function uploadWithFormData(postRoute, FormData) {
  const refreshToken = Cookies.get("RFTFL");
  const accessToken = Cookies.get("ACTFL");
  const signedCookies = {
    refreshToken,
    accessToken,
  };
  FormData.append("signedCookies", JSON.stringify(signedCookies));
  try {
    const request = await axios.post(postRoute, FormData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const response = await request;
    console.log(response);

    return response;
  } catch (error) {
    console.log(error)
    return undefined;
  }
}
