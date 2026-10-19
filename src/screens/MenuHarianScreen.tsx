import React, { useState } from 'react';
import { UserProfile, MealItem } from '../types';
import { ALTERNATE_MEALS } from '../data/mockData';

interface MenuHarianScreenProps {
  profile: UserProfile;
  meals: MealItem[];
  onToggleMealSelect: (mealId: string) => void;
  onSwapMeal: (mealId: string, alternate: MealItem) => void;
  onRegenerateMenu: () => void;
  onOpenGrocery: () => void;
  onSelectMealDetail: (meal: MealItem) => void;
  onShowToast: (msg: string) => void;
}

interface DateChip {
  dayName: string;
  dayNum: number;
}

const DAYS: DateChip[] = [
  { dayName: 'Sen', dayNum: 24 },
  { dayName: 'Sel', dayNum: 25 },
  { dayName: 'Rab', dayNum: 26 },
  { dayName: 'KAM', dayNum: 27 },
  { dayName: 'Jum', dayNum: 28 },
  { dayName: 'Sab', dayNum: 29 },
  { dayName: 'Min', dayNum: 30 },
];

export const MenuHarianScreen: React.FC<MenuHarianScreenProps> = ({
  profile,
  meals,
  onToggleMealSelect,
  onSwapMeal,
  onRegenerateMenu,
  onOpenGrocery,
  onSelectMealDetail,
  onShowToast,
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(27);
  const [activeFilters, setActiveFilters] = useState<string[]>([
    'Tinggi Protein',
    '100% Halal',
    'Rendah Gula',
  ]);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const toggleFilter = (tag: string) => {
    if (activeFilters.includes(tag)) {
      setActiveFilters(activeFilters.filter((t) => t !== tag));
      onShowToast(`Filter ${tag} dinonaktifkan`);
    } else {
      setActiveFilters([...activeFilters, tag]);
      onShowToast(`Filter ${tag} aktif`);
    }
  };

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      onRegenerateMenu();
      setIsRegenerating(false);
      onShowToast('✨ Menu harian berhasil dikalkulasi ulang dengan AI!');
    }, 1200);
  };

  const handleSwap = (meal: MealItem) => {
    const alternates = ALTERNATE_MEALS[meal.category];
    if (alternates && alternates.length > 0) {
      const alt = alternates[0];
      onSwapMeal(meal.id, alt);
      onShowToast(`Menu ${meal.category} diganti: ${alt.title}`);
    } else {
      onShowToast(`Alternatif menu ${meal.category} sedang disiapkan`);
    }
  };

  // Calculate total scheduled calories
  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Horizontal Date Chips */}
      <section className="w-full pt-1 pb-2 px-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[18px]">
              calendar_today
            </span>
            <span className="text-xs text-on-surface-variant font-semibold">
              Oktober 2024
            </span>
          </div>
          <button
            type="button"
            className="flex items-center gap-0.5 text-primary text-xs font-semibold hover:underline"
          >
            <span>Bulan Ini</span>
            <span className="material-symbols-outlined text-[14px]">expand_more</span>
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 -mx-5 px-5">
          {DAYS.map((day) => {
            const isActive = selectedDay === day.dayNum;
            return (
              <button
                key={day.dayNum}
                type="button"
                onClick={() => {
                  setSelectedDay(day.dayNum);
                  onShowToast(`Memuat menu untuk ${day.dayName}, ${day.dayNum} Okt`);
                }}
                className={`flex flex-col items-center justify-center min-w-[54px] py-2.5 px-1.5 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-b from-primary to-primary-container text-on-primary shadow-[0_8px_16px_rgba(0,105,72,0.22)] scale-105 font-bold relative'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container font-medium'
                }`}
              >
                <span className="text-[11px] opacity-90">{day.dayName}</span>
                <span className="text-base mt-0.5 font-bold">{day.dayNum}</span>
                {isActive && (
                  <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-secondary-fixed" />
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Filter Preferensi Diet */}
      <section className="w-full px-5 py-2">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => toggleFilter('Tinggi Protein')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-colors ${
              activeFilters.includes('Tinggi Protein')
                ? 'bg-primary/10 text-primary font-bold'
                : 'bg-surface-container text-on-surface-variant'
            }`}
          >
            <span
              className="material-symbols-outlined text-[16px]"
              style={{
                fontVariationSettings: activeFilters.includes('Tinggi Protein')
                  ? "'FILL' 1"
                  : "'FILL' 0",
              }}
            >
              fitness_center
            </span>
            <span>Tinggi Protein</span>
          </button>

          <button
            type="button"
            onClick={() => toggleFilter('100% Halal')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-colors ${
              activeFilters.includes('100% Halal')
                ? 'bg-primary/10 text-primary font-bold'
                : 'bg-surface-container text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span>100% Halal</span>
          </button>

          <button
            type="button"
            onClick={() => toggleFilter('Rendah Gula')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-colors ${
              activeFilters.includes('Rendah Gula')
                ? 'bg-primary/10 text-primary font-bold'
                : 'bg-surface-container text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">water_drop</span>
            <span>Rendah Gula</span>
          </button>

          <button
            type="button"
            onClick={() => onShowToast('Preferensi diet disinkronkan dengan profil')}
            className="flex items-center gap-1 text-on-surface-variant bg-surface-container-lowest px-2.5 py-1.5 rounded-full shadow-sm text-xs font-semibold hover:bg-surface-container-low"
          >
            <span className="material-symbols-outlined text-[16px]">tune</span>
            <span>Ubah</span>
          </button>
        </div>
      </section>

      {/* Calorie & Macro Target Banner (Personalized Card) */}
      <section className="w-full px-5 mt-2">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-surface-container-lowest via-surface-container-low to-secondary-container/20 p-5 shadow-[0_12px_28px_-6px_rgba(0,105,72,0.08)] border border-surface-container-high/40">
          <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-primary/5 blur-2xl pointer-events-none" />

          {/* Top Profile Context */}
          <div className="flex items-start justify-between gap-3 relative z-10 mb-4">
            <div>
              <div className="flex items-center gap-1.5 text-primary mb-1">
                <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                <span className="text-[11px] font-bold tracking-wider uppercase">
                  Disesuaikan untukmu
                </span>
              </div>
              <h2 className="text-xl text-on-surface font-bold">Rencana Nutrisi Hari Ini</h2>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Defisit Terkontrol • TB {profile.heightCm} cm • BB {profile.currentWeightKg.toFixed(0)} kg → Target {profile.targetWeightKg.toFixed(0)} kg
              </p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-2xl font-bold text-primary leading-none">
                {profile.targetCalories.toLocaleString('id-ID')}
              </span>
              <span className="text-[11px] text-on-surface-variant font-medium mt-1">
                kkal / hari
              </span>
            </div>
          </div>

          {/* Macro Split Progress Graphic */}
          <div className="space-y-2 relative z-10 bg-surface-container-lowest/80 backdrop-blur-md rounded-2xl p-3.5 shadow-sm border border-surface-container-high/30">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-on-surface-variant font-semibold">
                Komposisi Makronutrien Harian
              </span>
              <span className="text-primary font-bold">
                Defisit Sehat ({profile.deficit} kkal)
              </span>
            </div>

            {/* Segmented Multi-Color Track */}
            <div className="h-3 w-full bg-surface-container-high rounded-full overflow-hidden flex p-0.5 gap-0.5">
              <div className="h-full bg-sky-500 rounded-l-full" style={{ width: '30%' }} title="Protein 30%" />
              <div className="h-full bg-primary" style={{ width: '45%' }} title="Karbohidrat 45%" />
              <div className="h-full bg-amber-500 rounded-r-full" style={{ width: '25%' }} title="Lemak Sehat 25%" />
            </div>

            {/* Macro Breakdown Chips */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              <div className="flex flex-col items-center bg-sky-50 rounded-xl py-1.5 px-1">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  <span className="text-[11px] text-sky-800 font-semibold">Protein</span>
                </div>
                <span className="text-xs font-bold text-sky-900 mt-0.5">
                  {profile.proteinG}g <span className="text-[10px] text-sky-700 font-normal">(30%)</span>
                </span>
              </div>
              <div className="flex flex-col items-center bg-secondary-container/25 rounded-xl py-1.5 px-1">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-[11px] text-primary font-semibold">Karbo</span>
                </div>
                <span className="text-xs font-bold text-on-primary-fixed-variant mt-0.5">
                  {profile.carbsG}g <span className="text-[10px] text-primary font-normal">(45%)</span>
                </span>
              </div>
              <div className="flex flex-col items-center bg-amber-50 rounded-xl py-1.5 px-1">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-[11px] text-amber-800 font-semibold">Lemak</span>
                </div>
                <span className="text-xs font-bold text-amber-900 mt-0.5">
                  {profile.fatG}g <span className="text-[10px] text-amber-700 font-normal">(25%)</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meal Cards Container */}
      <section className="w-full px-5 mt-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span
              className="material-symbols-outlined text-primary text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              restaurant_menu
            </span>
            <h3 className="text-base font-bold text-on-surface">Jadwal Makan Terjadwal</h3>
          </div>
          <span className="text-[11px] bg-surface-container text-on-surface-variant font-semibold px-2.5 py-1 rounded-full">
            {meals.length} Sesi • {totalCalories} / {profile.targetCalories} kkal
          </span>
        </div>

        {/* List of 4 scheduled meal cards */}
        {meals.map((meal) => {
          const isSelected = meal.isSelected !== false;

          return (
            <article
              key={meal.id}
              className="bg-surface-container-lowest rounded-3xl p-4 shadow-[0_8px_20px_-4px_rgba(0,105,72,0.06)] border border-surface-container-high/40 flex flex-col gap-3 transition-all hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      meal.category === 'Sarapan'
                        ? 'bg-amber-100 text-amber-700'
                        : meal.category === 'Makan Siang'
                        ? 'bg-amber-100 text-amber-700'
                        : meal.category === 'Camilan Sore'
                        ? 'bg-sky-100 text-sky-700'
                        : 'bg-indigo-100 text-indigo-700'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {meal.category === 'Sarapan'
                        ? 'wb_twilight'
                        : meal.category === 'Makan Siang'
                        ? 'wb_sunny'
                        : meal.category === 'Camilan Sore'
                        ? 'coffee'
                        : 'nights_stay'}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-on-surface">
                        {meal.category === 'Sarapan' ? 'Sarapan Pagi' : meal.category}
                      </span>
                      {meal.badge && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            meal.badge.includes('Chef')
                              ? 'bg-secondary-fixed text-on-secondary-fixed'
                              : 'bg-sky-100 text-sky-800'
                          }`}
                        >
                          {meal.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-on-surface-variant block">
                      Target: {meal.calories + 20} kkal • {meal.timeStr}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-secondary-container/20 text-on-secondary-container px-2.5 py-1 rounded-full">
                  <span className="text-xs font-bold">{meal.calories}</span>
                  <span className="text-[11px]">kkal</span>
                </div>
              </div>

              {/* Meal main content */}
              <div
                className="flex gap-3 cursor-pointer"
                onClick={() => onSelectMealDetail(meal)}
              >
                <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-surface-container relative">
                  <img
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    src={meal.imageUrl}
                    alt={meal.title}
                  />
                  {isSelected && (
                    <div className="absolute top-1.5 left-1.5 w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shadow-sm">
                      <span className="material-symbols-outlined text-[12px]">check</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    {meal.kicker && (
                      <div className="inline-block mb-1">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                            meal.kicker.includes('Malam')
                              ? 'text-indigo-800 bg-indigo-50'
                              : 'text-primary bg-primary/10'
                          }`}
                        >
                          {meal.kicker}
                        </span>
                      </div>
                    )}
                    <h4 className="text-xs font-bold text-on-surface line-clamp-2 leading-snug">
                      {meal.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className="text-[11px] text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md font-semibold">
                        {meal.proteinG}g Protein
                      </span>
                      <span className="text-[11px] text-primary bg-primary/10 px-2 py-0.5 rounded-md font-semibold">
                        {meal.carbsG}g Karbo
                      </span>
                      <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                        {meal.fatG}g Lemak
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-on-surface-variant/80 mt-1 line-clamp-1">
                    {meal.description}
                  </p>
                </div>
              </div>

              {/* Buttons: Pilih Menu Ini & Ganti */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => onToggleMealSelect(meal.id)}
                  className={`flex-1 py-2.5 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all ${
                    isSelected
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isSelected ? 'check_circle' : 'radio_button_unchecked'}
                  </span>
                  <span>{isSelected ? 'Menu Dipilih' : 'Pilih Menu Ini'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSwap(meal)}
                  className="py-2.5 px-3.5 rounded-full bg-surface-container text-on-surface-variant text-xs font-semibold flex items-center justify-center gap-1 hover:bg-surface-container-high active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">cached</span>
                  <span>Ganti</span>
                </button>
              </div>
            </article>
          );
        })}
      </section>

      {/* Smart Action Buttons: AI Regenerate & Grocery List */}
      <section className="w-full px-5 mt-6 flex flex-col gap-3">
        {/* Regenerate with AI Button */}
        <button
          type="button"
          onClick={handleRegenerate}
          disabled={isRegenerating}
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-primary to-primary-container text-on-primary text-sm font-bold flex items-center justify-center gap-2.5 shadow-[0_10px_20px_rgba(0,105,72,0.2)] active:scale-[0.98] transition-all hover:shadow-[0_12px_24px_rgba(0,105,72,0.3)] disabled:opacity-80"
        >
          <span
            className={`material-symbols-outlined text-[22px] ${
              isRegenerating ? 'animate-spin' : ''
            }`}
          >
            {isRegenerating ? 'refresh' : 'psychology'}
          </span>
          <span>
            {isRegenerating ? 'Mengalkulasi Rekomendasi Menu...' : 'Buat Ulang Menu dengan AI'}
          </span>
          {!isRegenerating && (
            <span className="bg-primary-fixed text-on-primary-fixed text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Instan
            </span>
          )}
        </button>

        {/* Grocery List Generator Button */}
        <button
          type="button"
          onClick={onOpenGrocery}
          className="w-full py-3.5 px-4 rounded-2xl bg-surface-container-lowest text-on-surface text-sm font-semibold flex items-center justify-between shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-surface-container-high/40 hover:bg-surface-container-low active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary-container/40 text-on-secondary-container flex items-center justify-center">
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_mall
              </span>
            </div>
            <div className="text-left">
              <span className="block text-on-surface font-bold text-xs">
                Daftar Belanja Bahan
              </span>
              <span className="block text-[11px] text-on-surface-variant">
                12 bahan untuk 4 menu hari ini
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-primary">
            <span className="text-xs font-bold">Lihat</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </div>
        </button>
      </section>

      {/* Nutrition Tip Card */}
      <section className="w-full px-5 mt-5">
        <div className="bg-surface-container-low rounded-3xl p-4 flex items-start gap-3 border border-surface-container-high/30">
          <div className="p-2 rounded-2xl bg-secondary-container text-on-secondary-container flex-shrink-0">
            <span className="material-symbols-outlined text-[20px]">lightbulb</span>
          </div>
          <div>
            <h5 className="text-xs font-bold text-on-surface">Tips Nutrisi Hari Ini</h5>
            <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
              Konsumsi air minimal 2,5 liter hari ini untuk memaksimalkan metabolisme protein tinggi dan membantu percepatan target penurunan dari {profile.currentWeightKg.toFixed(0)} kg ke {profile.targetWeightKg.toFixed(0)} kg!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
