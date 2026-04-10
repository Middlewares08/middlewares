import { useState } from "react";
import logo from "../../public/logo.png";

const NAV_LINKS = {
  Company: [
    { label: "About Us", page: "About" },
    { label: "Portfolio", page: "Portfolio" },
    { label: "Contact", page: "Contact" },
  ],
  Services: [
    { label: "Software Development", page: "Services" },
    { label: "System Development", page: "Services" },
    { label: "IT Consultation", page: "Services" },
    { label: "Cloud & DevOps", page: "Services" },
    { label: "UI/UX Design", page: "Services" },
    { label: "IT Support", page: "Services" },
  ],
  Connect: [
    { label: "LinkedIn", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "GitHub", href: "#" },
    { label: "hello@middlewares.dev", href: "mailto:hello@middlewares.dev" },
  ],
};

const TECH_BADGES = [
  "React", "Laravel", "Node.js", "Flutter",
  "Next.js", "AWS", "Docker", "PostgreSQL",
];

export default function Footer({ onNavigate }) {
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [emailError, setEmailError] = useState("");

  const currentYear = new Date().getFullYear();

  const handleSubscribe = () => {
    if (!emailInput.trim()) {
      setEmailError("Please enter your email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)) {
      setEmailError("Enter a valid email address.");
      return;
    }
    setEmailError("");
    setSubscribed(true);
    setEmailInput("");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;500;600;700;800;900&family=DM+Sans:wght@400;500&display=swap');

        @keyframes ft-fade-in {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ft-nav-link {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.42);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          text-align: left;
          transition: color 0.2s ease, transform 0.2s ease;
          text-decoration: none;
          width: fit-content;
        }
        .ft-nav-link:hover {
          color: #00e5ff;
          transform: translateX(4px);
        }

        .ft-col-heading {
          font-family: 'Exo 2', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          margin-bottom: 18px;
        }

        .ft-subscribe-input {
          flex: 1;
          padding: 11px 14px;
          border-radius: 8px 0 0 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: #fff;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-right: none;
          outline: none;
          transition: border-color 0.2s ease;
          min-width: 0;
        }
        .ft-subscribe-input::placeholder {
          color: rgba(255,255,255,0.25);
        }
        .ft-subscribe-input:focus {
          border-color: rgba(0,229,255,0.4);
          background: rgba(0,229,255,0.03);
        }

        .ft-subscribe-btn {
          padding: 11px 18px;
          border-radius: 0 8px 8px 0;
          font-family: 'Exo 2', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          border: 1px solid transparent;
          background: linear-gradient(135deg, #00e5ff, #0891b2);
          color: #040e18;
          transition: all 0.2s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .ft-subscribe-btn:hover {
          box-shadow: 0 0 20px rgba(0,229,255,0.3);
        }

        .ft-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,229,255,0.12) 20%, rgba(0,229,255,0.12) 80%, transparent);
          margin: 0;
          border: none;
        }

        .ft-bottom-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          color: rgba(255,255,255,0.3);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .ft-bottom-link:hover {
          color: rgba(255,255,255,0.65);
        }

        .ft-social-btn {
          width: 36px;
          height: 36px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          cursor: pointer;
          color: rgba(255,255,255,0.4);
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .ft-social-btn:hover {
          background: rgba(0,229,255,0.08);
          border-color: rgba(0,229,255,0.3);
          color: #00e5ff;
          transform: translateY(-2px);
        }

        .ft-tech-badge {
          display: inline-flex;
          padding: 4px 10px;
          border-radius: 6px;
          font-family: 'Exo 2', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.35);
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          transition: all 0.2s ease;
        }
        .ft-tech-badge:hover {
          color: #00e5ff;
          border-color: rgba(0,229,255,0.25);
          background: rgba(0,229,255,0.05);
        }

        .ft-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px;
        }
        @media (max-width: 1024px) {
          .ft-grid { grid-template-columns: 1fr 1fr; gap: 36px; }
        }
        @media (max-width: 560px) {
          .ft-grid { grid-template-columns: 1fr; gap: 28px; }
          .ft-bottom-row { flex-direction: column !important; gap: 16px !important; text-align: center; }
        }
      `}</style>

      <footer
        style={{
          position: "relative",
          overflow: "hidden",
          background: "rgba(2, 9, 18, 0.95)",
        }}
      >
        {/* Top glow line */}
        <div
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.2) 30%, rgba(124,58,237,0.2) 70%, transparent)",
          }}
        />

        {/* Ambient glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "300px",
            background: "radial-gradient(ellipse, rgba(0,229,255,0.03) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* CTA Banner */}
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "60px 24px 52px",
          }}
        >
          <div
            style={{
              borderRadius: "20px",
              padding: "48px 40px",
              background: "linear-gradient(135deg, rgba(0,229,255,0.05) 0%, rgba(124,58,237,0.05) 100%)",
              border: "1px solid rgba(0,229,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "32px",
              flexWrap: "wrap",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Banner BG grid pattern */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0.04,
                backgroundImage: "linear-gradient(rgba(0,229,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,1) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
              <p
                style={{
                  fontFamily: "'Exo 2', sans-serif",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#00e5ff",
                  marginBottom: "8px",
                }}
              >
                Ready to Start?
              </p>
              <h3
                style={{
                  fontFamily: "'Exo 2', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(1.4rem, 3vw, 2rem)",
                  color: "#fff",
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                Your next project starts with
                <br />
                a single conversation.
              </h3>
            </div>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", position: "relative", zIndex: 1 }}>
              <button
                onClick={() => onNavigate("Contact")}
                style={{
                  padding: "13px 28px",
                  borderRadius: "10px",
                  fontFamily: "'Exo 2', sans-serif",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  border: "none",
                  background: "linear-gradient(135deg, #00e5ff, #0891b2)",
                  color: "#040e18",
                  boxShadow: "0 0 24px rgba(0,229,255,0.25)",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,229,255,0.38)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 0 24px rgba(0,229,255,0.25)";
                }}
              >
                Get a Free Quote
              </button>
              <button
                onClick={() => onNavigate("Services")}
                style={{
                  padding: "13px 28px",
                  borderRadius: "10px",
                  fontFamily: "'Exo 2', sans-serif",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: "rgba(255,255,255,0.75)",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.75)";
                }}
              >
                View Services
              </button>
            </div>
          </div>
        </div>

        {/* Main footer grid */}
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px 56px",
          }}
        >
          <div className="ft-grid">

            {/* ── Brand column ── */}
            <div>
              {/* Logo + name */}
              <button
                onClick={() => onNavigate("Home")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  marginBottom: "18px",
                }}
              >
                <img
                  src={logo}
                  alt="Middlewares"
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    objectFit: "cover",
                    border: "1px solid rgba(0,229,255,0.25)",
                    boxShadow: "0 0 12px rgba(0,229,255,0.1)",
                  }}
                />
                <div>
                  <div
                    style={{
                      fontFamily: "'Exo 2', sans-serif",
                      fontWeight: 800,
                      fontSize: "15px",
                      color: "#fff",
                      lineHeight: 1.1,
                    }}
                  >
                    Middlewares
                  </div>
                  <div
                    style={{
                      fontFamily: "'Exo 2', sans-serif",
                      fontWeight: 500,
                      fontSize: "9px",
                      color: "rgba(0,229,255,0.5)",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                    }}
                  >
                    Software Solutions
                  </div>
                </div>
              </button>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.38)",
                  lineHeight: 1.75,
                  marginBottom: "24px",
                  maxWidth: "280px",
                }}
              >
                A startup IT company bridging the gap between business vision and powerful
                technology. We build software, systems, and strategy that scale.
              </p>

              {/* Newsletter subscribe */}
              <p
                style={{
                  fontFamily: "'Exo 2', sans-serif",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.25)",
                  marginBottom: "10px",
                }}
              >
                Stay Updated
              </p>

              {subscribed ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "11px 14px",
                    borderRadius: "8px",
                    background: "rgba(0,229,255,0.06)",
                    border: "1px solid rgba(0,229,255,0.2)",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l4 4 6-7" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "12px",
                      color: "#00e5ff",
                    }}
                  >
                    You're subscribed!
                  </span>
                </div>
              ) : (
                <div>
                  <div style={{ display: "flex" }}>
                    <input
                      type="email"
                      className="ft-subscribe-input"
                      placeholder="your@email.com"
                      value={emailInput}
                      onChange={(e) => {
                        setEmailInput(e.target.value);
                        if (emailError) setEmailError("");
                      }}
                      onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                    />
                    <button className="ft-subscribe-btn" onClick={handleSubscribe}>
                      Subscribe
                    </button>
                  </div>
                  {emailError && (
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "11px",
                        color: "rgba(239,68,68,0.8)",
                        marginTop: "6px",
                      }}
                    >
                      {emailError}
                    </p>
                  )}
                </div>
              )}

              {/* Social icons */}
              <div style={{ display: "flex", gap: "8px", marginTop: "20px" }}>
                {[
                  {
                    label: "LinkedIn",
                    icon: (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    ),
                  },
                  {
                    label: "Facebook",
                    icon: (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ),
                  },
                  {
                    label: "GitHub",
                    icon: (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ),
                  },
                ].map((s) => (
                  <button key={s.label} className="ft-social-btn" title={s.label} aria-label={s.label}>
                    {s.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Company column ── */}
            <div>
              <p className="ft-col-heading">Company</p>
              <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {NAV_LINKS.Company.map((link) => (
                  <button
                    key={link.label}
                    className="ft-nav-link"
                    onClick={() => onNavigate(link.page)}
                  >
                    {link.label}
                  </button>
                ))}
              </nav>

              {/* Status badge */}
              <div
                style={{
                  marginTop: "28px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "7px 12px",
                  borderRadius: "999px",
                  background: "rgba(52,211,153,0.07)",
                  border: "1px solid rgba(52,211,153,0.2)",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#34d399",
                    boxShadow: "0 0 6px rgba(52,211,153,0.8)",
                    flexShrink: 0,
                    animation: "ft-fade-in 1s ease infinite alternate",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Exo 2', sans-serif",
                    fontSize: "10px",
                    fontWeight: 600,
                    color: "#34d399",
                    letterSpacing: "0.08em",
                  }}
                >
                  Accepting projects
                </span>
              </div>
            </div>

            {/* ── Services column ── */}
            <div>
              <p className="ft-col-heading">Services</p>
              <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {NAV_LINKS.Services.map((link) => (
                  <button
                    key={link.label}
                    className="ft-nav-link"
                    onClick={() => onNavigate(link.page)}
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* ── Connect column ── */}
            <div>
              <p className="ft-col-heading">Connect</p>
              <nav style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
                {NAV_LINKS.Connect.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="ft-nav-link"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              {/* Tech badges */}
              <p className="ft-col-heading">Tech Stack</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {TECH_BADGES.map((t) => (
                  <span key={t} className="ft-tech-badge">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="ft-divider" />

        {/* Bottom bar */}
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
          }}
          className="ft-bottom-row"
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              color: "rgba(255,255,255,0.22)",
              margin: 0,
            }}
          >
            © {currentYear} Middlewares Software Solutions. All rights reserved.
          </p>

          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "center" }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <button key={item} className="ft-bottom-link">
                {item}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                color: "rgba(255,255,255,0.2)",
              }}
            >
              Built in
            </span>
            <span style={{ fontSize: "12px" }}>🇵🇭</span>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                color: "rgba(255,255,255,0.2)",
              }}
            >
              Metro Manila
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}