export type TierName = 'Bronze' | 'Silver' | 'Gold';

export interface Tier {
  id: number;
  name: TierName;
  price: number;
  commissionRate: number; // e.g. 0.2 = 20%
  recruitmentPoints: number;
  upgradePointsRequired: number;
  hasSourceFileAccess: boolean;
  perks: string[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string;
  tierId: number;
  referredBy: number | null;
  referralCode: string;
  commissionBalance: number;
  accumulatedPoints: number;
  totalSales: number;
  createdAt: string;
}

export type ProductCategorySlug = 'planner' | 'sticker' | 'wallpaper' | 'bisnis' | 'bundle';

export interface Category {
  id: number;
  name: string;
  slug: ProductCategorySlug;
}

export interface Product {
  id: number;
  categoryId: number;
  title: string;
  basePrice: number;
  /** Tailwind gradient classes, used when previewImage is not available. */
  thumbnailUrl: string;
  /** Path to a real preview image (screenshot/mockup) of the product, if available. */
  previewImage?: string;
  fileAssetUrl: string;
  sourceFileUrl: string | null;
  promotionalMaterialUrl: string | null;
  tierRequiredForSource: TierName;
}

export type TransactionType = 'sale' | 'recruitment';
export type PaymentStatus = 'paid' | 'pending' | 'failed';

export interface Transaction {
  id: number;
  transactionCode: string;
  userId: number;
  productId: number | null;
  type: TransactionType;
  amount: number;
  commissionEarned: number;
  paymentStatus: PaymentStatus;
  createdAt: string;
}

export type PointLogType = 'recruitment' | 'sale' | 'bonus' | 'adjustment';

export interface PointLog {
  id: number;
  userId: number;
  points: number;
  type: PointLogType;
  description: string;
  createdAt: string;
}

export type PayoutStatus = 'requested' | 'processing' | 'completed' | 'rejected';

export interface Payout {
  id: number;
  userId: number;
  amount: number;
  bankName: string;
  accountNumber: string;
  status: PayoutStatus;
  createdAt: string;
}

export interface OnboardingProgress {
  id: number;
  userId: number;
  profileCompleted: boolean;
  videoWatched: boolean;
  materialDownloaded: boolean;
  mayarLinkCreated: boolean;
  firstShareDone: boolean;
}

export interface ReferredMember {
  id: number;
  name: string;
  tierName: TierName;
  joinedAt: string;
  pointsGenerated: number;
}

export type NavKey =
  | 'dashboard'
  | 'catalog'
  | 'referral'
  | 'wallet'
  | 'tutorial'
  | 'help';
