"use client";
import { FiLock } from "react-icons/fi";
import { FaRegPlayCircle } from "react-icons/fa";
import PreviewDialog from "./PreviewDialog";
import { useState } from "react";
import type { ILesson, ICourse } from "@/types/course";

const LessonItem = ({
  lesson,
  course,
}: {
  lesson: ILesson;
  course: ICourse;
}) => {
  const [openLessonDialog, setOpenLessonDialog] = useState(false);
  const handleOpenDialog = () => {
    if (!lesson.locked) {
      setOpenLessonDialog(true);
    }
  };
  return (
    <>
      <div className="flex items-center gap-3 py-3 px-4 dark:hover:bg-secondary hover:bg-slate-50">
        <div className="text-slate-500">
          {lesson.locked ? (
            <FiLock className="h-4 w-4" />
          ) : (
            <FaRegPlayCircle className="h-4 w-4" />
          )}
        </div>
        <div className="flex-grow">
          <p
            className={`${!lesson.locked && "cursor-pointer"} text-sm`}
            onClick={handleOpenDialog}
          >
            {lesson.title}
          </p>
        </div>
        <div className="text-slate-500 text-xs">{lesson.formattedDuration}</div>
      </div>

      {!lesson.locked && (
        <PreviewDialog
          open={openLessonDialog}
          onClose={() => setOpenLessonDialog(false)}
          course={course}
          currentLesson={lesson}
        />
      )}
    </>
  );
};

export default LessonItem;
