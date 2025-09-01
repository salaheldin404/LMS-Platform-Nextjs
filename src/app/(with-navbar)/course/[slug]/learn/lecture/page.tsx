import { getActiveSession } from "@/server/actions/auth";
import { getCourseBySlug } from "@/server/dataFetching/courses";
import { redirect } from "next/navigation";

const LecturePage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const [course, user] = await Promise.all([
    getCourseBySlug(slug),
    getActiveSession(),
  ]);

  if (
    user &&
    course &&
    !user.enrolledCourses?.includes(course._id) &&
    !user.createdCourses?.includes(course._id)
  ) {
    redirect("/");
  }

  const firstLesson = course?.chapters?.[0]?.lessons[0];
  if (!firstLesson) {
    redirect("/");
  }
  redirect(`/course/${slug}/learn/lecture/${firstLesson?._id}`);
};

export default LecturePage;
