import { UserProfile, MealItem, RecentScan, GroceryItem } from '../types';

export const INITIAL_PROFILE: UserProfile = {
  name: 'Amanda Putri',
  age: 26,
  heightCm: 172,
  currentWeightKg: 74.0,
  targetWeightKg: 65.0,
  startWeightKg: 76.5,
  activityLevel: 'Aktivitas Sedang (3-4x/minggu)',
  bmi: 25.0,
  targetBmi: 22.0,
  weeksRemaining: 12,
  weeklyPaceKg: 0.75,
  bmr: 1520,
  tdee: 2350,
  deficit: -500,
  targetCalories: 1850,
  proteinG: 138,
  carbsG: 208,
  fatG: 51,
  sensorSync: true,
  dietPreferences: ['Rendah Gula', 'Bebas Gluten', 'Halal', 'Tinggi Protein'],
};

export const APP_LOGO_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6HNWoAAuwgNe0ktM_PseONpegJSXW5OvQv_QWiwYVtyQ3RbNb1tVVS_qZnSqtR1yqWIigp0uOfOsrcQ1zrivGivHIZaEUbWYb39uPvi4ou5WZj_MlBXpvZMzbwSYMf54NyhdkBAQ4v-ISpUiNxgwonRnY9rTSYLLv-FSolZiENsi9mG4y6d1aeRC-Oqu8BrBshKQbVv2cSAFVBuR60lQ1M91fghpmNatOkoJrOLgllBT1pz3s5ToL';

export const USER_AVATAR_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwLAZcu2IAzIRahtdw_ByIPKAplyQlzL6mgD1NHCCLZSwUXQMnBl2EvnWRscEuexLjouUWkCXbGYQ2MPPtH4Xgm3by6jNIHZHR2GjINzvjXQ-iUtC4h--dL0PwCt5lcrjNmRRK-986UqAwT3quMKgqZ33S3rjTEY1IXi4BRBIEQqe40ew-AeDgNt9EjKwqrAHf_licZY2nOWLaxdX9BrovvTBCrmY6vMRGM4FY6Es41oWk2ndyuCYO';

export const DINNER_RECOMMENDATION_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHwmZah9yegXT27otq0iA4DcLw4Khy0yY0iNo_sQc68_vg-cmeIjB9r_tXrB_q_r5JUf4Jjke191A_r2uUtONwUYL_c9c3IQKDwNfXkP8E6IlOCLG-sMXoQ4nBLO9kubhJ3lONqniy-hrMo8c61guxa2_7Ww05hQuBEgjxpgwLUYq1bOakh3qmQBiUoqFcsFB34Esn_MtSPu1kAy82QdME0g10rtBIs6l7QXSsv13mIW2Z1KoN5zM7';

