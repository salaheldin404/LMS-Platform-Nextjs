import type { PublicInstructorProfile } from "@/types/user";
import type { PaginateResponse } from "@/types";
import type { ICourse, ICourseFilterParams } from "@/types/course";

import { apiClient } from "@/lib/api/client";

export async function getInstructorProfile(
  instructorId: string
): Promise<PublicInstructorProfile | null> {
  return apiClient<PublicInstructorProfile>(
    `/users/${instructorId}`,
    {},
    (responseData) => {
      return responseData.data as PublicInstructorProfile;
    }
  );
}

export async function getInstructorCourses(
  instructorId: string,
  page = 1
): Promise<PaginateResponse<ICourse> | null> {
  const params = new URLSearchParams({
    page: page.toString(),
  });
  return apiClient<PaginateResponse<ICourse>>(
    `/courses/user/${instructorId}?${params}`
  );
}

export async function getCurrentInstructorCourses(
  filterParams: ICourseFilterParams
): Promise<PaginateResponse<ICourse>> {
  const queryParams = new URLSearchParams();

  // Add each filter to query params
  Object.entries(filterParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      if (Array.isArray(value)) {
        value.forEach((val) => queryParams.append(key, String(val)));
      } else {
        queryParams.append(key, String(value));
      }
    }
  });

  return apiClient<PaginateResponse<ICourse>>(`/courses/me?${queryParams}`);
}
