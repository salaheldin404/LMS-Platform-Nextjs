import { PiUserLight } from "react-icons/pi";
import { GoVideo } from "react-icons/go";

import { FaStar } from "react-icons/fa";
import type { UserStats } from "@/types/user";

const UserStats = ({
  instructorRating,
  totalStudents,
  totalCourses,
}: UserStats) => {
  return (
    <div className="flex items-center gap-2 md:gap-4 flex-wrap">
      <div className="flex items-center gap-2">
        <FaStar className="text-orange-400" />
        {instructorRating?.averageRatings}
        <span className="text-gray-400">
          ({instructorRating?.totalRatings})
        </span>
      </div>
      <div className="flex items-center gap-2">
        <GoVideo />
        {totalCourses}
        <span className="text-gray-400">courses</span>
      </div>
      <div className="flex items-center gap-2">
        <PiUserLight />
        {totalStudents}
        <span className="text-gray-400">students</span>
      </div>
    </div>
  );
};

export default UserStats;
