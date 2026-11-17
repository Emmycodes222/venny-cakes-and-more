import { business, createWhatsAppUrl } from "../config";
import WhatsAppIcon from "./WhatsAppIcon";

export default function ProductCard({ product, onPreview }) {
  const hasListedPrice = !/price on request/i.test(product.price);
  const message = hasListedPrice
    ? `Hello ${business.name}! I'd like to order ${product.name}. I saw the listed price is ${product.price}. Please confirm availability and next steps.`
    : `Hello ${business.name}! I'm interested in ${product.name}. Could you please share the current price and availability?`;

  return (
    <article className="card">
      <button
        className="im"
        type="button"
        onClick={() => onPreview(product)}
        aria-label={`View a larger photo of ${product.name}`}
      >
        <img src={product.image} alt={product.imageAlt} loading="lazy" />
      </button>
      <div className="cb">
        <span className="product-category">{product.category}</span>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        {product.name === "Pastries and Breads" && (
          <p className="photo-credit">
            Bread photo by{" "}
            <a href="https://commons.wikimedia.org/wiki/User:FranHogan" target="_blank" rel="noopener noreferrer">FranHogan</a>
            {" "}via{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Fresh_made_bread_05.jpg" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a>
            {" "}(resized),{" "}
            <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>.
          </p>
        )}
        <p className="product-price">{product.price}</p>
        <a
          className="ask"
          href={createWhatsAppUrl(message)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${hasListedPrice ? "Order" : "Ask for the price of"} ${product.name} via WhatsApp`}
        >
          <WhatsAppIcon className="button-whatsapp-icon whatsapp-icon" />
          {hasListedPrice ? "Order via WhatsApp" : "Ask about pricing on WhatsApp"}
        </a>
      </div>
    </article>
  );
}
