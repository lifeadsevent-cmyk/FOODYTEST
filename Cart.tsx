
import React from 'react';
import { CartItem } from '../types';
import { XIcon, PlusIcon, MinusIcon, ShoppingCartIcon } from './Icons';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onUpdateQuantity }) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[#1a1a1d] shadow-2xl flex flex-col transform transition-transform duration-300 border-l border-white/5">
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-[#121212]">
          <div className="flex items-center gap-4">
            <ShoppingCartIcon className="w-6 h-6 text-[#fbc02d]" />
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Votre Sélection</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <XIcon className="w-6 h-6 text-stone-500" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-8 custom-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-stone-600 gap-4">
              <ShoppingCartIcon className="w-16 h-16 opacity-10" />
              <p className="text-sm font-bold uppercase tracking-[0.2em]">Panier Vide</p>
            </div>
          ) : (
            <div className="space-y-8">
              {items.map(item => (
                <div key={item.id} className="flex gap-5 group items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#fbc02d]/20">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between mb-1">
                      <h4 className="font-bold text-white text-sm">{item.name}</h4>
                      <span className="font-bold text-[#fbc02d]">{(item.price * item.quantity)}€</span>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center bg-white/5 rounded-full overflow-hidden h-7 border border-white/10">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-3 hover:bg-[#fbc02d] hover:text-black transition-colors"
                        >
                          <MinusIcon className="w-3 h-3" />
                        </button>
                        <span className="px-3 font-black text-xs min-w-[32px] text-center text-white">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-3 hover:bg-[#fbc02d] hover:text-black transition-colors"
                        >
                          <PlusIcon className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-8 bg-[#121212] border-t border-white/5 space-y-6">
            <div className="space-y-2">
                <div className="flex justify-between items-center text-stone-500 text-xs uppercase tracking-widest font-bold">
                    <span>Sous-total</span>
                    <span className="text-white">{total}€</span>
                </div>
                <div className="flex justify-between items-center text-stone-500 text-xs uppercase tracking-widest font-bold">
                    <span>Service</span>
                    <span className="text-[#fbc02d]">Offert</span>
                </div>
            </div>
            <div className="flex justify-between items-center text-3xl font-black text-white pt-4 border-t border-white/10">
              <span className="uppercase tracking-tighter">Total</span>
              <span className="text-[#fbc02d]">{total}€</span>
            </div>
            
            <button className="w-full bg-[#fbc02d] text-black py-5 rounded-none font-black uppercase tracking-[0.2em] text-sm hover:bg-white transition-all shadow-2xl active:scale-95">
              Confirmer la commande
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
