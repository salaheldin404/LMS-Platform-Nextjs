"use client";
import { useCallback, useState, useEffect, useRef } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Slider } from "@/components/ui/slider";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import FilterCheckboxSection from "./FilterCheckboxSection";
import { Button } from "@/components/ui/button";
import { useFilterState } from "@/hooks/useFilterState";

// import { useDebounce } from "@/hooks/useDebounce";
import { useDebounce } from "@uidotdev/usehooks";
import RatingOptions from "@/components/common/RatingOptions";

type RatingValue = "4" | "3" | "2" | "1";

export default function FilterForm() {
  const { clearFilters, isPending, filters, updateUrl } = useFilterState();

  const [prices, setPrices] = useState<number[]>([
    filters.minPrice,
    filters.maxPrice,
  ]);
  const debouncedPrices = useDebounce(prices, 300);

  const currentPricesRef = useRef([filters.minPrice, filters.maxPrice]);

  const handleArrayFilter = useCallback(
    (type: "category" | "level", value: string, checked: boolean) => {
      // Ensure we're working with clean arrays
      const newValues = checked
        ? [...filters[type], value]
        : filters[type].filter((c) => c !== value);
      updateUrl({ [type]: newValues });
    },
    [filters, updateUrl]
  );

  const handlePriceChange = useCallback((values: number[]) => {
    setPrices(values);
  }, []);

  const handleRatingChange = useCallback(
    (rating: RatingValue) => {
      if (rating !== filters.minRating) {
        updateUrl({ minRating: rating });
      }
    },
    [updateUrl, filters.minRating]
  );

  useEffect(() => {
    const [newMin, newMax] = debouncedPrices;
    const [currentMin, currentMax] = currentPricesRef.current;

    if (newMin !== currentMin || newMax !== currentMax) {
      currentPricesRef.current = [newMin, newMax];
      updateUrl({
        minPrice: newMin,
        maxPrice: newMax,
      });
    }
  }, [debouncedPrices, updateUrl]);

  // Sync from URL params to local state
  useEffect(() => {
    if (
      filters.minPrice !== currentPricesRef.current[0] ||
      filters.maxPrice !== currentPricesRef.current[1]
    ) {
      setPrices([filters.minPrice, filters.maxPrice]);
      currentPricesRef.current = [filters.minPrice, filters.maxPrice];
    }
  }, [filters.minPrice, filters.maxPrice]);

  return (
    <form className="">
      <Accordion type="multiple" className="border">
        <FilterCheckboxSection
          options={[
            "programming",
            "design",
            "business",
            "marketing",
            "personal-development",
          ]}
          title="Category"
          selected={filters.category}
          handleArrayFilter={handleArrayFilter}
        />

        <FilterCheckboxSection
          options={["beginner", "intermediate", "advanced"]}
          selected={filters.level}
          title="Level"
          handleArrayFilter={handleArrayFilter}
        />

        <AccordionItem value="Price" className="px-3 py-1">
          <AccordionTrigger className="font-semibold text-xl uppercase">
            Price
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex justify-between text-sm font-medium text-gray-700 mb-4">
              <div>Min: {prices[0] ? `$${prices[0]}` : "Any"}</div>
              <div>Max: {prices[1] ? `$${prices[1]}` : "Any"}</div>
            </div>

            <Slider
              onValueChange={handlePriceChange}
              min={0}
              max={2000}
              step={10}
              value={[Number(prices[0]) || 0, Number(prices[1]) || 0]}
            />
            <div className="flex justify-between text-sm text-gray-500 mt-3">
              <span>$0</span>
              <span>$2000</span>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Rating" className="px-3 py-1">
          <AccordionTrigger className="font-semibold text-xl uppercase">
            Rating
          </AccordionTrigger>
          <AccordionContent>
            <div className="">
              <RatingOptions
                value={filters.minRating as RatingValue}
                onChange={handleRatingChange}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex gap-4 mt-4">
        {/* Clear Filters Button */}
        <Button
          type="button"
          variant="outline"
          onClick={clearFilters}
          disabled={isPending}
        >
          Clear Filters
        </Button>
      </div>
    </form>
  );
}
