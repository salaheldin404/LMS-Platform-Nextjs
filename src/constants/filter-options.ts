export const RATING_OPTIONS = [
  { value: "4", label: "4 Star & up" },
  { value: "3", label: "3 Star & up" },
  { value: "2", label: "2 Star & up" },
  { value: "1", label: "1 Star & up" },
] as const;

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "highest-rating", label: "Highest Rated" },
  { value: "popularity", label: "Most Popular" },
] as const;

export const CATEGORY_OPTIONS = [
  { value: "programming", label: "Programming" },
  { value: "design", label: "Design" },
  { value: "marketing", label: "Marketing" },
  { value: "personal-development", label: "Personal Development" },
  { value: "business", label: "Business" },
] as const;
