import ReactMarkdown from "react-markdown"
import businessProfile from "@/app/assets/data/business-profile"

// Quiet Luxury palette
const GREEN = "#1F3A2E"
const BRASS = "#A98B5D"
const CHARCOAL = "#2B2622"
const STONE = "#EFEAE1"

/**
 * BusinessProfile — editorial two-column layout.
 * Left: Cormorant heading, brass rule, paragraphs with **bold** via react-markdown.
 * Right: stacked photo collage with soft shadows.
 * Stone bg for warmth; alternates with the panel bg on adjacent sections.
 */
export default function BusinessProfile() {
  const { title, paragraphs } = businessProfile

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      style={{
        backgroundColor: STONE,
        fontFamily: "var(--font-source-sans), system-ui, sans-serif",
      }}
      className="py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: text */}
          <div>
            <p
              style={{ color: BRASS, letterSpacing: "0.22em", fontSize: "10px" }}
              className="mb-4 font-medium uppercase"
            >
              Who We Are
            </p>

            <h2
              id="about-heading"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                color: GREEN,
                fontWeight: 500,
                lineHeight: 1.1,
              }}
              className="mb-5 text-[2.25rem] sm:text-[2.75rem]"
            >
              {title}
            </h2>

            {/* Brass hairline */}
            <div
              style={{ width: "3rem", height: "1px", backgroundColor: BRASS }}
              className="mb-8"
              aria-hidden="true"
            />

            {/* Paragraphs — **bold** rendered via react-markdown */}
            <div className="space-y-4">
              {paragraphs.map((para, idx) => (
                <ReactMarkdown
                  key={idx}
                  components={{
                    p: ({ children }) => (
                      <p
                        style={{ color: `${CHARCOAL}bb`, lineHeight: 1.78 }}
                        className="text-[0.9375rem]"
                      >
                        {children}
                      </p>
                    ),
                    strong: ({ children }) => (
                      <strong style={{ color: GREEN, fontWeight: 600 }}>
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

          {/* Right: photo collage */}
          <div className="flex flex-col gap-4">
            <div
              style={{
                overflow: "hidden",
                boxShadow: "0 4px 24px rgba(31,58,46,0.10)",
              }}
            >
              <img
                src="/images/optimized/LYS-20.webp"
                alt="Attorneys of the Lim and Yutatco-Sze Law Firm in consultation"
                className="aspect-[16/9] w-full object-cover"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div
                style={{
                  overflow: "hidden",
                  boxShadow: "0 4px 24px rgba(31,58,46,0.10)",
                }}
              >
                <img
                  src="/images/optimized/LYS-21.webp"
                  alt="LYS law office interior"
                  className="aspect-square w-full object-cover"
                />
              </div>
              <div
                style={{
                  overflow: "hidden",
                  boxShadow: "0 4px 24px rgba(31,58,46,0.10)",
                }}
              >
                <img
                  src="/images/optimized/LYS-25.webp"
                  alt="LYS attorneys at work"
                  className="aspect-square w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
