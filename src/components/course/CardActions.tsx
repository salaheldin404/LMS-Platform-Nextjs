"use client";
import { Button } from "../ui/button";

import Link from "next/link";
import useCourseStatus from "@/hooks/useCourseStatus";
import { useAppSelector } from "@/lib/store/hooks";
import WishlistButton from "./WishlistButton";
import { useCart } from "@/hooks/useCart";
import { ICourse } from "@/types/course";

const CardActions = ({ course }: { course: ICourse }) => {
  const { addCourseToCart, isAddingToCart } = useCart();

  const { hasAccess, isCourseInCart } = useCourseStatus(course._id);
  const user = useAppSelector((state) => state.auth.user);

  const handleAddCourseToCart = async () => {
    await addCourseToCart(course);
  };

  return (
    <div className="flex items-center gap-3">
      {!isCourseInCart && !hasAccess && (
        <Button
          className="w-full py-6"
          disabled={isAddingToCart}
          onClick={handleAddCourseToCart}
        >
          {isAddingToCart ? "Adding..." : "Add to Cart"}
        </Button>
      )}
      {isCourseInCart && (
        <Button variant="outline" className="w-full  py-6 text-lg relative">
          <Link href="/cart" className="absolute inset-0 z-10" />
          Go to Cart
        </Button>
      )}

      {hasAccess && (
        <Button variant="outline" className="w-full  py-6 text-lg relative">
          <Link
            href={`/course/${course.slug}`}
            className="absolute inset-0 z-10"
          />
          View Course
        </Button>
      )}
      {!hasAccess && user && <WishlistButton course={course} />}
    </div>
  );
};

export default CardActions;
