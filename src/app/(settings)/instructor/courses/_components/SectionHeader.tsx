"use client";
import SearchInput from "@/components/common/SearchInput";

import { useCallback, useEffect, useState } from "react";
import { useFilterState } from "@/hooks/useFilterState";
import type { TSort } from "@/types/course";
import { useDebounce } from "@uidotdev/usehooks";

import SelectDropdown from "@/components/common/SelectDropdown";
import {
  SORT_OPTIONS,
  RATING_OPTIONS,
  CATEGORY_OPTIONS,
} from "@/constants/filter-options";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { IoFilterSharp } from "react-icons/io5";

type RatingValue = (typeof RATING_OPTIONS)[number]["value"];

const SectionHeader = () => {
  const { updateUrl, filters, clearFilters } = useFilterState();

  const [localSearch, setLocalSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const debouncedSearch = useDebounce(localSearch, 500);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalSearch(e.target.value);
    },
    []
  );

  const handleSortChange = useCallback(
    (val: TSort) => {
      updateUrl({ sort: val });
    },
    [updateUrl]
  );
  const handleRatingChange = useCallback(
    (val: RatingValue) => {
      updateUrl({ minRating: val });
    },
    [updateUrl]
  );

  const handleCategoryChange = useCallback(
    (val: string) => {
      updateUrl({ category: [val] });
    },
    [updateUrl]
  );

  useEffect(() => {
    updateUrl({ search: debouncedSearch || "" }); // Use undefined to remove empty params
    return () => {
      if (debouncedSearch === "" && filters.search) {
        updateUrl({ search: "" });
      }
    };
  }, [debouncedSearch, updateUrl, filters.search]);

  return (
    <div className="py-4 flex justify-between items-center gap-3 border-b-2 mb-4">
      <div className="basis-1/2 md:basis-2/3 lg:basis-1/3">
        <div className=" relative  ">
          <SearchInput value={localSearch} onChange={handleSearchChange} />
        </div>
        {/* <div className="md:hidden">
          <MobileSearch onChange={handleSearchChange} value={localSearch} />
        </div> */}
      </div>
      <div className="hidden lg:flex flex-1 flex-wrap items-center gap-4 ">
        <div className="flex-1 ">
          <SelectDropdown
            value={filters.sort as TSort}
            onChange={handleSortChange}
            options={SORT_OPTIONS}
            label="Sort by"
            className="lg:w-full py-5"
          />
        </div>
        <div className="flex-1 ">
          <SelectDropdown
            value={filters.minRating as RatingValue}
            onChange={handleRatingChange}
            options={RATING_OPTIONS}
            label="Rating"
            placeholder="Select a rating"
            className="lg:w-full py-5"
          />
        </div>
        <div className="flex-1 ">
          <SelectDropdown
            value={filters.category[0] || ""}
            onChange={handleCategoryChange}
            options={CATEGORY_OPTIONS}
            label="Category"
            placeholder="Select a category"
            className="lg:w-full py-5"
          />
        </div>
        <div className="lg:flex-shrink-0 lg:ml-auto">
          <Button
            className="text-primary font-semibold"
            variant="outline"
            onClick={() => clearFilters()}
          >
            Clear filters
          </Button>
        </div>
      </div>
      <div className="lg:hidden">
        <Sheet onOpenChange={setFilterOpen} open={filterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline">
              <IoFilterSharp />
              Filter
            </Button>
          </SheetTrigger>
          <SheetContent aria-describedby={undefined}>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>

            <div className="mt-8">
              <div className="space-y-4">
                <div>
                  <SelectDropdown
                    value={filters.sort as TSort}
                    onChange={handleSortChange}
                    options={SORT_OPTIONS}
                    label="Sort by"
                    className="md:!w-full py-5"
                  />
                </div>
                <div>
                  <SelectDropdown
                    value={filters.minRating as RatingValue}
                    onChange={handleRatingChange}
                    options={RATING_OPTIONS}
                    label="Rating"
                    placeholder="Select a rating"
                    className="md:!w-full py-5"
                  />
                </div>
                <div>
                  <SelectDropdown
                    value={filters.category[0] || ""}
                    onChange={handleCategoryChange}
                    options={CATEGORY_OPTIONS}
                    label="Category"
                    placeholder="Select a category"
                    className="md:!w-full py-5"
                  />
                </div>
                <div className="">
                  <Button
                    className="text-primary font-semibold"
                    variant="outline"
                    onClick={() => clearFilters()}
                  >
                    Clear filters
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default SectionHeader;
