import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../../api/client";
import { colors } from "../../theme";
import StatusBadge from "../../components/dashboard/StatusBadge";

function computeStatus(license) {
  if (license.status === "revoked") return "revoked";
  if (new Date(license.expiresAt) < new Date()) return "expired";
  return "active";
}

export default function OverviewPage() {
  const [projects, setProjects] = useState([]);
  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([apiFetch("/api/projects"), apiFetch("/api/licenses")])
      .then(([projectsRes, licensesRes]) => {
        setProjects(projectsRes.projects);
        setLicenses(licensesRes.licenses);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const active = licenses.filter((l) => computeStatus(l) === "active").length;
  const expiringSoon = licenses.filter((l) => {
    const status = computeStatus(l);
    if (status !== "active") return false;
    const daysLeft = (new Date(l.expiresAt) - new Date()) / (1000 * 60 * 60 * 24);
    return daysLeft <= 30;
  }).length;
  const revoked = licenses.filter((l) => l.status === "revoked").length;

  const stats = [
    { label: "Projects", value: projects.length },
    { label: "Active Licenses", value: active },
    { label: "Expiring in 30 Days", value: expiringSoon },
    { label: "Revoked", value: revoked },
  ];

  const recent = [...licenses]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  return (
    <div>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 700, margin: 0 }}>Overview</h1>
        <p style={{ fontSize: "13px", color: colors.textDim, marginTop: "4px" }}>
          License activity across your projects
        </p>
      </div>

      {error && (
        <p style={{ fontSize: "13px", color: colors.danger, marginBottom: "16px" }}>{error}</p>
      )}

      {loading ? (
        <p style={{ fontSize: "13px", color: colors.textDim }}>Loading...</p>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "16px",
              marginBottom: "32px",
            }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                style={{
                  padding: "20px",
                  borderRadius: "12px",
                  background: colors.panel,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <p style={{ fontSize: "12px", color: colors.textDim, letterSpacing: "0.05em" }}>
                  {stat.label}
                </p>
                <p style={{ fontSize: "28px", fontWeight: 700, margin: "8px 0 0" }}>{stat.value}</p>
              </div>
            ))}
          </div>

          <div
            style={{
              borderRadius: "12px",
              background: colors.panel,
              border: `1px solid ${colors.border}`,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "16px 20px",
                borderBottom: `1px solid ${colors.border}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.04em" }}>
                Recent Licenses
              </span>
              <Link to="/dashboard/licenses" style={{ fontSize: "12px", color: colors.cyan, textDecoration: "none" }}>
                View all →
              </Link>
            </div>

            {recent.length === 0 ? (
              <p style={{ padding: "20px", fontSize: "13px", color: colors.textDim }}>
                No licenses issued yet.
              </p>
            ) : (
              recent.map((l, i) => (
                <div
                  key={l.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "16px",
                    padding: "14px 20px",
                    borderBottom: i === recent.length - 1 ? "none" : `1px solid rgba(255,255,255,0.05)`,
                    fontSize: "13px",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontFamily: "monospace", color: "rgba(255,255,255,0.85)" }}>
                      •••••-•••••-•••••-{l.licenseKeyPreview}
                    </span>
                    <span style={{ fontSize: "11px", color: colors.textDim }}>
                      {l.project?.name} · {l.licenseType} · {l.recipientEmail}
                    </span>
                  </div>
                  <StatusBadge status={computeStatus(l)} />
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
