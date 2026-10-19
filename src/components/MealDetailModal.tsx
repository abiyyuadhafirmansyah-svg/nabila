import React from 'react';
import { MealItem } from '../types';

interface MealDetailModalProps {
  meal: MealItem | null;
  onClose: () => void;
  onToggleComplete?: (mealId: string) => void;
}

export const MealDetailModal: React.FC<MealDetailModalProps> = ({
  meal,
  onClose,
  onToggleComplete,
}) => {
  if (!meal) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-surface-container-lowest rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1.5 bg-surface-container-highest rounded-full mx-auto sm:hidden" />

        <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-surface-container">
          <img
            src={meal.imageUrl}
            alt={meal.title}
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-md hover:bg-black/70 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm text-xs font-semibold text-primary">
            <span>{meal.category}</span>
            <span>•</span>
            <span>{meal.timeStr}</span>
          </div>
        </div>

        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-bold text-on-surface leading-snug">
              {meal.title}
            </h3>
            <span className="text-base font-bold text-primary flex-shrink-0">
              {meal.calories} <span className="text-xs font-normal text-on-surface-variant">kkal</span>
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
            {meal.description}
          </p>
        </div>

        {/* Macro breakdown capsules */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-sky-50 p-2.5 rounded-2xl text-center">
            <span className="text-[11px] font-semibold text-sky-800 block">Protein</span>
            <span className="text-sm font-bold text-sky-950 block mt-0.5">{meal.proteinG}g</span>
          </div>
          <div className="bg-primary/10 p-2.5 rounded-2xl text-center">
            <span className="text-[11px] font-semibold text-primary block">Karbohidrat</span>
            <span className="text-sm font-bold text-on-surface block mt-0.5">{meal.carbsG}g</span>
          </div>
          <div className="bg-amber-50 p-2.5 rounded-2xl text-center">
            <span className="text-[11px] font-semibold text-amber-800 block">Lemak Sehat</span>
            <span className="text-sm font-bold text-amber-950 block mt-0.5">{meal.fatG}g</span>
          </div>
        </div>

        {/* Ingredients list */}
        {meal.ingredients && meal.ingredients.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-on-surface uppercase tracking-wider block">
              Bahan &amp; Takaran
            </span>
            <ul className="space-y-1 text-xs text-on-surface-variant">
              {meal.ingredients.map((ing, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span>{ing}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Toggle complete button */}
        {onToggleComplete && (
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                onToggleComplete(meal.id);
                onClose();
              }}
              className={`w-full py-3 px-4 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                meal.isCompleted
                  ? 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  : 'bg-primary text-on-primary shadow-md hover:bg-primary-container'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {meal.isCompleted ? 'remove_done' : 'check_circle'}
              </span>
              <span>
                {meal.isCompleted ? 'Batalkan Status Selesai' : 'Tandai Sudah Disantap'}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
