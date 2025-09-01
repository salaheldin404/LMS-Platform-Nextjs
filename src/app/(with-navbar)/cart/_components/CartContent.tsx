"use client";
import { useCallback, useMemo } from "react";

import { Button } from "@/components/ui/button";

import EmptyCart from "./EmptyCart";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import { useCart } from "@/hooks/useCart";

const CartContent = () => {
  const {
    cart,
    removeCourseFromCart,
    isRemovingFromCart,
    isClearingCart,
    handleClearCart,
  } = useCart();

  const handleRemoveItem = useCallback(
    async (id: string) => {
      await removeCourseFromCart(id);
    },
    [removeCourseFromCart]
  );

  // Memoized course text to prevent hydration mismatch
  const courseText = useMemo(() => {
    return `${cart?.itemCount} Course${
      cart?.itemCount !== 1 ? "s" : ""
    } in Cart`;
  }, [cart?.itemCount]);

  if (!cart || cart.items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="main-section  ">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Shopping Cart
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <div className=" rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">{courseText}</h2>
                  <Button
                    onClick={handleClearCart}
                    className="text-white font-medium text-sm"
                    disabled={isClearingCart}
                  >
                    Clear all
                  </Button>
                </div>
              </div>

              <div className="divide-y">
                {cart.items.map((item) => (
                  <CartItem
                    key={item._id}
                    item={item}
                    onRemove={handleRemoveItem}
                    isRemovingFromCart={isRemovingFromCart}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <OrderSummary total={cart.total} cartItems={cart.items} />
        </div>
      </div>
    </div>
  );
};

export default CartContent;
