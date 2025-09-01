"use server";
import { StripeCheckoutSession } from "@stripe/stripe-js";

import { apiClient } from "@/lib/api/client";

interface CartItem {
  _id: string;
  title: string;
  price: number;
  image: string;
}
export async function createCheckoutSession(cartItems: CartItem[]): Promise<{
  data: StripeCheckoutSession | null;
  success: string;
  error?: string;
}> {
  try {
    const data = await apiClient<StripeCheckoutSession>(
      "/enrollments/checkout-session",
      {
        method: "POST",
        body: JSON.stringify({
          cartItems,
        }),
      },
      (responseData) => {
        return responseData.session as StripeCheckoutSession;
      }
    );

    if (!data) {
      return { error: "some thing went wrong", success: "fail", data: null };
    }
    return { data, success: "success" };
  } catch (error) {
    console.log(error, "error creating checkout session");
    return { error: "some thing went wrong", success: "fail", data: null };
  }
}
