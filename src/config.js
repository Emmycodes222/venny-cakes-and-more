export const business = {
  name: "Vany Cake and More",
  whatsappNumber: "2348100272639",
  whatsappDisplay: "08100272639",
  email: "vanissajite3@gmail.com",
  instagramHandle: "vanessaojite",
  instagramUrl: "https://www.instagram.com/vanessaojite/"
};

export function createWhatsAppUrl(message = "") {
  const baseUrl = `https://wa.me/${business.whatsappNumber}`;
  return message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl;
}
