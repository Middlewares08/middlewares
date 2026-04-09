import { useState, useEffect, useRef } from "react";
import logo from "../assets/middlware.jpg"; // Update path to your actual logo asset

const TYPEWRITER_PHRASES = [
  "Software Development.",
  "System Development.",
  "IT Consultation.",
  "Digital Transformation.",
  "Cloud & DevOps.",
];

const STATS = [
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
  { value: "5+", label: "Years Experience" },
  { value: "99%", label: "Uptime SLA" },
];

function useTypewriter(phrases) {
  const [displayed, setDisplayed] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];
    let delay = isDeleting ? 45 : 80;

    if (!isDeleting && charIndex === current.length) {
      delay = 1800;
    } else if (isDeleting && charIndex === 0) {
      delay = 300;
    }

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < current.length) {
        setDisplayed(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      } else if (!isDeleting && charIndex === current.length) {
        setIsDeleting(true);
      } else if (isDeleting && charIndex > 0) {
        setDisplayed(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex, phrases]);

  return displayed;
}

function CircuitLines() {
  return (
    <svg
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.06,
        pointerEvents: "none",
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="hero-circuit" x="0" y="0" width="140" height="140" patternUnits="userSpaceOnUse">
          <path d="M20 20 h30 v30 h30 v-30 h30" stroke="#00e5ff" strokeWidth="1" fill="none" />
          <path d="M110 20 v50 h20" stroke="#7c3aed" strokeWidth="1" fill="none" />
          <path d="M20 110 h50 v20" stroke="#00e5ff" strokeWidth="1" fill="none" />
          <path d="M70 70 h30 v30" stroke="#7c3aed" strokeWidth="1" fill="none" />
          <circle cx="20" cy="20" r="3" fill="#00e5ff" />
          <circle cx="110" cy="70" r="3" fill="#7c3aed" />
          <circle cx="130" cy="20" r="3" fill="#00e5ff" />
          <circle cx="70" cy="130" r="3" fill="#7c3aed" />
          <circle cx="100" cy="100" r="2" fill="#00e5ff" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hero-circuit)" />
    </svg>
  );
}

