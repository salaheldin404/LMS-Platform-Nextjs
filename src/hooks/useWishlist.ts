import {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from "@/lib/store/features/wishlistApiSlice";
import { useAppSelector } from "@/lib/store/hooks";
import { useCallback } from "react";
export const useWishlist = () => {
  const user = useAppSelector((state) => state.auth.user);

  const {
    data: wishlistData,
    isLoading: isFetchingWishlist,
    error: getWishlistError,
  } = useGetWishlistQuery(undefined, { skip: !user });
  const [
    addToWishlist,
    { isLoading: isAddingToWishlist, error: addToWishlistError },
  ] = useAddToWishlistMutation();
  const [
    removeFromWishlist,
    { isLoading: isRemovingFromWishlist, error: removeFromWishlistError },
  ] = useRemoveFromWishlistMutation();

  const isCourseInWishlist = useCallback(
    (courseId: string) => {
      if (!wishlistData) return false;
      return wishlistData.some((item) => item.course._id === courseId);
    },
    [wishlistData]
  );

  console.log(wishlistData, "wishlistData ...");
  const handleAddToWishlist = useCallback(
    async (courseId: string) => {
      if (!user) return;
      try {
        await addToWishlist(courseId).unwrap();
      } catch (error) {
        console.log(error);
      }
    },
    [addToWishlist, user]
  );

  const handleRemoveFromWishlist = useCallback(
    async (courseId: string) => {
      if (!user) return;
      try {
        await removeFromWishlist(courseId).unwrap();
      } catch (error) {
        console.log(error);
      }
    },
    [removeFromWishlist, user]
  );

  return {
    wishlistData,
    isFetchingWishlist,
    getWishlistError,
    isAddingToWishlist,
    addToWishlistError,
    isRemovingFromWishlist,
    removeFromWishlistError,
    handleAddToWishlist,
    handleRemoveFromWishlist,
    isCourseInWishlist,
  };
};
