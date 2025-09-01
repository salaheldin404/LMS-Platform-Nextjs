"use client";
import CourseList from "./CourseList";

import type { ICourseFilterParams } from "@/types/course";

interface CourseListWrapperProps {
  initialFilters: ICourseFilterParams;
}

function CourseListWrapper({ initialFilters }: CourseListWrapperProps) {
  return <CourseList initialFilters={initialFilters} />;
}

export default CourseListWrapper;
