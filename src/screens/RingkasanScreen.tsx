import React from 'react';
import { TabId, UserProfile, MealItem } from '../types';

interface RingkasanScreenProps {
  profile: UserProfile;
  meals: MealItem[];
  waterMl: number;
  onAddWater: (ml: number) => void;
  onNavigateTab: (tab: TabId) => void;
  onSelectMealDetail: (meal: MealItem) => void;
}

export const RingkasanScreen: React.FC<RingkasanScreenProps> = ({
  profile,
  meals,
  waterMl,
  onAddWater,
  onNavigateTab,
  onSelectMealDetail,
}) => {
  // Calculate consumed calories and macros from completed meals
  const completedMeals = meals.filter((m) => m.isCompleted);
  const totalCaloriesConsumed = completedMeals.reduce((acc, m) => acc + m.calories, 0);
  const remainingCalories = Math.max(0, profile.targetCalories - totalCaloriesConsumed);
  const burnedCalories = 340;
  const netDeficit = -(burnedCalories + (profile.tdee - profile.targetCalories));

  // Circular gauge calculation (circumference of r=50 is 314.16)
  const maxCal = profile.targetCalories || 1850;
  const calPercent = Math.min(1, totalCaloriesConsumed / maxCal);
  const strokeDashoffset = 314.16 * (1 - calPercent);

  // Water calculation
  const targetWater = 2500;
  const waterPercent = Math.min(100, Math.round((waterMl / targetWater) * 100));

  // Weight progress bar calculation
  const startW = profile.startWeightKg || 76.5;
  const currentW = profile.currentWeightKg || 74.0;
  const targetW = profile.targetWeightKg || 65.0;
  const weightProgress = Math.min(
    100,
    Math.max(0, Math.round(((startW - currentW) / (startW - targetW)) * 100))
  );

  return (
    <div className="flex flex-col w-full px-5 space-y-4">
      {/* Greeting & Motivational Status Card */}
      <div className="relative overflow-hidden bg-surface-container-lowest rounded-3xl p-4 shadow-sm border border-surface-container-high/40">
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container/30 text-on-secondary-container">
              <span
                className="material-symbols-outlined text-[16px] text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                eco
              </span>
              <span className="text-[11px] font-semibold">Fase Cut Terarah</span>
            </div>
            <h2 className="text-xl text-on-surface mt-2 font-bold tracking-tight">
              Halo, {profile.name || 'Budi Santoso'}!
            </h2>
            <p className="text-xs text-on-surface-variant mt-0.5 leading-snug">
              Tubuhmu merespons defisit kalori dengan sangat baik hari ini.
            </p>
          </div>
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-fixed/30 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[26px]">vital_signs</span>
          </div>
        </div>

        {/* Weight Goal Milestone Strip */}
        <div className="mt-4 bg-surface-container-low/70 rounded-2xl p-3 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-on-surface-variant font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-primary">
                trending_down
              </span>
              Progres Berat:{' '}
              <strong className="text-on-surface font-semibold">
                {profile.currentWeightKg.toFixed(1)} kg
              </strong>
            </span>
            <span className="text-primary font-bold">
              Target {profile.targetWeightKg.toFixed(1)} kg
            </span>
          </div>

          <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-primary-container h-full rounded-full transition-all duration-700"
              style={{ width: `${Math.max(22, weightProgress)}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-on-surface-variant">
            <span>
              BMI Saat Ini: <strong>{profile.bmi.toFixed(1)}</strong>
            </span>
            <span className="text-primary font-semibold text-[11px] bg-primary/10 px-2 py-0.5 rounded-full">
              -0.4 kg minggu ini
            </span>
            <span>
              Target BMI: <strong>{profile.targetBmi.toFixed(1)}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Calorie Master Circular Gauge Card */}
      <div className="relative bg-surface-container-lowest rounded-3xl p-4 shadow-sm border border-surface-container-high/40 overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-semibold text-on-surface">
              Ringkasan Kalori Harian
            </span>
          </div>
          <span className="text-[11px] bg-surface-container px-2.5 py-1 rounded-full text-on-surface-variant font-medium">
            Target: {profile.targetCalories.toLocaleString('id-ID')} kkal
          </span>
        </div>

        <div className="flex items-center justify-between py-2">
          {/* Circular Progress Chart via SVG */}
          <div className="relative flex-shrink-0 flex items-center justify-center w-36 h-36">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <circle
                className="text-surface-container"
                cx="60"
                cy="60"
                fill="transparent"
                r="50"
                stroke="currentColor"
                strokeWidth="11"
              />
              <circle
                className="text-primary transition-all duration-1000 ease-out"
                cx="60"
                cy="60"
                fill="transparent"
                r="50"
                stroke="currentColor"
                strokeDasharray="314.16"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                strokeWidth="11"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-bold text-on-surface leading-none">
                {totalCaloriesConsumed.toLocaleString('id-ID')}
              </span>
              <span className="text-[11px] text-on-surface-variant mt-1">
                / {profile.targetCalories.toLocaleString('id-ID')} kkal
              </span>
            </div>
          </div>

          {/* Calorie Breakdown Info */}
          <div className="flex flex-col flex-1 pl-4 space-y-2.5">
            <div className="bg-primary-fixed/20 p-2.5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-xs text-on-surface-variant">Sisa Kuota</p>
                <p className="text-lg text-primary font-bold">
                  {remainingCalories.toLocaleString('id-ID')}{' '}
                  <span className="text-[11px] font-normal">kkal</span>
                </p>
              </div>
              <span
                className="material-symbols-outlined text-[28px] text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                restaurant_menu
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-surface-container-low p-2 rounded-xl">
                <span className="text-xs text-on-surface-variant block">Terbakar</span>
                <span className="text-sm text-on-surface font-bold">{burnedCalories} kkal</span>
              </div>
              <div className="bg-surface-container-low p-2 rounded-xl">
                <span className="text-xs text-on-surface-variant block">Defisit</span>
                <span className="text-sm text-secondary font-bold">{netDeficit} kkal</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Macronutrients Progress Strip */}
      <div className="bg-surface-container-lowest rounded-3xl p-4 shadow-sm border border-surface-container-high/40">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-on-surface">Komposisi Makronutrisi</h3>
          <span className="text-[11px] text-primary font-semibold">Seimbang</span>
        </div>
        <div className="space-y-3">
          {/* Protein */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="flex items-center gap-1.5 font-semibold text-on-surface">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                Protein
              </span>
              <span className="text-on-surface-variant font-medium">
                85g <span className="text-on-surface-variant/60 font-normal">/ 130g</span>{' '}
                <span className="text-primary font-bold ml-1">(65%)</span>
              </span>
            </div>
            <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
              <div className="bg-sky-500 h-full rounded-full transition-all duration-500" style={{ width: '65%' }} />
            </div>
          </div>

          {/* Karbohidrat */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="flex items-center gap-1.5 font-semibold text-on-surface">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                Karbohidrat
              </span>
              <span className="text-on-surface-variant font-medium">
                140g <span className="text-on-surface-variant/60 font-normal">/ 210g</span>{' '}
                <span className="text-primary font-bold ml-1">(67%)</span>
              </span>
            </div>
            <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: '67%' }} />
            </div>
          </div>

          {/* Lemak Sehat */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="flex items-center gap-1.5 font-semibold text-on-surface">
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary" />
                Lemak Sehat
              </span>
              <span className="text-on-surface-variant font-medium">
                42g <span className="text-on-surface-variant/60 font-normal">/ 55g</span>{' '}
                <span className="text-tertiary font-bold ml-1">(76%)</span>
              </span>
            </div>
            <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
              <div className="bg-tertiary h-full rounded-full transition-all duration-500" style={{ width: '76%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Scanner & Recommendation Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-container to-primary text-on-primary p-4 shadow-md flex items-center justify-between">
        <div className="relative z-10 flex-1 pr-3">
          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wider text-white font-bold">
            Saran Cerdas
          </span>
          <h4 className="text-base font-bold mt-1.5 leading-snug">
            Rekomendasi Menu Malam
          </h4>
          <p className="text-xs text-on-primary-container mt-1 opacity-90 leading-relaxed">
            Sisa {remainingCalories} kkal sangat ideal untuk Salmon Kukus &amp; Tumis Jamur.
          </p>
          <div className="flex items-center gap-2 mt-3">
            <button
              type="button"
              onClick={() => onNavigateTab('scan-gizi')}
              className="inline-flex items-center gap-1.5 bg-white text-primary px-3.5 py-2 rounded-full text-xs font-bold shadow-sm active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[18px]">photo_camera</span>
              Scan Piring
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('menu-harian')}
              className="inline-flex items-center gap-1 text-white hover:text-white/80 text-xs font-semibold px-2 py-2 transition-colors"
            >
              Lihat Ide
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>
        <div className="relative z-10 flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden shadow-inner">
          <img
            className="w-full h-full object-cover"
            alt="Salmon Kukus Rekomendasi NutriFit"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHwmZah9yegXT27otq0iA4DcLw4Khy0yY0iNo_sQc68_vg-cmeIjB9r_tXrB_q_r5JUf4Jjke191A_r2uUtONwUYL_c9c3IQKDwNfXkP8E6IlOCLG-sMXoQ4nBLO9kubhJ3lONqniy-hrMo8c61guxa2_7Ww05hQuBEgjxpgwLUYq1bOakh3qmQBiUoqFcsFB34Esn_MtSPu1kAy82QdME0g10rtBIs6l7QXSsv13mIW2Z1KoN5zM7"
          />
        </div>
        <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-secondary-container/20 blur-2xl pointer-events-none" />
      </div>

      {/* Today's Meal Timeline */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-on-surface">Catatan Santapan Hari Ini</h3>
          <span className="text-[11px] text-on-surface-variant font-medium">
            {completedMeals.length} dari {meals.length} selesai
          </span>
        </div>

        {/* Meal cards */}
        {meals.map((meal) => {
          if (!meal.isCompleted) {
            // Dinner / Pending Card
            return (
              <div
                key={meal.id}
                className="bg-surface-container-lowest/95 rounded-2xl p-3.5 shadow-sm border border-secondary-container/30 flex items-center justify-between bg-gradient-to-r from-surface-container-lowest to-secondary-container/10 transition-all hover:shadow"
              >
                <div
                  className="flex items-center gap-3 min-w-0 cursor-pointer flex-1"
                  onClick={() => onSelectMealDetail(meal)}
                >
                  <div className="w-14 h-14 rounded-2xl bg-secondary-container/40 flex items-center justify-center flex-shrink-0 text-primary">
                    <span className="material-symbols-outlined text-[28px]">dinner_dining</span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-tertiary font-semibold">
                        {meal.category} • {meal.timeStr}
                      </span>
                      <span className="text-[10px] bg-tertiary-fixed text-on-tertiary-fixed px-1.5 py-0.2 rounded font-semibold">
                        Rencana
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-on-surface truncate">
                      {meal.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-on-surface-variant">
                      <span className="text-primary font-bold">
                        Tersedia sisa {remainingCalories} kkal
                      </span>
                      <span>•</span>
                      <span>Ideal: ~{meal.proteinG}g Prot</span>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 pl-2">
                  <button
                    type="button"
                    onClick={() => onNavigateTab('menu-harian')}
                    className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-sm active:scale-95 transition-transform"
                    aria-label="Pilih menu makan malam"
                  >
                    <span className="material-symbols-outlined text-[20px]">add</span>
                  </button>
                </div>
              </div>
            );
          }

          // Completed Meal Cards
          return (
            <div
              key={meal.id}
              className="bg-surface-container-lowest rounded-2xl p-3.5 shadow-sm border border-surface-container-high/40 flex items-center justify-between transition-all hover:bg-surface-container-lowest/90"
            >
              <div
                className="flex items-center gap-3 min-w-0 cursor-pointer flex-1"
                onClick={() => onSelectMealDetail(meal)}
              >
                <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 relative">
                  <img
                    className="w-full h-full object-cover"
                    src={meal.imageUrl}
                    alt={meal.title}
                  />
                  <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-primary text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-[10px]">check</span>
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-primary font-semibold">
                      {meal.category} • {meal.timeStr}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-on-surface truncate">
                    {meal.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-on-surface-variant">
                    <span>{meal.calories} kkal</span>
                    <span>•</span>
                    <span className="text-sky-600 font-semibold">{meal.proteinG}g Prot</span>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 pl-2">
                <button
                  type="button"
                  onClick={() => onSelectMealDetail(meal)}
                  className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                  aria-label={`Detail ${meal.title}`}
                >
                  <span className="material-symbols-outlined text-[18px]">more_vert</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hydration Micro Widget */}
      <div className="bg-surface-container-lowest rounded-3xl p-4 shadow-sm border border-surface-container-high/40 mb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
              <span className="material-symbols-outlined text-[22px]">water_drop</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-on-surface">Konsumsi Air Putih</h4>
              <p className="text-xs text-on-surface-variant">
                {waterMl.toLocaleString('id-ID')} ml tercatat dari target 2.500 ml
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onAddWater(250)}
            className="px-3 py-1.5 rounded-full bg-surface-container-high text-primary text-xs font-bold flex items-center gap-1 active:scale-95 transition-all hover:bg-surface-container-highest"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            250ml
          </button>
        </div>
        <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden mt-3">
          <div
            className="bg-sky-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${waterPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
