import { business, createWhatsAppUrl } from "../config";
import WhatsAppIcon from "./WhatsAppIcon";

export default function WhatsAppButton({
  children,
  message,
  className = "btn gold",
  ...linkProps
}) {
  const defaultMessage = `Hello ${business.name}! I'd like to ask about your cakes and treats.`;

  return (
    <a
      {...linkProps}
      href={createWhatsAppUrl(message || defaultMessage)}
      className={className}
    >
      <WhatsAppIcon className="button-whatsapp-icon whatsapp-icon" />
      {children}
    </a>
  );
}
