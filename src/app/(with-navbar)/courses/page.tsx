import CourseList from "@/components/course/CourseList";
import type { ICourseFilterParams } from "@/types/course";
import { Suspense } from "react";
import { CoursesSkeleton } from "@/components/course/CoursesSkeleton";
import FilterSidebar from "./_components/FilterSidebar";
import SectionHeader from "./_components/SectionHeader";

import { getAllCourses } from "@/server/dataFetching/courses";

// export const dynamic = "force-dynamic";

const CoursesPage = async ({
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

  return (
    <div className="main-section ">
      <div className="container py-4">
        <SectionHeader />
        <div className="flex gap-5 relative overflow-x-hidden">
          <FilterSidebar />

          <main
            className={` transition-all duration-500 ease-in-out basis-full`}
          >
            <Suspense
              key={JSON.stringify(initialFilters)}
              fallback={<CoursesSkeleton />}
            >
              <CourseList
                initialFilters={initialFilters}
                fetchFunction={getAllCourses}
              />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
