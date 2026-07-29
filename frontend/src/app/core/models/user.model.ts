export interface UserStats {
  completedSwaps: number;
  pendingRequests: number;
  rating: number;
}

export interface User {
  id: string;
  name: string;
  headline: string;
  location: string;
  about: string;
  avatarInitials: string;
  avatarGradient: string;
  featuredOffer: string;
  skillsToLearn: string[];
  stats: UserStats;
}
