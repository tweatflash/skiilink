import { Card, CardContent } from "app/components/ui/card2";
import { StarIcon } from "lucide-react";
import React from "react";

export function NewsletterSection() {
  const stars = Array(5).fill(null);

  return (
    <Card className="w-full rounded-[20px] border border-[#0000001a]">
      <CardContent className="p-7">
        <div className="flex flex-col gap-[15px]">
          <div className="inline-flex items-start gap-[6.49px]">
            {stars.map((_, index) => (
              <StarIcon
                key={index}
                className="w-[21.47px] h-[20.42px] fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <div className="inline-flex items-center gap-1">
              <h3 className=" font-bold text-black text-xl tracking-[0] leading-[22px] whitespace-nowrap">
                James L.
              </h3>
              <img className="w-6 h-6" alt="Verified" src="/frame.svg" />
            </div>

            <p className=" font-normal text-[#00000099] text-base tracking-[0] leading-[22px]">
              "As someone who's always on the lookout for unique fashion pieces,
              I'm thrilled to have stumbled upon Shop.co. The selection of
              clothes is not only diverse but also on-point with the latest
              trends."
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
