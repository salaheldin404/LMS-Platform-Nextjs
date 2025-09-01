"use client";
import { useAppSelector } from "@/lib/store/hooks";
import { ICourse } from "@/types/course";
import React from "react";
import { FaStar } from "react-icons/fa";
import { PiUserLight } from "react-icons/pi";
import CourseActions from "./CourseActions";

interface CourseStatsProps {
  course: ICourse;
}

const CourseStats = ({ course }: CourseStatsProps) => {
  const user = useAppSelector((state) => state.auth.user);
  const isOwn = user?._id === course.instructor._id;
  const averageRating = course.ratingsSummary?.averageRating;
  const totalRatings = course.ratingsSummary?.totalRatings;
  const studentCount = course.enrollmentsCount;

  return (
    <div className=" flex-between  px-4 py-3">
      <p className="flex items-center gap-2">
        <FaStar className="text-orange-400" />
        {averageRating || 0}
        <span className="text-gray-400">({totalRatings || 0})</span>
      </p>
      <div className="flex items-center gap-1">
        <PiUserLight />
        <p>{studentCount || 0}</p>
        <span>students</span>
        {isOwn && <CourseActions course={course} />}
      </div>
    </div>
  );
};

export default CourseStats;
