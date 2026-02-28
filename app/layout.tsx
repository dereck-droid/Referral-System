import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://family-friends.advancedleadsolutions.com"),
  title: "Refer a Business Owner | Advanced Lead Solutions",
  description:
    "Know a business owner who could benefit from AI? Generate a personalized referral message in seconds.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Know a Business Owner Who Could Use AI?",
    description:
      "Generate a personalized referral message in seconds. Built by Dereck Johnson at Advanced Lead Solutions.",
    type: "website",
    siteName: "Advanced Lead Solutions",
    url: "https://family-friends.advancedleadsolutions.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Know a Business Owner Who Could Use AI?",
    description:
      "Generate a personalized referral message in seconds. Built by Dereck Johnson at Advanced Lead Solutions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
