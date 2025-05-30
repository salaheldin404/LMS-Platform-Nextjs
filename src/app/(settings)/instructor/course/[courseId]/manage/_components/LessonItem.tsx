import { ILesson } from "@/types/course";
import { memo, useMemo, useState } from "react";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { useSortable } from "@dnd-kit/sortable";
import { RxHamburgerMenu } from "react-icons/rx";
import EditSectionDialog from "./EditSectionDialog";
import UploadVideoDialog from "./UploadVideoDialog";

import { useLocalStorage } from "@uidotdev/usehooks";
import DataRemovalConfirmation from "@/components/DataRemovalConfirmation";

interface ILessonProps {
  lesson: ILesson;
  error: any;
  onEdit: (lessonId: string, title: string, locked: boolean) => void;
  onUpload: (lessonId: string, videoFile: File) => void;
  onDelete: (lessonId: string) => void;
}

const LessonItem = memo(
  ({
    lesson,
    onEdit,
    onDelete,
    onUpload,
    error,
    isParentDragging,
  }: ILessonProps & { isParentDragging: boolean }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [videoDialogOpen, setVideoDialogOpen] = useState(false);
    const [videoFile, setVideoFile] = useState<File | null>(lesson.video);
    const [storedVideo, setStoredVideo] = useLocalStorage("videoData", [
      { name: "", _id: "" },
    ]);
    const [confirmationDialogOpen, setConfirmationDialog] = useState(false);

    const videoIndex = storedVideo.findIndex((v) => v._id == lesson._id);
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: lesson._id });

    // Memoize the style object to prevent unnecessary re-renders
    const style = useMemo(
      () => ({
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
        transition: transition || undefined,
        opacity: isDragging ? 0.5 : 1,
      }),
      [transform, transition, isDragging]
    );

    const handleEditLesson = (title: string, locked: boolean) => {
      console.log(lesson, "lesson edit");
      onEdit(lesson._id, title, locked);
    };

    const handUploadVideo = (file: File) => {
      if (file) {
        onUpload(lesson._id, file);
        setVideoFile(file);
        const updateDataStore = storedVideo.filter((v) => v._id !== lesson._id);

        setStoredVideo([
          ...updateDataStore,
          { _id: lesson._id, name: file.name },
        ]);
      }
      console.log(file, "from lesson item");
    };

    const handleDeleteLesson = (lessonId: string) => {
      onDelete(lessonId);
      const updateDataStore = storedVideo.filter((v) => v._id !== lessonId);
      setStoredVideo(updateDataStore);
    };
    // Don't render complex interactions during parent drag
    if (isParentDragging) {
      return (
        <div
          className="bg-card p-2 rounded opacity-70"
          data-type="lesson"
          data-lesson-id={lesson._id}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary rounded flex items-center justify-center">
                <RxHamburgerMenu className="h-4 w-4" />
              </div>
              <p>{lesson.title}</p>
            </div>
          </div>
          {/* <div className="ml-2">{videoContent}</div> */}
        </div>
      );
    }
    return (
      <div
        className="bg-card p-2 rounded "
        data-type="lesson"
        data-lesson-id={lesson._id}
        ref={setNodeRef}
        style={style}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Button
              {...attributes}
              {...listeners}
              variant="secondary"
              size="icon"
              className="cursor-grab"
            >
              <RxHamburgerMenu className="h-4 w-4" />
            </Button>
            <p>{lesson.title}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              className="cursor-pointer"
              variant="ghost"
              size="icon"
              title="Add lesson attach"
              onClick={() => setVideoDialogOpen(true)}
            >
              <FaPlus className="h-4 w-4" />
            </Button>
            <Button
              className="cursor-pointer"
              variant="ghost"
              size="icon"
              title="Edit lesson"
              onClick={() => setIsDialogOpen(true)}
            >
              <FaEdit className="h-4 w-4" />
            </Button>
            <Button
              className="cursor-pointer"
              variant="ghost"
              size="icon"
              title="Delete lesson"
              onClick={() => setConfirmationDialog(true)}
            >
              <FaRegTrashAlt className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="ml-2">
          {storedVideo[videoIndex] ? (
            <div>
              <p>{storedVideo[videoIndex].name}</p>
            </div>
          ) : (
            <div>
              <p>{videoFile?.name}</p>
              <span>{videoFile?.size}</span>
            </div>
          )}

          {error?.video && (
            <p className="text-red-500 text-sm my-2">{error.video.message}</p>
          )}
        </div>
        {error?.title && (
          <p className="my-2 text-red-500 text-sm">{error.title.message}</p>
        )}
        <EditSectionDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSave={handleEditLesson}
          initialTitle={lesson.title}
          type="lesson"
          lessonLocked={lesson.locked}
        />
        <UploadVideoDialog
          isOpen={videoDialogOpen}
          onClose={() => setVideoDialogOpen(false)}
          onSave={handUploadVideo}
          type="lesson"
        />

        <DataRemovalConfirmation
          isOpen={confirmationDialogOpen}
          onClose={() => setConfirmationDialog(false)}
          message="You are about to remove a curriculum item. Are you sure you want to continue?"
          onClick={() => handleDeleteLesson(lesson._id)}
        />
      </div>
    );
  }
);

LessonItem.displayName = "LessonItem";

export default LessonItem;
