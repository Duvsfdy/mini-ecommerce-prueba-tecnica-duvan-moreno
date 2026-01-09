type HeaderProps = {
  cartItemsCount: number;
  onOpenModal: () => void;
};

export default function Header({ cartItemsCount, onOpenModal }: HeaderProps) {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-title-wrapper">
          <h1 className="header-title">Mini E-commerce</h1>
          <p className="header-subtitle">By Duvan Moreno Dev</p>
        </div>
        <div className="header-cart-info">
          <button onClick={onOpenModal} className="btn-my-orders">
            📦 Mis Compras
          </button>
          <span className="cart-icon">🛒</span>
          <span className="cart-count">{cartItemsCount} items</span>
        </div>
      </div>
    </header>
  );
}
