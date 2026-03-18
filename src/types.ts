interface Pastry {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  videoUrl?: string;
  category: 'Classic' | 'Regional' | 'Seasonal';
  rating: number;
  reviews: number;
}

export type { Pastry };