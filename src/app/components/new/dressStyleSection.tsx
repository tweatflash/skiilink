import { Card, CardContent } from "app/components/ui/card2";
import React from "react";

const dressStyles = [
  {
    name: "Casual",
    image: "/image-11.png",
    gridClass: "col-span-1 row-span-1",
  },
  {
    name: "Formal",
    image: "/image-13.png",
    gridClass: "col-span-2 row-span-1",
  },
  {
    name: "Party",
    image: "/image-12.png",
    gridClass: "col-span-2 row-span-1",
  },
  {
    name: "Gym",
    image: "/image-14.png",
    gridClass: "col-span-1 row-span-1",
  },
];

export function DressStyleSection(){
  return (
    <section className="w-full bg-[#efefef] rounded-[20px] md:rounded-[40px] py-12 md:py-[70px] px-4 md:px-16 mx-4 md:mx-0">
      <h2 className="text-center [font-family:'Integral_CF-Bold',Helvetica] font-bold text-black text-3xl md:text-5xl mb-8 md:mb-16">
        BROWSE BY dress STYLE
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[1107px] mx-auto">
        {dressStyles.map((style, index) => (
          <Card
            key={index}
            className={`${style.gridClass} bg-white rounded-[20px] overflow-hidden border-0 shadow-none relative h-[200px] md:h-[289px]`}
          >
            <CardContent className="p-0 relative w-full h-full">
              <img
                className="absolute top-0 left-0 w-full h-full object-cover"
                alt={style.name}
                src={style.image}
              />
              <div className="absolute top-[20px] md:top-[25px] left-6 md:left-9 [font-family:'Satoshi-Bold',Helvetica] font-bold text-black text-2xl md:text-4xl z-10">
                {style.name}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
