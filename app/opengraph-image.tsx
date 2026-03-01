import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "One Simple Message Helps More Than You Know | Advanced Lead Solutions";
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
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(135deg, #1a2332 0%, #0f172a 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top-right cyan glow */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Bottom-left blue glow */}
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -60,
            width: 350,
            height: 350,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Gradient accent bar at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 5,
            background: "linear-gradient(90deg, #2563eb 0%, #06b6d4 100%)",
          }}
        />

        {/* Main content — left-aligned layout */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            height: "100%",
            padding: "50px 70px",
            gap: 50,
          }}
        >
          {/* Left side — text */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            {/* Headline */}
            <h1
              style={{
                color: "white",
                fontSize: 54,
                fontWeight: 700,
                lineHeight: 1.15,
                margin: 0,
                marginBottom: 16,
              }}
            >
              One Simple Message Helps More Than You Know.
            </h1>

            {/* Subtitle */}
            <p
              style={{
                color: "#06b6d4",
                fontSize: 28,
                fontStyle: "italic",
                fontWeight: 600,
                margin: 0,
                marginBottom: 30,
              }}
            >
              I&apos;ll even write it for you!
            </p>

            {/* Divider line */}
            <div
              style={{
                width: 60,
                height: 3,
                background: "linear-gradient(90deg, #2563eb, #06b6d4)",
                borderRadius: 2,
                marginBottom: 20,
              }}
            />

            {/* Description */}
            <p
              style={{
                color: "rgba(255,255,255,0.55)",
                fontSize: 20,
                lineHeight: 1.5,
                margin: 0,
                maxWidth: 500,
              }}
            >
              Tell me about a business owner you know and I&apos;ll craft a
              personalized intro message you can text them.
            </p>
          </div>

          {/* Right side — photo + name */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            {/* Photo with glow ring */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 200,
                height: 200,
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)",
                padding: 4,
                marginBottom: 16,
              }}
            >
              <img
                src="https://storage.googleapis.com/msgsndr/1EjKer2tT55V5W7qhfnX/media/691e38dbd4f9b354c077cb4f.png"
                width={192}
                height={192}
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Name */}
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: 16,
                letterSpacing: 3,
                textTransform: "uppercase",
                fontWeight: 600,
                margin: 0,
              }}
            >
              Dereck Johnson
            </p>
          </div>
        </div>

        {/* Bottom branding bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "14px 0",
            background: "rgba(0,0,0,0.25)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 15,
              letterSpacing: 2,
              fontWeight: 600,
              margin: 0,
            }}
          >
            ADVANCED LEAD SOLUTIONS
          </p>
        </div>
      </div>
    ),
    { ...size }
  );
}
