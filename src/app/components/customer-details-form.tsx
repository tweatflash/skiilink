"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button2";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { useCheckoutStore } from "app/contexts/ThemeContext";
const customerDetailsSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  emailOffers: z.boolean().optional(),
  country: z.string().min(1, "Country is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Address is required"),
  apartment: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(5, "Enter a valid ZIP code"),
  saveInfo: z.boolean().optional(),
});

type CustomerDetailsForm = z.infer<typeof customerDetailsSchema>;

export function CustomerDetailsForm() {
  const { setCustomerDetails, setStep, customerDetails } = useCheckoutStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CustomerDetailsForm>({
    resolver: zodResolver(customerDetailsSchema),
    defaultValues: customerDetails ? customerDetails : {
      email: "",
      emailOffers: false,
      country: "Nigeria",
      firstName: "",
      lastName: "",
      address: "",
      apartment: "",
      city: "",
      state: "",
      zipCode: "",
      saveInfo: false,
    }, 
  });

  const onSubmit = async (data: customerDetails2) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setCustomerDetails(data);
    setStep(2);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Contact Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact</h2>
        <div className="space-y-4">
          <div>
            <Input
              {...register("email")}
              type="email"
              placeholder="Email or mobile phone number"
              className={`h-12 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="emailOffers" {...register("emailOffers")} />
            <label htmlFor="emailOffers" className="text-sm text-gray-700">
              Email me with news and offers
            </label>
          </div>
        </div>
      </div>

      {/* Shipping Address Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Shipping address
        </h2>
        <div className="space-y-4">
          {/* Country/Region */}
          <div>
            <Label
              htmlFor="country"
              className="text-sm text-gray-700 mb-1.5 block"
            >
              Country/Region
            </Label>
            <select
              id="country"
              {...register("country")}
              className="w-full h-12 px-3 border border-gray-300 rounded-md bg-white text-gray-900"
            >
              <option value="United States">Lagos</option>
              <option value="Canada">Abuja</option>
              <option value="United Kingdom">Edo</option>
            </select>
          </div>

          {/* First Name & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                {...register("firstName")}
                placeholder="First name (optional)"
                className={`h-12 ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.firstName && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <Input
                {...register("lastName")}
                placeholder="Last name"
                className={`h-12 ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.lastName && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Address */}
          <div>
            <Input
              {...register("address")}
              placeholder="Address"
              className={`h-12 ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.address && (
              <p className="text-sm text-red-600 mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Add house number hint */}
          <p className="text-sm text-gray-500 flex items-center">
            <span className="inline-block w-4 h-4 rounded-full border border-gray-400 text-gray-400 text-xs  items-center justify-center mr-2">
              i
            </span>
            Add a house number if you have one
          </p>

          {/* Apartment */}
          <div>
            <Input
              {...register("apartment")}
              placeholder="Apartment, suite, etc. (optional)"
              className="h-12 border-gray-300"
            />
          </div>

          {/* City, State, ZIP */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Input
                {...register("city")}
                placeholder="City"
                className={`h-12 ${
                  errors.city ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.city && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>
            <div>
              <select
                {...register("state")}
                className={`w-full h-12 px-3 border rounded-md bg-white text-gray-900 ${
                  errors.state ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">State</option>
                <option value="Texas">Texas</option>
                <option value="California">California</option>
                <option value="New York">New York</option>
              </select>
              {errors.state && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.state.message}
                </p>
              )}
            </div>
            <div>
              <Input
                {...register("zipCode")}
                placeholder="ZIP code"
                className={`h-12 ${
                  errors.zipCode ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.zipCode && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.zipCode.message}
                </p>
              )}
            </div>
          </div>

          {/* Save Information */}
          <div className="flex items-center space-x-2">
            <Checkbox id="saveInfo" {...register("saveInfo")} />
            <label htmlFor="saveInfo" className="text-sm text-gray-700">
              Save this information for next time
            </label>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white text-base font-medium rounded-md"
        >
          {isSubmitting ? "Processing..." : "Continue to shipping"}
        </Button>
      </div>
    </form>
  );
}
