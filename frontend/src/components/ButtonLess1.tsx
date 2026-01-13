import type { CartItem } from "../types";

type ButtonLess1Props = {
  item: CartItem;
  onDecrease: (productId: number) => void;
};

export default function ButtonLess1({ item, onDecrease }: ButtonLess1Props) {
  return (
    <button
      onClick={() => onDecrease(item.product.id)}
      className="btn-quantity"
      aria-label="Disminuir cantidad"
    ></button>
  );
}
