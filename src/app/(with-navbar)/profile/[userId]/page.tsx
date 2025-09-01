import ProfileHeader from "../_components/ProfileHeader";
import AboutSection from "../_components/AboutSection";
import CoursesSection from "../_components/CoursesSection";

import { APIError } from "@/lib/api/client";

import {
  getInstructorCourses,
  getInstructorProfile,
} from "@/server/dataFetching/instructor";

import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { getActiveSession } from "@/server/actions/auth";
import { ProfileHeaderSkeleton } from "../_components/ProfileHeaderSkeleton";
import { CoursesSectionSkeleton } from "../_components/CoursesSectionSkeleton";

async function CoursesData({ userId }: { userId: string }) {
  try {
    const coursesData = await getInstructorCourses(userId);
    return (
      <CoursesSection
        courses={coursesData?.data}
        // pagination={coursesData?.pagination}
      />
    );
  } catch (error) {
    console.log(error, "error courses data");
    return <div>Something went wrong</div>;
  }
}

const ProfilePage = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;
  const session = await getActiveSession();
  console.log(session, "session");
  try {
    const instructor = await getInstructorProfile(userId);
    if (instructor?.role !== "teacher") {
      redirect(`/`);
    }
    return (
      <main className=" main-section">
        <div className="container py-4">
          <Suspense fallback={<ProfileHeaderSkeleton />}>
            <ProfileHeader userData={instructor} />
          </Suspense>
          <div className=" flex flex-col lg:flex-row items-start gap-3 mt-5">
            <AboutSection biography={instructor?.biography} />
            <div className="flex-1 w-[75%] md:w-full my-3 lg:my-0">
              <Suspense
                key={`courses-${userId}`}
                fallback={<CoursesSectionSkeleton />}
              >
                <CoursesData userId={userId} />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    if (error instanceof APIError && error.statusCode === 404) {
      notFound();
    }
    if (error instanceof APIError && error.statusCode === 403) {
      redirect(`/`);
    }
    console.log(error, "error from profile page");
    throw error;
  }
};

export default ProfilePage;
