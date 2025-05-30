import type { ICourse } from "@/types/course";
import Image from "next/image";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  HoverCardArrow,
} from "../ui/hover-card";

import { FaStar, FaRegHeart } from "react-icons/fa";

import { Button } from "../ui/button";
import CourseDetails from "./CourseDetails";
import CourseStats from "./CourseStats";

interface IProps {
  course: ICourse;
  page?: "profile";
}

const CourseCard = ({ course, page }: IProps) => {
  const { averageRatings = 0, totalRatings = 0 } =
    course.instructor.instructorRating ?? {};
  const isLargeScreen = false;

  const CardContent = () => (
    <div className="bg-card rounded ">
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
        price={course?.price}
        category={course.category}
      />
      <CourseStats
        // averageRating={course.ratingsSummary?.averageRating || 0}
        // totalRatings={course.ratingsSummary?.totalRatings || 0}
        // studentCount={course.enrollmentsCount || 0}
        course={course}
      />
      {/* <CourseActions course={course} /> */}
    </div>
  );

  return isLargeScreen ? (
    <HoverCard openDelay={400}>
      <HoverCardTrigger asChild>
        <CardContent />
      </HoverCardTrigger>

      <HoverCardContent
        side="right"
        align="start"
        className={`p-4 w-[400px] hidden lg:block ${
          page == "profile" && "hidden"
        }`}
      >
        <h1 className="font-semibold">{course.title}</h1>
        <div className="flex-between my-3">
          <div className=" flex-between gap-2">
            <div className="relative w-10 h-10 rounded-full">
              <Image
                src={
                  course.instructor.profilePicture?.url ||
                  "/default-profile.png"
                }
                alt={course.instructor.username}
                fill
                className="rounded-full"
                sizes="40px"
              />
            </div>
            <div className="flex flex-col ">
              <span className="text-gray-400 text-sm">Course by</span>
              <p>{course.instructor.username}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FaStar className="text-orange-400" />

            {averageRatings}
            <span className="text-gray">({totalRatings})</span>
          </div>
        </div>
        <p className="my-3 text-gray-400">{course.description}</p>
        <div className="flex items-center gap-3">
          <Button className="flex-1">Add to cart</Button>
          <Button>
            <FaRegHeart />
          </Button>
        </div>
        <HoverCardArrow
          className="fill-white"
          style={{
            position: "absolute",
            top: "10px", // Adjust as needed
            left: "10px", // Adjust as needed
            transform: "translateX(-50%)", // Center the arrow horizontally
          }}
        />
      </HoverCardContent>
    </HoverCard>
  ) : (
    <CardContent />
  );
};

export default CourseCard;
