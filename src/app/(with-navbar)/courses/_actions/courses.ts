import { apiClient } from "@/lib/api/client";

import type { ICourse,ICourseFilterParams } from "@/types/course";
import type { PaginateResponse } from "@/types";

export async function getAllCourses(
  filterParams: ICourseFilterParams
): Promise<PaginateResponse<ICourse> | null> {
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

  return apiClient(`/courses?${queryParams}`);
}

// // fetch courses server action
// export async function fetchAllCourses(prevState, formData: FormData) {
//   try {
//     // Extract filter values from form data or use passed object
//     let filterParams;

//     if (formData instanceof FormData) {
//       // If called from a form submission
//       filterParams = {
//         search: formData.get("search") || "",
//         category: formData.getAll("category"),
//         level: formData.getAll("level"),
//         minPrice: formData.get("minPrice"),
//         maxPrice: formData.get("maxPrice"),
//         minRating: formData.get("minRating") || "",
//         sort: formData.get("sort") || "",
//         page: formData.get("page") || 1,
//         limit: formData.get("limit") || 10,
//       };
//     } else {
//       // If called programmatically with an object
//       filterParams = prevState;
//     }

//     // Call the external API through our service
//     const courseData = await getAllCourses(filterParams);

//     // Revalidate the courses page to update the cache
//     revalidatePath("/courses");

//     // Return the course data and filter params for state
//     return {
//       ...filterParams,
//       courses: courseData?.data || [],
//       pagination: {
//         currentPage: courseData?.pagination.currentPage || 1,
//         totalPages: courseData?.pagination.totalPages || 1,
//         totalCourses: courseData?.pagination.totalDocuments || 0,
//       },
//       loading: false,
//       error: null,
//     };
//   } catch (error) {
//     console.error("Error fetching courses:", error);

//     // Return error state
//     return {
//       ...prevState,
//       courses: [],
//       loading: false,
//       error: error.message || "Failed to fetch courses. Please try again.",
//     };
//   }
// }
