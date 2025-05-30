"use server";
import { apiClient } from "@/lib/api/client";
import type { ICourse } from "@/types/course";

export interface FormState {
  error?: string;
  success?: string;
  data?: ICourse;
}

export const createCourse = async (
  prev,
  formData: FormData
): Promise<FormState> => {
  const title = formData.get("title");
  try {
    const data = await apiClient<ICourse>(
      "/courses",
      {
        method: "POST",
        body: JSON.stringify({ title }),
      },
      (responseData) => {
        return responseData.data as ICourse;
      }
    );

    if (!data) {
      return { error: "some thing went wrong", success: "fail" };
    }
    console.log(data, "data");
    return { data, success: "success" };
  } catch (error) {
    console.log(error, "creat course action");
    return { error: "some thing went wrong" };
  }
};
