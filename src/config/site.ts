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
  heroTiles: [
    { itemId: "jollof-rice", illustration: "jollof" },
    { itemId: "fried-rice", illustration: "fried-rice" },
    { itemId: "stir-fried-spaghetti", illustration: "spaghetti" },
    { itemId: "cake", illustration: "cake-piece" },
    { itemId: "whole-cake", illustration: "whole-cake" },
    { itemId: "cupcake", illustration: "cupcake" },
    { id: "cooking", illustration: "pot", label: "No. 7 Cooking" },
    { itemId: "bottled-water-50cl", illustration: "water" },
    { itemId: "soft-drink", illustration: "soft-drink" },
    { id: "pepper", illustration: "pepper", label: "Pepper" },
    { itemId: "fried-plantain", illustration: "plantain" },
    { id: "cutlery", illustration: "cutlery", label: "Spoon and fork" },
  ] as { id?: string; itemId?: string; illustration: string; label?: string; image?: string }[],
};

export function getWhatsAppUrl(message: string) {
  const number = site.whatsappNumber.replace(/\D/g, "");
  if (!number || site.whatsappNumber.includes("[")) return null;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}