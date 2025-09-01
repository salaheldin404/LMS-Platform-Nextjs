import CourseCard from "@/components/course/CourseCard";

import type { ICourse } from "@/types/course";

interface IProps {
  courses?: ICourse[];
  // pagination?: {
  //   totalDocuments: number;
  //   currentPage: number;
  //   totalPages: number;
  // };
}

const CoursesSection = ({ courses }: IProps) => {
  return (
    <div className="md:basis-full">
      <h2 className="font-semibold text-2xl mb-3">
        My Courses <span>({courses?.length})</span>
      </h2>
      <div className="grid grid-cols-1 min-[550px]:grid-cols-2 gap-3">
        {courses?.map((course) => (
          <div key={course._id}>
            <CourseCard course={course} page={"profile"} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesSection;
