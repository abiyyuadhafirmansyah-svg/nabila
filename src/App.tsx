/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { TabId, UserProfile, MealItem, RecentScan, GroceryItem } from './types';
import {
  INITIAL_PROFILE,
  INITIAL_MEALS_RINGKASAN,
  INITIAL_DAILY_MEALS,
  INITIAL_GROCERY_LIST,
} from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';
import { GroceryModal } from './components/GroceryModal';
import { BiometricsModal } from './components/BiometricsModal';
import { DietPlanModal } from './components/DietPlanModal';
import { MealDetailModal } from './components/MealDetailModal';
import { RingkasanScreen } from './screens/RingkasanScreen';
import { ScanGiziScreen } from './screens/ScanGiziScreen';
import { MenuHarianScreen } from './screens/MenuHarianScreen';
import { ProfilIdealScreen } from './screens/ProfilIdealScreen';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabId>('ringkasan');
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('nutrifit_profile');
    return saved ? JSON.parse(saved) : INITIAL_PROFILE;
  });

  const [ringkasanMeals, setRingkasanMeals] = useState<MealItem[]>(() => {
    const saved = localStorage.getItem('nutrifit_meals_ringkasan');
    return saved ? JSON.parse(saved) : INITIAL_MEALS_RINGKASAN;
  });

  const [dailyMeals, setDailyMeals] = useState<MealItem[]>(() => {
    const saved = localStorage.getItem('nutrifit_meals_daily');
    return saved ? JSON.parse(saved) : INITIAL_DAILY_MEALS;
  });

  const [waterMl, setWaterMl] = useState<number>(() => {
    const saved = localStorage.getItem('nutrifit_water');
    return saved ? Number(saved) : 1750;
  });

  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>(() => {
    const saved = localStorage.getItem('nutrifit_grocery');
    return saved ? JSON.parse(saved) : INITIAL_GROCERY_LIST;
  });

  // Modal and toast states
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastIcon, setToastIcon] = useState<string>('check_circle');
  const [isGroceryOpen, setIsGroceryOpen] = useState(false);
  const [isBiometricsOpen, setIsBiometricsOpen] = useState(false);
  const [isDietPlanOpen, setIsDietPlanOpen] = useState(false);
  const [selectedMealDetail, setSelectedMealDetail] = useState<MealItem | null>(null);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('nutrifit_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('nutrifit_meals_ringkasan', JSON.stringify(ringkasanMeals));
  }, [ringkasanMeals]);

  useEffect(() => {
    localStorage.setItem('nutrifit_meals_daily', JSON.stringify(dailyMeals));
  }, [dailyMeals]);

  useEffect(() => {
    localStorage.setItem('nutrifit_water', waterMl.toString());
  }, [waterMl]);

  useEffect(() => {
    localStorage.setItem('nutrifit_grocery', JSON.stringify(groceryItems));
  }, [groceryItems]);

  const showToast = (msg: string, icon: string = 'check_circle') => {
    setToastMessage(msg);
    setToastIcon(icon);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const handleAddWater = (ml: number) => {
    const newTotal = waterMl + ml;
    setWaterMl(newTotal);
    if (newTotal >= 2500 && waterMl < 2500) {
      showToast('🎉 Selamat! Target hidrasi 2.500 ml hari ini tercapai!', 'local_drink');
    } else {
      showToast(`+${ml}ml air dicatat! Total: ${newTotal.toLocaleString('id-ID')} ml`, 'water_drop');
    }
  };

  const handleScanLogged = (scannedItem: RecentScan) => {
    // Add scanned food to ringkasan meals
    const newMeal: MealItem = {
      id: 'scanned-' + Date.now(),
      category: 'Makan Malam',
      timeStr: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      title: scannedItem.name,
      calories: scannedItem.calories,
      proteinG: scannedItem.proteinG,
      carbsG: scannedItem.carbsG,
      fatG: scannedItem.fatG,
      imageUrl: scannedItem.imageUrl,
      isCompleted: true,
      description: scannedItem.description,
      ingredients: ['Hasil AI Vision Scanner', `${scannedItem.weightG} gram porsi`]
    };

    setRingkasanMeals((prev) => {
      // Replace the pending dinner or append
      const pendingDinnerIdx = prev.findIndex((m) => m.category === 'Makan Malam' && !m.isCompleted);
      if (pendingDinnerIdx !== -1) {
        const copy = [...prev];
        copy[pendingDinnerIdx] = newMeal;
        return copy;
      }
      return [...prev, newMeal];
    });

    showToast(`Dicatat ke Jurnal: ${scannedItem.name} (+${scannedItem.calories} kkal)`, 'check_circle');
  };

  const handleToggleMealSelect = (mealId: string) => {
    setDailyMeals((prev) =>
      prev.map((m) => (m.id === mealId ? { ...m, isSelected: !m.isSelected } : m))
    );
    showToast('Pilihan menu harian diperbarui');
  };

  const handleSwapMeal = (mealId: string, alternate: MealItem) => {
    setDailyMeals((prev) =>
      prev.map((m) => (m.id === mealId ? { ...alternate, id: mealId, isSelected: true } : m))
    );
  };

  const handleRegenerateMenu = () => {
    // Regenerate daily meals with balanced nutrition
    setDailyMeals((prev) =>
      prev.map((m) => ({
        ...m,
        isSelected: true,
      }))
    );
  };

  const handleToggleGroceryItem = (id: string) => {
    setGroceryItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleSaveProfile = (updated: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
    showToast('Profil biometrik & target berhasil diperbarui!', 'task_alt');
  };

  const handleToggleSensorSync = () => {
    const nextSync = !profile.sensorSync;
    setProfile((prev) => ({ ...prev, sensorSync: nextSync }));
    showToast(
      nextSync
        ? 'Sensor Google Fit & Apple Health terhubung!'
        : 'Sinkronisasi sensor dinonaktifkan',
      'sync_alt'
    );
  };

  return (
    <div className="min-h-screen bg-slate-900/5 flex justify-center selection:bg-secondary-container">
      {/* Mobile Frame Container: 100% responsive and centered */}
      <div className="w-full max-w-md min-h-screen bg-surface flex flex-col relative shadow-2xl border-x border-surface-container-high/40 pb-28">
        
        {/* Top Header */}
        <Header currentTab={currentTab} onTabChange={setCurrentTab} />

        {/* Main Content Area */}
        <main className="flex-1 w-full pt-20 pb-4">
          {currentTab === 'ringkasan' && (
            <RingkasanScreen
              profile={profile}
              meals={ringkasanMeals}
              waterMl={waterMl}
              onAddWater={handleAddWater}
              onNavigateTab={setCurrentTab}
              onSelectMealDetail={setSelectedMealDetail}
            />
          )}

          {currentTab === 'scan-gizi' && (
            <ScanGiziScreen
              onScanLogged={handleScanLogged}
              onShowToast={(msg) => showToast(msg, 'insights')}
            />
          )}

          {currentTab === 'menu-harian' && (
            <MenuHarianScreen
              profile={profile}
              meals={dailyMeals}
              onToggleMealSelect={handleToggleMealSelect}
              onSwapMeal={handleSwapMeal}
              onRegenerateMenu={handleRegenerateMenu}
              onOpenGrocery={() => setIsGroceryOpen(true)}
              onSelectMealDetail={setSelectedMealDetail}
              onShowToast={showToast}
            />
          )}

          {currentTab === 'profil-ideal' && (
            <ProfilIdealScreen
              profile={profile}
              onOpenBiometrics={() => setIsBiometricsOpen(true)}
              onOpenDietPlan={() => setIsDietPlanOpen(true)}
              onToggleSensorSync={handleToggleSensorSync}
              onOpenPreferences={() => setIsDietPlanOpen(true)}
            />
          )}
        </main>

        {/* Fixed Bottom Navigation Bar */}
        <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />

        {/* Toast Notification */}
        <Toast message={toastMessage} icon={toastIcon} />

        {/* Modals */}
        <GroceryModal
          isOpen={isGroceryOpen}
          onClose={() => setIsGroceryOpen(false)}
          items={groceryItems}
          onToggleItem={handleToggleGroceryItem}
          onCopySuccess={() =>
            showToast('Daftar belanja tersalin ke Clipboard!', 'content_copy')
          }
        />

        <BiometricsModal
          isOpen={isBiometricsOpen}
          onClose={() => setIsBiometricsOpen(false)}
          profile={profile}
          onSave={handleSaveProfile}
        />

        <DietPlanModal
          isOpen={isDietPlanOpen}
          onClose={() => setIsDietPlanOpen(false)}
          profile={profile}
          onSave={handleSaveProfile}
        />

        <MealDetailModal
          meal={selectedMealDetail}
          onClose={() => setSelectedMealDetail(null)}
          onToggleComplete={(mealId) => {
            setRingkasanMeals((prev) =>
              prev.map((m) =>
                m.id === mealId ? { ...m, isCompleted: !m.isCompleted } : m
              )
            );
            showToast('Status santapan diperbarui');
          }}
        />
      </div>
    </div>
  );
}
