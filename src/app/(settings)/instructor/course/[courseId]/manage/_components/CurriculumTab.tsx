"use client";

import React, { useCallback, useMemo, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import type { FormData } from "../page";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  useCreateChapterMutation,
  useDeleteChapterMutation,
  useUpdateChapterMutation,
  useUpdateChapterOrderMutation,
} from "@/lib/store/features/chapterApiSlice";

import { toast } from "sonner";
import {
  useCreateLessonMutation,
  useDeleteLessonMutation,
  useUpdateLessonMutation,
  useUpdateLessonOrderMutation,
} from "@/lib/store/features/lessonApiSlice";
import Loading from "./Loading";
import Section from "./Section";

import { RxHamburgerMenu } from "react-icons/rx";

// interface ISection {
//   id: string;
//   title: string;
//   lectures: [];
// }

interface DragData {
  sortable: {
    containerId: string;
    index: number;
  };
}

interface IProps {
  courseId: string;
}

export interface EditLessonParams {
  lessonId: string;
  sectionId: string;
  lessonTitle?: string;
  locked?: boolean;
  attach?: File;
}

const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const CurriculumTab = ({ courseId }: IProps) => {
  const [sectionDialogOpen, setSectionDialogOpen] = useState(false);
  const [sectionValue, setSectionValue] = useState("");

  const [activeId, setActiveId] = useState<string | null>(null);
  const [dragData, setDragData] = useState<DragData | null>(null);

  // RTK Query mutation hooks for chapters
  const [createChapter, { isLoading: createChapterLoading }] =
    useCreateChapterMutation();
  const [updateChapter, { isLoading: updatingChapter }] =
    useUpdateChapterMutation();
  const [updateChapterOrders, { isLoading: loadingChapterOrder }] =
    useUpdateChapterOrderMutation();
  const [deleteChapter, { isLoading: isDeletingChapter }] =
    useDeleteChapterMutation();

  // RTK Query mutation hooks for lessons
  const [createLesson, { isLoading: createLessonLoading }] =
    useCreateLessonMutation();
  const [updateLesson, { isLoading: updateLessonLoading }] =
    useUpdateLessonMutation();
  const [updateLessonsOrder, { isLoading: loadingLessonOrder }] =
    useUpdateLessonOrderMutation();
  const [deleteLesson, { isLoading: isDelettingLesson }] =
    useDeleteLessonMutation();

  // Memoized loading states for chapters and lessons
  const updatingChapterState = useMemo(() => {
    return createChapterLoading || loadingChapterOrder || updatingChapter;
  }, [createChapterLoading, loadingChapterOrder, updatingChapter]);

  const updatingLessonState = useMemo(() => {
    return createLessonLoading || loadingLessonOrder || updateLessonLoading;
  }, [createLessonLoading, loadingLessonOrder, updateLessonLoading]);

  const {
    control,
    formState: { errors },
    trigger,
    getValues,
  } = useFormContext<FormData>();

  const {
    fields: sectionsFields,
    append: appendSection,
    remove: removeSection,
    update: updateSection,
    move: moveSection,
  } = useFieldArray({
    control,
    name: "curriculum.sections",
  });

  // Memoize section ID to index mapping for O(1) lookups
  const sectionIdToIndexMap = useMemo(() => {
    const map = new Map<string, number>();
    sectionsFields.forEach((section, index) => {
      map.set(section._id, index);
    });
    return map;
  }, [sectionsFields]);

  // Memoize lesson ID to position mapping for faster lookups
  const lessonPositionMap = useMemo(() => {
    const map = new Map<
      string,
      { sectionIndex: number; lessonIndex: number; sectionId: string }
    >();
    sectionsFields.forEach((section, sectionIndex) => {
      section.lessons?.forEach((lesson, lessonIndex) => {
        map.set(lesson._id, {
          sectionIndex,
          lessonIndex,
          sectionId: section._id,
        });
      });
    });
    return map;
  }, [sectionsFields]);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 8,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 150,
      tolerance: 8,
    },
  });
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  const handleSectionDialog = useCallback((open: boolean) => {
    setSectionDialogOpen(open);
  }, []);

  const handleSectionValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSectionValue(e.target.value);
    },
    []
  );
  // add chapter
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sectionValue.trim() == "") return;
    try {
      const chapterData = await createChapter({
        courseId,
        title: sectionValue,
      }).unwrap();

      appendSection({
        _id: chapterData.data._id,
        title: sectionValue,
        lessons: [],
      });
      setSectionDialogOpen(false);
      setSectionValue("");
      toast.success("Chapter added successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Error adding chapter");
    }
  };

  const debouncedSectionUpdate = useMemo(
    () =>
      debounce(async (newSections: any[], courseId: string) => {
        try {
          const updatedOrderData = await updateChapterOrders({
            chapterIds: newSections.map((section) => section._id),
            courseId,
          }).unwrap();
          toast.success(updatedOrderData.message);
        } catch (error) {
          toast.error("Failed to update section order");
        }
      }, 300),
    [updateChapterOrders]
  );

  const debouncedLessonUpdate = useMemo(
    () =>
      debounce(
        async (newLessons: any[], sectionId: string, courseId: string) => {
          try {
            await updateLessonsOrder({
              lessonIds: newLessons.map((l) => l._id),
              chapterId: sectionId,
              courseId,
            }).unwrap();
            toast.success("Lesson order updated successfully");
          } catch (error) {
            toast.error("Failed to update lesson order");
          }
        },
        300
      ),
    [updateLessonsOrder]
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);

    const data = active.data.current;
    setDragData(data);
  };
  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over || active.id === over.id) return;

      const activeContainer = active.data.current?.sortable?.containerId;
      const overContainer = over.data.current?.sortable?.containerId;
      console.log({ activeContainer, overContainer });
      if (
        !activeContainer ||
        !overContainer ||
        activeContainer !== overContainer
      ) {
        return;
      }
      try {
        if (activeContainer === "sections") {
          // Use memoized map for O(1) lookup instead of findIndex
          const oldIndex = sectionIdToIndexMap.get(active.id as string);
          const newIndex = sectionIdToIndexMap.get(over.id as string);

          if (
            oldIndex === undefined ||
            newIndex === undefined ||
            oldIndex === newIndex
          )
            return;

          // Update UI immediately for better UX
          moveSection(oldIndex, newIndex);

          // Calculate new order after UI update
          const newSections = arrayMove(sectionsFields, oldIndex, newIndex);

          debouncedSectionUpdate(newSections, courseId);
        } else if (activeContainer.startsWith("lessons-")) {
          const sectionId = activeContainer.split("lessons-")[1];
          const activePos = lessonPositionMap.get(active.id as string);
          const overPos = lessonPositionMap.get(over.id as string);

          if (
            !activePos ||
            !overPos ||
            activePos.sectionId !== sectionId ||
            activePos.sectionIndex !== overPos.sectionIndex ||
            activePos.lessonIndex === overPos.lessonIndex
          )
            return;

          const sectionIndex = activePos.sectionIndex;
          const section = sectionsFields[sectionIndex];
          const oldIndex = activePos.lessonIndex;
          const newIndex = overPos.lessonIndex;

          // Update UI immediately
          const newLessons = arrayMove(section.lessons, oldIndex, newIndex);
          updateSection(sectionIndex, { ...section, lessons: newLessons });

          // Trigger validation asynchronously
          trigger(`curriculum.sections.${sectionIndex}.lessons`);

          debouncedLessonUpdate(newLessons, sectionId, courseId);
        }
      } catch (error) {
        console.error("Drag operation failed:", error);
        toast.error("Failed to update order");
      }
    },
    [
      sectionIdToIndexMap,
      lessonPositionMap,
      sectionsFields,
      moveSection,
      updateSection,
      trigger,
      // updateChapterOrders,
      // updateLessonsOrder,
      courseId,
      debouncedSectionUpdate,
      debouncedLessonUpdate,
    ]
  );

  // handle edit chapter
  const handleEditSection = useCallback(
    async (sectionId: string, title: string) => {
      const sectionIndex = sectionsFields.findIndex(
        (sec) => sec._id == sectionId
      );
      if (sectionIndex == -1) return;
      const getSection = sectionsFields[sectionIndex];
      updateSection(sectionIndex, { ...getSection, title });
      const valid = await trigger(`curriculum.sections.${sectionIndex}.title`);
      if (valid) {
        const updatedData = await updateChapter({
          chapterId: sectionId,
          title,
        }).unwrap();
        toast.success("Chapter updated successfully");
      }

      // getSection.title = title;
    },
    [sectionsFields, updateSection, trigger, updateChapter]
  );
  const handleDeleteSection = useCallback(
    async (sectionId: string) => {
      const sectionIndex = sectionsFields.findIndex(
        (sec) => sec._id == sectionId
      );
      if (sectionIndex == -1) return;
      const deleteData = await deleteChapter(sectionId).unwrap();
      removeSection(sectionIndex);
      const sectionsValues = getValues("curriculum.sections");
      const updateOrder = await updateChapterOrders({
        chapterIds: sectionsValues.map((section) => section._id),
        courseId,
      }).unwrap();
      toast.success(deleteData.message);
      toast.success(updateOrder.message);
    },
    [
      sectionsFields,
      removeSection,
      deleteChapter,
      getValues,
      updateChapterOrders,
      courseId,
    ]
  );

  const handleAddLesson = useCallback(
    async (sectionId: string, lessonTitle: string) => {
      const sectionIndex = sectionsFields.findIndex(
        (sec) => sec._id == sectionId
      );
      const getSection = sectionsFields[sectionIndex];
      try {
        const lessonData = await createLesson({
          title: lessonTitle,
          courseId,
          chapterId: sectionId,
        }).unwrap();

        updateSection(sectionIndex, {
          ...getSection,
          lessons: [
            ...getSection.lessons,
            { title: lessonTitle, _id: lessonData.data._id, video: {} as File },
          ],
        });
        // await trigger(`curriculum.sections.${sectionIndex}.lessons`);
        toast.success(lessonData?.message || "Lesson added successfully");
      } catch (error) {
        console.log(error);
        toast.error("error while adding lesson");
      }
      // getSection.lessons.push({ title: lessonTitle });
    },
    [sectionsFields, updateSection, createLesson, courseId]
  );

  const handleDeleteLesson = useCallback(
    async (sectionId: string, lessonId: string) => {
      const sectionIndex = sectionsFields.findIndex(
        (sec) => sec._id == sectionId
      );
      const getSection = sectionsFields[sectionIndex];
      try {
        const deleteData = await deleteLesson({
          lessonId,
          chapterId: sectionId,
          courseId,
        }).unwrap();

        console.log(deleteData, "delete data response");
        updateSection(sectionIndex, {
          ...getSection,
          lessons: getSection.lessons.filter(
            (lesson) => lesson._id != lessonId
          ),
        });

        // updateSection(sectionIndex, {
        //   ...getSection,
        //   lessons: deleteData.data,
        // });
        // await trigger(`curriculum.sections.${sectionIndex}.lessons`);
        toast.success(deleteData.message || "Lesson deleted successfully");
      } catch (error) {
        console.log(error);
        toast.error("error while delete lesson");
      }
    },
    [sectionsFields, updateSection, deleteLesson, courseId]
  );
  const handleEditLesson = useCallback(
    async (params: EditLessonParams) => {
      const { lessonId, lessonTitle, locked, sectionId, attach } = params;
      const sectionIndex = sectionsFields.findIndex(
        (sec) => sec._id == sectionId
      );
      if (sectionIndex == -1) return;
      const getSection = sectionsFields[sectionIndex];
      const lessonIndex = getSection.lessons.findIndex(
        (l) => l._id === lessonId
      );

      if (lessonIndex == -1) {
        console.log(`lesson with id ${lessonId} not found `);
        return;
      }
      try {
        const formData = new FormData();
        if (attach) {
          formData.append("video", attach);
        }
        if (lessonTitle) {
          formData.append("title", lessonTitle);
        }
        if (locked !== undefined) {
          formData.append("locked", locked);
        }

        const updatedLesson = await updateLesson({
          formData,
          courseId,
          chapterId: sectionId,
          lessonId,
        }).unwrap();
        const sectionLessons = getSection.lessons;
        const updates = {
          title: updatedLesson.data.title,
          video: updatedLesson.data?.video,
        };
        const updatedLessons = sectionLessons.map((lesson) =>
          lesson._id === lessonId ? { ...lesson, ...updates } : lesson
        );

        updateSection(sectionIndex, {
          ...getSection,
          lessons: updatedLessons,
        });
        toast.success(updatedLesson.message || "Lesson updated successfully");
      } catch (error) {
        console.log(error, "error from update lessson");
        toast.error("Error editing lesson");
      }
    },
    [sectionsFields, updateLesson, updateSection, courseId]
  );
  // console.log({ dragData, activeId });
  const renderDragOverlay = () => {
    if (!activeId || !dragData) return null;
    if (dragData.sortable.containerId === "sections") {
      const section = sectionsFields.find((s) => s._id === activeId);
      return section ? (
        <div className="bg-card p-4 rounded-md border rotate-3 shadow-xl">
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="icon" className="cursor-grab">
              <RxHamburgerMenu className="h-4 w-4" />
            </Button>
            <p className="flex gap-2">
              <span className="font-normal">
                Section 0{dragData.sortable.index + 1}:
              </span>
              <span className="font-medium">{section.title}</span>
            </p>
          </div>
        </div>
      ) : null;
    } else if (dragData.sortable.containerId.startsWith("lessons")) {
      const sectionId = dragData.sortable.containerId.split("-")[1];
      const section = sectionsFields.find((s) => s._id === sectionId);
      const lesson = section?.lessons.find((l) => l._id === activeId);
      return lesson ? (
        <div className="bg-card p-4 rounded-md border rotate-3 shadow-xl">
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="icon" className="cursor-grab">
              <RxHamburgerMenu className="h-4 w-4" />
            </Button>
            <p className="">{lesson.title}</p>
          </div>
        </div>
      ) : null;
    }

    return null;
  };

  return (
    <div className="p-3 ">
      <h1 className="font-semibold pb-2 mb-2 border-b">Course Curriculum</h1>
      <div className="relative">
        {(updatingChapterState || updatingLessonState) && <Loading />}
        {(isDeletingChapter || isDelettingLesson) && <Loading />}
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          sensors={sensors}
        >
          <SortableContext
            id="sections"
            items={sectionsFields.map((section) => section._id)}
            strategy={verticalListSortingStrategy}
          >
            {sectionsFields.map((section, index) => (
              <Section
                key={section._id}
                section={section}
                onEdit={handleEditSection}
                onDelete={handleDeleteSection}
                onAddLesson={handleAddLesson}
                onEditLesson={handleEditLesson}
                onDeleteLesson={handleDeleteLesson}
                index={index}
                error={errors?.curriculum?.sections?.[index]}
              />
            ))}
          </SortableContext>

          <DragOverlay>{renderDragOverlay()}</DragOverlay>
        </DndContext>
      </div>

      <Dialog onOpenChange={handleSectionDialog} open={sectionDialogOpen}>
        <DialogTrigger asChild className="cursor-pointer">
          <Button className="">Add section</Button>
        </DialogTrigger>
        <DialogContent aria-describedby={undefined}>
          <DialogTitle>Section title</DialogTitle>
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              name="title"
              placeholder="Enter a title"
              className="w-full px-2 py-4"
              value={sectionValue}
              onChange={handleSectionValue}
              autoFocus
            />
            <div className="flex items-center justify-between ">
              <Button
                className=""
                type="button"
                onClick={() => setSectionDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button className="" disabled={createChapterLoading}>
                Add section
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      {errors?.curriculum?.sections?.message && (
        <p className="text-red-500 my-3">
          {errors.curriculum.sections.message}
        </p>
      )}
    </div>
  );
};

export default CurriculumTab;
