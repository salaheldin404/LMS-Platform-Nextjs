"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import RatingProgress from "@/components/course/RatingProgress";
import { TRatingPercentage } from "@/types/course";
const ratingOrder = ["5", "4", "3", "2", "1"] as const;

const chartConfig = {
  rating: {
    label: "Rating Distribution",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type RatingChartData = {
  rating: string;
  value: number;
  count: number;
}[];
interface IRatingSectionProps {
  ratings: TRatingPercentage;
  chartData: Partial<RatingChartData>;
}

const RatingSection = ({ chartData, ratings }: IRatingSectionProps) => {
  return (
    <div className="bg-card p-4 flex-1 space-y-4 w-full lg:w-auto">
      <h1 className="font-semibold">Overall course rating</h1>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
            <CardDescription>
              Percentage distribution of course ratings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ChartContainer config={chartConfig}>
                  <LineChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    height={300}
                    width={500}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "hsl(var(--foreground))" }}
                      axisLine={{ stroke: "hsl(var(--border))" }}
                    />
                    <YAxis
                      tickFormatter={(value) => `${value}%`}
                      tick={{ fill: "hsl(var(--foreground))" }}
                      axisLine={{ stroke: "hsl(var(--border))" }}
                      tickLine={false}
                      domain={[0, 100]}
                    />
                    <ChartTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-background p-2 rounded-lg border">
                              <p className="font-semibold">
                                {payload[0].payload.rating}
                              </p>
                              <p>{payload[0].value}%</p>
                              <p>{payload[0].payload.count}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ChartContainer>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      {ratingOrder.map((r) => (
        <RatingProgress rating={r} percentage={ratings[r].percentage} key={r} />
      ))}
    </div>
  );
};

export default RatingSection;
