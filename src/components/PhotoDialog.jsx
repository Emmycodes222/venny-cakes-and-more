import { useEffect, useRef } from "react";
import { business, createWhatsAppUrl } from "../config";
import WhatsAppIcon from "./WhatsAppIcon";

export default function PhotoDialog({ product, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    }

    return () => {
      if (dialog.open) dialog.close();
    };
  }, [product]);

  if (!product) return null;

  const hasListedPrice = !/price on request/i.test(product.price);
  const message = hasListedPrice
    ? `Hello ${business.name}! I'd like to order ${product.name}. I saw the listed price is ${product.price}. Please confirm availability and next steps.`
    : `Hello ${business.name}! I'm interested in ${product.name}. Could you please share the current price and availability?`;

  return (
    <dialog
      id="lightbox"
      ref={dialogRef}
      aria-label="Photo preview"
      onClose={onClose}
      onCancel={onClose}
      onClick={event => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      <div className="lb-panel">
        <button
          type="button"
          id="lb-close"
          aria-label="Close preview"
          onClick={() => dialogRef.current?.close()}
        >
          ✕
        </button>
        <img id="lb-img" src={product.image} alt={product.imageAlt} />
        <div className="lb-foot">
          <strong id="lb-cap">{product.name}</strong>
          <a
            id="lb-cta"
            className="btn gold"
            href={createWhatsAppUrl(message)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon className="button-whatsapp-icon whatsapp-icon" />
            {hasListedPrice ? "Order on WhatsApp" : "Ask on WhatsApp"}
          </a>
        </div>
      </div>
    </dialog>
  );
}
