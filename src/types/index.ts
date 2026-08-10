export interface SocialMediaMetrics {
  followers: number;
  followerGrowth: number;
  reach: number;
  impressions: number;
  engagement: number;
  engagementRate: number;
  videoViews?: number;
}

export interface PlatformData {
  instagram: SocialMediaMetrics & {
    account: string;
    posts: number;
    saves: number;
  };
  facebook: SocialMediaMetrics & {
    account: string;
    likes: number;
    comments: number;
    shares: number;
  };
  youtube: SocialMediaMetrics & {
    channel: string;
    videos: number;
    watchTime: number;
    avgViewDuration: number;
  };
  tiktok: SocialMediaMetrics & {
    account: string;
    profileViews: number;
  };
  website: {
    visitors: number;
    sessions: number;
    pageViews: number;
    avgSessionDuration: number;
    bounceRate: number;
  };
}

export interface ContentAnalytics {
  id: string;
  platform: 'instagram' | 'facebook' | 'youtube' | 'tiktok' | 'website';
  title: string;
  contentType: string;
  topic: string;
  date: string;
  reach: number;
  impressions: number;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  engagementRate: number;
  performanceScore: number;
}

export interface KPIData {
  totalFollowers: number;
  followerGrowth: number;
  totalReach: number;
  totalImpressions: number;
  totalEngagement: number;
  avgEngagementRate: number;
  totalVideoViews: number;
  totalContentPublished: number;
  websiteVisitors: number;
  websiteEngagement: number;
}
