import { Suspense } from "react";
import { getCurrentInstructorCourses } from "@/server/dataFetching/instructor";
import SectionHeader from "./_components/SectionHeader";
import { CoursesSkeleton } from "@/components/course/CoursesSkeleton";
import CourseList from "@/components/course/CourseList";
import type { ICourseFilterParams } from "@/types/course";

const InstructorCoursesPage = async ({
  searchParams,
}: {
  searchParams: Promise<ICourseFilterParams>;
}) => {
  const params = await searchParams;

  const initialFilters: ICourseFilterParams = {
    category: params.category
      ? Array.isArray(params.category)
        ? params.category
        : [params.category]
      : [],
    level: params.level
      ? Array.isArray(params.level)
        ? params.level
        : [params.level]
      : [],
    minPrice: params.minPrice,
    maxPrice: params.maxPrice,
    minRating: params.minRating || "",

    page: Math.floor(params.page || 1),
    limit: Math.floor(params.limit || 10),
    sort: params.sort || "newest",
    search: params.search || "",
  };

  // const instructorCourses = await getCurrentInstructorCourses(initialFilters);

  // console.log(instructorCourses)
  return (
    <div className="py-5">
      <SectionHeader />
      <main className={``}>
        <Suspense
          key={JSON.stringify(initialFilters)}
          fallback={<CoursesSkeleton />}
        >
          <CourseList
            initialFilters={initialFilters}
            fetchFunction={getCurrentInstructorCourses}
          />
        </Suspense>
      </main>
    </div>
  );
};

export default InstructorCoursesPage;
