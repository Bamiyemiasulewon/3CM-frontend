export const site = {
  name: "3CM",
  description:
    "Jollof rice, fried rice, stir-fried spaghetti, cakes and drinks from 3CM.",
  whatsappNumber: "[WHATSAPP_NUMBER]",
  phone: "[PHONE]",
  address: "[ADDRESS]",
  instagram: "[INSTAGRAM_HANDLE]",
  timeZone: "Africa/Lagos",
  openingHours: {
    monday: { open: "09:00", close: "21:00" },
    tuesday: { open: "09:00", close: "21:00" },
    wednesday: { open: "09:00", close: "21:00" },
    thursday: { open: "09:00", close: "21:00" },
    friday: { open: "09:00", close: "21:00" },
    saturday: { open: "09:00", close: "21:00" },
    sunday: { open: "09:00", close: "21:00" },
  } satisfies Record<string, { open: string; close: string }>,
  hoursSummary: "Every day - 9am to 9pm",
  deliveryArea: "[DELIVERY AREA]",
  cakeLeadTime: "[LEAD TIME]",
  minimumCakeOrder: "[MINIMUM ORDER]",
  tagline: "Good food, made fresh and served with care.",
  marqueeMessages: [
    "Jollof and fried rice",
    "Cakes made to order",
    "Pickup and delivery",
    "Order on WhatsApp",
  ],
};

export function getWhatsAppUrl(message: string) {
  const number = site.whatsappNumber.replace(/\D/g, "");
  if (!number || site.whatsappNumber.includes("[")) return null;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}