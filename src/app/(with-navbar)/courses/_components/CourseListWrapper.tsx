"use client";
import CourseList from "./CourseList";
import { useFilterState } from "@/hooks/useFilterState";

import type { ICourseFilterParams } from "@/types/course";

interface CourseListWrapperProps {
  initialFilters: ICourseFilterParams;
}

function CourseListWrapper({ initialFilters }: CourseListWrapperProps) {
  const { uiState } = useFilterState();

  return (
    <CourseList
      initialFilters={initialFilters}
      hideFilters={uiState.hideFilters}
    />
  );
}

export default CourseListWrapper;
