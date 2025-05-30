import LessonItem from "./LessonItem";
import { getUserProgressForCourse } from "@/server/dataFetching/courses";

import ChapterAccordion from "@/components/course/ChapterAccordion";
import { APIError } from "@/lib/api/client";
import { redirect } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import CompletedCourseDialog from "./CompletedCourseDialog";
const CourseSidebar = async ({ course }) => {
  try {
    const userProgress = await getUserProgressForCourse(course?._id);
    return (
      <>
        <div className="">
          <div className="flex items-center justify-between mb-3">
            <h1>Course contents</h1>
            <p>
              <span className="text-primary mr-2">
                {userProgress?.progressPercentage}%
              </span>
              completed
            </p>
          </div>
          <div className="mb-3">
            <Progress value={userProgress?.progressPercentage} />
          </div>
          {/* course progresss */}
        </div>
        <ChapterAccordion
          completedLessons={userProgress?.completedLessons}
          course={course}
          LessonItem={LessonItem}
        />
        <CompletedCourseDialog
          userProgress={userProgress?.progressPercentage}
          courseId={course?._id}
        />
      </>
    );
  } catch (error) {
    if (error instanceof APIError) {
      if (error.statusCode === 403) {
        redirect("/");
      }
      console.log(error?.statusCode, "from error course sidebar");
    }
    console.log(error, "not APIEROR");
    return (
      <>
        <div className="text-red-500 font-bold">error fetching course</div>
      </>
    );
  }
};

export default CourseSidebar;
