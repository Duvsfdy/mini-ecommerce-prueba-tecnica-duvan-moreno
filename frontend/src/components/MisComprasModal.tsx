import { useEffect } from "react";
import type { SavedCart, Product } from "../types";

type MisComprasModalProps = {
  show: boolean;
  savedCarts: SavedCart[];
  products: Product[];
  onClose: () => void;
};

export default function MisComprasModal({
  show,
  savedCarts,
  products,
  onClose,
}: MisComprasModalProps) {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">📦 Mis Compras</h2>
          <button onClick={onClose} className="modal-close">
            ✕
          </button>
        </div>

        <div className="modal-body">
          {savedCarts.length === 0 ? (
            <p className="modal-empty">No hay compras guardadas</p>
          ) : (
            <div className="saved-carts-list">
              {savedCarts.map((savedCart) => (
                <div key={savedCart.id} className="saved-cart-item">
                  <div className="saved-cart-header">
                    <span className="saved-cart-date">
                      {new Date(savedCart.created_at).toLocaleDateString(
                        "es-ES",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </span>
                    <span className="saved-cart-id">#{savedCart.id}</span>
                  </div>
                  <div className="saved-cart-items">
                    {savedCart.items.map((item, idx) => {
                      const product = products.find(
                        (p) => p.id === item.product_id
                      );
                      return (
                        <div key={idx} className="saved-item">
                          <span>
                            {product?.name || `Producto ${item.product_id}`}
                          </span>
                          <span className="saved-item-qty">
                            x{item.quantity}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="saved-cart-total">
                    Total: ${savedCart.total.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
