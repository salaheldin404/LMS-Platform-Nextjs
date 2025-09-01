import { apiSlice } from "../services/apiSlice";
import type { PublicInstructorProfile } from "@/types/user";

import { transformApiError } from "@/lib/utils";

export const useApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: (userId) => `/users/${userId}`,

      transformResponse: (response: { data: PublicInstructorProfile }) => {
        return response.data;
      },

      transformErrorResponse: transformApiError,
    }),

    updateProfile: builder.mutation({
      // change the query to accept formData {formData,id}
      query: ({ formData, userId }) => ({
        url: `/users/${userId}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: [{ type: "User", id: "CURRENT_USER" }],
      transformErrorResponse: transformApiError,
    }),
    updateUserSocialMedia: builder.mutation({
      query: ({ data, userId }) => ({
        url: `/users/${userId}/social`,
        method: "PATCH",
        body: { socialMedia: data },
      }),
      invalidatesTags: [{ type: "User", id: "CURRENT_USER" }],
      transformErrorResponse: transformApiError,
    }),
    updateUserPassword: builder.mutation({
      query: (data) => ({
        url: "/users/change-password",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [{ type: "User", id: "CURRENT_USER" }],
      transformErrorResponse: transformApiError,
    }),
    getCertificateForCourse: builder.query({
      query: (courseId) => `/users/me/certificate/${courseId}`,
      transformErrorResponse: transformApiError,
    }),
    getAllCertificatesForUser: builder.query({
      query: () => `/users/me/certificates`,
      transformResponse: (response: {
        certificates: [
          {
            certificateUrl: string;
            course: {
              title: string;
              image: { url: string };
              _id: string;
              slug: string;
            };
            issuedAt: string;
          }
        ];
      }) => {
        return response.certificates;
      },
      transformErrorResponse: transformApiError,
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useGetCertificateForCourseQuery,
  useGetAllCertificatesForUserQuery,
  useUpdateProfileMutation,
  useUpdateUserSocialMediaMutation,
  useUpdateUserPasswordMutation,
} = useApiSlice;
