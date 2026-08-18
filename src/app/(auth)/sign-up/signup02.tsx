"use client";
import React, { useState, useRef, useEffect } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

interface OTPVerificationProps {
  contact: string;
  onVerify?: (code: string) => void;
  onResend?: () => void;
  onBack: () => void;
}

export const OTPVerification: React.FC<OTPVerificationProps> = ({
  contact,
  onVerify,
  onResend,
  onBack,
}) => {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every((digit) => digit !== "") && value) {
      handleVerify(newOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 5);
    const newOtp = pastedData
      .split("")
      .concat(Array(5 - pastedData.length).fill(""));
    setOtp(newOtp);
  };

  const handleVerify = async (code: string) => {
    setIsLoading(true);
    setError("");

    try {
      const request = await fetch(
        "https://solar-store.onrender.com/api/v1/auth/verifyEmail",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: contact,
            verificationToken: code,
          }),
        }
      );
      const response = await request.json();

      // NOTE: this still checks against hardcoded codes ("FLASH" / "12345")
      // instead of the API response — carried over as-is from your original
      // logic. Worth swapping to check `request.ok` / `response.success`
      // once the real verification endpoint is ready.
      if (code === "FLASH" || code === "12345") {
        setIsVerified(true);
        onVerify?.(code);
      } else {
        setError("Invalid verification code. Please try again.");
      }
    } catch (err) {
      setError("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    setResendTimer(60);
    setError("");
    setOtp(["", "", "", "", ""]);
    inputRefs.current[0]?.focus();
    onResend?.();
  };

  if (isVerified) {
    return (
      <div className="w-full flex flex-col items-center text-center gap-4">
        <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-orange-600" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl bold-livvic text-black dark:text-white">
            Verified successfully
          </h1>
          <p className="text-base med-livvic text-[#727272]">
            Your email has been verified. You're all set.
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="w-full mt-2 px-6 py-2 med-livvic text-lg flex justify-center items-center rounded-3xl text-white bg-gradient-to-b from-orange-400 to-orange-600 shadow-[0_1px_3px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-200 hover:from-orange-400 hover:to-orange-500 hover:shadow-[0_3px_12px_rgba(249,115,22,0.4),inset_0_1px_0_rgba(255,255,255,0.25)] active:scale-[0.97] active:shadow-[0_0px_1px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(0,0,0,0.1)]"
        >
          Continue
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <form
        className="flex flex-col gap-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-3xl bold-livvic text-black dark:text-white">
            We sent you a code
          </h1>
          <p className="text-base med-livvic text-[#727272]">
            Enter the 5-digit code we sent to {contact}
          </p>
        </div>

        <div className="grid gap-6">
          <div>
            <div className="flex justify-center gap-3 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  disabled={isLoading}
                  maxLength={1}
                  className={`w-12 h-12 text-center text-xl bold-livvic rounded-2xl border-2 transition-all duration-200 outline-none ${
                    error
                      ? "border-red-300 bg-red-50"
                      : digit
                      ? "border-orange-400 bg-orange-50"
                      : "border-transparent bg-gray-100 dark:bg-white/5"
                  } focus:border-orange-400`}
                />
              ))}
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm justify-center">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => handleVerify(otp.join(""))}
            disabled={otp.some((digit) => !digit) || isLoading}
            className="w-full mt-2 px-6 py-2 med-livvic text-lg flex justify-center items-center rounded-3xl text-white bg-gradient-to-b from-orange-400 to-orange-600  active:scale-[0.97] active:shadow-[0_0px_1px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(0,0,0,0.1)] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLoading ? "Verifying…" : "Verify code"}
          </button>

          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-1 med-livvic">
              Didn't receive the code?
            </p>
            {resendTimer > 0 ? (
              <p className="text-gray-500 text-sm">
                Resend code in {resendTimer}s
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors"
              >
                Resend code
              </button>
            )}
          </div>
        </div>

        <div className="text-center text-sm med-livvic text-[#727272]">
          Having a problem with the email?{" "}
          <span
            onClick={onBack}
            className="cursor-pointer underline underline-offset-4 text-black dark:text-white"
          >
            Change email
          </span>
        </div>
      </form>
    </div>
  );
};
