import Cookies from "js-cookie";
import axios from "../src/app/api/axios/axios";
export default async function checkLoggedinStatus() {
  try {
    const refreshToken = Cookies.get("RFTFL");
    const accessToken = Cookies.get("ACTFL");
    const signedCookies = {
      refreshToken,
      accessToken,
    };
    const response = await axios.post("/auth", {
      signedCookies: JSON.stringify(signedCookies),
    });

    const request = await response;
    return request
  } catch (error) {
    return undefined;
  }
}
