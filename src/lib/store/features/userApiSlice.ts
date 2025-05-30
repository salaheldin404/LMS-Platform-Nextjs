import type { TApiError } from "@/types/apiError";
import { apiSlice } from "../services/apiSlice";
import type { PublicInstructorProfile } from "@/types/user";
export const useApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: (userId) => `/users/${userId}`,

      transformResponse: (response: { data: PublicInstructorProfile }) => {
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

    updateProfile: builder.mutation({
      // change the query to accept formData {formData,id}
      query: ({ formData, userId }) => ({
        url: `/users/${userId}`,
        method: "PATCH",
        body: formData,
      }),
      transformErrorResponse: (response: {
        status: number;
        data: TApiError;
      }) => {
        return {
          status: response.status,
          message: response.data.message,
        };
      },
      invalidatesTags: [{ type: "User", id: "CURRENT_USER" }],
    }),
    updateUserSocialMedia: builder.mutation({
      query: ({ data, userId }) => ({
        url: `/users/${userId}/social`,
        method: "PATCH",
        body: { socialMedia: data },
      }),
      transformErrorResponse: (response: {
        status: number;
        data: TApiError;
      }) => {
        return {
          status: response.status,
          message: response.data.message,
        };
      },
      invalidatesTags: [{ type: "User", id: "CURRENT_USER" }],
    }),
    updateUserPassword: builder.mutation({
      query: (data) => ({
        url: "/users/change-password",
        method: "PATCH",
        body: data,
      }),
      transformErrorResponse: (response: {
        status: number;
        data: TApiError;
      }) => {
        return {
          status: response.status,
          message: response.data.message,
        };
      },
      invalidatesTags: [{ type: "User", id: "CURRENT_USER" }],
    }),
    getCertificateForCourse: builder.query({
      query: (courseId) => `/users/me/certificate/${courseId}`,
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
      transformErrorResponse: (response: {
        status: number;
        data: TApiError;
      }) => ({
        status: response.status,
        message: response.data.message,
      }),
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
