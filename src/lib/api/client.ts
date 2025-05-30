import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export class APIError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = "APIError";
  }
}

// Helper function to perform fetch operations
async function performFetch<T>(
  url: string,
  options: RequestInit,
  transformResponse?: (responseData: any) => T
): Promise<T> {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    const errorMessage = data?.message || "An error occurred";
    console.log(
      { errorMessage, response: response.status },
      "from original request"
    );
    throw new APIError(response.status, errorMessage);
  }

  return transformResponse ? transformResponse(data) : (data as T);
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transformResponse?: (responseData: any) => T // Add a response transformer function
): Promise<T> {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  // Initialize headers with proper typing
  const headers = new Headers(options.headers);

  // Conditionally set content type only for JSON bodies
  if (!(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  const url = `${API_URL}${endpoint}`;
  const fetchOptions = { ...options, headers, credentials: "include" as const };
  try {
    return await performFetch<T>(url, fetchOptions, transformResponse);
  } catch (error) {
    if (error instanceof APIError && error.statusCode === 401) {
      console.log("unAuthorized expire token");
      try {
        const refreshResponse = await fetch(`${API_URL}/auth/refreshToken`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
          credentials: "include",
        });
        console.log("trying to refresh token");
        const refreshData = await refreshResponse.json();
        if (!refreshResponse.ok) {
          console.log("Failed to refresh token", refreshData);
          throw new APIError(
            refreshResponse.status,
            refreshData.message || "Token refresh failed"
          );
        }
        const newAccessToken = refreshData.data;
        headers.set("Authorization", `Bearer ${newAccessToken}`);
        // Retry the original request with the new token
        return await performFetch<T>(url, fetchOptions, transformResponse);
      } catch (refreshError) {
        console.log({ refreshError });
        throw new Error("Token refresh failed");
      }
    }
    if (error instanceof APIError) {
      console.log(error, "from api client");
      throw new APIError(error.statusCode, error.message);
    }
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Something went wrong");
  }
}
