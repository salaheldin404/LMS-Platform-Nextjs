import RatingSection from "../_components/RatingSection";

import { getCourseRatingPercentage } from "@/server/dataFetching/courses";
const ratingOrder = ["5", "4", "3", "2", "1"] as const;

const RatingSlot = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const { courseId } = await params;
  const data = await getCourseRatingPercentage(courseId);

  console.log(data, "data");
  const chartData = ratingOrder.map((key) => ({
    rating: `${key} Star`,
    value: parseFloat(data?.[key].percentage || "0"),
    count: data?.[key].count || 0,
  }));

  return <RatingSection chartData={chartData} ratings={data} />;
};

export default RatingSlot;
