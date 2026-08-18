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
import { sorting } from "../../../lib/constants";
import { Suspense } from "react";
import Image from "next/image";
function HeroSlantGrid() {
  const categories = [
    {
      title: "Solar & Inverters",
      sub: "Monocrystalline & Pure Sine",
      tag: "01",
      dark: true,
      image:"/images/solar.jpeg"
    },
    {
      title: "CCTV & Security",
      sub: "IP Cameras & Motion Sensors",
      tag: "02",
      dark: false,
      image:"/images/slrflood.jpg"
    },
    {
      title: "Smart Home",
      sub: "Automation & Plugs",
      tag: "03",
      dark: false,
      image:"/images/security-camera.png"
    },
    {
      title: "LED & Floodlights",
      sub: "Indoor & Solar Outdoor",
      tag: "04",
      dark: true,
      image:"/images/camera.jpg"
    },
    {
      title: "Cables & Wiring",
      sub: "Pure Copper Heavy-Duty",
      tag: "05",
      dark: false,
      image:"/images/solar.jpeg"
    },
    {
      title: "Surge & Protection",
      sub: "Breakers & Voltage Control",
      tag: "06",
      dark: false,
      image:"/images/slrflood.jpg"
    },
  ];

  return (
    /* RIGHT SIDE: Slanted Product Grid Container */
    <div className="lg:flex w-full md:w-1/2  h-[380px] hidden items-center justify-center absolute top-0 right-0 overflow-hidden">
      {/* Outer Slanted Container */}
      <div className="transform -skew-x-12 rotate-[-6deg] translate-x-4 md:translate-x-8 grid grid-cols-2 gap-2 w-[110%] max-w-[500px]">
       {categories.map((item, idx) => (
          // <div
          //   key={idx}
          //   className={`relative rounded-xl overflow-hidden min-h-[140px] flex flex-col justify-between transition-all duration-200 group cursor-pointer   ${
          //     item.dark
          //       ? "bg-slate-900 border-slate-800 text-white hover:bg-slate-850"
          //       : "bg-white  border-slate-200 text-slate-900 hover:bg-white hover:shadow-md"
          //   }`}
          // >
          //   {/* Counter-skew inner content so text remains perfectly horizontal */}
          //   <div className="transform skew-x-12 rotate-[5deg] flex flex-col justify-between h-full relative z-10">
          //     {/* <div className="flex justify-between items-start">
          //       <span
          //         className={`text-[11px] font-mono tracking-widest ${
          //           item.dark ? "text-slate-500" : "text-slate-400"
          //         }`}
          //       >
          //         [{item.tag}]
          //       </span>
          //       <span
          //         className={`text-xs font-[bold-Livvic] px-2 py-0.5 rounded ${
          //           item.dark
          //             ? "bg-slate-800 text-slate-300 group-hover:bg-slate-700"
          //             : "bg-slate-200/70 text-slate-700 group-hover:bg-slate-200"
          //         }`}
          //       >
          //         Shop &rarr;
          //       </span>
          //     </div>

          //     <div>
          //       <h3 className="text-base font-[bold-Livvic]  tracking-tight leading-snug">
          //         {item.title}
          //       </h3>
          //       <p
          //         className={`text-xs mt-1 ${
          //           item.dark ? "text-slate-400" : "text-slate-500"
          //         }`}
          //       >
          //         {item.sub}
          //       </p>
          //     </div> */}
          //     <>
          //       <Image
          //       src={item.image}
          //       alt={item.title}
          //       fill
          //       priority={idx < 2}
          //       className="object-cover w-[110%] group-hover:scale-110 transition-transform duration-300"
          //       // sizes="(max-width: 768px) 100vw, 250px"
          //     />
          //     </>
          //   </div>
          // </div>

          <div
            key={idx}
            className="relative rounded overflow-hidden min-h-[140px]  border-slate-200/50 group cursor-pointer"
          >
            {/* Counter-skew image wrapper to keep images upright */}
            <div className="transform skew-x-12 rotate-[6deg] scale-125 w-full h-full relative ">
              <Image
                src={item.image}
                alt={item.title}
                fill
                priority={idx < 2}
                className="object-cover  transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 250px"
              />

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
 
export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div className="min-h-screen"></div>}>
    <div className="mx-auto w-full min-h-screen h-max flex max-screen flex-col gap-4 pt-4 md:pt-0 md:gap-8 px-4 pb-4 bg-white md:flex-row">
      <div className="order-first w-full flex-none md:max-w-[125px] z-30 ">
        <Collections />
      </div>
      <div className="order-last min-h-screen w-full md:order-none">
         <section className=" pt-6 md:pt-6 overflow-hidden relative">
          <div className="grid grid-cols-1 border border-gray-50  gap-4 overflow-hidden relative rounded-3xl bg-neutral-100 px-8 py-12 lg:grid-cols-[1.1fr_1fr] md:px-8 md:py-16">
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl  sm:text-4xl  bold-livvic  leading-tight text-neutral-900 lg:text-5xl">
                Power, security and
                <br />
                smart living, sorted.
              </h1>
              <p className="mt-4 max-w-md text-neutral-500">
                Solar kits, inverters, cameras and smart-home gear picked for
                Nigerian homes — every item checked before it ships.
              </p>
            </div>
            {/* <div className="grid grid-cols-2 gap-3">
              {heroTiles.map((tile) => (
                <a
                  key={tile.label}
                  href={tile.href}
                  className={`group relative flex min-h-[110px] items-end overflow-hidden rounded-2xl p-4 transition-transform hover:-translate-y-0.5 ${tile.classes}`}
                >
                  <span className="text-lg font-[bold-Livvic] text-white drop-shadow-sm">
                    {tile.label}
                  </span>
                </a>
              ))}
            </div> */}
            <HeroSlantGrid/>
          </div>
        </section>
        {children}
      </div>
      <div className="order-none flex-none md:order-last md:w-[125px]">
        <FilterList list={sorting} title="Sort by" />
      </div>
    </div>
    </Suspense>
  );
}
