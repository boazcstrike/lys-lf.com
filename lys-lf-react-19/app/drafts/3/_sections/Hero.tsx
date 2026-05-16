import siteConfig, { headerConfig } from "@/app/assets/data/site-config"

/**
 * Full-bleed cinematic hero. LYS-29 as background, heavy dark overlay,
 * gold hairline accent, large Cormorant heading.
 */
export default function Hero() {
  const { firmName, firmShortName, establishedYear } = siteConfig

  return (
    <section
      id="hero"
      aria-label="Firm introduction"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
      }}
    >
      {/* Background photo */}
      <img
        src="/images/optimized/LYS-29.webp"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center top",
          zIndex: 0,
        }}
      />

      {/* Cinematic gradient overlay — near-black at bottom, semi-dark at top */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(11,11,12,0.65) 0%, rgba(11,11,12,0.80) 40%, rgba(11,11,12,0.97) 100%)",
          zIndex: 1,
        }}
      />

      {/* Gold vertical hairline — left accent */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "clamp(1.5rem, 4vw, 4rem)",
          top: "10%",
          bottom: "10%",
          width: "1px",
          background:
            "linear-gradient(to bottom, transparent, #B08D57 30%, #B08D57 70%, transparent)",
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding:
            "clamp(4rem, 8vw, 8rem) clamp(2rem, 6vw, 6rem) clamp(4rem, 8vw, 7rem)",
        }}
      >
        {/* Small-caps gold label */}
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#B08D57",
            marginBottom: "1.5rem",
          }}
        >
          Est. {establishedYear}&nbsp;·&nbsp;{firmShortName}
        </p>

        {/* Gold top rule */}
        <div
          aria-hidden="true"
          style={{
            width: "3rem",
            height: "1px",
            backgroundColor: "#B08D57",
            marginBottom: "1.75rem",
          }}
        />

        {/* H1 — main firm name */}
        <h1
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2.6rem, 7vw, 6rem)",
            fontWeight: 400,
            lineHeight: 1.08,
            color: "#EDEDED",
            margin: 0,
            marginBottom: "1.5rem",
            maxWidth: "18ch",
          }}
        >
          {firmName}
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
            fontWeight: 300,
            lineHeight: 1.75,
            color: "#9A9A9A",
            maxWidth: "55ch",
            marginBottom: "2.5rem",
          }}
        >
          {headerConfig.tagline}
        </p>

        {/* CTA links */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "44px",
              padding: "0.75rem 2rem",
              backgroundColor: "#B08D57",
              color: "#0B0B0C",
              fontFamily: "var(--font-inter)",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              border: "1px solid #B08D57",
            }}
          >
            Consult Us
          </a>
          <a
            href="#practice-areas"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "44px",
              padding: "0.75rem 2rem",
              backgroundColor: "transparent",
              color: "#EDEDED",
              fontFamily: "var(--font-inter)",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              border: "1px solid rgba(237,237,237,0.3)",
            }}
          >
            Our Practice
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "2.5rem",
          right: "clamp(1.5rem, 4vw, 4rem)",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <div
          style={{
            width: "1px",
            height: "3rem",
            background: "linear-gradient(to bottom, transparent, #B08D57)",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#B08D57",
            writingMode: "vertical-rl",
          }}
        >
          Scroll
        </span>
      </div>
    </section>
  )
}
