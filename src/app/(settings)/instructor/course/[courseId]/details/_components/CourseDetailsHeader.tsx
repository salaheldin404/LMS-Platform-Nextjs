import type { ICourseStats } from "@/types/course";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

const CourseDetailsHeader = ({ data }: { data: ICourseStats }) => {
  const star = Array.from(
    { length: Math.round(data?.averageRatings) },
    (_, index) => index + 1
  );
  return (
    <div className="bg-card p-4 flex items-start gap-4">
      <div className="w-[300px] h-[300px]">
        <Image
          src={data?.image.url}
          alt={data?.title}
          width={300}
          height={300}
        />
      </div>
      <div className="flex-1">
        <div className="mb-4">
          <h1>{data?.title}</h1>
          <p className="text-gray-400">{data?.subtitle}</p>
        </div>
        <div className="flex justify-between items-center gap-3">
          <div>created by</div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              {star.map((star) => (
                <FaStar key={star} className={` text-orange-400`} />
              ))}
            </div>
            <p>{data?.averageRatings}</p>
            <span className="text-gray-400">({data?.totalRatings} Rating)</span>
          </div>
        </div>
        <span>{data?.price}$</span>
      </div>
    </div>
  );
};

export default CourseDetailsHeader;
