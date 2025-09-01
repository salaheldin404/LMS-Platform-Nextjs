import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ICourse, ILesson } from "@/types/course";
import { MdOutlinePlayCircle } from "react-icons/md";
import { TfiTimer } from "react-icons/tfi";
import React from "react";
interface ChapterAccordionProps {
  LessonItem: React.FC<{
    lesson: ILesson;
    course: ICourse;
  }>;
  course?: ICourse;
}
const ChapterAccordion = ({ LessonItem, course }: ChapterAccordionProps) => {
  return (
    <Accordion type="multiple" className="w-full">
      {course?.chapters?.map((chapter, index) => (
        <AccordionItem key={index} value={`chapter-${index}`}>
          <AccordionTrigger className="md:px-2 md:py-2 lg:px-4 lg:py-3 dark:hover:bg-secondary hover:bg-slate-50">
            <div className="flex justify-between w-full pr-4">
              <div className="text-left">
                <span className="font-medium">{chapter.title}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
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
              {chapter.lessons.map((lesson) => (
                <LessonItem lesson={lesson} key={lesson._id} course={course} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default ChapterAccordion;
