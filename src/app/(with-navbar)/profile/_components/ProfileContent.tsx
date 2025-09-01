"use client";
import ProfileHeader from "./ProfileHeader";
import AboutSection from "./AboutSection";
import CoursesSection from "./CoursesSection";

import { useGetInstructorCoursesQuery } from "@/lib/store/features/courseApiSlice";
import { useGetUserProfileQuery } from "@/lib/store/features/userApiSlice";

const ProfileContent = ({ userId }: { userId: string }) => {
  const { data, isLoading: isCoursesLoading } =
    useGetInstructorCoursesQuery(userId);
  const { data: userData, isLoading } = useGetUserProfileQuery(userId);

  if (isLoading || isCoursesLoading) return <div>loading...</div>;

  return (
    <div className="container py-4">
      <ProfileHeader userData={userData} />
      <div className=" flex flex-col lg:flex-row items-start gap-3 mt-5">
        <AboutSection biography={userData?.biography} />
        <CoursesSection courses={data?.courses} />
      </div>
    </div>
  );
};

export default ProfileContent;
