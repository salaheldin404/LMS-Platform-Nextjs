import CourseDetailsHeader from "./_components/CourseDetailsHeader";

import { getCourseStats } from "@/server/dataFetching/courses";

const InstructorCourseDetails = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const { courseId } = await params;
  const data = await getCourseStats(courseId);
  console.log({ data }, "from get course details");
  return <CourseDetailsHeader data={data} />;
};

export default InstructorCourseDetails;
