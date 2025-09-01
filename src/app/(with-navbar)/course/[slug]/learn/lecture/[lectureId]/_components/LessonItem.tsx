"use client";
import { ILesson, LessonComplete } from "@/types/course";
import { Checkbox } from "@/components/ui/checkbox";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { markLessonAsComplete } from "@/server/dataFetching/courses";

const LessonItem = ({
  lesson,
  completedLessons,
}: {
  lesson: ILesson;
  completedLessons: LessonComplete[];
}) => {
  const { lectureId } = useParams();

  const isActive = lectureId === lesson._id.toString();
  const isCompleted = completedLessons?.some(
    (comp) => comp?.lessonId?.toString() == lesson._id.toString()
  );
  const [isCompletedLocal, setIsCompletedLocal] = useState(isCompleted);
  const [isUpdating, setIsUpdating] = useState(false);
  const handleMarkAsComplete = async (checked: boolean) => {
    const previousChecked = isCompletedLocal;

    setIsUpdating(true);
    setIsCompletedLocal(checked);
    try {
      await markLessonAsComplete(lesson._id.toString());
    } catch (error) {
      console.log(error);
      setIsCompletedLocal(previousChecked);
    }
  };

  useEffect(() => {
    if (!isUpdating) {
      setIsCompletedLocal(isCompleted);
    }
  }, [isUpdating, isCompleted]);

  return (
    <div
      className={`flex items-center gap-3 cursor-pointer  py-3 px-4 ${
        isActive
          ? "dark:bg-secondary bg-slate-50"
          : "dark:hover:bg-secondary hover:bg-slate-50"
      }`}
    >
      <Checkbox
        checked={isCompletedLocal}
        onCheckedChange={handleMarkAsComplete}
      />
      <Link href={`${lesson._id}`} className="w-full">
        <div className="flex items-center justify-between gap-2 w-full">
          <div className="flex items-cneter gap-2">
            <span>{lesson.order}.</span>
            <p>{lesson.title}</p>
          </div>
          <div>
            <p className="text-gray-500">{lesson.formattedDuration}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default LessonItem;