export default function HeroSection({ onNavigate }) {
  const typed = useTypewriter(TYPEWRITER_PHRASES);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,400;0,500;0,700;0,800;0,900;1,800&family=DM+Sans:wght@400;500&display=swap');

        @keyframes hero-fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes logo-pulse {
          0%, 100% { box-shadow: 0 0 30px rgba(0,229,255,0.15), 0 0 60px rgba(124,58,237,0.08); }
          50%       { box-shadow: 0 0 50px rgba(0,229,255,0.28), 0 0 90px rgba(124,58,237,0.15); }
        }
        @keyframes orb-drift {
          0%, 100% { transform: translate(-50%, -55%) scale(1); }
          50%       { transform: translate(-50%, -58%) scale(1.06); }
        }
        @keyframes orb-drift-2 {
          0%, 100% { transform: translateX(0) scale(1); }
          50%       { transform: translateX(20px) scale(1.04); }
        }
        @keyframes stat-bar-in {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes caret-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }

        .hero-caret {
          display: inline-block;
          width: 3px;
          height: 0.85em;
          background: #00e5ff;
          margin-left: 3px;
          vertical-align: middle;
          border-radius: 2px;
          animation: caret-blink 1s step-end infinite;
        }

        .hero-primary-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          border-radius: 10px;
          font-size: 13px;
          font-family: 'Exo 2', sans-serif;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          border: none;
          background: linear-gradient(135deg, #00e5ff, #0891b2);
          color: #040e18;
          transition: all 0.25s ease;
          box-shadow: 0 0 28px rgba(0,229,255,0.25);
        }
        .hero-primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0,229,255,0.4);
        }
        .hero-primary-btn:active {
          transform: translateY(0);
        }

        .hero-secondary-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          border-radius: 10px;
          font-size: 13px;
          font-family: 'Exo 2', sans-serif;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          background: transparent;
          color: rgba(255,255,255,0.8);
          border: 1px solid rgba(255,255,255,0.18);
          transition: all 0.25s ease;
        }
        .hero-secondary-btn:hover {
          border-color: rgba(255,255,255,0.4);
          color: #fff;
          background: rgba(255,255,255,0.04);
          transform: translateY(-2px);
        }

        .hero-stat-item {
          position: relative;
          padding: 22px 16px;
          text-align: center;
          background: rgba(4,14,24,0.65);
          transition: background 0.25s ease;
        }
        .hero-stat-item:hover {
          background: rgba(0,229,255,0.04);
        }
        .hero-stat-item + .hero-stat-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 20%;
          height: 60%;
          width: 1px;
          background: rgba(0,229,255,0.12);
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 11px;
          font-family: 'Exo 2', sans-serif;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #00e5ff;
          border: 1px solid rgba(0,229,255,0.25);
          background: rgba(0,229,255,0.06);
          margin-bottom: 20px;
        }
        .hero-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #00e5ff;
          box-shadow: 0 0 8px rgba(0,229,255,0.8);
          animation: caret-blink 2s ease-in-out infinite;
        }

        .hero-scroll-hint {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          opacity: 0.35;
          transition: opacity 0.2s;
          cursor: default;
        }
        .hero-scroll-hint:hover { opacity: 0.6; }

        @keyframes scroll-bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(6px); }
        }
        .hero-scroll-arrow {
          animation: scroll-bounce 1.8s ease-in-out infinite;
        }
      `}</style>

      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "100px 24px 60px",
          overflow: "hidden",
        }}
      >
        {/* Circuit BG */}
        <CircuitLines />

        {/* Glow orbs */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            width: "700px",
            height: "700px",
            top: "50%",
            left: "50%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 68%)",
            pointerEvents: "none",
            animation: "orb-drift 8s ease-in-out infinite",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            width: "500px",
            height: "500px",
            top: "55%",
            left: "25%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 68%)",
            pointerEvents: "none",
            animation: "orb-drift-2 10s ease-in-out infinite",
          }}
        />

        {/* Content wrapper */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "860px",
            width: "100%",
          }}
        >
          {/* Logo */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              animation: visible ? "hero-fade-in 0.6s ease forwards" : "none",
              marginBottom: "28px",
              display: "inline-block",
              position: "relative",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: "-16px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(0,229,255,0.18) 0%, transparent 70%)",
                filter: "blur(12px)",
              }}
            />
            <img
              src={logo}
              alt="Middlewares Software Solutions"
              style={{
                position: "relative",
                width: "108px",
                height: "108px",
                borderRadius: "20px",
                objectFit: "cover",
                border: "1px solid rgba(0,229,255,0.3)",
                animation: "logo-pulse 4s ease-in-out infinite",
              }}
            />
          </div>

          {/* Badge */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              animation: visible ? "hero-fade-up 0.6s ease 0.1s forwards" : "none",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Middlewares Software Solutions
            </div>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "'Exo 2', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
              lineHeight: 1.1,
              color: "#fff",
              margin: "0 0 16px",
              opacity: visible ? 1 : 0,
              animation: visible ? "hero-fade-up 0.6s ease 0.2s forwards" : "none",
              textShadow: "0 0 60px rgba(0,229,255,0.12)",
            }}
          >
            Building Tomorrow's
          </h1>

          {/* Typewriter line */}
          <div
            style={{
              fontFamily: "'Exo 2', sans-serif",
              fontWeight: 900,
              fontStyle: "italic",
              fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
              lineHeight: 1.1,
              marginBottom: "28px",
              minHeight: "1.2em",
              opacity: visible ? 1 : 0,
              animation: visible ? "hero-fade-up 0.6s ease 0.25s forwards" : "none",
            }}
          >
            <span
              style={{
                background: "linear-gradient(135deg, #00e5ff 30%, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {typed}
            </span>
            <span className="hero-caret" />
          </div>

          {/* Subtext */}
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(1rem, 2vw, 1.15rem)",
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.5)",
              maxWidth: "600px",
              margin: "0 auto 40px",
              opacity: visible ? 1 : 0,
              animation: visible ? "hero-fade-up 0.6s ease 0.35s forwards" : "none",
            }}
          >
            We are a startup IT company that bridges the gap between your business vision
            and powerful technology — delivering software, systems, and strategy that scale.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "14px",
              justifyContent: "center",
              marginBottom: "72px",
              opacity: visible ? 1 : 0,
              animation: visible ? "hero-fade-up 0.6s ease 0.45s forwards" : "none",
            }}
          >
            <button
              className="hero-primary-btn"
              onClick={() => onNavigate("Services")}
            >
              Explore Services
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              className="hero-secondary-btn"
              onClick={() => onNavigate("Contact")}
            >
              Talk to Us
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M14 2L8 8M14 2H9M14 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Stats bar */}
          <div
            style={{
              width: "100%",
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid rgba(0,229,255,0.1)",
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              opacity: visible ? 1 : 0,
              animation: visible ? "stat-bar-in 0.7s ease 0.55s forwards" : "none",
            }}
          >
            {STATS.map((stat, i) => (
              <div key={i} className="hero-stat-item">
                <div
                  style={{
                    fontFamily: "'Exo 2', sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                    lineHeight: 1,
                    marginBottom: "6px",
                    background: "linear-gradient(135deg, #00e5ff, #7c3aed)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
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
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div
          style={{
            position: "absolute",
            bottom: "28px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1,
            opacity: visible ? 1 : 0,
            animation: visible ? "hero-fade-in 1s ease 1.2s forwards" : "none",
          }}
        >
          <div className="hero-scroll-hint">
            <span
              style={{
                fontFamily: "'Exo 2', sans-serif",
                fontSize: "9px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              Scroll
            </span>
            <svg
              className="hero-scroll-arrow"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M8 3v10M4 9l4 4 4-4"
                stroke="rgba(0,229,255,0.6)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </section>
    </>
  );
}