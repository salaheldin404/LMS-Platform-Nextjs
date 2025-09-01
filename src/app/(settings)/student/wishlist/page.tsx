"use client";

import Link from "next/link";
import { useWishlist } from "@/hooks/useWishlist";
import dynamic from "next/dynamic";

const CourseCard = dynamic(() => import("@/components/course/CourseCard"), {
  ssr: false,
});

const WishlistPage = () => {
  const { wishlistData, isFetchingWishlist } = useWishlist();

  if (isFetchingWishlist) {
    return <div className="text-center text-2xl font-bold ">Loading...</div>;
  }
  return (
    <div className="py-5 text-center">
      {wishlistData && wishlistData.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlistData.map((item) => (
            <CourseCard key={item.course._id} course={item.course} />
          ))}
        </div>
      ) : (
        <Link
          href="/courses"
          className="text-center bg-primary px-4 py-2 rounded font-bold "
        >
          Browse courses now
        </Link>
      )}
    </div>
  );
};

export default WishlistPage;
