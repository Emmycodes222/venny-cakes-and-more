import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main>
      <section className="contact-hero">
        <div className="wrap contact-hero-inner">
          <p className="page-kicker">404 · PAGE NOT FOUND</p>
          <h1>This page isn’t on the menu.</h1>
          <p>The address may have changed, or the page may no longer be available.</p>
          <div className="cta">
            <Link className="btn gold" to="/">Return home</Link>
            <Link className="btn ghost" to="/contact">Contact us</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
