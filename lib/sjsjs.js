let img = document.querySelector('.img'); 
let formData; // Declare it globally
let base64String;

document.querySelector('.file').addEventListener('change', function(event) {
  const file = event.target.files[0]; 
  const files = event.target.files;

  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      base64String = reader.result;
      img.src = base64String;
      img.alt = 'Uploaded Image'; 
      console.log(base64String);
      document.getElementById('text-center').appendChild(img);

      formData = new FormData(); // Use the globally declared formData
      
      // Append images
      for (let i = 0; i < files.length; i++) {
        formData.append('image', files[i]);
      }

     
      formData.append('rating', 4.5);
      formData.append('stock', 50);
      formData.append('brand', "Nike");
      formData.append('sku', "NIKE-270-BLK");
      formData.append('weight', 1.2);
 
      formData.append('warrantyInformation', "1-year manufacturer's warranty");
      formData.append('shippingInformation', "Ships within 2-3 business days");
      formData.append('availabilityStatus', "In Stock");

      formData.append('reviews', JSON.stringify([
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

      formData.append('returnPolicy', "30-day return policy for unworn items");
      formData.append('minimumOrderQuantity', 1);

      formData.append('dimensions', JSON.stringify({
        width: 30,
        height: 15,
        depth: 10
      }));

      formData.append('meta', JSON.stringify({
        barcode: "123456789012",
        qrCode: "https://example.com/qrcode"
      }));

      formData.append('thumbnail', "https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/89/4893062/1.jpg?6623");

      formData.append('images', JSON.stringify([
          "https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/89/4893062/1.jpg?6623"
      ]));

      const signedCookies = { 
        refreshToken: refreshTokenJWT,
        accessToken: accessTokenJWT
      }; 
      
      formData.append('signedCookies', JSON.stringify(signedCookies)); 

      // Log the result
      for (let pair of formData.entries()) {
        console.log(pair[0] + ':', pair[1]);
      }
    };

    reader.readAsDataURL(file);
  }

async function create() {
axios.post('https://solar-store.onrender.com/api/v1/products/create',formData,{ headers: { 'Content-Type': 'multipart/form-data' } })
.then(res => { 
  console.log(res);
  showOutput(res);
})
.catch(err => console.error(err));
}
}); 