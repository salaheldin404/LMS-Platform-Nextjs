import type { TApiError } from "@/types/apiError";
import { apiSlice } from "../services/apiSlice";

export const lessonApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createLesson: builder.mutation({
      query: ({ chapterId, title, courseId }) => ({
        url: `/courses/${courseId}/chapters/${chapterId}/lessons`,
        method: "POST",
        body: { title },
      }),
      invalidatesTags: (result, error, { courseId }) => {
        return [{ type: "Course", id: courseId }];
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
    updateLessonOrder: builder.mutation({
      query: ({ lessonIds, chapterId, courseId }) => ({
        url: `/courses/${courseId}/chapters/${chapterId}/lessons/change-order`,
        method: "PATCH",
        body: { lessonIds },
      }),
      invalidatesTags: (result, error, { courseId }) => {
        return [{ type: "Course", id: courseId }];
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
    deleteLesson: builder.mutation({
      query: ({ lessonId, chapterId, courseId }) => ({
        url: `/courses/${courseId}/chapters/${chapterId}/lessons/${lessonId}`,
        method: "DELETE",
      }),

      invalidatesTags: (result, error, { courseId }) => {
        return [{ type: "Course", id: courseId }];
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

    updateLesson: builder.mutation({
      query: ({ lessonId, formData, chapterId, courseId }) => ({
        url: `/courses/${courseId}/chapters/${chapterId}/lessons/${lessonId}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: (result, error, { courseId }) => {
        return [{ type: "Course", id: courseId }];
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
  useCreateLessonMutation,
  useUpdateLessonOrderMutation,
  useDeleteLessonMutation,
  useUpdateLessonMutation,
} = lessonApiSlice;
