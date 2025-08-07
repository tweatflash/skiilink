  import Cookies from "js-cookie";
  import axios from "../src/app/api/axios/axios";
  export default async function uploadWithFormData(postRoute, FormData) {
    const refreshToken = Cookies.get("RFTFL");
    const accessToken = Cookies.get("ACTFL");
    const signedCookies = {
      refreshToken,
      accessToken,
    };
    
        FormData.append('rating', 4.5);
        FormData.append('stock', 50);
        
        // FormData.append('weight', 1.2);
  
        // FormData.append('warrantyInformation', "1-year manufacturer's warranty");
        FormData.append('shippingInformation', "Ships within 2-3 business days");
        FormData.append('availabilityStatus', "In Stock");

        FormData.append('reviews', JSON.stringify([
            {
                rating: 5,
                comment: "Love these shoes! Super comfortable.",
                date: "2025-06-01",
                reviewerName: "Jane Doe",
                reviewerEmail: "jane.doe@example.com"
            },
            {
                rating: 4,
                comment: "Great quality, but took a while to arrive.",
                date: "2025-05-28",
                reviewerName: "John Smith",
                reviewerEmail: "john.smith@example.com"
            }
        ]));

        FormData.append('returnPolicy', "30-day return policy for unworn items");
        FormData.append('minimumOrderQuantity', 1); 

      FormData.append('dimensions', JSON.stringify({
          width: 30,
          height: 15,
          depth: 10
        }));

        FormData.append('meta', JSON.stringify({
          barcode: "123456789012",
          qrCode: "https://example.com/qrcode"
        }));

        FormData.append('thumbnail', "https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/89/4893062/1.jpg?6623");

        FormData.append('images', JSON.stringify([
            "https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/89/4893062/1.jpg?6623"
        ]));
    FormData.append("signedCookies", JSON.stringify(signedCookies));
    for (const [key, value] of FormData.entries()) {
          console.log(`${key}:`, value);
        }
    try {
      const request = await axios.post("/products/create", FormData, {
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
