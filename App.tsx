
import React, { useState } from 'react';
import { Category, MenuItem, CartItem } from './types';
import { MENU_ITEMS } from './constants';
import bookmenu from './components/bookmenu';
import cart from './components/cart';
import aiassistant from './components/aiassistant';
import { ShoppingCartIcon } from './components/icons';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category | 'Tout'>('Tout');
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const categories: { label: Category | 'Tout', page: number }[] = [
    { label: 'Tout', page: 0 },
    { label: 'Entrées', page: 1 },
    { label: 'Plats', page: 2 },
    { label: 'Desserts', page: 2 }, 
    { label: 'Boissons', page: 3 }
  ];

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const handleCategoryClick = (cat: Category | 'Tout', page: number) => {
    setActiveCategory(cat);
    setCurrentPageIndex(page);
  };

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#121212]">
      {/* Top Bar Navigation - Toujours au dessus du livre */}
      <nav className="fixed top-0 left-0 right-0 z-[70] px-4 sm:px-8 h-20 sm:h-24 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3 sm:gap-4 pointer-events-auto">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#fbc02d] rounded-lg flex items-center justify-center shadow-lg transform rotate-3">
            <span className="text-black font-serif text-xl sm:text-2xl font-black">G</span>
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl font-black tracking-tighter text-white drop-shadow-md leading-none uppercase">Gourmet<br/><span className="text-[#fbc02d]">Prestige</span></h1>
          </div>
        </div>

        <button 
          onClick={() => setIsCartOpen(true)}
          className="pointer-events-auto relative bg-[#fbc02d] p-3 sm:p-4 rounded-full shadow-2xl text-black hover:bg-white transition-all active:scale-90"
        >
          <ShoppingCartIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-black w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full border-2 border-black">
              {cartCount}
            </span>
          )}
        </button>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center">
        {/* Navigation Tabs - Bookmark style, cachés sur mobile pour le mode full book */}
        <div className="hidden sm:flex gap-3 mb-12 z-10 px-6 overflow-x-auto no-scrollbar max-w-full">
          {categories.map(cat => (
            <button
              key={cat.label}
              onClick={() => handleCategoryClick(cat.label, cat.page)}
              className={`px-8 py-2.5 rounded-full font-black text-xs uppercase tracking-widest transition-all duration-500 whitespace-nowrap ${
                activeCategory === cat.label 
                  ? 'bg-[#fbc02d] text-black shadow-[0_0_20px_rgba(251,192,45,0.4)] -translate-y-1' 
                  : 'bg-white/5 text-stone-500 hover:text-white border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <BookMenu 
          items={MENU_ITEMS} 
          onAddToCart={addToCart} 
          currentPageIndex={currentPageIndex}
          setCurrentPageIndex={setCurrentPageIndex}
        />

        <p className="hidden sm:block mt-12 text-[#fbc02d]/40 text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">
          Feuilletez notre carte • Cliquez pour tourner
        </p>
      </main>

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        onUpdateQuantity={updateCartQuantity}
      />
      
      <div className="assistant-custom">
        <AIAssistant />
      </div>
    </div>
  );
};

export default App;
