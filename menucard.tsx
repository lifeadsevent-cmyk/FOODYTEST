
import React from 'react';
import { MenuItem } from '../types';
// Fix: Corrected import casing from './Icons' to './icons' to match the actual filename and ensure consistent imports across the project.
import { PlusIcon } from './icons';

interface MenuCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ item, onAddToCart }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 flex flex-col h-full">
      <div className="relative overflow-hidden h-48 sm:h-56">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {item.tags.map(tag => (
            <span key={tag} className="bg-white/90 backdrop-blur px-2 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider text-stone-700">
              {tag}
            </span>
          ))}
        </div>
        {item.isVegetarian && (
          <div className="absolute top-3 right-3 bg-green-500/90 backdrop-blur text-white p-1 rounded-full text-[10px] font-bold px-2">
            VEG
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-stone-800">{item.name}</h3>
          <span className="text-lg font-bold text-orange-600 font-serif">{item.price}€</span>
        </div>
        
        <p className="text-stone-500 text-sm leading-relaxed mb-4 line-clamp-2">
          {item.description}
        </p>
        
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-stone-50">
          <span className="text-xs text-stone-400 font-medium">{item.calories} kcal</span>
          <button 
            onClick={() => onAddToCart(item)}
            className="bg-stone-900 text-white p-2 rounded-full hover:bg-orange-600 transition-colors shadow-md active:scale-95"
          >
            <PlusIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
