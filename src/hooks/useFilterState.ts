"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useTransition } from "react";

import type { ICourseFilterParams } from "@/types/course";

export function useFilterState() {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  const currentParams = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams]
  );

  const filters = useMemo(
    () => ({
      search: currentParams.get("search") || "",
      sort: currentParams.get("sort") || "newest",
      minPrice: Number(currentParams.get("minPrice")),
      maxPrice: Number(currentParams.get("maxPrice")),
      minRating: currentParams.get("minRating") || "",
      category: currentParams.getAll("category"),
      level: currentParams.getAll("level"),
    }),
    [currentParams]
  );
  const uiState = useMemo(
    () => ({
      showFilters: currentParams.get("showFilters") === "true",
    }),
    [currentParams]
  );

  const updateUrl = useCallback(
    (newFilters: ICourseFilterParams) => {
      const params = new URLSearchParams(searchParams.toString());
      let hasChanges = false;

      const {
        sort,
        search,
        page,
        category,
        level,
        minPrice,
        maxPrice,
        minRating,
        showFilters,
      } = newFilters;

      const setParam = (key: string, value?: string | number) => {
        const current = params.get(key);
        const stringValue = String(value ?? "");

        if (value !== undefined && value !== "" && value !== 0) {
          if (current !== stringValue) {
            params.set(key, stringValue);
            hasChanges = true;
          }
          if (current !== stringValue && key !== "page") {
            params.delete("page");
            hasChanges = true;
          }
        } else if (current !== null) {
          params.delete(key);
          hasChanges = true;
        }
      };

      // const setArrayParam = (key: string, values: string[]) => {
      //   const current = params.getAll(key).sort();
      //   const newValues = values.filter(Boolean).sort();

      //   if (JSON.stringify(current) !== JSON.stringify(newValues)) {
      //     params.delete(key);
      //     newValues.forEach((v) => params.append(key, v));
      //     hasChanges = true;
      //   }
      //   params.delete("page");
      // };

      const setArrayParam = (key: string, values: string[]) => {
        // Clear existing values before setting new ones
        params.delete(key);
        values.forEach((value) => {
          if (value) params.append(key, value);
        });
        hasChanges = true;
        params.delete("page"); // Reset pagination when filters change
      };

      if (sort) {
        setParam("sort", sort);
      }
      if (search || search === "") {
        setParam("search", search);
      }

      if (minPrice) setParam("minPrice", String(minPrice));
      if (maxPrice) setParam("maxPrice", String(maxPrice));
      if (minRating) setParam("minRating", String(minRating));

      if (page) setParam("page", String(page));
      if (category) {
        // console.log(category, "category");
        setArrayParam("category", category);
      }

      if (level) {
        setArrayParam("level", level);
      }

      if (showFilters !== undefined) {
        const currentShow = params.get("showFilters") === "true";
        const newShow = showFilters === "true";

        if (currentShow !== newShow) {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          newShow
            ? params.set("showFilters", "true")
            : params.delete("showFilters");
        }
      }

      if (hasChanges) {
        startTransition(() => {
          router.push(`${pathname}?${params.toString()}`, { scroll: false });
        });
      } else {
        window.history.replaceState(
          null,
          "",
          `${pathname}?${params.toString()}`
        );
      }
    },
    [router, pathname, searchParams]
  );

  const clearFilters = useCallback(() => {
    const newParams = new URLSearchParams();

    if (searchParams.has("page")) {
      newParams.set("page", searchParams.get("page")!);
    }
    if (searchParams.has("showFilters")) {
      newParams.set("showFilters", searchParams.get("showFilters")!);
    }
    // updateUrl(newParams);
    startTransition(() => {
      router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
    });
  }, [router, searchParams, pathname]);

  return {
    clearFilters,
    isPending,
    updateUrl,
    filters,
    uiState,
  };
}
