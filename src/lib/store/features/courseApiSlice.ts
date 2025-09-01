import { apiSlice } from "../services/apiSlice";

import type { ICourse, ICourseStats, TRatingPercentage } from "@/types/course";

import { transformApiError } from "@/lib/utils";

const courseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getMyCourses: builder.query({
    //   query: () => "/courses/me",

    //   transformResponse: (response: {
    //     data: ICourse[];
    //     totalStudents: number;
    //     averageRatings: number;
    //   }) => {
    //     return {
    //       courses: response.data,
    //       totalStudents: response.totalStudents,
    //       instructorAverageRating: response.averageRatings,
    //     };
    //   },
    //   transformErrorResponse: (response: {
    //     status: number;
    //     data: TApiError;
    //   }) => {
    //     return {
    //       status: response.status,
    //       message: response.data.message,
    //     };
    //   },
    // }),
    getInstructorCourses: builder.query({
      query: ({ userId, params }) => `/courses/user/${userId}?${params}`,

      transformResponse: (response: {
        data: ICourse[];
        pagination: { total: number; page: number; pages: number };
      }) => {
        return {
          courses: response.data,
          pagination: response.pagination,
        };
      },

      transformErrorResponse: transformApiError,
    }),
    getCourseById: builder.query({
      query: (courseId) => `/courses/${courseId}`,

      transformResponse: (response: { data: ICourse }) => {
        return {
          course: response.data,
        };
      },
      providesTags: (result) =>
        result ? [{ type: "Course", id: result.course._id }] : [],

      transformErrorResponse: transformApiError,
    }),

    getAllCourses: builder.query({
      query: () => "/courses",

      transformResponse: (response: { data: ICourse[] }) => {
        return {
          courses: response.data,
        };
      },
      providesTags: [{ type: "Course", id: "LIST" }],
      transformErrorResponse: transformApiError,
    }),
    getCourseStats: builder.query({
      query: (courseId) => `/courses/${courseId}/stats`,
      transformResponse: (response: { data: ICourseStats }) => {
        return response.data;
      },
      providesTags: (result, error, courseId) => {
        return [{ type: "Course", id: courseId }];
      },

      transformErrorResponse: transformApiError,
    }),
    getCourseRatingPercentage: builder.query({
      query: (courseId) => `/courses/${courseId}/ratingPercentage`,

      transformResponse: (response: { data: TRatingPercentage }) => {
        return response.data;
      },
      providesTags: (result, error, courseId) => {
        return [{ type: "Course", id: courseId }];
      },

      transformErrorResponse: transformApiError,
    }),

    createCourse: builder.mutation({
      query: (data) => ({
        url: "/courses",
        method: "POST",
        body: data,
      }),
      invalidatesTags: () => {
        return [{ type: "User", id: "CURRENT_USER" }];
      },
      transformErrorResponse: transformApiError,
    }),
    updateCourse: builder.mutation({
      query: ({ courseId, data }) => ({
        url: `/courses/${courseId}`,
        method: "PATCH",
        body: data,
      }),

      transformResponse: (response: { data: ICourse }) => {
        return {
          course: response.data,
        };
      },
      invalidatesTags: (result, error, arg) => {
        return [{ type: "Course", id: arg.courseId }];
      },
      transformErrorResponse: transformApiError,
    }),
    publishCourse: builder.mutation({
      query: (courseId) => ({
        url: `courses/${courseId}/publish`,
        method: "POST",
      }),

      invalidatesTags: (result, error, courseId) => {
        return [{ type: "Course", id: courseId }];
      },
      transformErrorResponse: transformApiError,
    }),
    generateCertificate: builder.mutation({
      query: (courseId) => ({
        url: `/courses/${courseId}/generate-certificate`,
        method: "POST",
      }),
      invalidatesTags: () => {
        return [{ type: "User", id: "CURRENT_USER" }];
      },
      transformErrorResponse: transformApiError,
    }),
    // addRatingToCourse: builder.mutation({
    //   query: ({ courseId, rating, comment }) => ({
    //     url: `/courses/${courseId}/rate`,
    //     method: "POST",
    //     body: { rating, comment },
    //   }),
    //   invalidatesTags: (result, error, arg) => {
    //     return [{ type: "Course", id: arg.courseId }];
    //   },
    //   transformErrorResponse: (response: {
    //     status: number;
    //     data: TApiError;
    //   }) => {
    //     return {
    //       status: response.status,
    //       message: response.data.message,
    //     };
    //   },
    // }),
  }),
});

// get my learning courses for students

export const {
  useGetInstructorCoursesQuery,
  useGetAllCoursesQuery,
  useGetCourseByIdQuery,
  useGetCourseStatsQuery,
  useGetCourseRatingPercentageQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  usePublishCourseMutation,
  useGenerateCertificateMutation,
} = courseApiSlice;
