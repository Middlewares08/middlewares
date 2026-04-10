import { useState } from "react";

const SERVICES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3M3 16v3a2 2 0 002 2h3m8 0h3a2 2 0 002-2v-3" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9 9h1m5 0h1M9 15h6" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Software Development",
    short: "Web, mobile & desktop apps built to scale.",
    desc: "Custom web, mobile, and desktop applications built with modern tech stacks — from MVP all the way to enterprise-scale systems that handle real-world load.",
    tags: ["Web Apps", "Mobile", "Desktop", "REST APIs"],
    accent: "#00e5ff",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="#7c3aed" strokeWidth="1.5"/>
        <path d="M8 21h8M12 17v4" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M6 7h4m-4 4h8" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "System Development",
    short: "End-to-end systems tailored to your workflow.",
    desc: "End-to-end system design and integration tailored to your workflows, infrastructure, and business logic. We build systems that teams actually enjoy using.",
    tags: ["ERP", "CRM", "Automation", "Integration"],
    accent: "#7c3aed",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#06b6d4" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "IT Consultation",
    short: "Strategic tech guidance for smarter decisions.",
    desc: "Strategic technology guidance to help startups and enterprises make smarter, faster technology decisions. We help you pick the right stack, not just any stack.",
    tags: ["Architecture", "Tech Stack", "Roadmap", "Audit"],
    accent: "#06b6d4",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="#0ea5e9" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M9 22V12h6v10" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Cloud & DevOps",
    short: "Infrastructure that deploys fast and stays up.",
    desc: "Infrastructure setup, CI/CD pipelines, containerization, and cloud deployment to keep your systems running reliably — with monitoring and alerting baked in.",
    tags: ["AWS", "Docker", "CI/CD", "Monitoring"],
    accent: "#0ea5e9",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 19l-7-7 7-7M19 12H5" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="14" y="3" width="7" height="18" rx="2" stroke="#a78bfa" strokeWidth="1.5"/>
      </svg>
    ),
    title: "UI/UX Design",
    short: "Purposeful design that users love.",
    desc: "Purposeful, pixel-perfect design that converts — wireframes to production-ready interfaces backed by real UX research and a sharp eye for visual hierarchy.",
    tags: ["Figma", "Prototyping", "Design Systems", "UX Research"],
    accent: "#a78bfa",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#34d399" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "IT Support & Maintenance",
    short: "Reliable ongoing support to keep you online.",
    desc: "Reliable ongoing support, system health monitoring, and proactive maintenance to keep your business online — with SLAs you can hold us to.",
    tags: ["24/7 Support", "Bug Fixes", "Updates", "SLA"],
    accent: "#34d399",
  },
];

function ServiceCard({ service, index, isActive, onClick }) {
  const delay = `${index * 0.07}s`;

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      style={{
        position: "relative",
        padding: "28px",
        borderRadius: "16px",
        cursor: "pointer",
        transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease, background 0.25s ease",
        background: isActive
          ? `rgba(${hexToRgb(service.accent)}, 0.06)`
          : "rgba(4, 14, 24, 0.65)",
        border: `1px solid ${isActive ? service.accent + "55" : "rgba(0,229,255,0.08)"}`,
        transform: isActive ? "translateY(-4px)" : "translateY(0)",
        boxShadow: isActive
          ? `0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px ${service.accent}22`
          : "none",
        backdropFilter: "blur(10px)",
        animationDelay: delay,
        outline: "none",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.borderColor = service.accent + "33";
          e.currentTarget.style.background = `rgba(${hexToRgb(service.accent)}, 0.03)`;
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.borderColor = "rgba(0,229,255,0.08)";
          e.currentTarget.style.background = "rgba(4,14,24,0.65)";
        }
      }}
    >
      {/* Top accent line on active */}
      {isActive && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            width: "80%",
            height: "2px",
            background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)`,
            borderRadius: "0 0 4px 4px",
          }}
        />
      )}

      {/* Icon */}
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "18px",
          background: `rgba(${hexToRgb(service.accent)}, 0.1)`,
          border: `1px solid rgba(${hexToRgb(service.accent)}, 0.2)`,
          transition: "background 0.25s ease",
        }}
      >
        {service.icon}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "'Exo 2', sans-serif",
          fontWeight: 700,
          fontSize: "16px",
          color: "#fff",
          margin: "0 0 8px",
          letterSpacing: "0.02em",
        }}
      >
        {service.title}
      </h3>

      {/* Short desc (always visible) */}
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "13px",
          color: "rgba(255,255,255,0.45)",
          margin: "0 0 14px",
          lineHeight: 1.6,
        }}
      >
        {isActive ? service.desc : service.short}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {service.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "'Exo 2', sans-serif",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              padding: "4px 10px",
              borderRadius: "6px",
              background: `rgba(${hexToRgb(service.accent)}, 0.08)`,
              color: service.accent,
              border: `1px solid rgba(${hexToRgb(service.accent)}, 0.18)`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

// Helper: hex color → "r, g, b" string for rgba()
function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

export default function ServicesSection({ onNavigate }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleCardClick = (i) => {
    setActiveIndex(activeIndex === i ? null : i);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;500;600;700;800;900&family=DM+Sans:wght@400;500&display=swap');

        @keyframes svc-fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .svc-card-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }
        @media (max-width: 1024px) {
          .svc-card-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .svc-card-grid { grid-template-columns: 1fr; }
        }

        .svc-cta-btn {
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
        .svc-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(0,229,255,0.35);
        }
      `}</style>

      <section
        style={{
          position: "relative",
          padding: "100px 24px",
          overflow: "hidden",
        }}
      >
        {/* Subtle section glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(0,229,255,0.03) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* Section header */}
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
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
              <span
                style={{
                  display: "inline-block",
                  width: "28px",
                  height: "1px",
                  background: "linear-gradient(90deg, transparent, #00e5ff)",
                }}
              />
              What We Do
              <span
                style={{
                  display: "inline-block",
                  width: "28px",
                  height: "1px",
                  background: "linear-gradient(90deg, #00e5ff, transparent)",
                }}
              />
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
              Our Services
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
              Full-spectrum IT solutions for startups, SMEs, and enterprise teams
              looking to build, scale, and optimize with confidence.
            </p>
          </div>

          {/* Cards grid */}
          <div className="svc-card-grid">
            {SERVICES.map((svc, i) => (
              <ServiceCard
                key={svc.title}
                service={svc}
                index={i}
                isActive={activeIndex === i}
                onClick={() => handleCardClick(i)}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <div
            style={{
              marginTop: "56px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              Not sure what you need? Let's figure it out together.
            </p>
            <button
              className="svc-cta-btn"
              onClick={() => onNavigate("Contact")}
            >
              Get a Free Consultation
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}