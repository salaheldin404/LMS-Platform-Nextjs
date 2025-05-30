import {
  getCourseBySlug,
  getCourseRatingPercentage,
} from "@/server/dataFetching/courses";

import CourseInfo from "./_components/CourseInfo";
import CourseContent from "./_components/CourseContent";
import InstructorSection from "./_components/InstructorInfo";
import LearnSection from "./_components/LearnSection";
import RequirementsSection from "./_components/RequirementsSection";
import FeedbackSection from "./_components/FeedbackSection";
import SectionWrapper from "./_components/SectionWrapper";
import CourseFeatureCard from "./_components/CourseFeatureCard";

const ViewCoursePage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  const ratingPercentage = await getCourseRatingPercentage(course._id);

  console.log(course, "course slug");

  return (
    <main className=" main-section">
      {/* Hero Section with Dark Background */}
      <div className="dark:bg-card bg-slate-900 text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Course Info - Takes 2/3 of width */}
            <div className="md:col-span-2">
              <CourseInfo course={course} />
            </div>

            {/* Course Card - Takes 1/3 of width but hidden on mobile, shown in different position */}
            <div className="hidden md:block">
              {/* Empty for now - card will appear in main content for mobile */}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container py-8">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-8">
          {/* Left Content - Takes 2/3 width */}
          <div className="lg:col-span-2">
            {/* What you'll learn section */}
            <LearnSection willLearn={course.willLearn || []} />

            {/* Course content section */}
            <CourseContent course={course} />

            {/* Requirements section */}
            <RequirementsSection requirements={course.requirements || []} />

            {/* Description section */}
            <SectionWrapper title="Description">
              <div className=" max-w-none">
                <p className="">{course.description}</p>
              </div>
            </SectionWrapper>

            {/* Instructor section */}
            <InstructorSection instructor={course.instructor} />

            {/* Student feedback section */}
            <FeedbackSection
              ratingsSummary={course.ratingsSummary}
              courseId={course._id}
              ratingPercentage={ratingPercentage}
            />
          </div>

          {/* Right Sidebar - Course Card */}
          <CourseFeatureCard course={course} />
        </div>
      </div>
    </main>
  );
};

export default ViewCoursePage;
