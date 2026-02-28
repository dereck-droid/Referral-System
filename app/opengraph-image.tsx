import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Know a Business Owner Who Could Use AI? | Advanced Lead Solutions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1a2332 0%, #0f172a 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Dereck's photo */}
        <img
          src="https://storage.googleapis.com/msgsndr/1EjKer2tT55V5W7qhfnX/media/691e38dbd4f9b354c077cb4f.png"
          width={140}
          height={140}
          style={{
            borderRadius: "50%",
            border: "4px solid rgba(255,255,255,0.2)",
            objectFit: "cover",
            marginBottom: 20,
          }}
        />

        {/* Name */}
        <p
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: 18,
            letterSpacing: 3,
            textTransform: "uppercase",
            marginBottom: 30,
          }}
        >
          Dereck Johnson
        </p>

        {/* Headline */}
        <h1
          style={{
            color: "white",
            fontSize: 52,
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.2,
            maxWidth: 800,
            marginBottom: 20,
          }}
        >
          Know a Business Owner Who Could Use AI?
        </h1>

        {/* Subtitle */}
        <p
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: 24,
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.5,
          }}
        >
          Generate a personalized referral message in seconds
        </p>

        {/* Branding */}
        <p
          style={{
            position: "absolute",
            bottom: 30,
            color: "rgba(255,255,255,0.3)",
            fontSize: 16,
            letterSpacing: 1,
          }}
        >
          Advanced Lead Solutions
        </p>
      </div>
    ),
    { ...size }
  );
}
