import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { RATING_OPTIONS } from "@/constants/filter-options";

type RatingValue = (typeof RATING_OPTIONS)[number]["value"];

interface IRatingOptions {
  value: RatingValue;
  onChange: (value: RatingValue) => void;
}

const RatingOptions = ({ value, onChange }: IRatingOptions) => {
  return (
    <RadioGroup value={value} onValueChange={onChange}>
      {RATING_OPTIONS.map((rating) => (
        <div key={rating.value} className="flex items-center space-x-2">
          <RadioGroupItem value={rating.value} id={rating.value} />
          <Label
            htmlFor={rating.value}
            className={`!leading-normal flex text-base `}
          >
            <p className="mr-3 ">
              <span className="text-yellow-600 ">
                {"★".repeat(5).slice(0, +rating.value)}
              </span>
              <span>{"★".repeat(5).slice(+rating.value)}</span>
            </p>
            <p
              className={` ${
                value === rating.value
                  ? "text-primary font-semibold "
                  : "text-gray-500 "
              }
            `}
            >
              {rating.label}
            </p>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default RatingOptions;
