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
  if (!results){
    return <NoProductsFound />
  }
  return (
    <>
      <ProductOverview product={results} />
    </>
  );
}
