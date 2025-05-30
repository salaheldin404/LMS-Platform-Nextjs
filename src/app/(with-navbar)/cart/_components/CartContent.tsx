"use client";
import { useCallback, useMemo } from "react";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { clearCart, removeItemFromCart } from "@/lib/store/cart-slice";

import { Button } from "@/components/ui/button";

import EmptyCart from "./EmptyCart";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";

const CartContent = () => {
  const { itemCount, items, total } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleRemoveItem = useCallback(
    (id: string) => {
      dispatch(removeItemFromCart(id));
    },
    [dispatch]
  );

  const handleClearCart = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);
  // Memoized course text to prevent hydration mismatch
  const courseText = useMemo(() => {
    return `${itemCount} Course${itemCount !== 1 ? "s" : ""} in Cart`;
  }, [itemCount]);

  if (!items || items.length === 0) {
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
                  >
                    Clear all
                  </Button>
                </div>
              </div>

              <div className="divide-y">
                {items.map((item) => (
                  <CartItem
                    key={item._id}
                    item={item}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <OrderSummary total={total} />
        </div>
      </div>
    </div>
  );
};

export default CartContent;
