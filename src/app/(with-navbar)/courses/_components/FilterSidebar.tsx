"use client";

import { useFilterState } from "@/hooks/useFilterState";
import { useIsMediumScreen } from "@/hooks/useIsMediumScreen";
import FilterForm from "./FilterForm";
import { useMediaQuery } from "@uidotdev/usehooks";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

function FilterSidebar() {
  const { uiState, updateUrl } = useFilterState();
  // const isMedium = useIsMediumScreen();
  const isMedium = useMediaQuery(
    "only screen and (min-width : 769px) and (max-width : 992px)"
  );

  const handleOpenChange = () => {
    updateUrl({ showFilters: (!uiState.showFilters).toString() });
  };

  return (
    <>
      <div
        className={`hidden lg:block basis-1/3 transition-all duration-500 ease-in-out ${
          !uiState.showFilters
            ? "opacity-0 -translate-x-full max-w-0 overflow-hidden"
            : "opacity-100 translate-x-0 max-w-full"
        }`}
      >
        <FilterForm />
      </div>
      <Sheet
        onOpenChange={handleOpenChange}
        open={uiState.showFilters && isMedium}
      >
        <SheetContent aria-describedby={undefined}>
          <SheetHeader>
            <SheetTitle></SheetTitle>
          </SheetHeader>

          <div className="mt-8">
            <FilterForm />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default FilterSidebar;
