"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import PreviewDialog from "./PreviewDialog";
import type { ICourse } from "@/types/course";
import {
  FaPlayCircle,
  FaFacebookF,
  FaTwitter,
  FaLinkedin,
  FaLink,
  FaRegPlayCircle,
  FaInfinity,
} from "react-icons/fa";
import { FiFileText, FiDownload, FiSmartphone } from "react-icons/fi";
import { GoTrophy } from "react-icons/go";

// import { addItemToCart } from "@/lib/store/cart-slice";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";
import useCourseStatus from "@/hooks/useCourseStatus";
import { useAppSelector } from "@/lib/store/hooks";
import WishlistButton from "@/components/course/WishlistButton";
const CourseFeatureCard = ({ course }: { course: ICourse }) => {
  const { addCourseToCart, error, isAddingToCart } = useCart();

  const { hasAccess, isCourseInCart } = useCourseStatus(course._id);
  const user = useAppSelector((state) => state.auth.user);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);

  const firstUnlockedLesson = useMemo(() => {
    return course?.chapters
      ?.flatMap((chapter) => chapter.lessons)
      .find((lesson) => !lesson.locked);
  }, [course]);
  const firstLesson = course?.chapters?.[0]?.lessons[0];
  const handleAddToCart = async () => {
    if (isCourseInCart) {
      return;
    }

    await addCourseToCart(course);
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
  }, [error]);

  return (
    <>
      <div className="lg:col-span-1">
        <div className="bg-card rounded-lg  shadow-md sticky top-[100px] lg:top-[140px]">
          {/* Course Preview Image */}
          <div className="relative">
            <Image
              src={course.image?.url || "/default-course.jpg"}
              alt={course.title}
              width={500}
              height={500}
              className="w-full aspect-video object-cover rounded-t-lg"
            />
            <div
              onClick={() => setShowPreviewDialog(true)}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="bg-slate-900/70 rounded-full p-4 cursor-pointer">
                <FaPlayCircle className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          {/* Course Card Details */}
          <div className="p-6">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <div className="text-2xl font-bold">${course.price || "0"}</div>
              </div>
              <div className="text-slate-500 line-through">$660</div>

              <div className="text-sm text-slate-500 mb-2">
                <span className="text-red-500 font-medium">40% off</span>• 3
                days left at this price!
              </div>
            </div>

            {hasAccess ? (
              <Link
                className="w-full mb-3 py-3 text-white text-lg bg-primary block rounded text-center"
                href={`/course/${course.slug}/learn/lecture/${firstLesson?._id}`}
              >
                Go to course
              </Link>
            ) : (
              <Button className="w-full mb-3 bg-primary py-6 text-lg">
                Enroll Now
              </Button>
            )}
            <div className="flex items-center gap-3 mb-4">
              {!hasAccess && !isCourseInCart && (
                <Button
                  variant="outline"
                  className="w-full  py-6 text-lg"
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                >
                  {isAddingToCart ? "Adding..." : "Add to Cart"}
                </Button>
              )}
              {isCourseInCart && (
                <Button
                  variant="outline"
                  className="w-full  py-6 text-lg relative"
                >
                  <Link href="/cart" className="absolute inset-0 z-10" />
                  Go to Cart
                </Button>
              )}
              {!hasAccess && user && <WishlistButton course={course} />}
            </div>
            <div className="text-center text-sm text-slate-500 mb-6">
              30-Day Money-Back Guarantee
              <br />
              Full Lifetime Access
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Share</span>
                <div className="flex gap-2 text-slate-500">
                  <FaFacebookF className="h-5 w-5 cursor-pointer hover:text-blue-600" />
                  <FaTwitter className="h-5 w-5 cursor-pointer hover:text-blue-400" />
                  <FaLinkedin className="h-5 w-5 cursor-pointer hover:text-blue-700" />
                  <FaLink className="h-5 w-5 cursor-pointer hover:text-slate-700" />
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span>Apply Coupon</span>
                <span className="text-blue-600 cursor-pointer">Enter Code</span>
              </div>
            </div>
          </div>

          {/* Course Includes */}
          <div className="border-t px-6 py-4">
            <h3 className="font-medium mb-3">This course includes:</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <FaRegPlayCircle className="h-5 w-5 text-slate-500" />
                {/* <span>{course.totalLessons || 0} on-demand videos</span> */}
                <span>4 on-demand videos</span>
              </li>
              <li className="flex gap-2">
                <FiFileText className="h-5 w-5 text-slate-500" />
                <span>5 articles</span>
              </li>
              <li className="flex gap-2">
                <FiDownload className="h-5 w-5 text-slate-500" />
                <span>3 downloadable resources</span>
              </li>
              <li className="flex gap-2">
                <FaInfinity className="h-5 w-5 text-slate-500" />
                <span>Full lifetime access</span>
              </li>
              <li className="flex gap-2">
                <FiSmartphone className="h-5 w-5 text-slate-500" />
                <span>Access on mobile and TV</span>
              </li>
              <li className="flex gap-2">
                <GoTrophy className="h-5 w-5 text-slate-500" />
                <span>Certificate of completion</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {firstUnlockedLesson && (
        <PreviewDialog
          currentLesson={firstUnlockedLesson}
          course={course}
          open={showPreviewDialog}
          onClose={() => setShowPreviewDialog(false)}
        />
      )}
    </>
  );
};

export default CourseFeatureCard;
