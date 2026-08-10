import { subDays } from 'date-fns';
import type { ContentAnalytics, PlatformData } from '@/src/types/index';

const generateDateRange = (days: number) => {
  const dates = [];
  for (let i = days - 1; i >= 0; i--) {
    dates.push(subDays(new Date(), i).toISOString().split('T')[0]);
  }
  return dates;
};

const generateRandomNumber = (min: number, max: number, variance: number = 0.1) => {
  const base = Math.floor(Math.random() * (max - min + 1)) + min;
  const randomVariance = base * variance * (Math.random() - 0.5) * 2;
  return Math.floor(base + randomVariance);
};

// Generate 90 days of mock data
const dates90Days = generateDateRange(90);
const dates30Days = generateDateRange(30);
const dates7Days = generateDateRange(7);

// Instagram metrics data
const generateInstagramMetrics = () => {
  const baseFollowers = 45000;
  const data = [];
  for (let i = 0; i < dates90Days.length; i++) {
    const growth = generateRandomNumber(50, 200);
    data.push({
      date: dates90Days[i],
      followers: baseFollowers + (i * growth),
      reach: generateRandomNumber(8000, 15000),
      impressions: generateRandomNumber(12000, 25000),
      engagement: generateRandomNumber(1200, 3000),
      engagementRate: generateRandomNumber(3.5, 8.2, 0.05),
      saves: generateRandomNumber(100, 500),
      comments: generateRandomNumber(50, 300),
      likes: generateRandomNumber(500, 2500),
    });
  }
  return data;
};

// Facebook metrics data
const generateFacebookMetrics = () => {
  const baseFollowers = 38000;
  const data = [];
  for (let i = 0; i < dates90Days.length; i++) {
    const growth = generateRandomNumber(30, 150);
    data.push({
      date: dates90Days[i],
      followers: baseFollowers + (i * growth),
      reach: generateRandomNumber(6000, 12000),
      impressions: generateRandomNumber(10000, 20000),
      engagement: generateRandomNumber(800, 2200),
      engagementRate: generateRandomNumber(2.5, 7, 0.05),
      likes: generateRandomNumber(300, 1500),
      comments: generateRandomNumber(30, 200),
      shares: generateRandomNumber(20, 150),
    });
  }
  return data;
};

// YouTube metrics data
const generateYoutubeMetrics = () => {
  const baseSubscribers = 28000;
  const data = [];
  for (let i = 0; i < dates90Days.length; i++) {
    const growth = generateRandomNumber(20, 100);
    data.push({
      date: dates90Days[i],
      subscribers: baseSubscribers + (i * growth),
      views: generateRandomNumber(8000, 25000),
      watchTime: generateRandomNumber(4000, 12000),
      avgViewDuration: generateRandomNumber(180, 480),
      likes: generateRandomNumber(200, 800),
      comments: generateRandomNumber(20, 150),
      impressions: generateRandomNumber(15000, 40000),
    });
  }
  return data;
};

// TikTok metrics data
const generateTikTokMetrics = () => {
  const baseFollowers = 52000;
  const data = [];
  for (let i = 0; i < dates90Days.length; i++) {
    const growth = generateRandomNumber(100, 500);
    data.push({
      date: dates90Days[i],
      followers: baseFollowers + (i * growth),
      videoViews: generateRandomNumber(50000, 250000),
      likes: generateRandomNumber(2000, 15000),
      comments: generateRandomNumber(200, 1500),
      shares: generateRandomNumber(100, 1000),
      saves: generateRandomNumber(500, 3000),
      profileViews: generateRandomNumber(5000, 25000),
    });
  }
  return data;
};

// Website metrics data
const generateWebsiteMetrics = () => {
  const data = [];
  for (let i = 0; i < dates90Days.length; i++) {
    data.push({
      date: dates90Days[i],
      visitors: generateRandomNumber(2000, 8000),
      sessions: generateRandomNumber(2500, 10000),
      pageViews: generateRandomNumber(8000, 35000),
      avgSessionDuration: generateRandomNumber(120, 420),
      bounceRate: generateRandomNumber(35, 65),
    });
  }
  return data;
};

