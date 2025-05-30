"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface IAddLessonDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLesson: (title:string) => void;
}

const AddLessonDialog = ({
  isOpen,
  onClose,
  onAddLesson,
}: IAddLessonDialogProps) => {
  const [lessonTitle, setLessonTitle] = useState("");


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddLesson(lessonTitle);
    onClose();
    setLessonTitle('')
  }
  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent aria-describedby={undefined}>
        <DialogTitle>Lesson title</DialogTitle>
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            name="title"
            placeholder="Enter a title"
            className="w-full px-2 py-4"
            value={lessonTitle}
            onChange={(e) => setLessonTitle(e.target.value)}
            autoFocus
          />
          <div className="flex items-center justify-between ">
            <Button className="" type="button" onClick={() => onClose()}>
              Cancel
            </Button>
            <Button className="">Add lesson</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLessonDialog;
