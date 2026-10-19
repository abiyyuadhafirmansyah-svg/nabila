import React, { useState, useRef } from 'react';
import { ScanMode, RecentScan } from '../types';
import { RECENT_SCANS } from '../data/mockData';

interface ScanGiziScreenProps {
  onScanLogged: (item: RecentScan) => void;
  onShowToast: (msg: string) => void;
}

export const ScanGiziScreen: React.FC<ScanGiziScreenProps> = ({
  onScanLogged,
  onShowToast,
}) => {
  const [mode, setMode] = useState<ScanMode>('ready');
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [activeScan, setActiveScan] = useState<RecentScan>(RECENT_SCANS[0]);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleModeChange = (newMode: ScanMode) => {
    setMode(newMode);
    if (newMode === 'barcode') {
      onShowToast('Mode Barcode Aktif - Arahkan ke UPC');
    } else if (newMode === 'table') {
      onShowToast('Mode Tabel Nilai Gizi Aktif');
    } else {
      onShowToast('Mode Makanan Siap Saji');
    }
  };

  const toggleTorch = () => {
    const newState = !isTorchOn;
    setIsTorchOn(newState);
    onShowToast(newState ? 'Lampu kilat menyala' : 'Lampu kilat nonaktif');
  };

  const handleShutter = () => {
    onScanLogged(activeScan);
    onShowToast(`Berhasil dicatat: +${activeScan.calories} kkal ke Jurnal`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomImage(url);
      onShowToast('Foto berhasil dimuat & dianalisis AI Vision!');
      // Update with an analyzed item state
      setActiveScan({
        id: 'custom-' + Date.now(),
        name: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') || 'Hidangan Pilihanmu',
        calories: 460,
        weightG: 320,
        imageUrl: url,
        proteinG: 32,
        carbsG: 45,
        fatG: 14,
        confidence: 96,
        description: 'Hasil estimasi AI Vision: Porsi seimbang kaya mikronutrien & serat alami.',
        compatibilityNote: 'Sangat cocok untuk target defisit harianmu',
      });
    }
  };

  // Dimensions for reticle based on mode
  const reticleStyle =
    mode === 'barcode'
      ? { width: '290px', height: '140px' }
      : mode === 'table'
      ? { width: '300px', height: '340px' }
      : { width: '288px', height: '288px' };

  return (
    <div className="flex flex-col w-full relative select-none">
      {/* Hidden file input for gallery upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Viewfinder Stage */}
      <div className="relative w-full h-[600px] rounded-3xl overflow-hidden bg-inverse-surface shadow-xl flex flex-col justify-between mx-auto max-w-md">
        {/* Background photo */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 scale-105"
          style={{
            backgroundImage: `url('${customImage || activeScan.imageUrl}')`,
          }}
        />

        {/* Soft Dark Vignette Overlay for HUD legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-inverse-surface/70 via-transparent to-inverse-surface/90 pointer-events-none" />

        {/* Live Animated Green Scan Laser Beam */}
        <div
          className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-primary/30 to-secondary-fixed pointer-events-none opacity-70 animate-pulse"
          style={{ top: '24%' }}
        />

        {/* Top Floating HUD: Mode Selector Pill */}
        <div className="relative z-10 w-full pt-4 px-5 flex flex-col items-center gap-2">
          {/* Status Chip */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-inverse-surface/80 backdrop-blur-md text-surface-container-lowest shadow-sm">
            <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-ping" />
            <span className="text-[11px] tracking-wide text-secondary-fixed font-semibold uppercase">
              AI Vision v2.4 Aktif
            </span>
          </div>

          {/* Pill Segmented Switcher */}
          <div className="flex items-center p-1 rounded-full bg-inverse-surface/75 backdrop-blur-xl shadow-md w-full max-w-xs justify-between">
            <button
              type="button"
              onClick={() => handleModeChange('ready')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 flex-1 text-center ${
                mode === 'ready'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'text-surface-container-high hover:text-surface-container-lowest'
              }`}
            >
              Makanan
            </button>
            <button
              type="button"
              onClick={() => handleModeChange('barcode')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 flex-1 text-center ${
                mode === 'barcode'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'text-surface-container-high hover:text-surface-container-lowest'
              }`}
            >
              Barcode
            </button>
            <button
              type="button"
              onClick={() => handleModeChange('table')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 flex-1 text-center ${
                mode === 'table'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'text-surface-container-high hover:text-surface-container-lowest'
              }`}
            >
              Tabel Gizi
            </button>
          </div>
        </div>

        {/* Target Reticle & Bounding Box Layer */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-4">
          <div
            className="relative rounded-2xl transition-all duration-500 flex flex-col justify-between p-3"
            style={reticleStyle}
          >
            {/* Reticle Corner Glyphs */}
            <div className="absolute top-0 left-0 w-8 h-8 rounded-tl-xl bg-transparent">
              <svg className="w-full h-full text-secondary-fixed" fill="none" viewBox="0 0 32 32">
                <path d="M4 28V12C4 7.58172 7.58172 4 12 4H28" stroke="currentColor" strokeLinecap="round" strokeWidth="3.5" />
              </svg>
            </div>
            <div className="absolute top-0 right-0 w-8 h-8 rounded-tr-xl bg-transparent">
              <svg className="w-full h-full text-secondary-fixed" fill="none" viewBox="0 0 32 32">
                <path d="M4 4H20C24.4183 4 28 7.58172 28 12V28" stroke="currentColor" strokeLinecap="round" strokeWidth="3.5" />
              </svg>
            </div>
            <div className="absolute bottom-0 left-0 w-8 h-8 rounded-bl-xl bg-transparent">
              <svg className="w-full h-full text-secondary-fixed" fill="none" viewBox="0 0 32 32">
                <path d="M4 4V20C4 24.4183 7.58172 28 12 28H28" stroke="currentColor" strokeLinecap="round" strokeWidth="3.5" />
              </svg>
            </div>
            <div className="absolute bottom-0 right-0 w-8 h-8 rounded-br-xl bg-transparent">
              <svg className="w-full h-full text-secondary-fixed" fill="none" viewBox="0 0 32 32">
                <path d="M28 4V20C28 24.4183 24.4183 28 20 28H4" stroke="currentColor" strokeLinecap="round" strokeWidth="3.5" />
              </svg>
            </div>

            {/* Center Crosshair Micro-Indicator */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-7 h-7 flex items-center justify-center opacity-60">
                <span className="material-symbols-outlined text-secondary-fixed text-[26px]">
                  center_focus_strong
                </span>
              </div>
            </div>

            {/* Real-Time Floating Confidence Pill */}
            <div className="self-start px-2.5 py-1 rounded-full bg-inverse-surface/85 backdrop-blur-md flex items-center gap-1.5 shadow-md transform -translate-y-2">
              <span className="material-symbols-outlined text-secondary-fixed text-[16px]">
                verified
              </span>
              <span className="text-[11px] font-semibold text-on-primary">
                Akurasi {activeScan.confidence}%
              </span>
            </div>

            {/* Quick Weight Estimate Badge */}
            <div className="self-end px-2.5 py-1 rounded-full bg-inverse-surface/85 backdrop-blur-md flex items-center gap-1.5 shadow-md transform translate-y-2">
              <span className="material-symbols-outlined text-tertiary-fixed text-[16px]">
                scale
              </span>
              <span className="text-[11px] font-semibold text-surface-container-lowest">
                Est. ~{activeScan.weightG}g
              </span>
            </div>
          </div>
        </div>

        {/* AI Real-Time Analysis Card (Floating Glass Drawer) */}
        <div className="relative z-10 mx-4 mb-3">
          <div className="p-3.5 rounded-3xl bg-inverse-surface/90 backdrop-blur-2xl text-inverse-on-surface shadow-[0_12px_36px_rgba(0,33,20,0.4)] flex flex-col gap-2.5 border border-white/10">
            {/* Dish Header & Calorie Indicator */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary-fixed text-[18px]">
                    restaurant
                  </span>
                  <h2 className="text-base font-bold text-surface-container-lowest truncate">
                    {activeScan.name}
                  </h2>
                </div>
                <p className="text-xs text-outline-variant mt-0.5 line-clamp-1">
                  {activeScan.description}
                </p>
              </div>
              <div className="flex flex-col items-end flex-shrink-0 px-2.5 py-1 rounded-xl bg-surface-container-highest/20">
                <span className="text-xl font-bold text-secondary-fixed leading-tight">
                  {activeScan.calories}
                </span>
                <span className="text-[10px] text-inverse-on-surface uppercase font-semibold">
                  kkal
                </span>
              </div>
            </div>

            {/* Compatibility & Goal Alignment Badge */}
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-on-secondary-fixed-variant/40">
              <span className="material-symbols-outlined text-secondary-fixed text-[18px] flex-shrink-0">
                check_circle
              </span>
              <span className="text-xs text-secondary-fixed font-medium truncate">
                {activeScan.compatibilityNote}
              </span>
            </div>

            {/* Macro Spark-Capsules */}
            <div className="grid grid-cols-3 gap-2 pt-0.5">
              <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl bg-surface-container-highest/15">
                <span className="w-2 h-2 rounded-full bg-secondary-fixed flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] text-outline-variant">Protein</span>
                  <span className="text-xs font-bold text-surface-container-lowest">
                    {activeScan.proteinG}g
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl bg-surface-container-highest/15">
                <span className="w-2 h-2 rounded-full bg-primary-fixed flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] text-outline-variant">Karbo</span>
                  <span className="text-xs font-bold text-surface-container-lowest">
                    {activeScan.carbsG}g
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl bg-surface-container-highest/15">
                <span className="w-2 h-2 rounded-full bg-tertiary-fixed flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] text-outline-variant">Lemak</span>
                  <span className="text-xs font-bold text-surface-container-lowest">
                    {activeScan.fatG}g
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Interactive HUD Controls */}
      <div className="w-full max-w-md mx-auto px-5 py-3 flex items-center justify-between">
        {/* Flashlight Toggle */}
        <button
          type="button"
          onClick={toggleTorch}
          aria-label="Toggle Flashlight"
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm active:scale-90 transition-all ${
            isTorchOn
              ? 'bg-tertiary-fixed text-on-tertiary-fixed ring-2 ring-tertiary'
              : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">
            {isTorchOn ? 'flash_on' : 'flash_off'}
          </span>
        </button>

        {/* Main Shutter & Analyze Button with Pulsating Outer Rings */}
        <div className="relative flex items-center justify-center">
          <span className="absolute w-20 h-20 rounded-full bg-secondary-fixed/30 animate-ping pointer-events-none" />
          <button
            type="button"
            onClick={handleShutter}
            aria-label="Scan & Simpan Makanan"
            className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-primary-container p-1 shadow-lg active:scale-95 transition-all flex items-center justify-center group"
          >
            <div className="w-full h-full rounded-full bg-surface-container-lowest flex items-center justify-center transition-colors group-hover:bg-primary-fixed">
              <span className="material-symbols-outlined text-primary text-[32px] group-active:scale-110 transition-transform">
                insights
              </span>
            </div>
          </button>
        </div>

        {/* Gallery / Photo Upload Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          aria-label="Unggah dari Galeri"
          className="w-12 h-12 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center shadow-sm active:scale-90 transition-all hover:bg-surface-container-highest"
        >
          <span className="material-symbols-outlined text-[24px]">photo_library</span>
        </button>
      </div>

      {/* Recent Scans Strip Section */}
      <div className="w-full max-w-md mx-auto px-5 mt-1 mb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[18px]">history</span>
            <h3 className="text-sm text-on-surface font-semibold">Pindaian Terakhir</h3>
          </div>
          <span className="text-xs text-primary font-semibold">Ketuk untuk preview</span>
        </div>

        {/* Horizontal Thumbnail Carousel */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {RECENT_SCANS.map((scan) => (
            <button
              key={scan.id}
              type="button"
              onClick={() => {
                setActiveScan(scan);
                setCustomImage(null);
                onShowToast(`Pratinjau: ${scan.name}`);
              }}
              className={`flex-shrink-0 w-44 p-2 rounded-2xl shadow-sm flex items-center gap-2 transition-all text-left ${
                activeScan.id === scan.id
                  ? 'bg-primary/10 border border-primary ring-1 ring-primary'
                  : 'bg-surface-container-lowest hover:bg-surface-container-low border border-surface-container-high/40'
              }`}
            >
              <div
                className="w-11 h-11 rounded-xl bg-cover bg-center flex-shrink-0 shadow-inner"
                style={{ backgroundImage: `url('${scan.imageUrl}')` }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-on-surface truncate">{scan.name}</p>
                <span className="text-[11px] text-outline block">
                  {scan.calories} kkal • {scan.volumeMl ? `${scan.volumeMl}ml` : `${scan.weightG}g`}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
