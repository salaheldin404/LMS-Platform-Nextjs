import { getUserEnrolledCourses } from "@/server/dataFetching/user";
import { Suspense } from "react";
import CourseLearningCard from "../_components/CourseLearningCard";
import CourseCardSkeleton from "../_components/CourseCardSkeleton";
import { Button } from "@/components/ui/button";

const EnrolledCoursesPage = async () => {
  const enrolledCourses = await getUserEnrolledCourses();

  const courses = enrolledCourses?.data || [];
  const hasCourses = courses.length > 0;
  return (
    <div>
      <h2 className="my-3 ">Your Courses ({enrolledCourses?.data?.length})</h2>

      {!hasCourses && (
        <div className="text-center py-16 bg-white rounded-xl shadow-lg max-w-lg mx-auto">
          <svg
            className="mx-auto h-16 w-16 text-indigo-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            />
          </svg>
          <h3 className="mt-4 text-2xl font-semibold text-gray-800">
            No Courses Yet
          </h3>
          <p className="mt-2 text-md text-gray-500 px-6">
            It looks like you have not enrolled in any courses. Why not start
            today?
          </p>
          <div className="mt-8">
            <Button
              className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform hover:scale-105"
              // onClick={() => { /* Navigate to course catalog */ }}
            >
              Explore Courses
            </Button>
          </div>
        </div>
      )}
      {hasCourses && (
        <div
          // className={`grid md:grid-cols-2 gap-3 ${
          //   enrolledCourses?.data?.length >= 4
          //     ? "lg:grid-cols-4"
          //     : "lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"
          // }`}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {courses.map((c) => (
            <Suspense key={c._id} fallback={<CourseCardSkeleton />}>
              <CourseLearningCard data={c} />
            </Suspense>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCoursesPage;
