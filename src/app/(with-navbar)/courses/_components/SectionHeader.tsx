"use client";

import { useFilterState } from "@/hooks/useFilterState";

import { useDebounce } from "@/hooks/useDebounce";
import { useCallback, useEffect, useState, useMemo } from "react";
import { TSort } from "@/types/course";
import { useSearchParams } from "next/navigation";

import { IoFilterSharp } from "react-icons/io5";
import SearchInput from "@/components/common/SearchInput";
import MobileSearch from "@/components/common/MobileSearch";
import SelectDropdown from "@/components/common/SelectDropdown";

import { SORT_OPTIONS } from "@/constants/filter-options";

const SectionHeader = () => {
  const { updateUrl, filters, uiState } = useFilterState();
  const [localSearch, setLocalSearch] = useState(filters.search);

  const debouncedSearch = useDebounce(localSearch, 500);
  const searchParams = useSearchParams();
  const paramsCount = useMemo(() => {
    return Array.from(searchParams.entries()).reduce(
      (count, [key]) =>
        ["showFilters", "search", "page", "sort"].includes(key)
          ? count
          : count + 1,
      0
    );
  }, [searchParams]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalSearch(e.target.value);
    },
    []
  );

  const handleToogle = useCallback(() => {
    updateUrl({ showFilters: (!uiState.showFilters).toString() });
  }, [uiState.showFilters, updateUrl]);

  // Update URL params when debounced value changes
  useEffect(() => {
    updateUrl({ search: debouncedSearch || "" }); // Use undefined to remove empty params
    return () => {
      if (debouncedSearch === "" && filters.search) {
        updateUrl({ search: "" });
      }
    };
  }, [debouncedSearch, updateUrl, filters.search]);

  const handleSortChange = useCallback(
    (val: TSort) => {
      updateUrl({ sort: val });
    },
    [updateUrl]
  );

  return (
    <div className="mb-4 pb-2 border-b-2">
      <div className="flex justify-between gap-3 items-center">
        <div className="flex gap-3 items-center">
          <div
            role="button"
            tabIndex={0}
            className={` ${
              uiState.showFilters && "border-primary text-primary"
            } border flex items-center gap-1 p-2 md:px-4 md:py-2 cursor-pointer`}
            aria-label={`${uiState.showFilters ? "Hide" : "Show"} filters`}
            onClick={handleToogle}
            onKeyDown={(e) => e.key === "Enter" && handleToogle()}
          >
            <IoFilterSharp />
            <p>Filter</p>
            {paramsCount > 0 && (
              <span className={`px-1 bg-primary text-white rounded`}>
                {paramsCount}
              </span>
            )}
          </div>
          <div className="relative hidden md:block md:w-[300px]">
            <SearchInput value={localSearch} onChange={handleSearchChange} />
          </div>
          <div className="md:hidden">
            <MobileSearch onChange={handleSearchChange} value={localSearch} />
          </div>
        </div>

        <div>
          <SelectDropdown
            value={filters.sort as TSort}
            onChange={handleSortChange}
            label="Sort by"
            options={SORT_OPTIONS}
          />
        </div>
      </div>
    </div>
  );
};

export default SectionHeader;
