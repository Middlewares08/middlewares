import { useState, useEffect, useRef } from "react";

const FILTERS = ["All", "Web App", "Mobile", "System", "UI/UX"];

const PROJECTS = [
  {
    id: 1,
    title: "POS & Inventory System",
    category: "System",
    tags: ["Laravel", "MySQL", "Vue.js"],
    description:
      "A full-featured point-of-sale and inventory management system built for a retail chain — real-time stock tracking, sales reporting, and multi-branch support.",
    metrics: [
      { label: "Branches", value: "12" },
      { label: "Daily Txns", value: "500+" },
    ],
    accent: "#00e5ff",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="#00e5ff" strokeWidth="1.5" />
        <path d="M8 21h8M12 17v4" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M6 8h4m-4 4h8" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    gradient: "135deg, rgba(0,229,255,0.12) 0%, rgba(0,229,255,0.02) 100%",
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    category: "Web App",
    tags: ["Next.js", "Node.js", "Stripe", "PostgreSQL"],
    description:
      "A scalable multi-vendor e-commerce platform with product management, order tracking, payment integration, and a seller dashboard — handling thousands of SKUs.",
    metrics: [
      { label: "Vendors", value: "80+" },
      { label: "Products", value: "10k+" },
    ],
    accent: "#7c3aed",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="#7c3aed" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M3 6h18M16 10a4 4 0 01-8 0" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    gradient: "135deg, rgba(124,58,237,0.12) 0%, rgba(124,58,237,0.02) 100%",
  },
  {
    id: 3,
    title: "Patient Management App",
    category: "Web App",
    tags: ["React", "Django", "PostgreSQL"],
    description:
      "A clinic management system covering patient records, appointment scheduling, billing, and medical history — designed with HIPAA-conscious data handling.",
    metrics: [
      { label: "Patients", value: "3k+" },
      { label: "Clinics", value: "5" },
    ],
    accent: "#06b6d4",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    gradient: "135deg, rgba(6,182,212,0.12) 0%, rgba(6,182,212,0.02) 100%",
  },
  {
    id: 4,
    title: "Delivery Tracking Mobile App",
    category: "Mobile",
    tags: ["Flutter", "Firebase", "Google Maps API"],
    description:
      "A cross-platform delivery tracking app with real-time GPS, push notifications, driver assignment, and customer-facing order status — built for a logistics startup.",
    metrics: [
      { label: "Drivers", value: "200+" },
      { label: "Orders/day", value: "1k+" },
    ],
    accent: "#34d399",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="9" y="11" width="14" height="10" rx="2" stroke="#34d399" strokeWidth="1.5" />
        <path d="M12 11v10M9 15h14" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    gradient: "135deg, rgba(52,211,153,0.12) 0%, rgba(52,211,153,0.02) 100%",
  },
  {
    id: 5,
    title: "HR & Payroll System",
    category: "System",
    tags: ["Laravel", "React", "MySQL", "AWS"],
    description:
      "A comprehensive HR platform covering employee onboarding, attendance tracking, leave management, and automated payroll computation with government-compliant reports.",
    metrics: [
      { label: "Employees", value: "500+" },
      { label: "Payroll runs", value: "Monthly" },
    ],
    accent: "#f59e0b",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9" cy="7" r="4" stroke="#f59e0b" strokeWidth="1.5" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    gradient: "135deg, rgba(245,158,11,0.12) 0%, rgba(245,158,11,0.02) 100%",
  },
  {
    id: 6,
    title: "Brand Design System",
    category: "UI/UX",
    tags: ["Figma", "Design Tokens", "Storybook"],
    description:
      "A complete design system for a fintech startup — component library, motion guidelines, accessibility standards, and dev-ready Figma tokens exported for React.",
    metrics: [
      { label: "Components", value: "120+" },
      { label: "Screens", value: "60+" },
    ],
    accent: "#a78bfa",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="#a78bfa" strokeWidth="1.5" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    gradient: "135deg, rgba(167,139,250,0.12) 0%, rgba(167,139,250,0.02) 100%",
  },
];

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

