// import type { IChapter } from "@/types/course";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { memo, useCallback, useMemo, useState } from "react";
import EditSectionDialog from "./EditSectionDialog";
import AddLessonDialog from "./AddLessonDialog";
import LessonItem from "./LessonItem";
import { RxHamburgerMenu } from "react-icons/rx";
import type { FieldErrors } from "react-hook-form";

import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

import type { EditLessonParams, ISection } from "./CurriculumTab";
import DataRemovalConfirmation from "@/components/DataRemovalConfirmation";

interface ISectionProps {
  section: ISection;
  onEdit: (sectionId: string, title: string) => void;
  onDelete: (sectionId: string) => void;
  onAddLesson: (sectionId: string, lessonTitle: string) => void;
  onEditLesson: (params: EditLessonParams) => void;
  onDeleteLesson: (sectionId: string, lessonId: string) => void;
  index: number;
  error?: FieldErrors<ISection>;
}

const Section = memo(
  ({
    section,
    onEdit,
    onDelete,
    onAddLesson,
    onEditLesson,
    onDeleteLesson,
    index,
    error,
  }: ISectionProps) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: section._id });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [lessonDialogOpen, setLessonDialogOpen] = useState(false);
    const [confirmationDialogOpen, setConfirmationDialog] = useState(false);

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

    const handleSaveEdit = useCallback(
      (newTitle: string) => {
        onEdit(section._id, newTitle);
      },
      [section._id, onEdit]
    );

    const handleAddLesson = useCallback(
      (title: string) => {
        onAddLesson(section._id, title);
      },
      [section._id, onAddLesson]
    );

    const handleEditLesson = useCallback(
      (lessonId: string, lessonTitle: string, locked: boolean) => {
        onEditLesson({ sectionId: section._id, lessonId, locked, lessonTitle });
      },
      [section._id, onEditLesson]
    );

    const handleUploadLessonVideo = useCallback(
      (lessonId: string, videoFile: File) => {
        onEditLesson({ sectionId: section._id, lessonId, attach: videoFile });
      },
      [section._id, onEditLesson]
    );

    const handleDeleteLesson = useCallback(
      (lessonId: string) => {
        onDeleteLesson(section._id, lessonId);
      },
      [section._id, onDeleteLesson]
    );
    // Memoize lesson items array to prevent unnecessary re-renders
    const lessonItems = useMemo(
      () => section.lessons?.map((lesson) => lesson._id) || [],
      [section.lessons]
    );
    // Memoize lessons content to prevent re-rendering during drag
    const lessonsContent = useMemo(() => {
      if (!section.lessons || section.lessons.length === 0) {
        return null;
      }

      return (
        <div className="mt-3 pl-6 space-y-3">
          <SortableContext
            id={`lessons-${section._id}`}
            items={lessonItems}
            strategy={verticalListSortingStrategy}
          >
            {section.lessons.map((lesson, lessonIndex) => (
              <LessonItem
                key={lesson._id}
                lesson={lesson}
                onEdit={handleEditLesson}
                onUpload={handleUploadLessonVideo}
                onDelete={handleDeleteLesson}
                error={error?.lessons?.[lessonIndex]}
                // Add a prop to disable interactions during section drag
                isParentDragging={isDragging}
              />
            ))}
          </SortableContext>
        </div>
      );
    }, [
      section.lessons,
      section._id,
      lessonItems,
      handleEditLesson,
      handleUploadLessonVideo,
      handleDeleteLesson,
      error?.lessons,
      isDragging,
    ]);

    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`p-3 bg-secondary relative my-3 rounded transition-all`}
        data-type="section"
        data-section-id={section._id}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button
              {...attributes}
              {...listeners}
              variant="secondary"
              size="icon"
              className="cursor-grab"
            >
              <RxHamburgerMenu className="h-4 w-4" />
            </Button>
            <p className="flex gap-2">
              <span className="font-normal">Section 0{index + 1}: </span>
              <span className="font-medium">{section.title}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              className="cursor-pointer"
              variant="ghost"
              size="icon"
              title="Add lesson"
              onClick={() => setLessonDialogOpen(true)}
            >
              <FaPlus className="h-4 w-4" />
            </Button>
            <Button
              className="cursor-pointer"
              variant="ghost"
              size="icon"
              title="Edit section"
              onClick={() => setIsDialogOpen(true)}
            >
              <FaEdit className="h-4 w-4" />
            </Button>
            <Button
              className="cursor-pointer"
              variant="ghost"
              size="icon"
              title="Delete section"
              onClick={() => setConfirmationDialog(true)}
            >
              <FaRegTrashAlt className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {error?.title && <p className="text-red-500">{error.title.message}</p>}

        {/* Display lessons if available */}
        {lessonsContent}
        {/* {section.lessons && section.lessons.length > 0 && (
          <div className="mt-3 pl-6 space-y-3">
            <SortableContext
              id={`lessons-${section._id}`}
              items={section.lessons.map((lesson) => lesson._id)}
              strategy={verticalListSortingStrategy}
            >
              {section.lessons.map((lesson, lessonIndex) => (
                <LessonItem
                  key={lesson._id}
                  lesson={lesson}
                  onEdit={handleEditLesson}
                  onUpload={handleUploadLessonVideo}
                  onDelete={handleDeleteLesson}
                  error={error?.lessons?.[lessonIndex]}
                />
              ))}
            </SortableContext>
          </div>
        )} */}

        <EditSectionDialog
          isOpen={isDialogOpen}
          initialTitle={section.title}
          onClose={() => setIsDialogOpen(false)}
          onSave={handleSaveEdit}
          type="section"
        />
        <DataRemovalConfirmation
          isOpen={confirmationDialogOpen}
          onClose={() => setConfirmationDialog(false)}
          onClick={() => onDelete(section._id)}
          message="You are about to remove a curriculum item. Are you sure you want to continue?"
        />

        <AddLessonDialog
          isOpen={lessonDialogOpen}
          onClose={() => setLessonDialogOpen(false)}
          onAddLesson={handleAddLesson}
        />
      </div>
    );
  }
);

Section.displayName = "Section";

export default Section;
