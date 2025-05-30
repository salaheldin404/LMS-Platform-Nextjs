import UserStats from "./UserStats";
import SocialLinks from "./SocialLinks";

import type { PublicInstructorProfile } from "@/types/user";
import { DEFAULT_AVATAR } from "@/constants";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
interface IProps {
  userData: PublicInstructorProfile | null;
}

const ProfileHeader = ({ userData }: IProps) => {
  return (
    <div className="rounded flex flex-wrap items-center  bg-card p-4 justify-between border-b mb-4">
      <div className="flex items-center gap-2 md:gap-4">
        <div className="basis-1\2 relative  md:w-[100px] md:h-[100px] rounded-full">
          <Avatar className="w-full h-full">
            <AvatarImage
              src={userData?.profilePicture?.url || DEFAULT_AVATAR}
              alt="user image"
            />
            <AvatarFallback>
              {userData?.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="bassis-1\2 space-y-3">
          <h1 className="font-bold text-lg md:text-3xl capitalize">
            {userData?.username}
          </h1>
          <p className="text-gray-400 capitalize">{userData?.headline}</p>
          <UserStats
            instructorRating={userData?.instructorRating}
            totalCourses={userData?.totalCourses}
            totalStudents={userData?.totalStudents}
          />
        </div>
      </div>

      <div className="md:mt-0 mt-4 ">
        <SocialLinks socialLinks={userData?.socialLinks} />
      </div>
    </div>
  );
};

export default ProfileHeader;
