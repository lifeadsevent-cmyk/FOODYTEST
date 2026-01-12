
import React, { useState } from 'react';
import { MenuItem } from '../types';
import { PlusIcon, XIcon } from './Icons';

interface MenuItemRowProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  onShowDetails: (item: MenuItem) => void;
}

const MenuItemRow: React.FC<MenuItemRowProps> = ({ 
  item, 
  onAddToCart, 
  onShowDetails 
}) => (
  <div 
    className="flex items-center gap-3 mb-4 sm:mb-5 group cursor-pointer pointer-events-auto" 
    onClick={(e) => { e.stopPropagation(); onShowDetails(item); }}
  >
    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-[#fbc02d]/30 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
    </div>

    <div className="flex flex-col flex-grow min-w-0">
      <div className="flex items-center justify-between w-full">
        <span className="font-bold text-white text-[13px] sm:text-[15px] tracking-wide group-hover:text-[#fbc02d] transition-colors truncate">{item.name}</span>
        <div className="leader-dots"></div>
        <span className="font-bold text-[#fbc02d] text-sm sm:text-base ml-2">{item.price}.0€</span>
      </div>
      <p className="text-[9px] text-stone-400 mt-0.5 italic line-clamp-1">{item.description}</p>
    </div>
    
    <button 
      onClick={(e) => { e.stopPropagation(); onAddToCart(item); }}
      className="p-1.5 bg-white/5 hover:bg-[#fbc02d] text-stone-400 hover:text-black rounded-full transition-all active:scale-90"
    >
      <PlusIcon className="w-3.5 h-3.5" />
    </button>
  </div>
);

const Ornament = ({ className }: { className: string }) => (
  <div className={`corner-ornament ${className} hidden sm:block`}>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 10C30 10 50 30 50 50C50 70 70 90 90 90" stroke="#fbc02d" strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="10" cy="10" r="2" fill="#fbc02d" />
      <circle cx="90" cy="90" r="2" fill="#fbc02d" />
    </svg>
  </div>
);

interface BookMenuProps {
  items: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
  currentPageIndex: number;
  setCurrentPageIndex: (idx: number) => void;
}

const BookMenu: React.FC<BookMenuProps> = ({ items, onAddToCart, currentPageIndex, setCurrentPageIndex }) => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const entrees = items.filter(i => i.category === 'Entrées');
  const plats = items.filter(i => i.category === 'Plats');
  const desserts = items.filter(i => i.category === 'Desserts');
  const boissons = items.filter(i => i.category === 'Boissons');

  const navigate = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      if (currentPageIndex < 3.5) {
        if (currentPageIndex === 0) setCurrentPageIndex(0.5);
        else if (currentPageIndex === 0.5) setCurrentPageIndex(1);
        else setCurrentPageIndex(currentPageIndex + 1);
      }
    } else {
      if (currentPageIndex > 0) {
        if (currentPageIndex === 1) setCurrentPageIndex(0.5);
        else if (currentPageIndex === 0.5) setCurrentPageIndex(0);
        else setCurrentPageIndex(currentPageIndex - 1);
      }
    }
  };

  return (
    <div className="book-container">
      {/* Modal Détails - Fermeture par clic sur l'image */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 bg-black/95 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="w-full h-full sm:h-auto sm:max-w-lg bg-[#1a1a1d] border-0 sm:border sm:border-[#fbc02d]/20 rounded-none shadow-2xl overflow-y-auto sm:overflow-hidden animate-in"
            onClick={e => e.stopPropagation()}
          >
            <div 
              className="relative h-64 sm:h-96 overflow-hidden cursor-pointer group"
              onClick={() => setSelectedItem(null)}
            >
              <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent"></div>
              <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full">
                <XIcon className="w-5 h-5 text-white" />
              </div>
              <div className="absolute bottom-4 left-0 w-full text-center text-[10px] text-white/50 uppercase tracking-[0.2em] sm:hidden">
                Touchez l'image pour revenir au menu
              </div>
            </div>
            
            <div className="p-6 sm:p-8 relative">
              <Ornament className="top-0 right-0 rotate-90 !opacity-40" />
              <div className="flex justify-between items-end mb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#fbc02d] font-bold mb-1 block">Carte Prestige</span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tighter leading-none">{selectedItem.name}</h3>
                </div>
                <span className="text-2xl sm:text-3xl font-black text-[#fbc02d]">{selectedItem.price}.0€</span>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-stone-500 mb-3">Composition</h4>
                  <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
                    {selectedItem.ingredients.map((ing, idx) => (
                      <li key={idx} className="text-[11px] sm:text-xs text-stone-300 flex items-start gap-2">
                        <span className="text-[#fbc02d]">•</span> {ing}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-xs sm:text-sm text-stone-400 italic leading-relaxed pt-4 border-t border-white/5">
                  "{selectedItem.description}"
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button 
                    onClick={() => {
                      onAddToCart(selectedItem);
                      setSelectedItem(null);
                    }}
                    className="flex-[2] bg-[#fbc02d] text-black py-4 font-black uppercase tracking-widest text-[11px] hover:bg-white transition-all active:scale-95"
                  >
                    Ajouter au panier
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative w-full h-full flex items-center justify-center">
        <div className="book-shadow"></div>
        
        {/* Navigation Zones - Déplacées ici pour être toujours accessibles */}
        <div className="nav-zone nav-prev" onClick={() => navigate('prev')}></div>
        <div className="nav-zone nav-next" onClick={() => navigate('next')}></div>

        <div className="book" style={{ transform: (currentPageIndex > 0.5 && window.innerWidth > 640) ? 'translateX(25%)' : 'none' }}>
          
          {/* FEUILLE 3 (Boissons) */}
          <div className={`sheet ${currentPageIndex >= 3 ? 'flipped' : ''}`} style={{ zIndex: 1 }}>
            <div className="page page-front custom-scrollbar overflow-y-auto">
                <Ornament className="top-0 right-0 rotate-90" />
                <h2 className="text-2xl sm:text-3xl font-black yellow-accent mb-6 uppercase tracking-tighter">Boissons</h2>
                <div className="space-y-1">
                  {boissons.map(item => <MenuItemRow key={item.id} item={item} onAddToCart={onAddToCart} onShowDetails={setSelectedItem} />)}
                </div>
                <div className="wave-footer"></div>
                <div className="absolute bottom-2 left-0 w-full text-center text-[9px] text-stone-900 font-bold uppercase">P.05</div>
            </div>
            <div className="page page-back bg-[#1a1a1d] flex flex-col items-center justify-center text-center p-8">
               <div className="border border-[#fbc02d] p-6 relative">
                 <h2 className="text-2xl font-black text-white mb-2 italic">Merci.</h2>
                 <p className="text-[10px] text-[#fbc02d] tracking-[0.3em] uppercase mb-6">À bientôt</p>
                 <div className="text-[8px] text-stone-400 space-y-1 uppercase tracking-widest">
                    <p>www.gourmetprestige.fr</p>
                    <p>Paris • France</p>
                 </div>
               </div>
               <div className="wave-footer !bg-[#222]"></div>
            </div>
          </div>

          {/* FEUILLE 2 (Plats & Desserts) */}
          <div className={`sheet ${currentPageIndex >= 2 ? 'flipped' : ''}`} style={{ zIndex: 2 }}>
            <div className="page page-front custom-scrollbar overflow-y-auto">
                <Ornament className="top-0 right-0 rotate-90" />
                <h2 className="text-2xl sm:text-3xl font-black yellow-accent mb-6 uppercase tracking-tighter">Plats</h2>
                <div className="space-y-1">
                  {plats.map(item => <MenuItemRow key={item.id} item={item} onAddToCart={onAddToCart} onShowDetails={setSelectedItem} />)}
                </div>
                <div className="wave-footer"></div>
                <div className="absolute bottom-2 left-0 w-full text-center text-[9px] text-stone-900 font-bold uppercase">P.03</div>
            </div>
            <div className="page page-back custom-scrollbar overflow-y-auto">
                <Ornament className="top-0 left-0 rotate-180" />
                <h2 className="text-2xl sm:text-3xl font-black yellow-accent mb-6 uppercase tracking-tighter">Desserts</h2>
                <div className="space-y-1">
                  {desserts.map(item => <MenuItemRow key={item.id} item={item} onAddToCart={onAddToCart} onShowDetails={setSelectedItem} />)}
                </div>
                <div className="wave-footer"></div>
                <div className="absolute bottom-2 left-0 w-full text-center text-[9px] text-stone-900 font-bold uppercase">P.04</div>
            </div>
          </div>

          {/* FEUILLE 1 (Intro & Entrées) */}
          <div className={`sheet ${currentPageIndex >= 1 ? 'flipped' : ''}`} style={{ zIndex: 3 }}>
            <div className="page page-front">
                <div className="flex-grow flex flex-col items-center justify-center text-center px-4 relative">
                  <span className="font-cursive text-2xl yellow-accent mb-2">Héritage</span>
                  <p className="text-stone-300 text-[11px] leading-relaxed max-w-[250px]">
                    L'excellence de la gastronomie française à votre table.
                  </p>
                  <div className="mt-8 grid grid-cols-2 gap-3 w-full px-4">
                    <div className="aspect-square bg-[#222] border border-[#fbc02d]/20 rounded-full p-2">
                        <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=300&q=80" className="rounded-full w-full h-full object-cover grayscale" alt="Food" />
                    </div>
                    <div className="aspect-square bg-[#222] border border-[#fbc02d]/20 rounded-full p-2">
                        <img src="https://images.unsplash.com/photo-1476224489421-38c584e8d1fe?auto=format&fit=crop&w=300&q=80" className="rounded-full w-full h-full object-cover grayscale" alt="Food" />
                    </div>
                  </div>
                </div>
                <div className="wave-footer"></div>
                <div className="absolute bottom-2 left-0 w-full text-center text-[9px] text-stone-900 font-bold uppercase">P.01</div>
            </div>
            <div className="page page-back custom-scrollbar overflow-y-auto">
                <Ornament className="top-0 left-0 rotate-180" />
                <h2 className="text-2xl sm:text-3xl font-black yellow-accent mb-6 uppercase tracking-tighter">Entrées</h2>
                <div className="space-y-1">
                  {entrees.map(item => <MenuItemRow key={item.id} item={item} onAddToCart={onAddToCart} onShowDetails={setSelectedItem} />)}
                </div>
                <div className="wave-footer"></div>
                <div className="absolute bottom-2 left-0 w-full text-center text-[9px] text-stone-900 font-bold uppercase">P.02</div>
            </div>
          </div>

          {/* FEUILLE 0 (Couverture) */}
          <div className={`sheet ${currentPageIndex >= 0.5 ? 'flipped' : ''}`} style={{ zIndex: 4 }}>
            <div className="page page-front !p-0">
                <div className="h-[55%] w-full relative bg-[#121212] flex items-center justify-center">
                    <div className="absolute inset-0 opacity-40">
                         <img src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover" alt="Main dish" />
                    </div>
                    <div className="relative z-10 text-center px-4">
                        <span className="font-cursive text-3xl yellow-accent block mb-2">Menu</span>
                        <h1 className="text-5xl font-black text-white leading-none tracking-tighter uppercase">GOURMET<br/><span className="yellow-accent">PRESTIGE</span></h1>
                        <div className="mt-4 inline-block px-4 py-1 border border-[#fbc02d] text-[8px] yellow-accent uppercase tracking-[0.2em]">Saison 2025</div>
                    </div>
                </div>
                <div className="h-[45%] bg-[#1a1a1d] p-6 flex flex-col justify-end relative">
                    <div className="wave-footer !h-32"></div>
                    <div className="relative z-10 flex justify-between items-end mb-4">
                        <div className="text-[8px] text-stone-900 font-bold uppercase leading-tight">
                            <p>Art de vivre</p>
                            <p>Paris • France</p>
                        </div>
                        <div className="text-[8px] text-stone-900 font-bold uppercase leading-tight text-right">
                            <p>Service Premium</p>
                            <p>01 23 45 67 89</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="page page-back flex flex-col items-center justify-center p-6 bg-[#1a1a1d]">
               <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#fbc02d] shadow-2xl mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=400&q=80" 
                    className="w-full h-full object-cover"
                    alt="Chef"
                  />
               </div>
               <h3 className="font-cursive text-2xl yellow-accent mb-4">Le Mot du Chef</h3>
               <p className="text-[10px] text-stone-400 text-center leading-relaxed italic max-w-xs">
                 "Chaque ingrédient est choisi pour sa pureté, chaque plat est une émotion partagée."
               </p>
               <div className="mt-8 h-px w-16 bg-[#fbc02d]/30"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BookMenu;
