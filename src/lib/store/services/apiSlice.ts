import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  BaseQueryApi,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000/api/v1",
  credentials: "include",
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    console.log("Access token expired, trying to refresh token");
    try {
      const refreshResult = await baseQuery(
        { url: "/auth/refreshToken", method: "POST" },
        api,
        extraOptions
      );
      if (refreshResult?.data) {
        console.log("Token refreshed. Retrying original request...");

        result = await baseQuery(args, api, extraOptions);
      } else {
        console.log("Failed to refresh token. Logging out...");
        // Logout users
        // Clear cookies if the refresh token fails
        await handleLogout(api, extraOptions);
      }
    } catch (error) {
      console.log(error, "error refresh token");
      await handleLogout(api, extraOptions);
    }
  }
  return result;
};

async function handleLogout(api: BaseQueryApi, extraOptions: unknown) {
  const logoutResult = await baseQuery(
    { url: "/auth/logout", method: "POST" }, // Call a logout endpoint to clear cookies
    api,
    extraOptions
  );
  if (!logoutResult.error) {
    window.location.href = "/auth/login";
  } else {
    console.log("Failed to logout");
  }
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Course", "Ratings"],
  keepUnusedDataFor: 40,
  endpoints: () => ({}),
});
