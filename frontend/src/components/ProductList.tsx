import type { Product } from "../types";
import ProductCard from "./ProductCard";

type ProductListProps = {
  products: Product[];
  onAddToCart: (productId: number) => void;
};

export default function ProductList({
  products,
  onAddToCart,
}: ProductListProps) {
  return (
    <div>
      <h2 className="section-title">Productos</h2>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
}
