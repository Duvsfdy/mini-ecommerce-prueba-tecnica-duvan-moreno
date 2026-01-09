import type { Product } from "../types";

type ProductCardProps = {
  product: Product;
  onAddToCart: (productId: number) => void;
};

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="product-card">
      <div className="product-header">
        <div className="product-icon">📦</div>
        <h3 className="product-name">{product.name}</h3>
      </div>

      <div className="product-footer">
        <span className="product-price">${product.price}</span>
        <button
          onClick={() => onAddToCart(product.id)}
          className="btn-add-to-cart"
        >
          + Agregar
        </button>
      </div>
    </div>
  );
}
