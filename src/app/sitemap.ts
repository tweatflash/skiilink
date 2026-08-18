// app/sitemap.ts
import { MetadataRoute } from 'next';
import getSingleProduct from '../../lib/getSingleProduct';
import getWikiResults from '../../lib/getProducts';
// Simulated data fetchers (replace with DB/API calls)
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.skiilinkventures.com';
  const request = await getWikiResults("all");
  const response: Array<dummyStore> | undefined = request?.products;

  return [
    // Static routes
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/checkout`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/account`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/sign-in`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.5 },
    { url: `${baseUrl}/sign-up`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.5 },


    // Dynamic product routes
    ...(response?.map((product) => ({
      url: `${baseUrl}/product/${product._id}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    })) ?? []),

  ];
}