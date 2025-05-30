"use client";
import dynamic from "next/dynamic";
import CartSkeleton from "./_components/CartSkeleton";

// Dynamic import with no SSR to prevent hydration issues
const DynamicCartContent = dynamic(() => import("./_components/CartContent"), {
  ssr: false,
  loading: () => <CartSkeleton />,
});
const CartPage = () => {
  return <DynamicCartContent />;
};

export default CartPage;
