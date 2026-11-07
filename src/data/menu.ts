export type MenuCategory = "Rice" | "Spaghetti" | "Cakes" | "Drinks";
export type DietaryTag = "S" | "V" | "E" | "D";

export type MenuUnit = "portion" | "piece" | "bottle";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: MenuUnit;
  tags: DietaryTag[];
  featured: boolean;
  illustration: string;
  image?: string;
  startingAt?: boolean;
};

export type MenuCategoryData = {
  name: MenuCategory;
  description: string;
  items: MenuItem[];
  extras?: MenuItem[];
};

export const SAMPLE_EXTRA_PRICES = {
  chicken: 1800,
  beef: 2000,
  egg: 600,
  friedPlantain: 1000,
  salad: 800,
};

const riceExtras: MenuItem[] = [
  {
    id: "chicken",
    name: "Chicken",
    description: "A hearty side for your plate.",
    price: SAMPLE_EXTRA_PRICES.chicken,
    unit: "piece",
    tags: [],
    featured: false,
    illustration: "cutlery",
  },
  {
    id: "beef",
    name: "Beef",
    description: "A savoury piece to go with your plate.",
    price: SAMPLE_EXTRA_PRICES.beef,
    unit: "piece",
    tags: [],
    featured: false,
    illustration: "cutlery",
  },
  {
    id: "egg",
    name: "Egg",
    description: "Add an egg to your plate.",
    price: SAMPLE_EXTRA_PRICES.egg,
    unit: "piece",
    tags: ["E"],
    featured: false,
    illustration: "cutlery",
  },
  {
    id: "fried-plantain",
    name: "Fried Plantain",
    description: "Sweet plantain, fried until golden.",
    price: SAMPLE_EXTRA_PRICES.friedPlantain,
    unit: "portion",
    tags: ["V"],
    featured: false,
    illustration: "plantain",
  },
  {
    id: "salad",
    name: "Salad",
    description: "A cool, crisp side for your plate.",
    price: SAMPLE_EXTRA_PRICES.salad,
    unit: "portion",
    tags: ["V"],
    featured: false,
    illustration: "cutlery",
  },
];

export const categories: MenuCategoryData[] = [
  {
    name: "Rice",
    description: "A good plate starts here.",
    items: [
      {
        id: "jollof-rice",
        name: "Jollof Rice",
        description: "Smoky, tomato-rich rice with pepper on request.",
        price: 2500,
        unit: "portion",
        tags: ["V"],
        featured: true,
        illustration: "jollof",
      },
      {
        id: "fried-rice",
        name: "Fried Rice",
        description: "Colourful vegetables folded through savoury rice.",
        price: 2800,
        unit: "portion",
        tags: ["V"],
        featured: true,
        illustration: "fried-rice",
      },
    ],
    extras: riceExtras,
  },
  {
    name: "Spaghetti",
    description: "Tossed hot, with a little pepper if you like.",
    items: [
      {
        id: "stir-fried-spaghetti",
        name: "Stir-Fried Spaghetti",
        description: "Tossed with vegetables and a little savoury heat.",
        price: 2500,
        unit: "portion",
        tags: ["S"],
        featured: true,
        illustration: "spaghetti",
      },
    ],
    extras: riceExtras.filter((item) => ["chicken", "beef", "egg"].includes(item.id)),
  },
  {
    name: "Cakes",
    description: "A sweet finish, any day of the week.",
    items: [
      {
        id: "cake",
        name: "Cake",
        description: "A soft piece for your tea break.",
        price: 1500,
        unit: "piece",
        tags: ["E", "D"],
        featured: true,
        illustration: "cake-piece",
      },
      {
        id: "cupcake",
        name: "Cupcake",
        description: "A little cake with a generous finish.",
        price: 1000,
        unit: "piece",
        tags: ["E", "D"],
        featured: false,
        illustration: "cupcake",
      },
      {
        id: "whole-cake",
        name: "Whole Cake",
        description: "Made to order. Share your date and design for a quote.",
        price: 25000,
        unit: "piece",
        tags: ["E", "D"],
        featured: false,
        illustration: "whole-cake",
        startingAt: true,
      },
    ],
  },
  {
    name: "Drinks",
    description: "Something cool beside your plate.",
    items: [
      {
        id: "bottled-water-50cl",
        name: "Bottled Water 50cl",
        description: "Chilled bottled water.",
        price: 500,
        unit: "bottle",
        tags: [],
        featured: false,
        illustration: "water",
      },
      {
        id: "bottled-water-75cl",
        name: "Bottled Water 75cl",
        description: "Chilled bottled water.",
        price: 800,
        unit: "bottle",
        tags: [],
        featured: false,
        illustration: "water",
      },
      {
        id: "soft-drink",
        name: "Soft Drink",
        description: "A bottled soft drink with your meal.",
        price: 800,
        unit: "bottle",
        tags: [],
        featured: false,
        illustration: "soft-drink",
      },
    ],
  },
];

export const menu: MenuItem[] = Array.from(
  new Map(
    categories
      .flatMap((category) => [...category.items, ...(category.extras ?? [])])
      .map((item) => [item.id, item]),
  ).values(),
);