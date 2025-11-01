import { Button } from "app/components/ui/button2";
import { Input } from "app/components/ui/input";
import { Separator } from "app/components/ui/separator";
import { MailIcon } from "lucide-react";
import React from "react";

const companyLinks = ["About", "Features", "Works", "Career"];

const helpLinks = [
  "Customer Support",
  "Delivery Details",
  "Terms & Conditions",
  "Privacy Policy",
];

const faqLinks = ["Account", "Manage Deliveries", "Orders", "Payments"];



export function FooterSection(){
  return (
    <footer className="w-full flex flex-col items-center relative">
      <div className="w-full">
        <div className="flex w-[95%] max-w-7xl mx-auto translate-y-28 flex-col md:flex-row items-center justify-between px-6 md:px-16 py-9 bg-black rounded-[20px] overflow-hidden gap-8">
          <h2 className="w-full md:w-[551px] case text-white text-2xl md:text-[32px] lg:text-[40px] tracking-[0] leading-tight md:leading-[45px] text-center md:text-left">
            Stay up to Date About Our Latest Offers
          </h2>

          <div className="flex flex-col items-start gap-3.5 w-full md:w-auto">
            <div className="w-full md:w-[349px] bg-white flex items-center gap-3 px-4 py-3 rounded-[62px] overflow-hidden">
              <MailIcon className="w-5 h-5 md:w-6 md:h-6 text-[#00000066]" />
              <Input
                type="email"
                placeholder="Enter your email address"
                className="border-0 bg-transparent  font-normal text-[#00000066] text-sm md:text-base p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            <Button className="w-full md:w-[349px] h-auto px-4 py-3 bg-white text-black hover:bg-white/90 rounded-[62px] font-medium text-sm md:text-base">
              Subscribe to Newsletter
            </Button>
          </div>
        </div>

        <div className="w-full bg-[#efefef]  mt-6 px-6 md:px-16 pb-12 pt-32">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 items-start gap-8 md:gap-4 mb-12">
            <div className="flex flex-col col-span-2 items-start gap-[35px]">
              <div className="flex flex-col items-start gap-[25px]">
                <img src="/brands/ecoflow.png" className="h-4 w-auto invert" />

                <p className="w-full md:w-[248px]  font-normal text-[#00000099] text-sm tracking-[0] leading-[22px]">
                 We deliver trusted security gadgets and solar gear to protect your space and power your lifestyle
                </p>
              </div>

              <img
                className="w-[148px] h-7"
                alt="Social media icons"
                src="/social.png"
              />
            </div>

            <nav className="flex flex-col items-start gap-[26px]">
              <h4 className=" font-medium text-black text-base tracking-[3.00px] leading-[18px] whitespace-nowrap">
                COMPANY
              </h4>

              <ul className="flex flex-col gap-4">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className=" font-normal text-[#00000099] text-base tracking-[0] leading-[19px] hover:text-black transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="flex flex-col items-start gap-[26px]">
              <h4 className=" font-medium text-black text-base tracking-[3.00px] leading-[18px] whitespace-nowrap">
                HELP
              </h4>

              <ul className="flex flex-col gap-4">
                {helpLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className=" font-normal text-[#00000099] text-base tracking-[0] leading-[19px] hover:text-black transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="flex flex-col items-start gap-[26px]">
              <h4 className=" font-medium text-black text-base tracking-[3.00px] leading-[18px] whitespace-nowrap">
                FAQ
              </h4>

              <ul className="flex flex-col gap-4">
                {faqLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className=" font-normal text-[#00000099] text-base tracking-[0] leading-[19px] hover:text-black transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

           
          </div>

          <Separator className="mb-6 max-w-7xl mx-auto" />

          <div className="flex mx-auto max-w-7xl flex-col md:flex-row items-center justify-between gap-4">
            <p className=" font-normal text-[#00000099] text-sm tracking-[0] leading-[normal]">
              Skiilinkventures.com © 2025, All Rights Reserved
            </p>

            {/* <img
              className="w-auto h-10"
              alt="Payment methods"
              src="/brands/flutterwave.svg"
            /> */}
            <div className="flex flex-nowrap h-10 gap-4 w-auto">
              <div className="h-full w-32 rounded-lg bg-white py-2 px-3">
                <img
                  className="w-auto h-full"
                  alt="Payment methods"
                  src="/brands/flutterwave.svg"
                />
              </div>
              <div className="h-full w-32 rounded-lg bg-white py-2 px-3">
                <img
                  className="w-auto h-full"
                  alt="Payment methods"
                  src="/brands/flutterwave.svg"
                />
              </div>
              <div className="h-full w-32 rounded-lg bg-white py-2 px-3">
                <img
                  className="w-auto h-full"
                  alt="Payment methods"
                  src="/brands/flutterwave.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
