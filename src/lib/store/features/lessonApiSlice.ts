import { ILesson } from "@/types/course";
import { apiSlice } from "../services/apiSlice";
import { transformApiError } from "@/lib/utils";

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
      transformResponse: (response: { data: ILesson; message: string }) => {
        return {
          lesson: response.data,
          message: response.message,
        };
      },
      transformErrorResponse: transformApiError,
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
      transformErrorResponse: transformApiError,
    }),
    deleteLesson: builder.mutation({
      query: ({ lessonId, chapterId, courseId }) => ({
        url: `/courses/${courseId}/chapters/${chapterId}/lessons/${lessonId}`,
        method: "DELETE",
      }),

      invalidatesTags: (result, error, { courseId }) => {
        return [{ type: "Course", id: courseId }];
      },

      transformErrorResponse: transformApiError,
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
      transformErrorResponse: transformApiError,
    }),
  }),
});

export const {
  useCreateLessonMutation,
  useUpdateLessonOrderMutation,
  useDeleteLessonMutation,
  useUpdateLessonMutation,
} = lessonApiSlice;
