"use server";
import { apiClient } from "@/lib/api/client";

import {
  type ICourseStats,
  type TRatingPercentage,
  type ICourse,
  type ICourseFilterParams,
  type ILesson,
  IUserProgressCourse,
} from "@/types/course";
import type { PaginateResponse } from "@/types";
import { revalidatePath, revalidateTag } from "next/cache";

// export const getInstrucotrCourses = async ({
//   instructorId,
//   filterParams,
// }: IProps): Promise<PaginateResponse<ICourse> | null> => {
//   const queryParams = new URLSearchParams();

//   if (!instructorId) {
//     return null;
//   }
//   // Add each filter to query params
//   Object.entries(filterParams).forEach(([key, value]) => {
//     if (value !== undefined && value !== null && value !== "") {
//       if (Array.isArray(value)) {
//         value.forEach((val) => queryParams.append(key, String(val)));
//       } else {
//         queryParams.append(key, String(value));
//       }
//     }
//   });

//   return apiClient(`/courses/user/${instructorId}/courses?${queryParams}`);
// };

export async function getAllCourses(
  filterParams?: ICourseFilterParams
): Promise<PaginateResponse<ICourse>> {
  const queryParams = new URLSearchParams();

  // Add each filter to query params
  if (filterParams) {
    Object.entries(filterParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        if (Array.isArray(value)) {
          value.forEach((val) => queryParams.append(key, String(val)));
        } else {
          queryParams.append(key, String(value));
        }
      }
    });
  }

  return apiClient(`/courses?${queryParams.toString()}`);
}

export async function deleteCourse(courseId: string) {
  revalidatePath("/courses");
  revalidatePath("/courses/me");
  return apiClient(`/courses/${courseId}`, {
    method: "DELETE",
  });
}

export async function getCourse(courseId: string) {
  return apiClient(`/courses/${courseId}`);
}

export async function getCourseStats(courseId: string) {
  return apiClient<ICourseStats>(`/courses/${courseId}/stats`, {}, (data) => {
    return data.data as ICourseStats;
  });
}

// export async function getCourseRatingPercentage(courseId: string) {
//   return apiClient<TRatingPercentage>(
//     `/courses/${courseId}/ratingPercentage`,
//     {},
//     (data) => {
//       return data.data as TRatingPercentage;
//     }
//   );
// }

export async function getCourseRatingPercentage(courseId: string) {
  return apiClient<TRatingPercentage>(
    `/ratings/percentage/${courseId}`,
    {},
    (data) => {
      return data.data as TRatingPercentage;
    }
  );
}

export async function getCourseBySlug(slug: string) {
  return apiClient<ICourse>(`/courses/${slug}`, {}, (data) => {
    return data.data as ICourse;
  });
}

export async function getLessonById(lessonId: string) {
  return apiClient<ILesson>(`/lessons/${lessonId}`, {}, (data) => {
    return data.data as ILesson;
  });
}

export async function getUserProgressForCourse(courseId: string) {
  return apiClient<IUserProgressCourse>(
    `/courses/${courseId}/user-progress`,
    { next: { tags: ["user-progress"] } },
    (data) => {
      return data.data as IUserProgressCourse;
    }
  );
}

export async function markLessonAsComplete(lessonId: string) {
  revalidateTag("user-progress");
  return apiClient(`/lessons/${lessonId}/complete`, {
    method: "PATCH",
  });
}
