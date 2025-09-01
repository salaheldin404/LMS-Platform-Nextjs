"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";

interface IEditDialogProps {
  initialTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newTitle: string, locked: boolean) => void;
  type: "lesson" | "section";
  lessonLocked?: boolean;
}

const EditSectionDialog = ({
  initialTitle,
  onClose,
  isOpen,
  onSave,
  type,
  lessonLocked,
}: IEditDialogProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [locked, setLocked] = useState<boolean>(lessonLocked || true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() == "") return;
    onSave(title, locked);
    onClose();
  };
  const handleCheckChange = (checked: boolean) => {
    setLocked(checked);
  };
  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent aria-describedby={undefined}>
        <DialogTitle>Edit {type}</DialogTitle>
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            name="title"
            placeholder="Enter a title"
            className="w-full px-2 py-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          {type == "lesson" && (
            <div className="flex items-center space-x-2">
              <Checkbox
                defaultChecked={locked}
                id="locked"
                onCheckedChange={handleCheckChange}
              />
              <label htmlFor="locked" className="text-sm font-medium ">
                Lock lesson
              </label>
            </div>
          )}
          <div className="flex items-center justify-between ">
            <Button className="" type="button" onClick={() => onClose()}>
              Cancel
            </Button>
            <Button className="">Edit section</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditSectionDialog;
