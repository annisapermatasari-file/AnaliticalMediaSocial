import type {
  Category,
  OnboardingProgress,
  PayoutStatus,
  Payout,
  PointLog,
  Product,
  ReferredMember,
  Tier,
  Transaction,
  User,
} from '@/src/types';

export const tiers: Tier[] = [
  {
    id: 1,
    name: 'Bronze',
    price: 99000,
    commissionRate: 0.2,
    recruitmentPoints: 50,
    upgradePointsRequired: 0,
    hasSourceFileAccess: false,
    perks: ['Akses File Siap Cetak', 'Komisi Penjualan 20%', 'Dashboard Reseller'],
  },
  {
    id: 2,
    name: 'Silver',
    price: 249000,
    commissionRate: 0.35,
    recruitmentPoints: 100,
    upgradePointsRequired: 500,
    hasSourceFileAccess: false,
    perks: ['Semua Akses Bronze', 'Komisi Penjualan 35%', 'Poin Rekrutmen 2x Lipat'],
  },
  {
    id: 3,
    name: 'Gold',
    price: 499000,
    commissionRate: 0.5,
    recruitmentPoints: 200,
    upgradePointsRequired: 1500,
    hasSourceFileAccess: true,
    perks: ['Semua Akses Silver', 'Komisi Penjualan 50%', 'Akses File Mentahan/Canva/PSD', 'Prioritas Support'],
  },
];

export const currentUser: User = {
  id: 1,
  name: 'Rizky Ramadhan',
  email: 'rizky.ramadhan@example.com',
  tierId: 1,
  referredBy: null,
  referralCode: 'rizkyr',
  commissionBalance: 500000,
  accumulatedPoints: 750,
  totalSales: 2500000,
  createdAt: '2026-06-12T08:00:00Z',
};

export const categories: Category[] = [
  { id: 1, name: 'Planner', slug: 'planner' },
  { id: 2, name: 'Bisnis', slug: 'bisnis' },
  { id: 3, name: 'Bundle', slug: 'bundle' },
];

export const products: Product[] = [
  {
    id: 1,
    categoryId: 1,
    title: 'Weekly Business Stats Tracker',
    basePrice: 35000,
    thumbnailUrl: 'from-teal-200 to-emerald-300',
    previewImage: '/assets/previews/tracker-social-media.png',
    fileAssetUrl: '/assets/products/tracker-social-media/weekly-stats-tracker.pdf',
    sourceFileUrl: null,
    promotionalMaterialUrl: '/assets/products/tracker-social-media/video-tutorial.mp4',
    tierRequiredForSource: 'Gold',
  },
  {
    id: 2,
    categoryId: 1,
    title: 'Simple Travel Planner (Google Sheets)',
    basePrice: 29000,
    thumbnailUrl: 'from-sky-200 to-blue-300',
    fileAssetUrl: '/assets/products/travel-planner/simple-travel-planner.pdf',
    sourceFileUrl: null,
    promotionalMaterialUrl: '/assets/products/travel-planner/google-sheets-tips-and-tricks.pdf',
    tierRequiredForSource: 'Gold',
  },
  {
    id: 3,
    categoryId: 1,
    title: 'Office Supplies Inventory + Shopping List',
    basePrice: 25000,
    thumbnailUrl: 'from-amber-100 to-orange-200',
    fileAssetUrl: '/assets/products/office-inventory/office-inventory.pdf',
    sourceFileUrl: null,
    promotionalMaterialUrl: null,
    tierRequiredForSource: 'Gold',
  },
  {
    id: 4,
    categoryId: 2,
    title: 'Line Sheet & Wholesale Catalogue Template',
    basePrice: 32000,
    thumbnailUrl: 'from-rose-200 to-pink-300',
    fileAssetUrl: '/assets/products/line-sheet/line-sheet-catalogue.pdf',
    sourceFileUrl: null,
    promotionalMaterialUrl: null,
    tierRequiredForSource: 'Gold',
  },
  {
    id: 5,
    categoryId: 3,
    title: 'The Script Collection — 90+ Font Bundle',
    basePrice: 75000,
    thumbnailUrl: 'from-indigo-300 to-purple-400',
    fileAssetUrl: '/assets/products/font-bundle/script-collection-fonts.zip',
    sourceFileUrl: null,
    promotionalMaterialUrl: null,
    tierRequiredForSource: 'Gold',
  },
];

