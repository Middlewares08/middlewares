import { useEffect, useState } from "react";
import { apiFetch } from "../../api/client";
import { colors, fontFamily } from "../../theme";

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  fontSize: "13px",
  fontFamily,
  background: "rgba(255,255,255,0.04)",
  border: `1px solid ${colors.border}`,
  borderRadius: "8px",
  color: "#fff",
  outline: "none",
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", website: "" });
  const [submitting, setSubmitting] = useState(false);

  const loadProjects = () => {
    setLoading(true);
    apiFetch("/api/projects")
      .then((res) => setProjects(res.projects))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(loadProjects, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Project name is required.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await apiFetch("/api/projects", { method: "POST", body: JSON.stringify(form) });
      setForm({ name: "", description: "", website: "" });
      setFormOpen(false);
      loadProjects();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "28px",
        }}
      >
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 700, margin: 0 }}>Projects</h1>
          <p style={{ fontSize: "13px", color: colors.textDim, marginTop: "4px" }}>
            Products you issue licenses for
          </p>
        </div>
        <button
          onClick={() => setFormOpen((v) => !v)}
          style={{
            padding: "8px 18px",
            fontSize: "12px",
            fontFamily,
            fontWeight: 600,
            letterSpacing: "0.06em",
            borderRadius: "8px",
            cursor: "pointer",
            background: "linear-gradient(135deg, rgba(0,229,255,0.22), rgba(124,58,237,0.22))",
            border: `1px solid ${colors.borderStrong}`,
            color: colors.cyan,
          }}
        >
          {formOpen ? "CANCEL" : "+ NEW PROJECT"}
        </button>
      </div>

      {error && <p style={{ fontSize: "13px", color: colors.danger, marginBottom: "16px" }}>{error}</p>}

      {formOpen && (
        <form
          onSubmit={handleSubmit}
          style={{
            padding: "20px",
            borderRadius: "12px",
            background: colors.panel,
            border: `1px solid ${colors.border}`,
            marginBottom: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            maxWidth: "480px",
          }}
        >
          <div>
            <label style={{ fontSize: "12px", color: colors.textDim }}>Name</label>
            <div style={{ marginTop: "4px" }}>
              <input
                style={inputStyle}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Acme HRIS"
              />
            </div>
          </div>
          <div>
            <label style={{ fontSize: "12px", color: colors.textDim }}>Description</label>
            <div style={{ marginTop: "4px" }}>
              <textarea
                style={{ ...inputStyle, resize: "vertical", minHeight: "60px" }}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="What this project is"
              />
            </div>
          </div>
          <div>
            <label style={{ fontSize: "12px", color: colors.textDim }}>Website (optional)</label>
            <div style={{ marginTop: "4px" }}>
              <input
                style={inputStyle}
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                placeholder="https://..."
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting}
            style={{
              marginTop: "4px",
              padding: "10px",
              fontSize: "13px",
              fontFamily,
              fontWeight: 600,
              letterSpacing: "0.06em",
              borderRadius: "8px",
              cursor: submitting ? "default" : "pointer",
              opacity: submitting ? 0.6 : 1,
              background: "linear-gradient(135deg, rgba(0,229,255,0.22), rgba(124,58,237,0.22))",
              border: `1px solid ${colors.borderStrong}`,
              color: colors.cyan,
            }}
          >
            {submitting ? "CREATING..." : "CREATE PROJECT"}
          </button>
        </form>
      )}

      {loading ? (
        <p style={{ fontSize: "13px", color: colors.textDim }}>Loading...</p>
      ) : projects.length === 0 ? (
        <p style={{ fontSize: "13px", color: colors.textDim }}>No projects yet. Create one to get started.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "16px",
          }}
        >
          {projects.map((p) => (
            <div
              key={p.id}
              style={{
                padding: "18px",
                borderRadius: "12px",
                background: colors.panel,
                border: `1px solid ${colors.border}`,
              }}
            >
              <p style={{ fontSize: "15px", fontWeight: 700, margin: 0 }}>{p.name}</p>
              {p.description && (
                <p style={{ fontSize: "12px", color: colors.textDim, marginTop: "6px" }}>{p.description}</p>
              )}
              {p.website && (
                <a
                  href={p.website}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: "12px", color: colors.cyan, marginTop: "8px", display: "inline-block" }}
                >
                  {p.website}
                </a>
              )}
              <p style={{ fontSize: "11px", color: colors.textFaint, marginTop: "10px" }}>
                {p.licenses?.length || 0} license{p.licenses?.length === 1 ? "" : "s"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
