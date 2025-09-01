export interface PaginateResponse<T> {
  data: T[];
  pagination: {
    totalDocuments: number;
    totalPages: number;
    currentPage: number;
  };
}