function useInView(threshold = 0.1) {
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

function ProjectCard({ project, index, inView, onClick }) {
  const delay = `${0.1 + index * 0.08}s`;
  return (
    <div
      onClick={() => onClick(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick(project)}
      className="pf-card"
      style={{
        position: "relative",
        borderRadius: "16px",
        padding: "28px",
        cursor: "pointer",
        background: `linear-gradient(${project.gradient})`,
        border: `1px solid rgba(${hexToRgb(project.accent)}, 0.12)`,
        transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
        opacity: inView ? 1 : 0,
        animation: inView ? `pf-fade-up 0.6s ease ${delay} forwards` : "none",
        outline: "none",
        backdropFilter: "blur(8px)",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.borderColor = `rgba(${hexToRgb(project.accent)}, 0.4)`;
        e.currentTarget.style.boxShadow = `0 24px 48px rgba(0,0,0,0.3), 0 0 0 1px rgba(${hexToRgb(project.accent)}, 0.15)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = `rgba(${hexToRgb(project.accent)}, 0.12)`;
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Corner accent */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "80px",
          height: "80px",
          background: `radial-gradient(circle at top right, rgba(${hexToRgb(project.accent)}, 0.12), transparent 70%)`,
          borderRadius: "0 16px 0 0",
        }}
      />

      {/* Header row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "18px" }}>
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `rgba(${hexToRgb(project.accent)}, 0.1)`,
            border: `1px solid rgba(${hexToRgb(project.accent)}, 0.25)`,
            flexShrink: 0,
          }}
        >
          {project.icon}
        </div>

        <span
          style={{
            fontFamily: "'Exo 2', sans-serif",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "5px 12px",
            borderRadius: "999px",
            background: `rgba(${hexToRgb(project.accent)}, 0.1)`,
            border: `1px solid rgba(${hexToRgb(project.accent)}, 0.25)`,
            color: project.accent,
          }}
        >
          {project.category}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "'Exo 2', sans-serif",
          fontWeight: 800,
          fontSize: "17px",
          color: "#fff",
          margin: "0 0 10px",
          lineHeight: 1.2,
        }}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "13px",
          color: "rgba(255,255,255,0.48)",
          lineHeight: 1.7,
          margin: "0 0 20px",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {project.description}
      </p>

      {/* Metrics */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
        {project.metrics.map((m) => (
          <div key={m.label}>
            <div
              style={{
                fontFamily: "'Exo 2', sans-serif",
                fontWeight: 800,
                fontSize: "18px",
                color: project.accent,
                lineHeight: 1,
                marginBottom: "2px",
              }}
            >
              {m.value}
            </div>
            <div
              style={{
                fontFamily: "'Exo 2', sans-serif",
                fontSize: "9px",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              {m.label}
            </div>
          </div>
        ))}
      </div>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "'Exo 2', sans-serif",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.07em",
              padding: "4px 10px",
              borderRadius: "6px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.09)",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* View detail hint */}
      <div
        style={{
          position: "absolute",
          bottom: "18px",
          right: "20px",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          fontFamily: "'Exo 2', sans-serif",
          fontSize: "10px",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: `rgba(${hexToRgb(project.accent)}, 0.5)`,
          transition: "color 0.2s ease",
        }}
        className="pf-card-hint"
      >
        View Details
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(8px)",
        animation: "pf-modal-in 0.25s ease forwards",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "560px",
          borderRadius: "20px",
          padding: "36px",
          background: "rgba(6, 18, 32, 0.97)",
          border: `1px solid rgba(${hexToRgb(project.accent)}, 0.25)`,
          boxShadow: `0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(${hexToRgb(project.accent)}, 0.1)`,
          animation: "pf-modal-slide 0.3s ease forwards",
        }}
      >
        {/* Top accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            width: "80%",
            height: "2px",
            background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
            borderRadius: "0 0 4px 4px",
          }}
        />

        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            cursor: "pointer",
            color: "rgba(255,255,255,0.5)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            e.currentTarget.style.color = "rgba(255,255,255,0.5)";
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Icon + category */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: `rgba(${hexToRgb(project.accent)}, 0.1)`,
              border: `1px solid rgba(${hexToRgb(project.accent)}, 0.3)`,
              flexShrink: 0,
            }}
          >
            {project.icon}
          </div>
          <div>
            <span
              style={{
                fontFamily: "'Exo 2', sans-serif",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: project.accent,
                display: "block",
                marginBottom: "4px",
              }}
            >
              {project.category}
            </span>
            <h3
              style={{
                fontFamily: "'Exo 2', sans-serif",
                fontWeight: 800,
                fontSize: "20px",
                color: "#fff",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              {project.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "14px",
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.8,
            marginBottom: "24px",
          }}
        >
          {project.description}
        </p>

        {/* Metrics */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          {project.metrics.map((m) => (
            <div
              key={m.label}
              style={{
                flex: 1,
                padding: "14px 16px",
                borderRadius: "12px",
                background: `rgba(${hexToRgb(project.accent)}, 0.07)`,
                border: `1px solid rgba(${hexToRgb(project.accent)}, 0.18)`,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'Exo 2', sans-serif",
                  fontWeight: 900,
                  fontSize: "22px",
                  color: project.accent,
                  lineHeight: 1,
                  marginBottom: "4px",
                }}
              >
                {m.value}
              </div>
              <div
                style={{
                  fontFamily: "'Exo 2', sans-serif",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div style={{ marginBottom: "8px" }}>
          <div
            style={{
              fontFamily: "'Exo 2', sans-serif",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
              marginBottom: "10px",
            }}
          >
            Tech Stack
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "'Exo 2', sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  padding: "5px 12px",
                  borderRadius: "7px",
                  background: `rgba(${hexToRgb(project.accent)}, 0.08)`,
                  border: `1px solid rgba(${hexToRgb(project.accent)}, 0.2)`,
                  color: project.accent,
                  letterSpacing: "0.05em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioSection({ onNavigate }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [sectionRef, inView] = useInView();

  const filtered = activeFilter === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;500;600;700;800;900&family=DM+Sans:wght@400;500&display=swap');

        @keyframes pf-fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pf-modal-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes pf-modal-slide {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .pf-filter-btn {
          padding: 8px 18px;
          border-radius: 8px;
          font-size: 11px;
          font-family: 'Exo 2', sans-serif;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s ease;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.45);
        }
        .pf-filter-btn:hover {
          border-color: rgba(0,229,255,0.3);
          color: rgba(255,255,255,0.8);
          background: rgba(0,229,255,0.04);
        }
        .pf-filter-btn.active {
          background: rgba(0,229,255,0.1);
          border-color: rgba(0,229,255,0.4);
          color: #00e5ff;
        }

        .pf-card-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }
        @media (max-width: 1024px) {
          .pf-card-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .pf-card-grid { grid-template-columns: 1fr; }
          .pf-filters { flex-wrap: wrap !important; }
        }

        .pf-cta-btn {
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
        .pf-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(0,229,255,0.35);
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
              "radial-gradient(ellipse 70% 40% at 80% 50%, rgba(124,58,237,0.04) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* Header */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "48px",
              opacity: inView ? 1 : 0,
              animation: inView ? "pf-fade-up 0.6s ease 0s forwards" : "none",
            }}
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
              Our Work
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
              Portfolio
            </h2>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "15px",
                color: "rgba(255,255,255,0.45)",
                maxWidth: "500px",
                margin: "0 auto",
                lineHeight: 1.75,
              }}
            >
              A selection of projects we've built — from startup MVPs to
              production systems serving thousands of users daily.
            </p>
          </div>

          {/* Filter pills */}
          <div
            className="pf-filters"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              marginBottom: "40px",
              opacity: inView ? 1 : 0,
              animation: inView ? "pf-fade-up 0.6s ease 0.1s forwards" : "none",
            }}
          >
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`pf-filter-btn${activeFilter === f ? " active" : ""}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="pf-card-grid">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                inView={inView}
                onClick={setSelectedProject}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <div
            style={{
              marginTop: "60px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              opacity: inView ? 1 : 0,
              animation: inView ? "pf-fade-up 0.6s ease 0.5s forwards" : "none",
            }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              Have a project in mind? Let's make it happen.
            </p>
            <button className="pf-cta-btn" onClick={() => onNavigate("Contact")}>
              Start a Project
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </section>
    </>
  );
}