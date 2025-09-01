"use client";
import { useGetCertificateForCourseQuery } from "@/lib/store/features/userApiSlice";
import { TApiError } from "@/types/apiError";
import { useParams } from "next/navigation";
const CertificatePage = () => {
  const { courseId } = useParams();
  const { data, error } = useGetCertificateForCourseQuery(courseId);

  console.log(data, "data");

  if (error) {
    return (
      <div className="main-section text-red-500 text-center text-xl">
        {(error as TApiError).message || "Something went wrong!"}
      </div>
    );
  }

  return (
    <div className="w-screen h-screen">
      <iframe
        src={data?.data?.url}
        width="100%"
        height="100%"
        style={{ border: "none" }}
      >
        <p>
          Your browser does not support PDFs.
          <a href={data?.data?.url}>Download the PDF</a>.
        </p>
      </iframe>
    </div>
  );
};

export default CertificatePage;
