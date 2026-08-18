import type { Metadata } from "next";
import NoProductsFound from "app/components/noProductsFound";
import getSingleProduct from "../../../../../../lib/getSingleProduct";
import ProductForm from "app/components/admin/updateProducts";

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
    title: "Admin Update |" +" "+ data.title,
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

export default async function EditProduct({params: { productId }}:SingleProp) {
   const wikiData: Promise<Ddstiew> = await getSingleProduct(productId);
    const results: dummyStore | undefined = (await wikiData)?.product;
  if (!results){
    return <NoProductsFound />
  }
  return (
    <>
      <ProductForm product={results} />
    </>
  );
}
