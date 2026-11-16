import { useMemo, useState } from "react";
import { productCategories, products, reviews } from "../data/products";
import PhotoDialog from "../components/PhotoDialog";
import Preloader from "../components/Preloader";
import ProductCard from "../components/ProductCard";
import images from "../assets/images";
import { Link } from "react-router-dom";

const marqueeTreats = [
  "Birthday cakes",
  "Wedding cakes",
  "Cupcakes",
  "Small chops",
  "Zobo",
  "Parfait",
  "Pastries",
  "Food trays",
  "Desserts"
];

const orderingSteps = [
  {
    title: "Pick your treat",
    description: "Browse cakes, pastries, snacks, drinks and desserts, then tap the one you like."
  },
  {
    title: "Send an enquiry",
    description: "Tell us the date, quantity and any design ideas. It opens straight in WhatsApp."
  },
  {
    title: "We confirm the details",
    description: "We discuss availability, options and price with you before anything is final."
  }
];

function ProductMenu() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase().slice(0, 60);
    return products.filter(product => {
      const matchesCategory = category === "All" || product.category === category;
      const searchableText = `${product.name} ${product.description} ${product.search}`.toLowerCase();
      return matchesCategory && searchableText.includes(query);
    });
  }, [category, search]);

  return (
    <section id="menu" className="sec">
      <div className="wrap">
        <p className="page-kicker reveal">SOMETHING FOR EVERY SWEET TOOTH</p>
        <h2 className="reveal">A little more to love.</h2>
        <p className="catalog-intro reveal">
          Cakes, pastries, snacks, drinks, desserts, food trays and thoughtful gifts.
          Some photos are illustrative; ask us about options, availability and current prices.
        </p>
        <div className="tools reveal">
          <div id="tabs" role="group" aria-label="Filter treats">
            {["All", ...productCategories].map(item => (
              <button
                type="button"
                className={category === item ? "on" : ""}
                aria-pressed={category === item}
                key={item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <input
            id="search"
            type="search"
            placeholder="Search treats"
            aria-label="Search treats"
            value={search}
            onChange={event => setSearch(event.target.value)}
          />
        </div>
        <p className="sr-only" role="status" aria-live="polite">
          {visibleProducts.length} {visibleProducts.length === 1 ? "treat" : "treats"} shown
        </p>
        <div id="grid">
          {visibleProducts.map(product => (
            <ProductCard
              key={product.name}
              product={product}
              onPreview={setSelectedProduct}
            />
          ))}
          {visibleProducts.length === 0 && (
            <p className="empty">
              No treats match your search. Try another word or ask us about a custom order.
            </p>
          )}
        </div>
      </div>
      <PhotoDialog
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="sec review-section">
      <div className="wrap review-layout">
        <div className="review-intro reveal">
          <p className="review-eyebrow">KIND WORDS FROM OUR CUSTOMERS</p>
          <h2>Made with care.<br /><span>Loved and shared.</span></h2>
          <p>A few words from customers who have celebrated with Vany Cake and More.</p>
          <span className="review-stamp" aria-hidden="true">MADE<br />WITH<br />LOVE</span>
        </div>
        <div className="review-grid">
          {reviews.map(review => (
            <figure className="review-card reveal" key={review.name}>
              <div className="review-card-top">
                <span>{review.category}</span>
                <span className="review-mark" aria-hidden="true">“</span>
              </div>
              <blockquote>{review.quote}</blockquote>
              <figcaption>
                <span className="review-avatar" aria-hidden="true">
                  {review.name.charAt(0)}
                </span>
                <strong>{review.name}</strong>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage({ loading, onFinishLoading }) {
  return (
    <>
      {loading && <Preloader onFinish={onFinishLoading} />}
      <main id="top" inert={loading}>
        <section className="hero">
          <img
            className="bg"
            src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1600&q=75"
            alt=""
            fetchPriority="high"
            decoding="async"
          />
          <img
            className="float f1"
            src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=500&q=75"
            alt="Decorated cupcakes"
            data-d="30"
          />
          <img
            className="float f2"
            src="https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=500&q=75"
            alt="A bouquet of flowers"
            data-d="-40"
          />
          <div className="wrap">
            <p className="kicker">A little sweetness for every celebration</p>
            <h1 className="split">
              {"Cakes, treats & thoughtful little joys.".split(" ").map((word, index, words) => (
                <span key={word}>
                  {word}{index < words.length - 1 ? "\u00a0" : ""}
                </span>
              ))}
            </h1>
            <p className="sub">
              Cakes for all occasions, pastries, zobo, yoghurt, parfait, beautiful bouquets
              and lots more — made with quality ingredients and trusted recipes.
            </p>
            <div className="cta">
              <a href="#menu" className="btn gold">Explore our treats</a>
              <Link to="/contact" className="btn ghost">Plan a custom order</Link>
            </div>
            <div className="stats">
              <div>Quality ingredients</div>
              <div>Trusted recipes</div>
              <div>Made for every occasion</div>
            </div>
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...marqueeTreats, ...marqueeTreats].map((treat, index) => (
              <div className="marquee-item" key={`${treat}-${index}`}>
                <span>{treat}</span><i>✦</i>
              </div>
            ))}
          </div>
        </div>

        <section id="about" className="sec reveal">
          <div className="wrap two">
            <img
              className="about-image"
              src={images.vannyCake}
              alt="A celebration cake decorated with frosting"
            />
            <div>
              <p className="page-kicker">A LITTLE ABOUT US</p>
              <h2>Thoughtfully made. Happily shared.</h2>
              <p>
                At Vany Cake and More, we make cakes for all occasions, pastries, zobo,
                yoghurt, parfait, beautiful bouquets and lots more. All our products are
                made with quality ingredients and trusted recipes to give you the very best.
              </p>
              <Link className="text-link" to="/about">
                More about Vany <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        <ProductMenu />

        <section id="how" className="sec how">
          <div className="wrap">
            <p className="page-kicker reveal">SIMPLE FROM START TO FINISH</p>
            <h2 className="reveal">Ordering is easy.</h2>
            <ol className="how-grid">
              {orderingSteps.map((step, index) => (
                <li className="how-step reveal" key={step.title}>
                  <b>{index + 1}</b>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="sec dark maker-section">
          <div className="wrap maker-layout">
            <div>
              <p className="page-kicker">THE VANY TOUCH</p>
              <h2>Quality ingredients.<br />Trusted recipes.</h2>
              <p>
                Every cake, treat and thoughtful gift is prepared with care to bring a
                little extra joy to your moment.
              </p>
            </div>
            <Link className="btn gold" to="/contact">Tell us the occasion</Link>
          </div>
        </section>

        <Reviews />
      </main>
    </>
  );
}
