"use client";

import { useCallback, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

import {
  useGetCartQuery,
  useRemoveFromCartMutation,
  useAddToCartMutation,
  useClearCartMutation,
} from "@/lib/store/features/cartApiSlice";

import {
  addItemToCart,
  removeItemFromCart,
  clearCart,
} from "@/lib/store/cart-slice";
import { CartCourseItem } from "@/types/course";

export const useCart = () => {
  const user = useAppSelector((state) => state.auth.user);
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const [
    removeFromCart,
    { isLoading: isRemovingFromCart, error: removeFromCartError },
  ] = useRemoveFromCartMutation();
  const [addToCart, { isLoading: isAddingToCart, error: addToCartError }] =
    useAddToCartMutation();
  const [clearCartFromServer, { isLoading: isClearingCart }] =
    useClearCartMutation();

  const {
    data: serverCartData,
    isLoading: isFetchingCart,
    error: getCartError,
  } = useGetCartQuery(undefined, { skip: !user });

  const error = useMemo(() => {
    return getCartError || addToCartError || removeFromCartError;
  }, [getCartError, addToCartError, removeFromCartError]);

  // check if there is data in localstoarge and the user that logged in the course is own
  console.log(serverCartData, "serverCartData");
  useEffect(() => {
    if (serverCartData) {
      serverCartData.items.forEach((item) => {
        dispatch(addItemToCart(item.course));
      });
    }
  }, [serverCartData, dispatch, user]);

  const addCourseToCart = useCallback(
    async (course: CartCourseItem) => {
      console.log(course, "from add course to cart");
      if (user) {
        await addToCart(course._id).unwrap();
        dispatch(addItemToCart(course));
      } else {
        dispatch(addItemToCart(course));
      }
    },
    [user, addToCart, dispatch]
  );

  const removeCourseFromCart = useCallback(
    async (courseId: string) => {
      if (user) {
        await removeFromCart(courseId).unwrap();
        dispatch(removeItemFromCart(courseId));
      } else {
        dispatch(removeItemFromCart(courseId));
      }
    },
    [user, removeFromCart, dispatch]
  );

  const handleClearCart = useCallback(async () => {
    if (user) {
      await clearCartFromServer().unwrap();
      dispatch(clearCart());
    } else {
      dispatch(clearCart());
    }
  }, [user, clearCartFromServer, dispatch]);

  return {
    cart,
    addCourseToCart,
    removeCourseFromCart,
    handleClearCart,
    error,
    isAddingToCart,
    isRemovingFromCart,
    isFetchingCart,
    isClearingCart,
  };
};
