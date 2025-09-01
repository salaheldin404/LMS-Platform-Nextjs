import CourseCard from "../course/CourseCard";
import { getAllCourses } from "@/server/dataFetching/courses";

const BestSellingCourses = async () => {
  const data = await getAllCourses();
  const courses = data?.data || [];

  console.log(courses, "courses");
  return (
    <section className="py-20 bg-gray-100 dark:bg-background">
      <div className="container">
        <h1 className="font-bold text-4xl text-center ">
          Best selling courses
        </h1>
        <div className="grid  md:grid-cols-2 lg:grid-cols-3  gap-4 mt-5">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellingCourses;
