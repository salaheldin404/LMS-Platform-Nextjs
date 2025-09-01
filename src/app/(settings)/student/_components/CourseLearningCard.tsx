import { UserLearningCourse } from "@/types/user";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

const CourseLearningCard = memo(({ data }: { data: UserLearningCourse }) => {
  const { course, progressPercentage, _id } = data;

  return (
    <div key={_id} className="relative bg-card rounded border lg:max-w-[350px]">
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <Image
          src={course?.image?.url || "/default-course.jpg"}
          alt={course?.title || "course image"}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          placeholder="empty"
        />
        <Link href={`/course/${course?.slug}`}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-4">
            <span className="text-white font-medium">View course</span>
          </div>
        </Link>
      </div>

      <div className="p-4 border-b mb-3">
        <h3>{course?.title}</h3>
      </div>
      <div className="flex items-center gap-3 p-4">
        <Link
          href={`/course/${course?.slug}/learn/lecture`}
          className="flex-1 bg-primary px-3 py-1 rounded text-center text-white block"
        >
          Continue learning
        </Link>
        {progressPercentage > 0 && (
          <div className="flex items-center gap-1 text-primary font-semibold">
            <span>{progressPercentage}%</span>
            <span>Completed</span>
          </div>
        )}
      </div>
      {progressPercentage > 0 && (
        <div
          className="absolute bottom-0 left-0 bg-primary h-1 transition-[width] duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      )}
    </div>
  );
});

CourseLearningCard.displayName = "CourseLearningCard";

export default CourseLearningCard;
