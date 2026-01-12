
export type Category = 'Entrées' | 'Plats' | 'Desserts' | 'Boissons';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  ingredients: string[]; // Ajout des ingrédients
  price: number;
  category: Category;
  image: string;
  tags: string[];
  calories: number;
  spicyLevel?: number;
  isVegetarian?: boolean;
  isGlutenFree?: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
