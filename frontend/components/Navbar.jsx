import { useState, useEffect } from "react";
import logo from "../assets/middlware.jpg"; // Update path to your actual logo asset

const NAV_LINKS = ["Home", "Services", "About", "Portfolio", "Contact"];

export default function Navbar({ activePage, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavigate = (page) => {
    onNavigate(page);
    setMenuOpen(false);
  };

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;500;600;700;800&display=swap');

        .mw-nav-link {
          position: relative;
          padding: 6px 16px;
          font-size: 13px;
          font-family: 'Exo 2', sans-serif;
          letter-spacing: 0.08em;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.2s ease;
          color: rgba(255, 255, 255, 0.55);
        }
        .mw-nav-link:hover {
          color: rgba(255, 255, 255, 0.9);
        }
        .mw-nav-link.active {
          color: #00e5ff;
        }
        .mw-nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 16px;
          right: 16px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #00e5ff, transparent);
        }

        .mw-cta-btn {
          padding: 8px 20px;
          font-size: 12px;
          font-family: 'Exo 2', sans-serif;
          font-weight: 600;
          letter-spacing: 0.1em;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          background: linear-gradient(135deg, rgba(0,229,255,0.12), rgba(124,58,237,0.12));
          border: 1px solid rgba(0, 229, 255, 0.35);
          color: #00e5ff;
        }
        .mw-cta-btn:hover {
          background: linear-gradient(135deg, rgba(0,229,255,0.22), rgba(124,58,237,0.22));
          border-color: rgba(0, 229, 255, 0.6);
          box-shadow: 0 0 20px rgba(0, 229, 255, 0.15);
        }

        .mw-hamburger-btn {
          display: flex;
          flex-direction: column;
          gap: 5px;
          padding: 8px;
          background: none;
          border: none;
          cursor: pointer;
        }
        .mw-hamburger-line {
          display: block;
          width: 22px;
          height: 1.5px;
          background: rgba(0, 229, 255, 0.8);
          transition: all 0.3s ease;
          transform-origin: center;
        }
        .mw-hamburger-btn.open .mw-hamburger-line:nth-child(1) {
          transform: translateY(6.5px) rotate(45deg);
        }
        .mw-hamburger-btn.open .mw-hamburger-line:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .mw-hamburger-btn.open .mw-hamburger-line:nth-child(3) {
          transform: translateY(-6.5px) rotate(-45deg);
        }

        .mw-mobile-menu {
          overflow: hidden;
          transition: max-height 0.35s ease, opacity 0.3s ease;
          max-height: 0;
          opacity: 0;
        }
        .mw-mobile-menu.open {
          max-height: 400px;
          opacity: 1;
        }

        .mw-mobile-link {
          display: block;
          width: 100%;
          text-align: left;
          padding: 12px 24px;
          font-size: 13px;
          font-family: 'Exo 2', sans-serif;
          letter-spacing: 0.08em;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.2s ease, background 0.2s ease;
          color: rgba(255, 255, 255, 0.55);
          border-left: 2px solid transparent;
        }
        .mw-mobile-link:hover {
          color: rgba(255, 255, 255, 0.9);
          background: rgba(0, 229, 255, 0.03);
        }
        .mw-mobile-link.active {
          color: #00e5ff;
          border-left-color: #00e5ff;
          background: rgba(0, 229, 255, 0.05);
        }
      `}</style>

      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
          background: scrolled ? "rgba(4, 14, 24, 0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(0, 229, 255, 0.1)"
            : "1px solid transparent",
        }}
      >
        {/* Main bar */}
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 24px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* ── Logo ── */}
          <button
            onClick={() => handleNavigate("Home")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <img
              src={logo}
              alt="Middlewares Logo"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                objectFit: "cover",
                border: "1px solid rgba(0, 229, 255, 0.3)",
                boxShadow: "0 0 12px rgba(0, 229, 255, 0.1)",
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <span
                style={{
                  fontFamily: "'Exo 2', sans-serif",
                  fontWeight: 700,
                  fontSize: "15px",
                  color: "#fff",
                  letterSpacing: "0.04em",
                  lineHeight: 1.1,
                }}
              >
                Middlewares
              </span>
              <span
                style={{
                  fontFamily: "'Exo 2', sans-serif",
                  fontWeight: 500,
                  fontSize: "10px",
                  color: "rgba(0,229,255,0.6)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  lineHeight: 1,
                }}
              >
                Software Solutions
              </span>
            </div>
          </button>

          {/* ── Desktop Nav ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
            className="mw-desktop-nav"
          >
            {/* Hide on mobile via inline media query workaround using a wrapper */}
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}
              className="hidden md:flex">
              {NAV_LINKS.map((link) => (
                <button
                  key={link}
                  onClick={() => handleNavigate(link)}
                  className={`mw-nav-link${activePage === link ? " active" : ""}`}
                >
                  {link}
                </button>
              ))}
              <button
                className="mw-cta-btn"
                style={{ marginLeft: "8px" }}
                onClick={() => handleNavigate("Contact")}
              >
                GET A QUOTE
              </button>
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              className={`mw-hamburger-btn md:hidden${menuOpen ? " open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              <span className="mw-hamburger-line" />
              <span className="mw-hamburger-line" />
              <span className="mw-hamburger-line" />
            </button>
          </div>
        </div>

        {/* ── Mobile Dropdown Menu ── */}
        <div
          className={`mw-mobile-menu md:hidden${menuOpen ? " open" : ""}`}
          style={{
            background: "rgba(4, 14, 24, 0.97)",
            borderTop: "1px solid rgba(0, 229, 255, 0.08)",
          }}
        >
          <div style={{ padding: "8px 0 16px" }}>
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => handleNavigate(link)}
                className={`mw-mobile-link${activePage === link ? " active" : ""}`}
              >
                {link}
              </button>
            ))}
            <div style={{ padding: "12px 24px 4px" }}>
              <button
                className="mw-cta-btn"
                style={{ width: "100%", textAlign: "center" }}
                onClick={() => handleNavigate("Contact")}
              >
                GET A QUOTE
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}