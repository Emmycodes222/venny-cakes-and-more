import { Link } from "react-router-dom";
import images from "../assets/images";

export default function AboutPage() {
  return (
    <main>
      <section className="page-hero about-hero">
        <div className="wrap page-hero-grid">
          <div className="page-hero-copy">
            <p className="page-kicker">A LITTLE ABOUT VANY</p>
            <h1>Made with care.<br /><em>Shared with joy.</em></h1>
            <p>
              Vany Cake and More creates cakes, pastries, drinks, desserts and bouquets
              for life’s meaningful occasions. We combine thoughtful presentation with
              quality ingredients and trusted recipes.
            </p>
            <Link className="btn gold" to="/contact">Tell us what you love</Link>
          </div>
          <div className="story-image-wrap">
            <img src={images.vannyCake} alt="A celebration cake decorated with frosting" />
            <span className="story-image-stamp">MADE WITH<br />CARE</span>
            <span className="story-image-caption">Quality ingredients. Trusted recipes.</span>
          </div>
        </div>
      </section>

      <section className="sec story-section">
        <div className="wrap story-columns">
          <div>
            <p className="page-kicker">OUR APPROACH</p>
            <h2>Thoughtful products.<br />Consistent quality.</h2>
          </div>
          <div className="story-prose">
            <p>
              At Vany Cake and More, we prepare cakes and treats to complement each
              occasion, from a carefully designed celebration cake to pastries,
              refreshing drinks and desserts.
            </p>
            <p>
              Our range also includes bouquets and other thoughtful gifts. We use
              quality ingredients and trusted recipes, with care given to presentation
              and the details of each order.
            </p>
            <p>
              Every celebration is different. Share your preferred products, design,
              quantity and date with us, and we’ll work with you to discuss the
              available options for your order.
            </p>
          </div>
        </div>
      </section>

      <section className="sec dark approach-section">
        <div className="wrap">
          <p className="page-kicker">THE VANY WAY</p>
          <h2>A little more care in every detail.</h2>
          <div className="approach-grid">
            <article className="approach-card">
              <span>01</span>
              <h3>Considered for your occasion</h3>
              <p>Choose from celebration cakes, pastries, drinks, desserts and bouquets to suit your event.</p>
            </article>
            <article className="approach-card">
              <span>02</span>
              <h3>Quality in every detail</h3>
              <p>Quality ingredients and trusted recipes guide how we prepare our cakes and treats.</p>
            </article>
            <article className="approach-card">
              <span>03</span>
              <h3>A range for every table</h3>
              <p>Explore cakes, pastries, zobo, yoghurt, parfait, bouquets and more for gatherings and gifting.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="page-next">
        <div className="wrap page-next-inner">
          <div>
            <p className="page-kicker">YOUR MOMENT, YOUR WAY</p>
            <h2>What can we make for you?</h2>
            <p>Tell us what you’re planning, and we’ll discuss suitable products and order details with you.</p>
          </div>
          <Link className="btn gold" to="/contact">Make an enquiry</Link>
        </div>
      </section>
    </main>
  );
}
