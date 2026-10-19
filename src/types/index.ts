export type TabId = 'ringkasan' | 'scan-gizi' | 'menu-harian' | 'profil-ideal';

export type ScanMode = 'ready' | 'barcode' | 'table';

export interface UserProfile {
  name: string;
  age: number;
  heightCm: number;
  currentWeightKg: number;
  targetWeightKg: number;
  startWeightKg: number;
  activityLevel: string;
  bmi: number;
  targetBmi: number;
  weeksRemaining: number;
  weeklyPaceKg: number;
  bmr: number;
  tdee: number;
  deficit: number;
  targetCalories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  sensorSync: boolean;
  dietPreferences: string[];
}

export interface MealItem {
  id: string;
  category: 'Sarapan' | 'Makan Siang' | 'Camilan Sore' | 'Makan Malam';
  timeStr: string;
  title: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  imageUrl: string;
  isCompleted: boolean;
  isSelected?: boolean;
  badge?: string;
  kicker?: string;
  description: string;
  ingredients?: string[];
}

export interface RecentScan {
  id: string;
  name: string;
  calories: number;
  weightG: number;
  volumeMl?: number;
  imageUrl: string;
  proteinG: number;
  carbsG: number;
  fatG: number;
  confidence: number;
  description: string;
  compatibilityNote: string;
}

export interface GroceryItem {
  id: string;
  name: string;
  category: 'Protein & Daging' | 'Sayuran & Buah' | 'Bahan Pokok & Bumbu';
  checked: boolean;
}
