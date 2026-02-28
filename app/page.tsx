"use client";

import { useState } from "react";
import Header from "@/components/Header";
import ReferralForm from "@/components/ReferralForm";
import MessageResult from "@/components/MessageResult";
import WhatDereckDoes from "@/components/WhatDereckDoes";

interface FormData {
  referrerName: string;
  contactName: string;
  businessType: string;
}

export default function Home() {
  const [generatedMessage, setGeneratedMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFormData, setLastFormData] = useState<FormData | null>(null);

  const generateMessage = async (data: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.detail || "Failed to generate message");
      }

      setGeneratedMessage(result.message);
      setLastFormData(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = () => {
    if (lastFormData) {
      generateMessage(lastFormData);
    }
  };

  const handleStartOver = () => {
    setGeneratedMessage(null);
    setLastFormData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-bg-light">
      <Header />

      {/* Hero + Form Section */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a2332 0%, #0f172a 100%)",
        }}
      >
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `url("data:image/svg+xml,<svg width='100' height='100' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'><path d='M 40 0 L 0 0 0 40' fill='none' stroke='rgba(255,255,255,0.03)' stroke-width='1'/></pattern></defs><rect width='100' height='100' fill='url(%23grid)'/></svg>")`,
          }}
        />

        <div className="relative z-10 mx-auto max-w-lg px-5 py-12 md:py-16">
          {/* Dereck's photo */}
          <div className="mb-6 text-center fade-in-up">
            <img
              src="https://storage.googleapis.com/msgsndr/1EjKer2tT55V5W7qhfnX/media/691e38dbd4f9b354c077cb4f.png"
              alt="Dereck Johnson"
              className="mx-auto mb-3 h-28 w-28 rounded-full border-4 border-white/20 object-cover shadow-lg md:h-36 md:w-36"
            />
            <p className="text-sm font-medium text-white/60 uppercase tracking-wider">
              Dereck Johnson
            </p>
          </div>

          {/* Headline */}
          <div className="mb-8 text-center fade-in-up" style={{ animationDelay: "0.1s" }}>
            <h1 className="font-serif text-3xl font-bold text-white md:text-4xl leading-tight">
              Know a Business Owner Who Could Use AI?
            </h1>
            <p className="mt-3 text-base text-white/70 leading-relaxed md:text-lg">
              Fill in three fields below and we&apos;ll generate a ready-to-send
              text message for you. Takes about 10 seconds.
            </p>
          </div>

          {/* Form Card */}
          <div
            className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-sm fade-in-up md:p-8"
            style={{ animationDelay: "0.2s" }}
          >
            {generatedMessage && !isLoading ? (
              <MessageResult
                message={generatedMessage}
                onRegenerate={handleRegenerate}
                onStartOver={handleStartOver}
                isRegenerating={isLoading}
              />
            ) : (
              <>
                <ReferralForm
                  onSubmit={generateMessage}
                  isLoading={isLoading}
                />
                {error && (
                  <p className="mt-4 text-center text-sm text-red-400">
                    {error}
                  </p>
                )}
              </>
            )}
          </div>

          {/* Footer note */}
          <p
            className="mt-6 text-center text-xs text-white/40 fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            No account needed. Your info isn&apos;t stored.
          </p>
        </div>
      </div>

      {/* What Does Dereck Actually Do? */}
      <WhatDereckDoes />
    </div>
  );
}
