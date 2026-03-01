"use client";

import { useState } from "react";

interface ReferralFormProps {
  onSubmit: (data: {
    referrerName: string;
    contactName: string;
    businessType: string;
  }) => void;
  isLoading: boolean;
  defaultReferrerName?: string;
}

export default function ReferralForm({
  onSubmit,
  isLoading,
  defaultReferrerName = "",
}: ReferralFormProps) {
  const [referrerName, setReferrerName] = useState(defaultReferrerName);
  const [contactName, setContactName] = useState("");
  const [businessType, setBusinessType] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!referrerName.trim() || !contactName.trim() || !businessType.trim())
      return;
    onSubmit({
      referrerName: referrerName.trim(),
      contactName: contactName.trim(),
      businessType: businessType.trim(),
    });
  };

  const isValid =
    referrerName.trim() && contactName.trim() && businessType.trim();

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="referrerName"
          className="mb-2 block text-sm font-semibold text-white/90"
        >
          Your Name
        </label>
        <input
          id="referrerName"
          type="text"
          value={referrerName}
          onChange={(e) => setReferrerName(e.target.value)}
          placeholder="Your name"
          className="w-full rounded-lg border-2 border-white/10 bg-white/10 px-4 py-3.5 text-base text-white placeholder-white/40 backdrop-blur-sm transition-all focus:border-accent-cyan focus:bg-white/15 focus:outline-none"
          required
          autoComplete="name"
        />
      </div>

      <div>
        <label
          htmlFor="contactName"
          className="mb-2 block text-sm font-semibold text-white/90"
        >
          Your Friend&apos;s First Name
        </label>
        <input
          id="contactName"
          type="text"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
          placeholder="The business owner's name"
          className="w-full rounded-lg border-2 border-white/10 bg-white/10 px-4 py-3.5 text-base text-white placeholder-white/40 backdrop-blur-sm transition-all focus:border-accent-cyan focus:bg-white/15 focus:outline-none"
          required
        />
      </div>

      <div>
        <label
          htmlFor="businessType"
          className="mb-2 block text-sm font-semibold text-white/90"
        >
          What kind of business do they run?
        </label>
        <input
          id="businessType"
          type="text"
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value)}
          placeholder="e.g., roofing company, dental office, restaurant..."
          className="w-full rounded-lg border-2 border-white/10 bg-white/10 px-4 py-3.5 text-base text-white placeholder-white/40 backdrop-blur-sm transition-all focus:border-accent-cyan focus:bg-white/15 focus:outline-none"
          required
        />
      </div>

      <button
        type="submit"
        disabled={!isValid || isLoading}
        className="mt-2 w-full rounded-full bg-gradient-to-r from-primary-blue to-accent-cyan px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-3">
            <svg
              className="h-5 w-5 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Generating...
          </span>
        ) : (
          "Generate Message"
        )}
      </button>
    </form>
  );
}
