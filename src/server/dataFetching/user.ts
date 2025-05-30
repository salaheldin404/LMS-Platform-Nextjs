import { apiClient } from "@/lib/api/client";
import { PublicUserProfile, UserLearningCourse } from "@/types/user";
import { PaginateResponse } from "@/types";

export async function getUserProfile() {
  return apiClient<PublicUserProfile>(`/users/me`, {}, (data) => {
    return data.data as PublicUserProfile;
  });
}

export async function getUserEnrolledCourses() {
  const queryParams = new URLSearchParams();

  return apiClient<PaginateResponse<UserLearningCourse>>(
    `/users/me/enrolled-courses?${queryParams.toString()}`
  );
}