export const INITIAL_MEALS_RINGKASAN: MealItem[] = [
  {
    id: 'm1',
    category: 'Sarapan',
    timeStr: '08:00',
    title: 'Oatmeal Pisang & Chia Seeds',
    calories: 360,
    proteinG: 12,
    carbsG: 60,
    fatG: 7,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8yTurXOdamHVcMVe7TbuQLVce38SH7CMYimuaJNx5fLmzETZcHDSrZ_LFYiSqb1HxSZ9fd9uRyhmk06EtPIgdLXHGOI_mAtazXhUWT_0PUcBsevId6xLqTaWaTu72FyXhhndW0uqR_iZvBc5hGOVd1eVMappA1rDx-MpYTlw9b1jvSxAqqGXI7pWakjaYMzTTGCYFpy8UkVNJ5YpZ0lSYfh7hdoyLNKlyudh3t7hapJPGtat1ObQg',
    isCompleted: true,
    description: 'Semangkuk oatmeal hangat dengan irisan pisang manis alami, taburan chia seeds kaya omega-3, dan sedikit madu.',
    ingredients: ['Oatmeal 60g', 'Pisang Cavendish 1 buah', 'Chia seeds 1 sdm', 'Susu almond 150ml']
  },
  {
    id: 'm2',
    category: 'Makan Siang',
    timeStr: '12:30',
    title: 'Dada Ayam Panggang & Nasi Merah',
    calories: 580,
    proteinG: 45,
    carbsG: 65,
    fatG: 12,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBazC0M7AXlIJ5d2PIyGmFlrBuwS0Nu3qeAx2NBe1omRV9jBBtR-XmKQDSijm_SFe5R5KRkErpBYwZo7f7Qj2drjspiA-Y95lQ8EAnAW0_Eq1xynxx9Ua7tIZrn-azFnvZYvvDvbnKOtIIpT54LbQrMgeD6OUs9fk5N5ieIJuyalyBwAzv-YASfn63a5XnS5uxbfW01WyvmfYcz9mZ0CavY4swRJSCnk2h-k4s-Y8S_wwd1Cjmp_0n3',
    isCompleted: true,
    description: 'Dada ayam tanpa kulit dipanggang dengan rempah herbal rosemary, disajikan bersama nasi merah organik dan brokoli kukus.',
    ingredients: ['Dada ayam fillet 180g', 'Nasi merah 150g', 'Brokoli kukus 100g', 'Minyak zaitun 1 sdt']
  },
  {
    id: 'm3',
    category: 'Camilan Sore',
    timeStr: '16:15',
    title: 'Apel Segar & Segenggam Almond',
    calories: 300,
    proteinG: 8,
    carbsG: 32,
    fatG: 16,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBM4f5qdcZRo368UBxN2RvgnIXJXnQTGRXU6dw7yrRzgJCJ0oVp0Mk22cgP4j_psQXyiJwwLjZKWSyuR7f4bmfxuilEHl3BBF0ZBroLuf5wYAMKJ-8nopNKsEKDpKnbXuLa1CTA2l0snov8zxwU80EDMKhhTpFjGYLu25Izix3CRXR9sOe4OB6DALWfH4KBWoaDGWwQWEUyYkJPz-XvwSCxy6Y1YfbL028Xn-BV_fOhzI1upByBO_Ld',
    isCompleted: true,
    description: 'Satu buah apel merah renyah kaya antioksidan dan serat pektin dipadukan dengan kacang almond panggang tanpa garam.',
    ingredients: ['Apel Fuji 1 buah', 'Almond panggang 25g']
  },
  {
    id: 'm4',
    category: 'Makan Malam',
    timeStr: '19:30',
    title: 'Menu Rekomendasi NutriFit',
    calories: 610,
    proteinG: 35,
    carbsG: 40,
    fatG: 18,
    imageUrl: DINNER_RECOMMENDATION_IMG,
    isCompleted: false,
    badge: 'Rencana',
    description: 'Salmon Atlantik kukus dengan tumis jamur tiram dan pakcoy bawang putih, sangat ideal menghabiskan sisa kuota kalori harian.',
    ingredients: ['Salmon fillet 160g', 'Jamur tiram 100g', 'Pakcoy 80g', 'Kecap asin rendah sodium']
  }
];

