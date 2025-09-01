"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ICourse, ILesson, IVideo } from "@/types/course";
import { useEffect, useMemo, useState } from "react";

import ReactPlayer from "react-player"; // Import react-player

interface PreviewDialogProps {
  open: boolean;
  onClose: () => void;
  currentLesson: ILesson;
  course: ICourse;
}

const PreviewDialog = ({
  open,
  onClose,
  course,
  currentLesson,
}: PreviewDialogProps) => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const videoData = currentLesson?.video as IVideo;
  const previewLessons = useMemo(() => {
    if (!course?.chapters) return [];
    const allLessons = course.chapters.flatMap((chapter) => chapter.lessons);
    return allLessons.filter((lesson) => !lesson.locked);
  }, [course]);

  useEffect(() => {
    if (open && currentLesson) {
      const index = previewLessons.findIndex(
        (lesson) => lesson._id === currentLesson._id
      );
      setCurrentLessonIndex(index !== -1 ? index : 0);
    }
  }, [open, currentLesson, previewLessons]);

  const activeLesson = previewLessons[currentLessonIndex] || previewLessons[0];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="lg:!w-[800px] lg:!max-w-none"
        aria-describedby={undefined}
      >
        <DialogTitle>
          <div>
            <p className="font-normal text-sm mb-2">Course Preview</p>
            <h2 className="font-bold text-lg">{activeLesson?.title}</h2>
          </div>
        </DialogTitle>

        {/* Video Player */}
        <div className="relative w-full aspect-video  flex items-center justify-center">
          <ReactPlayer
            url={videoData.playbackUrl}
            controls={true}
            width="100%"
            height="auto"
            className="rounded-lg"
          />
        </div>
        {/* Lesson list */}
        <div className="mt-4">
          <h2 className="font-bold text-lg">Free Sample Videos</h2>
          {previewLessons.map((lesson, index) => (
            <div
              key={index}
              className={`my-3 cursor-pointer flex items-center gap-2 rounded py-3 px-4 transition-color ${
                index === currentLessonIndex
                  ? "bg-primary text-white "
                  : "text-slate-500 dark:hover:bg-secondary hover:bg-slate-50 "
              }`}
              onClick={() => setCurrentLessonIndex(index)}
            >
              <div className="flex-grow">
                <p className="text-sm">{lesson.title}</p>
              </div>
              <div className="text-slate-500 text-xs">
                {lesson.formattedDuration}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewDialog;
