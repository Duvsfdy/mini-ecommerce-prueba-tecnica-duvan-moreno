import type { CartItem as CartItemType } from "../types";
import ButtonLess1 from "./ButtonLess1";

type CartItemProps = {
  item: CartItemType;
  onRemove: (productId: number) => void;
  onIncrease: (productId: number) => void;
  onDecrease: (productId: number) => void;
};

export default function CartItem({
  item,
  onRemove,
  onIncrease,
  onDecrease,
}: CartItemProps) {
  return (
    <div className="cart-item">
      <div className="cart-item-header">
        <h4 className="cart-item-name">{item.product.name}</h4>
        <button
          onClick={() => onRemove(item.product.id)}
          className="btn-remove"
        >
          ✕
        </button>
      </div>

      <div className="cart-item-controls">
        <div className="quantity-controls">
          <ButtonLess1 item={item} onDecrease={onDecrease} />
          <span className="quantity-display">{item.quantity}</span>
          <button
            onClick={() => onIncrease(item.product.id)}
            className="btn-quantity"
          >
            +
          </button>
        </div>
        <span className="item-subtotal">
          ${(item.product.price * item.quantity).toFixed(2)}
        </span>
      </div>
    </div>
  );
}
