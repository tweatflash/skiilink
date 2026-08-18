import Card from "app/components/ui/Card";
import { CardContent } from "app/components/ui/card2";
import { CheckIcon } from "lucide-react";
import React from "react";

const stars = Array(5).fill("/star-3.svg");

export function HeroSection (){
  return (
    <Card className="w-full max-w-[400px] rounded-[20px] border border-[#0000001a]">
      <CardContent className="flex flex-col gap-[15px] p-7">
        <div className="inline-flex items-start gap-[6.49px]">
          {stars.map((star, index) => (
            <img
              key={index}
              className="w-[21.47px] h-[20.42px]"
              alt="Star"
              src={star}
            />
          ))}
        </div>

        <div className="flex flex-col gap-3 w-full">
          <div className="inline-flex items-center gap-1">
            <h3 className="[font-family:'Satoshi-Bold',Helvetica] font-bold text-black text-xl tracking-[0] leading-[22px] whitespace-nowrap">
              Alex K.
            </h3>
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
              <CheckIcon className="w-4 h-4 text-white" />
            </div>
          </div>

          <p className="[font-family:'Satoshi-Regular',Helvetica] font-normal text-[#00000099] text-base tracking-[0] leading-[22px]">
            "Finding clothes that align with my personal style used to be a
            challenge until I discovered Shop.co. The range of options they
            offer is truly remarkable, catering to a variety of tastes and
            occasions."
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
