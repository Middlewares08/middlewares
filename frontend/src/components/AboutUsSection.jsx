import { useState, useEffect, useRef } from "react";
import logo from "../../public/logo.png";

const VALUES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="9" cy="7" r="4" stroke="#00e5ff" strokeWidth="1.5"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: "Client-First",
    desc: "Your goals drive every decision we make — from architecture to delivery.",
    accent: "#00e5ff",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Agile",
    desc: "Fast iterations and constant feedback loops keep us aligned with your vision.",
    accent: "#7c3aed",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#06b6d4" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="3" stroke="#06b6d4" strokeWidth="1.5"/>
      </svg>
    ),
    label: "Transparent",
    desc: "Clear timelines, honest scoping, and no surprises on your invoice.",
    accent: "#06b6d4",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Scalable",
    desc: "We build with growth in mind — systems that evolve as your business does.",
    accent: "#34d399",
  },
];

const TEAM_HIGHLIGHTS = [
  { value: "10+", label: "Engineers & Designers" },
  { value: "3+", label: "Industries Served" },
  { value: "2021", label: "Founded" },
];

const TECH_STACK = [
  "React", "Node.js", "Laravel", "Python",
  "PostgreSQL", "MongoDB", "Docker", "AWS",
  "Flutter", "Next.js", "TypeScript", "Redis",
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

export default function AboutUsSection({ onNavigate }) {
  const [sectionRef, inView] = useInView();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;500;600;700;800;900&family=DM+Sans:wght@400;500&display=swap');

        @keyframes abt-fade-up {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes abt-fade-left {
          from { opacity: 0; transform: translateX(-32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes abt-fade-right {
          from { opacity: 0; transform: translateX(32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes abt-logo-float {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50%       { transform: translateY(-10px) rotate(1deg); }
        }
        @keyframes abt-ring-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes abt-ring-spin-rev {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes tech-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .abt-in { opacity: 0; }
        .abt-in.visible-up    { animation: abt-fade-up    0.7s ease forwards; }
        .abt-in.visible-left  { animation: abt-fade-left  0.7s ease forwards; }
        .abt-in.visible-right { animation: abt-fade-right 0.7s ease forwards; }

        .abt-value-card {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 18px 20px;
          border-radius: 12px;
          background: rgba(4,14,24,0.6);
          border: 1px solid rgba(0,229,255,0.07);
          transition: all 0.25s ease;
        }
        .abt-value-card:hover {
          background: rgba(0,229,255,0.03);
          border-color: rgba(0,229,255,0.2);
          transform: translateX(4px);
        }

        .abt-tech-track {
          display: flex;
          gap: 10px;
          animation: tech-scroll 22s linear infinite;
          width: max-content;
        }
        .abt-tech-track:hover {
          animation-play-state: paused;
        }

        .abt-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 28px;
          border-radius: 10px;
          font-size: 12px;
          font-family: 'Exo 2', sans-serif;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s ease;
          background: linear-gradient(135deg, #00e5ff, #0891b2);
          color: #040e18;
          border: none;
          box-shadow: 0 0 24px rgba(0,229,255,0.2);
        }
        .abt-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(0,229,255,0.35);
        }
        .abt-outline-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 28px;
          border-radius: 10px;
          font-size: 12px;
          font-family: 'Exo 2', sans-serif;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s ease;
          background: transparent;
          color: rgba(255,255,255,0.75);
          border: 1px solid rgba(255,255,255,0.15);
        }
        .abt-outline-btn:hover {
          border-color: rgba(255,255,255,0.35);
          color: #fff;
          transform: translateY(-2px);
        }

        .abt-stat-card {
          text-align: center;
          padding: 20px 16px;
          border-radius: 12px;
          background: rgba(4,14,24,0.6);
          border: 1px solid rgba(0,229,255,0.08);
          transition: all 0.25s ease;
        }
        .abt-stat-card:hover {
          border-color: rgba(0,229,255,0.25);
          background: rgba(0,229,255,0.03);
        }

        @media (max-width: 1024px) {
          .abt-layout { flex-direction: column !important; }
          .abt-visual-col { width: 100% !important; }
          .abt-content-col { width: 100% !important; }
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          position: "relative",
          padding: "100px 24px",
          overflow: "hidden",
        }}
      >
        {/* BG glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(124,58,237,0.04) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* Section label */}
          <div
            className={`abt-in${inView ? " visible-up" : ""}`}
            style={{ textAlign: "center", marginBottom: "64px", animationDelay: "0s" }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "'Exo 2', sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#00e5ff",
                marginBottom: "14px",
              }}
            >
              <span style={{ display: "inline-block", width: "28px", height: "1px", background: "linear-gradient(90deg, transparent, #00e5ff)" }} />
              Who We Are
              <span style={{ display: "inline-block", width: "28px", height: "1px", background: "linear-gradient(90deg, #00e5ff, transparent)" }} />
            </div>
            <h2
              style={{
                fontFamily: "'Exo 2', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                color: "#fff",
                margin: "0 0 16px",
                lineHeight: 1.1,
              }}
            >
              About Us
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "15px",
                color: "rgba(255,255,255,0.45)",
                maxWidth: "520px",
                margin: "0 auto",
                lineHeight: 1.75,
              }}
            >
              A startup built on the belief that great technology should be accessible
              to every business — not just the big ones.
            </p>
          </div>

          {/* Main layout: Visual + Content */}
          <div
            className="abt-layout"
            style={{
              display: "flex",
              gap: "64px",
              alignItems: "center",
              marginBottom: "80px",
            }}
          >
            {/* ── Visual Column ── */}
            <div
              className={`abt-visual-col abt-in${inView ? " visible-left" : ""}`}
              style={{
                width: "42%",
                flexShrink: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                animationDelay: "0.15s",
              }}
            >
              <div style={{ position: "relative", width: "320px", height: "320px" }}>

                {/* Outer spinning ring */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    border: "1px dashed rgba(0,229,255,0.15)",
                    animation: "abt-ring-spin 30s linear infinite",
                  }}
                >
                  {/* Ring dots */}
                  {[0, 90, 180, 270].map((deg) => (
                    <div
                      key={deg}
                      style={{
                        position: "absolute",
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "#00e5ff",
                        boxShadow: "0 0 8px rgba(0,229,255,0.8)",
                        top: "50%",
                        left: "50%",
                        transform: `rotate(${deg}deg) translateX(159px) translate(-50%, -50%)`,
                      }}
                    />
                  ))}
                </div>

                {/* Inner spinning ring */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: "28px",
                    borderRadius: "50%",
                    border: "1px dashed rgba(124,58,237,0.2)",
                    animation: "abt-ring-spin-rev 20s linear infinite",
                  }}
                >
                  {[45, 135, 225, 315].map((deg) => (
                    <div
                      key={deg}
                      style={{
                        position: "absolute",
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#7c3aed",
                        boxShadow: "0 0 6px rgba(124,58,237,0.8)",
                        top: "50%",
                        left: "50%",
                        transform: `rotate(${deg}deg) translateX(131px) translate(-50%, -50%)`,
                      }}
                    />
                  ))}
                </div>

                {/* Glow backdrop */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: "60px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(0,229,255,0.12) 0%, rgba(124,58,237,0.06) 50%, transparent 75%)",
                    filter: "blur(8px)",
                  }}
                />

                {/* Logo card */}
                <div
                  style={{
                    position: "absolute",
                    inset: "56px",
                    borderRadius: "24px",
                    background: "rgba(4,14,24,0.85)",
                    border: "1px solid rgba(0,229,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    animation: "abt-logo-float 6s ease-in-out infinite",
                    boxShadow: "0 0 40px rgba(0,229,255,0.1), inset 0 0 40px rgba(0,229,255,0.03)",
                  }}
                >
                  <img
                    src={logo}
                    alt="Middlewares"
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "16px",
                      objectFit: "cover",
                      boxShadow: "0 0 30px rgba(0,229,255,0.15)",
                    }}
                  />
                </div>

                {/* Floating label chips */}
                {[
                  { label: "Software Dev", x: "-30px", y: "30px", accent: "#00e5ff" },
                  { label: "IT Consulting", x: "230px", y: "200px", accent: "#7c3aed" },
                  { label: "Cloud & DevOps", x: "-20px", y: "235px", accent: "#06b6d4" },
                ].map((chip) => (
                  <div
                    key={chip.label}
                    style={{
                      position: "absolute",
                      left: chip.x,
                      top: chip.y,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "6px 12px",
                      borderRadius: "999px",
                      background: "rgba(4,14,24,0.92)",
                      border: `1px solid ${chip.accent}44`,
                      color: chip.accent,
                      fontFamily: "'Exo 2', sans-serif",
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      whiteSpace: "nowrap",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <span
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        background: chip.accent,
                        boxShadow: `0 0 6px ${chip.accent}`,
                        flexShrink: 0,
                      }}
                    />
                    {chip.label}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Content Column ── */}
            <div
              className={`abt-content-col abt-in${inView ? " visible-right" : ""}`}
              style={{ flex: 1, animationDelay: "0.2s" }}
            >
              <h3
                style={{
                  fontFamily: "'Exo 2', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
                  color: "#fff",
                  margin: "0 0 20px",
                  lineHeight: 1.2,
                }}
              >
                A Startup Built for{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #00e5ff, #7c3aed)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Real Problems
                </span>
              </h3>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "15px",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.55)",
                  marginBottom: "16px",
                }}
              >
                Middlewares Software Solutions was founded on a simple belief: great software
                should be accessible to every business, not just the big ones. We work as your
                technology partner — embedded in your goals, fluent in your domain.
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "15px",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.55)",
                  marginBottom: "32px",
                }}
              >
                From building internal tools to full-scale enterprise systems, we combine sharp
                engineering with practical business thinking. We don't just ship code —
                we solve problems and build relationships.
              </p>

              {/* Values grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "10px",
                  marginBottom: "36px",
                }}
              >
                {VALUES.map((v) => (
                  <div key={v.label} className="abt-value-card">
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: `rgba(${hexToRgb(v.accent)}, 0.1)`,
                        border: `1px solid rgba(${hexToRgb(v.accent)}, 0.2)`,
                        flexShrink: 0,
                      }}
                    >
                      {v.icon}
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "'Exo 2', sans-serif",
                          fontWeight: 700,
                          fontSize: "13px",
                          color: "#fff",
                          marginBottom: "3px",
                        }}
                      >
                        {v.label}
                      </div>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "12px",
                          color: "rgba(255,255,255,0.4)",
                          lineHeight: 1.5,
                        }}
                      >
                        {v.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                <button className="abt-cta-btn" onClick={() => onNavigate("Contact")}>
                  Work With Us
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button className="abt-outline-btn" onClick={() => onNavigate("Services")}>
                  Our Services
                </button>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div
            className={`abt-in${inView ? " visible-up" : ""}`}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "14px",
              marginBottom: "64px",
              animationDelay: "0.3s",
            }}
          >
            {TEAM_HIGHLIGHTS.map((s) => (
              <div key={s.label} className="abt-stat-card">
                <div
                  style={{
                    fontFamily: "'Exo 2', sans-serif",
                    fontWeight: 900,
                    fontSize: "2rem",
                    lineHeight: 1,
                    marginBottom: "6px",
                    background: "linear-gradient(135deg, #00e5ff, #7c3aed)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontFamily: "'Exo 2', sans-serif",
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.35)",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Tech stack marquee */}
          <div
            className={`abt-in${inView ? " visible-up" : ""}`}
            style={{ animationDelay: "0.4s" }}
          >
            <div
              style={{
                textAlign: "center",
                fontFamily: "'Exo 2', sans-serif",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)",
                marginBottom: "18px",
              }}
            >
              Technologies We Work With
            </div>

            <div
              style={{
                overflow: "hidden",
                maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
                WebkitMaskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
              }}
            >
              {/* Duplicated for seamless loop */}
              <div className="abt-tech-track">
                {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
                  <span
                    key={i}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "7px 16px",
                      borderRadius: "8px",
                      background: "rgba(4,14,24,0.7)",
                      border: "1px solid rgba(0,229,255,0.1)",
                      fontFamily: "'Exo 2', sans-serif",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.5)",
                      whiteSpace: "nowrap",
                      letterSpacing: "0.05em",
                      flexShrink: 0,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}