// Current platform data
export const platformData: PlatformData = {
  instagram: {
    account: '@kursuskita',
    followers: 47250,
    followerGrowth: 1250,
    reach: 14250,
    impressions: 24500,
    engagement: 2840,
    engagementRate: 6.5,
    posts: 145,
    saves: 428,
    videoViews: 185000,
  },
  facebook: {
    account: 'KursusKita.info',
    followers: 39850,
    followerGrowth: 950,
    reach: 11200,
    impressions: 19800,
    engagement: 1920,
    engagementRate: 5.8,
    likes: 1200,
    comments: 420,
    shares: 180,
  },
  youtube: {
    channel: '@kursuskita1211',
    followers: 30800,
    followerGrowth: 650,
    reach: 32000,
    impressions: 38500,
    engagement: 1280,
    engagementRate: 4.2,
    videos: 89,
    watchTime: 8450,
    avgViewDuration: 325,
    videoViews: 185000,
  },
  tiktok: {
    account: '@kursuskita',
    followers: 65250,
    followerGrowth: 2150,
    reach: 420000,
    impressions: 580000,
    engagement: 42500,
    engagementRate: 8.5,
    profileViews: 18500,
    videoViews: 185000,
  },
  website: {
    visitors: 5420,
    sessions: 6850,
    pageViews: 24180,
    avgSessionDuration: 285,
    bounceRate: 48,
  },
};

// Time series data
export const instagramMetrics = generateInstagramMetrics();
export const facebookMetrics = generateFacebookMetrics();
export const youtubeMetrics = generateYoutubeMetrics();
export const tiktokMetrics = generateTikTokMetrics();
export const websiteMetrics = generateWebsiteMetrics();

// Content examples
export const contentExamples: ContentAnalytics[] = [
  {
    id: '1',
    platform: 'instagram',
    title: 'Tips Belajar Efektif untuk Siswa Baru',
    contentType: 'Reels',
    topic: 'Edukasi',
    date: '2024-08-08',
    reach: 18500,
    impressions: 32000,
    views: 28500,
    likes: 2850,
    comments: 425,
    shares: 180,
    saves: 520,
    engagementRate: 9.2,
    performanceScore: 92,
  },
  {
    id: '2',
    platform: 'instagram',
    title: 'Testimoni Peserta Kursus Sukses',
    contentType: 'Carousel',
    topic: 'Testimoni',
    date: '2024-08-07',
    reach: 12300,
    impressions: 21000,
    views: 18500,
    likes: 1850,
    comments: 320,
    shares: 95,
    saves: 280,
    engagementRate: 7.5,
    performanceScore: 78,
  },
  {
    id: '3',
    platform: 'tiktok',
    title: 'Belajar Coding dalam 60 Detik',
    contentType: 'Short',
    topic: 'Coding',
    date: '2024-08-06',
    reach: 145000,
    impressions: 280000,
    views: 215000,
    likes: 18500,
    comments: 2840,
    shares: 4200,
    saves: 3850,
    engagementRate: 12.8,
    performanceScore: 96,
  },
  {
    id: '4',
    platform: 'youtube',
    title: 'Panduan Lengkap Menggunakan Dashboard Analytics',
    contentType: 'Video',
    topic: 'Tutorial',
    date: '2024-08-05',
    reach: 42000,
    impressions: 68000,
    views: 38500,
    likes: 2100,
    comments: 180,
    shares: 65,
    saves: 0,
    engagementRate: 5.8,
    performanceScore: 82,
  },
  {
    id: '5',
    platform: 'facebook',
    title: 'Promo Spesial Bulan Agustus',
    contentType: 'Feed',
    topic: 'Promosi',
    date: '2024-08-04',
    reach: 16500,
    impressions: 28000,
    views: 24500,
    likes: 1250,
    comments: 280,
    shares: 150,
    saves: 0,
    engagementRate: 5.9,
    performanceScore: 76,
  },
  {
    id: '6',
    platform: 'instagram',
    title: 'Sertifikasi Profesional Tersedia Sekarang',
    contentType: 'Feed',
    topic: 'Sertifikasi',
    date: '2024-08-03',
    reach: 9800,
    impressions: 16500,
    views: 14200,
    likes: 650,
    comments: 120,
    shares: 42,
    saves: 180,
    engagementRate: 5.2,
    performanceScore: 68,
  },
];

