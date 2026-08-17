export type ReviewItem = {
  title: string;
  description: string;
};

export type Review = {
  title: string;
  summary: string;
  achievements: ReviewItem[];
  attention: ReviewItem[];
  insights: string[];
  recommendations: string[];
};

export type Statistics = {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  completionRate: number;

  highPriorityPending: number;
  mediumPriorityPending: number;
  lowPriorityPending: number;

  events: number;
  habits: number;
  habitCompletions: number;
  notesUpdated: number;
};

export type WeeklyReviewResponse = {
  review: Review;
  statistics: Statistics;
};
