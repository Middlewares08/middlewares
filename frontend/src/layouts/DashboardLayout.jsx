import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { colors, fontFamily, googleFontImport } from "../theme";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Overview", end: true },
  { to: "/dashboard/projects", label: "Projects" },
  { to: "/dashboard/licenses", label: "Licenses" },
];

export default function DashboardLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("mw_token");
    navigate("/login");
  };

  return (
    <div style={{ minHeight: "100vh", background: colors.bg, color: "#fff", fontFamily }}>
      <style>{`
        ${googleFontImport}

        .mw-side-link {
          display: block;
          padding: 10px 16px;
          border-radius: 8px;
          font-size: 13px;
          letter-spacing: 0.04em;
          color: ${colors.textDim};
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .mw-side-link:hover {
          color: #fff;
          background: rgba(255,255,255,0.04);
        }
        .mw-side-link.active {
          color: ${colors.cyan};
          background: rgba(0, 229, 255, 0.08);
        }
      `}</style>

      <div style={{ display: "flex", minHeight: "100vh" }}>
        <aside
          style={{
            width: "220px",
            flexShrink: 0,
            borderRight: `1px solid ${colors.border}`,
            padding: "24px 16px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ padding: "0 8px", marginBottom: "28px" }}>
            <span style={{ fontWeight: 700, fontSize: "15px", letterSpacing: "0.04em" }}>
              Middlewares
            </span>
            <div style={{ fontSize: "10px", color: colors.cyan, letterSpacing: "0.15em", marginTop: "2px" }}>
              LICENSE CONSOLE
            </div>
          </div>

          <nav style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `mw-side-link${isActive ? " active" : ""}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            onClick={handleLogout}
            style={{
              padding: "10px 16px",
              fontSize: "12px",
              fontFamily,
              letterSpacing: "0.06em",
              borderRadius: "8px",
              cursor: "pointer",
              border: `1px solid rgba(255, 107, 107, 0.3)`,
              background: "transparent",
              color: "rgba(255, 107, 107, 0.85)",
              textAlign: "left",
            }}
          >
            LOGOUT
          </button>
        </aside>

        <main style={{ flex: 1, padding: "32px", minWidth: 0 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
