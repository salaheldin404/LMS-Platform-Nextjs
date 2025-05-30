import { Fragment } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

interface DynamicStarRatingProps {
  rating: number;
  className?: string;
}
const DynamicStarRating = ({ rating, className }: DynamicStarRatingProps) => {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div className={className || "flex items-center gap-2"}>
      {stars.map((star) => (
        <Fragment key={star}>
          {star <= rating ? (
            <FaStar key={star} className={` text-orange-400`} />
          ) : (
            <FaRegStar key={star} className={` text-gray-400`} />
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default DynamicStarRating;
