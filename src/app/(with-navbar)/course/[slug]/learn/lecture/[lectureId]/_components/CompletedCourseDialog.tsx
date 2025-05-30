"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useGenerateCertificateMutation } from "@/lib/store/features/courseApiSlice";
import { useGetCertificateForCourseQuery } from "@/lib/store/features/userApiSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const CompletedCourseDialog = ({
  userProgress,
  courseId,
}: {
  userProgress: number;
  courseId: string;
}) => {
  const [open, setOpen] = useState(false);
  const [generateCertificate, { isLoading, error }] =
    useGenerateCertificateMutation();
  const { data, isLoading: isLoadingCertificate } =
    useGetCertificateForCourseQuery(courseId);

  const router = useRouter();

  const handleCertificate = async () => {
    if (data?.data?.url) return router.push(`/certificate/${courseId}`);
    await generateCertificate(courseId).unwrap();
    router.push(`/certificate/${courseId}`);
  };

  useEffect(() => {
    if (userProgress === 100 && !isLoadingCertificate && !data?.data?.url) {
      setOpen(true);
    }
  }, [userProgress, data, isLoadingCertificate]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Course Completed</DialogTitle>
        <p className="text-lg">You have completed the course</p>
        <Button onClick={handleCertificate} disabled={isLoading}>
          Get Certificate
        </Button>
        {error && <p className="text-red-500">{error.message}</p>}
      </DialogContent>
    </Dialog>
  );
};

export default CompletedCourseDialog;