export const INITIAL_DAILY_MEALS: MealItem[] = [
  {
    id: 'dm1',
    category: 'Sarapan',
    timeStr: '07.30 WIB',
    title: 'Smoothie Bowl Bayam, Pisang & Whey Protein',
    calories: 380,
    proteinG: 28,
    carbsG: 45,
    fatG: 8,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoqEJ7bahXa0EU4vPmhG-55ecvw3HkOrcYFNvLlBRupeGrQiVQ9_-ZgaMuYn7TZnXTTfIgeduvcw_2Rq9LY5sGo-JLVJfJugQK1IeRjin-QaSdnad2dkuXMkKFF6Ha_6PU_e92e0HdyGHUHjMeX0IoaLVxQGG0s-t9G3DG_6tMCQ4iriSpyaDwV9dDm_Q6EpOLGHxRh-zp5ec9nJ72z1fpR444e-KUhGkojMLiKHKVE9ZreQb6ExmJ',
    isCompleted: true,
    isSelected: true,
    description: 'Pisang cavendish, bayam baby, 1 scoop whey vanila, susu skim.',
    ingredients: ['Pisang cavendish 1 buah', 'Bayam baby 50g', 'Whey protein vanilla 1 scoop', 'Susu skim 150ml', 'Topping almond slice']
  },
  {
    id: 'dm2',
    category: 'Makan Siang',
    timeStr: '12.30 WIB',
    title: 'Nasi Merah, Dada Ayam Bakar Madu & Tumis Buncis',
    calories: 620,
    proteinG: 48,
    carbsG: 55,
    fatG: 14,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNTsUpnuJdJxEMULdCBTFENx7xPRsnvfRoyenbXkMmvwn3AyMx0mdlYb8JWFnLlOd12iHWg6iklyuXVL8D_ew2VHYu_nlNv8rjjrhUzbuQEAFsW93oP_a4gcAdHdOWx0Ai5vt3gY37gfS9YlFFWWm03ma7vcTik6V1DXpy8cgvWBuegcRHpjPd7cZ9alhisdokrPqbs6zugvAqYmzfW-j1rzY6c3s2wlaSU076wq-IhaAlwS3mk6DA',
    isCompleted: true,
    isSelected: true,
    badge: 'Rekomendasi Chef',
    kicker: 'Tinggi Serat & Mengenyangkan',
    description: 'Dada ayam bakar bumbu madu gurih, disajikan dengan nasi merah hangat dan tumis buncis bawang putih.',
    ingredients: ['Dada ayam 200g', 'Madu murni 1 sdm', 'Nasi merah 140g', 'Buncis muda 100g', 'Bawang putih 2 siung']
  },
  {
    id: 'dm3',
    category: 'Camilan Sore',
    timeStr: '16.00 WIB',
    title: 'Greek Yogurt dengan Blueberry & Madu',
    calories: 210,
    proteinG: 15,
    carbsG: 18,
    fatG: 5,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA976Ew8nkoF52ysK3ThxmpxUHWtZW7mGRGd-_rq6usTTgqtr1pRukUGxZy2Z6eQjphAIc-KJxA8PHx45WR38N-wa1UcYsZvPkoJ3MrVsQOpjChYbGLif-UDkuT1iA4h14AEZJTEFu_U5_F1Fdh8JDAKmJEXs7MNtZX8ccSSJTuB_a79-rQE7by8cHMPqQCeUP3Shig1lIcERh23ov_E6H7UIAZBz54XwK17A0ORnDgVPcy32i2_Rs5',
    isCompleted: true,
    isSelected: true,
    description: 'Greek yogurt plain 150g, 30g blueberry segar, 1 sdt madu murni.',
    ingredients: ['Greek yogurt plain 150g', 'Blueberry segar 30g', 'Madu murni 1 sdt', 'Walnut cincang 10g']
  },
  {
    id: 'dm4',
    category: 'Makan Malam',
    timeStr: '19.00 WIB',
    title: 'Sup Ikan Kakap Kuah Bening & Tahu Kukus',
    calories: 480,
    proteinG: 38,
    carbsG: 20,
    fatG: 9,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_88VuILUQZnw0f9vBJpNh5xG7XGwiv-9tVz6Fsyb7NTlG2riqiIC1x10hwO3WbjyyoaMqFNRVKhuDDVLCih5m7j4ANujZV9urG4s-vMWsUgdP8-hu3hKd2gJSujMgyfTJIMwGcq-tQotC9Pe4edAGnPWrSB95AwBc4lN8rhe7CRAwhxb7-2Lj1E5qRF4nOaePB-5o5AsO0kanc-f_psaWqkZuu1S_VMAyCroGuADiAF94l-wirury',
    isCompleted: false,
    isSelected: true,
    badge: 'Ringan & Hangat',
    kicker: 'Rendah Karbo untuk Malam Hari',
    description: 'Fillet kakap putih segar diseduh kuah kaldu rempah jahe, sereh, daun ketumbar bersama tahu sutra kukus.',
    ingredients: ['Fillet ikan kakap 180g', 'Tahu sutra 100g', 'Jahe 2 ruas', 'Tomat merah 1 buah', 'Kemangi segar']
  }
];

