import { useState } from "react";
import { business, createWhatsAppUrl } from "../config";
import WhatsAppIcon from "../components/WhatsAppIcon";

function InstagramIcon() {
  return (
    <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle className="social-icon-dot" cx="17.5" cy="6.5" r="1" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="social-icon gmail-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path className="gmail-left" d="M3.5 18V6" />
      <path className="gmail-red" d="M3.5 6 12 12.5" />
      <path className="gmail-yellow" d="m12 12.5 8.5-6.5" />
      <path className="gmail-right" d="M20.5 6v12" />
      <path className="gmail-envelope" d="M3.5 6h17v12h-17z" />
    </svg>
  );
}

function todayAsDateInputValue() {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${today.getFullYear()}-${month}-${day}`;
}

function clean(value, maxLength, keepNewlines = false) {
  const controlCharacters = keepNewlines
    ? /[\u0000-\u0009\u000b-\u001f\u007f]+/g
    : /[\u0000-\u001f\u007f]+/g;
  return String(value || "")
    .replace(controlCharacters, " ")
    .replace(/[ \t]{2,}/g, " ")
    .trim()
    .slice(0, maxLength);
}

export default function ContactPage() {
  const [status, setStatus] = useState({ message: "", isSuccess: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const today = todayAsDateInputValue();

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = clean(data.get("name"), 80);
    const phone = clean(data.get("phone"), 30);
    const date = clean(data.get("date"), 10);
    const guests = clean(data.get("guests"), 5);
    const quantity = Number(guests);

    function showError(message, selector) {
      setStatus({ message, isSuccess: false });
      form.querySelector(selector)?.focus();
    }

    if (name.length < 2) {
      showError("Please tell us your name.", "#contact-name");
      return;
    }
    if (phone && !/^[\d\s()+\-.]{6,30}$/.test(phone)) {
      showError("That phone number doesn't look right. Use digits, spaces, + or - only.", "#contact-phone");
      return;
    }
    if (date && (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date < today)) {
      showError("Please choose today's date or a future date.", "#event-date");
      return;
    }
    if (guests && (!Number.isInteger(quantity) || quantity < 1 || quantity > 5000)) {
      showError("Quantity should be a whole number between 1 and 5000.", "#event-guests");
      return;
    }

    const fields = [
      ["Name", name],
      ["Phone", phone],
      ["Interested in", clean(data.get("event"), 60)],
      ["Date needed", date],
      ["Quantity / servings", guests],
      ["Location", clean(data.get("location"), 120)],
      ["Notes", clean(data.get("notes"), 600, true)]
    ].filter(([, value]) => value);

    const message = `Hello ${business.name}! I'd like to enquire about an order.\n\n${
      fields.map(([label, value]) => `${label}: ${value}`).join("\n")
    }`;
    const whatsappUrl = createWhatsAppUrl(message);

    setStatus({
      message: "Opening WhatsApp so you can review and send your message…",
      isSuccess: true
    });
    setIsSubmitting(true);
    window.setTimeout(() => setIsSubmitting(false), 3000);

    const newWindow = window.open(whatsappUrl, "_blank");
    if (newWindow) newWindow.opener = null;
    else window.location.href = whatsappUrl;
  }

  return (
    <main>
      <section className="contact-hero">
        <div className="wrap contact-hero-inner">
          <p className="page-kicker">CAKES · TREATS · BOUQUETS</p>
          <h1>Let’s make your moment <em>lovely.</em></h1>
          <p>
            Tell us what you’re looking for — a celebration cake, pastries, a refreshing
            treat, a bouquet or something else.
          </p>
        </div>
      </section>

      <section className="sec contact-section">
        <div className="wrap contact-layout">
          <div className="contact-aside">
            <p className="page-kicker">SAY HELLO</p>
            <h2>We’d love to hear your idea.</h2>
            <p>Send an enquiry to ask about our treats, availability or a custom order.</p>
            <div className="contact-detail">
              <span className="contact-icon" aria-hidden="true">
                <WhatsAppIcon />
              </span>
              <span>
                <strong>WhatsApp</strong>
                <small>
                  <a
                    className="business-whatsapp contact-social-link"
                    href={createWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon />
                    <span className="social-label">{business.whatsappDisplay}</span>
                  </a>
                </small>
              </span>
            </div>
            <div className="contact-detail">
              <span className="contact-icon" aria-hidden="true"><EmailIcon /></span>
              <span>
                <strong>Email</strong>
                <small>
                  <a className="business-email" href={`mailto:${business.email}`}>
                    <span className="social-label">{business.email}</span>
                  </a>
                </small>
              </span>
            </div>
            <div className="contact-detail">
              <span className="contact-icon" aria-hidden="true"><InstagramIcon /></span>
              <span>
                <strong>Instagram</strong>
                <small>
                  <a
                    className="business-instagram"
                    href={business.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="social-label">@{business.instagramHandle}</span>
                  </a>
                </small>
              </span>
            </div>
            <p className="contact-note">
              We’ll prepare your enquiry in WhatsApp so you can review it and send it directly.
            </p>
          </div>

          <form className="event-form" id="event-form" onSubmit={handleSubmit}>
            <div className="form-heading">
              <span>ORDER ENQUIRY</span>
              <span>VANY · 01</span>
            </div>
            <label htmlFor="contact-name">Your name <span>*</span></label>
            <input
              id="contact-name"
              name="name"
              autoComplete="name"
              required
              maxLength={80}
              placeholder="e.g. Ada Okafor"
            />
            <div className="form-row">
              <div>
                <label htmlFor="contact-phone">Your phone number</label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  maxLength={30}
                  placeholder="So we can reach you"
                />
              </div>
              <div>
                <label htmlFor="event-date">Date needed (if applicable)</label>
                <input id="event-date" name="date" type="date" min={today} />
              </div>
            </div>
            <div className="form-row">
              <div>
                <label htmlFor="event-type">What are you interested in?</label>
                <select id="event-type" name="event" defaultValue="">
                  <option value="">Choose a product</option>
                  <option>Birthday cakes</option>
                  <option>Anniversary cakes</option>
                  <option>Wedding cakes</option>
                  <option>Custom cakes</option>
                  <option>Cupcakes</option>
                  <option>Parfaits</option>
                  <option>Meat pies</option>
                  <option>Chin chin</option>
                  <option>Pastries and breads</option>
                  <option>Snack packs</option>
                  <option>Popcorn</option>
                  <option>Small chops</option>
                  <option>Food trays</option>
                  <option>Desserts</option>
                  <option>Zobo drinks</option>
                  <option>Yoghurt</option>
                  <option>Bouquet</option>
                  <option>Other / custom order</option>
                </select>
              </div>
              <div>
                <label htmlFor="event-guests">Quantity or servings (if known)</label>
                <input
                  id="event-guests"
                  name="guests"
                  type="number"
                  min="1"
                  max="5000"
                  inputMode="numeric"
                  placeholder="e.g. 12"
                />
              </div>
            </div>
            <label htmlFor="event-location">Event location</label>
            <input
              id="event-location"
              name="location"
              autoComplete="street-address"
              maxLength={120}
              placeholder="Area or delivery location"
            />
            <label htmlFor="event-notes">What would you like us to know?</label>
            <textarea
              id="event-notes"
              name="notes"
              rows="4"
              maxLength={600}
              placeholder="Flavour, design, colours, bouquet style or any other details"
            />
            <button className="btn gold submit-enquiry" type="submit" disabled={isSubmitting}>
              <WhatsAppIcon className="button-whatsapp-icon whatsapp-icon" />
              Continue to WhatsApp
            </button>
            <p
              className={`form-status${status.isSuccess ? " ok" : ""}`}
              id="form-status"
              role="status"
              aria-live="polite"
            >
              {status.message}
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
