"use client";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import DataRemovalConfirmation from "@/components/DataRemovalConfirmation";
import {
  useGetUserRatingForCourseQuery,
  useAddRatingToCourseMutation,
  useDeleteUserRatingMutation,
} from "@/lib/store/features/ratingApiSlice";

import { FaStar } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { toast } from "sonner";

const RatingMessageMap = new Map([
  [1, "Awful, not what I expected at all"],
  [1.5, "Awful / Poor"],
  [2, "Poor, pretty disappointed"],
  [2.5, "Poor / Average"],
  [3, "Average, could be better"],
  [3.5, "Average / Good"],
  [4, "Good, what I expected"],
  [4.5, "Good / Amazing"],
  [5, "Amazing, above expectations!"],
]);

const EditableRatingDialog = ({ courseId }: { courseId: string }) => {
  const { data } = useGetUserRatingForCourseQuery(courseId);
  const [addRating, { isLoading }] = useAddRatingToCourseMutation();
  const [deleteRating] = useDeleteUserRatingMutation();

  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [actionStatus, setActionStatus] = useState<"add" | "edit" | "read">(
    "add"
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const handleRatingClick = (selectedRating: number, isHalf: boolean) => {
    if (isHalf) {
      if (selectedRating === 1) {
        setRating(selectedRating);
      } else {
        setRating(selectedRating - 0.5);
      }
    } else {
      setRating(selectedRating);
    }
  };
  const handleAddOrUpdteRating = async () => {
    const data = await addRating({
      rate: rating,
      comment: message,
      courseId,
    }).unwrap();
    console.log(data);
    toast.success(data.message || "Rating added successfully");
    setDialogOpen(false);
    setActionStatus("read");
    // refetch();
    console.log({ rating, message });
  };

  const handleDeleteReview = async () => {
    setDialogOpen(false);
    await deleteRating(courseId).unwrap();
    toast.success("Review Deleted ");
    setRating(0);
    setMessage("");
    // refetch();
  };

  // Extracted star component for reuse
  const StarRating = ({
    value,
    interactive = false,
    onRatingChange,
  }: {
    value: number;
    interactive?: boolean;
    onRatingChange?: (value: number, isHalf: boolean) => void;
  }) => {
    return (
      <div className="flex items-center justify-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const fillPercentage =
            value >= star ? 100 : value >= star - 0.5 ? 50 : 0;

          return (
            <div
              key={star}
              className={`relative w-[30px] h-[30px] ${
                interactive ? "cursor-pointer" : ""
              }`}
              onClick={
                interactive
                  ? (e) => {
                      const starRect = e.currentTarget.getBoundingClientRect();
                      const offsetX = e.clientX - starRect.left;
                      const isHalfStar = offsetX < starRect.width / 2;
                      if (onRatingChange) onRatingChange(star, isHalfStar);
                    }
                  : undefined
              }
            >
              <FaStar
                fill="none"
                stroke="#ffbe0d"
                strokeWidth={30}
                size={30}
                className="relative"
              />

              {/* Filled Star Foreground */}
              <div
                className={`absolute top-0 left-0 overflow-hidden ${
                  interactive ? "cursor-pointer" : ""
                }`}
                style={{ width: `${fillPercentage}%` }}
              >
                <FaStar fill="#ffbe0d" size={30} />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const ReadDialogContent = () => {
    if (!data?.rate) return null;
    return (
      <>
        <DialogTitle>Your Review</DialogTitle>
        {/* stars */}
        <div className="grid place-content-center gap-3">
          <StarRating value={data.rate} />
          <p>
            {data?.comment || "There are no written comments for your review."}
          </p>
        </div>
        <div className="flex items-center justify-end gap-3">
          <Button
            onClick={() => setConfirmationDialogOpen(true)}
            variant={"destructive"}
          >
            Delete
          </Button>
          <Button onClick={() => setActionStatus("edit")}>Edit Review</Button>
        </div>
      </>
    );
  };
  const handleDialogOpen = (open: boolean) => {
    setDialogOpen(open);
    if (!open && data) {
      if (actionStatus === "edit") {
        setActionStatus("read");
        setDialogOpen(true);
      } else {
        setDialogOpen(false);
      }
    }
  };

  useEffect(() => {
    if (data) {
      setActionStatus("read");
      setRating(data.rate);
      setMessage(data?.comment || "");
    } else {
      setActionStatus("add");
    }
  }, [data]);

  useEffect(() => {
    if (actionStatus === "edit") {
      setRating(data?.rate || 0);
      setMessage(data?.comment || "");
    }
  }, [actionStatus, data]);
  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={handleDialogOpen}>
        <DialogTrigger className="bg-secondary px-4 py-2 rounded">
          {/* <Button variant={"secondary"}> */}
          {actionStatus === "add" ? "Write a Review" : "Edit Your Review"}
          {/* </Button> */}
        </DialogTrigger>
        <DialogContent aria-describedby={undefined}>
          {actionStatus === "read" ? (
            <ReadDialogContent />
          ) : (
            <>
              <DialogTitle>Write a Review</DialogTitle>
              <div className="text-center grid place-content-center gap-2">
                <StarRating
                  value={rating}
                  interactive
                  onRatingChange={handleRatingClick}
                />
                <p className="font-semibold">
                  {rating > 0 ? (
                    <>
                      {rating}
                      <span className="text-gray-500 font-normal ml-2 text-sm">
                        ({RatingMessageMap.get(rating)})
                      </span>
                    </>
                  ) : (
                    <span className="text-gray-500 text-sm">
                      Select a rating
                    </span>
                  )}
                </p>
              </div>
              <div className="space-y-3">
                <Label htmlFor="feedback">Feedback</Label>
                <Textarea
                  placeholder="Write down your feedback here..."
                  id="feedback"
                  className="max-h-[350px] min-h-[100px] "
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3 justify-between mt-3">
                <DialogClose>
                  <Button className="py-2 px-4 w-fit" variant={"secondary"}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  onClick={handleAddOrUpdteRating}
                  className="py-2 px-4 w-fit"
                  disabled={rating === 0 || isLoading}
                >
                  {actionStatus === "edit" ? "Update" : "Submit"} Review
                  <IoMdSend className="ml-1" />
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      <DataRemovalConfirmation
        isOpen={confirmationDialogOpen}
        onClose={() => setConfirmationDialogOpen(false)}
        message="You are about to remove your review. Are you sure you want to continue?"
        onClick={handleDeleteReview}
      />
    </>
  );
};

export default EditableRatingDialog;
