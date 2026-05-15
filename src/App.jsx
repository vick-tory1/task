import React, { useEffect, useRef, useState } from "react";
import { fetchProducts } from "./api/products";

const currencyFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

const productDetails = {
  1: {
    label: "Workday essential",
    note: "A dependable laptop for office work, study sessions, presentations, and everyday productivity.",
  },
  2: {
    label: "Daily phone favorite",
    note: "A reliable iPhone option for calls, content sharing, photos, messaging, and staying connected all day.",
  },
  3: {
    label: "Flexible Android pick",
    note: "A smooth Android device for streaming, business chats, social apps, and everyday life on the go.",
  },
};

const aboutCards = [
  {
    title: "What we offer",
    text: "Smartphones, laptops, and practical gadgets selected for work, study, entertainment, and daily use.",
  },
  {
    title: "Why customers choose us",
    text: "Clear pricing, dependable device choices, and a storefront that helps buyers compare gadgets with less stress.",
  },
  {
    title: "Customer support",
    text: "Helpful recommendations, flexible choices, and a customer-first approach that keeps shopping simple.",
  },
];

const searchTags = [
  "Affordable picks",
  "Trusted brands",
  "Mobile-first shopping",
  "Expert support",
];
const heroHighlights = [
  "Fast quantity updates",
  "Clear totals",
  "Simple gadget checkout",
];
const footerHearts = "\u{1F49A}\u{1F49A}\u{1F49A}";

const storeContent = {
  search: {
    label: "Search TechBazaar gadgets",
    placeholder: "Search laptops, phones, or brands",
    button: "Search gadgets",
  },
  feedback: {
    loading: {
      title: "Loading the latest TechBazaar gadget picks for you...",
    },
    loadError: {
      title:
        "We could not load TechBazaar gadgets right now. Please try again.",
      action: "Retry",
    },
    unavailableItem: {
      title: "This item is not available at the moment.",
      detail:
        "Try another gadget name, search by brand, or browse the available TechBazaar collection below.",
    },
  },
  cart: {
    empty:
      "Your cart is ready when you are. Add any gadget and TechBazaar will keep the total updated for you.",
    active:
      "You currently have {count} gadget{suffix} in your cart. Adjust quantity anytime with the stepper controls.",
  },
};

