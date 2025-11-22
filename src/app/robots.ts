export default function robots() {
    const baseUrl = 'https://www.skiilinkventures.com';
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
