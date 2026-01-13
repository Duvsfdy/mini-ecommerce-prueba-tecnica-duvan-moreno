import type { CartItem as CartItemType } from "../types";
import CartItem from "./CartItem";

type CartProps = {
  cart: CartItemType[];
  totalPrice: number;
  onRemove: (productId: number) => void;
  onIncrease: (productId: number) => void;
  onDecrease: (productId: number) => void;
  onDecreaseAll: () => void;
  onSaveCart: () => void;
};

export default function Cart({
  cart,
  totalPrice,
  onRemove,
  onIncrease,
  onDecrease,
  onDecreaseAll,
  onSaveCart,
}: CartProps) {
  return (
    <div className="cart-container">
      <h2 className="section-title">Carrito</h2>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>
          <p className="cart-empty-text">Tu carrito está vacío</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <CartItem
                key={item.product.id}
                item={item}
                onRemove={onRemove}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
              />
            ))}
          </div>

          <div className="cart-total-section">
            <div className="cart-total">
              <span className="total-label">Total</span>
              <span className="total-amount">${totalPrice.toFixed(2)}</span>
            </div>
            <button onClick={onSaveCart} className="btn-checkout">
              Guardar Carrito
            </button>
            <button
              onClick={onDecreaseAll}
              className="btn-quantity"
              style={{ marginTop: "10px", width: "100%" }}
            >
              − Restar 1 a todos los productos
            </button>
          </div>
        </>
      )}
    </div>
  );
}
