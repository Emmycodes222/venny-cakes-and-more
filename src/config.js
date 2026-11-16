export const business = {
  name: "Vany Cake and More",
  whatsappNumber: "2348147374806",
  whatsappDisplay: "08147374806",
  email: "vanissajite3@gmail.com",
  instagramHandle: "vanessaojite",
  instagramUrl: "https://www.instagram.com/vanessaojite/"
};

export function createWhatsAppUrl(message = "") {
  const baseUrl = `https://wa.me/${business.whatsappNumber}`;
  return message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl;
}
