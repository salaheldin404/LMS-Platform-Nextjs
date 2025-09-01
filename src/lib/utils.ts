import { TApiError } from "@/types/apiError";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

export const transformApiError = (response: {
  status: number;
  data: TApiError;
}) => ({
  status: response.status,
  message: response.data.message || "Something went wrong",
});
