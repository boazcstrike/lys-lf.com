import businessProfile from "@/app/assets/data/business-profile"
import ReactMarkdown from "react-markdown"
import Reveal from "../_components/Reveal"

/**
 * Business Profile section — near-black bg with a side photo for texture.
 * Paragraphs rendered via react-markdown so **bold** → <strong>.
 * Sections and photo reveal on scroll via Reveal.
 * Colors use --d6-* CSS custom properties set by ThemeProvider.
 */
export default function BusinessProfile() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      style={{
        backgroundColor: "var(--d6-bg)",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 5rem)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr min(400px, 38%)",
          gap: "clamp(2rem, 5vw, 5rem)",
          alignItems: "start",
        }}
      >
        {/* Left — text */}
        <Reveal>
          <div>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--d6-accent)",
                marginBottom: "1rem",
              }}
            >
              Who We Are
            </p>

            <h2
              id="about-heading"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                color: "var(--d6-heading)",
                margin: 0,
                marginBottom: "1rem",
                textWrap: "balance",
              }}
            >
              {businessProfile.title}
            </h2>

            {/* Gold rule */}
            <div
              aria-hidden="true"
              style={{
                width: "3rem",
                height: "1px",
                backgroundColor: "var(--d6-accent)",
                marginBottom: "2rem",
              }}
            />

            {/* Paragraphs — react-markdown renders **bold** → strong */}
            <div
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "clamp(0.875rem, 1.2vw, 1rem)",
                fontWeight: 300,
                lineHeight: 1.85,
                color: "var(--d6-muted)",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                maxWidth: "65ch",
              }}
            >
              {businessProfile.paragraphs.map((para, idx) => (
                <ReactMarkdown
                  key={idx}
                  components={{
                    p: ({ children }) => (
                      <p style={{ margin: 0 }}>{children}</p>
                    ),
                    strong: ({ children }) => (
                      <strong style={{ color: "var(--d6-heading)", fontWeight: 600 }}>
                        {children}
                      </strong>
                    ),
                  }}
                >
                  {para}
                </ReactMarkdown>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Right — decorative photo with gold offset frame */}
        <Reveal delay={60}>
          <div style={{ position: "relative" }}>
            {/* Offset border frame */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "-1.5rem",
                bottom: "-1.5rem",
                left: "1.5rem",
                border: "1px solid var(--d6-accent-line)",
                zIndex: 0,
              }}
            />

            <img
              src="/images/optimized/LYS-20.webp"
              alt="Inside LYS Law Firm office"
              style={{
                position: "relative",
                zIndex: 1,
                width: "100%",
                aspectRatio: "3/4",
                objectFit: "cover",
                display: "block",
              }}
            />

            {/* Gold corner accent — bottom-left */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: "1.5rem",
                left: "1.5rem",
                zIndex: 2,
                width: "2.5rem",
                height: "2.5rem",
                borderBottom: "2px solid var(--d6-accent)",
                borderLeft: "2px solid var(--d6-accent)",
              }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
