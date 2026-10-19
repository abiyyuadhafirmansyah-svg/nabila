import React from 'react';
import { GroceryItem } from '../types';

interface GroceryModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: GroceryItem[];
  onToggleItem: (id: string) => void;
  onCopySuccess: () => void;
}

export const GroceryModal: React.FC<GroceryModalProps> = ({
  isOpen,
  onClose,
  items,
  onToggleItem,
  onCopySuccess,
}) => {
  if (!isOpen) return null;

  const categories = ['Protein & Daging', 'Sayuran & Buah', 'Bahan Pokok & Bumbu'] as const;

  const handleCopy = () => {
    const textLines = ['📋 *Daftar Belanja NutriFit - Menu Diet Sehat*:\n'];
    categories.forEach((cat) => {
      const catItems = items.filter((i) => i.category === cat);
      if (catItems.length > 0) {
        textLines.push(`*${cat}:*`);
        catItems.forEach((item) => {
          textLines.push(`${item.checked ? '✅' : '⬜'} ${item.name}`);
        });
        textLines.push('');
      }
    });

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(textLines.join('\n'));
    }
    onCopySuccess();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end justify-center transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-surface-container-lowest rounded-t-3xl p-5 shadow-2xl flex flex-col gap-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Grab handle */}
        <div className="w-12 h-1.5 bg-surface-container-highest rounded-full mx-auto" />

        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">
              shopping_cart_checkout
            </span>
            <h4 className="text-lg font-bold text-on-surface">
              Daftar Belanja Terorganisir
            </h4>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
            aria-label="Tutup Daftar Belanja"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <p className="text-xs text-on-surface-variant -mt-2">
          Centang bahan yang sudah kamu miliki atau salin daftar lengkap untuk berbelanja.
        </p>

        {/* Items List grouped by Category */}
        <div className="space-y-4 my-1">
          {categories.map((cat) => {
            const catItems = items.filter((i) => i.category === cat);
            if (catItems.length === 0) return null;
            return (
              <div key={cat} className="space-y-2">
                <span className="text-[11px] font-bold text-primary uppercase tracking-wider block">
                  {cat}
                </span>
                <div className="space-y-1.5">
                  {catItems.map((item) => (
                    <label
                      key={item.id}
                      className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-colors ${
                        item.checked
                          ? 'bg-surface-container-low/60 text-on-surface'
                          : 'bg-surface-container-low hover:bg-surface-container text-on-surface font-medium'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => onToggleItem(item.id)}
                        className="w-4 h-4 accent-primary rounded cursor-pointer"
                      />
                      <span
                        className={`text-sm select-none ${
                          item.checked ? 'line-through text-outline' : 'text-on-surface'
                        }`}
                      >
                        {item.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="pt-2 sticky bottom-0 bg-surface-container-lowest pb-1">
          <button
            type="button"
            onClick={handleCopy}
            className="w-full py-3.5 px-4 rounded-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold text-sm shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">content_copy</span>
            <span>Salin ke Catatan / WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
