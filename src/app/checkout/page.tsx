"use client";

import { useCart } from "@/hooks/useCart";
// import { createCheckoutSession } from "@/server/actions/checkout";
import { Button } from "@/components/ui/button";

const CheckoutPage = () => {
  const { cart } = useCart();

  return (
    <div className="pt-[30px]">
      <h1 className="font-bold">Checkout</h1>
      {cart.items?.map((item) => (
        <div key={item._id} className="bg-card p-4">
          <p>{item.title}</p>
        </div>
      ))}
      <Button>Proceed to checkout</Button>
    </div>
  );
};

export default CheckoutPage;
