"use client";
import { useMediaQuery } from "@uidotdev/usehooks";

import type { ICourse } from "@/types/course";
import Image from "next/image";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

import CourseDetails from "./CourseDetails";
import CourseStats from "./CourseStats";

import CardActions from "./CardActions";
import InstructorInfo from "./InstructorInfo";
import WishlistButton from "./WishlistButton";

interface IProps {
  course: ICourse;
  page?: "profile";
}

const CourseCard = ({ course, page }: IProps) => {
  const isLargeScreen = useMediaQuery("(min-width : 993px)");
  const shouldShowHover = isLargeScreen && page !== "profile";

  const CardContent = () => (
    <div className="bg-card rounded  relative">
      <Link href={`/course/${course.slug}`}>
        <div className="relative w-full aspect-[16/9] overflow-hidden ">
          <Image
            src={course.image?.url || "/default-course.jpg"}
            alt={course.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
            placeholder="empty"
          />
        </div>
      </Link>

      <CourseDetails
        title={course.title}
        price={course?.price || 0}
        category={course.category}
      />
      <CourseStats course={course} />
      {!shouldShowHover && (
        <WishlistButton course={course} className="absolute right-3 top-3" />
      )}
    </div>
  );

  if (!shouldShowHover) {
    return <CardContent />;
  }
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div>
          <CardContent />
        </div>
      </HoverCardTrigger>

      <HoverCardContent
        side="right"
        align="start"
        className={`p-4 w-[400px] z-20`}
      >
        <h1 className="font-semibold">{course.title}</h1>
        <InstructorInfo instructor={course.instructor} />
        <p className="my-3 text-gray-400">{course.description}</p>
        <CardActions course={course} />
        {/* <HoverCardArrow className="fill-white absolute top-1/2 -left-2 -mt-1 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8" /> */}
      </HoverCardContent>
    </HoverCard>
  );
};

export default CourseCard;
