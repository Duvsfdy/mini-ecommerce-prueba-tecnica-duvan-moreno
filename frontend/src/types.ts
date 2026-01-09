export type Product = {
  id: number;
  name: string;
  price: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type SavedCart = {
  id: number;
  items: { product_id: number; quantity: number }[];
  total: number;
  created_at: string;
};
