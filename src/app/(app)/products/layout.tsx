import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Products | Skiilink Ventures Limited",
  description:
    "Discover a wide range of products at Skiilink Ventures Limited. Browse, filter, and sort through our catalogue to find the best deals on quality items. Enjoy a seamless shopping experience with detailed product information",
};
// export default function RootLayout({
//     children,
// }: {
//     children: React.ReactNode;
// }) {
//     const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
//     return (
//         <div>
//             {children}
//         </div>
//     );
// }
import FilterList from "app/components/layout/catalogue";
import Collections from "app/components/layout/catalogue/collections";
import { sorting } from "../../../../lib/constants";
import { Suspense } from "react";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
    <div className="mx-auto w-full min-h-screen h-max flex max-screen flex-col gap-4 sm:gap-8 px-4 pb-4 bg-white md:flex-row">
      <div className="order-first w-full flex-none md:max-w-[125px] z-30 ">
        <Collections />
      </div>
      <div className="order-last min-h-screen w-full md:order-none">
        {children}
      </div>
      <div className="order-none flex-none md:order-last md:w-[125px]">
        <FilterList list={sorting} title="Sort by" />
      </div>
    </div>
    </Suspense>
  );
}