export const transactions: Transaction[] = [
  {
    id: 1,
    transactionCode: 'TRX-20260901-001',
    userId: 1,
    productId: 1,
    type: 'sale',
    amount: 35000,
    commissionEarned: 7000,
    paymentStatus: 'paid',
    createdAt: '2026-09-01T09:15:00Z',
  },
  {
    id: 2,
    transactionCode: 'TRX-20260902-002',
    userId: 1,
    productId: 4,
    type: 'sale',
    amount: 29000,
    commissionEarned: 5800,
    paymentStatus: 'paid',
    createdAt: '2026-09-02T14:20:00Z',
  },
  {
    id: 3,
    transactionCode: 'TRX-20260903-003',
    userId: 1,
    productId: 2,
    type: 'sale',
    amount: 15000,
    commissionEarned: 3000,
    paymentStatus: 'paid',
    createdAt: '2026-09-03T10:05:00Z',
  },
  {
    id: 4,
    transactionCode: 'TRX-20260905-004',
    userId: 1,
    productId: null,
    type: 'recruitment',
    amount: 0,
    commissionEarned: 0,
    paymentStatus: 'paid',
    createdAt: '2026-09-05T11:40:00Z',
  },
  {
    id: 5,
    transactionCode: 'TRX-20260906-005',
    userId: 1,
    productId: 6,
    type: 'sale',
    amount: 14000,
    commissionEarned: 2800,
    paymentStatus: 'pending',
    createdAt: '2026-09-06T18:00:00Z',
  },
];

export const pointLogs: PointLog[] = [
  {
    id: 1,
    userId: 1,
    points: 500,
    type: 'recruitment',
    description: 'Rekrut reseller baru: Rizky Marhow',
    createdAt: '2026-08-20T10:00:00Z',
  },
  {
    id: 2,
    userId: 1,
    points: 150,
    type: 'sale',
    description: 'Bonus poin dari 3 transaksi penjualan',
    createdAt: '2026-08-28T13:30:00Z',
  },
  {
    id: 3,
    userId: 1,
    points: 50,
    type: 'recruitment',
    description: 'Rekrut reseller baru: Salsa Amelia',
    createdAt: '2026-09-01T09:00:00Z',
  },
  {
    id: 4,
    userId: 1,
    points: 50,
    type: 'bonus',
    description: 'Bonus onboarding checklist selesai',
    createdAt: '2026-09-04T08:00:00Z',
  },
];

export const payouts: Payout[] = [
  {
    id: 1,
    userId: 1,
    amount: 250000,
    bankName: 'BCA',
    accountNumber: '1234567890',
    status: 'completed' as PayoutStatus,
    createdAt: '2026-08-15T10:00:00Z',
  },
  {
    id: 2,
    userId: 1,
    amount: 500000,
    bankName: 'BCA',
    accountNumber: '1234567890',
    status: 'processing' as PayoutStatus,
    createdAt: '2026-09-05T10:00:00Z',
  },
];

export const onboardingProgress: OnboardingProgress = {
  id: 1,
  userId: 1,
  profileCompleted: true,
  videoWatched: true,
  materialDownloaded: true,
  mayarLinkCreated: false,
  firstShareDone: false,
};

export const referredMembers: ReferredMember[] = [
  {
    id: 2,
    name: 'Rizky Marhow',
    tierName: 'Bronze',
    joinedAt: '2026-08-20T10:00:00Z',
    pointsGenerated: 500,
  },
  {
    id: 3,
    name: 'Salsa Amelia',
    tierName: 'Bronze',
    joinedAt: '2026-09-01T09:00:00Z',
    pointsGenerated: 50,
  },
  {
    id: 4,
    name: 'Dimas Prasetyo',
    tierName: 'Silver',
    joinedAt: '2026-07-10T09:00:00Z',
    pointsGenerated: 100,
  },
];

export const faqs = [
  {
    question: 'Apa bedanya Tier Bronze, Silver, dan Gold?',
    answer:
      'Setiap tier menentukan besaran komisi penjualan dan poin rekrutmen yang kamu dapatkan. Bronze mendapat komisi 20%, Silver 35%, dan Gold 50%. Semakin tinggi tier, semakin besar komisi dan akses filenya — Gold juga mendapat akses file mentahan (Canva/PSD).',
  },
  {
    question: 'Bagaimana cara mencairkan komisi?',
    answer:
      'Buka menu Dompet & Poin, lalu klik "Ajukan Pencairan". Masukkan nominal, nama bank, dan nomor rekening kamu. Pencairan akan diproses dalam 1-3 hari kerja.',
  },
  {
    question: 'Bolehkah saya mengedit desain produk?',
    answer:
      'Untuk reseller Bronze dan Silver, kamu hanya mendapatkan file siap cetak (tidak bisa diedit). Reseller Gold mendapat akses file mentahan (Canva/PSD) sehingga bisa melakukan kustomisasi desain.',
  },
  {
    question: 'Bagaimana cara upgrade tier?',
    answer:
      'Upgrade tier bisa dilakukan otomatis melalui akumulasi poin dari hasil rekrutmen reseller baru dan penjualan — tanpa perlu membayar tunai. Silver butuh 500 poin, Gold butuh 1500 poin.',
  },
  {
    question: 'Apa itu link referral dan bagaimana cara pakainya?',
    answer:
      'Link referral adalah link unik kamu untuk mengajak orang lain menjadi reseller. Setiap orang yang mendaftar lewat link kamu akan otomatis menambah poin ke akunmu.',
  },
];
