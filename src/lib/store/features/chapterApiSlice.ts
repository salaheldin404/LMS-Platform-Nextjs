import { transformApiError } from "@/lib/utils";
import { apiSlice } from "../services/apiSlice";

export const chapterApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createChapter: builder.mutation({
      query: ({ courseId, title }) => ({
        url: `/courses/${courseId}/chapters`,
        method: "POST",
        body: { title },
      }),

      invalidatesTags: (result, error, { courseId }) => {
        return [{ type: "Course", id: courseId }];
      },

      transformErrorResponse: transformApiError,
    }),
    updateChapter: builder.mutation({
      query: ({ chapterId, title, order }) => ({
        url: `/chapters/${chapterId}`,
        method: "PATCH",
        body: { title, order },
      }),

      invalidatesTags: (result, error, { courseId }) => {
        return [{ type: "Course", id: courseId }];
      },
      transformErrorResponse: transformApiError,
    }),
    updateChapterOrder: builder.mutation({
      query: ({ chapterIds, courseId }) => ({
        url: `/courses/${courseId}/chapters/change-order`,
        method: "PATCH",
        body: { chapterIds },
      }),

      invalidatesTags: (result, error, { courseId }) => {
        return [{ type: "Course", id: courseId }];
      },
      transformErrorResponse: transformApiError,
    }),
    deleteChapter: builder.mutation({
      query: (chapterId) => ({
        url: `/chapters/${chapterId}`,
        method: "DELETE",
      }),

      transformErrorResponse: transformApiError,
    }),
  }),
});

export const {
  useCreateChapterMutation,
  useDeleteChapterMutation,
  useUpdateChapterMutation,
  useUpdateChapterOrderMutation,
} = chapterApiSlice;
