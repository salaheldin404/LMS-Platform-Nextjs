import { getLessonById } from "@/server/dataFetching/courses";
import LessonContent from "./LessonContent";

const MainContent = async ({ lessonId }: { lessonId: string }) => {
  try {
    const lesson = await getLessonById(lessonId);
    return <LessonContent lesson={lesson} />;
  } catch (error) {
    console.log(error, "error from get lesson");
    return (
      <div className="text-red-500 font-bold">
        error fetching lesson contents reload the page
      </div>
    );
  }
};

export default MainContent;
