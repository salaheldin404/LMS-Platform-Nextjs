import { Button } from "@/components/ui/button";
import { ICourse } from "@/types/course";
import { FaFolderOpen } from "react-icons/fa";
import { TfiTimer } from "react-icons/tfi";
import { MdOutlinePlayCircle } from "react-icons/md";
import Link from "next/link";
import EditableRatingDialog from "@/components/course/EditableRatingDialog";

const SectionHeader = ({
  course,
  nextLectureId,
}: {
  course: ICourse;
  nextLectureId: string | null;
}) => {
  return (
    <div className="dark:bg-card bg-gray-100 p-4 flex justify-between items-center">
      <div>
        <div className="mb-3 font-semibold">{course?.title}</div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <FaFolderOpen className="text-primary" />
            {course?.chapters?.length} sections
          </div>

          <div className="flex items-center gap-1">
            <MdOutlinePlayCircle className="text-blue-500" />
            10 lectures
          </div>
          <div className="flex items-center gap-1">
            <TfiTimer className="text-primary" />
            {course?.formattedTotalDuration}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <EditableRatingDialog courseId={course._id} />
        <Button disabled={!nextLectureId}>
          {nextLectureId ? (
            <Link href={nextLectureId}>Next Lecture</Link>
          ) : (
            "Next Lecture"
          )}
        </Button>
      </div>
    </div>
  );
};

export default SectionHeader;
