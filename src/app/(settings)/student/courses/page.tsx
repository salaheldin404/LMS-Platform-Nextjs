import { getUserEnrolledCourses } from "@/server/dataFetching/user";
import { Suspense } from "react";
import CourseLearningCard from "../_components/CourseLearningCard";
import CourseCardSkeleton from "../_components/CourseCardSkeleton";

const EnrolledCoursesPage = async () => {
  const enrolledCourses = await getUserEnrolledCourses();

  return (
    <div>
      <h2 className="my-3 ">Your Courses ({enrolledCourses?.data?.length})</h2>
      <div
        className={`grid md:grid-cols-2 gap-3 ${
          enrolledCourses?.data?.length >= 4
            ? "lg:grid-cols-4"
            : "lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"
        }`}
      >
        {enrolledCourses?.data?.map((c) => (
          <Suspense key={c._id} fallback={<CourseCardSkeleton />}>
            <CourseLearningCard data={c} />
          </Suspense>
        ))}
      </div>
    </div>
  );
};

export default EnrolledCoursesPage;
