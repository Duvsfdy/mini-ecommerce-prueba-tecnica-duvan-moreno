import { useEffect, useState } from "react";
import "./App.css";
import type { Product, CartItem, SavedCart } from "./types";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import MisComprasModal from "./components/MisComprasModal";
import Toast from "./components/Toast";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [notification, setNotification] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [savedCarts, setSavedCarts] = useState<SavedCart[]>([]);

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  const addToCart = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const existingItem = cart.find((item) => item.product.id === productId);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }

    setNotification("Producto agregado al carrito");
    setTimeout(() => setNotification(null), 3000);
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter((item) => item.product.id !== productId));
  };

  const increaseQuantity = (productId: number) => {
    setCart(
      cart.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId: number) => {
    const item = cart.find((item) => item.product.id === productId);

    if (item && item.quantity === 1) {
      // Si la cantidad es 1, eliminar el producto del carrito
      removeFromCart(productId);
    } else {
      // Si la cantidad es mayor a 1, disminuir en 1
      setCart(
        cart.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  const decreaseAllProducts = () => {
    // Reducir todos los productos en 1, eliminando los que tengan cantidad 1
    setCart((prevCart) =>
      prevCart
        .map((item) => ({
          ...item,
          quantity: item.quantity - 1,
        }))
        .filter((item) => item.quantity > 0)
    );
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const fetchSavedCarts = () => {
    fetch("http://127.0.0.1:8000/carts")
      .then((res) => res.json())
      .then((data) => setSavedCarts(data))
      .catch((error) => console.error(error));
  };

  const openModal = () => {
    setShowModal(true);
    fetchSavedCarts();
  };

  const saveCart = () => {
    if (cart.length === 0) {
      setNotification("El carrito está vacío");
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    // Datos para el backend (preparación)
    const cartData = {
      items: cart.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
      })),
    };

    fetch("http://127.0.0.1:8000/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartData),
    })
      .then((res) => res.json())
      .then((data) => {
        setNotification(data.message);
        setTimeout(() => setNotification(null), 3000);

        // Limpiar carrito y localStorage después de guardar exitosamente
        setCart([]);
        localStorage.removeItem("cart");
      })
      .catch((error) => {
        console.error(error);
        setNotification("Error al guardar el carrito");
        setTimeout(() => setNotification(null), 3000);
      });
  };

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app-container">
      {notification && <Toast message={notification} />}

      <Header cartItemsCount={cartItemsCount} onOpenModal={openModal} />

      <div className="main-content">
        <div className="content-grid">
          <ProductList products={products} onAddToCart={addToCart} />

          <Cart
            cart={cart}
            totalPrice={totalPrice}
            onRemove={removeFromCart}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
            onDecreaseAll={decreaseAllProducts}
            onSaveCart={saveCart}
          />
        </div>
      </div>

      <MisComprasModal
        show={showModal}
        savedCarts={savedCarts}
        products={products}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}

export default App;
