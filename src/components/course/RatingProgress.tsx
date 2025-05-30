import { Progress } from "@/components/ui/progress";

import DynamicStarRating from "./DynamicStarRating";
const RatingProgress = ({ rating, percentage }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <DynamicStarRating rating={rating} />

        <p>{rating} Star</p>
      </div>
      <div className="flex flex-1 items-center gap-3">
        <Progress className="w-full flex-1 " value={Number(percentage) || 0} />
        <span>{percentage || 0}%</span>
      </div>
    </div>
  );
};

export default RatingProgress;
