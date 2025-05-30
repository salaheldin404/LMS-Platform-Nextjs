import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TbUsers } from "react-icons/tb";
import { FaStar, FaCalendarAlt } from "react-icons/fa";
import { ICourse } from "@/types/course";
import Link from "next/link";
const CourseInfo = ({ course }: { course: ICourse }) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-3">{course.title}</h1>
      <p className="text-xl text-slate-300 mb-4">{course.subtitle}</p>

      {/* Ratings and stats row */}
      <div className="flex items-center flex-wrap gap-4 mb-4">
        <div className="flex items-center">
          <span className="text-orange-400 mr-1">
            <FaStar className="h-5 w-5 inline" />
          </span>
          <span className="font-bold mr-1">
            {course.ratingsSummary?.averageRating}
          </span>
          <span className="text-slate-400">
            ({course.ratingsSummary?.totalRatings} ratings)
          </span>
        </div>
        <div className="text-slate-300">
          <TbUsers className="h-4 w-4 inline mr-1" />
          {course.enrollmentsCount || 0} students enrolled
        </div>
        <div className="text-slate-300">
          <FaCalendarAlt className="h-4 w-4 inline mr-1" />
          Last updated:
          {new Date(course.updatedAt).toLocaleDateString()}
        </div>
      </div>

      {/* Instructor info */}
      <div className="flex items-center gap-3">
        <Link href={`/profile/${course.instructor._id}`}>
          <Avatar className="h-10 w-10 border border-slate-600">
            <AvatarImage
              src={
                course.instructor.profilePicture?.url || "/default-profile.png"
              }
            />
            <AvatarFallback className="bg-slate-700">
              {course.instructor.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <span className="text-slate-400 text-sm">Created by</span>
          <Link className="" href={`/profile/${course.instructor._id}`}>
            <p className="font-medium">{course.instructor.username}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
