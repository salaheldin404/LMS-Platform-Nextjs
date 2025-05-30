import { ICourse } from "@/types/course";
import SectionWrapper from "./SectionWrapper";
import LessonItem from "./LessonItem";
import { FaFolderOpen } from "react-icons/fa";
import { TfiTimer } from "react-icons/tfi";
import { MdOutlinePlayCircle } from "react-icons/md";
import ChapterAccordion from "@/components/course/ChapterAccordion";
const CourseContent = ({ course }: { course: ICourse }) => {
  return (
    <SectionWrapper title="Course Content">
      <div className="text-sm  mb-4 flex items-center gap-2">
        <div className="flex items-center gap-1">
          <FaFolderOpen className="text-primary" />
          <span className="font-medium">{course.chapters?.length}</span>
        </div>
        <div className="flex items-center gap-1">
          <MdOutlinePlayCircle className="text-blue-600" />
          <span className="font-medium">3 lectures</span>
        </div>
        <div className="flex items-center gap-1">
          <TfiTimer className="text-primary" />
          <span className="font-medium">{course.formattedTotalDuration}</span>
        </div>

        {/* • {course.totalLessons || 0} lectures • */}
        {/* {course.totalDuration || "N/A"} total length */}
      </div>
      <ChapterAccordion course={course} LessonItem={LessonItem} />
      {/* <Accordion type="single" collapsible className="w-full">
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
                    course={course}
                    key={lesson?._id || idx}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion> */}
    </SectionWrapper>
  );
};

export default CourseContent;
