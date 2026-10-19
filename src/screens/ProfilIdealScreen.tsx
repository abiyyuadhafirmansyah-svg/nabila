import React from 'react';
import { UserProfile } from '../types';
import { USER_AVATAR_URL } from '../data/mockData';

interface ProfilIdealScreenProps {
  profile: UserProfile;
  onOpenBiometrics: () => void;
  onOpenDietPlan: () => void;
  onToggleSensorSync: () => void;
  onOpenPreferences: () => void;
}

export const ProfilIdealScreen: React.FC<ProfilIdealScreenProps> = ({
  profile,
  onOpenBiometrics,
  onOpenDietPlan,
  onToggleSensorSync,
  onOpenPreferences,
}) => {
  const weightDiff = (profile.currentWeightKg - profile.targetWeightKg).toFixed(1);
  const totalLost = (profile.startWeightKg - profile.currentWeightKg).toFixed(1);

  return (
    <div className="flex flex-col w-full px-5 pb-6 gap-4">
      {/* Profile Header Card */}
      <div className="w-full bg-surface-container-lowest rounded-3xl p-5 shadow-sm border border-surface-container-high/40 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-shrink-0">
            <img
              alt={profile.name}
              className="w-16 h-16 rounded-full object-cover shadow-sm ring-2 ring-primary/20"
              src={USER_AVATAR_URL}
            />
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-on-primary">
              <span
                className="material-symbols-outlined text-[12px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                eco
              </span>
            </span>
          </div>

          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center justify-between gap-1">
              <h2 className="text-lg text-on-surface font-bold truncate">
                {profile.name}
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold uppercase tracking-wide">
                Aktif
              </span>
            </div>
            <p className="text-xs text-on-surface-variant truncate">
              {profile.age} tahun • {profile.heightCm} cm
            </p>
            <div className="flex items-center gap-1.5 mt-1 text-primary">
              <span className="material-symbols-outlined text-[16px]">fitness_center</span>
              <span className="text-[11px] font-semibold truncate">
                {profile.activityLevel}
              </span>
            </div>
          </div>
        </div>

        {/* Motivational Affirmation Banner */}
        <div className="flex items-center gap-2.5 p-3 bg-surface-container-low rounded-2xl text-on-surface-variant">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
            <span className="material-symbols-outlined text-[18px]">verified</span>
          </div>
          <p className="text-xs leading-snug">
            Kamu telah konsisten selama{' '}
            <span className="font-bold text-primary">3 minggu</span>! Tubuhmu sedang bertransformasi secara optimal.
          </p>
        </div>
      </div>

      {/* Primary Body Metric Grid */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-base text-on-surface font-bold">Status Biometrik</h3>
          <button
            type="button"
            onClick={onOpenBiometrics}
            className="text-xs text-primary font-bold flex items-center gap-1 hover:underline active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">edit</span>
            Edit Data
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Berat Saat Ini */}
          <div className="bg-surface-container-lowest p-4 rounded-3xl shadow-sm border border-surface-container-high/40 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs text-on-surface-variant font-medium">Berat Saat Ini</span>
              <span className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[16px]">scale</span>
              </span>
            </div>
            <div className="mt-2">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-on-surface">
                  {profile.currentWeightKg.toFixed(1)}
                </span>
                <span className="text-xs text-on-surface-variant font-medium">kg</span>
              </div>
              <span className="text-xs text-primary font-medium flex items-center gap-0.5 mt-0.5">
                <span className="material-symbols-outlined text-[14px]">trending_down</span>
                -{totalLost} kg total
              </span>
            </div>
          </div>

          {/* Target Berat */}
          <div className="bg-surface-container-lowest p-4 rounded-3xl shadow-sm border border-surface-container-high/40 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs text-on-surface-variant font-medium">Target Ideal</span>
              <span className="w-7 h-7 rounded-full bg-secondary-container/40 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[16px]">flag</span>
              </span>
            </div>
            <div className="mt-2">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-primary">
                  {profile.targetWeightKg.toFixed(1)}
                </span>
                <span className="text-xs text-on-surface-variant font-medium">kg</span>
              </div>
              <span className="text-xs text-on-surface-variant mt-0.5 block">
                Selisih: <strong>-{weightDiff} kg</strong>
              </span>
            </div>
          </div>

          {/* BMI Card (Span 2) */}
          <div className="col-span-2 bg-surface-container-lowest p-4 rounded-3xl shadow-sm border border-surface-container-high/40 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-on-surface-variant font-medium">
                  Indeks Massa Tubuh (BMI)
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl font-bold text-on-surface">
                    {profile.bmi.toFixed(1)}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[11px] font-semibold">
                    {profile.bmi < 18.5
                      ? 'Kurang'
                      : profile.bmi <= 24.9
                      ? 'Ideal / Normal'
                      : profile.bmi <= 29.9
                      ? 'Sedikit Berlebih'
                      : 'Obesitas'}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-on-surface-variant">Target Normal</span>
                <p className="text-base text-primary font-bold">
                  {profile.targetBmi.toFixed(1)}
                </p>
              </div>
            </div>

            {/* Visual Segmented BMI Meter */}
            <div className="flex flex-col gap-1.5 mt-1">
              <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden flex gap-1 p-0.5">
                <div className="h-full bg-surface-dim rounded-full flex-[18.5]" title="Kurang (<18.5)" />
                <div className="h-full bg-secondary-fixed rounded-full flex-[6.4]" title="Normal (18.5-24.9)" />
                <div className="h-full bg-tertiary-fixed-dim rounded-full flex-[5]" title="Berlebih (25-29.9)" />
                <div className="h-full bg-error-container rounded-full flex-[5]" title="Obesitas (>30)" />
              </div>
              <div className="flex justify-between items-center px-1 text-[11px] text-on-surface-variant font-medium">
                <span>18.5</span>
                <span className="text-primary font-bold">22.0 (Target Sehat)</span>
                <span className="text-tertiary font-bold">• {profile.bmi.toFixed(1)} (Kamu)</span>
                <span>30.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Pace & Projection Notice */}
      <div className="w-full p-4 rounded-3xl bg-gradient-to-r from-primary-container/10 to-secondary-container/20 flex items-start gap-3 border border-primary/10">
        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-on-primary">
          <span className="material-symbols-outlined text-[20px]">calendar_today</span>
        </div>
        <div className="flex flex-col flex-1">
          <h4 className="text-xs font-bold text-on-surface">
            Estimasi: {profile.weeksRemaining} Minggu Lagi
          </h4>
          <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
            Dengan ritme aman <strong>{profile.weeklyPaceKg} kg/minggu</strong>, kamu diproyeksikan mencapai bobot ideal{' '}
            <strong>{profile.targetWeightKg.toFixed(0)} kg</strong> pada pertengahan bulan depan tanpa kehilangan massa otot.
          </p>
        </div>
      </div>

      {/* Weight Trajectory & History Graph */}
      <div className="w-full bg-surface-container-lowest p-5 rounded-3xl shadow-sm border border-surface-container-high/40 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base text-on-surface font-bold">Lintasan Penurunan Berat</h3>
            <p className="text-xs text-on-surface-variant">Catatan aktual dan proyeksi defisit sehat</p>
          </div>
          <div className="flex items-center gap-1.5 bg-surface-container px-2.5 py-1 rounded-full text-on-surface-variant text-[11px] font-medium">
            <span className="w-2 h-2 rounded-full bg-primary" /> Aktual
            <span className="w-2 h-2 rounded-full bg-outline-variant ml-1" /> Proyeksi
          </div>
        </div>

        {/* SVG Line Chart Visual */}
        <div className="w-full relative pt-2">
          <svg className="w-full h-36 overflow-visible" preserveAspectRatio="none" viewBox="0 0 340 140">
            <defs>
              <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#006948" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#006948" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            {/* Grid Lines */}
            <line stroke="#eaedff" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="340" y1="20" y2="20" />
            <line stroke="#eaedff" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="340" y1="65" y2="65" />
            <line stroke="#eaedff" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="340" y1="110" y2="110" />

            {/* Shaded Area Under Curve */}
            <path d="M 20 20 L 80 40 L 140 65 L 140 130 L 20 130 Z" fill="url(#chartGradient)" />

            {/* Actual Progress Solid Line */}
            <path d="M 20 20 L 80 40 L 140 65" fill="none" stroke="#006948" strokeLinecap="round" strokeWidth="3" />

            {/* Projected Dashed Line */}
            <path d="M 140 65 L 200 85 L 260 100 L 320 115" fill="none" stroke="#6d7a72" strokeDasharray="5 5" strokeLinecap="round" strokeWidth="2.5" />

            {/* Data Points: Actual */}
            <circle cx="20" cy="20" fill="#ffffff" r="4" stroke="#006948" strokeWidth="2.5" />
            <circle cx="80" cy="40" fill="#ffffff" r="4" stroke="#006948" strokeWidth="2.5" />
            <circle cx="140" cy="65" fill="#006948" r="5" stroke="#ffffff" strokeWidth="2" />

            {/* Target circle */}
            <circle cx="320" cy="115" fill="#ffffff" r="4" stroke="#825100" strokeWidth="2.5" />
          </svg>

          {/* Horizontal Axis Labels */}
          <div className="flex justify-between items-center text-on-surface-variant text-[11px] mt-1 px-1">
            <span className="flex flex-col items-center">
              <span className="font-bold text-on-surface">76.5 kg</span>
              <span className="text-outline text-[10px]">Mgg 1</span>
            </span>
            <span className="flex flex-col items-center">
              <span>75.2 kg</span>
              <span className="text-outline text-[10px]">Mgg 2</span>
            </span>
            <span className="flex flex-col items-center">
              <span className="font-bold text-primary">{profile.currentWeightKg.toFixed(1)} kg</span>
              <span className="text-primary font-semibold text-[10px]">Saat Ini</span>
            </span>
            <span className="flex flex-col items-center">
              <span>70.0 kg</span>
              <span className="text-outline text-[10px]">Mgg 6</span>
            </span>
            <span className="flex flex-col items-center">
              <span className="font-bold text-tertiary">{profile.targetWeightKg.toFixed(1)} kg</span>
              <span className="text-tertiary font-semibold text-[10px]">Target</span>
            </span>
          </div>
        </div>
      </div>

      {/* Daily Metabolic Calculator (Energy Balance) */}
      <div className="w-full bg-surface-container-lowest p-5 rounded-3xl shadow-sm border border-surface-container-high/40 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base text-on-surface font-bold">Kalkulator Energi &amp; Metabolisme</h3>
            <p className="text-xs text-on-surface-variant">Rincian pembakaran dan target asupan</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[18px]">bolt</span>
          </div>
        </div>

        {/* Energy Breakdown Triple Grid */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-surface-container-low p-2.5 rounded-2xl flex flex-col items-center justify-center">
            <span className="text-[11px] text-on-surface-variant">BMR Alami</span>
            <span className="text-base text-on-surface font-bold mt-0.5">{profile.bmr}</span>
            <span className="text-[10px] text-outline">kkal</span>
          </div>
          <div className="bg-surface-container-low p-2.5 rounded-2xl flex flex-col items-center justify-center">
            <span className="text-[11px] text-on-surface-variant">Total TDEE</span>
            <span className="text-base text-on-surface font-bold mt-0.5">{profile.tdee}</span>
            <span className="text-[10px] text-outline">kkal</span>
          </div>
          <div className="bg-secondary-container/30 p-2.5 rounded-2xl flex flex-col items-center justify-center">
            <span className="text-[11px] text-on-secondary-fixed-variant font-semibold">Defisit Aman</span>
            <span className="text-base text-secondary font-bold mt-0.5">{profile.deficit}</span>
            <span className="text-[10px] text-secondary">kkal</span>
          </div>
        </div>

        {/* Daily Intake Target Highlight Banner */}
        <div className="bg-surface-container p-3.5 rounded-2xl flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-on-surface-variant font-semibold">Target Konsumsi Harian</span>
            <span className="text-[11px] text-outline mt-0.5">TDEE minus defisit sehat</span>
          </div>
          <div className="text-right">
            <span className="text-2xl text-primary font-bold">
              {profile.targetCalories.toLocaleString('id-ID')}
            </span>
            <span className="text-xs text-primary-container font-semibold"> kkal/hari</span>
          </div>
        </div>

        {/* Macro Composition Bar */}
        <div className="flex flex-col gap-1.5 pt-1">
          <span className="text-xs text-on-surface-variant font-semibold">
            Rekomendasi Komposisi Nutrisi:
          </span>
          <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden flex">
            <div className="bg-[#0284c7] h-full" style={{ width: '30%' }} title="Protein 30%" />
            <div className="bg-[#006948] h-full" style={{ width: '45%' }} title="Karbohidrat 45%" />
            <div className="bg-[#d97706] h-full" style={{ width: '25%' }} title="Lemak Sehat 25%" />
          </div>
          <div className="flex justify-between items-center text-[11px] pt-0.5">
            <span className="flex items-center gap-1 text-[#0284c7] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#0284c7]" /> Protein {profile.proteinG}g (30%)
            </span>
            <span className="flex items-center gap-1 text-primary font-semibold">
              <span className="w-2 h-2 rounded-full bg-primary" /> Karbo {profile.carbsG}g (45%)
            </span>
            <span className="flex items-center gap-1 text-tertiary font-semibold">
              <span className="w-2 h-2 rounded-full bg-tertiary" /> Lemak {profile.fatG}g (25%)
            </span>
          </div>
        </div>
      </div>

      {/* Preferences & Integrations */}
      <div className="w-full bg-surface-container-lowest p-5 rounded-3xl shadow-sm border border-surface-container-high/40 flex flex-col gap-3">
        <h3 className="text-base text-on-surface font-bold">Preferensi &amp; Integrasi</h3>
        <div className="flex flex-col gap-1">
          {/* Item 1: Preferensi Makanan */}
          <button
            type="button"
            onClick={onOpenPreferences}
            className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-surface-container-low transition-colors text-left group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">restaurant_menu</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-on-surface font-bold truncate">
                  Preferensi Makanan &amp; Alergi
                </span>
                <span className="text-[11px] text-on-surface-variant truncate">
                  {profile.dietPreferences.join(' • ')}
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline text-[20px]">chevron_right</span>
          </button>

          {/* Item 2: Pengingat Waktu Makan & Minum */}
          <button
            type="button"
            onClick={onOpenPreferences}
            className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-surface-container-low transition-colors text-left group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">notifications_active</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-on-surface font-bold truncate">
                  Jadwal Makan &amp; Air Minum
                </span>
                <span className="text-[11px] text-on-surface-variant truncate">
                  4 Pengingat aktif (Target 2.4L air)
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline text-[20px]">chevron_right</span>
          </button>

          {/* Item 3: Sinkronisasi Health App */}
          <div className="w-full flex items-center justify-between p-2.5 rounded-2xl bg-surface-container-low">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                <span className="material-symbols-outlined text-[20px]">sync_alt</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-on-surface font-bold truncate">
                    Sinkronisasi Sensor
                  </span>
                  <span
                    className={`px-1.5 py-0.2 rounded text-[10px] font-semibold ${
                      profile.sensorSync
                        ? 'bg-primary/10 text-primary'
                        : 'bg-surface-container text-outline'
                    }`}
                  >
                    {profile.sensorSync ? 'Tersambung' : 'Terputus'}
                  </span>
                </div>
                <span className="text-[11px] text-on-surface-variant truncate">
                  Google Fit / Apple Health
                </span>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profile.sensorSync}
                onChange={onToggleSensorSync}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
            </label>
          </div>
        </div>
      </div>

      {/* Re-calculate Action Button */}
      <div className="w-full flex flex-col gap-2 pt-1 mb-2">
        <button
          type="button"
          onClick={onOpenDietPlan}
          className="w-full py-3.5 px-4 rounded-full bg-gradient-to-r from-primary to-primary-container text-on-primary text-sm font-bold shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">tune</span>
          Sesuaikan Ulang Target &amp; Diet Plan
        </button>
        <p className="text-center text-[11px] text-outline px-4 leading-relaxed">
          Perhitungan menggunakan standar Harris-Benedict revisi Mifflin-St Jeor yang disesuaikan untuk nutrisi seimbang.
        </p>
      </div>
    </div>
  );
};
