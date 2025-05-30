import type { IUser } from "./user";

interface IVideo {
  assetId: string;
  playbackId: string;
  playbackUrl: string;
}
export interface IRating {
  course: string;
  rate: number;
  comment: string;
  user: { username: string; profilePicture: { url?: string }; _id: string };
  _id: string;
  createdAt: Date;
}

export interface IChapter {
  _id: string;
  title: string;
  course?: string;
  lessons: ILesson[];
  order?: number;
  formattedDuration?: string;
}

export interface ILesson {
  _id: string;
  title: string;
  video: IVideo;
  chapter: string;
  course: string;
  order: number;
  createdAt: Date;
  locked: boolean;
  formattedDuration: string;
  updatedAt: Date;
}

export type TLevel = "beginner" | "intermediate" | "advanced";
export type TCategory = "programming" | "design" | "business" | "marketing";

export interface ICourse {
  _id: string;
  title: string;
  description?: string;
  price?: number;
  slug?: string;
  status?: "draft" | "published";
  enrollmentsCount?: number;
  requirements?: string[];
  willLearn?: string[];
  level?: TLevel;
  category?: TCategory;
  subtitle: string;
  students?: IUser[];
  chapters?: IChapter[];
  instructor: IUser;
  image?: {
    public_id: string;
    url: string;
  };
  createdAt: Date;
  updatedAt: Date;
  ratings?: IRating[];
  ratingsSummary: {
    averageRating: number;
    totalRatings: number;
  };
  formattedTotalDuration?: string;
}

export interface ICourseStats {
  title: string;
  image: {
    public_id: string;
    url: string;
  };
  subtitle: string;
  price: number;
  totalLessons: number;
  totalEnrollments: number;
  totalRatings: number;
  averageRatings: number;
  completionRate: string;
  completedCount: number;
  instructor: {
    username: string;
    profilePicture: {
      public_id?: string;
      url?: string;
    };
  };
}

export type TSort =
  | "newest"
  | "price-low"
  | "price-high"
  | "highest-rating"
  | "popularity";

export interface ICourseFilterParams {
  search?: string;
  category?: string[];
  level?: string[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: string;
  sort?: TSort;
  page?: number;
  limit?: number;
  showFilters?: string;
}

export type TRatingPercentage = Record<
  string,
  { percentage: string; count: number }
>;

export interface IUserProgressCourse {
  completedLessons: [];
  progressPercentage: number;
}

export type CartCourseItem = Omit<
  ICourse,
  "chapters" | "students" | "ratings" | "willLearn" | "requirements"
>;
