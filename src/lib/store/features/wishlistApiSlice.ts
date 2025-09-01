import { Wishlist, WishlistItem } from "@/types/wishlist";
import { apiSlice } from "../services/apiSlice";
import { transformApiError } from "@/lib/utils";

export const wishlistApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query<WishlistItem[], void>({
      query: () => "/wishlist",
      transformResponse: (response: { data: Wishlist }) => {
        return response.data?.items || [];
      },
      transformErrorResponse: transformApiError,
      providesTags: [{ type: "Wishlist" as const, id: "LIST" }],
    }),
    addToWishlist: builder.mutation<void, string>({
      query: (courseId: string) => ({
        url: `/wishlist/${courseId}`,
        method: "POST",
      }),
      transformErrorResponse: transformApiError,
      invalidatesTags: [{ type: "Wishlist" as const, id: "LIST" }],
    }),
    removeFromWishlist: builder.mutation<void, string>({
      query: (courseId: string) => ({
        url: `/wishlist/${courseId}`,
        method: "DELETE",
      }),
      transformErrorResponse: transformApiError,
      invalidatesTags: [{ type: "Wishlist" as const, id: "LIST" }],
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = wishlistApiSlice;
