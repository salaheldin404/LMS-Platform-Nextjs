import { getCourseBySlug } from "@/server/dataFetching/courses";
import SectionHeader from "./_components/SectionHeader";

import MainContent from "./_components/MainContent";
import CourseSidebar from "./_components/CourseSidebar";
import { getActiveSession } from "@/server/actions/auth";
import { redirect } from "next/navigation";
import { ICourse } from "@/types/course";

const getNextLectureId = (course: ICourse, currentLessonId: string) => {
  const allLessons = course?.chapters?.flatMap((chapter) => chapter.lessons);
  if (!allLessons) return null;
  const currentIndex = allLessons.findIndex(
    (lesson) => lesson._id === currentLessonId
  );

  return currentIndex == -1 || currentIndex >= allLessons.length - 1
    ? null
    : allLessons[currentIndex + 1]._id;
};

const LearnPage = async ({
  params,
}: {
  params: Promise<{ slug: string; lectureId: string }>;
}) => {
  const { slug, lectureId } = await params;
  const [course, user] = await Promise.all([
    getCourseBySlug(slug),
    getActiveSession(),
  ]);
  const nextLectureId = getNextLectureId(course, lectureId);

  if (
    user &&
    course &&
    !user.enrolledCourses?.includes(course._id) &&
    !user.createdCourses?.includes(course._id)
  ) {
    redirect("/");
  }

  return (
    <div className="main-section">
      <SectionHeader course={course} nextLectureId={nextLectureId} />

      <div className="flex gap-3 p-4">
        <div className="basis-[65%]">
          <MainContent lessonId={lectureId} />
        </div>
        <div className="basis-[35%]">
          <CourseSidebar course={course} />
        </div>
      </div>
    </div>
  );
};

export default LearnPage;
