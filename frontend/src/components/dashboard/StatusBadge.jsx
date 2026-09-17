import { colors } from "../../theme";

const STYLES = {
  active: { color: colors.success, bg: "rgba(74, 222, 128, 0.12)", border: "rgba(74, 222, 128, 0.3)" },
  expired: { color: colors.warning, bg: "rgba(255, 184, 77, 0.12)", border: "rgba(255, 184, 77, 0.3)" },
  revoked: { color: colors.danger, bg: "rgba(255, 107, 107, 0.12)", border: "rgba(255, 107, 107, 0.3)" },
};

export default function StatusBadge({ status }) {
  const style = STYLES[status] || STYLES.revoked;

  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: "999px",
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: style.color,
        background: style.bg,
        border: `1px solid ${style.border}`,
      }}
    >
      {status}
    </span>
  );
}
