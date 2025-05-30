"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useActionState, useEffect } from "react";

import { createCourse } from "./_actions/courseAction";

import type { FormState } from "./_actions/courseAction";
import { useRouter } from "next/navigation";

const initialState: FormState = {};
const CreateCoursePage = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [state, action, pending] = useActionState(createCourse, initialState);
  const router = useRouter();
  useEffect(() => {
    if (state?.success != "fail") {
      setDialogOpen(false);
      setCourseTitle("");
    }
  }, [state]);

  useEffect(() => {
    if (state?.success == "success") {
      router.push(`/instructor/course/${state?.data?._id}/manage`);
    }
  }, [state, router]);

  const handleDialogChange = (open: boolean) => {
    if (pending) return;
    setDialogOpen(open);
  };

  console.log(state, "state");
  return (
    <div className="pt-4">
      <Dialog onOpenChange={handleDialogChange} open={isDialogOpen}>
        <DialogTrigger>
          <p className="px-3 py-2 bg-primary rounded text-white">
            Create course
          </p>
        </DialogTrigger>
        <DialogContent aria-describedby={undefined}>
          <DialogTitle>Course title</DialogTitle>
          <form action={action} className="space-y-5">
            <Input
              name="title"
              placeholder="Enter a course title"
              className="w-full px-2 py-4"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              autoFocus
            />
            <div className="flex items-center justify-between ">
              <Button
                className=""
                type="button"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button className="" disabled={pending}>
                Create course
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateCoursePage;
