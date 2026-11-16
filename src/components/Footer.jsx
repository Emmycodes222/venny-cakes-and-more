import { business, createWhatsAppUrl } from "../config";
import WhatsAppIcon from "./WhatsAppIcon";
import WhatsAppButton from "./WhatsAppButton";
import images from "../assets/images";

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

export default function Footer({ inert = false }) {
  return (
    <footer id="contact" inert={inert}>
      <div className="wrap">
        <span className="brand-coin foot-coin">
          <img
            className="brand-mark foot-mark"
            src={images.brandLogo}
            alt="Vany Cake and More cake logo"
          />
        </span>
        <h2>A little joy is just a message away.</h2>
        <WhatsAppButton
          message={`Hello ${business.name}! I'd like to ask about your cakes and treats.`}
          className="btn gold wa-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Chat with us on WhatsApp
        </WhatsAppButton>
        <div className="footer-details">
          <a className="business-email social-link" href={`mailto:${business.email}`}>
            <EmailIcon />
            <span className="social-label">{business.email}</span>
          </a>
          <a
            className="business-instagram social-link"
            href={business.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon />
            <span className="social-label">@{business.instagramHandle} on Instagram</span>
          </a>
          <a
            className="business-whatsapp social-link"
            href={createWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon />
            <span className="social-label">WhatsApp: {business.whatsappDisplay}</span>
          </a>
        </div>
        <p>Vany Cake and More · Made with quality ingredients and trusted recipes.</p>
      </div>
    </footer>
  );
}