export const ALTERNATE_MEALS: Record<string, MealItem[]> = {
  Sarapan: [
    {
      id: 'alt_s1',
      category: 'Sarapan',
      timeStr: '07.30 WIB',
      title: 'Avocado Toast & Telur Rebus Setengah Matang',
      calories: 390,
      proteinG: 24,
      carbsG: 38,
      fatG: 14,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWhjF_ntKFPnx1Q1hL9ta_gO9QX1nM7sWlHYRmFYTSWm60GaXyXw_NvcKYR8RLEKXoYNZ29us6prR0JBYHIpOoKNZ61t-PTb0o_dh4QIM0jZiVyGWaPsrw3ZtuxgS6P7dwMkBLE8Yy1595QXnHY5tPpzhcwuEEbUjDmWWv8in3I86o6Psnm1YIUXTdA3XmTyMx62wXb7MmE9ioli6d3Ezwc0Z4_THoDflSiQgSoKfiJeXyRLpA5sml',
      isCompleted: false,
      description: 'Roti gandum utuh panggang dilapisi alpukat tumbuk lemon dan 2 butir telur rebus.',
      ingredients: ['Roti sourdough gandum 2 lembar', 'Alpukat 1/2 buah', 'Telur ayam omega 2 butir', 'Garam laut & lada hitam']
    }
  ],
  'Makan Siang': [
    {
      id: 'alt_l1',
      category: 'Makan Siang',
      timeStr: '12.30 WIB',
      title: 'Steak Tempe Panggang & Quinoa Bowl',
      calories: 590,
      proteinG: 36,
      carbsG: 62,
      fatG: 16,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBazC0M7AXlIJ5d2PIyGmFlrBuwS0Nu3qeAx2NBe1omRV9jBBtR-XmKQDSijm_SFe5R5KRkErpBYwZo7f7Qj2drjspiA-Y95lQ8EAnAW0_Eq1xynxx9Ua7tIZrn-azFnvZYvvDvbnKOtIIpT54LbQrMgeD6OUs9fk5N5ieIJuyalyBwAzv-YASfn63a5XnS5uxbfW01WyvmfYcz9mZ0CavY4swRJSCnk2h-k4s-Y8S_wwd1Cjmp_0n3',
      isCompleted: false,
      badge: 'Nabati Berprotein',
      kicker: 'Kaya Prebiotik Alami',
      description: 'Tempe maronasi kecap kedelai hitam panggang disajikan di atas quinoa hangat dan salad edamame.',
      ingredients: ['Tempe kedelai 200g', 'Quinoa 120g', 'Edamame 50g', 'Wortel parut']
    }
  ],
  'Camilan Sore': [
    {
      id: 'alt_c1',
      category: 'Camilan Sore',
      timeStr: '16.00 WIB',
      title: 'Edamame Rebus & Air Kelapa Murni',
      calories: 190,
      proteinG: 14,
      carbsG: 16,
      fatG: 5,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrUo_zqYvuYqnz45EkNHmsFPQPLg5ehgk_dl7e96LBnxYN9cmYBPuBxVlwvygSAkPCWIPXWtQKTqC5T_IyeKnAgIgs_LVdVzYVZdt7IAkaAOGXZoOQfQd2GbAVv_RCv95Rf6Tq53FueoLCic6mXs3_Z7s09YV3OrJZ5GfsjBHHbpJpFCJ5d-bxdA6V2zLw0BfWdL-ZRTiWBXppWlG2Ljd9fihpIyA1JI4w36tOMhUyaXATq5lytrNQ',
      isCompleted: false,
      description: 'Edamame segar rebus tabur garam himalaya ditemani segelas air kelapa alami kaya elektrolit.',
      ingredients: ['Edamame 150g', 'Air kelapa murni 200ml', 'Garam himalaya sejumput']
    }
  ],
  'Makan Malam': [
    {
      id: 'alt_d1',
      category: 'Makan Malam',
      timeStr: '19.00 WIB',
      title: 'Salmon Panggang Lemon & Salad Asparagus',
      calories: 510,
      proteinG: 42,
      carbsG: 18,
      fatG: 18,
      imageUrl: DINNER_RECOMMENDATION_IMG,
      isCompleted: false,
      badge: 'Omega-3 Booster',
      kicker: 'Metabolisme Malam Optimal',
      description: 'Potongan fillet salmon segar dipanggang dengan perasan lemon, minyak zaitun, dan asparagus muda panggang.',
      ingredients: ['Fillet salmon 170g', 'Asparagus 100g', 'Lemon 1 iris', 'Minyak zaitun extra virgin 1 sdm']
    }
  ]
};

