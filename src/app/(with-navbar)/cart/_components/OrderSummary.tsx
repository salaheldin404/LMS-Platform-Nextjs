"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/lib/store/hooks";
import { formatPrice } from "@/lib/utils";
import { createCheckoutSession } from "@/server/actions/checkout";
import { CartCourseItem } from "@/types/course";
import { loadStripe } from "@stripe/stripe-js";
import { useCallback, useState } from "react";

interface OrderSummaryProps {
  total: number;
  cartItems: CartCourseItem[];
}
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
const OrderSummary = ({ total, cartItems }: OrderSummaryProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const handleCheckout = useCallback(async () => {
    const filteredCartItems = cartItems.map((item) => ({
      _id: item._id,
      title: item.title,
      price: item.price || 0,
      image: item?.image?.url || "",
    }));

    try {
      setIsLoading(true);
      const { data } = await createCheckoutSession(filteredCartItems);

      if (data) {
        const stripe = await stripePromise;
        const redirectResult = await stripe?.redirectToCheckout({
          sessionId: data.id,
        });
        if (redirectResult?.error) {
          console.error("Stripe redirect error:", redirectResult.error.message);
        }
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setIsLoading(false);
    }
  }, [cartItems]);

  return (
    <div className="w-full lg:w-80">
      <div className="bg-card rounded-lg shadow-sm border p-6 sticky top-8">
        {/* <h3 className="text-lg font-semibold mb-4">Total:</h3> */}

        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-2xl font-bold">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>

        {user && (
          <Button
            onClick={handleCheckout}
            className="w-full mb-3"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Checkout"}
          </Button>
        )}

        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2">
            30-Day Money-Back Guarantee
          </p>
          <p className="text-xs text-gray-500">Full Lifetime Access</p>
        </div>
      </div>

      {/* Promotions */}
      <div className="mt-6 bg-card rounded-lg shadow-sm border p-6">
        <h4 className="font-semibold mb-3">Promotions</h4>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter Coupon"
            className="flex-1 px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <Button className="px-4 py-2 bg-primary  rounded text-sm font-medium transition-colors">
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
