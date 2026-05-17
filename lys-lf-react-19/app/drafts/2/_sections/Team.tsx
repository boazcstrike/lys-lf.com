import teamRoles from "@/app/assets/data/team"

// Honorific tokens to strip when deriving initials
const HONORIFICS = new Set([
  "atty.", "atty", "mr.", "mr", "ms.", "ms", "dr.", "dr",
])

/**
 * Derive two-letter monogram from a full attorney name.
 * Strips honorifics, uses first name initial + last name initial.
 *
 * "Atty. Albert Caesar M. Pereña" → "AP"
 * "Atty. Dana F. Ruedas"          → "DR"
 */
function getInitials(name: string): string {
  const tokens = name
    .split(/\s+/)
    .filter((t) => !HONORIFICS.has(t.toLowerCase().replace(/[.,]/g, "")))

  if (tokens.length === 0) return "?"
  if (tokens.length === 1) return (tokens[0]?.[0] ?? "?").toUpperCase()

  const first = tokens[0]?.[0] ?? ""
  const last = tokens[tokens.length - 1]?.[0] ?? ""
  return (first + last).toUpperCase()
}

/**
 * Team — Quiet Luxury layout.
 * Cormorant section heading, brass hairlines.
 * Partners: portrait photos (3:4 aspect).
 * Associates: typographic monogram on bg color.
 * No JS — CSS hover only.
 * Colors via CSS custom properties (--d6-*).
 */
export default function Team() {
  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      style={{
        backgroundColor: "var(--d6-bg)",
        fontFamily: "var(--font-source-sans), system-ui, sans-serif",
      }}
      className="py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-8">
        {/* Section header */}
        <div className="mb-14 max-w-xl">
          <p
            style={{ color: "var(--d6-accent)", letterSpacing: "0.22em", fontSize: "10px" }}
            className="mb-4 font-medium uppercase"
          >
            Our People
          </p>
          <h2
            id="team-heading"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              color: "var(--d6-heading)",
              fontWeight: 500,
              lineHeight: 1.1,
            }}
            className="text-[2.25rem] sm:text-[2.75rem]"
          >
            Meet the Team
          </h2>
          <div
            style={{ width: "3rem", height: "1px", backgroundColor: "var(--d6-accent)" }}
            className="mt-5"
            aria-hidden="true"
          />
        </div>

        {/* Role groups */}
        <div className="space-y-16">
          {teamRoles.map((role) => (
            <div key={role.position}>
              {/* Role label row */}
              <h3
                style={{
                  color: "var(--d6-accent)",
                  letterSpacing: "0.22em",
                  fontSize: "10px",
                  borderBottom: "1px solid var(--d6-hair)",
                  paddingBottom: "0.75rem",
                  marginBottom: "2rem",
                }}
                className="font-medium uppercase"
              >
                {role.position}
              </h3>

              <ul
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                role="list"
              >
                {role.employees.map((employee) => {
                  const initials = getInitials(employee.name)

                  return (
                    <li
                      key={employee.key}
                      style={{
                        border: "1px solid var(--d6-hair)",
                        backgroundColor: "var(--d6-bg)",
                      }}
                      className="flex flex-col transition-shadow hover:shadow-[0_4px_24px_var(--d6-scrim-mid)]"
                    >
                      {/* Photo (partners) or typographic monogram (associates) */}
                      {employee.img ? (
                        <div style={{ overflow: "hidden" }}>
                          <img
                            src={employee.img}
                            alt={`Portrait of ${employee.name}`}
                            className="aspect-[3/4] w-full object-cover object-top"
                          />
                        </div>
                      ) : (
                        <div
                          style={{
                            backgroundColor: "var(--d6-bg)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            aspectRatio: "3/4",
                            width: "100%",
                            position: "relative",
                          }}
                          role="img"
                          aria-label={`Monogram for ${employee.name}`}
                        >
                          {/* Decorative inner frame */}
                          <span
                            style={{
                              position: "absolute",
                              top: "1rem",
                              left: "1rem",
                              right: "1rem",
                              bottom: "1rem",
                              border: "1px solid var(--d6-hair)",
                              pointerEvents: "none",
                            }}
                            aria-hidden="true"
                          />
                          {/* Monogram letters — heading color at low opacity */}
                          <span
                            style={{
                              fontFamily: "var(--font-cormorant), Georgia, serif",
                              fontSize: "3.5rem",
                              fontWeight: 300,
                              color: "var(--d6-faint)",
                              lineHeight: 1,
                              letterSpacing: "0.05em",
                              userSelect: "none",
                            }}
                            aria-hidden="true"
                          >
                            {initials}
                          </span>
                        </div>
                      )}

                      {/* Name card */}
                      <div
                        style={{
                          borderTop: "1px solid var(--d6-hair)",
                          padding: "1.125rem 1.25rem",
                        }}
                        className="flex flex-1 flex-col"
                      >
                        <p
                          style={{
                            fontFamily: "var(--font-cormorant), Georgia, serif",
                            color: "var(--d6-heading)",
                            fontWeight: 600,
                            fontSize: "1.05rem",
                            lineHeight: 1.25,
                          }}
                        >
                          {employee.name}
                        </p>

                        {employee.position && (
                          <p
                            style={{
                              color: "var(--d6-faint)",
                              fontSize: "11px",
                              letterSpacing: "0.05em",
                              marginTop: "0.25rem",
                            }}
                          >
                            {employee.position}
                          </p>
                        )}

                        {employee.bio && (
                          <p
                            style={{
                              color: "var(--d6-text)",
                              fontSize: "12px",
                              lineHeight: 1.7,
                              marginTop: "0.75rem",
                              textAlign: "justify",
                            }}
                          >
                            {employee.bio}
                          </p>
                        )}

                        {/* Contact links when present */}
                        {(employee.mobile ?? employee.email) && (
                          <div
                            style={{
                              borderTop: "1px solid var(--d6-hair)",
                              marginTop: "0.75rem",
                              paddingTop: "0.75rem",
                            }}
                            className="space-y-1"
                          >
                            {employee.mobile && (
                              <a
                                href={`tel:${employee.mobile}`}
                                style={{ color: "var(--d6-faint)", fontSize: "11px", display: "block" }}
                                className="transition-colors hover:text-[var(--d6-heading)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--d6-accent)] focus-visible:ring-offset-2"
                              >
                                {employee.mobile}
                              </a>
                            )}
                            {employee.email && (
                              <a
                                href={`mailto:${employee.email}`}
                                style={{ color: "var(--d6-faint)", fontSize: "11px", display: "block" }}
                                className="transition-colors hover:text-[var(--d6-heading)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--d6-accent)] focus-visible:ring-offset-2"
                              >
                                {employee.email}
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
