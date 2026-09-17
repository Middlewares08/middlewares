import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Enter both email and password.");
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Unable to sign in.");
        return;
      }

      localStorage.setItem("mw_token", data.token);
      navigate("/dashboard");
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#040e18",
        color: "#fff",
        fontFamily: "'Exo 2', sans-serif",
        padding: "24px",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;500;600;700;800&display=swap');

        .mw-login-input {
          width: 100%;
          padding: 12px 14px;
          font-size: 14px;
          font-family: 'Exo 2', sans-serif;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(0, 229, 255, 0.18);
          border-radius: 8px;
          color: #fff;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .mw-login-input:focus {
          border-color: rgba(0, 229, 255, 0.6);
        }
        .mw-login-input::placeholder {
          color: rgba(255,255,255,0.35);
        }
      `}</style>

      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "380px",
          padding: "32px",
          borderRadius: "16px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(0, 229, 255, 0.12)",
        }}
      >
        <h1 style={{ fontSize: "20px", fontWeight: 700, margin: 0, letterSpacing: "0.02em" }}>
          Sign in
        </h1>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginTop: "6px", marginBottom: "24px" }}>
          Access your dashboard
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", letterSpacing: "0.05em" }}>
              Email
            </label>
            <div style={{ marginTop: "6px" }}>
              <input
                type="email"
                className="mw-login-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", letterSpacing: "0.05em" }}>
              Password
            </label>
            <div style={{ marginTop: "6px" }}>
              <input
                type="password"
                className="mw-login-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
          </div>

          {error && (
            <p style={{ fontSize: "12px", color: "#ff6b6b", margin: 0 }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            style={{
              marginTop: "8px",
              padding: "12px",
              fontSize: "13px",
              fontFamily: "'Exo 2', sans-serif",
              fontWeight: 600,
              letterSpacing: "0.08em",
              borderRadius: "8px",
              cursor: submitting ? "default" : "pointer",
              opacity: submitting ? 0.6 : 1,
              background: "linear-gradient(135deg, rgba(0,229,255,0.22), rgba(124,58,237,0.22))",
              border: "1px solid rgba(0, 229, 255, 0.4)",
              color: "#00e5ff",
              transition: "all 0.2s ease",
            }}
          >
            {submitting ? "SIGNING IN..." : "SIGN IN"}
          </button>
        </div>
      </form>
    </div>
  );
}
