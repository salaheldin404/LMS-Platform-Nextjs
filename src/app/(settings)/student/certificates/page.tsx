"use client";

import { useGetAllCertificatesForUserQuery } from "@/lib/store/features/userApiSlice";
import CourseCardSkeleton from "../_components/CourseCardSkeleton";
import CertificateCard from "../_components/CertificateCard";

const CertificatesPage = () => {
  const { data, isLoading, isError } = useGetAllCertificatesForUserQuery({});

  if (isError) {
    return <div className="text-red-400 text-center">Something went wrong</div>;
  }
  return (
    <div>
      <h2 className="my-3 ">Your Certificates ({data?.length})</h2>

      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-3  ${
          data && data.length >= 4
            ? "lg:grid-cols-4"
            : "lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"
        }`}
      >
        {isLoading ? (
          <>
            {[...Array(3)].map((_, i) => (
              <CourseCardSkeleton key={i} />
            ))}
          </>
        ) : data && data.length > 0 ? (
          data.map((certificate) => (
            <CertificateCard
              key={certificate.course._id}
              certificate={certificate}
            />
          ))
        ) : (
          <div className="text-center">
            <h2>No certificates found</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificatesPage;
