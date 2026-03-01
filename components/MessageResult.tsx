"use client";

import { useState, useRef, useEffect } from "react";

interface MessageResultProps {
  message: string;
  onRegenerate: () => void;
  onStartOver: () => void;
  isRegenerating: boolean;
}

export default function MessageResult({
  message,
  onRegenerate,
  onStartOver,
  isRegenerating,
}: MessageResultProps) {
  const [editedMessage, setEditedMessage] = useState(message);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditedMessage(message);
  }, [message]);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }, [editedMessage]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(editedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers / insecure contexts
      const textarea = document.createElement("textarea");
      textarea.value = editedMessage;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const smsLink = `sms:?&body=${encodeURIComponent(editedMessage)}`;

  return (
    <div className="fade-in space-y-4">
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={editedMessage}
          onChange={(e) => setEditedMessage(e.target.value)}
          className="message-textarea w-full resize-none rounded-xl border-2 border-white/10 bg-white/10 px-4 py-4 text-base leading-relaxed text-white placeholder-white/40 backdrop-blur-sm transition-all focus:border-accent-cyan focus:bg-white/15 focus:outline-none"
          rows={6}
        />
        <div className="mt-1 flex items-center justify-between px-1">
          <span className="text-xs text-white/50">
            {editedMessage.length} characters
          </span>
          {editedMessage !== message && (
            <button
              onClick={() => setEditedMessage(message)}
              className="text-xs text-accent-cyan hover:text-white transition-colors"
            >
              Reset to original
            </button>
          )}
        </div>
      </div>

      {/* Primary action: Copy */}
      <button
        onClick={handleCopy}
        className={`w-full rounded-full px-8 py-4 text-lg font-bold shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 ${
          copied
            ? "bg-emerald-500 text-white"
            : "bg-gradient-to-r from-primary-blue to-accent-cyan text-white"
        }`}
      >
        {copied ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Copied!
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
            Copy to Clipboard
          </span>
        )}
      </button>

      {/* Secondary actions */}
      <div className="flex gap-3">
        <a
          href={smsLink}
          className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Open in Messages
        </a>

        <button
          onClick={onRegenerate}
          disabled={isRegenerating}
          className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            className={`h-4 w-4 ${isRegenerating ? "animate-spin" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {isRegenerating ? "Regenerating..." : "Regenerate"}
        </button>
      </div>

      {/* Refer another */}
      <button
        onClick={onStartOver}
        className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Refer Another
      </button>
    </div>
  );
}
