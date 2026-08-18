import Cookies from "js-cookie";
import axios from "../src/app/api/axios/axios";
export default async function deleteProduct(productId) {
  const refreshToken = Cookies.get("RFTFL");
  const accessToken = Cookies.get("ACTFL");
  const signedCookies = {
    refreshToken,
    accessToken,
  };
  try {
    const response = await axios.post(`/products/deleteItem/${productId}`, {
      signedCookies: JSON.stringify(signedCookies),
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};