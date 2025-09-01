"use client";

import { useWishlist } from "@/hooks/useWishlist";
import { ICourse } from "@/types/course";
import { useMemo } from "react";
import { FaRegHeart } from "react-icons/fa";
import { Button } from "../ui/button";
import useCourseStatus from "@/hooks/useCourseStatus";
import { useAppSelector } from "@/lib/store/hooks";

interface WishlistButtonProps {
  course: ICourse;
  className?: string;
}

const WishlistButton = ({ course, className }: WishlistButtonProps) => {
  const {
    isCourseInWishlist,
    handleAddToWishlist,
    handleRemoveFromWishlist,
    isAddingToWishlist,
  } = useWishlist();
  const { hasAccess } = useCourseStatus(course._id);
  const user = useAppSelector((state) => state.auth.user);
  const isCourseInWishlistMemo = useMemo(
    () => isCourseInWishlist(course._id),
    [isCourseInWishlist, course._id]
  );

  const handleToggleWishlist = async () => {
    if (isCourseInWishlistMemo) {
      await handleRemoveFromWishlist(course._id);
    } else {
      await handleAddToWishlist(course._id);
    }
  };

  if (!user || hasAccess) return null;
  return (
    <Button
      size="icon"
      variant="outline"
      aria-label="Add to wishlist"
      className={`w-[40px] h-[40px] ${
        isCourseInWishlistMemo && "bg-primary"
      } ${className}`}
      onClick={handleToggleWishlist}
      disabled={isAddingToWishlist}
    >
      <FaRegHeart />
    </Button>
  );
};

export default WishlistButton;
