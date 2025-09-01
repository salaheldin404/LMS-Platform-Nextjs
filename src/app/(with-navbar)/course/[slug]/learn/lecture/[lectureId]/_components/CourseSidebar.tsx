import LessonItem from "./LessonItem";
import { getUserProgressForCourse } from "@/server/dataFetching/courses";

// import ChapterAccordion from "@/components/course/ChapterAccordion";
import { APIError } from "@/lib/api/client";
import { redirect } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import CompletedCourseDialog from "./CompletedCourseDialog";
import { ICourse } from "@/types/course";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MdOutlinePlayCircle } from "react-icons/md";
import { TfiTimer } from "react-icons/tfi";

const CourseSidebar = async ({ course }: { course: ICourse }) => {
  try {
    const userProgress = await getUserProgressForCourse(course?._id);
    const completedLessons = userProgress?.completedLessons || [];

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
        <Accordion type="single" collapsible className="w-full">
          {course.chapters?.map((chapter, index) => (
            <AccordionItem key={index} value={`chapter-${index}`}>
              <AccordionTrigger className="px-4 py-3 dark:hover:bg-secondary hover:bg-slate-50">
                <div className="flex justify-between w-full pr-4">
                  <div className="text-left">
                    <span className="font-medium">{chapter.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <MdOutlinePlayCircle className="text-blue-600" />
                      <span>{chapter.lessons.length} lectures</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TfiTimer className="text-primary" />
                      <span className="font-medium">
                        {chapter.formattedDuration}
                      </span>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="divide-y">
                  {chapter.lessons.map((lesson, idx) => (
                    <LessonItem
                      lesson={lesson}
                      completedLessons={completedLessons}
                      key={lesson?._id || idx}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        {/* <ChapterAccordion
          completedLessons={completedLessons}
          course={course}
          LessonItem={LessonItem}
        /> */}
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
