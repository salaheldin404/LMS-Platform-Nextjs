import { memo } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type FilterType = "category" | "level";

interface IProps {
  title: string;
  options: string[];
  selected?: string[] ;
  handleArrayFilter: (
    filter: FilterType,
    option: string,
    checked: boolean
  ) => void;
}

const FilterCheckboxSection = memo(
  ({ title, options, selected, handleArrayFilter }: IProps) => {
    return (
      <AccordionItem value={title} className="px-3 py-1">
        <AccordionTrigger className="font-semibold text-xl uppercase">
          {title}
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2">
            {options.map((option) => (
              <div key={option} className="flex items-center gap-2">
                <Checkbox
                  id={option}
                  checked={selected?.includes(option)}
                  onCheckedChange={(checked) =>
                    handleArrayFilter(
                      title.toLowerCase() as "category" | "level",
                      option,
                      !!checked
                    )
                  }
                />
                <Label
                  htmlFor={option}
                  // className={`leading-normal ${
                  //   selected[title].includes(option)
                  //     ? "text-primary font-semibold"
                  //     : "text-gray-500"
                  // }`}
                >
                  {option
                    .split("-")
                    .map((word) => word[0].toUpperCase() + word.slice(1))
                    .join(" ")}
                </Label>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  }
);

FilterCheckboxSection.displayName = "FilterCheckboxSection";
export default FilterCheckboxSection;
