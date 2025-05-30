"use client";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import ReviewItem from "./ReviewItem";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@uidotdev/usehooks";
import { useGetAllRatingsForCourseQuery } from "@/lib/store/features/ratingApiSlice";
const ReviewsList = ({ courseId }: { courseId: string }) => {
  const { data: ratings, isLoading } = useGetAllRatingsForCourseQuery(courseId);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500);
  // Memoize visible reviews to prevent unnecessary recalculations
  const visibleReviews = useMemo(
    () => ratings && ratings.slice(0, 3),
    [ratings]
  );
  const hasMoreReviews = ratings && ratings.length > 3;
  // Efficiently compute filtered ratings based on search query
  const filteredRatings = useMemo(() => {
    if (!ratings) return [];
    return ratings.filter((review) =>
      review.comment.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [ratings, debouncedSearch]);

  const handleOpenDialog = (open: boolean) => {
    setReviewDialogOpen(open);
    if (!open) setSearchQuery("");
  };
  return (
    <div className="mt-8 space-y-6">
      <h3 className="font-medium text-lg">Reviews</h3>
      {isLoading ? (
        <p className="text-slate-500">Loading...</p>
      ) : (
        <>
          {ratings && ratings.length > 0 ? (
            visibleReviews?.map((review) => (
              <ReviewItem review={review} key={review._id} />
            ))
          ) : (
            <p className="text-slate-500">No reviews yet.</p>
          )}
        </>
      )}

      {hasMoreReviews && (
        <Button
          variant="outline"
          className=""
          onClick={() => setReviewDialogOpen(true)}
        >
          Show all reviews
        </Button>
      )}
      <Dialog open={reviewDialogOpen} onOpenChange={handleOpenDialog}>
        <DialogContent
          className="w-[calc(100vw-32px)] md:w-full lg:!w-[800px] overflow-y-scroll lg:!max-w-none max-h-[400px]"
          aria-describedby={undefined}
        >
          <DialogTitle>Review</DialogTitle>

          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-5 gap-8">
            <div className=" lg:basis-1/4">
              <Input
                type="text"
                placeholder="Search reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="space-y-4  lg:basis-3/4">
              {ratings && ratings.length > 0 ? (
                filteredRatings.length > 0 ? (
                  filteredRatings.map((review) => (
                    <ReviewItem
                      review={review}
                      key={review._id}
                      searchQuery={debouncedSearch}
                    />
                  ))
                ) : (
                  <p className="text-slate-500">
                    No reviews match your search.
                  </p>
                )
              ) : (
                <p className="text-slate-500">No reviews available.</p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewsList;
