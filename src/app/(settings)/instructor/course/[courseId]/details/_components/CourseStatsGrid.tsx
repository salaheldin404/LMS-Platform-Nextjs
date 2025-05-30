import { ICourseStats } from "@/types/course";
import { IoMdPlayCircle } from "react-icons/io";
import { PiUsersBold } from "react-icons/pi";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdOutlineTrendingUp } from "react-icons/md";

const CourseStatsGrid = ({ data }: { data: ICourseStats }) => {
  const stats = [
    {
      value: data.totalLessons,
      label: "Lessons",
      icon: IoMdPlayCircle,
      iconColor: "text-primary",
      bgColor: "bg-primary/30",
    },
    {
      value: data.totalEnrollments,
      label: "Students Enrollments",
      icon: PiUsersBold,
      iconColor: "text-orange-400",
      bgColor: "bg-orange-400/30",
    },
    {
      value: data.completedCount,
      label: "Users Completed",
      icon: IoCheckmarkCircle,
      iconColor: "text-green-400",
      bgColor: "bg-green-400/30",
    },
    {
      value: `${data.completionRate}`,
      label: "Completion Rate",
      icon: MdOutlineTrendingUp, // Assume you have an appropriate icon
      iconColor: "text-blue-400",
      bgColor: "bg-blue-400/30",
    },
  ];
  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))]  flex-1 w-full lg:w-auto">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-card p-4 flex items-center gap-3 hover:scale-[1.02] transition-transform"
        >
          <div className={`${stat.bgColor} p-3 rounded-lg`}>
            <stat.icon className={`${stat.iconColor} w-6 h-6`} />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-lg font-semibold">{stat.value}</span>
            <span className="text-sm text-muted-foreground">{stat.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseStatsGrid;
