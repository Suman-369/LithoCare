export type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  description: string;
  category: string;
  features: string[];
  specifications: Record<string, string>;
};

export const products: Product[] = [
  {
    id: "LITHOCARE ENERGY-lite-1",
    name: "LITHOCARE ENERGY FF Lite Electric Scooter",
    image: "/images/image1.png",
    price: 1299,
    originalPrice: 1599,
    rating: 4.8,
    reviews: 124,
    description:
      "The ultimate urban commuter. Lightweight, fast, and highly efficient for your daily transit.",
    category: "Electric Scooters",
    features: [
      "Lightweight aluminum frame",
      "Foldable design for easy transit",
      "Puncture-proof rubber tires",
      "Integrated front and rear LED lights",
    ],
    specifications: {
      Brand: "LITHOCARE ENERGY",
      Model: "FF Lite",
      Material: "Aerospace-grade Aluminum",
      TopSpeed: "45 mph",
      Range: "45 Miles",
      Weight: "24 kg",
      Warranty: "1 Year Limited",
    },
  },
  {
    id: "LITHOCARE ENERGY-pro-max",
    name: "LITHOCARE ENERGY Pro Max Dual Motor",
    image: "/images/image2.png",
    price: 1899,
    originalPrice: 2199,
    rating: 4.9,
    reviews: 86,
    description:
      "Experience raw power with dual 3200W motors. Built for thrill-seekers and off-road enthusiasts.",
    category: "Electric Scooters",
    features: [
      "Dual 3200W brushless motors",
      "Hydraulic disc brakes",
      "Heavy-duty suspension system",
      "Smart LCD display",
    ],
    specifications: {
      Brand: "LITHOCARE ENERGY",
      Model: "Pro Max",
      Material: "Reinforced Steel Alloy",
      TopSpeed: "60 mph",
      Range: "55 Miles",
      Weight: "42 kg",
      Warranty: "2 Year Limited",
    },
  },
  {
    id: "LITHOCARE ENERGY-cruiser",
    name: "LITHOCARE ENERGY Urban Cruiser",
    image: "/images/b1.png",
    price: 999,
    rating: 4.6,
    reviews: 210,
    description:
      "Smooth, comfortable, and reliable. The Urban Cruiser is perfect for relaxed city riding.",
    category: "Electric Scooters",
    features: [
      "Ergonomic extended deck",
      "Regenerative braking system",
      "Cruise control functionality",
      "App connectivity",
    ],
    specifications: {
      Brand: "LITHOCARE ENERGY",
      Model: "Urban Cruiser",
      Material: "Aluminum",
      TopSpeed: "25 mph",
      Range: "30 Miles",
      Weight: "18 kg",
      Warranty: "1 Year Limited",
    },
  },
  {
    id: "LITHOCARE ENERGY-stealth",
    name: "LITHOCARE ENERGY Stealth Edition",
    image: "/images/b2.png",
    price: 1499,
    originalPrice: 1699,
    rating: 4.7,
    reviews: 142,
    description:
      "Matte black finish, whisper-quiet motor, and unparalleled styling. Stand out by blending in.",
    category: "Electric Scooters",
    features: [
      "Matte stealth finish",
      "Ultra-quiet sine wave controller",
      "Anti-theft alarm system",
      "Wide tubeless tires",
    ],
    specifications: {
      Brand: "LITHOCARE ENERGY",
      Model: "Stealth",
      Material: "Carbon Fiber & Aluminum",
      TopSpeed: "35 mph",
      Range: "40 Miles",
      Weight: "21 kg",
      Warranty: "1 Year Limited",
    },
  },
  {
    id: "LITHOCARE ENERGY-commute",
    name: "LITHOCARE ENERGY Commute Series",
    image: "/images/b3.png",
    price: 799,
    originalPrice: 899,
    rating: 4.5,
    reviews: 350,
    description:
      "Your entry into electric mobility. Affordable, dependable, and incredibly fun to ride.",
    category: "Electric Scooters",
    features: [
      "Quick-fold mechanism",
      "LED dashboard",
      "Shock-absorbing honeycomb tires",
      "Minimalist design",
    ],
    specifications: {
      Brand: "LITHOCARE ENERGY",
      Model: "Commute",
      Material: "Aluminum",
      TopSpeed: "18 mph",
      Range: "20 Miles",
      Weight: "14 kg",
      Warranty: "6 Months Limited",
    },
  },
  {
    id: "LITHOCARE ENERGY-beast",
    name: "LITHOCARE ENERGY Beast All-Terrain",
    image: "/images/b4.png",
    price: 2499,
    rating: 5.0,
    reviews: 42,
    description:
      "Conquer any terrain with the Beast. Featuring massive knobby tires and extreme ground clearance.",
    category: "All-Terrain Scooters",
    features: [
      "11-inch off-road tires",
      "Adjustable hydraulic suspension",
      "Massive 72V battery",
      "Dual charging ports",
    ],
    specifications: {
      Brand: "LITHOCARE ENERGY",
      Model: "Beast",
      Material: "Aviation-grade Aluminum",
      TopSpeed: "65 mph",
      Range: "70 Miles",
      Weight: "48 kg",
      Warranty: "2 Year Limited",
    },
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
