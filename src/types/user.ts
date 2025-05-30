// Define an enum for user roles
export enum UserRole {
  Student = "student",
  Teacher = "teacher",
  Admin = "admin",
}

// Interface for social media links
interface SocialMedia {
  github?: string; // Optional, validated by regex
  linkedin?: string; // Optional, validated by regex
  facebook?: string; // Optional, validated by regex
  instagram?: string; // Optional, validated by regex
}
// Interface for social media links
export interface SocialMediaLinks {
  github?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
}

// Interface for profile picture
interface ProfilePicture {
  public_id: string | null;
  url: string | null;
}

// Interface for certificate details
interface Certificate {
  course: string; // Reference to Course model
  issuedAt: Date;
  certificateUrl: {
    public_id: string | null;
    url: string | null;
  };
}

// Main User interface
export interface IUser {
  // Basic information
  username: string; // Required, unique
  email: string; // Required, unique
  biography?: string; // Optional, 20-500 characters
  headline?: string; // Optional, max 60 characters
  _id: string;
  // Social media links
  socialMedia?: SocialMedia;
  socialLinks?: SocialMediaLinks;
  // Role
  role?: UserRole; // Default: "student"
  instructorRating?: {
    averageRatings: number;
    totalRatings: number;
  };
  totalStudents?: number;
  totalCourses?: number;
  // Courses
  enrolledCourses?: string[]; // Array of Course IDs
  createdCourses?: string[]; // Array of Course IDs
  completedCourses?: string[]; // Array of Course IDs

  // Certificates
  certificates?: Certificate[];

  // Profile picture
  profilePicture?: ProfilePicture;

  updatedAt?: Date;
}

export type PublicInstructorProfile = Omit<
  IUser,
  | "email"
  | "socialMedia"
  | "certificates"
  | "enrolledCourses"
  | "createdCourses"
  | "completedCourses"
>;

export type PublicUserProfile = {
  _id: string;
  username: string;
  email: string;
  headline: string;
  completedCoursesCount: number;
  enrolledCoursesCount: number;
  profileImage: string;
  activeCourses: number;
  // enrolledCourses: [
  //   {
  //     course: {
  //       image: {
  //         url: string;
  //       };
  //       title: string;
  //       slug: string;
  //     };
  //   }
  // ];
};
export type UserLearningCourse = {
  course: {
    image: {
      url: string;
    };
    title: string;
    slug: string;
    _id: string;
  };
  progressPercentage: number;
  _id: string;
};

export type UserStats = Pick<
  IUser,
  "instructorRating" | "totalStudents" | "totalCourses"
>;
