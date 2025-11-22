import type { Metadata } from "next";
import getSingleProduct from "../../../../../lib/getSingleProduct";
import ProductOverview from ".";
import NoProductsFound from "app/components/noProductsFound";

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
    openGraph: {
        images: data.image[0].url,
    },
    twitter: {
        card: "summary_large_image",
        images: data.image[0].url,
    },
  };
}

export default async function ProductData({params: { productId }}:SingleProp) {
   const wikiData: Promise<Ddstiew> = await getSingleProduct(productId);
    const results: dummyStore | undefined = (await wikiData)?.product;
    const stD={
  "@context": "https://schema.org",
  "@type": "Product",
  "description": results.description,
  "name": results.title,
  "image": results.image[0].url,
  "brand":{
    "@type": "Brand",
    "name": results.brand
  },
  "category": results.category,
  "offers": {
    "@type": "Offer",
    "availability": "InStock",
    "price": results.price,
    "priceCurrency": "NGN",
    "seller":{
      "@type": "Organization",
      "name": "Skiilink Ventures Nigeria Limited"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": results.rating,
    "ratingCount": results.reviews.length,
  },
  // "review": [
  //   {
  //     "@type": "Review",
  //     "author": "Ellie",
  //     "datePublished": "2011-04-01",
  //     "reviewBody": "The lamp burned out and now I have to replace it.",
  //     "name": "Not a happy camper",
  //     "reviewRating": {
  //       "@type": "Rating",
  //       "bestRating": "5",
  //       "ratingValue": "1",
  //       "worstRating": "1"
  //     }
  //   },
  //   {
  //     "@type": "Review",
  //     "author": "Lucas",
  //     "datePublished": "2011-03-25",
  //     "reviewBody": "Great microwave for the price. It is small and fits in my apartment.",
  //     "name": "Value purchase",
  //     "reviewRating": {
  //       "@type": "Rating",
  //       "bestRating": "5",
  //       "ratingValue": "4",
  //       "worstRating": "1"
  //     }
  //   }
  // ]
}
  if (!results){
    return <NoProductsFound />
  }
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(stD)}}/>
      <ProductOverview product={results} />
    </>
  );
}
