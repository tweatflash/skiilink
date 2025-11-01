import { Card, CardContent } from "app/components/ui/card2";
import { CheckCircle2Icon, Star } from "lucide-react";
import React from "react";
const stars = [
  { id: 1, src: "/star-3.svg" },
  { id: 2, src: "/star-3.svg" },
  { id: 3, src: "/star-3.svg" },
  { id: 4, src: "/star-3.svg" },
  { id: 5, src: "/star-3.svg" },
];

export function CustomerReviewsSection(){
  return (
    <Card className="w-full rounded-[20px] border border-[#0000001a]">
      <CardContent className="p-7">
        <div className="flex flex-col gap-[15px]">
          <div className="inline-flex items-start gap-[6.49px]">
            {stars.map((star) => (
              <Star size={20} fill="orange"/>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <div className="inline-flex items-center gap-1">
              <div className="[font-family:'Satoshi-Bold',Helvetica] font-bold text-black text-xl tracking-[0] leading-[22px] whitespace-nowrap">
                Sarah M.
              </div>
              <CheckCircle2Icon className="w-6 h-6 text-green-500" />
            </div>

            <p className="[font-family:'Satoshi-Regular',Helvetica] font-normal text-[#00000099] text-base tracking-[0] leading-[22px]">
              "I'm blown away by the quality and style of the clothes I received
              from Shop.co. From casual wear to elegant dresses, every piece
              I've bought has exceeded my expectations."
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
