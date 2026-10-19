import React from 'react';

interface ToastProps {
  message: string | null;
  icon?: string;
  type?: 'success' | 'info' | 'warning';
}

export const Toast: React.FC<ToastProps> = ({ message, icon = 'check_circle' }) => {
  if (!message) return null;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none transition-all duration-300 animate-in fade-in zoom-in-95 px-4 w-full max-w-sm flex justify-center">
      <div className="px-4 py-2.5 rounded-full bg-inverse-surface/95 text-surface-container-lowest shadow-2xl backdrop-blur-md flex items-center gap-2.5 border border-white/10">
        <span className="material-symbols-outlined text-secondary-fixed text-[20px] flex-shrink-0">
          {icon}
        </span>
        <span className="text-xs font-semibold text-surface-container-lowest tracking-tight">
          {message}
        </span>
      </div>
    </div>
  );
};
