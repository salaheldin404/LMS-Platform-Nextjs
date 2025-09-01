import { TCategory } from "@/types/course";

interface CourseDetailsProps {
  title: string;
  price: number;
  category?: TCategory;
}
type CategoryColors = Record<
  TCategory | "Default",
  { bgColor: string; textColor: string }
>;
const categoryTagColors: CategoryColors = {
  business: { bgColor: "#bfdbfe", textColor: "#1e3a8a" },
  programming: { bgColor: "#fed7aa", textColor: "#854d0e" },
  design: { bgColor: "#e9d5ff", textColor: "#581c87" },
  marketing: { bgColor: "#bbf7d0", textColor: "#14532d" },
  // photography: { bgColor: "#fecaca", textColor: "#991b1b" },
  // music: { bgColor: "#fef08a", textColor: "#854d0e" },
  // health: { bgColor: "#fbcfe8", textColor: "#9d174d" },
  // "personal development": { bgColor: "#99f6e4", textColor: "#042f2e" },
  Default: { bgColor: "#e5e7eb", textColor: "#374151" }, // Gray for unmatched categories
};

const CourseDetails = ({ title, price, category }: CourseDetailsProps) => {
  const colors =
    (category && categoryTagColors[category]) || categoryTagColors.Default;

  return (
    <div className="py-3 px-4 border-b">
      <div className="mb-4 flex items-center gap-2 justify-between">
        <span
          style={{ backgroundColor: colors.bgColor, color: colors.textColor }}
          className="py-1 px-2 font-medium"
        >
          {category?.toUpperCase()}
        </span>
        <span className="text-primary font-semibold text-lg">${price}</span>
      </div>
      <p className="font-medium h-14 leading-tight line-clamp-2">{title}</p>
    </div>
  );
};

export default CourseDetails;
