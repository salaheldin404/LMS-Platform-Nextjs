import type { ICourse, ICourseFilterParams } from "@/types/course";
import type { PaginateResponse } from "@/types/index";
import CourseCard from "@/components/course/CourseCard";
import PaginationButton from "@/components/course/PaginationButton";

interface CourseListProps {
  initialFilters: ICourseFilterParams;
  fetchFunction: (
    filters: ICourseFilterParams
  ) => Promise<PaginateResponse<ICourse>>;
}
const CourseList = async ({
  initialFilters,
  fetchFunction,
}: CourseListProps) => {
  try {
    const data = await fetchFunction(initialFilters);
    const courses = data?.data || [];
    const pagination = {
      currentPage: data?.pagination.currentPage || 1,
      totalPages: data?.pagination.totalPages || 1,
      totalCourses: data?.pagination.totalDocuments || 0,
    };

    if (courses.length == 0) {
      return (
        <div className="">
          <p>No courses found. Try adjusting your filters.</p>
        </div>
      );
    }
    return (
      <div>
        <div className="mb-4 text-2xl ">
          Showing {courses.length} of {pagination.totalCourses} courses
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
        {pagination.totalPages > 1 && (
          <PaginationButton pagination={pagination} />
        )}
      </div>
    );
  } catch (error) {
    console.log(error, "error courselist");
    return (
      <div className="text-red-500 text-center py-8">
        Error loading courses. Please try again later.
      </div>
    );
  }
};

export default CourseList;
