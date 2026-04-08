
import { useToast } from "../context/ToastContext";

const typeColors: Record<string, { border: string; glow: string; tag: string; tagBg: string }> = {
  recipe: {
    border: "rgba(219,39,119,0.5)",
    glow: "rgba(219,39,119,0.25)",
    tag: "#f472b6",
    tagBg: "rgba(219,39,119,0.2)",
  },
  health: {
    border: "rgba(16,185,129,0.5)",
    glow: "rgba(16,185,129,0.2)",
    tag: "#34d399",
    tagBg: "rgba(16,185,129,0.15)",
  },
  product: {
    border: "rgba(124,58,237,0.5)",
    glow: "rgba(124,58,237,0.25)",
    tag: "#c084fc",
    tagBg: "rgba(124,58,237,0.2)",
  },
  bundle: {
    border: "rgba(251,146,60,0.5)",
    glow: "rgba(251,146,60,0.2)",
    tag: "#fb923c",
    tagBg: "rgba(251,146,60,0.15)",
  },
};

const typeLabels: Record<string, string> = {
  recipe: "Recipe",
  health: "Health Pack",
  product: "Product",
  bundle: "Bundle",
};

export default function CartToast() {
  const { toasts, dismissToast } = useToast();

  return (
    <div
      style={{
        position: "fixed",
        top: "90px",
        right: "20px",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        pointerEvents: "none",
      }}
    >
      {toasts.map((toast) => {
        const colors = typeColors[toast.type || "product"];
        return (
          <div
            key={toast.id}
            style={{
              background: "rgba(10,0,21,0.95)",
              border: `1px solid ${colors.border}`,
              borderRadius: "16px",
              padding: "14px 16px",
              minWidth: "300px",
              maxWidth: "360px",
              boxShadow: `0 8px 32px ${colors.glow}, 0 0 0 1px ${colors.border}`,
              backdropFilter: "blur(20px)",
              pointerEvents: "auto",
              animation: "toastSlideIn 0.4s cubic-bezier(0.4,0,0.2,1)",
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
            }}
          >
            {/* Emoji */}
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: colors.tagBg,
                border: `1px solid ${colors.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                flexShrink: 0,
              }}
            >
              {toast.emoji}
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                <span
                  style={{
                    background: colors.tagBg,
                    border: `1px solid ${colors.border}`,
                    borderRadius: "6px",
                    padding: "1px 7px",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    color: colors.tag,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {typeLabels[toast.type || "product"]}
                </span>
                <span style={{ color: "#4ade80", fontSize: "0.72rem", fontWeight: 600 }}>✓ Added to Cart</span>
              </div>

              <div
                style={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {toast.title}
              </div>

              <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.76rem", marginTop: "2px" }}>
                from{" "}
                <span style={{ color: colors.tag, fontWeight: 600 }}>
                  {toast.source}
                </span>
                {toast.itemCount && toast.itemCount > 1 && (
                  <span style={{ color: "rgba(255,255,255,0.35)" }}>
                    {" "}· {toast.itemCount} items
                  </span>
                )}
              </div>
            </div>

            {/* Dismiss */}
            <button
              onClick={() => dismissToast(toast.id)}
              style={{
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.3)",
                cursor: "pointer",
                fontSize: "0.85rem",
                padding: "2px",
                flexShrink: 0,
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
}
