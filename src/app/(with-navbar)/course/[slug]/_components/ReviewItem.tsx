"use client";
import DynamicStarRating from "@/components/course/DynamicStarRating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector } from "@/lib/store/hooks";
import { IRating } from "@/types/course";
import EditableRatingDialog from "@/components/course/EditableRatingDialog";

// Function to highlight search query in review comment
const highlightMatch = (comment: string, query: string) => {
  if (!query.trim()) return comment;

  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escapedQuery})`, "gi");
  const parts = comment.split(regex);
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <strong key={index} className="font-bold">
        {part}
      </strong>
    ) : (
      part
    )
  );
};

interface ReviewItemProps {
  review: IRating;
  searchQuery?: string;
}

const ReviewItem = ({ review, searchQuery }: ReviewItemProps) => {
  const user = useAppSelector((state) => state.auth.user);
  const isOwn = user?._id === review.user._id;
  // Apply highlighting if searchQuery exists, otherwise use the plain comment
  const highlightedComment = searchQuery
    ? highlightMatch(review.comment, searchQuery)
    : review.comment;
  return (
    <div className="border-b pb-4 mb-4 last:border-0 relative">
      <div className="flex items-start">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={review.user.profilePicture?.url} />

          <AvatarFallback className="">
            {review.user.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium mb-1">{review.user.username}</div>
          <DynamicStarRating
            className="flex items-center mb-3"
            rating={review.rate}
          />

          <p className="">{highlightedComment}</p>
        </div>
      </div>
      {isOwn && (
        <div className="absolute top-0 right-5">
          <EditableRatingDialog courseId={review.course} />
        </div>
      )}
    </div>
  );
};

export default ReviewItem;
