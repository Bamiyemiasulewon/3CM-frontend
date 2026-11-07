export type MenuCategory = "Rice" | "Spaghetti" | "Cakes" | "Drinks";
export type DietaryTag = "S" | "V" | "E" | "D";

export type MenuUnit = "portion" | "piece" | "bottle";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  category: MenuCategory;
  price: number;
  unit: MenuUnit;
  tags: DietaryTag[];
  featured: boolean;
  image?: string;
  illustration: string;
  isExtra?: boolean;
  startingAt?: boolean;
};

export const menu: MenuItem[] = [
  {
    id: "jollof-rice",
    name: "Jollof Rice",
    description: "Smoky, tomato-rich rice with pepper on request.",
    category: "Rice",
    price: 2500,
    unit: "portion",
    illustration: "jollof",
    tags: ["V"],
    featured: true,
  },
  {
    id: "fried-rice",
    name: "Fried Rice",
    description: "Colourful vegetables folded through savoury rice.",
    category: "Rice",
    price: 2800,
    unit: "portion",
    illustration: "fried-rice",
    tags: ["V"],
    featured: true,
  },
  {
    id: "half-and-half",
    name: "Jollof and Fried Rice",
    description: "Half-and-half, for when one favourite is not enough.",
    category: "Rice",
    price: 3000,
    unit: "portion",
    illustration: "jollof",
    tags: ["V"],
    featured: true,
  },
  {
    id: "chicken",
    name: "Chicken",
    description: "A hearty side for your rice.",
    category: "Rice",
    price: 1800,
    unit: "portion",
    illustration: "cutlery",
    tags: [],
    featured: false,
    isExtra: true,
  },
  {
    id: "fish",
    name: "Fish",
    description: "Add fish to your plate.",
    category: "Rice",
    price: 2000,
    unit: "portion",
    illustration: "cutlery",
    tags: [],
    featured: false,
    isExtra: true,
  },
  {
    id: "fried-plantain",
    name: "Fried Plantain",
    description: "Sweet plantain, fried until golden.",
    category: "Rice",
    price: 1000,
    unit: "portion",
    illustration: "plantain",
    tags: ["V"],
    featured: false,
    isExtra: true,
  },
  {
    id: "salad",
    name: "Salad",
    description: "A cool, crisp side for your plate.",
    category: "Rice",
    price: 800,
    unit: "portion",
    illustration: "cutlery",
    tags: ["V"],
    featured: false,
    isExtra: true,
  },
  {
    id: "stir-fried-spaghetti",
    name: "Stir-Fried Spaghetti",
    description: "Tossed with vegetables and a little savoury heat.",
    category: "Spaghetti",
    price: 2500,
    unit: "portion",
    illustration: "spaghetti",
    tags: ["S"],
    featured: true,
  },
  {
    id: "cake",
    name: "Cake",
    description: "A soft piece for your tea break.",
    category: "Cakes",
    price: 1500,
    unit: "piece",
    illustration: "cake-piece",
    tags: ["E", "D"],
    featured: true,
  },
  {
    id: "cupcake",
    name: "Cupcake",
    description: "A little cake with a generous finish.",
    category: "Cakes",
    price: 1000,
    unit: "piece",
    illustration: "cupcake",
    tags: ["E", "D"],
    featured: false,
  },
  {
    id: "whole-cake",
    name: "Whole Cake",
    description: "Made to order. Share your date and design for a quote.",
    category: "Cakes",
    price: 25000,
    unit: "piece",
    illustration: "whole-cake",
    tags: ["E", "D"],
    featured: false,
    startingAt: true,
  },
  {
    id: "bottled-water-50cl",
    name: "Bottled Water 50cl",
    description: "Chilled bottled water.",
    category: "Drinks",
    price: 500,
    unit: "bottle",
    illustration: "water",
    tags: [],
    featured: false,
  },
  {
    id: "bottled-water-75cl",
    name: "Bottled Water 75cl",
    description: "Chilled bottled water.",
    category: "Drinks",
    price: 800,
    unit: "bottle",
    illustration: "water",
    tags: [],
    featured: false,
  },
  {
    id: "soft-drink",
    name: "Soft Drink",
    description: "A bottled soft drink with your meal.",
    category: "Drinks",
    price: 800,
    unit: "bottle",
    illustration: "soft-drink",
    tags: [],
    featured: false,
  },
];

export const categories: {
  name: MenuCategory;
  description: string;
  illustration: string;
}[] = [
  { name: "Rice", description: "A good plate starts here.", illustration: "jollof" },
  {
    name: "Spaghetti",
    description: "Tossed hot, with a little pepper if you like.",
    illustration: "spaghetti",
  },
  { name: "Cakes", description: "A sweet finish, any day of the week.", illustration: "cake-piece" },
  { name: "Drinks", description: "Something cool beside your plate.", illustration: "water" },
];