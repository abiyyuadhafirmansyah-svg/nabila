import React from 'react';
import { TabId } from '../types';

interface BottomNavProps {
  currentTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe pointer-events-none" aria-label="Navigasi Utama">
      <div className="mx-auto max-w-md px-5 pb-3">
        <div className="pointer-events-auto h-16 rounded-full bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_12px_32px_-4px_rgba(0,105,72,0.18)] border border-surface-container-high/40 flex items-center justify-around px-2 relative">
          
          {/* Tab 1: Ringkasan */}
          <button
            type="button"
            onClick={() => onTabChange('ringkasan')}
            className={`flex flex-col items-center justify-center flex-1 h-full min-w-[44px] transition-colors group ${
              currentTab === 'ringkasan' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
            }`}
            aria-current={currentTab === 'ringkasan' ? 'page' : undefined}
          >
            <span
              className="material-symbols-outlined text-[24px] transition-transform group-hover:scale-105"
              style={{ fontVariationSettings: currentTab === 'ringkasan' ? "'FILL' 1" : "'FILL' 0" }}
            >
              home
            </span>
            <span className="text-[11px] font-medium mt-0.5 tracking-tight">Ringkasan</span>
          </button>

          {/* Tab 2: Scan Gizi (Floating elevated button) */}
          <div className="relative flex items-center justify-center flex-1 h-full">
            <button
              type="button"
              onClick={() => onTabChange('scan-gizi')}
              className={`absolute -top-5 flex flex-col items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-primary-container text-on-primary shadow-[0_10px_20px_rgba(0,105,72,0.35)] active:scale-95 transition-all hover:shadow-[0_14px_24px_rgba(0,105,72,0.45)] ${
                currentTab === 'scan-gizi' ? 'ring-4 ring-primary-fixed/40 scale-105' : ''
              }`}
              aria-label="Buka Pemindai Piring AI"
              aria-current={currentTab === 'scan-gizi' ? 'page' : undefined}
            >
              <span className="material-symbols-outlined text-[28px]">qr_code_scanner</span>
            </button>
            <span
              className={`text-[11px] font-medium mt-7 tracking-tight transition-colors ${
                currentTab === 'scan-gizi' ? 'text-primary font-bold' : 'text-on-surface-variant'
              }`}
            >
              Scan Gizi
            </span>
          </div>

          {/* Tab 3: Menu Harian */}
          <button
            type="button"
            onClick={() => onTabChange('menu-harian')}
            className={`flex flex-col items-center justify-center flex-1 h-full min-w-[44px] transition-colors group ${
              currentTab === 'menu-harian' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
            }`}
            aria-current={currentTab === 'menu-harian' ? 'page' : undefined}
          >
            <span
              className="material-symbols-outlined text-[24px] transition-transform group-hover:scale-105"
              style={{ fontVariationSettings: currentTab === 'menu-harian' ? "'FILL' 1" : "'FILL' 0" }}
            >
              calendar_month
            </span>
            <span className="text-[11px] font-medium mt-0.5 tracking-tight">Menu Harian</span>
          </button>

          {/* Tab 4: Profil Ideal */}
          <button
            type="button"
            onClick={() => onTabChange('profil-ideal')}
            className={`flex flex-col items-center justify-center flex-1 h-full min-w-[44px] transition-colors group ${
              currentTab === 'profil-ideal' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
            }`}
            aria-current={currentTab === 'profil-ideal' ? 'page' : undefined}
          >
            <span
              className="material-symbols-outlined text-[24px] transition-transform group-hover:scale-105"
              style={{ fontVariationSettings: currentTab === 'profil-ideal' ? "'FILL' 1" : "'FILL' 0" }}
            >
              track_changes
            </span>
            <span className="text-[11px] font-medium mt-0.5 tracking-tight">Profil Ideal</span>
          </button>

        </div>
      </div>
    </nav>
  );
};
