import { useState, useEffect, useRef } from "react";

const SERVICES = [
  "Software Development",
  "System Development",
  "IT Consultation",
  "Cloud & DevOps",
  "UI/UX Design",
  "IT Support & Maintenance",
  "Other",
];

const BUDGETS = [
  "< ₱50,000",
  "₱50,000 – ₱150,000",
  "₱150,000 – ₱500,000",
  "₱500,000+",
  "Let's Discuss",
];

const CONTACT_DETAILS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 6l-10 7L2 6" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Email Us",
    value: "hello@middlewares.dev",
    sub: "We reply within 24 hours",
    accent: "#00e5ff",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 12a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1.19h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 9.41a16 16 0 006.5 6.5l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Call Us",
    value: "+63 912 345 6789",
    sub: "Mon–Fri, 9AM–6PM PHT",
    accent: "#7c3aed",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="10" r="3" stroke="#06b6d4" strokeWidth="1.5"/>
      </svg>
    ),
    label: "Find Us",
    value: "Metro Manila, Philippines",
    sub: "Remote-first, anywhere ready",
    accent: "#06b6d4",
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

const INITIAL_FORM = {
  name: "",
  email: "",
  company: "",
  service: "",
  budget: "",
  message: "",
};

const INITIAL_ERRORS = {
  name: "",
  email: "",
  message: "",
};

function validate(form) {
  const errors = { ...INITIAL_ERRORS };
  if (!form.name.trim()) errors.name = "Name is required.";
  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!form.message.trim()) errors.message = "Message is required.";
  return errors;
}

