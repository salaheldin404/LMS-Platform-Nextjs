import SectionWrapper from "./SectionWrapper";
import DynamicStarRating from "@/components/course/DynamicStarRating";
import RatingProgress from "@/components/course/RatingProgress";
import ReviewsList from "./ReviewsList";
import type { IRating, TRatingPercentage } from "@/types/course";

interface FeedbackSectionProps {
  ratingsSummary: { averageRating: number; totalRatings: number };
  ratingPercentage: TRatingPercentage;
  // ratings?: IRating[];
  courseId: string;
}
const FeedbackSection = ({
  ratingsSummary,
  ratingPercentage,
  courseId,
}: FeedbackSectionProps) => {
  return (
    <SectionWrapper title="Student Feedback">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="col-span-1">
          <div className="text-center py-3 bg-orange-400/10">
            <div className="text-5xl font-bold  text-orange-400">
              {ratingsSummary?.averageRating || "0"}
            </div>
            <div className="flex justify-center my-2">
              <DynamicStarRating
                rating={ratingsSummary?.averageRating || 0}
                className="flex items-center"
              />
            </div>
            <p className="text-slate-500">Course Rating</p>
          </div>
        </div>
        <div className="col-span-2">
          {/* Rating breakdown */}
          {[5, 4, 3, 2, 1].map((rating) => (
            <RatingProgress
              key={rating}
              rating={rating}
              percentage={ratingPercentage?.[rating].percentage}
            />
          ))}
        </div>
      </div>

      {/* Reviews list */}
      <ReviewsList courseId={courseId} />
    </SectionWrapper>
  );
};

export default FeedbackSection;
