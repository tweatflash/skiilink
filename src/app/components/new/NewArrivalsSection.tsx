import { Card, CardContent } from "app/components/ui/card2";
import React from "react";

export function NewArrivalsSection(){
  const stars = Array(5).fill("/star-3.svg");

  return (
    <section className="w-full">
      <Card className="rounded-[20px] border border-[#0000001a]">
        <CardContent className="p-7">
          <div className="flex flex-col gap-[15px]">
            <div className="flex items-start gap-[6.49px]">
              {stars.map((star, index) => (
                <img
                  key={index}
                  className="w-[22.58px] h-[22.58px]"
                  alt="Star"
                  src={star}
                />
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-1">
                <h3 className=" font-bold text-black text-xl tracking-[0] leading-[22px] whitespace-nowrap">
                  Sarah M.
                </h3>
                <img className="w-6 h-6" alt="Verified" src="/frame.svg" />
              </div>

              <p className="font-normal text-[#00000099] text-base tracking-[0] leading-[22px]">
                "I'm blown away by the quality and style of the clothes I
                received from Shop.co. From casual wear to elegant dresses,
                every piece I've bought has exceeded my expectations."
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
