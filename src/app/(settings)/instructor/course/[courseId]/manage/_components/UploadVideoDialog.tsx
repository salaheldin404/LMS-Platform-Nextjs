import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface IUploadVideoDialogProps {
  isOpen: boolean;
  type: "lesson" | "course";
  onClose: () => void;
  onSave: (videoFile: File) => void;
}

const UploadVideoDialog = ({
  isOpen,
  type,
  onClose,
  onSave,
  
}: IUploadVideoDialogProps) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (videoFile) {
      onSave(videoFile);
    }
    onClose();
    console.log(videoFile, "video file from dialog");
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    console.log(file);
    setVideoFile(file);
  };
  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent aria-describedby={undefined}>
        <DialogTitle> {type} video</DialogTitle>
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            onChange={handleFileChange}
            type="file"
            placeholder="Upload Files"
            accept="video/*"
          />
          <div className="flex items-center justify-between ">
            <Button
              className=""
              type="button"
              onClick={() => onClose()}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!videoFile }>
              Upload video
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadVideoDialog;