export default function ContactUsSection() {
  const [sectionRef, inView] = useInView();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const newErrors = validate({ ...form, [field]: value });
      setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validate(form);
    setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
  };

  const handleSubmit = () => {
    const allTouched = { name: true, email: true, message: true };
    setTouched(allTouched);
    const newErrors = validate(form);
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((e) => e);
    if (hasErrors) return;

    setStatus("sending");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setForm(INITIAL_FORM);
      setTouched({});
    }, 1800);
  };

  const inputStyle = (field) => ({
    width: "100%",
    padding: "12px 16px",
    borderRadius: "10px",
    fontSize: "14px",
    fontFamily: "'DM Sans', sans-serif",
    color: "#fff",
    background: "rgba(255,255,255,0.04)",
    border: `1px solid ${
      errors[field] && touched[field]
        ? "rgba(239,68,68,0.5)"
        : focusedField === field
        ? "rgba(0,229,255,0.45)"
        : "rgba(255,255,255,0.09)"
    }`,
    outline: "none",
    transition: "border-color 0.2s ease, background 0.2s ease",
    boxSizing: "border-box",
    appearance: "none",
    WebkitAppearance: "none",
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;500;600;700;800;900&family=DM+Sans:wght@400;500&display=swap');

        @keyframes ct-fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ct-fade-left {
          from { opacity: 0; transform: translateX(-28px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes ct-fade-right {
          from { opacity: 0; transform: translateX(28px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes ct-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes ct-success-pop {
          0%   { opacity: 0; transform: scale(0.85) translateY(16px); }
          60%  { transform: scale(1.03) translateY(-2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes ct-checkmark {
          from { stroke-dashoffset: 50; }
          to   { stroke-dashoffset: 0; }
        }

        .ct-label {
          display: block;
          font-family: 'Exo 2', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 8px;
        }
        .ct-error-msg {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          color: rgba(239,68,68,0.85);
          margin-top: 5px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .ct-field-group {
          display: flex;
          flex-direction: column;
        }

        .ct-select {
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 40px !important;
        }
        .ct-select option {
          background: #060f1c;
          color: #fff;
        }

        .ct-submit-btn {
          width: 100%;
          padding: 15px;
          border-radius: 10px;
          font-family: 'Exo 2', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.25s ease;
          background: linear-gradient(135deg, #00e5ff, #0891b2);
          color: #040e18;
          box-shadow: 0 0 28px rgba(0,229,255,0.2);
        }
        .ct-submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0,229,255,0.38);
        }
        .ct-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .ct-contact-card {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 20px 22px;
          border-radius: 14px;
          background: rgba(4,14,24,0.6);
          border: 1px solid rgba(0,229,255,0.07);
          transition: all 0.25s ease;
        }
        .ct-contact-card:hover {
          border-color: rgba(0,229,255,0.2);
          background: rgba(0,229,255,0.03);
          transform: translateX(4px);
        }

        .ct-layout {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 52px;
          align-items: start;
        }
        @media (max-width: 1024px) {
          .ct-layout { grid-template-columns: 1fr; gap: 40px; }
        }
        .ct-form-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 560px) {
          .ct-form-grid-2 { grid-template-columns: 1fr; }
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
              "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,229,255,0.04) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* Header */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "64px",
              opacity: inView ? 1 : 0,
              animation: inView ? "ct-fade-up 0.6s ease 0s forwards" : "none",
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
              Get In Touch
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
              Let's Build Something
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #00e5ff, #7c3aed)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Great Together
              </span>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "15px",
                color: "rgba(255,255,255,0.45)",
                maxWidth: "480px",
                margin: "0 auto",
                lineHeight: 1.75,
              }}
            >
              Tell us about your project and we'll get back to you
              within 24 hours with a plan of action.
            </p>
          </div>

          {/* Two-column layout */}
          <div className="ct-layout">

            {/* ── Left: Contact info ── */}
            <div
              style={{
                opacity: inView ? 1 : 0,
                animation: inView ? "ct-fade-left 0.65s ease 0.15s forwards" : "none",
              }}
            >
              <div style={{ marginBottom: "32px" }}>
                <h3
                  style={{
                    fontFamily: "'Exo 2', sans-serif",
                    fontWeight: 800,
                    fontSize: "18px",
                    color: "#fff",
                    margin: "0 0 8px",
                  }}
                >
                  Contact Information
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.4)",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  Reach us through any channel below or fill out the form and we'll be in touch.
                </p>
              </div>

              {/* Contact cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "40px" }}>
                {CONTACT_DETAILS.map((c) => (
                  <div key={c.label} className="ct-contact-card">
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: `rgba(${hexToRgb(c.accent)}, 0.1)`,
                        border: `1px solid rgba(${hexToRgb(c.accent)}, 0.22)`,
                        flexShrink: 0,
                      }}
                    >
                      {c.icon}
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "'Exo 2', sans-serif",
                          fontSize: "10px",
                          fontWeight: 700,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: c.accent,
                          marginBottom: "3px",
                        }}
                      >
                        {c.label}
                      </div>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#fff",
                          marginBottom: "2px",
                        }}
                      >
                        {c.value}
                      </div>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "12px",
                          color: "rgba(255,255,255,0.35)",
                        }}
                      >
                        {c.sub}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div>
                <div
                  style={{
                    fontFamily: "'Exo 2', sans-serif",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)",
                    marginBottom: "12px",
                  }}
                >
                  Follow Us
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  {[
                    {
                      label: "LinkedIn",
                      icon: (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5"/>
                        </svg>
                      ),
                    },
                    {
                      label: "Facebook",
                      icon: (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ),
                    },
                    {
                      label: "GitHub",
                      icon: (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ),
                    },
                  ].map((s) => (
                    <button
                      key={s.label}
                      title={s.label}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.09)",
                        color: "rgba(255,255,255,0.45)",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(0,229,255,0.08)";
                        e.currentTarget.style.borderColor = "rgba(0,229,255,0.3)";
                        e.currentTarget.style.color = "#00e5ff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
                        e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                      }}
                    >
                      {s.icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right: Form ── */}
            <div
              style={{
                opacity: inView ? 1 : 0,
                animation: inView ? "ct-fade-right 0.65s ease 0.2s forwards" : "none",
              }}
            >
              {status === "success" ? (
                /* Success state */
                <div
                  style={{
                    padding: "56px 32px",
                    borderRadius: "20px",
                    background: "rgba(4,14,24,0.7)",
                    border: "1px solid rgba(0,229,255,0.15)",
                    textAlign: "center",
                    animation: "ct-success-pop 0.5s ease forwards",
                  }}
                >
                  <div
                    style={{
                      width: "72px",
                      height: "72px",
                      borderRadius: "50%",
                      background: "rgba(0,229,255,0.08)",
                      border: "1px solid rgba(0,229,255,0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 24px",
                    }}
                  >
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <path
                        d="M6 16l8 8L26 8"
                        stroke="#00e5ff"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="50"
                        strokeDashoffset="0"
                        style={{ animation: "ct-checkmark 0.5s ease 0.2s forwards" }}
                      />
                    </svg>
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Exo 2', sans-serif",
                      fontWeight: 800,
                      fontSize: "22px",
                      color: "#fff",
                      margin: "0 0 10px",
                    }}
                  >
                    Message Sent!
                  </h3>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.5)",
                      lineHeight: 1.7,
                      margin: "0 0 28px",
                    }}
                  >
                    Thanks for reaching out. Our team will review your message and
                    get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    style={{
                      padding: "10px 24px",
                      borderRadius: "8px",
                      fontFamily: "'Exo 2', sans-serif",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      background: "transparent",
                      border: "1px solid rgba(0,229,255,0.25)",
                      color: "#00e5ff",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(0,229,255,0.08)";
                      e.currentTarget.style.borderColor = "rgba(0,229,255,0.45)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = "rgba(0,229,255,0.25)";
                    }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                /* Form */
                <div
                  style={{
                    padding: "36px",
                    borderRadius: "20px",
                    background: "rgba(4,14,24,0.7)",
                    border: "1px solid rgba(0,229,255,0.1)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  {/* Row 1: Name + Email */}
                  <div className="ct-form-grid-2" style={{ marginBottom: "18px" }}>
                    <div className="ct-field-group">
                      <label className="ct-label" htmlFor="ct-name">Full Name *</label>
                      <input
                        id="ct-name"
                        type="text"
                        placeholder="Juan dela Cruz"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => { setFocusedField(null); handleBlur("name"); }}
                        style={inputStyle("name")}
                      />
                      {errors.name && touched.name && (
                        <span className="ct-error-msg">
                          <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="7" stroke="rgba(239,68,68,0.8)" strokeWidth="1.5"/>
                            <path d="M8 5v4M8 11v.5" stroke="rgba(239,68,68,0.8)" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                          {errors.name}
                        </span>
                      )}
                    </div>
                    <div className="ct-field-group">
                      <label className="ct-label" htmlFor="ct-email">Email Address *</label>
                      <input
                        id="ct-email"
                        type="email"
                        placeholder="juan@company.com"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => { setFocusedField(null); handleBlur("email"); }}
                        style={inputStyle("email")}
                      />
                      {errors.email && touched.email && (
                        <span className="ct-error-msg">
                          <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="7" stroke="rgba(239,68,68,0.8)" strokeWidth="1.5"/>
                            <path d="M8 5v4M8 11v.5" stroke="rgba(239,68,68,0.8)" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Company */}
                  <div className="ct-field-group" style={{ marginBottom: "18px" }}>
                    <label className="ct-label" htmlFor="ct-company">Company / Organization</label>
                    <input
                      id="ct-company"
                      type="text"
                      placeholder="Your company name (optional)"
                      value={form.company}
                      onChange={(e) => handleChange("company", e.target.value)}
                      onFocus={() => setFocusedField("company")}
                      onBlur={() => setFocusedField(null)}
                      style={inputStyle("company")}
                    />
                  </div>

                  {/* Row 3: Service + Budget */}
                  <div className="ct-form-grid-2" style={{ marginBottom: "18px" }}>
                    <div className="ct-field-group">
                      <label className="ct-label" htmlFor="ct-service">Service Needed</label>
                      <select
                        id="ct-service"
                        className="ct-select"
                        value={form.service}
                        onChange={(e) => handleChange("service", e.target.value)}
                        onFocus={() => setFocusedField("service")}
                        onBlur={() => setFocusedField(null)}
                        style={{
                          ...inputStyle("service"),
                          color: form.service ? "#fff" : "rgba(255,255,255,0.3)",
                        }}
                      >
                        <option value="" disabled>Select a service…</option>
                        {SERVICES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div className="ct-field-group">
                      <label className="ct-label" htmlFor="ct-budget">Budget Range</label>
                      <select
                        id="ct-budget"
                        className="ct-select"
                        value={form.budget}
                        onChange={(e) => handleChange("budget", e.target.value)}
                        onFocus={() => setFocusedField("budget")}
                        onBlur={() => setFocusedField(null)}
                        style={{
                          ...inputStyle("budget"),
                          color: form.budget ? "#fff" : "rgba(255,255,255,0.3)",
                        }}
                      >
                        <option value="" disabled>Select budget…</option>
                        {BUDGETS.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Message */}
                  <div className="ct-field-group" style={{ marginBottom: "26px" }}>
                    <label className="ct-label" htmlFor="ct-message">
                      Message *
                      <span style={{ color: "rgba(255,255,255,0.2)", marginLeft: "8px", fontWeight: 400, letterSpacing: "0.05em", textTransform: "none", fontSize: "10px" }}>
                        {form.message.length}/500
                      </span>
                    </label>
                    <textarea
                      id="ct-message"
                      placeholder="Tell us about your project — goals, timeline, technical requirements, or anything that helps us understand what you need…"
                      rows={5}
                      maxLength={500}
                      value={form.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => { setFocusedField(null); handleBlur("message"); }}
                      style={{
                        ...inputStyle("message"),
                        resize: "vertical",
                        minHeight: "120px",
                      }}
                    />
                    {errors.message && touched.message && (
                      <span className="ct-error-msg">
                        <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="7" stroke="rgba(239,68,68,0.8)" strokeWidth="1.5"/>
                          <path d="M8 5v4M8 11v.5" stroke="rgba(239,68,68,0.8)" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    className="ct-submit-btn"
                    onClick={handleSubmit}
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? (
                      <>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          style={{ animation: "ct-spin 0.8s linear infinite" }}
                        >
                          <circle cx="12" cy="12" r="10" stroke="rgba(4,14,24,0.3)" strokeWidth="2.5"/>
                          <path d="M12 2a10 10 0 0110 10" stroke="#040e18" strokeWidth="2.5" strokeLinecap="round"/>
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                          <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </>
                    )}
                  </button>

                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "11px",
                      color: "rgba(255,255,255,0.25)",
                      textAlign: "center",
                      marginTop: "14px",
                    }}
                  >
                    By submitting, you agree to our Privacy Policy. We never share your data.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}