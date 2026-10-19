import React from 'react';
import { TabId } from '../types';
import { APP_LOGO_URL, USER_AVATAR_URL } from '../data/mockData';

interface HeaderProps {
  currentTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const TAB_TITLES: Record<TabId, string> = {
  ringkasan: 'Ringkasan',
  'scan-gizi': 'Scan Gizi',
  'menu-harian': 'Menu Harian',
  'profil-ideal': 'Profil Ideal',
};

export const Header: React.FC<HeaderProps> = ({ currentTab, onTabChange }) => {
  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-surface/85 backdrop-blur-xl shadow-[0_1px_12px_rgba(0,105,72,0.06)]">
      <div className="max-w-md mx-auto h-16 px-5 flex items-center justify-between gap-4">
        {/* Logo and Brand */}
        <button
          onClick={() => onTabChange('ringkasan')}
          className="flex items-center gap-2 min-w-0 text-left group transition-transform active:scale-95"
          aria-label="NutriFit Beranda"
        >
          <img
            alt="NutriFit App Logo"
            className="h-8 w-auto object-contain flex-shrink-0"
            src={APP_LOGO_URL}
          />
          <span className="font-bold text-xl text-primary tracking-tight truncate">
            NutriFit
          </span>
        </button>

        {/* Center Screen Title */}
        <div className="flex-1 text-center px-1">
          <h1 className="text-sm font-semibold text-on-surface truncate">
            {TAB_TITLES[currentTab]}
          </h1>
        </div>

        {/* User Profile Avatar */}
        <div className="flex items-center justify-end min-w-0">
          <button
            onClick={() => onTabChange('profil-ideal')}
            className={`flex items-center justify-center p-0.5 rounded-full ring-2 transition-all active:scale-95 ${
              currentTab === 'profil-ideal'
                ? 'ring-primary'
                : 'ring-primary/20 hover:ring-primary'
            }`}
            aria-label="Lihat Profil Ideal"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
              src={USER_AVATAR_URL}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
