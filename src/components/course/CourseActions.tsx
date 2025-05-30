"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";
import { Button } from "../ui/button";
import { ICourse } from "@/types/course";

import { deleteCourse } from "@/server/dataFetching/courses";
import DataRemovalConfirmation from "../DataRemovalConfirmation";
import { useState } from "react";
import { toast } from "sonner";
interface ICourseActionProps {
  course: ICourse;
}

const CourseActions = ({ course }: ICourseActionProps) => {
  const [confirmationDialogOpen, setConfirmationDialog] = useState(false);
  // const [open, setOpen] = useState(false);
  const handleDeleteCourse = async () => {
    try {
      const deletedData = await deleteCourse(course._id);
      toast.success("Course deleted successfully");
      setConfirmationDialog(false);
      // setOpen(false);
    } catch (error) {
      console.log(error, "errore from delete course");
    }
  };

  const handleClose = () => {
    // setOpen(false);
    setConfirmationDialog(false);
  };
  return (
    <div>
      <DropdownMenu
        modal={false}
        // onOpenChange={(open) => setOpen(open)}
        // open={open}
      >
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="">
            <BsThreeDots />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={5}>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href={`/instructor/course/${course._id}/details`}>
                View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                className="w-full"
                href={`/instructor/course/${course._id}/manage`}
              >
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setConfirmationDialog(true)}
            >
              Delete Course
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DataRemovalConfirmation
        onClose={handleClose}
        isOpen={confirmationDialogOpen}
        onClick={handleDeleteCourse}
        message={`Are you sure you want to delete ${course.title}?`}
      />
    </div>
  );
};

export default CourseActions;
