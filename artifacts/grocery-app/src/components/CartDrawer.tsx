
import { useCart } from "../context/CartContext";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQty, subtotal, clearCart } = useCart();

  const delivery = subtotal > 500 ? 0 : 49;
  const discount = subtotal > 1000 ? Math.round(subtotal * 0.05) : 0;
  const total = subtotal + delivery - discount;

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 1040,
            backdropFilter: "blur(4px)",
          }}
        />
      )}

      <div
        style={{
          position: "fixed",
          top: 0,
          right: open ? 0 : "-440px",
          width: "min(440px, 100vw)",
          height: "100vh",
          background: "linear-gradient(180deg, #0f0520 0%, #1a0535 100%)",
          borderLeft: "1px solid rgba(139,92,246,0.3)",
          zIndex: 1050,
          transition: "right 0.4s cubic-bezier(0.4,0,0.2,1)",
          display: "flex",
          flexDirection: "column",
          boxShadow: open ? "-20px 0 60px rgba(124,58,237,0.3)" : "none",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "1.5rem",
            borderBottom: "1px solid rgba(139,92,246,0.2)",
            background: "rgba(139,92,246,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h5 style={{ color: "#fff", margin: 0, fontWeight: 700 }}>🛒 Your Cart</h5>
            <small style={{ color: "rgba(255,255,255,0.5)" }}>{items.length} items</small>
          </div>
          <div className="d-flex gap-2">
            {items.length > 0 && (
              <button
                className="btn btn-sm"
                onClick={clearCart}
                style={{
                  background: "rgba(239,68,68,0.2)",
                  border: "1px solid rgba(239,68,68,0.4)",
                  color: "#f87171",
                  borderRadius: "8px",
                  fontSize: "0.75rem",
                }}
              >
                Clear All
              </button>
            )}
            <button
              className="btn btn-sm"
              onClick={onClose}
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff",
                borderRadius: "8px",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
          {items.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "300px",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🛒</div>
              <p style={{ fontSize: "1.1rem", margin: 0 }}>Your cart is empty</p>
              <small>Add items to get started!</small>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: "rgba(139,92,246,0.1)",
                    border: "1px solid rgba(139,92,246,0.25)",
                    borderRadius: "14px",
                    padding: "1rem",
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "12px",
                      background: "rgba(139,92,246,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.6rem",
                      flexShrink: 0,
                    }}
                  >
                    {item.emoji}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: "#fff", fontWeight: 600, fontSize: "0.9rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {item.name}
                    </div>
                    <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem" }}>{item.quantity}</div>
                    <div
                      style={{
                        background: "linear-gradient(135deg, #a78bfa, #f472b6)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontWeight: 700,
                        fontSize: "0.9rem",
                      }}
                    >
                      ₹{(item.price * item.qty).toLocaleString()}
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "8px",
                        border: "1px solid rgba(139,92,246,0.4)",
                        background: "rgba(139,92,246,0.2)",
                        color: "#c084fc",
                        cursor: "pointer",
                        fontSize: "1rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      −
                    </button>
                    <span style={{ color: "#fff", fontWeight: 700, minWidth: "20px", textAlign: "center" }}>
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "8px",
                        border: "1px solid rgba(139,92,246,0.4)",
                        background: "rgba(139,92,246,0.2)",
                        color: "#c084fc",
                        cursor: "pointer",
                        fontSize: "1rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "8px",
                        border: "1px solid rgba(239,68,68,0.4)",
                        background: "rgba(239,68,68,0.15)",
                        color: "#f87171",
                        cursor: "pointer",
                        fontSize: "0.75rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        {items.length > 0 && (
          <div
            style={{
              padding: "1.5rem",
              borderTop: "1px solid rgba(139,92,246,0.2)",
              background: "rgba(139,92,246,0.08)",
            }}
          >
            <div className="d-flex flex-column gap-2 mb-3">
              <div className="d-flex justify-content-between" style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="d-flex justify-content-between" style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>
                <span>Delivery</span>
                <span style={{ color: delivery === 0 ? "#4ade80" : undefined }}>
                  {delivery === 0 ? "FREE 🎉" : `₹${delivery}`}
                </span>
              </div>
              {discount > 0 && (
                <div className="d-flex justify-content-between" style={{ color: "#4ade80", fontSize: "0.9rem" }}>
                  <span>Discount (5%)</span>
                  <span>−₹{discount}</span>
                </div>
              )}
              <hr style={{ borderColor: "rgba(139,92,246,0.3)", margin: "0.5rem 0" }} />
              <div className="d-flex justify-content-between" style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem" }}>
                <span>Total</span>
                <span
                  style={{
                    background: "linear-gradient(135deg, #a78bfa, #f472b6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  ₹{total.toLocaleString()}
                </span>
              </div>
            </div>

            {subtotal < 500 && (
              <div
                style={{
                  background: "rgba(251,146,60,0.15)",
                  border: "1px solid rgba(251,146,60,0.3)",
                  borderRadius: "10px",
                  padding: "0.6rem 1rem",
                  marginBottom: "1rem",
                  fontSize: "0.8rem",
                  color: "#fb923c",
                }}
              >
                🚚 Add ₹{500 - subtotal} more for FREE delivery!
              </div>
            )}

            <button
              className="btn w-100"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #db2777)",
                border: "none",
                color: "#fff",
                borderRadius: "14px",
                padding: "14px",
                fontWeight: 700,
                fontSize: "1rem",
                boxShadow: "0 0 30px rgba(124,58,237,0.4)",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(124,58,237,0.6)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(124,58,237,0.4)";
              }}
            >
              Proceed to Checkout →
            </button>
          </div>
        )}
      </div>
    </>
  );
}
