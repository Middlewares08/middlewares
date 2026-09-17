import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../../api/client";
import { colors, fontFamily } from "../../theme";
import StatusBadge from "../../components/dashboard/StatusBadge";

const LICENSE_TYPES = ["Trial", "Standard", "Pro", "Enterprise"];

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

function defaultExpiry() {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().slice(0, 10);
}

const EMPTY_FORM = {
  projectId: "",
  licenseType: "Standard",
  expiresAt: defaultExpiry(),
  recipientEmail: "",
  recipientName: "",
  notes: "",
};

export default function LicensesPage() {
  const [licenses, setLicenses] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [issuedResult, setIssuedResult] = useState(null);
  const [filters, setFilters] = useState({ projectId: "", status: "", licenseType: "" });
  const [rowBusy, setRowBusy] = useState(null);
  const [keyCopied, setKeyCopied] = useState(false);

  const loadLicenses = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.projectId) params.set("projectId", filters.projectId);
    if (filters.status) params.set("status", filters.status);
    if (filters.licenseType) params.set("licenseType", filters.licenseType);
    const qs = params.toString();

    apiFetch(`/api/licenses${qs ? `?${qs}` : ""}`)
      .then((res) => setLicenses(res.licenses))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(loadLicenses, [filters]);

  useEffect(() => {
    apiFetch("/api/projects")
      .then((res) => setProjects(res.projects))
      .catch((err) => setError(err.message));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.projectId || !form.licenseType || !form.expiresAt || !form.recipientEmail.trim()) {
      setError("Project, license type, expiration, and recipient email are required.");
      return;
    }
    setSubmitting(true);
    setError("");
    setIssuedResult(null);
    try {
      const res = await apiFetch("/api/licenses", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          expiresAt: new Date(form.expiresAt).toISOString(),
        }),
      });
      setIssuedResult(res.license);
      setForm(EMPTY_FORM);
      loadLicenses();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyIssuedKey = () => {
    navigator.clipboard.writeText(issuedResult.licenseKey).then(() => {
      setKeyCopied(true);
      setTimeout(() => setKeyCopied(false), 1500);
    });
  };

  const handleRevoke = async (id) => {
    if (!window.confirm("Revoke this license? This cannot be undone.")) return;
    setRowBusy(id);
    setError("");
    try {
      await apiFetch(`/api/licenses/${id}/revoke`, { method: "POST" });
      loadLicenses();
    } catch (err) {
      setError(err.message);
    } finally {
      setRowBusy(null);
    }
  };

  const projectOptions = useMemo(
    () => projects.map((p) => ({ value: p.id, label: p.name })),
    [projects]
  );

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 700, margin: 0 }}>Licenses</h1>
          <p style={{ fontSize: "13px", color: colors.textDim, marginTop: "4px" }}>
            Issue and manage license keys
          </p>
        </div>
        <button
          onClick={() => {
            setFormOpen((v) => !v);
            setIssuedResult(null);
          }}
          disabled={projects.length === 0}
          title={projects.length === 0 ? "Create a project first" : ""}
          style={{
            padding: "8px 18px",
            fontSize: "12px",
            fontFamily,
            fontWeight: 600,
            letterSpacing: "0.06em",
            borderRadius: "8px",
            cursor: projects.length === 0 ? "not-allowed" : "pointer",
            opacity: projects.length === 0 ? 0.5 : 1,
            background: "linear-gradient(135deg, rgba(0,229,255,0.22), rgba(124,58,237,0.22))",
            border: `1px solid ${colors.borderStrong}`,
            color: colors.cyan,
          }}
        >
          {formOpen ? "CANCEL" : "+ ISSUE LICENSE"}
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
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "14px",
          }}
        >
          <div>
            <label style={{ fontSize: "12px", color: colors.textDim }}>Project</label>
            <div style={{ marginTop: "4px" }}>
              <select
                style={inputStyle}
                value={form.projectId}
                onChange={(e) => setForm({ ...form, projectId: e.target.value })}
              >
                <option value="">Select a project</option>
                {projectOptions.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label style={{ fontSize: "12px", color: colors.textDim }}>License Type</label>
            <div style={{ marginTop: "4px" }}>
              <select
                style={inputStyle}
                value={form.licenseType}
                onChange={(e) => setForm({ ...form, licenseType: e.target.value })}
              >
                {LICENSE_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label style={{ fontSize: "12px", color: colors.textDim }}>Expiration Date</label>
            <div style={{ marginTop: "4px" }}>
              <input
                type="date"
                style={inputStyle}
                value={form.expiresAt}
                onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: "12px", color: colors.textDim }}>Recipient Email</label>
            <div style={{ marginTop: "4px" }}>
              <input
                type="email"
                style={inputStyle}
                value={form.recipientEmail}
                onChange={(e) => setForm({ ...form, recipientEmail: e.target.value })}
                placeholder="client@example.com"
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: "12px", color: colors.textDim }}>Recipient Name (optional)</label>
            <div style={{ marginTop: "4px" }}>
              <input
                style={inputStyle}
                value={form.recipientName}
                onChange={(e) => setForm({ ...form, recipientName: e.target.value })}
              />
            </div>
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ fontSize: "12px", color: colors.textDim }}>Notes (optional)</label>
            <div style={{ marginTop: "4px" }}>
              <textarea
                style={{ ...inputStyle, resize: "vertical", minHeight: "50px" }}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <button
              type="submit"
              disabled={submitting}
              style={{
                padding: "10px 24px",
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
              {submitting ? "ISSUING..." : "ISSUE & EMAIL LICENSE"}
            </button>
          </div>
        </form>
      )}

      {issuedResult && (
        <div
          style={{
            padding: "16px 20px",
            borderRadius: "12px",
            background: "rgba(74, 222, 128, 0.06)",
            border: `1px solid rgba(74, 222, 128, 0.3)`,
            marginBottom: "24px",
            fontSize: "13px",
          }}
        >
          <p style={{ margin: 0, color: colors.success, fontWeight: 600 }}>License issued</p>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "6px" }}>
            <span style={{ fontFamily: "monospace", fontSize: "15px" }}>{issuedResult.licenseKey}</span>
            <button onClick={handleCopyIssuedKey} style={actionBtnStyle}>
              {keyCopied ? "Copied" : "Copy"}
            </button>
          </div>
          <p style={{ margin: "8px 0 0", color: colors.warning, fontSize: "12px" }}>
            This key is shown only once and is not stored — copy it now. It has already been
            emailed to the recipient below.
          </p>
          <p style={{ margin: "6px 0 0", color: colors.textDim }}>
            {issuedResult.emailSentAt
              ? `Emailed to ${issuedResult.recipientEmail}`
              : `Could not email ${issuedResult.recipientEmail}: ${issuedResult.emailSendError}`}
          </p>
        </div>
      )}

      {/* Filters */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "16px", flexWrap: "wrap" }}>
        <select
          style={{ ...inputStyle, width: "auto" }}
          value={filters.projectId}
          onChange={(e) => setFilters({ ...filters, projectId: e.target.value })}
        >
          <option value="">All projects</option>
          {projectOptions.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
        <select
          style={{ ...inputStyle, width: "auto" }}
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="expired">Expired</option>
          <option value="revoked">Revoked</option>
        </select>
        <select
          style={{ ...inputStyle, width: "auto" }}
          value={filters.licenseType}
          onChange={(e) => setFilters({ ...filters, licenseType: e.target.value })}
        >
          <option value="">All types</option>
          {LICENSE_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p style={{ fontSize: "13px", color: colors.textDim }}>Loading...</p>
      ) : licenses.length === 0 ? (
        <p style={{ fontSize: "13px", color: colors.textDim }}>No licenses match.</p>
      ) : (
        <div
          style={{
            borderRadius: "12px",
            background: colors.panel,
            border: `1px solid ${colors.border}`,
            overflow: "hidden",
            overflowX: "auto",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${colors.border}`, textAlign: "left" }}>
                {["Key", "Project", "Type", "Status", "Expires", "Recipient", "Email", "Action"].map(
                  (h) => (
                    <th
                      key={h}
                      style={{
                        padding: "10px 16px",
                        fontSize: "11px",
                        color: colors.textDim,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {licenses.map((l) => (
                <tr key={l.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td
                    style={{
                      padding: "10px 16px",
                      fontFamily: "monospace",
                      whiteSpace: "nowrap",
                      color: colors.textDim,
                    }}
                  >
                    •••••-•••••-•••••-{l.licenseKeyPreview}
                  </td>
                  <td style={{ padding: "10px 16px", whiteSpace: "nowrap" }}>{l.project?.name}</td>
                  <td style={{ padding: "10px 16px", whiteSpace: "nowrap" }}>{l.licenseType}</td>
                  <td style={{ padding: "10px 16px" }}>
                    <StatusBadge status={l.computedStatus} />
                  </td>
                  <td style={{ padding: "10px 16px", whiteSpace: "nowrap", color: colors.textDim }}>
                    {new Date(l.expiresAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: "10px 16px", whiteSpace: "nowrap" }}>{l.recipientEmail}</td>
                  <td style={{ padding: "10px 16px", whiteSpace: "nowrap" }}>
                    {l.emailSentAt ? (
                      <span style={{ color: colors.success }}>Sent</span>
                    ) : (
                      <span style={{ color: colors.danger }} title={l.emailSendError || ""}>
                        Failed
                      </span>
                    )}
                  </td>
                  <td style={{ padding: "10px 16px", whiteSpace: "nowrap" }}>
                    {l.status !== "revoked" ? (
                      <button
                        onClick={() => handleRevoke(l.id)}
                        disabled={rowBusy === l.id}
                        style={{ ...actionBtnStyle, color: colors.danger, borderColor: "rgba(255, 107, 107, 0.3)" }}
                      >
                        Revoke
                      </button>
                    ) : (
                      <span style={{ color: colors.textFaint, fontSize: "11px" }}>—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const actionBtnStyle = {
  padding: "5px 10px",
  fontSize: "11px",
  fontFamily,
  letterSpacing: "0.04em",
  borderRadius: "6px",
  cursor: "pointer",
  background: "transparent",
  border: `1px solid ${colors.border}`,
  color: colors.textDim,
};
