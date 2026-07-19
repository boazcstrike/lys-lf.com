import ReactMarkdown from "react-markdown"
import businessProfile from "@/app/assets/data/business-profile"
import siteConfig from "@/app/assets/data/site-config"
import Reveal from "../_components/Reveal"
import CountUp from "../_components/CountUp"
import { FONT } from "../_components/theme"

/**
 * BusinessProfile — dark editorial panel (Draft 6).
 *
 * Sticky photo column with a clip-path reveal + an animated "years of
 * practice" stat; prose column staggers paragraph-by-paragraph via
 * Reveal. **bold** names render in accent color. Reveal handles
 * reduced-motion. Colors via CSS custom properties (--d6-*).
 */
const yearsActive = new Date().getFullYear() - siteConfig.establishedYear

export default function BusinessProfile() {
  return (
    <section
      id="about"
      style={{
        backgroundColor: "var(--d6-panel)",
        padding: "clamp(4rem,9vw,7rem) clamp(1.25rem,5vw,5rem)",
      }}
    >
      <div
        className="d6-bp-grid"
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          display: "grid",
          gap: "clamp(2.5rem,5vw,4.5rem)",
          gridTemplateColumns: "1fr",
        }}
      >
        {/* Sticky media + stat. Sticky lives on an OUTER plain wrapper, not
            on Reveal: the IntersectionObserver target must stay in normal
            flow or the clip reveal mis-fires and leaves a huge blank box. */}
        <div style={{ position: "sticky", top: "5rem", alignSelf: "start" }}>
          <Reveal variant="clip">
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                aspectRatio: "4 / 5",
                border: "1px solid var(--d6-accent-line)",
              }}
            >
            <img
              src="/images/optimized/LYS-24.webp"
              alt="Lim and Yutatco-Sze Law Firm attorneys collaborating"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, transparent 55%, var(--d6-img-scrim))",
              }}
            />
            {/* Animated stat badge */}
            <div
              style={{
                position: "absolute",
                left: "1.25rem",
                bottom: "1.25rem",
                display: "flex",
                alignItems: "baseline",
                gap: "0.5rem",
              }}
            >
              <span
                style={{
                  fontFamily: FONT.display,
                  fontWeight: 700,
                  fontSize: "clamp(2.4rem,5vw,3.4rem)",
                  color: "var(--d6-accent)",
                  lineHeight: 1,
                }}
              >
                <CountUp target={yearsActive} duration={1400} />+
              </span>
              <span
                style={{
                  fontFamily: FONT.body,
                  fontSize: "0.7rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--d6-hero-muted)",
                }}
              >
                Years of
                <br />
                practice
              </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Prose */}
        <div>
          <Reveal variant="left">
            <p
              style={{
                fontFamily: FONT.body,
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "var(--d6-accent)",
                margin: "0 0 0.75rem",
              }}
            >
              Who We Are
            </p>
            <h2
              style={{
                fontFamily: FONT.display,
                fontWeight: 700,
                fontSize: "clamp(2rem,5vw,3.4rem)",
                color: "var(--d6-hero-text)",
                margin: "0 0 0.5rem",
              }}
            >
              {businessProfile.title}
            </h2>
            <div
              aria-hidden="true"
              style={{
                width: "48px",
                height: "3px",
                backgroundColor: "var(--d6-accent)",
                margin: "1.25rem 0 2rem",
              }}
            />
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {businessProfile.paragraphs.map((para, i) => (
              <Reveal key={i} delay={i * 90} variant="up">
                <ReactMarkdown
                  components={{
                    p: ({ children }) => (
                      <p
                        style={{
                          fontFamily: FONT.body,
                          fontSize: "0.95rem",
                          lineHeight: 1.8,
                          color: "var(--d6-hero-muted)",
                          margin: 0,
                        }}
                      >
                        {children}
                      </p>
                    ),
                    strong: ({ children }) => (
                      <strong style={{ color: "var(--d6-accent)", fontWeight: 700 }}>
                        {children}
                      </strong>
                    ),
                  }}
                >
                  {para}
                </ReactMarkdown>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Two columns on lg+ */}
      <style>{`
        @media (min-width: 1024px) {
          .d6-bp-grid { grid-template-columns: 0.85fr 1.15fr; align-items: start; }
        }
      `}</style>
    </section>
  )
}
