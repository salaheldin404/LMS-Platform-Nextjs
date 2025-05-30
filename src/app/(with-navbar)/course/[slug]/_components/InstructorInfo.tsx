import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUser } from "@/types/user";
import { FaStar, FaBookOpen, FaGraduationCap } from "react-icons/fa";
import { TbUsers } from "react-icons/tb";
import SectionWrapper from "./SectionWrapper";

const InstructorSection = ({ instructor }: { instructor: IUser }) => {
  return (
    <SectionWrapper title="Instructor">
      <div className="flex items-start gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage
            src={instructor.profilePicture?.url || "/default-profile.png"}
          />
          <AvatarFallback className="text-xl">
            {instructor.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-bold text-xl">{instructor.username}</h3>
          <p className=" text-sm">{instructor.headline || "Instructor"}</p>
          <div className="flex flex-wrap items-center gap-4 mt-2 text-sm ">
            <div className="flex items-center ">
              <FaStar className="h-4 w-4 mr-1 text-orange-400" />
              <p className="flex gap-1 ">
                <span>
                  {instructor.instructorRating?.averageRatings || "0"}
                </span>
                Instructor Rating
              </p>
            </div>
            <div className="flex items-center">
              <TbUsers className="h-4 w-4 mr-1" />
              <span>
                {instructor.instructorRating?.totalRatings || "0"}
                Reviews
              </span>
            </div>
            <div className="flex items-center">
              <FaGraduationCap className="h-4 w-4 mr-1" />
              <span>
                44 Students
                {/* {instructor.studentsCount || "0"} Students */}
              </span>
            </div>
            <div className="flex items-center">
              <FaBookOpen className="h-4 w-4 mr-1" />
              <span>
                9 courses
                {/* {instructor.coursesCount || "0"} Courses */}
              </span>
            </div>
          </div>
          {instructor.biography && (
            <p className="mt-4 ">{instructor.biography}</p>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default InstructorSection;
