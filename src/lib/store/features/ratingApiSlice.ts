import { TApiError } from "@/types/apiError";
import { apiSlice } from "../services/apiSlice";
import { IRating, TRatingPercentage } from "@/types/course";

export const ratingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRatingPercentageForCourse: builder.query({
      query: (courseId) => `/ratings/percentage/${courseId}`,

      transformResponse: (response: { data: TRatingPercentage }) => {
        return response.data;
      },
      transformErrorResponse: (response: {
        status: number;
        data: TApiError;
      }) => {
        return {
          status: response.status,
          message: response.data.message,
        };
      },
    }),
    getUserRatingForCourse: builder.query({
      query: (courseId) => `/ratings/user/${courseId}`,
      providesTags: [{ type: "Ratings", id: "USER_RATING" }],
      transformResponse: (response: {
        data: { rate: number; comment?: string };
      }) => {
        return response.data;
      },
      transformErrorResponse: (response: {
        status: number;
        data: TApiError;
      }) => {
        return {
          status: response.status,
          message: response.data.message,
        };
      },
    }),
    getAllRatingsForCourse: builder.query({
      query: (courseId) => `/ratings/${courseId}`,
      providesTags: [{ type: "Ratings", id: "ALL_RATINGS" }],
      transformResponse: (response: { data: IRating[] }) => {
        return response.data;
      },
      transformErrorResponse: (response: {
        status: number;
        data: TApiError;
      }) => {
        return {
          status: response.status,
          message: response.data.message,
        };
      },
    }),
    addRatingToCourse: builder.mutation({
      query: ({ rate, courseId, comment }) => ({
        url: `/ratings/${courseId}`,
        method: "POST",
        body: { rate, comment },
      }),
      invalidatesTags: (result, error, { courseId }) => {
        return [
          { type: "Course", id: courseId },
          { type: "Ratings", id: "ALL_RATINGS" },
          { type: "Ratings", id: "USER_RATING" },
        ];
      },
      transformErrorResponse: (response: {
        status: number;
        data: TApiError;
      }) => {
        return {
          status: response.status,
          message: response.data.message,
        };
      },
    }),
    deleteUserRating: builder.mutation({
      query: (courseId) => ({
        url: `/ratings/user/${courseId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, courseId) => {
        return [
          { type: "Course", id: courseId },
          { type: "Ratings", id: "ALL_RATINGS" },
          { type: "Ratings", id: "USER_RATING" },
        ];
      },
      transformErrorResponse: (response: {
        status: number;
        data: TApiError;
      }) => {
        return {
          status: response.status,
          message: response.data.message,
        };
      },
    }),
  }),
});

export const {
  useGetUserRatingForCourseQuery,
  useGetRatingPercentageForCourseQuery,
  useGetAllRatingsForCourseQuery,
  useAddRatingToCourseMutation,
  useDeleteUserRatingMutation,
} = ratingApiSlice;
