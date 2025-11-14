import React, { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  Mail,
  Phone,
  Shield,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface OTPVerificationProps {
  type?: "email" | "phone";
  contact?: string;
  onVerify?: (code: string) => void;
  onResend?: () => void;
  onBack: () => void;
}

export const OTPVerification: React.FC<OTPVerificationProps> = ({
  type = "email",
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

    // Auto-focus next input
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all fields are filled
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
      // Simulate API call
      const request = await fetch(
        "https://solar-store.onrender.com/api/v1/auth/verifyEmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: contact,
            verificationToken: code,
          }),
        }
      );
      const response = await request.json();
      console.log(response);
      // Mock verification logic
      if (code === "FLASH" || code === "12345") {
        // setIsVerified(true);
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

  const formatContact = (contact: string) => {
    if (type === "email") {
      const [username, domain] = contact.split("@");
      return `${username.slice(0, 2)}***@${domain}`;
    } else {
      return `***-***-${contact.slice(-4)}`;
    }
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Verified Successfully!
          </h2>
          <p className="text-gray-600 mb-6">
            Your {type} has been verified successfully.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-center justify-center text-[--color]">
      <div className="w-full max-w-[480px]">
        <form
          className="flex flex-col gap-6"
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-[22px] mobile:text-[26px] w-full text-black dark:text-white">
              We sent you a code 
            </h1>
            <p className="text-muted-foreground text-md mobile:text-[16px] text-balance text-[#727272]">
              Enter the 5 digit code we sent below to verify {contact}
            </p>
          </div>
          <div className="grid gap-6">
            <div className="mt-4">
              <div className="flex justify-center gap-3 mb-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el: any) => (inputRefs.current[index] = el)}
                    type="text"
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-xl transition-all duration-200 ${
                      error
                        ? "border-red-300 bg-red-50"
                        : digit
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    maxLength={1}
                    disabled={isLoading}
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
              data-slot="button"
              onClick={() => handleVerify(otp.join(""))}
              disabled={otp.some((digit) => !digit) || isLoading}
              className=" bg-gradient-to-r bg-black text-white rounded-lg outline-none dark:bg-[#E5E5E5] dark:text-black w-full px-6 mt-3 py-2  font-medium disabled:opacity-50 disabled:cursor-not-allowed  transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 mb-6"
              type="submit"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Verifying...
                </div>
              ) : (
                "Verify Code"
              )}
            </button>

            <div className="text-center">
              <p className="text-gray-600 text-sm mb-2">
                Didn't receive the code?
              </p>
              {resendTimer > 0 ? (
                <p className="text-gray-500 text-sm">
                  Resend code in {resendTimer}s
                </p>
              ) : (
                <button
                  onClick={handleResend}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                >
                  Resend Code
                </button>
              )}
            </div>
          </div>

          <div className="text-center text-sm">
            having a problem with the email?{/* */}{" "}
            <span  onClick={onBack} className="cursor-pointer underline underline-offset-4">
              Change email 
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
// const djdjjd=()=>{
//     return (
//         <div className="h-full flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <button
//             onClick={onBack}
//             className="absolute top-6 left-6 p-2 text-gray-400 hover:text-gray-600 transition-colors"
//           >
//             <ArrowLeft className="w-5 h-5" />
//           </button>

//           <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             {type === 'email' ? (
//               <Mail className="w-8 h-8 text-blue-600" />
//             ) : (
//               <Phone className="w-8 h-8 text-blue-600" />
//             )}
//           </div>

//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Verify Your {type === 'email' ? 'Email' : 'Phone'}</h1>
//           <p className="text-gray-600">
//             We've sent a 5-digit code to<br />
//             <span className="font-medium text-gray-900">{formatContact(contact)}</span>
//           </p>
//         </div>

//         {/* OTP Input */}
//         <div className="mb-6">
//           <div className="flex justify-center gap-3 mb-4">
//             {otp.map((digit, index) => (
//               <input
//                 key={index}
//                 ref={(el:any) => inputRefs.current[index] = el}
//                 type="text"
//                 value={digit}
//                 onChange={e => handleInputChange(index, e.target.value)}
//                 onKeyDown={e => handleKeyDown(index, e)}
//                 onPaste={handlePaste}
//                 className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-xl transition-all duration-200 ${
//                   error
//                     ? 'border-red-300 bg-red-50'
//                     : digit
//                     ? 'border-blue-500 bg-blue-50'
//                     : 'border-gray-200 hover:border-gray-300'
//                 } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
//                 maxLength={1}
//                 disabled={isLoading}
//               />
//             ))}
//           </div>

//           {error && (
//             <div className="flex items-center gap-2 text-red-600 text-sm justify-center">
//               <AlertCircle className="w-4 h-4" />
//               {error}
//             </div>
//           )}
//         </div>

//         {/* Verify Button */}
//         <button
//           onClick={() => handleVerify(otp.join(''))}
//           disabled={otp.some(digit => !digit) || isLoading}
//           className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 mb-6"
//         >
//           {isLoading ? (
//             <div className="flex items-center justify-center gap-2">
//               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//               Verifying...
//             </div>
//           ) : (
//             'Verify Code'
//           )}
//         </button>

//         {/* Resend */}
//         <div className="text-center">
//           <p className="text-gray-600 text-sm mb-2">Didn't receive the code?</p>
//           {resendTimer > 0 ? (
//             <p className="text-gray-500 text-sm">
//               Resend code in {resendTimer}s
//             </p>
//           ) : (
//             <button
//               onClick={handleResend}
//               className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
//             >
//               Resend Code
//             </button>
//           )}
//         </div>

//         {/* Security Note */}
//         <div className="mt-6 p-4 bg-gray-50 rounded-xl">
//           <div className="flex items-center gap-2 text-gray-600 text-sm">
//             <Shield className="w-4 h-4" />
//             <span>This code will expire in 10 minutes for security.</span>
//           </div>
//         </div>
//       </div>
//     </div>
//     )
// }