export const RECENT_SCANS: RecentScan[] = [
  {
    id: 's1',
    name: 'Salmon Quinoa Avocado Bowl',
    calories: 520,
    weightG: 350,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWhjF_ntKFPnx1Q1hL9ta_gO9QX1nM7sWlHYRmFYTSWm60GaXyXw_NvcKYR8RLEKXoYNZ29us6prR0JBYHIpOoKNZ61t-PTb0o_dh4QIM0jZiVyGWaPsrw3ZtuxgS6P7dwMkBLE8Yy1595QXnHY5tPpzhcwuEEbUjDmWWv8in3I86o6Psnm1YIUXTdA3XmTyMx62wXb7MmE9ioli6d3Ezwc0Z4_THoDflSiQgSoKfiJeXyRLpA5sml',
    proteinG: 38,
    carbsG: 42,
    fatG: 18,
    confidence: 98,
    description: 'Porsi seimbang: Salmon Atlantik panggang, alpukat mentega & quinoa',
    compatibilityNote: 'Sesuai target defisit Anda (Tinggi Protein 38g)'
  },
  {
    id: 's2',
    name: 'Apel Fuji Segar',
    calories: 95,
    weightG: 180,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIxvbBBjqsRrOJKk6pj5nH29g1HvBTGWlSsfn0ZpdyKum0Xr9BUii4bGNqm2n_G_VuAXLZSenPdJv68k2wNOPI2mAhGooGhLtQKZ0Y-0SBz6PetoKtoViZCe8gLOZN3rIP1IBi1T5Mv4Ie5LwdUPA9dcEBA9sXXnhbEfri67uEkzCpPwdjIezr8zZt2-5L8nSvJhqDlXbgbK9pPTLUu1ufk406QjFvJoOA_eZIoDvoPlmRBmCrIahD',
    proteinG: 0.5,
    carbsG: 25,
    fatG: 0.3,
    confidence: 99,
    description: 'Apel manis renyah kaya pektin dan serat larut untuk mengontrol nafsu makan.',
    compatibilityNote: 'Camilan rendah kalori ideal di fase defisit'
  },
  {
    id: 's3',
    name: 'Susu Kedelai',
    calories: 120,
    weightG: 250,
    volumeMl: 250,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6N6kELca5mzQQACkZnXAtiMjX3FGjWp3nphKzX6HM60dXXNnyDybBWwZIk35fxR2dqV_uzblYiBHo5hg_z6vPiRmoPh7ETsSUmhRDb_Yz1Ecog4hOe1QxB9gHgMqT1EHPq3VtpfQKkLuHb35Ud0VFiLTu0n2k1E3cMlyxW7Pp-SIHLWPsS69VAtQ8vY1yLNvfubZvrcCURV_k6MGyfIeAFHnq8kKeDW0N47ETyXJao60fxuPGN8Nt',
    proteinG: 9,
    carbsG: 8,
    fatG: 4.5,
    confidence: 97,
    description: 'Susu kedelai tanpa tambahan gula pasir, bebas laktosa dan kaya isoflavon.',
    compatibilityNote: 'Sumber protein nabati rendah indeks glikemik'
  },
  {
    id: 's4',
    name: 'Granola Bar',
    calories: 165,
    weightG: 40,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrUo_zqYvuYqnz45EkNHmsFPQPLg5ehgk_dl7e96LBnxYN9cmYBPuBxVlwvygSAkPCWIPXWtQKTqC5T_IyeKnAgIgs_LVdVzYVZdt7IAkaAOGXZoOQfQd2GbAVv_RCv95Rf6Tq53FueoLCic6mXs3_Z7s09YV3OrJZ5GfsjBHHbpJpFCJ5d-bxdA6V2zLw0BfWdL-ZRTiWBXppWlG2Ljd9fihpIyA1JI4w36tOMhUyaXATq5lytrNQ',
    proteinG: 4,
    carbsG: 22,
    fatG: 6,
    confidence: 96,
    description: 'Bite snack oat gandum dengan potongan almond dan sedikit sentuhan madu hutan.',
    compatibilityNote: 'Energi cepat sebelum latihan fisik'
  }
];

export const INITIAL_GROCERY_LIST: GroceryItem[] = [
  { id: 'g1', name: 'Dada Ayam Fillet (200 gr)', category: 'Protein & Daging', checked: true },
  { id: 'g2', name: 'Fillet Ikan Kakap Segar (180 gr)', category: 'Protein & Daging', checked: true },
  { id: 'g3', name: 'Whey Protein Vanilla (1 Sachet)', category: 'Protein & Daging', checked: false },
  { id: 'g4', name: 'Bayam Organik / Baby Spinach (1 ikat)', category: 'Sayuran & Buah', checked: false },
  { id: 'g5', name: 'Buncis Muda (100 gr)', category: 'Sayuran & Buah', checked: true },
  { id: 'g6', name: 'Blueberry Segar & Pisang (1 pack)', category: 'Sayuran & Buah', checked: false },
  { id: 'g7', name: 'Nasi Merah Organik (500 gr)', category: 'Bahan Pokok & Bumbu', checked: true },
  { id: 'g8', name: 'Greek Yogurt Plain (200 gr)', category: 'Bahan Pokok & Bumbu', checked: false },
  { id: 'g9', name: 'Madu Murni Alami (1 botol)', category: 'Bahan Pokok & Bumbu', checked: true }
];
