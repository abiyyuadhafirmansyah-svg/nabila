import React, { useState } from 'react';
import { UserProfile } from '../types';

interface DietPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSave: (updated: Partial<UserProfile>) => void;
}

export const DietPlanModal: React.FC<DietPlanModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
}) => {
  const [deficit, setDeficit] = useState(profile.deficit); // -300, -500, -750
  const [macroPreset, setMacroPreset] = useState<'high-protein' | 'balanced' | 'low-carb'>('high-protein');

  if (!isOpen) return null;

  const handleApply = () => {
    const targetCalories = profile.tdee + deficit;

    let proteinPercent = 0.30;
    let carbsPercent = 0.45;
    let fatPercent = 0.25;

    if (macroPreset === 'balanced') {
      proteinPercent = 0.25;
      carbsPercent = 0.50;
      fatPercent = 0.25;
    } else if (macroPreset === 'low-carb') {
      proteinPercent = 0.35;
      carbsPercent = 0.30;
      fatPercent = 0.35;
    }

    const proteinG = Math.round((targetCalories * proteinPercent) / 4);
    const carbsG = Math.round((targetCalories * carbsPercent) / 4);
    const fatG = Math.round((targetCalories * fatPercent) / 9);

    const weeklyPaceKg = Math.abs(deficit) === 300 ? 0.4 : Math.abs(deficit) === 500 ? 0.75 : 1.0;
    const weightToLose = Math.max(0, profile.currentWeightKg - profile.targetWeightKg);
    const weeksRemaining = Math.ceil(weightToLose / weeklyPaceKg) || 12;

    onSave({
      deficit,
      targetCalories,
      proteinG,
      carbsG,
      fatG,
      weeklyPaceKg,
      weeksRemaining,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-surface-container-lowest rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1.5 bg-surface-container-highest rounded-full mx-auto sm:hidden" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">
              local_fire_department
            </span>
            <h3 className="text-lg font-bold text-on-surface">
              Target Defisit &amp; Diet Plan
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <p className="text-xs text-on-surface-variant -mt-1 leading-relaxed">
          Pilih ritme defisit yang aman dan berkelanjutan sesuai standar Harris-Benedict revisi Mifflin-St Jeor.
        </p>

        {/* Deficit Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">
            Ritme Defisit Kalori
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setDeficit(-300)}
              className={`p-3 rounded-2xl border text-center transition-all ${
                deficit === -300
                  ? 'border-primary bg-primary/10 text-primary font-bold shadow-sm ring-1 ring-primary'
                  : 'border-surface-container-high bg-surface-container-low text-on-surface hover:bg-surface-container'
              }`}
            >
              <span className="block text-sm font-bold">-300 kkal</span>
              <span className="block text-[10px] text-on-surface-variant mt-0.5">Santai (~0.4 kg/mgg)</span>
            </button>
            <button
              type="button"
              onClick={() => setDeficit(-500)}
              className={`p-3 rounded-2xl border text-center transition-all ${
                deficit === -500
                  ? 'border-primary bg-primary/10 text-primary font-bold shadow-sm ring-1 ring-primary'
                  : 'border-surface-container-high bg-surface-container-low text-on-surface hover:bg-surface-container'
              }`}
            >
              <span className="block text-sm font-bold">-500 kkal</span>
              <span className="block text-[10px] text-primary font-semibold mt-0.5">Ideal (~0.75 kg/mgg)</span>
            </button>
            <button
              type="button"
              onClick={() => setDeficit(-700)}
              className={`p-3 rounded-2xl border text-center transition-all ${
                deficit === -700
                  ? 'border-primary bg-primary/10 text-primary font-bold shadow-sm ring-1 ring-primary'
                  : 'border-surface-container-high bg-surface-container-low text-on-surface hover:bg-surface-container'
              }`}
            >
              <span className="block text-sm font-bold">-700 kkal</span>
              <span className="block text-[10px] text-on-surface-variant mt-0.5">Cepat (~1.0 kg/mgg)</span>
            </button>
          </div>
        </div>

        {/* Macro Composition Preset */}
        <div className="space-y-2 pt-1">
          <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">
            Distribusi Makronutrisi
          </label>
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setMacroPreset('high-protein')}
              className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                macroPreset === 'high-protein'
                  ? 'border-primary bg-primary/10 text-primary font-semibold ring-1 ring-primary'
                  : 'border-surface-container-high bg-surface-container-low text-on-surface'
              }`}
            >
              <div>
                <span className="text-sm font-bold block">Tinggi Protein (Cut Terarah)</span>
                <span className="text-xs text-on-surface-variant block mt-0.5">
                  Protein 30% • Karbo 45% • Lemak 25% (Mencegah susut massa otot)
                </span>
              </div>
              {macroPreset === 'high-protein' && (
                <span className="material-symbols-outlined text-primary text-[20px]">
                  check_circle
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMacroPreset('balanced')}
              className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                macroPreset === 'balanced'
                  ? 'border-primary bg-primary/10 text-primary font-semibold ring-1 ring-primary'
                  : 'border-surface-container-high bg-surface-container-low text-on-surface'
              }`}
            >
              <div>
                <span className="text-sm font-bold block">Nutrisi Seimbang Standar</span>
                <span className="text-xs text-on-surface-variant block mt-0.5">
                  Protein 25% • Karbo 50% • Lemak 25%
                </span>
              </div>
              {macroPreset === 'balanced' && (
                <span className="material-symbols-outlined text-primary text-[20px]">
                  check_circle
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMacroPreset('low-carb')}
              className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                macroPreset === 'low-carb'
                  ? 'border-primary bg-primary/10 text-primary font-semibold ring-1 ring-primary'
                  : 'border-surface-container-high bg-surface-container-low text-on-surface'
              }`}
            >
              <div>
                <span className="text-sm font-bold block">Rendah Karbohidrat</span>
                <span className="text-xs text-on-surface-variant block mt-0.5">
                  Protein 35% • Karbo 30% • Lemak 35%
                </span>
              </div>
              {macroPreset === 'low-carb' && (
                <span className="material-symbols-outlined text-primary text-[20px]">
                  check_circle
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Calculated Projection summary */}
        <div className="bg-surface-container-low p-3.5 rounded-2xl flex items-center justify-between text-xs">
          <span className="text-on-surface-variant font-medium">Asupan Target Baru:</span>
          <span className="text-base font-bold text-primary">
            {profile.tdee + deficit} <span className="text-xs font-normal text-on-surface-variant">kkal/hari</span>
          </span>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={handleApply}
            className="w-full py-3.5 px-4 rounded-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold text-sm shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            <span>Terapkan Diet Plan Ini</span>
          </button>
        </div>
      </div>
    </div>
  );
};
