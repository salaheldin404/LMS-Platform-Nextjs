import type { IUser } from "@/types/user";
import { apiClient } from "@/lib/api/client";

export async function getActiveSession(): Promise<IUser | null> {
  return apiClient<IUser>(
    "/auth/activeSession",
    {},
    (responseData) => responseData.data
  );
}

export async function logout() {
  try {
    const response = await apiClient("/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    return response;
  } catch (error) {
    console.log(error, "error");

    throw error;
  }
}
