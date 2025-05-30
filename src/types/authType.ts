export type TUser = {
  _id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  certificates: object[];
  enrolledCourses: string[];
  completedCourses: string[];
};

export type TAuthLogin = {
  email: string;
  password: string;
};

export type TAuthSignup = {
  email: string;
  password: string;
  confirmPassword?: string;
  username: string;
};
