import { getUserProfile } from "@/server/dataFetching/user";
import { IoMdPlayCircle } from "react-icons/io";
import { IoCheckmarkCircle } from "react-icons/io5";
import { PiUsersBold } from "react-icons/pi";
const StudentDashboardPage = async () => {
  const user = await getUserProfile();
  const stats = [
    {
      value: user.enrolledCoursesCount,
      label: "Enrollements Courses",
      icon: IoMdPlayCircle,
      iconColor: "text-primary",
      bgColor: "bg-primary/30",
    },
    {
      value: user.activeCourses,
      label: "Active Courses",
      icon: PiUsersBold,
      iconColor: "text-orange-400",
      bgColor: "bg-orange-400/30",
    },
    {
      value: user.completedCoursesCount,
      label: "Completed Courses",
      icon: IoCheckmarkCircle,
      iconColor: "text-green-400",
      bgColor: "bg-green-400/30",
    },
  ];
  return (
    <div className="p-4">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`${stat.bgColor} p-4 flex items-center gap-3 hover:scale-[1.02] transition-transform`}
          >
            <div className={`bg-white p-3 rounded-lg`}>
              <stat.icon className={`${stat.iconColor} w-6 h-6`} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-lg font-semibold">{stat.value}</span>
              <span className="text-sm text-muted-foreground">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboardPage;
