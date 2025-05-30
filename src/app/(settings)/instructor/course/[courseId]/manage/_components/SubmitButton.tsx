"use client";
import { Button } from "@/components/ui/button";

import { usePublishCourseMutation } from "@/lib/store/features/courseApiSlice";
import { toast } from "sonner";
// Submit Button with Server Action
function SubmitButton({
  courseId,
  courseStatus,
}: {
  courseId: string;
  courseStatus?: string;
}) {
  const [publishCourse, { isLoading,error }] = usePublishCourseMutation();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const publishData = await publishCourse(courseId).unwrap();
      console.log(publishData,'publishData');
      toast.success("Course published successfully");
    } catch (error) {
      console.log(error, "error from publish course");
      toast.error((error as Error).message)
    }
  };

  console.log(error,'error')

  return (
    <form onSubmit={handleSubmit}>
      <Button
        type="submit"
        disabled={isLoading || courseStatus === "published"}
      >
        Publish Course
      </Button>
    </form>
  );
}

export default SubmitButton;
