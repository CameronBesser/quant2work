import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuantumWorks | AI, Cyber & Software Solutions for Government",
  description:
    "Women‑Owned Small Business (WOSB) providing AI, cybersecurity, and full‑stack software development for government agencies. Secure, scalable, future‑ready.",
  keywords: "AI, cybersecurity, software development, government solutions, WOSB, post‑quantum cryptography",
  authors: [{ name: "QuantumWorks" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "QuantumWorks – AI, Cyber & Software for Government",
    description:
      "Delivering cutting‑edge AI agents, LLMs, post‑quantum crypto, and full‑stack apps tailored to mission‑critical government needs.",
    type: "website",
    url: "https://quantum-work.org",
    siteName: "QuantumWorks",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuantumWorks – Government Tech Solutions",
    description: "WOSB‑certified AI, cybersecurity, and software development partner for federal agencies.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50">
        {children}
      </body>
    </html>
  );
}