function FeedbackCard({
  tone = "default",
  title,
  detail,
  actionLabel,
  onAction,
}) {
  const classes = tone === "error" ? "status-card error" : "status-card";

  return (
    <section className={classes} role={tone === "error" ? "alert" : undefined}>
      {tone === "loading" ? (
        <div className="spinner" aria-hidden="true" />
      ) : null}
      <p>{title}</p>
      {detail ? <p className="status-subcopy">{detail}</p> : null}
      {actionLabel && onAction ? (
        <button
          className="primary-button status-button"
          type="button"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      ) : null}
    </section>
  );
}

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const searchInputRef = useRef(null);

  const normalizedSearch = searchTerm.toLowerCase().trim();
  const displayedProducts = products.filter((product) =>
    product.name.toLowerCase().includes(normalizedSearch),
  );
  const totalCartItems = Object.values(cartItems).reduce(
    (total, quantity) => total + quantity,
    0,
  );
  const totalCartAmount = products.reduce((total, product) => {
    const quantity = cartItems[product.id] || 0;
    return total + quantity * product.price;
  }, 0);

  async function loadProducts() {
    setIsLoading(true);
    setError("");

    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (loadError) {
      setError(
        loadError.message || "Something went wrong while loading products.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function handleAddToCart(productId) {
    setCartItems((currentItems) => ({
      ...currentItems,
      [productId]: (currentItems[productId] || 0) + 1,
    }));
  }

  function handleDecreaseCart(productId) {
    setCartItems((currentItems) => {
      const currentQuantity = currentItems[productId] || 0;

      if (currentQuantity <= 1) {
        const nextItems = { ...currentItems };
        delete nextItems[productId];
        return nextItems;
      }

      return {
        ...currentItems,
        [productId]: currentQuantity - 1,
      };
    });
  }

  function handleClearCart() {
    setCartItems({});
  }

  function focusSearch() {
    searchInputRef.current?.focus();
    searchInputRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }

  function handleImageError(event, fallbackImage) {
    if (
      !fallbackImage ||
      event.currentTarget.dataset.fallbackApplied === "true"
    ) {
      return;
    }

    event.currentTarget.dataset.fallbackApplied = "true";
    event.currentTarget.src = fallbackImage;
  }

  const cartMessage =
    totalCartItems === 0
      ? storeContent.cart.empty
      : storeContent.cart.active
          .replace("{count}", String(totalCartItems))
          .replace("{suffix}", totalCartItems > 1 ? "s" : "");

  return (
    <div className="app-shell">
      <a className="skip-link" href="#search">
        Skip to search
      </a>

      <header className="site-header">
        <div className="page-shell site-header-inner">
          <a className="brand-block" href="#home">
            <span className="eyebrow">Your Trusted Gadget Store</span>
            <span className="brand-name">TechBazaar</span>
          </a>

          <nav className="site-nav" aria-label="Primary">
            <a href="#home">Home</a>
            <a href="#search">Search</a>
            <a href="#about">About</a>
            <a href="#products">Gadgets</a>
            <a href="#cart-summary">Cart</a>
          </nav>
        </div>
      </header>

      <main className="page-shell">
        <section
          id="home"
          className="search-section"
          aria-label="Storefront search"
        >
          <div className="search-copy">
            <p className="section-label">Smart gadget shopping</p>
            <h1>Find a dependable device in a few taps.</h1>
            <p>
              Search the TechBazaar collection for affordable phones, laptops,
              and everyday gadgets that fit work, school, business, and life on the
              go.
            </p>
            <div className="search-tags" aria-label="Store benefits">
              {searchTags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>

          <section
            id="search"
            className="toolbar"
            aria-label="Product controls"
          >
            <label className="search-field" htmlFor="product-search">
              <span>{storeContent.search.label}</span>
              <input
                ref={searchInputRef}
                id="product-search"
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder={storeContent.search.placeholder}
              />
            </label>

            <button
              className="ghost-button toolbar-button"
              type="button"
              onClick={focusSearch}
            >
              {storeContent.search.button}
            </button>
          </section>
        </section>

        <section
          id="about"
          className="about-section"
          aria-label="About TechBazaar"
        >
          <div className="about-intro">
            <p className="section-label">About TechBazaar</p>
            <h2>Your trusted place for affordable gadgets.</h2>
            <p className="about-copy">
              We provide reliable, high-quality gadgets at affordable prices,
              making technology accessible without compromising performance.
              Every product is carefully selected to ensure durability and
              value, while our focus on transparency and customer satisfaction
              guarantees a smooth and trustworthy shopping experience.
            </p>
            <p className="about-copy">
              We focus on practical devices, straightforward comparisons, and a
              simple experience that works beautifully on mobile, tablet, and
              desktop.
            </p>
          </div>

          <div className="about-grid">
            {aboutCards.map((card) => (
              <section key={card.title} className="about-card">
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </section>
            ))}
          </div>
        </section>

        <section className="section-intro" aria-label="Catalog overview">
          <div>
            <p className="section-label">TechBazaar catalog</p>
            <h2>
              Practical gadgets ready for your daily work, study, and play.
            </h2>
          </div>
          <p className="section-hint">
            Use the quantity controls to build your cart instantly.
          </p>
        </section>

        {isLoading ? (
          <div aria-live="polite">
            <FeedbackCard
              tone="loading"
              title={storeContent.feedback.loading.title}
            />
          </div>
        ) : null}

        {!isLoading && error ? (
          <FeedbackCard
            tone="error"
            title={storeContent.feedback.loadError.title}
            detail={error}
            actionLabel={storeContent.feedback.loadError.action}
            onAction={loadProducts}
          />
        ) : null}

        {!isLoading && !error ? (
          displayedProducts.length > 0 ? (
            <section
              id="products"
              className="product-grid"
              aria-label="Product list"
            >
              {displayedProducts.map((product) => (
                <article key={product.id} className="product-card">
                  <img
                    className="product-image"
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    sizes="(min-width: 1024px) 32vw, (min-width: 700px) 48vw, 100vw"
                    onError={(event) =>
                      handleImageError(event, product.fallbackImage)
                    }
                  />

                  <div className="product-content">
                    <div className="product-copy">
                      <p className="product-label">
                        {productDetails[product.id]?.label}
                      </p>
                      <h3>{product.name}</h3>
                      <p className="product-note">
                        {productDetails[product.id]?.note}
                      </p>
                      <p className="price">
                        {currencyFormatter.format(product.price)}
                      </p>
                    </div>

                    <div className="product-actions">
                      <button
                        className="primary-button add-button"
                        type="button"
                        onClick={() => handleAddToCart(product.id)}
                      >
                        Add to Cart
                      </button>

                      <div className="product-cart-row">
                        <span className="product-cart-label">Qty</span>
                        <div
                          className="quantity-stepper"
                          aria-label={`${product.name} cart controls`}
                        >
                          <button
                            className="stepper-button"
                            type="button"
                            onClick={() => handleDecreaseCart(product.id)}
                            disabled={!cartItems[product.id]}
                            aria-label={`Reduce ${product.name} quantity`}
                          >
                            -
                          </button>
                          <span className="stepper-count">
                            {cartItems[product.id] || 0}
                          </span>
                          <button
                            className="stepper-button"
                            type="button"
                            onClick={() => handleAddToCart(product.id)}
                            aria-label={`Increase ${product.name} quantity`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          ) : (
            <FeedbackCard
              tone="error"
              title={storeContent.feedback.unavailableItem.title}
              detail={
                normalizedSearch
                  ? `"${searchTerm.trim()}" is not available at the moment. ${storeContent.feedback.unavailableItem.detail}`
                  : storeContent.feedback.unavailableItem.detail
              }
            />
          )
        ) : null}

        <section
          id="cart-summary"
          className="hero-card"
          aria-label="Cart summary section"
        >
          <div className="hero-main">
            <p className="eyebrow">TechBazaar gadget collection</p>
            <h2>
              The right place to get affordable gadgets without second-guessing.
            </h2>
            <p className="hero-copy">
              TechBazaar helps customers choose dependable phones and laptops
              for work, school, business, and everyday life with a checkout flow
              that feels simple on every screen.
            </p>

            <div
              className="hero-highlights"
              aria-label="Shopping experience highlights"
            >
              {heroHighlights.map((highlight) => (
                <span key={highlight}>{highlight}</span>
              ))}
            </div>
          </div>

          <aside
            className="cart-panel"
            aria-label={`Cart count: ${totalCartItems}`}
          >
            <div className="cart-pill">
              <span>Cart</span>
              <strong>{totalCartItems}</strong>
            </div>

            <p className="cart-copy">{cartMessage}</p>

            <div className="cart-summary" aria-label="Cart summary">
              <div className="cart-summary-row">
                <span>Total items</span>
                <strong>{totalCartItems}</strong>
              </div>
              <div className="cart-summary-row">
                <span>Total amount</span>
                <strong>{currencyFormatter.format(totalCartAmount)}</strong>
              </div>
            </div>

            <button
              className="ghost-button cart-clear-button"
              type="button"
              onClick={handleClearCart}
              disabled={totalCartItems === 0}
            >
              Clear cart
            </button>
          </aside>
        </section>
      </main>

      <footer id="footer" className="site-footer">
        <div className="page-shell site-footer-inner">
          <div className="footer-intro">
            <p className="footer-title">TechBazaar</p>
            <p className="footer-copy">
              Affordable gadgets for work, school, business, and everyday life.
            </p>
          </div>

          <span className="footer-signoff">
          Copyright &copy; {footerHearts} | Adams Celestina Ekpe
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
