export const calculateGrowthPercentage = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const formatPercentage = (num: number): string => {
  return num.toFixed(1) + '%';
};

export const calculateAverageEngagementRate = (
  instagramRate: number,
  facebookRate: number,
  youtubeRate: number,
  tiktokRate: number
): number => {
  return (instagramRate + facebookRate + youtubeRate + tiktokRate) / 4;
};

export const calculateTotalFollowers = (
  instagram: number,
  facebook: number,
  youtube: number,
  tiktok: number
): number => {
  return instagram + facebook + youtube + tiktok;
};

export const calculateTotalReach = (
  instagram: number,
  facebook: number,
  youtube: number,
  tiktok: number
): number => {
  return instagram + facebook + youtube + tiktok;
};

export const calculateTotalEngagement = (
  instagram: number,
  facebook: number,
  youtube: number,
  tiktok: number
): number => {
  return instagram + facebook + youtube + tiktok;
};

export const getPerformanceColor = (score: number): string => {
  if (score >= 85) return 'text-green-600';
  if (score >= 70) return 'text-blue-600';
  if (score >= 50) return 'text-yellow-600';
  return 'text-red-600';
};

export const getPerformanceBgColor = (score: number): string => {
  if (score >= 85) return 'bg-green-100';
  if (score >= 70) return 'bg-blue-100';
  if (score >= 50) return 'bg-yellow-100';
  return 'bg-red-100';
};

export const calculateContentPerformanceScore = (
  engagementRate: number,
  reach: number,
  saves?: number
): number => {
  const baseScore = engagementRate * 10;
  const reachBonus = reach > 15000 ? 10 : reach > 10000 ? 5 : 0;
  const savesBonus = saves && saves > 300 ? 5 : 0;
  return Math.min(100, baseScore + reachBonus + savesBonus);
};

export const getPeriodLabel = (period: string): string => {
  const labels: Record<string, string> = {
    today: 'Hari Ini',
    '7days': '7 Hari Terakhir',
    '30days': '30 Hari Terakhir',
    '90days': '90 Hari Terakhir',
    ytd: 'Tahun Ini',
    custom: 'Periode Kustom',
  };
  return labels[period] || period;
};

export const calculateSentimentScore = (
  positive: number,
  neutral: number,
  negative: number
): number => {
  const total = positive + neutral + negative;
  if (total === 0) return 0;
  return (positive * 100 + neutral * 0) / total;
};

export const getSentimentStatus = (score: number): string => {
  if (score >= 75) return 'Sangat Positif';
  if (score >= 60) return 'Positif';
  if (score >= 40) return 'Netral';
  return 'Negatif';
};

export const calculateCampaignROI = (
  spend: number,
  revenue: number
): number => {
  if (spend === 0) return 0;
  return ((revenue - spend) / spend) * 100;
};

export const formatCurrency = (num: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
};

export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (minutes === 0) return `${secs}s`;
  return `${minutes}m ${secs}s`;
};

export const calculateTrendPercentage = (current: number[], previous: number[]): number => {
  const currentAvg = current.reduce((a, b) => a + b, 0) / current.length;
  const previousAvg = previous.reduce((a, b) => a + b, 0) / previous.length;
  return calculateGrowthPercentage(currentAvg, previousAvg);
};

export const getPlatformColor = (platform: string): string => {
  const colors: Record<string, string> = {
    instagram: 'from-pink-500 to-purple-500',
    facebook: 'from-blue-600 to-blue-400',
    youtube: 'from-red-600 to-red-400',
    tiktok: 'from-black to-gray-800',
    website: 'from-green-500 to-emerald-500',
  };
  return colors[platform] || 'from-gray-500 to-gray-600';
};

export const getPlatformIcon = (platform: string): string => {
  const icons: Record<string, string> = {
    instagram: '📸',
    facebook: '👥',
    youtube: '📺',
    tiktok: '🎵',
    website: '🌐',
  };
  return icons[platform] || '📊';
};
