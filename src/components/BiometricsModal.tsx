import React, { useState } from 'react';
import { UserProfile } from '../types';

interface BiometricsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSave: (updated: Partial<UserProfile>) => void;
}

export const BiometricsModal: React.FC<BiometricsModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
}) => {
  const [name, setName] = useState(profile.name);
  const [age, setAge] = useState(profile.age);
  const [heightCm, setHeightCm] = useState(profile.heightCm);
  const [currentWeightKg, setCurrentWeightKg] = useState(profile.currentWeightKg);
  const [targetWeightKg, setTargetWeightKg] = useState(profile.targetWeightKg);
  const [activityLevel, setActivityLevel] = useState(profile.activityLevel);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Calculate updated metrics
    const heightM = heightCm / 100;
    const newBmi = Number((currentWeightKg / (heightM * heightM)).toFixed(1));
    const newTargetBmi = Number((targetWeightKg / (heightM * heightM)).toFixed(1));

    // Mifflin-St Jeor equation for women (Amanda):
    // BMR = 10 * weight(kg) + 6.25 * height(cm) - 5 * age - 161
    const newBmr = Math.round(10 * currentWeightKg + 6.25 * heightCm - 5 * age - 161);
    
    let multiplier = 1.375; // moderate default
    if (activityLevel.includes('Sedang')) multiplier = 1.55;
    else if (activityLevel.includes('Sangat')) multiplier = 1.725;
    else if (activityLevel.includes('Ringan')) multiplier = 1.375;
    else multiplier = 1.2;

    const newTdee = Math.round(newBmr * multiplier);
    const deficit = -500;
    const targetCalories = newTdee + deficit;

    // Remaining weeks estimate with safe ~0.75 kg/week
    const weightToLose = Math.max(0, currentWeightKg - targetWeightKg);
    const newWeeks = Math.ceil(weightToLose / 0.75) || 12;

    onSave({
      name,
      age: Number(age),
      heightCm: Number(heightCm),
      currentWeightKg: Number(currentWeightKg),
      targetWeightKg: Number(targetWeightKg),
      activityLevel,
      bmi: newBmi,
      targetBmi: newTargetBmi,
      bmr: newBmr,
      tdee: newTdee,
      targetCalories,
      weeksRemaining: newWeeks,
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
              tune
            </span>
            <h3 className="text-lg font-bold text-on-surface">Edit Data Biometrik</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-on-surface-variant block mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-on-surface-variant block mb-1">
                Usia (tahun)
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                min={15}
                max={99}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-on-surface-variant block mb-1">
                Tinggi Badan (cm)
              </label>
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                min={120}
                max={220}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-on-surface-variant block mb-1">
                Berat Saat Ini (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={currentWeightKg}
                onChange={(e) => setCurrentWeightKg(Number(e.target.value))}
                min={35}
                max={250}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-on-surface-variant block mb-1">
                Target Ideal (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={targetWeightKg}
                onChange={(e) => setTargetWeightKg(Number(e.target.value))}
                min={35}
                max={200}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-on-surface-variant block mb-1">
              Frekuensi Aktivitas Fisik
            </label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
            >
              <option value="Aktivitas Ringan (1-2x/minggu)">Aktivitas Ringan (1-2x/minggu)</option>
              <option value="Aktivitas Sedang (3-4x/minggu)">Aktivitas Sedang (3-4x/minggu)</option>
              <option value="Aktivitas Tinggi (5-6x/minggu)">Aktivitas Tinggi (5-6x/minggu)</option>
              <option value="Sangat Aktif / Atlet (Setiap hari)">Sangat Aktif / Atlet (Setiap hari)</option>
            </select>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-full bg-primary text-on-primary font-bold text-sm shadow-md hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">check</span>
              <span>Perbarui Data &amp; Hitung Ulang</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
