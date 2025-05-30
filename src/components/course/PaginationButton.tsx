"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useFilterState } from "@/hooks/useFilterState";
import { useCallback, useMemo } from "react";

interface IProps {
  currentPage: number;
  totalPages: number;
  totalCourses: number;
}
const PaginationButton = ({ pagination }: { pagination: IProps }) => {
  const { currentPage, totalPages } = pagination;
  const { updateUrl, isPending } = useFilterState();

  // Memoize page numbers array to prevent recalculation on every render
  const pageNumbers = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalPages]);

  const goToPage = useCallback(
    (page: number) => {
      if (page > totalPages || page < 1) return;
      updateUrl({ page });
    },
    [totalPages, updateUrl]
  );

  // Calculate navigation states
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const navigationDisabled = isPending ? "pointer-events-none opacity-50" : "";

  return (
    <Pagination className='mt-5'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={`cursor-pointer ${
              isFirstPage && "pointer-events-none opacity-50"
            } ${navigationDisabled}`}
            onClick={() => goToPage(currentPage - 1)}
          />
        </PaginationItem>
        {pageNumbers.map((page) => (
          <PaginationItem key={page} className="cursor-pointer">
            <PaginationLink
              isActive={page === currentPage}
              onClick={() => goToPage(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            className={`cursor-pointer ${
              isLastPage && "pointer-events-none opacity-50"
            } ${navigationDisabled}`}
            onClick={() => goToPage(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationButton;