// AI Insights (mock generated)
export const aiInsights = {
  keyFindings: [
    'Engagement rate Instagram meningkat 24% dibandingkan periode sebelumnya',
    'TikTok menjadi platform dengan performa terbaik dengan 12.8% engagement rate',
    'Konten video pendek menghasilkan engagement 3.2x lebih tinggi dari konten statis',
    'Peak engagement terjadi antara jam 19:00-21:00 setiap hari',
    'Audience dari gender perempuan meningkat 15% month-over-month',
  ],
  opportunities: [
    'Tingkatkan frekuensi konten video pendek (TikTok & Reels) yang sedang trend',
    'Manfaatkan momentum audience perempuan dengan konten yang lebih relevan',
    'Lakukan collaboration dengan content creator lokal untuk memperluas reach',
    'Optimasi posting time ke jam-jam prime time (19:00-21:00)',
    'Ekspansi ke platform YouTube Shorts untuk mengkapitalisasi trend short-form content',
  ],
  risks: [
    'Engagement rate Facebook menurun 8% - perlu strategi konten refresh',
    'Website bounce rate tinggi (48%) - perlu UX improvement',
    'Sentiment negatif dari komentary tentang customer service meningkat 12%',
    'Competitor engagement rate lebih tinggi di platform Instagram',
  ],
  recommendations: [
    'Prioritaskan produksi konten video pendek (15-30 detik) untuk semua platform',
    'Implementasikan live streaming mingguan di Instagram & Facebook untuk engagement interaktif',
    'Buat konten FAQ berbasis komentary paling sering dari audience',
    'A/B testing caption dan hashtag untuk optimasi reach',
    'Alokasikan budget iklan lebih besar ke TikTok & Reels',
  ],
  nextContentIdeas: [
    'Series Tutorial: "Skill Baru dalam 5 Menit"',
    'User Generated Content Campaign: "Kisah Sukses Saya Belajar di Kursuskita"',
    'Behind The Scenes: "Hari Biasa Tim Kursuskita"',
    'Interactive Quiz: "Kursus Apa yang Cocok untuk Anda?"',
    'Comparison Content: "Sebelum & Sesudah Mengikuti Kursus"',
  ],
};

// Sentiment analysis mock data
export const sentimentData = {
  positive: 72,
  neutral: 18,
  negative: 10,
  topicsDiscussed: [
    'Kualitas materi pembelajaran',
    'Instruktur berkualitas',
    'Harga terjangkau',
    'Sertifikat yang diakui',
    'Fleksibilitas jadwal',
  ],
  frequentQuestions: [
    'Berapa lama durasi kursus?',
    'Apakah ada jaminan uang kembali?',
    'Bisakah belajar offline?',
    'Sertifikat diakui industri?',
  ],
  topPositiveComments: [
    '"Materi sangat detail dan mudah dipahami! Recommended untuk semua orang 👍"',
    '"Instruktur sangat responsif, banyak membantu. 5 stars!"',
    '"Sudah mendapat pekerjaan baru setelah mengikuti kursus ini, terima kasih!"',
  ],
  potentialIssues: [
    'Beberapa user mengeluh tentang kecepatan loading website',
    'Masalah akses materi untuk subscriber baru belum resolved',
    'Respons customer service lambat pada waktu prime time',
  ],
};

// Campaign data
export const campaignData = [
  {
    id: 'campaign-1',
    name: 'Program Beasiswa Agustus 2024',
    startDate: '2024-08-01',
    endDate: '2024-08-31',
    objective: 'Meningkatkan enrollment peserta baru',
    platforms: ['instagram', 'facebook', 'tiktok', 'youtube'],
    contentPublished: 42,
    reach: 185000,
    impressions: 520000,
    engagement: 28500,
    engagementRate: 8.2,
    followerGrowth: 1850,
    websiteTraffic: 4250,
    performanceScore: 88,
  },
  {
    id: 'campaign-2',
    name: 'Flash Sale Kursus Premium',
    startDate: '2024-08-15',
    endDate: '2024-08-22',
    objective: 'Meningkatkan penjualan kursus premium',
    platforms: ['instagram', 'tiktok'],
    contentPublished: 28,
    reach: 125000,
    impressions: 380000,
    engagement: 18500,
    engagementRate: 6.8,
    followerGrowth: 950,
    websiteTraffic: 2850,
    performanceScore: 82,
  },
];
