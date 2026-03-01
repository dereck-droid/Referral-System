"use client";

import { useState, useEffect } from "react";

interface LoadingSequenceProps {
  businessType: string;
}

interface Step {
  label: string;
  duration: number; // ms before advancing to next step
}

export default function LoadingSequence({ businessType }: LoadingSequenceProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: Step[] = [
    { label: "Gathering info", duration: 2000 },
    { label: `Researching ${businessType}`, duration: 3000 },
    { label: "Crafting your message", duration: Infinity }, // stays until done
  ];

  useEffect(() => {
    const step = steps[currentStep];
    if (!step || step.duration === Infinity) return;

    const timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, step.duration);

    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-8">
      {/* Spinner */}
      <div className="relative h-14 w-14">
        <div className="absolute inset-0 rounded-full border-4 border-white/10" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-accent-cyan animate-spin" />
      </div>

      {/* Steps */}
      <div className="w-full space-y-3">
        {steps.map((step, i) => {
          const isActive = i === currentStep;
          const isComplete = i < currentStep;

          return (
            <div
              key={i}
              className={`flex items-center gap-3 transition-all duration-500 ${
                isActive
                  ? "opacity-100"
                  : isComplete
                    ? "opacity-40"
                    : "opacity-20"
              }`}
            >
              {/* Step indicator */}
              <div className="flex-shrink-0">
                {isComplete ? (
                  <svg
                    className="h-5 w-5 text-accent-cyan"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : isActive ? (
                  <div className="h-2.5 w-2.5 rounded-full bg-accent-cyan loading-pulse" />
                ) : (
                  <div className="h-2.5 w-2.5 rounded-full bg-white/30" />
                )}
              </div>

              {/* Step text */}
              <span
                className={`text-sm font-medium ${
                  isActive
                    ? "text-white loading-pulse"
                    : isComplete
                      ? "text-white/50"
                      : "text-white/30"
                }`}
              >
                {step.label}
                {isActive && (
                  <span className="loading-dots ml-0.5">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </span>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
