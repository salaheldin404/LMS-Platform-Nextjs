// import { useGetCourseStatsQuery } from "@/lib/store/features/courseApiSlice";
// import { useParams } from "next/navigation";
import CourseStatsGrid from "../_components/CourseStatsGrid";
import { getCourseStats } from "@/server/dataFetching/courses";
const CourseStatsSlot = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const { courseId } = await params;
  const data = await getCourseStats(courseId);

  return <CourseStatsGrid data={data} />;
};

export default CourseStatsSlot;
