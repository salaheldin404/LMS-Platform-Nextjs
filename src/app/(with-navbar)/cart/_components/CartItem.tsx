"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { LuHeart, LuStar, LuClock, LuAward, LuTrash2 } from "react-icons/lu";
import { FaPlayCircle } from "react-icons/fa";
import { useCallback } from "react";

import { CartCourseItem } from "@/types/course";
import { formatPrice } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

import { addItemToWishlist } from "@/lib/store/wishlist-slice";
import { moveToWishlist } from "@/lib/store/cart-slice";

interface CartItemProps {
  item: CartCourseItem;
  onRemove: (id: string) => void;
  isRemovingFromCart?: boolean;
}
const CartItem = ({ item, onRemove, isRemovingFromCart }: CartItemProps) => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const handleRemoveClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onRemove(item._id);
    },
    [item._id, onRemove]
  );

  const handleMoveToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(moveToWishlist(item));
    dispatch(addItemToWishlist(item));
  };

  return (
    <div key={item._id} className="p-6 bg-card relative shadow-md">
      <Link
        href={`/course/${item.slug}`}
        className="absolute inset-0 z-10 cursor-pointer"
        aria-label={`View ${item.title} course details`}
      />
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <Image
            src={item.image?.url || "/default-course.jpg"}
            alt={item.title}
            width={120}
            height={68}
            className="rounded border"
            priority={false}
            placeholder="empty"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-2 line-clamp-2">
            {item.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            By {item.instructor.username}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <LuStar className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">
                {item.ratingsSummary?.averageRating}
              </span>
              <span>
                ({item.ratingsSummary?.totalRatings.toLocaleString()}
                ratings)
              </span>
            </div>
            <div className="flex items-center gap-1">
              <LuClock className="w-4 h-4" />
              <span>{item.formattedTotalDuration}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaPlayCircle className="w-4 h-4" />
              <span>42 lectures</span>
            </div>
            <div className="flex items-center gap-1">
              <LuAward className="w-4 h-4" />
              <span>{item.level}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={handleRemoveClick}
                className="flex items-center gap-1 z-10 text-sm font-medium"
                disabled={isRemovingFromCart}
              >
                <LuTrash2 className="w-4 h-4" />
                Remove
              </Button>
              {user && (
                <Button
                  onClick={handleMoveToWishlist}
                  className="flex items-center gap-1 z-10 text-sm font-medium"
                >
                  <LuHeart className="w-4 h-4" />
                  Move to Wishlist
                </Button>
              )}
            </div>

            <div className="text-right">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {formatPrice(item.price || 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
