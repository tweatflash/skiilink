import type { Metadata } from "next";
import getSingleProduct from "../../../../../lib/getSingleProduct";
import ProductOverview from ".";

type SingleProp = {
  params: {
    productId: number;
  };
};
export async function generateMetadata({ params: { productId } }: SingleProp) {
  const wikiData: Promise<Ddstiew> = await getSingleProduct(productId);
  const data: dummyStore | undefined = (await wikiData)?.product;
  console.log(data);
  if (data===undefined) {
    return {
      title: "This Product is missing",
      description: "No results for this product found",
    };
  }
  return {
    title: data.title + " | Skiilink Store",
    description: data.description,
    // openGraph: {
    //     images: data.images[0],
    // },
    // twitter: {
    //     card: "summary_large_image",
    //     images: data.images[0],
    // },
  };
}
export default function ProductData() {
  const product={
    "id": "2-101",
    "name": "Star plus tall tubular Solar Lead Acid Batteries 12V 220Ah",
    "price": 1983503.7669115735,
    "image": "https://res.cloudinary.com/dlsngc9fb/image/upload/v1754154469/Post-images/tmp-2-1754154469459_rk7vvp.jpg",
    "images": [
        "https://res.cloudinary.com/dlsngc9fb/image/upload/v1754154469/Post-images/tmp-2-1754154469459_rk7vvp.jpg",
        "https://res.cloudinary.com/dlsngc9fb/image/upload/v1754154470/Post-images/tmp-3-1754154469460_fk8ar4.jpg",
        "https://ae-pic-a1.aliexpress-media.com/kf/S7ec0ec26c29447019cd876fa4388913eD.jpg_960x960q75.jpg_.avif"
    ],
    "category": "solar-batteries",
    "rating": 3.6482399765151405,
    "reviews": 80,
    "inStock": true,
    "isNew": true,
    "description": "Deep cycle lithium battery with built-in BMS protection. Long-lasting and maintenance-free with superior energy density.",
    "fullDescription": "Advanced LiFePO4 lithium battery technology provides exceptional cycle life and safety. The integrated Battery Management System (BMS) protects against overcharge, over-discharge, and short circuits. With over 6000 charge cycles at 80% depth of discharge, this battery offers 10 times longer life than traditional lead-acid batteries. Compact design and lightweight construction make installation easy.",
    "specifications": [
        "100Ah Capacity",
        "LiFePO4 Technology",
        "Built-in BMS",
        "10-Year Warranty",
        "6000+ Cycles",
        "Maintenance-Free"
    ],
    "features": [
        "LiFePO4 lithium iron phosphate technology",
        "Built-in Battery Management System (BMS)",
        "Over 6000 charge/discharge cycles",
        "Fast charging capability (0.5C rate)",
        "Wide operating temperature range",
        "Compact and lightweight design"
    ],
    "warranty": "10 years or 6000 cycles warranty",
    "brand": "Star plus",
    "model": "PM-100LFP",
    "weight": "13kg",
    "dimensions": "330 × 172 × 220mm"
}
  return (
    <>
      <ProductOverview product={product} />
    </>
  );
}
