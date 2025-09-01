"use client";
import { useMemo } from "react";
import { useCart } from "./useCart";
import { useAppSelector } from "@/lib/store/hooks";

const useCourseStatus = (courseId: string) => {
  const user = useAppSelector((state) => state.auth.user);
  const { cart } = useCart();

  const isEnrolled = useMemo(
    () =>
      user?.enrolledCourses?.some(
        (id) => id.toString() === courseId.toString()
      ),
    [user?.enrolledCourses, courseId]
  );
  const isCreator = useMemo(
    () =>
      user?.createdCourses?.some((id) => id.toString() === courseId.toString()),
    [user?.createdCourses, courseId]
  );
  const hasAccess = useMemo(
    () => isEnrolled || isCreator,
    [isEnrolled, isCreator]
  );
  const isCourseInCart = useMemo(
    () =>
      cart.items?.some((item) => item._id.toString() === courseId.toString()),
    [cart.items, courseId]
  );

  return { hasAccess, isCourseInCart };
};

export default useCourseStatus;
