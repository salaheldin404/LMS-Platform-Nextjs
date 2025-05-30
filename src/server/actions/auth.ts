"use server";
import type { IUser } from "@/types/user";
import { apiClient } from "@/lib/api/client";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { TApiError } from "@/types/apiError";
import { revalidatePath, revalidateTag } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export async function getActiveSession(): Promise<IUser | null> {
  const cookieStore = await cookies(); // get cooki
  const jwt = cookieStore.get("jwt");
  if (!jwt) {
    return null;
  }
  return apiClient<IUser>(
    "/auth/activeSession",
    {
      next: { tags: ["activeSession"] },
    },
    (responseData) => responseData.data
  );
}

export async function logout() {
  const cookieStore = await cookies();

  try {
    cookieStore.delete("jwt");
    cookieStore.delete("refreshToken");
    const response = await apiClient("/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    revalidateTag("activeSession");

    return response;
  } catch (error) {
    console.log(error, "error");

    throw error;
  }
}

export async function login(prev: unknown, formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const cookieStore = await cookies();
  try {
    if (!email || !password) {
      return { error: "Email and password are required" };
    }

    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    // Get combined Set-Cookie header
    const setCookieHeader = response.headers.get("set-cookie");

    if (setCookieHeader) {
      // Parse and set each cookie individually
      const cookiesToSet = parseSetCookie(setCookieHeader);

      cookiesToSet.forEach((cookie) => {
        cookieStore.set({
          name: cookie.name,
          value: cookie.value,
          ...cookie.options,
          secure: process.env.NODE_ENV === "production",
        });
      });
    }
  } catch (error) {
    console.log(error, "error");
    const message =
      (error as TApiError).message || "An error occurred during login";
    return {
      error: message,
      status: "failed",
    };
  }
  redirect(`/`);
}
// Helper function to parse Set-Cookie header
function parseSetCookie(header: string) {
  return header.split(/,\s(?=[^;]+=[^;]+;)/).map((cookie) => {
    const [nameValue, ...options] = cookie.split("; ");
    const [name, value] = nameValue.split("=");

    const optionsObj = options.reduce((acc: Record<string, any>, option) => {
      const [key, val] = option.split("=");
      const lowerKey = key.toLowerCase();

      if (lowerKey === "max-age") {
        acc.maxAge = parseInt(val, 10);
      } else if (lowerKey === "expires") {
        acc.expires = new Date(val);
      } else if (lowerKey === "path") {
        acc.path = val;
      } else if (lowerKey === "samesite") {
        acc.sameSite = val?.toLowerCase() as "lax" | "strict" | "none";
      } else if (lowerKey === "httponly") {
        acc.httpOnly = true;
      } else if (lowerKey === "secure") {
        acc.secure = true;
      }

      return acc;
    }, {});

    return {
      name: decodeURIComponent(name),
      value: decodeURIComponent(value),
      options: optionsObj,
    };
  });
}
