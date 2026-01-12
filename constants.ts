
import { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Burrata Crémeuse',
    description: 'Burrata fraîche des Pouilles, tomates cerises confites et pesto maison.',
    ingredients: ['Burrata de bufflonne', 'Tomates cerises San Marzano', 'Basilic frais', 'Pignons de pin', 'Huile d\'olive extra vierge', 'Fleur de sel'],
    price: 14,
    category: 'Entrées',
    image: 'https://images.unsplash.com/photo-1595115201103-625d607e163b?auto=format&fit=crop&w=800&q=80',
    tags: ['Végétarien', 'Populaire'],
    calories: 450,
    isVegetarian: true
  },
  {
    id: '2',
    name: 'Tartare de Saumon',
    description: 'Saumon frais, mangue, avocat, citron vert et gingembre.',
    ingredients: ['Saumon Label Rouge', 'Mangue mûre', 'Avocat Haas', 'Échalotes', 'Zestes de citron vert', 'Gingembre frais', 'Ciboulette'],
    price: 16,
    category: 'Entrées',
    image: 'https://images.unsplash.com/photo-1546039907-7fa05f864c02?auto=format&fit=crop&w=800&q=80',
    tags: ['Frais', 'Sans Gluten'],
    calories: 320,
    isGlutenFree: true
  },
  {
    id: '3',
    name: 'Entrecôte Maturée',
    description: 'Bœuf de race, frites maison, sauce au poivre noir.',
    ingredients: ['Faux-filet maturé 30 jours', 'Pommes de terre Agria', 'Poivre noir de Sarawak', 'Crème fraîche', 'Cognac', 'Beurre demi-sel'],
    price: 28,
    category: 'Plats',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80',
    tags: ['Signature', 'Copieux'],
    calories: 850,
    spicyLevel: 1
  },
  {
    id: '4',
    name: 'Risotto aux Cèpes',
    description: 'Riz Carnaroli, cèpes frais, parmesan et huile de truffe.',
    ingredients: ['Riz Carnaroli', 'Cèpes de forêt', 'Parmigiano Reggiano 24 mois', 'Bouillon de légumes maison', 'Huile de truffe blanche', 'Échalotes confites'],
    price: 22,
    category: 'Plats',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=800&q=80',
    tags: ['Végétarien', 'Truffé'],
    calories: 620,
    isVegetarian: true
  },
  {
    id: '5',
    name: 'Pavé de Cabillaud',
    description: 'Cuisson vapeur, petits légumes et émulsion au beurre blanc.',
    ingredients: ['Dos de cabillaud frais', 'Asperges vertes', 'Carottes fanes', 'Beurre d\'Echiré', 'Vin blanc sec', 'Échalotes', 'Citron jaune'],
    price: 24,
    category: 'Plats',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    tags: ['Léger', 'Pêche Durable'],
    calories: 410,
    isGlutenFree: true
  },
  {
    id: '6',
    name: 'Fondant au Chocolat',
    description: 'Cœur coulant, glace vanille et coulis de caramel.',
    ingredients: ['Chocolat noir 70%', 'Beurre doux', 'Œufs frais', 'Sucre de canne', 'Gousse de vanille Bourbon', 'Caramel au beurre salé'],
    price: 9,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=800&q=80',
    tags: ['Gourmand'],
    calories: 550,
    isVegetarian: true
  },
  {
    id: '7',
    name: 'Tarte au Citron',
    description: 'Pâte sablée, crème citronnée et meringue italienne.',
    ingredients: ['Pâte sablée maison', 'Citrons de Menton', 'Sucre glace', 'Œufs de plein air', 'Meringue italienne flambée au chalumeau'],
    price: 8,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=800&q=80',
    tags: ['Classique'],
    calories: 420,
    isVegetarian: true
  },
  {
    id: '8',
    name: 'Cocktail Signature',
    description: 'Gin artisanal, concombre, sureau et tonic.',
    ingredients: ['Gin Hendricks', 'Sirop de sureau', 'Concombre frais', 'Tonic Fever-Tree', 'Baies roses', 'Menthe'],
    price: 12,
    category: 'Boissons',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80',
    tags: ['Alcoolisé', 'Rafraîchissant'],
    calories: 180
  },
  {
    id: '9',
    name: 'Limonade Maison',
    description: 'Citrons frais, menthe et miel bio.',
    ingredients: ['Jus de citrons jaunes et verts', 'Eau minérale', 'Miel de fleurs bio', 'Feuilles de menthe fraîche', 'Rondelles de citron'],
    price: 6,
    category: 'Boissons',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    tags: ['Bio', 'Sans Alcool'],
    calories: 110,
    isVegetarian: true
  }
];
