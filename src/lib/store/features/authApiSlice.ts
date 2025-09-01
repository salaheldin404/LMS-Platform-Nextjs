import { apiSlice } from "../services/apiSlice";

import type { TAuthLogin, TAuthSignup } from "@/types/authType";
import type { TApiError } from "@/types/apiError";
import { IUser } from "@/types/user";
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: TAuthLogin) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
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
    signup: builder.mutation({
      query: (credentials: TAuthSignup) => ({
        url: "/auth/signup",
        method: "POST",
        body: credentials,
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

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: [{ type: "User", id: "CURRENT_USER" }],
    }),
    getSession: builder.query<IUser, void>({
      query: () => ({
        url: "/auth/activeSession",
        method: "GET",
      }),
      transformResponse: (response: { data: IUser }) => {
        return response.data;
      },
      providesTags: [{ type: "User", id: "CURRENT_USER" }],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useGetSessionQuery,
} = authApiSlice;
