"use client";
import { Button } from "@/components/ui/button";
const SubmitButton = ({
  pendingText,
  defaultText,
  isPending,
}: {
  pendingText: string;
  defaultText: string;
  isPending: boolean;
}) => {
  return (
    <Button disabled={isPending} className="bg-primary w-full" type="submit">
      {isPending ? pendingText : defaultText}
    </Button>
  );
};

export default SubmitButton;
